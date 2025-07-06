import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import TimelineItem from '@/components/molecules/TimelineItem';
import timelineService from '@/services/api/timelineService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const TimelineSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await timelineService.getAll();
      setEvents(data);
    } catch (err) {
      setError('Failed to load our journey timeline. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="timeline" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section id="timeline" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Error message={error} onRetry={loadEvents} />
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section id="timeline" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Empty 
          title="No timeline events yet"
          description="Our journey milestones will be displayed here"
          onAction={loadEvents}
        />
      </section>
    );
  }

  return (
    <section id="timeline" className="min-h-screen py-20 px-4 bg-gradient-to-br from-lavender-blush to-misty-rose">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Text variant="h1" color="gradient" className="mb-4">
            Our Love Story
          </Text>
          <Text variant="body" color="muted">
            Every moment that brought us closer together
          </Text>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="timeline-line hidden md:block" />
          
          {/* Mobile timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-hot-pink to-light-pink rounded-full md:hidden" />

          <div className="space-y-8">
            {events.map((event, index) => (
              <TimelineItem
                key={event.Id}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;