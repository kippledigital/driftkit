"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Demo {
  id: string
  title: string
  subtitle: string
  description: string
  href: string
  gradient: string
  icon: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const demos: Demo[] = [
  {
    id: '1',
    title: 'Drag to Reorder',
    subtitle: 'Interactive List Management',
    description: 'A beautiful drag-and-drop interface with spring physics. Reorder items with satisfying animations and visual feedback.',
    href: '/demos/drag-reorder',
    gradient: 'from-purple-600 via-pink-600 to-red-600',
    icon: '🎯',
    tags: ['Drag & Drop', 'Reorder', 'Spring Physics'],
    difficulty: 'Intermediate'
  },
  {
    id: '2',
    title: 'Swipe Card Stack',
    subtitle: 'Tinder-style Interactions',
    description: 'Smooth card swiping with physics-based animations. Perfect for decision-making interfaces and content discovery.',
    href: '/demos/swipe-cards',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
    icon: '🃏',
    tags: ['Swipe Gesture', 'Card UI', 'Mobile-first'],
    difficulty: 'Advanced'
  },
  {
    id: '3',
    title: 'Parallax Scroll',
    subtitle: 'Immersive Storytelling',
    description: 'Cinematic parallax effects that create depth and immersion. Multiple layers moving at different speeds for visual impact.',
    href: '/demos/parallax-scroll',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    icon: '✨',
    tags: ['Parallax', 'Scroll Effects', 'Storytelling'],
    difficulty: 'Intermediate'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
    }
  }
}

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-7xl font-bold text-white mb-6 leading-none"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Flashy
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
              style={{
                backgroundSize: "200% 100%"
              }}
            >
              Interactions
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Three stunning interaction demos designed to showcase the power of 
            <span className="text-pink-400 font-semibold"> framer-motion</span> and 
            <span className="text-cyan-400 font-semibold"> React 19</span>
          </motion.p>
          
          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {['Spring Physics', 'Gesture Support', 'Smooth 60fps', 'Mobile Optimized'].map((feature, i) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm font-medium"
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/40 text-sm"
          >
            ↓ Scroll to explore demos ↓
          </motion.div>
        </motion.div>

        {/* Demo Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="group relative"
            >
              <Link href={demo.href}>
                <motion.div
                  className={`relative h-80 rounded-3xl p-8 bg-gradient-to-br ${demo.gradient} shadow-2xl cursor-pointer overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-50 blur-2xl group-hover:opacity-70 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <motion.div
                        className="text-5xl"
                        animate={{
                          rotate: [0, 5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      >
                        {demo.icon}
                      </motion.div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white`}>
                        {demo.difficulty}
                      </span>
                    </div>
                    
                    {/* Title & Subtitle */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {demo.title}
                    </h3>
                    <p className="text-lg text-white/80 mb-4 font-medium">
                      {demo.subtitle}
                    </p>
                    
                    {/* Description */}
                    <p className="text-white/70 flex-1 leading-relaxed mb-6">
                      {demo.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {demo.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 text-white font-semibold"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <span>Explore Demo</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/15 rounded-full blur-lg" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto">
            <motion.div
              className="text-4xl mb-6"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎨
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Built with DriftKit
            </h2>
            <p className="text-xl text-white/70 mb-8">
              These demos showcase the power of motion-first React components. 
              Each interaction is carefully crafted with spring physics and smooth animations.
            </p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-6 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <span>• Framer Motion 12.34.2</span>
              <span>• React 19</span>
              <span>• TypeScript</span>
              <span>• Tailwind CSS</span>
              <span>• Next.js</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Background animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}