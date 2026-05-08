import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DatePicker = ({ value, onChange}) => {
const [isOpen, setIsOpen] = useState(false);
const menuRef = useRef(null);

const [viewDate, setViewDate] = useState(() => {
    if (value) {
        const [year, month, day] = value.split("-");
        return new Date(year, month -1, day);
    }
    return new Date();
});

useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    //why did I decide to make a custom one of these it's already giving me an aneurysm
    const days = Array.from({ length: firstDay }, () => null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    const handleSelectDate = (day) => {
        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        onChange(`${year}-${formattedMonth}-${formattedDay}`);
        setIsOpen(false);
    };
    
    const displayValue = value 
        ? new Date(value.split('-')[0], value.split('-')[1] - 1, value.split('-')[2].toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }))
        : "No Due Date";
    //like geniunely how tf did these albert einstein ass cavemen invent this
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    

  return (
    <div className="relative w-48" ref={menuRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center justify-between bg-transparent border border-souls-stone p-2 cursor-pointer hover:border-souls-estus/50 transition-colors'
        >
        <span className={`font-serif text-sm tracking-wider ${value ? 'text-souls-estus' : 'text-souls-paper'}`}>
            {displayValue}
        </span>
        <span className="text-souls-stone text-xs">▼</span>
        </div>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 bottom-full mb-1 w-64 bg-souls-abyss border border-souls-stone shadow-[0_0_20px_rgba(0,0,0,0.8)] z-50 p-4"
                >
                    <div className="flex justify-between items-center mb-4 text-souls-estus font-serif tracking-wide">
                        <button
                          onClick={(e) => { e.stopPropagation(); setViewDate(new Date(year, month -1, 1)); }}
                          className='hover:text-souls-paper transition-colors px-2 cursor-pointer'
                        >{"<"}</button>
                    <span>{months[month]} {year}</span>
                    <button
                      onClick={(e) => {e.stopPropagation(); setViewDate(new Date(year, month + 1, 1)); }}
                      className='hover:text-souls-paper transition-colors px-2 cursor-pointer'
                      >{">"}</button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2 text-center text-souls-paper text-xs font-serif">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center font-serif text-sm">
                        {days.map((day, index) => {
                            if (!day) return <div key={`empty-${index}`} />;

                            const isSelected = value &&
                              parseInt(value.split('-')[0]) === year &&
                              parseInt(value.split('-')[1]) -1 === month &&
                              parseInt(value.split('-')[2]) === day;

                              return (
                                <div
                                  key={day}
                                  onClick={() => handleSelectDate(day)}
                                  className={`p-1 cursor-pointer transition-colors ${
                                    isSelected
                                      ? 'bg-souls-estus text-souls-abyss'
                                      : 'text-souls-paper hover:bg-souls-stone/50 hover:text-souls-estus'
                                  }`}
                                >
                                {day}
                            </div>
                              );
                        })}
                    </div>
                    <div className="mt-4 pt-3 border-t border-souls-stone/30 text-center">
                        <button
                          onClick={() => { onChange(""); setIsOpen(false); }}
                          className='text-xs text-souls-paper hover:text-souls-estus transition-colors duration-300 uppercase tracking-wider cursor-pointer'
                        >
                            Clear Date
                        </button>
                    </div>
                  </motion.div>
            )}
        </AnimatePresence>
    </div>
    );
};

export default DatePicker