import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import FlipCard from '@/components/molecules/FlipCard';
import loveNotesService from '@/services/api/loveNotesService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const LoveNotesSection = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await loveNotesService.getAll();
      setNotes(data);
    } catch (err) {
      setError('Failed to load love notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="notes" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section id="notes" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Error message={error} onRetry={loadNotes} />
      </section>
    );
  }

  if (notes.length === 0) {
    return (
      <section id="notes" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Empty 
          title="No love notes yet"
          description="Sweet messages of love will be displayed here"
          onAction={loadNotes}
        />
      </section>
    );
  }

  return (
    <section id="notes" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Text variant="h1" color="gradient" className="mb-4">
            Love Notes Just for You
          </Text>
          <Text variant="body" color="muted">
            Tap each card to reveal a message from my heart
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((note, index) => (
            <FlipCard
              key={note.Id}
              frontIcon={note.icon}
              backMessage={note.message}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Text variant="body" color="muted" className="max-w-2xl mx-auto">
            Each of these messages represents a different reason why I love you. 
            You bring so much joy, laughter, and love into my life, and I wanted 
            you to have these little reminders of how special you are to me.
          </Text>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveNotesSection;