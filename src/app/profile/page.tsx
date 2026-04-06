"use client";

import { useAuth } from "@/app/_components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/sign-in");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div
        className="min-h-screen bg-nocte-black text-nocte-cream flex items-center justify-center"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
      >
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-nocte-gold animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-nocte-gold animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-nocte-gold animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Guest";

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      <div className="px-6 pt-16 pb-8">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">Your Account</p>
        <h1 className="font-display text-4xl font-light mb-1">{name}</h1>
        <p className="font-sans text-sm text-nocte-muted">{user.email}</p>
      </div>

      <div className="px-6 flex flex-col gap-3">
        <div className="border border-nocte-border p-5" style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}>
          <p className="font-sans text-[9px] text-nocte-muted tracking-[0.2em] uppercase mb-1">Member Since</p>
          <p className="font-sans text-sm text-nocte-cream">
            {new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>

        <button
          onClick={signOut}
          className="border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:border-red-400/40 hover:text-red-400 transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
