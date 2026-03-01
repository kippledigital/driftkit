import React from "react";
import Link from "next/link";

const recipes = [
  {
    slug: "stripe-card-hover",
    title: "Stripe-Style Card Hover",
    description: "The signature Stripe pricing card hover — lift, glow, and subtle tilt that makes flat cards feel 3D.",
    difficulty: "Beginner",
    components: ["Card", "Glow Card"],
    tags: ["hover", "3D", "cards"],
    ready: true,
  },
  {
    slug: "form-micro-interactions",
    title: "Form Micro-Interactions",
    description: "Complete form flow: floating labels, error shake, success checkmark, submit button loading → done state.",
    difficulty: "Beginner",
    components: ["Input", "Button", "Toast"],
    tags: ["forms", "validation", "feedback"],
    ready: true,
  },
  {
    slug: "vercel-deploy-animation",
    title: "Vercel Deploy Animation",
    description: "Progress ring → checkmark morph with confetti burst. The 'shipped!' moment that makes deploys satisfying.",
    difficulty: "Intermediate",
    components: ["Progress Ring", "Animated Counter", "Badge"],
    tags: ["progress", "success", "state-change"],
    ready: false,
  },
  {
    slug: "apple-menu-bar",
    title: "Apple Menu Bar",
    description: "macOS dock magnification + menu bar hover indicator with spring physics. Cursor proximity drives scale.",
    difficulty: "Intermediate",
    components: ["Magnetic Dock", "Nav Menu"],
    tags: ["navigation", "cursor", "magnification"],
    ready: false,
  },
  {
    slug: "notion-page-transition",
    title: "Notion Page Transition",
    description: "Shared layout animation from list item → full page. The card expands in-place with content crossfade.",
    difficulty: "Advanced",
    components: ["Expandable Card", "Staggered List"],
    tags: ["page-transition", "shared-layout", "routing"],
    ready: false,
  },
  {
    slug: "spotify-now-playing",
    title: "Spotify Now Playing Bar",
    description: "Slide-up bar with progress, spring-animated album art rotation, and swipe-to-skip gesture.",
    difficulty: "Intermediate",
    components: ["Drawer", "Progress Ring", "Swipe Cards"],
    tags: ["media", "gesture", "slide"],
    ready: false,
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "text-green-500 bg-green-500/10 border-green-500/20",
  Intermediate: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  Advanced: "text-red-500 bg-red-500/10 border-red-500/20",
};

export default function RecipesPage() {
  return (
    <div className="py-12 px-8">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
          Motion Recipes
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mb-1">
          Real-world animation patterns from apps you use every day — rebuilt with DriftKit components and spring physics.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          {recipes.filter(r => r.ready).length} recipes available · {recipes.filter(r => !r.ready).length} more coming soon
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((recipe) => {
          const Card = (
            <div className={`p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl ${recipe.ready ? "hover:border-neutral-300 dark:hover:border-neutral-700" : "opacity-60"} transition-colors`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className={`text-lg font-semibold ${recipe.ready ? "text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300" : "text-neutral-500 dark:text-neutral-300 dark:text-neutral-500 dark:text-neutral-300"} transition-colors`}>
                  {recipe.title}
                </h3>
                <div className="flex gap-2">
                  {!recipe.ready && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full border text-neutral-400 bg-neutral-400/10 border-neutral-400/20">
                      Coming Soon
                    </span>
                  )}
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${difficultyColor[recipe.difficulty]}`}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">
                {recipe.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {recipe.components.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          );

          return recipe.ready ? (
            <Link key={recipe.slug} href={`/docs/recipes/${recipe.slug}`} className="group block">
              {Card}
            </Link>
          ) : (
            <div key={recipe.slug} className="cursor-default">
              {Card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
