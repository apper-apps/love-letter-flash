import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import LandingSection from '@/components/organisms/LandingSection';
import MessageSection from '@/components/organisms/MessageSection';
import PhotoGallery from '@/components/organisms/PhotoGallery';
import TimelineSection from '@/components/organisms/TimelineSection';
import LoveNotesSection from '@/components/organisms/LoveNotesSection';
import FinalMessageSection from '@/components/organisms/FinalMessageSection';
import ParticleAnimation from '@/components/molecules/ParticleAnimation';
import HeartRain from '@/components/molecules/HeartRain';
import MusicPlayer from '@/components/molecules/MusicPlayer';
import Navigation from '@/components/molecules/Navigation';
import FloatingNavDots from '@/components/molecules/FloatingNavDots';
import CustomCursor from '@/components/molecules/CustomCursor';
import Loading from '@/components/ui/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('landing');

  useEffect(() => {
    // Simulate loading time for romantic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['landing', 'message', 'gallery', 'timeline', 'notes', 'final'];
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      sections.forEach((section, index) => {
        const sectionTop = index * windowHeight;
        const sectionBottom = sectionTop + windowHeight;
        
        if (scrollY >= sectionTop - 100 && scrollY < sectionBottom - 100) {
          setCurrentSection(section);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-misty-rose via-white to-lavender-blush">
        <ParticleAnimation />
        <CustomCursor />
        <MusicPlayer />
        <Navigation currentSection={currentSection} />
        <FloatingNavDots currentSection={currentSection} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <LandingSection />
                <MessageSection />
                <PhotoGallery />
                <TimelineSection />
                <LoveNotesSection />
                <FinalMessageSection />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="shadow-lg"
          bodyClassName="text-sm font-lato"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
};

export default App;