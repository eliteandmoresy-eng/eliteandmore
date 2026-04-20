'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show on Homepage
  if (pathname !== '/') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: "-50%", y: 20 }}
          animate={{ opacity: 1, x: "-50%", y: 0 }}
          exit={{ opacity: 0, x: "-50%", y: 20 }}
          className="fixed bottom-32 md:bottom-20 left-1/2 z-40 pointer-events-none flex flex-col items-center gap-2.5"
        >
          {/* Scroll Mouse - Premium Vision Colors */}
          <div className="hidden md:flex w-6 h-10 border-2 border-primary/20 rounded-full items-start justify-center p-1.5 shadow-sm bg-white/5 backdrop-blur-[2px]">
            <motion.div
              animate={{
                y: [0, 12, 0],
                backgroundColor: ["#ecb941", "#33165b", "#ecb941"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2 bg-gold rounded-full"
            />
          </div>

          {/* Icon & Text - Animated Gold/Purple Mix */}
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] md:text-[12px] font-cairo font-black text-primary/90 tracking-[0.3em] mb-1 drop-shadow-sm">
                انزل للأسفل
            </span>
            <div className="relative">
              <ChevronDown className="w-5 h-5 text-gold animate-bounce" />
              <div className="absolute inset-0 bg-gold/20 blur-md rounded-full -z-10" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
