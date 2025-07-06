import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const heartIdRef = useRef(0);
  const lastMoveRef = useRef(0);


  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      setIsMoving(true);
      lastMoveRef.current = Date.now();

      // Create heart trail
      if (Math.random() < 0.3) { // 30% chance to create heart
        const newHeart = {
          id: heartIdRef.current++,
          x: newPosition.x,
          y: newPosition.y,
          size: Math.random() * 0.5 + 0.5,
          color: ['#FF69B4', '#FF1493', '#FFC0CB', '#FFB6C1'][Math.floor(Math.random() * 4)],
          delay: Math.random() * 0.2,
          duration: 2 + Math.random() * 2,
          drift: (Math.random() - 0.5) * 50
        };

        setHearts(prev => [...prev, newHeart]);

        // Remove heart after animation
        setTimeout(() => {
          setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
        }, newHeart.duration * 1000);
      }
    };

    const handleMouseEnter = () => {
      document.body.style.cursor = 'none';
    };

    const handleMouseLeave = () => {
      document.body.style.cursor = 'default';
      setIsMoving(false);
    };


document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'default';
    };
  }, []);

  // Stop moving state after delay
  useEffect(() => {
    const checkMoving = setInterval(() => {
      if (Date.now() - lastMoveRef.current > 100) {
        setIsMoving(false);
      }
    }, 100);

    return () => clearInterval(checkMoving);
  }, []);

  // Don't render on mobile/touch devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) return null;

  return (
    <>
      {/* Custom cursor */}
      <motion.div
        className="custom-cursor"
        style={{
          left: position.x,
          top: position.y,
        }}
        animate={{
          scale: isMoving ? 1.2 : 1,
          opacity: isMoving ? 1 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <ApperIcon name="Heart" size={20} className="text-hot-pink" />
      </motion.div>

      {/* Heart trail */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="cursor-heart"
            initial={{
              x: heart.x,
              y: heart.y,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: heart.x + heart.drift,
              y: heart.y - 50,
              scale: heart.size,
              opacity: [0, 1, 0.8, 0],
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
            }}
            style={{
              color: heart.color,
            }}
          >
            <ApperIcon name="Heart" size={16} />
          </motion.div>
        ))}
      </AnimatePresence>

    </>
  );
};

export default CustomCursor;