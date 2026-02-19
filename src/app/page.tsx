"use client";

import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/button";
import { Toggle } from "@/components/toggle";
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/dialog";
import { useToast } from "@/components/toast";

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

function ToggleDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Toggle size="sm" checked={checked} onChange={setChecked} aria-label="Small toggle" />
        <Toggle size="md" checked={checked} onChange={setChecked} aria-label="Medium toggle" />
        <Toggle size="lg" checked={checked} onChange={setChecked} aria-label="Large toggle" />
        <span className="text-sm text-neutral-500">{checked ? "On" : "Off"}</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle disabled checked={false} aria-label="Disabled off" />
        <Toggle disabled checked={true} aria-label="Disabled on" />
        <span className="text-sm text-neutral-400">Disabled</span>
      </div>
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  return (
    <div className="flex flex-wrap gap-3">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Button
          key={s}
          variant="secondary"
          size="sm"
          onClick={() => {
            setSize(s);
            setOpen(true);
          }}
        >
          Open {s}
        </Button>
      ))}
      <Dialog open={open} onClose={() => setOpen(false)} size={size} title="Example dialog">
        <DialogTitle>Spring-animated dialog</DialogTitle>
        <DialogDescription>
          This modal springs in from scale 0.95 with opacity. The backdrop blurs smoothly.
          Press Escape or click outside to close — notice how closing feels snappier than opening.
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => toast({ title: "Hello!", description: "This is a default toast." })}
      >
        Default
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({ title: "Saved!", description: "Your changes were saved.", variant: "success" })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({ title: "Error", description: "Something went wrong.", variant: "error" })
        }
      >
        Error
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            title: "Warning",
            description: "Disk space running low.",
            variant: "warning",
          })
        }
      >
        Warning
      </Button>
    </div>
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

      {/* Button — Variants */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Button — Variants
        </h2>
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      {/* Button — Sizes */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Button — Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((s) => (
            <Button key={s} size={s}>
              Size {s}
            </Button>
          ))}
        </div>
      </section>

      {/* Button — Loading → Success */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Button — Loading → Success
        </h2>
        <LoadingDemo />
      </section>

      {/* Button — Disabled */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Button — Disabled
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="destructive" disabled>
            Can&apos;t delete
          </Button>
        </div>
      </section>

      {/* Toggle */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Toggle
        </h2>
        <ToggleDemo />
      </section>

      {/* Dialog */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Dialog
        </h2>
        <DialogDemo />
      </section>

      {/* Toast */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Toast
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
          Swipe horizontally to dismiss. Hover to pause auto-dismiss.
        </p>
        <ToastDemo />
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
