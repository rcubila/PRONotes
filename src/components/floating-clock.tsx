"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function FloatingClock() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-8 right-8 z-50"
    >
      <div className="glass rounded-full p-6 shadow-2xl">
        {/* Floating animation background */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"
          style={{ pointerEvents: "none" }}
        />

        {/* Rotating border accent */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            linear: true,
          }}
          className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-blue-500/40 to-purple-500/40 bg-clip-border"
          style={{ pointerEvents: "none" }}
        />

        {/* Time display */}
        <motion.div
          layout
          className="relative z-10 text-center font-mono text-lg font-bold text-blue-300 tracking-wider"
        >
          {time}
        </motion.div>
      </div>
    </motion.div>
  );
}
