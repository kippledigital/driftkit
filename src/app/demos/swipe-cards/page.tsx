"use client"

import { useState } from 'react'
import { motion, PanInfo, AnimatePresence } from 'framer-motion'

interface Card {
  id: string
  title: string
  subtitle: string
  gradient: string
  icon: string
  accent: string
  description: string
}

const cards: Card[] = [
  {
    id: '1',
    title: 'Frontend Mastery',
    subtitle: 'React • TypeScript • Next.js',
    gradient: 'from-purple-600 via-purple-700 to-indigo-800',
    icon: '⚡',
    accent: 'purple',
    description: 'Build lightning-fast web applications with modern tools'
  },
  {
    id: '2', 
    title: 'Design Systems',
    subtitle: 'Figma • Tokens • Components',
    gradient: 'from-pink-600 via-rose-700 to-orange-800',
    icon: '🎨',
    accent: 'pink',
    description: 'Create consistent, beautiful user interfaces at scale'
  },
  {
    id: '3',
    title: 'Motion Design', 
    subtitle: 'Framer Motion • GSAP • CSS',
    gradient: 'from-cyan-600 via-blue-700 to-indigo-800',
    icon: '✨',
    accent: 'cyan',
    description: 'Bring your interfaces to life with smooth animations'
  },
  {
    id: '4',
    title: 'Performance',
    subtitle: 'Optimization • Monitoring • Speed',
    gradient: 'from-emerald-600 via-green-700 to-teal-800',
    icon: '🚀',
    accent: 'emerald',
    description: 'Ship blazing fast applications that users love'
  },
  {
    id: '5',
    title: 'User Experience',
    subtitle: 'Research • Testing • Analytics',
    gradient: 'from-amber-600 via-orange-700 to-red-800',
    icon: '🎯',
    accent: 'amber',
    description: 'Design experiences that convert and delight users'
  }
]

export default function SwipeCardsDemo() {
  const [currentCards, setCurrentCards] = useState(cards)
  const [swipedCards, setSwipedCards] = useState<Card[]>([])

  const swipeCard = (direction: 'left' | 'right', card: Card) => {
    setCurrentCards(prev => prev.filter(c => c.id !== card.id))
    setSwipedCards(prev => [...prev, { ...card, swipeDirection: direction }])
  }

  const resetCards = () => {
    setCurrentCards(cards)
    setSwipedCards([])
  }

  const swipeVariants = {
    hidden: { scale: 0, opacity: 0, rotateY: 180 },
    visible: (i: number) => ({
      scale: 1 - i * 0.05,
      opacity: 1 - i * 0.1,
      rotateY: 0,
      y: i * 10,
      x: i * 5,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 30,
        delay: i * 0.1
      }
    }),
    swiped: (direction: string) => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction === 'right' ? 30 : -30,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Swipe Card Stack 🃏
          </h1>
          <p className="text-xl text-indigo-200">
            Swipe left or right with spring physics
          </p>
        </motion.div>

        {/* Card Stack Container */}
        <div className="relative flex justify-center items-center min-h-[600px]">
          {/* Background Cards */}
          <AnimatePresence>
            {currentCards.slice().reverse().map((card, i) => {
              const actualIndex = currentCards.length - 1 - i
              const isTop = actualIndex === 0
              
              return (
                <motion.div
                  key={card.id}
                  custom={actualIndex}
                  variants={swipeVariants}
                  initial="hidden"
                  animate="visible"
                  className={`absolute w-80 h-96 ${isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
                  style={{ zIndex: actualIndex + 1 }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  whileDrag={isTop ? { scale: 1.05, rotate: 0 } : {}}
                  onDragEnd={(event, info: PanInfo) => {
                    if (!isTop) return
                    
                    const swipeThreshold = 150
                    const swipeVelocityThreshold = 500
                    
                    if (
                      Math.abs(info.offset.x) > swipeThreshold ||
                      Math.abs(info.velocity.x) > swipeVelocityThreshold
                    ) {
                      swipeCard(info.offset.x > 0 ? 'right' : 'left', card)
                    }
                  }}
                >
                  <motion.div
                    className={`w-full h-full rounded-3xl shadow-2xl backdrop-blur-sm border border-white/10 p-8 bg-gradient-to-br ${card.gradient} relative overflow-hidden`}
                    whileHover={isTop ? { y: -10 } : {}}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 blur-2xl -z-10`} />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon */}
                      <motion.div
                        className="text-6xl mb-6"
                        animate={isTop ? {
                          rotate: [0, 10, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {card.icon}
                      </motion.div>
                      
                      {/* Title */}
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      
                      {/* Subtitle */}
                      <p className="text-lg text-white/80 mb-6">
                        {card.subtitle}
                      </p>
                      
                      {/* Description */}
                      <p className="text-white/70 flex-1 text-lg leading-relaxed">
                        {card.description}
                      </p>
                      
                      {/* Swipe indicators */}
                      {isTop && (
                        <div className="flex justify-between items-center mt-6">
                          <motion.div
                            className="flex items-center gap-2 text-red-300"
                            animate={{ x: [-5, 5, -5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="text-2xl">←</span>
                            <span className="text-sm font-semibold">NOPE</span>
                          </motion.div>
                          
                          <motion.div
                            className="flex items-center gap-2 text-green-300"
                            animate={{ x: [5, -5, 5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          >
                            <span className="text-sm font-semibold">LIKE</span>
                            <span className="text-2xl">→</span>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          
          {/* Empty state */}
          {currentCards.length === 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-center"
            >
              <div className="text-8xl mb-8">🎉</div>
              <h3 className="text-3xl font-bold text-white mb-4">All Done!</h3>
              <p className="text-xl text-indigo-200 mb-8">You've swiped through all the cards</p>
              <motion.button
                onClick={resetCards}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              >
                Reset Cards
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-12 text-indigo-200 text-lg space-y-2"
        >
          <p>✨ Drag cards left or right to swipe them away ✨</p>
          <p className="text-sm opacity-75">Desktop: Click and drag • Mobile: Swipe gesture</p>
        </motion.div>
      </div>
    </div>
  )
}