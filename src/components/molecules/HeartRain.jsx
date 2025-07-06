import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const HeartRain = () => {
  const [hearts, setHearts] = useState([]);
  const [nextId, setNextId] = useState(1);

  const createHeart = useCallback((x, y) => {
    const newHeart = {
      id: nextId,
      x,
      y,
      size: Math.random() * 20 + 15, // Random size between 15-35px
      color: Math.random() > 0.5 ? 'text-hot-pink' : 'text-light-pink',
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 3, // 3-5 seconds fall time
      drift: (Math.random() - 0.5) * 100, // Random horizontal drift
    };

    setHearts(prev => [...prev, newHeart]);
    setNextId(prev => prev + 1);

    // Remove heart after animation completes
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, (newHeart.duration + newHeart.delay) * 1000);
  }, [nextId]);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create multiple hearts for more impact
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createHeart(
          x + (Math.random() - 0.5) * 50,
          y + (Math.random() - 0.5) * 30
        );
      }, i * 100);
    }
  }, [createHeart]);

  const handleTouch = useCallback((e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Create hearts at touch point
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createHeart(
          x + (Math.random() - 0.5) * 50,
          y + (Math.random() - 0.5) * 30
        );
      }, i * 100);
    }
  }, [createHeart]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden cursor-pointer heart-rain-container"
      onClick={handleClick}
      onTouchStart={handleTouch}
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 0,
              x: heart.x,
              y: heart.y,
              scale: 0,
              rotate: 0
            }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: heart.x + heart.drift,
              y: heart.y + window.innerHeight + 100,
              scale: [0, 1, 1, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: heart.duration
              }
            }}
            className="absolute pointer-events-none"
            style={{
              left: 0,
              top: 0,
              zIndex: 100
            }}
          >
            <ApperIcon 
              name="Heart" 
              size={heart.size}
              className={`${heart.color} drop-shadow-lg`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Click hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="MousePointer" size={16} className="text-hot-pink" />
            <span className="text-sm text-gray-600 font-lato">
              Click anywhere for hearts!
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeartRain;