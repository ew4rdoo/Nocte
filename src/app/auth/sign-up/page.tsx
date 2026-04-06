"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div
        className="min-h-screen bg-nocte-black text-nocte-cream flex items-center justify-center"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
      >
        <div className="w-full max-w-sm px-6 text-center">
          <div className="w-16 h-16 border border-nocte-gold mx-auto mb-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-nocte-gold">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-light mb-3">Check Your Email</h1>
          <p className="font-sans text-sm text-nocte-muted leading-relaxed mb-6">
            We sent a confirmation link to <span className="text-nocte-cream">{email}</span>. Click it to activate your account.
          </p>
          <Link
            href="/auth/sign-in"
            className="font-sans text-xs text-nocte-gold hover:text-nocte-gold-light tracking-[0.15em] uppercase transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream flex items-center justify-center"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-light tracking-wide mb-2">Noctē</h1>
          <p className="font-sans text-[10px] text-nocte-muted tracking-[0.3em] uppercase">Create Account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-nocte-surface border border-nocte-border text-nocte-cream font-sans text-sm px-4 py-3 placeholder:text-nocte-muted/40 focus:border-nocte-gold focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

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
              placeholder="At least 6 characters"
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
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="font-sans text-xs text-nocte-muted text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-nocte-gold hover:text-nocte-gold-light transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
