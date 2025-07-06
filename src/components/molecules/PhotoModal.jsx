import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const PhotoModal = ({ isOpen, onClose, photo }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lightbox-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-xl overflow-hidden">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-auto max-h-[80vh] object-cover"
              />
              
              <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-hot-pink transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <Text variant="h4" color="white" className="mb-2">
                  {photo.caption}
                </Text>
                <Text variant="caption" color="white" className="opacity-80">
                  {photo.date}
                </Text>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoModal;