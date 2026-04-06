import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAILS = (process.env.NOCTE_ADMIN_EMAIL || "").split(",").map((e) => e.trim().toLowerCase());

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  const accessToken = request.cookies.get("sb-access-token")?.value
    || request.cookies.get(`sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`)?.value;

  if (!accessToken) {
    const allCookies = request.cookies.getAll();
    const authCookie = allCookies.find((c) => c.name.includes("auth-token"));
    if (!authCookie) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (ADMIN_EMAILS.length > 0 && ADMIN_EMAILS[0] !== "" && !ADMIN_EMAILS.includes(user.email?.toLowerCase() || "")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
