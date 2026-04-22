import React from 'react'
import { motion } from 'framer-motion'

const TaskItem = ({ task, title, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.6, ease: 'easeOut'}}

      className='group relative border border-souls-stone bg-[#141412] p-5 cursor-pointer hover:border-souls-estus/50 transition-colors duration-300'
    >

    <div className="flex items-center justify-between">
        <span className="text-lg  group-hover:text-souls-estus transition-colors duration-300">
            {title}
        </span>

        <div 
          onClick={onToggle}
          className="w-6 h-6 border border-souls-paper/30 group-hover:border-souls-estus/50 rotate-45 transition-all duration-300">
        </div>
    </div>

    <div className="absolute bottom-0 left-0 h-px w-0 bg-souls-estus group-hover:w-full transition-all duration-500 ease-in-out"></div>
    </motion.div>

  )
}

export default TaskItem