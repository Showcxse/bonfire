import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PriorityMenu = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const options = [
    { value: "Low", label: "Hollow (Low)", color: "text-souls-stamina" },
    { value: "Medium", label: "Elite (Medium)", color: "text-souls-estus" },
    {value: "High", label: "Lord (High)", color: "text-souls-health" },
  ];

  const currentOption =
    options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative w-48" ref={menuRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-between bg-transparent border border-souls-stone p-2 cursor-pointer hover:border-souls-estus/50 transition-colors"
      >
        <span
          className={`font-serif text-sm tracking-wider ${currentOption.color}`}
        >
          {currentOption.label}
        </span>
        <span
          className={`text-xs transition-all duration-300 group-hover:text-souls-estus ${isOpen ? "rotate-180 text-souls-estus" : "text-souls-stone"}`}
        >
          ▲
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bottom-full mb-1 bg-souls-abyss border border-souls-stone shadow-xl z-50"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`p-3 cursor-pointer border-b border-souls-stone/50 hover:bg-souls-stone/50 transition-colors font-serif text-sm tracking-wider ${option.color}`}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriorityMenu;
