"use client";

import { Suspense, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm px-6">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-light tracking-wide mb-2">Noctē</h1>
        <p className="font-sans text-[10px] text-nocte-muted tracking-[0.3em] uppercase">Sign In</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-nocte-surface border border-nocte-border text-nocte-cream font-sans text-sm px-4 py-3 placeholder:text-nocte-muted/40 focus:border-nocte-gold focus:outline-none transition-colors"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-nocte-surface border border-nocte-border text-nocte-cream font-sans text-sm px-4 py-3 placeholder:text-nocte-muted/40 focus:border-nocte-gold focus:outline-none transition-colors"
            placeholder="Your password"
          />
        </div>

        {error && (
          <p className="font-sans text-xs text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-nocte-gold text-nocte-black font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:bg-nocte-gold-light transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="font-sans text-xs text-nocte-muted text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="text-nocte-gold hover:text-nocte-gold-light transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream flex items-center justify-center"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}
