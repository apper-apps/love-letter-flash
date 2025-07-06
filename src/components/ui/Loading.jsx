import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const loadingPhases = [
    { message: "Gathering rose petals...", description: "Collecting beautiful memories", icon: "Flower" },
    { message: "Writing love letters...", description: "Crafting heartfelt words", icon: "PenTool" },
    { message: "Arranging memories...", description: "Organizing precious moments", icon: "Image" },
    { message: "Adding magical touches...", description: "Sprinkling some love", icon: "Sparkles" },
    { message: "Almost ready...", description: "Just a few more seconds", icon: "Heart" }
  ];

  useEffect(() => {
    const totalDuration = 2000; // 2 seconds total
    const interval = 50; // Update every 50ms
    const increment = 100 / (totalDuration / interval);
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        
        // Update phase based on progress
        if (newProgress >= 20 && currentPhase === 0) setCurrentPhase(1);
        else if (newProgress >= 40 && currentPhase === 1) setCurrentPhase(2);
        else if (newProgress >= 60 && currentPhase === 2) setCurrentPhase(3);
        else if (newProgress >= 80 && currentPhase === 3) setCurrentPhase(4);
        
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        
        return newProgress;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [currentPhase]);

  const currentPhaseData = loadingPhases[currentPhase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-misty-rose via-white to-lavender-blush">
      <div className="text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-hot-pink/20 border-t-hot-pink rounded-full mx-auto mb-6"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ApperIcon name={currentPhaseData.icon} className="w-8 h-8 text-hot-pink" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-playfair font-bold text-hot-pink">
                {currentPhaseData.message}
              </h2>
              <p className="text-gray-600 font-lato">
                {currentPhaseData.description}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Bar */}
          <div className="w-full bg-hot-pink/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-hot-pink to-deep-pink rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
              />
            </motion.div>
          </div>
          
          {/* Progress Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-lg font-lato font-semibold text-hot-pink">
              {Math.round(progress)}%
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ApperIcon name="Heart" className="w-4 h-4 text-hot-pink" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 flex justify-center space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="w-3 h-3 bg-hot-pink rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;