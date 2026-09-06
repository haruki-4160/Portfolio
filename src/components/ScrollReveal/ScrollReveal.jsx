import React from 'react';
import { motion } from 'framer-motion';

// Container variant with staggered children
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Item variant with Apple spring pop-up, upward float, and blur-to-focus
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
      mass: 0.8,
    },
  },
};

export function ScrollRevealContainer({
  children,
  className = '',
  amount = 0.15,
  once = false,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ children, className = '' }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
