import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const FinalMessageSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const finalMessage = "Happy Birthday, my love. Here's to another year of amazing adventures together! 🎂✨";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('final');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      if (currentIndex < finalMessage.length) {
        setDisplayText(finalMessage.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [currentIndex, finalMessage, isVisible]);

  return (
    <section 
      id="final" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Parallax background */}
      <div className="absolute inset-0 bg-gradient-to-br from-hot-pink via-light-pink to-misty-rose" />
      
      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-6xl mb-6">🎂</div>
          <Text variant="display" color="white" className="mb-6">
            The End... or Just the Beginning?
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-2xl md:text-3xl font-playfair text-white font-medium min-h-[2em] flex items-center justify-center">
            {displayText}
            {currentIndex < finalMessage.length && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <Text variant="body" color="white" className="text-lg leading-relaxed opacity-90">
            Thank you for being the most amazing girlfriend anyone could ask for. 
            Your love, laughter, and light make every day feel like a celebration.
            I can't wait to create even more beautiful memories with you.
          </Text>
          
          <div className="flex justify-center space-x-6 mt-8">
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <ApperIcon name="Heart" className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <ApperIcon name="Sparkles" className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [0, -15, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <ApperIcon name="Star" className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Text variant="h3" color="white" className="font-bold">
            With all my love,<br />
            Your devoted boyfriend 💕
          </Text>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalMessageSection;