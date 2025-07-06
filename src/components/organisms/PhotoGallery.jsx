import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';
import PhotoModal from '@/components/molecules/PhotoModal';
import photoService from '@/services/api/photoService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await photoService.getAll();
      setPhotos(data);
    } catch (err) {
      setError('Failed to load our precious memories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <section id="gallery" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Error message={error} onRetry={loadPhotos} />
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section id="gallery" className="min-h-screen flex items-center justify-center py-20 px-4">
        <Empty 
          title="No photos yet"
          description="Our beautiful memories will be displayed here"
          onAction={loadPhotos}
        />
      </section>
    );
  }

  return (
    <section id="gallery" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Text variant="h1" color="gradient" className="mb-4">
            Our Beautiful Memories
          </Text>
          <Text variant="body" color="muted">
            Every picture tells a story of our love
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card 
                elevation="lg" 
                hover 
                className="overflow-hidden cursor-pointer group"
                onClick={() => openModal(photo)}
              >
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <Text variant="h4" color="white" className="mb-1">
                        {photo.caption}
                      </Text>
                      <Text variant="caption" color="white" className="opacity-80">
                        {photo.date}
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <PhotoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        photo={selectedPhoto}
      />
    </section>
  );
};

export default PhotoGallery;