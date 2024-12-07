"use client";

import { motion } from "framer-motion";

const LoadingDot = ({ delay }: { delay: number }) => (
  <motion.div
    className="w-3 h-3 rounded-full bg-primary"
    initial={{ scale: 0 }}
    animate={{ scale: [0, 1, 0] }}
    transition={{
      duration: 1,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const pulseVariants = {
  initial: { scale: 0.8, opacity: 0.5 },
  animate: {
    scale: [0.8, 1, 0.8],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        className="flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative w-24 h-24"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-2">
              <LoadingDot delay={0} />
              <LoadingDot delay={0.2} />
              <LoadingDot delay={0.4} />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-lg font-medium text-primary mb-2">Loading</p>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your experience
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
