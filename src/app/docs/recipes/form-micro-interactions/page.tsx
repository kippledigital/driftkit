"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- RECIPE: Form Micro-Interactions ---
// Complete form flow with spring physics at every step:
// 1. Floating labels rise on focus
// 2. Error shake on invalid submit
// 3. Success checkmark morphs in
// 4. Button loading → done state transition

const spring = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
};

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  success,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  success?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.div
        className="relative"
        animate={error ? { x: [0, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 pt-6 pb-2 rounded-lg border-2 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none transition-colors ${
            error
              ? "border-red-500"
              : success
              ? "border-green-500"
              : focused
              ? "border-neutral-900 dark:border-white"
              : "border-neutral-200 dark:border-neutral-700"
          }`}
        />
        <motion.label
          className={`absolute left-4 pointer-events-none origin-left ${
            error ? "text-red-500" : success ? "text-green-500" : "text-neutral-400"
          }`}
          animate={{
            y: isActive ? 8 : 18,
            scale: isActive ? 0.75 : 1,
          }}
          transition={spring.snappy}
        >
          {label}
        </motion.label>

        {/* Success checkmark */}
        <AnimatePresence>
          {success && (
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={spring.snappy}
            >
              ✓
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-red-500 text-xs mt-1 ml-1"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={spring.snappy}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmitButton({
  state,
  onClick,
}: {
  state: "idle" | "loading" | "success";
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={state !== "idle"}
      whileHover={state === "idle" ? { scale: 1.02, y: -2 } : {}}
      whileTap={state === "idle" ? { scale: 0.98 } : {}}
      transition={spring.snappy}
      className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors relative overflow-hidden ${
        state === "success"
          ? "bg-green-500 text-white"
          : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
      }`}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={spring.snappy}
          >
            Submit
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={spring.snappy}
            className="flex items-center justify-center gap-2"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Submitting...
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring.snappy}
          >
            ✓ Done!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function FormDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [success, setSuccess] = useState<{ email?: boolean; password?: boolean }>({});
  const [buttonState, setButtonState] = useState<"idle" | "loading" | "success">("idle");

  function handleSubmit() {
    const newErrors: typeof errors = {};
    if (!email.includes("@")) newErrors.email = "Please enter a valid email";
    if (password.length < 6) newErrors.password = "Must be at least 6 characters";

    setErrors(newErrors);
    setSuccess({});

    if (Object.keys(newErrors).length === 0) {
      setButtonState("loading");
      setTimeout(() => {
        setSuccess({ email: true, password: true });
        setButtonState("success");
        setTimeout(() => {
          setButtonState("idle");
          setEmail("");
          setPassword("");
          setSuccess({});
        }, 2000);
      }, 1500);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <FloatingInput
        label="Email"
        type="email"
        value={email}
        onChange={(v) => {
          setEmail(v);
          if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
        }}
        error={errors.email}
        success={success.email}
      />
      <FloatingInput
        label="Password"
        type="password"
        value={password}
        onChange={(v) => {
          setPassword(v);
          if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
        }}
        error={errors.password}
        success={success.password}
      />
      <SubmitButton state={buttonState} onClick={handleSubmit} />
    </div>
  );
}

const codeString = `// Floating label — spring-animated y + scale
<motion.label
  animate={{
    y: isActive ? 8 : 18,
    scale: isActive ? 0.75 : 1,
  }}
  transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
>
  {label}
</motion.label>

// Error shake — keyframe x displacement
<motion.div animate={error ? { x: [0, -8, 8, -4, 4, 0] } : {}}>
  <input ... />
</motion.div>

// Button state transition — AnimatePresence + mode="wait"
<AnimatePresence mode="wait">
  {state === "loading" && (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={spring.snappy}
    >
      <Spinner /> Submitting...
    </motion.span>
  )}
</AnimatePresence>`;

export default function FormMicroInteractionsRecipe() {
  return (
    <div className="py-12 px-8 max-w-5xl">
      <div className="mb-8 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-300">
        <Link href="/docs/recipes" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
          Recipes
        </Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-white">Form Micro-Interactions</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
        Form Micro-Interactions
      </h1>
      <p className="text-base text-neutral-600 dark:text-neutral-400 mb-2">
        Complete form flow: floating labels, error shake, success checkmark, and button state transitions — all spring-powered.
      </p>
      <div className="flex gap-2 mb-10">
        <span className="text-xs px-2 py-0.5 rounded-full border text-green-500 bg-green-500/10 border-green-500/20">
          Beginner
        </span>
        <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400">
          Input
        </span>
        <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400">
          Button
        </span>
        <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400">
          Toast
        </span>
      </div>

      {/* Live Demo */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Live Demo
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">
          Try submitting empty, then fill in valid values. Watch the error shake, success checkmarks, and button state change.
        </p>
        <div className="p-12 bg-neutral-100 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <FormDemo />
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          The Micro-Interactions
        </h2>
        <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex gap-3">
            <span className="text-lg">📝</span>
            <div>
              <strong className="text-neutral-900 dark:text-white">Floating label</strong>
              <p>Label animates from placeholder position to above-input with spring scale + translate. No layout shift.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">🫨</span>
            <div>
              <strong className="text-neutral-900 dark:text-white">Error shake</strong>
              <p>Keyframe X displacement: [0, -8, 8, -4, 4, 0]. Decaying amplitude = physical feel. Not a spring — intentionally sharp.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">✓</span>
            <div>
              <strong className="text-neutral-900 dark:text-white">Success checkmark</strong>
              <p>Scale from 0 + rotate from -90° with spring. The overshoot from the spring makes it feel like it "pops" into place.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">🔄</span>
            <div>
              <strong className="text-neutral-900 dark:text-white">Button state machine</strong>
              <p>AnimatePresence mode=&quot;wait&quot; crossfades between idle → loading → success. Each state slides in from below, out to above.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Key Code
        </h2>
        <pre className="p-6 bg-neutral-950 text-neutral-300 rounded-xl text-sm overflow-x-auto leading-relaxed">
          <code>{codeString}</code>
        </pre>
      </section>

      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between">
        <Link
          href="/docs/recipes/stripe-card-hover"
          className="text-sm text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          ← Stripe Card Hover
        </Link>
        <Link
          href="/docs/recipes"
          className="text-sm text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          All Recipes →
        </Link>
      </div>
    </div>
  );
}
