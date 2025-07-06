import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showCountdown, setShowCountdown] = useState(false);
  const heartIdRef = useRef(0);
  const lastMoveRef = useRef(0);

  // Target date: August 3rd, 2025
  const targetDate = new Date('2025-08-03T00:00:00').getTime();

  // Update countdown every second
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

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

    const handleClick = () => {
      setShowCountdown(true);
      setTimeout(() => setShowCountdown(false), 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
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

      {/* Countdown display */}
      <AnimatePresence>
        {showCountdown && (
          <motion.div
            className="countdown-display"
            style={{
              left: position.x + 20,
              top: position.y - 60,
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              y: -10,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="countdown-content">
              <div className="countdown-title">August 3rd, 2025</div>
              <div className="countdown-time">
                <span className="countdown-unit">
                  <span className="countdown-number">{countdown.days}</span>
                  <span className="countdown-label">days</span>
                </span>
                <span className="countdown-separator">:</span>
                <span className="countdown-unit">
                  <span className="countdown-number">{countdown.hours.toString().padStart(2, '0')}</span>
                  <span className="countdown-label">hrs</span>
                </span>
                <span className="countdown-separator">:</span>
                <span className="countdown-unit">
                  <span className="countdown-number">{countdown.minutes.toString().padStart(2, '0')}</span>
                  <span className="countdown-label">min</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;