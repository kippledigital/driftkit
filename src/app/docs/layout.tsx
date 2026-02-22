"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Component categories with their components
const componentCategories = {
  "Layout": [
    "card", "skeleton", "gradient-border", "glow-card", "expandable-card", "wobble-card"
  ],
  "Navigation": [
    "nav-menu", "breadcrumbs", "tabs", "animated-tabs", "stepper", "magnetic-dock"
  ],
  "Feedback": [
    "toast", "tooltip", "dialog", "drawer", "progress-ring", "skeleton"
  ],
  "Data Display": [
    "badge", "accordion", "code-block", "code-display", "number-ticker", "animated-counter"
  ],
  "Overlay": [
    "popover", "context-menu", "dropdown", "command-palette", "spotlight"
  ],
  "Input": [
    "button", "input", "toggle", "multi-select", "date-range-picker", "schedule-picker"
  ],
  "Animation": [
    "typewriter", "marquee", "text-shimmer", "staggered-list", "scroll-reveal", 
    "parallax-tilt-card", "parallax-scroll", "spring-carousel", "swipe-cards",
    "morphing-shape", "cursor-trail"
  ],
  "Buttons": [
    "magnetic-button", "ripple-button", "liquid-button", "morphing-hamburger"
  ],
  "Utility": [
    "component-switcher", "control-panel", "mode-switcher"
  ]
};

function ComponentSidebar({ 
  isOpen, 
  onClose, 
  isMobile 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  isMobile: boolean; 
}) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "Layout": true,
    "Navigation": true,
    "Feedback": true,
    "Data Display": true,
    "Overlay": true,
    "Input": true,
    "Animation": true,
    "Buttons": true,
    "Utility": true,
  });

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="p-6">
      {/* Close button for mobile */}
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
          aria-label="Close navigation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <Link 
        href="/docs" 
        onClick={handleLinkClick}
        className="block mb-8 text-xl font-medium text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
      >
        Components
      </Link>
      
      <nav className="space-y-6">
        {Object.entries(componentCategories).map(([category, components]) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between w-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors mb-2"
            >
              {category}
              <motion.div
                animate={{ rotate: openCategories[category] ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openCategories[category] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 ml-4">
                    {components.map(component => {
                      const href = `/docs/components/${component}`;
                      const isActive = pathname === href;
                      
                      return (
                        <Link
                          key={component}
                          href={href}
                          onClick={handleLinkClick}
                          className={`block px-3 py-1.5 text-sm rounded-md transition-colors relative ${
                            isActive 
                              ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                          }`}
                        >
                          {component.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={onClose}
            />
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto z-50 md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden md:block w-64 bg-white/50 dark:bg-neutral-900/50 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto">
      {sidebarContent}
    </aside>
  );
}

function MobileHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuToggle}
          className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        
        <Link 
          href="/docs"
          className="text-lg font-medium text-neutral-900 dark:text-white"
        >
          DriftKit Docs
        </Link>
        
        <div className="w-8" /> {/* Spacer for centering */}
      </div>
    </header>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <MobileHeader onMenuToggle={() => setIsSidebarOpen(true)} />
      
      <div className="flex">
        <ComponentSidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isMobile={isMobile}
        />
        
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}