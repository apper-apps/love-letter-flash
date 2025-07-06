import React from 'react';
import { motion } from 'framer-motion';

const FloatingNavDots = ({ currentSection }) => {
  const sections = [
    { id: 'landing', label: 'Welcome' },
    { id: 'message', label: 'Message' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'notes', label: 'Notes' },
    { id: 'final', label: 'Final' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg border border-hot-pink/20">
        <div className="flex items-center space-x-3">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 relative group
                ${currentSection === section.id 
                  ? 'bg-gradient-to-r from-hot-pink to-light-pink shadow-lg floating-dot-active' 
                  : 'bg-gray-300 hover:bg-hot-pink/60'
                }
              `}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {section.label}
              </div>
              
              {/* Active dot pulse effect */}
              {currentSection === section.id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-hot-pink/30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingNavDots;