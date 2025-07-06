import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Mock audio for demo purposes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg border border-hot-pink/20">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-hot-pink to-light-pink text-white hover:scale-110"
          >
            <ApperIcon 
              name={isPlaying ? "Pause" : "Play"} 
              className="w-5 h-5" 
            />
          </Button>
          
          <div className="hidden sm:flex items-center space-x-2 text-xs font-lato text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-hot-pink to-light-pink transition-all duration-300"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <ApperIcon name="Music" className="w-4 h-4 text-hot-pink" />
            <span className="text-xs font-lato text-gray-600 hidden sm:inline">
              Our Song
            </span>
          </div>
        </div>
      </div>
      
      {/* Hidden audio element for demo */}
      <audio ref={audioRef} loop>
        <source src="/demo-song.mp3" type="audio/mpeg" />
      </audio>
    </motion.div>
  );
};

export default MusicPlayer;