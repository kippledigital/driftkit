"use client"

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

interface Section {
  id: string
  title: string
  subtitle: string
  content: string
  gradient: string
  icon: string
  accent: string
}

const sections: Section[] = [
  {
    id: '1',
    title: 'The Journey Begins',
    subtitle: 'Every great product starts with a vision',
    content: 'In the realm of digital creation, where pixels dance and code breathes life into ideas, we embark on a journey of endless possibilities. Each line of code is a brushstroke on the canvas of innovation.',
    gradient: 'from-purple-900 via-blue-900 to-indigo-900',
    icon: '🚀',
    accent: 'purple'
  },
  {
    id: '2',
    title: 'Crafting Experiences',
    subtitle: 'Where design meets functionality',
    content: 'The art of user experience flows through every interaction, every animation, every micro-detail that transforms a simple interface into a memorable journey. We shape digital experiences that resonate with the human soul.',
    gradient: 'from-pink-900 via-rose-900 to-orange-900',
    icon: '✨',
    accent: 'pink'
  },
  {
    id: '3',
    title: 'Motion & Life',
    subtitle: 'Animations that tell stories',
    content: 'Movement brings interfaces to life, creating connections between user intent and digital response. Every transition, every spring animation, every carefully crafted easing curve contributes to the symphony of interaction.',
    gradient: 'from-cyan-900 via-teal-900 to-green-900',
    icon: '🎭',
    accent: 'cyan'
  },
  {
    id: '4',
    title: 'Performance Matters',
    subtitle: 'Speed is a feature, not an option',
    content: 'In the milliseconds between thought and action, between click and response, lies the difference between frustration and delight. We optimize every frame, every calculation, every byte to deliver experiences that feel instant.',
    gradient: 'from-amber-900 via-orange-900 to-red-900',
    icon: '⚡',
    accent: 'amber'
  },
  {
    id: '5',
    title: 'The Future Awaits',
    subtitle: 'Innovation never sleeps',
    content: 'As we push the boundaries of what\'s possible, we remember that technology serves humanity. Every feature we build, every problem we solve, brings us closer to a world where digital and human experiences merge seamlessly.',
    gradient: 'from-violet-900 via-purple-900 to-indigo-900',
    icon: '🌟',
    accent: 'violet'
  }
]

function ParallaxSection({ 
  section, 
  scrollYProgress 
}: { 
  section: Section
  scrollYProgress: MotionValue<number>
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Individual scroll progress for this section
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Different parallax speeds for layered effect
  const y1 = useTransform(sectionProgress, [0, 1], [100, -100])
  const y2 = useTransform(sectionProgress, [0, 1], [200, -200])
  const y3 = useTransform(sectionProgress, [0, 1], [50, -50])
  const opacity = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  
  // Smooth spring animations
  const smoothY1 = useSpring(y1, { stiffness: 300, damping: 30 })
  const smoothY2 = useSpring(y2, { stiffness: 200, damping: 30 })
  const smoothY3 = useSpring(y3, { stiffness: 400, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 300, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 30 })

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: smoothOpacity, scale: smoothScale }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
    >
      {/* Animated background gradient */}
      <motion.div
        style={{ y: smoothY2 }}
        className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-90`}
      />
      
      {/* Floating background elements */}
      <motion.div
        style={{ y: smoothY1 }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: smoothY3 }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl"
      />
      <motion.div
        style={{ y: smoothY2 }}
        className="absolute top-3/4 left-1/3 w-32 h-32 bg-white/15 rounded-full blur-xl"
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Icon with floating animation */}
        <motion.div
          style={{ y: smoothY3 }}
          className="text-8xl mb-8 inline-block"
          animate={{
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.05, 1, 1.05, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {section.icon}
        </motion.div>
        
        {/* Title */}
        <motion.h2
          style={{ y: smoothY1 }}
          className="text-6xl font-bold text-white mb-6 leading-tight"
        >
          {section.title}
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p
          style={{ y: smoothY3 }}
          className="text-2xl text-white/80 mb-12 font-light"
        >
          {section.subtitle}
        </motion.p>
        
        {/* Content */}
        <motion.div
          style={{ y: smoothY1 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xl text-white/70 leading-relaxed">
            {section.content}
          </p>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      {section.id === '1' && (
        <motion.div
          style={{ y: smoothY3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default function ParallaxScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Global scroll effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -500])
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 300, damping: 30 })

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed background with parallax */}
      <motion.div
        style={{ y: smoothBackgroundY }}
        className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 -z-10"
      />
      
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        <div className="text-center z-10 px-8">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="text-8xl font-bold text-white mb-8 leading-none"
          >
            Parallax
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Scroll Magic
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl text-white/80 mb-12"
          >
            Experience the beauty of scroll-driven animations
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 1, type: "spring", bounce: 0.6 }}
            className="text-6xl"
          >
            ✨
          </motion.div>
        </div>
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-lg"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.section>
      
      {/* Parallax Sections */}
      {sections.map((section) => (
        <ParallaxSection
          key={section.id}
          section={section}
          scrollYProgress={scrollYProgress}
        />
      ))}
      
      {/* Footer */}
      <motion.section
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="text-center px-8">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-6xl font-bold text-white mb-8"
          >
            The End
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-white/70 mb-12"
          >
            Thank you for scrolling through this experience
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.6 }}
            className="text-4xl"
          >
            🌟
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}