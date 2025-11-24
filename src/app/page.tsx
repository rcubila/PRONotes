"use client";
import "./global.css";
import { useState } from "react";
import { motion, Variants } from "framer-motion"; // Added Variants import
import { FloatingClock } from "../components/floating-clock";
import { TaskListItem } from "../components/task-list-item";
import {
  ProgressIndicator,
  CircularProgress,
} from "../components/progress-indicator";
import { Zap, Target, TrendingUp } from "lucide-react";

// Define animation variants with proper typing
const staggerContainer: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const slideInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  subtasks: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

export default function WorkflowDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design System Implementation",
      description: "Create comprehensive design tokens and component library",
      priority: "high",
      completed: false,
      subtasks: [
        { id: "1-1", title: "Define color palette", completed: true },
        { id: "1-2", title: "Create spacing system", completed: true },
        { id: "1-3", title: "Build component variants", completed: false },
      ],
    },
    {
      id: "2",
      title: "Animation Framework Setup",
      description: "Integrate Framer Motion and optimize for performance",
      priority: "high",
      completed: true,
      subtasks: [
        { id: "2-1", title: "Configure Framer Motion", completed: true },
        { id: "2-2", title: "Create animation presets", completed: true },
      ],
    },
    {
      id: "3",
      title: "API Integration",
      description: "Connect backend services and data sources",
      priority: "medium",
      completed: false,
      subtasks: [
        { id: "3-1", title: "Setup authentication", completed: true },
        { id: "3-2", title: "Configure data fetching", completed: false },
        { id: "3-3", title: "Implement error handling", completed: false },
      ],
    },
    {
      id: "4",
      title: "Performance Optimization",
      description: "Optimize bundle size and render performance",
      priority: "low",
      completed: false,
      subtasks: [
        { id: "4-1", title: "Code splitting", completed: false },
        { id: "4-2", title: "Image optimization", completed: false },
      ],
    },
  ]);

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = (completedCount / totalCount) * 100;

  const highPriorityCount = tasks.filter(
    (t) => t.priority === "high" && !t.completed
  ).length;
  const mediumPriorityCount = tasks.filter(
    (t) => t.priority === "medium" && !t.completed
  ).length;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <FloatingClock />

      <motion.div
        animate={{ y: [0, 30] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="fixed top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -30] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div variants={staggerItem} className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 mb-3">
            Workflow Dashboard
          </h1>
          <p className="text-white/60 text-lg">
            High-performance task management with fluid animations
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">
                  Overall Progress
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {completedCount}/{totalCount}
                </h3>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-blue-500/20 rounded-lg"
              >
                <Target className="w-5 h-5 text-blue-400" />
              </motion.div>
            </div>
            <ProgressIndicator
              label="Tasks Completed"
              value={completedCount}
              max={totalCount}
              color="blue"
            />
          </motion.div>

          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">
                  High Priority
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {highPriorityCount}
                </h3>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-red-500/20 rounded-lg"
              >
                <Zap className="w-5 h-5 text-red-400" />
              </motion.div>
            </div>
            <ProgressIndicator
              label="Urgent Tasks"
              value={highPriorityCount}
              max={tasks.filter((t) => t.priority === "high").length}
              color="blue"
            />
          </motion.div>

          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">
                  Medium Priority
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {mediumPriorityCount}
                </h3>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-yellow-500/20 rounded-lg"
              >
                <TrendingUp className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>
            <ProgressIndicator
              label="Standard Tasks"
              value={mediumPriorityCount}
              max={tasks.filter((t) => t.priority === "medium").length}
              color="blue"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Active Tasks
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>

            <div className="space-y-0 border border-white/10 rounded-lg overflow-hidden">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  variants={staggerItem}
                  className={`${
                    index !== tasks.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <TaskListItem
                    {...task}
                    index={index}
                    onToggle={handleToggleTask}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center glass rounded-lg p-8"
          >
            <CircularProgress
              value={completedCount}
              max={totalCount}
              label="Completion"
              size="lg"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-center mt-6 text-sm"
            >
              Keep pushing forward to reach your goals
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Tasks", value: totalCount },
            { label: "Completed", value: completedCount },
            { label: "In Progress", value: totalCount - completedCount },
            {
              label: "Success Rate",
              value: `${Math.round(completionPercentage)}%`,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="glass rounded-lg p-4 text-center"
            >
              <p className="text-white/60 text-xs font-medium mb-2">
                {stat.label}
              </p>
              <motion.h4
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-2xl font-bold text-blue-300"
              >
                {stat.value}
              </motion.h4>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
