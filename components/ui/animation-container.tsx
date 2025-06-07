"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimationContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimationContainer({
  children,
  className,
  delay = 0,
}: AnimationContainerProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.3,
          delay: delay * 0.1,
          ease: "easeInOut",
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
