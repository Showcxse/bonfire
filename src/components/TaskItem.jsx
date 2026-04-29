import { motion } from 'framer-motion'

const TaskItem = ({ task, onToggle, onInspect, isCompleting }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20}}
      animate ={
        isCompleting ? {
          scale: 0.9,
          opacity: 0,
          y: -40,
          filter: 'blur(12px) brightness(1.5) sepia(1) hue-rotate(-40deg) saturate(6)'
        }
        : {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: 'blur(0px) brightness(1) sepia(0) hue-rotate(0deg) saturate(1)'
        }
      }
      transition= {
        isCompleting ? { duration: 1.2, ease: 'easeIn' }
        : {duration: 0.6, ease: 'easeOut'}
      }
      onClick={onInspect}
      className='overflow-hidden min-h-full group relative border border-souls-stone bg-[#141412] p-5 cursor-pointer hover:border-souls-estus/50 transition-colors duration-300'
    >

    <div 
      className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-500"
      style={{ backgroundImage: `url(${task.imageBg})`}}
    ></div>

    <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent"></div>

    <div className="relative z-10 flex items-center justify-between">
      <div className="flex flex-col flex-1">
        <span className="text-lg  group-hover:text-souls-estus transition-colors duration-300">
            {task.title}
        </span>

        {task.description && (
          <p className='mt-2 text-sm text-souls-paper/80 line-clamp-2 leading-relaxed italic'>
            "{task.description}"
          </p>
        )}
      </div>
        {/*CHECKBOX*/}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="relative shrink-0 w-6 h-6 border border-souls-paper/30 group-hover:border-souls-estus/50 rotate-45 transition-all duration-300"
          >
            {(isCompleting || task.completed) && (
              <motion.svg
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 -rotate-45 pointer-events-none'
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#slashGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                >
                  <defs>
                    <linearGradient id='slashGradient' x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EAC392" />
                      <stop offset="30%" stopColor="#d48e37" />
                      <stop offset="100%" stopColor="#7c2d12" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 3 5 Q 14 12 21 20"
                    initial={{ pathLength: task.completed ? 1 : 0}}
                    animate={{ pathLength: 1}}
                    transition={{ duration: 0.15, ease: 'easeIn' }}
                  />
                </motion.svg>
            )}
        </div>
    </div>

    <div className="absolute bottom-0 left-0 h-px w-0 bg-souls-estus group-hover:w-full transition-all duration-500 ease-in-out"></div>
    </motion.div>

  )
}

export default TaskItem