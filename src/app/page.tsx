"use client";

import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/button";
import { Toggle } from "@/components/toggle";
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/dialog";
import { useToast } from "@/components/toast";
import { Tooltip } from "@/components/tooltip";
import { Dropdown, type DropdownItem } from "@/components/dropdown";
import { Card, CardHeader, CardContent, CardFooter, FlipCard } from "@/components/card";
import { Tabs } from "@/components/tabs";
import { Accordion } from "@/components/accordion";
import { Input } from "@/components/input";
import { Skeleton } from "@/components/skeleton";
import { NavMenu } from "@/components/nav-menu";

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
        <Toggle size="sm" checked={checked} onChange={setChecked} aria-label="Small" />
        <Toggle size="md" checked={checked} onChange={setChecked} aria-label="Medium" />
        <Toggle size="lg" checked={checked} onChange={setChecked} aria-label="Large" />
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
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} size="md" title="Example dialog">
        <DialogTitle>Spring-animated dialog</DialogTitle>
        <DialogDescription>
          Springs in from scale 0.95. Backdrop blurs smoothly. Closing feels snappier than opening.
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" onClick={() => setOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function DropdownDemo() {
  const items: DropdownItem[] = [
    { label: "Edit", onClick: () => {} },
    { label: "Duplicate", onClick: () => {} },
    { separator: true, label: "Archive", onClick: () => {} },
    { label: "Delete", onClick: () => {} },
  ];
  return (
    <Dropdown trigger={<Button variant="secondary" size="sm">Open menu</Button>} items={items} />
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Hello!", description: "Default toast." })}>Default</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Saved!", description: "Changes saved.", variant: "success" })}>Success</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "error" })}>Error</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Warning", description: "Disk space low.", variant: "warning" })}>Warning</Button>
    </div>
  );
}

function InputDemo() {
  const [state, setState] = useState<"default" | "error" | "success">("default");
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input label="Email" placeholder="you@example.com" state={state} errorMessage={state === "error" ? "Please enter a valid email" : undefined} />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setState("default")}>Default</Button>
        <Button size="sm" variant="secondary" onClick={() => setState("error")}>Error</Button>
        <Button size="sm" variant="secondary" onClick={() => setState("success")}>Success</Button>
      </div>
    </div>
  );
}

function SkeletonDemo() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex gap-3 items-start">
        <Skeleton variant="avatar" loaded={loaded}>
          <div className="w-10 h-10 rounded-full bg-blue-500" />
        </Skeleton>
        <Skeleton variant="text" lines={2} loaded={loaded}>
          <div>
            <p className="text-sm font-medium">Nikki Kipple</p>
            <p className="text-xs text-neutral-500">Design Engineer & Educator</p>
          </div>
        </Skeleton>
      </div>
      <Skeleton variant="card" height={80} loaded={loaded}>
        <div className="p-4 rounded-[8px] border border-neutral-200 dark:border-neutral-800">
          <p className="text-sm">This content was loaded with a spring crossfade.</p>
        </div>
      </Skeleton>
      <Button size="sm" variant="secondary" onClick={() => setLoaded(!loaded)}>
        {loaded ? "Show skeleton" : "Load content"}
      </Button>
    </div>
  );
}

function NavMenuDemo() {
  const [active, setActive] = useState("home");
  return (
    <NavMenu
      items={[
        { id: "home", label: "Home" },
        { id: "components", label: "Components" },
        { id: "docs", label: "Docs" },
        { id: "blog", label: "Blog" },
      ]}
      activeId={active}
      onActiveChange={setActive}
    />
  );
}

function TabsDemo() {
  return (
    <Tabs
      items={[
        { value: "preview", label: "Preview", content: <div className="p-4 text-sm text-neutral-500">Live preview of the component with spring animations.</div> },
        { value: "code", label: "Code", content: <div className="p-4 text-sm font-mono text-neutral-500">{'<Button variant="default">Click me</Button>'}</div> },
        { value: "props", label: "Props", content: <div className="p-4 text-sm text-neutral-500">variant, size, loading, success, disabled</div> },
      ]}
    />
  );
}

function AccordionDemo() {
  return (
    <Accordion
      type="single"
      items={[
        { value: "1", trigger: "What makes driftkit different?", content: "Every component is designed motion-first. Spring physics, not CSS transitions. The animation IS the design." },
        { value: "2", trigger: "Do I need to install anything?", content: "Just framer-motion and tailwindcss. Copy the component file into your project." },
        { value: "3", trigger: "Can I customize the spring values?", content: "Every spring config is clearly commented. Tweak stiffness, damping, and mass to match your brand's feel." },
      ]}
    />
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

      <Section title="Navigation Menu">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">Sliding indicator follows your mouse with spring physics.</p>
        <NavMenuDemo />
      </Section>

      <Section title="Button — Variants">
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>)}
        </div>
      </Section>

      <Section title="Button — Sizes">
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((s) => <Button key={s} size={s}>Size {s}</Button>)}
        </div>
      </Section>

      <Section title="Button — Loading → Success">
        <LoadingDemo />
      </Section>

      <Section title="Input">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">Floating label, focus ring, error shake, success checkmark.</p>
        <InputDemo />
      </Section>

      <Section title="Toggle">
        <ToggleDemo />
      </Section>

      <Section title="Tabs">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">Direction-aware content slide with spring indicator.</p>
        <TabsDemo />
      </Section>

      <Section title="Accordion">
        <AccordionDemo />
      </Section>

      <Section title="Dialog">
        <DialogDemo />
      </Section>

      <Section title="Tooltip">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">Spring pop-in with auto-positioning.</p>
        <div className="flex flex-wrap gap-6">
          <Tooltip content="Top" position="top"><Button variant="secondary" size="sm">Top</Button></Tooltip>
          <Tooltip content="Bottom" position="bottom"><Button variant="secondary" size="sm">Bottom</Button></Tooltip>
          <Tooltip content="I follow ✨" followCursor><Button variant="ghost" size="sm">Follow</Button></Tooltip>
        </div>
      </Section>

      <Section title="Dropdown Menu">
        <DropdownDemo />
      </Section>

      <Section title="Card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card variant="interactive">
            <CardHeader><h3 className="text-base font-semibold">Interactive</h3></CardHeader>
            <CardContent><p className="text-sm text-neutral-500">Hover lift + press sink.</p></CardContent>
          </Card>
          <FlipCard
            front={<div className="p-6"><h3 className="font-semibold">Front</h3><p className="text-sm text-neutral-500">Click to flip →</p></div>}
            back={<div className="p-6"><h3 className="font-semibold">Back</h3><p className="text-sm text-neutral-500">Click to flip back →</p></div>}
          />
        </div>
      </Section>

      <Section title="Skeleton">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">Shimmer loading with spring crossfade reveal.</p>
        <SkeletonDemo />
      </Section>

      <Section title="Toast">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">Swipe to dismiss. Hover to pause.</p>
        <ToastDemo />
      </Section>

      <footer className="mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-400">
        Built by{" "}
        <a href="https://nikkikipple.com" className="underline hover:text-neutral-600 dark:hover:text-neutral-300">
          Nikki Kipple
        </a>
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">{title}</h2>
      {children}
    </section>
  );
}
