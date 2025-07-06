import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const FlipCard = ({ frontIcon = 'Heart', backMessage, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flip-card w-full h-48 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flip-card-front bg-gradient-to-br from-hot-pink to-light-pink text-white shadow-lg">
          <div className="text-center">
            <ApperIcon name={frontIcon} className="w-12 h-12 mb-4" />
            <Text variant="h4" color="white">
              Tap me
            </Text>
          </div>
        </div>
        
        {/* Back */}
        <div className="flip-card-back bg-gradient-to-br from-misty-rose to-lavender-blush border border-hot-pink/20 shadow-lg">
          <Text variant="body" color="default" className="text-center leading-relaxed">
            {backMessage}
          </Text>
        </div>
      </div>
    </motion.div>
  );
};

export default FlipCard;