"use client";

import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/button";

const variants: ButtonVariant[] = ["default", "secondary", "ghost", "destructive"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

function LoadingDemo() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    }, 1500);
  };

  return (
    <Button loading={loading} success={success} onClick={handleClick}>
      Submit
    </Button>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-8 py-16 max-w-3xl mx-auto">
      <header className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight mb-2">driftkit</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Motion-first UI components. Beautiful physics. Copy, paste, ship.
        </p>
      </header>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Variants
        </h2>
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((s) => (
            <Button key={s} size={s}>
              Size {s}
            </Button>
          ))}
        </div>
      </section>

      {/* Loading → Success */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Loading → Success
        </h2>
        <LoadingDemo />
      </section>

      {/* Disabled */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Disabled
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="destructive" disabled>
            Can&apos;t delete
          </Button>
        </div>
      </section>

      <footer className="mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-400">
        Built by{" "}
        <a
          href="https://nikkikipple.com"
          className="underline hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          Nikki Kipple
        </a>
      </footer>
    </main>
  );
}
