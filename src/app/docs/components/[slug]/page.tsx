import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getComponentInfo, getAllComponentNames } from "../../data/components";
import { CodeBlock, ComponentPreview } from "./client";
import TryIt from "./try-it";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all components
export async function generateStaticParams() {
  const componentNames = getAllComponentNames();
  return componentNames.map((name) => ({
    slug: name,
  }));
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  
  if (!getAllComponentNames().includes(slug)) {
    notFound();
  }

  const componentInfo = getComponentInfo(slug);
  
  const fallbackComponent = {
    name: slug,
    displayName: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: "A motion-first UI component built with Framer Motion.",
    importPath: `import { ${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} } from "driftkit";`,
    props: [] as { name: string; type: string; required: boolean; description?: string }[],
    examples: [`<${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} />`],
    category: "Utility",
    githubUrl: `https://github.com/kippledigital/driftkit/blob/main/src/components/${slug}.tsx`
  };
  
  const info = componentInfo || fallbackComponent;

  return (
    <div className="px-8 py-12">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            <Link href="/docs" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
              Components
            </Link>
            <span className="mx-2">→</span>
            <span className="text-neutral-900 dark:text-white">{info.displayName}</span>
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-medium text-neutral-900 dark:text-white mb-2">
                {info.displayName}
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                {info.description}
              </p>
            </div>
            <div className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded">
              {info.category}
            </div>
          </div>
        </div>

        {/* Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-6">Preview</h2>
          <ComponentPreview componentName={info.name} />
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-6">Installation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">Copy and paste</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Copy the component source code and paste it into your project.
              </p>
              <CodeBlock code={info.importPath} language="typescript" />
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-6">Usage</h2>
          <div className="space-y-8">
            {info.examples.map((example, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                  Example {index + 1}
                </h3>
                <div className="space-y-4">
                  <ComponentPreview componentName={info.name} />
                  <CodeBlock code={example} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Props */}
        {info.props.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-6">Props</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <th className="text-left py-3 pr-6 font-medium text-neutral-900 dark:text-white">Name</th>
                    <th className="text-left py-3 pr-6 font-medium text-neutral-900 dark:text-white">Type</th>
                    <th className="text-left py-3 pr-6 font-medium text-neutral-900 dark:text-white">Required</th>
                    <th className="text-left py-3 font-medium text-neutral-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {info.props.map((prop) => (
                    <tr key={prop.name} className="border-b border-neutral-100 dark:border-neutral-900">
                      <td className="py-3 pr-6">
                        <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-900 dark:text-neutral-100">
                          {prop.name}
                        </code>
                      </td>
                      <td className="py-3 pr-6">
                        <code className="text-sm text-neutral-600 dark:text-neutral-400">
                          {prop.type}
                        </code>
                      </td>
                      <td className="py-3 pr-6">
                        <span className={`text-sm ${prop.required ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-500'}`}>
                          {prop.required ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-neutral-600 dark:text-neutral-400">
                        {prop.description || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Try It */}
        <section className="mb-12">
          <TryIt componentName={info.name} />
        </section>

        {/* Source Code */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-6">Source Code</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            View the source code on GitHub to see the full implementation.
          </p>
          <Link
            href={info.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
          >
            View on GitHub
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}
