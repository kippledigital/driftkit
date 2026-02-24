"use client";

import React, { useState } from "react";
import { ComponentPreview } from "./client";
import Usage from "./usage";

interface TabsProps {
  componentName: string;
}

export default function ComponentTabs({ componentName }: TabsProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'usage'>('preview');

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="flex border-b border-neutral-200 dark:border-neutral-800">
          <button 
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'usage'
                ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
            onClick={() => setActiveTab('usage')}
          >
            Usage
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'preview' ? (
        <ComponentPreview componentName={componentName} />
      ) : (
        <Usage componentName={componentName} />
      )}
    </section>
  );
}