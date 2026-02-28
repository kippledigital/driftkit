"use client"

import { useState } from 'react'
import { motion, Reorder, AnimatePresence } from 'framer-motion'

interface TodoItem {
  id: string
  text: string
  color: string
  emoji: string
  completed?: boolean
}

const initialItems: TodoItem[] = [
  { id: '1', text: 'Design the perfect user interface', color: 'from-purple-500 to-pink-600', emoji: '🎨' },
  { id: '2', text: 'Build mind-blowing animations', color: 'from-blue-500 to-cyan-600', emoji: '✨' },
  { id: '3', text: 'Ship features that users love', color: 'from-emerald-500 to-green-600', emoji: '🚀' },
  { id: '4', text: 'Optimize for blazing performance', color: 'from-orange-500 to-red-600', emoji: '⚡' },
  { id: '5', text: 'Create delightful micro-interactions', color: 'from-violet-500 to-purple-600', emoji: '🎭' },
  { id: '6', text: 'Test across all devices and browsers', color: 'from-indigo-500 to-blue-600', emoji: '🧪' },
]

export default function DragReorderDemo() {
  const [items, setItems] = useState(initialItems)

  const toggleComplete = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Drag to Reorder ✨
          </h1>
          <p className="text-xl text-purple-200">
            Beautiful drag & drop with spring physics
          </p>
        </motion.div>

        {/* Reorderable List */}
        <Reorder.Group 
          values={items} 
          onReorder={setItems}
          className="space-y-4"
        >
          <AnimatePresence>
            {items.map((item, index) => (
              <Reorder.Item
                key={item.id}
                value={item}
                dragListener={!item.completed}
                className="group cursor-pointer"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: item.completed ? 0.95 : 1
                  }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    delay: index * 0.1
                  }}
                  whileHover={{ 
                    scale: item.completed ? 0.95 : 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileDrag={{ 
                    scale: 1.05,
                    rotate: 2,
                    transition: { duration: 0.2 }
                  }}
                  className={`
                    relative p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10
                    ${item.completed ? 'opacity-60' : 'opacity-100'}
                    bg-gradient-to-r ${item.color}
                  `}
                  onClick={() => toggleComplete(item.id)}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-50 blur-xl -z-10 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-4">
                    <motion.div
                      animate={{ 
                        scale: item.completed ? 1.2 : 1,
                        rotate: item.completed ? 360 : 0
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 25
                      }}
                      className="text-3xl"
                    >
                      {item.completed ? '✅' : item.emoji}
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.p 
                        className={`text-xl font-semibold text-white transition-all duration-300 ${
                          item.completed ? 'line-through opacity-70' : ''
                        }`}
                        animate={{ 
                          x: item.completed ? 10 : 0 
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      >
                        {item.text}
                      </motion.p>
                    </div>
                    
                    {!item.completed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/50 text-sm font-medium"
                      >
                        DRAG ME
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Drag indicator */}
                  {!item.completed && (
                    <motion.div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 bg-white/40 rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.4, 0.8, 0.4]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>

        {/* Footer instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-12 text-purple-200 text-lg"
        >
          <p>✨ Drag items to reorder • Click to mark as complete ✨</p>
        </motion.div>
      </div>
    </div>
  )
}