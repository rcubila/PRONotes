"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { animationDurations, easeSmooth, tapScale } from "../lib/animations";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListItemProps {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  subtasks?: Subtask[];
  index: number;
  onToggle: (id: string) => void;
  onToggleSubtask?: (taskId: string, subtaskId: string) => void;
}

export function TaskListItem({
  id,
  title,
  description,
  priority,
  completed,
  subtasks = [],
  index,
  onToggle,
  onToggleSubtask,
}: TaskListItemProps) {
  const [expanded, setExpanded] = useState(false);

  const priorityColors = {
    high: "text-red-400",
    medium: "text-yellow-400",
    low: "text-blue-400",
  };

  const priorityBgHover = {
    high: "hover:bg-red-500/5",
    medium: "hover:bg-yellow-500/5",
    low: "hover:bg-blue-500/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: animationDurations.base,
        ease: easeSmooth,
        delay: index * 0.05,
      }}
      className="group"
    >
      {/* Main task item */}
      <motion.div
        whileTap={tapScale}
        onClick={() => onToggle(id)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer border-l-2 transition-all duration-300 ${
          completed
            ? "border-l-green-500/50 bg-green-500/3"
            : `border-l-${
                priority === "high"
                  ? "red"
                  : priority === "medium"
                  ? "yellow"
                  : "blue"
              }-500/50 ${priorityBgHover[priority]}`
        }`}
      >
        {/* Chevron icon for expansion */}
        {subtasks.length > 0 && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="flex-shrink-0 p-1"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronRight className="w-4 h-4 text-white/60" />
            </motion.div>
          </motion.button>
        )}

        {/* Invisible spacer when no chevron */}
        {subtasks.length === 0 && <div className="w-4 h-4 flex-shrink-0" />}

        {/* Checkbox */}
        <motion.div
          className="flex-shrink-0"
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            animate={{
              rotate: completed ? 360 : 0,
              scale: completed ? 1 : 1,
            }}
            transition={{ duration: animationDurations.base }}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              completed
                ? "bg-green-500 border-green-500"
                : "border-white/40 hover:border-white/60"
            }`}
          >
            {completed && (
              <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
            )}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <motion.h3
              className={`font-medium text-sm transition-all duration-300 ${
                completed ? "text-white/50 line-through" : "text-white"
              }`}
            >
              {title}
            </motion.h3>
            {/* Priority indicator dot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityColors[priority]}`}
            />
          </div>
          <p className="text-white/50 text-xs mt-1">{description}</p>
        </div>

        {/* Subtask count badge */}
        {subtasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0"
          >
            <span className="text-xs font-medium text-white/50 bg-white/5 px-2 py-1 rounded">
              {subtasks.filter((s) => s.completed).length}/{subtasks.length}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Nested subtasks */}
      <AnimatePresence>
        {expanded && subtasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: animationDurations.base, ease: easeSmooth }}
            className="ml-0 mt-0 border-l border-white/10"
          >
            <div className="space-y-1 pl-0 my-1">
              {subtasks.map((subtask, idx) => (
                <motion.div
                  key={subtask.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: animationDurations.fast,
                    delay: idx * 0.03,
                  }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg ml-4 hover:bg-white/3 border-l-2 border-l-white/10 transition-all duration-300 cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleSubtask?.(id, subtask.id);
                  }}
                >
                  <div className="w-4 h-4 flex-shrink-0" />
                  <motion.div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      subtask.completed
                        ? "bg-green-500 border-green-500"
                        : "border-white/30 group-hover:border-white/40"
                    }`}
                  >
                    {subtask.completed && (
                      <CheckCircle2
                        className="w-3 h-3 text-white"
                        strokeWidth={3}
                      />
                    )}
                  </motion.div>
                  <span
                    className={`text-xs transition-all duration-300 ${
                      subtask.completed
                        ? "text-white/40 line-through"
                        : "text-white/70"
                    }`}
                  >
                    {subtask.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
