import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getComponentInfo, getAllComponentNames } from "../../data/components";

// Import all components for live previews
import * as Components from "../../../../components";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all components
export async function generateStaticParams() {
  const componentNames = getAllComponentNames();
  return componentNames.map((name) => ({
    slug: name,
  }));
}

function ComponentPreview({ componentName, example }: { componentName: string; example: string }) {
  try {
    // This is a simplified preview - in a real implementation you'd want to
    // safely evaluate the JSX example string
    const ComponentToRender = (Components as any)[componentName] || (() => <div>Preview not available</div>);
    
    return (
      <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-center min-h-[200px]">
          <ComponentToRender>Sample content</ComponentToRender>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-center min-h-[200px] text-neutral-500 dark:text-neutral-400">
          Preview not available
        </div>
      </div>
    );
  }
}

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  return (
    <div className="relative">
      <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
        title="Copy code"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      </button>
    </div>
  );
}

export default function ComponentPage({ params }: PageProps) {
  const componentInfo = getComponentInfo(params.slug);
  
  if (!componentInfo) {
    // For components not in detailed data, provide basic fallback
    const fallbackComponent = {
      name: params.slug,
      displayName: params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      description: "A motion-first UI component built with Framer Motion.",
      importPath: `import { ${params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} } from "driftkit";`,
      props: [],
      examples: [`<${params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} />`],
      category: "Utility",
      githubUrl: `https://github.com/kippledigital/driftkit/blob/main/src/components/${params.slug}.tsx`
    };
    
    if (!getAllComponentNames().includes(params.slug)) {
      notFound();
    }
    
    // Use fallback data for components not yet detailed  
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
          <ComponentPreview componentName={info.name} example={info.examples[0]} />
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
                  <ComponentPreview componentName={info.name} example={example} />
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