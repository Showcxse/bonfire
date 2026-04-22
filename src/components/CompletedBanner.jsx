import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CompletedBanner = ({ text }) => {
  return (
    <AnimatePresence>
        {text && (
            <motion.div
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              exit={{ opacity: 0}}
              transition={{ duration: 0.4}}
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 pointer-events-none backdrop-blur-sm'
            >
                <motion.div
                  initial={{scale:0.8, opacity: 0}}
                  animate={{ scale: 1, opacity: 1}}
                  exit={{scale: 1.1, opacity: 0}}
                  transition={{ duration: 0.8, ease: "easeOut"}}
                  className='w-full py-12 bg-linear-to-b from-black/0 via-black/85 to-black/0 text-center shadow-[0_0_50px_rgba(0,0,0,0.7)] flex justify-center items-center relative'
                >
                  {/* background shadow of text */}
                    <span className='absolute text-5xl md:text-7xl font-serif font-light text-souls-estus uppercase opacity-15 scale-110 blur-[2px] pointer-events-none'>
                      {text}
                    </span>

                    <h2 className='relative z-10 text-5xl md:text-7xl font-serif font-light text-souls-estus uppercase [text-shadow:0_0_3px_#d48e37,0_0_15px_rgba(212,175,55,0.6)]'>
                        {text}
                    </h2>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default CompletedBanner