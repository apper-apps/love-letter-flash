import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Navigation = ({ currentSection }) => {
  const sections = [
    { id: 'landing', label: 'Welcome', icon: 'Heart' },
    { id: 'message', label: 'Message', icon: 'MessageCircle' },
    { id: 'gallery', label: 'Gallery', icon: 'Camera' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'notes', label: 'Notes', icon: 'Mail' },
    { id: 'final', label: 'Final', icon: 'Star' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-hot-pink/20">
        <div className="flex flex-col space-y-2">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group relative
                ${currentSection === section.id 
                  ? 'bg-gradient-to-r from-hot-pink to-light-pink text-white shadow-lg' 
                  : 'text-gray-400 hover:text-hot-pink hover:bg-hot-pink/10'
                }
              `}
            >
              <ApperIcon name={section.icon} className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {section.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;