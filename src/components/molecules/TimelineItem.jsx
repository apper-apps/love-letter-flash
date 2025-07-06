import React from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';

const TimelineItem = ({ event, index, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} mb-12`}
    >
      {/* Timeline dot */}
      <div className="timeline-dot" />
      
      {/* Content */}
      <div className={`w-full max-w-md ${isLeft ? 'pr-8' : 'pl-8'} ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
        <Card elevation="lg" hover className="p-6 bg-gradient-to-br from-white to-misty-rose">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                src={event.image}
                alt={event.title}
                className="w-16 h-16 rounded-full object-cover border-2 border-hot-pink/20"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <Text variant="caption" color="primary" className="font-semibold mb-1">
                {event.date}
              </Text>
              <Text variant="h4" color="default" className="mb-2">
                {event.title}
              </Text>
              <Text variant="body" color="muted" className="leading-relaxed">
                {event.description}
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default TimelineItem;