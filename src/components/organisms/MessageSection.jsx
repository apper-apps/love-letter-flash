import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';

const MessageSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const message = `My dearest Sarah,

Another year has passed, and with it, another year of incredible memories together. I wanted to take a moment to tell you just how much you mean to me, and what better way than through this little digital love letter?

From the moment I wake up to your beautiful smile, to the way you laugh at my terrible jokes, you make every single day better. You have this amazing ability to light up even the darkest moments, and I am so grateful to have you in my life.

I love how you dance around the kitchen when you're cooking, how you get excited about the smallest things, and how you always know exactly what to say when I need to hear it. You're not just my girlfriend; you're my best friend, my partner in crime, and my favorite person in the entire world.

Today, as we celebrate another year of your wonderful existence, I want you to know that my love for you grows stronger with each passing day. You are absolutely incredible, and I can't wait to see what adventures this new year brings us.

Happy Birthday, beautiful. Here's to you, to us, and to all the amazing moments yet to come.

All my love,
Your devoted boyfriend ❤️`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('message');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      if (currentIndex < message.length) {
        setDisplayText(message.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 30); // Typing speed

    return () => clearTimeout(timer);
  }, [currentIndex, message, isVisible]);

  return (
    <section id="message" className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <Text variant="h1" color="gradient" className="mb-4">
            A Message From My Heart
          </Text>
          <Text variant="body" color="muted">
            Written with love, just for you
          </Text>
        </div>

        <Card elevation="xl" className="p-8 md:p-12 bg-gradient-to-br from-white to-misty-rose border-2 border-hot-pink/10">
          <div className="relative">
            {/* Decorative hearts */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-hot-pink to-light-pink rounded-full flex items-center justify-center">
              <span className="text-white text-lg">💕</span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-light-pink to-hot-pink rounded-full flex items-center justify-center">
              <span className="text-white text-lg">💖</span>
            </div>

            <div className="font-serif text-lg md:text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">
              {displayText}
              {currentIndex < message.length && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-hot-pink"
                >
                  |
                </motion.span>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default MessageSection;