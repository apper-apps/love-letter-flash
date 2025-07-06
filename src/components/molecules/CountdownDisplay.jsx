import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownDisplay = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  // Don't render on mobile/touch devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) return null;

  return (
    <motion.div
      className="countdown-display-fixed"
      initial={{
        opacity: 0,
        scale: 0.8,
        y: -20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5,
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
          <span className="countdown-separator">:</span>
          <span className="countdown-unit">
            <span className="countdown-number">{countdown.seconds.toString().padStart(2, '0')}</span>
            <span className="countdown-label">sec</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownDisplay;