"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

export interface CodeDisplayProps {
  title: string;
  code: string;
  language?: string;
}

// Simple syntax highlighting for TSX/JSX
function highlightTSX(code: string): string {
  return code
    // JSX tags and components
    .replace(/(<\/?)([A-Z][a-zA-Z0-9]*|[a-z]+)(\s|>)/g, '$1<span class="token-tag">$2</span>$3')
    // JSX attributes
    .replace(/(\s)([a-zA-Z-]+)(=)/g, '$1<span class="token-attr">$2</span>$3')
    // String values
    .replace(/"([^"]*)"/g, '"<span class="token-string">$1</span>"')
    .replace(/'([^']*)'/g, '\'<span class="token-string">$1</span>\'')
    // Template literals
    .replace(/`([^`]*)`/g, '`<span class="token-template">$1</span>`')
    // Numbers
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token-number">$1</span>')
    // Keywords
    .replace(/\b(const|let|var|function|return|if|else|for|while|class|export|import|from|default|type|interface|extends|implements)\b/g, '<span class="token-keyword">$1</span>')
    // Boolean values
    .replace(/\b(true|false|null|undefined)\b/g, '<span class="token-boolean">$1</span>')
    // Comments
    .replace(/\/\*[\s\S]*?\*\//g, '<span class="token-comment">$&</span>')
    .replace(/\/\/.*$/gm, '<span class="token-comment">$&</span>')
    // Object properties
    .replace(/(\w+)(\s*:)/g, '<span class="token-property">$1</span>$2')
    // Curly braces content (JSX expressions)
    .replace(/\{([^}]*)\}/g, '{<span class="token-expression">$1</span>}');
}

export function CodeDisplay({ title, code, language = "tsx" }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const highlightedCode = useMemo(() => {
    if (language === "tsx" || language === "jsx") {
      return highlightTSX(code);
    }
    return code;
  }, [code, language]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        
        <motion.button
          className={`px-3 py-1.5 text-sm font-mono rounded transition-colors ${
            copied
              ? "bg-green-600 text-white"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          }`}
          onClick={handleCopy}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? "✓ Copied!" : "Copy Code"}
        </motion.button>
      </div>

      {/* Code Block */}
      <div className="relative">
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden">
          {/* Language indicator */}
          <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800">
            <span className="text-xs font-mono text-neutral-400 uppercase">
              {language}
            </span>
          </div>
          
          {/* Code content */}
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-neutral-200 leading-relaxed">
              <code 
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                className="syntax-highlight"
              />
            </pre>
          </div>
        </div>
        
        {/* Copy indicator overlay */}
        {copied && (
          <motion.div
            className="absolute inset-0 bg-green-500 bg-opacity-10 border-2 border-green-500 rounded-lg flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
              Code copied to clipboard!
            </div>
          </motion.div>
        )}
      </div>

      {/* Syntax highlighting styles */}
      <style jsx>{`
        :global(.syntax-highlight .token-tag) { color: #ff7b72; }
        :global(.syntax-highlight .token-attr) { color: #79c0ff; }
        :global(.syntax-highlight .token-string) { color: #a5d6ff; }
        :global(.syntax-highlight .token-template) { color: #a5d6ff; }
        :global(.syntax-highlight .token-number) { color: #79c0ff; }
        :global(.syntax-highlight .token-keyword) { color: #ff7b72; font-weight: 600; }
        :global(.syntax-highlight .token-boolean) { color: #79c0ff; }
        :global(.syntax-highlight .token-comment) { color: #8b949e; font-style: italic; }
        :global(.syntax-highlight .token-property) { color: #79c0ff; }
        :global(.syntax-highlight .token-expression) { color: #ffa657; }
      `}</style>
    </div>
  );
}