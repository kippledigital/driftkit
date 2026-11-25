"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

export interface CodeDisplayProps {
  title: string;
  code: string;
  language?: string;
}

// Syntax highlighting for TSX/JSX in a single left-to-right pass.
// Chained find-and-replace passes match the markup earlier passes inserted
// (the string rule catches class="token-…"), so the output showed raw tags.
// This tokenizer reads the source once and returns React nodes, so nothing is
// injected as HTML and a <Button> in the snippet is shown, not rendered.
const TOKEN = new RegExp(
  [
    String.raw`(\/\/[^\n]*|\/\*[\s\S]*?\*\/)`, // 1 comment
    String.raw`("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|` + "`(?:[^`\\\\]|\\\\.)*`)", // 2 string
    String.raw`(<\/?)([A-Za-z][\w.]*)`, // 3 bracket, 4 tag name
    String.raw`\b(const|let|var|function|return|if|else|for|while|class|export|import|from|default|type|interface|extends|implements|new|async|await)\b`, // 5 keyword
    String.raw`\b(true|false|null|undefined)\b`, // 6 literal
    String.raw`\b(\d+(?:\.\d+)?)\b`, // 7 number
    String.raw`([A-Za-z_$][\w$-]*)(?=\s*=(?!=))`, // 8 attribute / assignment
    String.raw`([A-Za-z_$][\w$]*)(?=\s*:)`, // 9 property
  ].join("|"),
  "g"
);

function highlightTSX(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const push = (cls: string, text: string) => out.push(<span key={out.length} className={`token-${cls}`}>{text}</span>);
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    if (m[1]) push("comment", m[1]);
    else if (m[2]) push("string", m[2]);
    else if (m[3]) {
      out.push(m[3]);
      push("tag", m[4]);
    } else if (m[5]) push("keyword", m[5]);
    else if (m[6]) push("boolean", m[6]);
    else if (m[7]) push("number", m[7]);
    else if (m[8]) push("attr", m[8]);
    else if (m[9]) push("property", m[9]);
    last = TOKEN.lastIndex;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeDisplay({ title, code, language = "tsx" }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const highlightedCode = useMemo(() => {
    if (language === "tsx" || language === "jsx") return highlightTSX(code);
    return [code];
  }, [code, language]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
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
    }
  }, [code]);

  return (
    <div className="w-full min-w-0 max-w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h2>
        
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
          <div className="max-w-full overflow-x-auto p-4">
            <pre className="text-sm font-mono text-neutral-200 leading-relaxed">
              <code className="syntax-highlight">{highlightedCode}</code>
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