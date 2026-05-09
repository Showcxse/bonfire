import React, { useState, useRef, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const CategoryMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const options = [
        {/* 
            Stopping here because I realize idk what I want to do
            Hardcode thematic options?
            Or let user make their own categories? But then it could ruin immersion?
            Immersion or more free function? 
        */}
    ]

  return (
    <div>CategoryMenu</div>
  )
}

export default CategoryMenu