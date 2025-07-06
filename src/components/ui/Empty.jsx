import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "Nothing here yet", 
  description = "There's no content to display right now",
  actionText = "Refresh",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        className="w-20 h-20 bg-gradient-to-br from-misty-rose to-light-pink rounded-full flex items-center justify-center mb-6 shadow-lg"
      >
        <ApperIcon name="Heart" className="w-10 h-10 text-hot-pink" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-2xl font-playfair font-bold text-gray-800 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-gray-600 font-lato mb-8 max-w-md leading-relaxed"
      >
        {description}
      </motion.p>
      
      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={onAction}
          className="px-8 py-3 bg-gradient-to-r from-hot-pink to-light-pink text-white font-lato font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          <span>{actionText}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;