"use client";

import { motion } from "framer-motion";
import { animationDurations } from "../lib/animations";

interface ProgressIndicatorProps {
  label: string;
  value: number;
  max?: number;
  color?: "blue" | "purple" | "green";
  showPulse?: boolean;
}

export function ProgressIndicator({
  label,
  value,
  max = 100,
  color = "blue",
  showPulse = true,
}: ProgressIndicatorProps) {
  const percentage = (value / max) * 100;
  const isComplete = percentage === 100;

  const colorVariants = {
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/20",
      text: "text-blue-300",
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-500/20",
      text: "text-purple-300",
    },
    green: {
      gradient: "from-green-500 to-emerald-500",
      bg: "bg-green-500/20",
      text: "text-green-300",
    },
  };

  const { gradient, bg, text } = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: animationDurations.base }}
      className="space-y-2"
    >
      {/* Label and percentage */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">{label}</label>
        <motion.span
          animate={{ scale: isComplete ? 1.1 : 1 }}
          transition={{
            duration: isComplete ? 0.4 : 0,
            type: "spring",
            stiffness: 200,
          }}
          className={`text-xs font-bold ${text}`}
        >
          {Math.round(percentage)}%
        </motion.span>
      </div>

      {/* Progress bar background */}
      <div
        className={`w-full h-2 rounded-full ${bg} border border-white/10 overflow-hidden relative`}
      >
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          className={`h-full bg-gradient-to-r ${gradient} relative`}
        >
          {/* Shimmer effect */}
          {percentage > 0 && (
            <motion.div
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          )}
        </motion.div>

        {/* Pulsing indicator for active tasks */}
        {showPulse && percentage > 0 && percentage < 100 && (
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-4 -mr-1 ${gradient.replace(
              "from-",
              "bg-"
            )} rounded-full blur-sm`}
          />
        )}
      </div>

      {/* Completion checkmark */}
      {isComplete && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: animationDurations.base,
            type: "spring",
            stiffness: 200,
          }}
          className="mt-1 inline-flex items-center gap-1"
        >
          <div
            className={`w-4 h-4 rounded-full bg-gradient-to-r ${gradient}`}
          />
          <span className="text-xs font-medium text-green-400">Completed</span>
        </motion.div>
      )}
    </motion.div>
  );
}

export function CircularProgress({
  value,
  max = 100,
  label,
  size = "md",
}: {
  value: number;
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: animationDurations.base }}
      className={`flex flex-col items-center justify-center ${sizeClasses[size]}`}
    >
      <div className="relative w-full h-full">
        {/* Background circle */}
        <svg
          className="absolute inset-0 transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
          />

          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
            }}
            style={{
              strokeDasharray: circumference,
            }}
          />

          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgb(59, 130, 246)" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`font-bold text-blue-300 ${textSizeClasses[size]}`}
          >
            {Math.round(percentage)}%
          </motion.div>
          {label && <div className="text-xs text-white/60 mt-1">{label}</div>}
        </motion.div>
      </div>
    </motion.div>
  );
}
