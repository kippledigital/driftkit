import React from "react";
import Link from "next/link";

export default function IntroductionPage() {
  return (
    <div className="py-12 px-8 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
        Introduction
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
        DriftKit is a collection of 49+ React components where every hover, press, and transition is powered by spring physics — not CSS keyframes, not bezier curves.
      </p>

      <div className="space-y-8 text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Why DriftKit?
          </h2>
          <p className="mb-4">
            Most UI libraries treat animation as decoration — a CSS transition tacked on at the end. DriftKit treats motion as a <strong className="text-neutral-900 dark:text-white">core design primitive</strong>. Every component is built motion-first, with spring physics baked into the interaction model.
          </p>
          <p>
            The result: interactions that feel <em>physical</em> instead of <em>scripted</em>. A button that responds to your finger pressure. A card that tilts toward your cursor. A menu that follows your mouse with natural momentum.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Design Principles
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-lg shrink-0">⚡</span>
              <div>
                <strong className="text-neutral-900 dark:text-white">Motion IS the design</strong>
                <p className="text-sm mt-0.5">Animation isn&apos;t bolted on afterward — it&apos;s how the component communicates. A loading button doesn&apos;t just show a spinner, it physically transforms through states.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-lg shrink-0">🌊</span>
              <div>
                <strong className="text-neutral-900 dark:text-white">Springs over bezier curves</strong>
                <p className="text-sm mt-0.5">Springs have no fixed duration. They respond to velocity, can be interrupted at any point, and naturally blend into new targets. <Link href="/docs/spring-physics" className="underline hover:text-neutral-900 dark:hover:text-white">Learn more →</Link></p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-lg shrink-0">✋</span>
              <div>
                <strong className="text-neutral-900 dark:text-white">Interruptible everything</strong>
                <p className="text-sm mt-0.5">Hover mid-press? Press mid-hover? It should feel smooth, not jarring. Every DriftKit animation can be interrupted and redirected mid-flight.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-lg shrink-0">♿</span>
              <div>
                <strong className="text-neutral-900 dark:text-white">Reduced motion respected</strong>
                <p className="text-sm mt-0.5">Every component checks <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">useReducedMotion</code> and degrades gracefully. Motion should enhance, never exclude.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-lg shrink-0">📋</span>
              <div>
                <strong className="text-neutral-900 dark:text-white">Copy, don&apos;t install</strong>
                <p className="text-sm mt-0.5">Grab the component file, drop it in your project, customize freely. No package lock-in, no version conflicts, full ownership of the code.</p>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">49+</div>
              <div className="text-sm">Components</div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">9</div>
              <div className="text-sm">Categories</div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">100%</div>
              <div className="text-sm">TypeScript</div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">MIT</div>
              <div className="text-sm">Licensed</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Who It&apos;s For
          </h2>
          <ul className="space-y-2 text-sm">
            <li>→ <strong className="text-neutral-900 dark:text-white">Design engineers</strong> who want motion that feels intentional</li>
            <li>→ <strong className="text-neutral-900 dark:text-white">Designers learning to code</strong> who want beautiful defaults out of the box</li>
            <li>→ <strong className="text-neutral-900 dark:text-white">React developers</strong> who care about interaction quality</li>
            <li>→ <strong className="text-neutral-900 dark:text-white">Anyone tired of CSS ease-in-out</strong> on everything</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between">
        <div />
        <Link
          href="/docs/installation"
          className="text-sm font-medium text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          Installation →
        </Link>
      </div>
    </div>
  );
}
