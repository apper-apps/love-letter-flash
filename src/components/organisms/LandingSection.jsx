import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const LandingSection = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScroll(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="landing" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-misty-rose via-white to-lavender-blush" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Text variant="display" color="gradient" className="mb-6">
            Happy Birthday
          </Text>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8"
          >
            <Text variant="h1" color="primary" className="mb-4">
              My Beautiful Sarah
            </Text>
            <Text variant="body" color="muted" className="max-w-2xl mx-auto leading-relaxed">
              Today is your special day, and I wanted to create something as beautiful as you are. 
              This is my love letter to you, written in code and filled with all the reasons 
              why you make my world brighter.
            </Text>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <ApperIcon name="Heart" className="w-8 h-8 text-hot-pink" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <ApperIcon name="Sparkles" className="w-8 h-8 text-light-pink" />
            </motion.div>
            
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <ApperIcon name="Star" className="w-8 h-8 text-hot-pink" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2"
          >
            <Text variant="caption" color="muted">
              Scroll to continue
            </Text>
            <ApperIcon name="ChevronDown" className="w-6 h-6 text-hot-pink" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default LandingSection;