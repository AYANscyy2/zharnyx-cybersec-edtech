"use client";

import { useState, Suspense } from "react";
import { signIn, signUp } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/shared/toast";
import { motion } from "motion/react";
import {
  Terminal,
  User,
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (password !== confirmPassword) {
        const errorMsg = "Passwords do not match";
        setError(errorMsg);
        toast.error("Validation failed", {
          description: errorMsg,
        });
        return;
      }

      if (password.length < 8) {
        const errorMsg = "Password must be at least 8 characters long";
        setError(errorMsg);
        toast.error("Validation failed", {
          description: errorMsg,
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === "signin") {
        await signIn.email({
          email,
          password,
        });

        toast.success("Signed in successfully!", {
          description: "Redirecting to dashboard...",
        });
      } else {
        await signUp.email({
          email,
          password,
          name,
        });

        toast.success("Account created successfully!", {
          description: "Welcome! Redirecting to dashboard...",
        });
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : mode === "signin"
          ? "Failed to sign in"
          : "Failed to create account";
      setError(errorMessage);
      toast.error(mode === "signin" ? "Sign in failed" : "Sign up failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Top Badge - Neo Brutalist */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-red-600 text-black font-bold uppercase tracking-widest text-xs border-2 border-red-600 shadow-[4px_4px_0px_0px_white]">
            <Terminal size={14} strokeWidth={3} />
            <span>Zharnyx 2.0 // Cyber-Agency</span>
          </div>
        </div>

        <div className="bg-black border-2 border-white/20 p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] backdrop-blur-sm">
          <div className="flex flex-col items-center text-center space-y-2 mb-8">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
              {mode === "signin" ? "Operator Login" : "New Recruit"}
            </h1>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
              {mode === "signin"
                ? "Identify yourself to access the mainframe."
                : "Begin your initialization sequence."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div className="space-y-1">
                <Label
                  htmlFor="name"
                  className="text-white text-xs font-bold uppercase tracking-wider"
                >
                  Codename
                </Label>
                <div className="relative group">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
                    size={16}
                  />
                  <Input
                    id="name"
                    type="text"
                    placeholder="ENTER CODENAME"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/5 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-0 rounded-none h-12 font-mono text-sm transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-white text-xs font-bold uppercase tracking-wider"
              >
                Email Address
              </Label>
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
                  size={16}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="OPERATOR@ZHARNYX.COM"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-0 rounded-none h-12 font-mono text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-white text-xs font-bold uppercase tracking-wider"
                >
                  Password
                </Label>
                {mode === "signin" && (
                  <a
                    href="#"
                    className="text-[10px] text-gray-500 hover:text-red-500 uppercase tracking-widest transition-colors font-bold"
                  >
                    Difficulties?
                  </a>
                )}
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
                  size={16}
                />
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-0 rounded-none h-12 font-mono text-sm transition-colors"
                />
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-1">
                <Label
                  htmlFor="confirm-password"
                  className="text-white text-xs font-bold uppercase tracking-wider"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
                    size={16}
                  />
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-white/5 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-0 rounded-none h-12 font-mono text-sm transition-colors"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-950/30 border border-red-500/50 p-3 flex items-start gap-3">
                <AlertCircle
                  className="text-red-500 shrink-0 mt-0.5"
                  size={16}
                />
                <div className="text-sm text-red-200 font-mono">{error}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:translate-x-1 hover:translate-y-1 transition-transform disabled:opacity-50 disabled:pointer-events-none mt-4"
            >
              <span className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 -z-10 border-2 border-white group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {mode === "signin" ? "Establish Link" : "Initialize"}{" "}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
              }}
            >
              {mode === "signin"
                ? "No credentials? Request Access"
                : "Already active? Operator Login"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        }
      >
        <AuthContent />
      </Suspense>
    </>
  );
}
