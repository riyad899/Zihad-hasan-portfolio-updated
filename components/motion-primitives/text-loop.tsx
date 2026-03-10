'use client';

import { AnimatePresence, motion, Transition } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TextLoopProps {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: {
    initial: any;
    animate: any;
    exit: any;
  };
}

export function TextLoop({
  children,
  className = '',
  interval = 2000,
  transition,
  variants,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % children.length);
    }, interval);

    return () => clearInterval(timer);
  }, [children.length, interval]);

  const defaultVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const animationVariants = variants || defaultVariants;

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={animationVariants.initial}
          animate={animationVariants.animate}
          exit={animationVariants.exit}
          transition={transition || { duration: 0.5 }}
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
