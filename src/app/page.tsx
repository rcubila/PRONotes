"use client";
import "./global.css";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FloatingClock } from "../components/floating-clock";
import { TaskListItem } from "../components/task-list-item";
import {
  ProgressIndicator,
  CircularProgress,
} from "../components/progress-indicator";
import { Zap, Target, TrendingUp } from "lucide-react";

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

interface AliasContact {
  name: string;
  alias: string;
  focus: string;
}

interface ProcedureBlock {
  id: string;
  title: string;
  subtitle?: string;
  tt?: string;
  steps: string[];
  meta?: { label: string; value: string }[];
}

const aliasDirectory: AliasContact[] = [
  { name: "Krisztina Kobilarov", alias: "kobilkri@", focus: "PDE + safety escalations" },
  { name: "Gregory Roriz", alias: "gregdemd@", focus: "DDT / Shade / CGF checks" },
  { name: "Natalia Biernacka", alias: "biernnat@", focus: "Quip + documentation" },
  { name: "Michal Kusiewicz", alias: "kusiewmi@", focus: "Scheduler ownership" },
  { name: "Ivan Pavlovic", alias: "ivappavl@", focus: "CGF validation" },
  { name: "Julia Plaskiewicz", alias: "juliplah@", focus: "Visitor tracker" },
  { name: "Ledina Islami", alias: "igislami@", focus: "DDT witness / backup" },
  { name: "Paulo Melo", alias: "paulodig@", focus: "Logbook + TT clean-up" },
  { name: "Thomas Kilcher", alias: "kilcht@", focus: "Alarm on-site response" },
  { name: "Lucas Alves", alias: "martxluc@", focus: "Shade test runner" },
  { name: "Joshua Stamenkov", alias: "stamenjo@", focus: "Shade test + CGF buddy" },
];

const procedureBlocks: ProcedureBlock[] = [
  {
    id: "ddt",
    title: "Daily Device Test (DDT) - ZRH60",
    subtitle:
      "Slack, scheduler, TT comment + Quip entry for TT D345224731",
    tt: "https://t.corp.amazon.com/D345224731",
    steps: [
      "Post start + finish templates in #zrh60-workflow and tag participating officers (Raul cubiljra, Gregory gregdemd).",
      "Start/stop the facility scheduler so the run is timestamped.",
      "Comment on the TT with devices (ZRH60-1.2.10-YZN-ID IN/OUT HD), start 07:08 AM CEST, finish 07:13 AM, all officers and alarms (x DFO, x DHO, x Invalid Pin, x Granted No Entry, x AA).",
      "Log the same info in Quip dated 24/11/2025 and in the handover + logbook.",
      "Prepare the follow-up note: “07:08 AM CEST DDT performed… 3x DFO, 1x DHO, 1x Invalid Pin, 2x Granted No Entry, 1x AA”.",
      "Spin the next-week TT (D295348996) and ping Corrado with confirmation that seals and parts match.",
    ],
    meta: [
      { label: "Window", value: "07:08 - 07:13 AM CEST" },
      { label: "Officers", value: "Raul Cubila Perez & Gregory Roriz" },
    ],
  },
  {
    id: "pde",
    title: "PDE Procedure",
    subtitle: "DH1 aisles 10501-10610",
    steps: [
      "Send Slack announce/finish messages for the Person Down Detection test in DH1.",
      "Resolve the PDE TT: change severity from 2 ➜ 5 with comment “PDE test, resolving TT (no person in the aisle)”.",
      "Note the activity in Quip dated 08/27/2025.",
      "Add to handover: “8:49 PM CEST PDE performed in DH4. TT: … / 9:09 PM CEST PDE performed… no alarms after 5 min”.",
      "Close the loop in the logbook once TT is resolved.",
    ],
  },
  {
    id: "shade",
    title: "Shade Test Workflow",
    subtitle: "Slack + CGF confirmation trail",
    steps: [
      "Post each event in #zrh60-cgf-workflow and #zrh60-information-flow.",
      "Record quick summary, e.g. “3:00 PM CEST, SS gregdemd@ performed shade test in CICO 3. CGF ivappavl@ passed successfully.”",
      "Capture additional entries (3:40 PM dfischef@ CICO2, 3:10 PM stamenjo@ CICO4 etc.) and flag pass/fail.",
      "Add a short note in handover/logbook with CGF status.",
    ],
  },
  {
    id: "rack",
    title: "Rack Delivery Oversight",
    subtitle: "Use #zrh60-information-flow + handover",
    steps: [
      "Announce in the info-flow channel when DBS arrives on site.",
      "Trace the rack number, bay, and delivery path; call out anomalies immediately.",
      "Document milestones: arrival, delivery start, completion, DBS departure.",
      "Close with a handover snippet so the next shift knows rack status.",
    ],
    meta: [
      { label: "Latest log", value: "09:30 AM CEST DBS on site, 1 unit delivered in DH4" },
    ],
  },
];

const quickSnippets: string[] = [
  "00:00 PM CEST Yaidy CRO",
  "00:00 PM CEST Yaidy PATROL",
  "00:00 PM CEST TAM ON SITE",
  "00:00 PM CEST CAM ON SITE",
  "00:00 PM CEST ON SITE",
  "00:00 PM CEST LEFT SITE",
  "New DDT ticket for next week created — TT: D295348996",
  "Hello Corrado, seals verified, TT D295348996 ready for next week.",
  "2:45 PM CEST Activity in progress. Parts from Samuel @dearant and seal matches overview.",
];

const alarmPlaybook: string[] = [
  "11:00 AM CEST – CRO Metzyaid@ aware of an alarm DFO.",
  "11:02 AM CEST – Sent CGF Kilcht@ on site for investigation.",
  "11:04 AM CEST – SSS Kilcht@ investigating.",
  "Root cause under investigation. Event report + TT comment once resolved.",
  "Always add the wording under the TT “Alarm comments” section.",
];

const nextDdtSchedule: { date: string; locations: string[] }[] = [
  {
    date: "09/08/2025",
    locations: [
      "ZRH60-3.1.01-RZN-DH3 MAIN ENT DR IN",
      "ZRH60-3.1.01-RZN-DH3 MAIN ENT DR OUT",
      "ZRH60-3.1.01-RZN-EDR",
    ],
  },
  {
    date: "09/09/2025",
    locations: [
      "ZRH60-3.1.02-RZN-DH3 CICO LOBBY DR IN",
      "ZRH60-3.1.02-RZN-DH3 CICO LOBBY DR OUT",
      "ZRH60-3.1.02-RZN-EDR",
    ],
  },
  {
    date: "09/10/2025",
    locations: [
      "ZRH60-3.1.00-RZN-DH3 SEV2 DR IN",
      "ZRH60-3.1.00-RZN-DH3 SEV2 DR OUT",
      "ZRH60-3.1.00-RZN-EDR",
    ],
  },
  {
    date: "09/11/2025",
    locations: [
      "ZRH60-1.2.08-YZN-TRAINING RM 3RD FLR. ENT IN-HD",
      "ZRH60-1.2.08-YZN-TRAINING RM 3RD FLR. ENT OUT-HD",
    ],
  },
  {
    date: "09/12/2025",
    locations: [
      "ZRH60-2.2.00-YZN-MDF RM 3RD FLR IN-HD",
      "ZRH60-2.2.00-YZN-MDF RM 3RD FLR OUT-HD",
    ],
  },
];

const shadeTestNotes = [
  "3:00 PM CEST – SS gregdemd@ in CICO3, CGF ivappavl@ passed.",
  "3:40 PM CEST – SS dfischef@ in CICO2, CGF @karandrv passed.",
  "3:10 PM CEST – SS stamenjo@ in CICO4, CGF metzyaid@ failed (action required).",
];

const rackDeliveryNotes = [
  "09:30 AM CEST, DBS on site for rack delivery.",
  "00:00 AM CEST, Rack delivery in DH4 (1 unit).",
  "00:00 AM CEST, Rack delivery completed and DBS left the site.",
];

const visitorFlowSteps = [
  "Raise NDS if needed and pre-populate details.",
  "Check in visitor (set up PIN) and note badge: “VB (name) ZRH60-001 checked in”.",
  "Update #zrh60-information-flow + monthly visitor tracker (IN/OUT).",
  "Check out visitor, confirm CGF escort, then log it in handover.",
];

const securitySealSteps = [
  "Create TT named “Security Seal Tracking ZRH60 Site”.",
  "Update the Quip file “Security Seal Tracking” with device counts.",
  "Add handover note and post recap to #zrh60-information-flow.",
  "Template: “Following security seal 3LG348426 applied on envelope containing 1x YB, 4x CB, 1x Yubico from sakujund@”.",
  "Template: “Following security seals applied on Devices from elvixdiv@…”.",
];

export default function WorkflowDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "ddt-slack-scheduler",
      title: "DDT - Slack + Scheduler",
      description:
        "Start/finish announcements, scheduler toggle, TT D345224731 reference with Raul & Gregory.",
      priority: "high",
      completed: false,
      subtasks: [
        {
          id: "ddt-open-quip",
          title: "Open Quip workspace (ZRH cluster documentation space).",
          completed: false,
        },
        {
          id: "ddt-find-tracker",
          title: 'Search for "ZRH Cluster - Ticket Tracker" file.',
          completed: false,
        },
        {
          id: "ddt-master-ticket-link",
          title:
            'Open the link titled "ZRH60 [Daily Device Test Master Ticket] [MM/DD/YYYY to MM/DD/YYYY]".',
          completed: false,
        },
        {
          id: "ddt-slack-start",
          title:
            "Send “Daily Device Test in ZRH60 starting” Slack note with officers + TT link.",
          completed: false,
        },
        {
          id: "ddt-scheduler",
          title: "Start scheduler, confirm end timestamp after run completes.",
          completed: false,
        },
        {
          id: "ddt-slack-finish",
          title:
            "Post finish note with same officer list + TT (D345224731).",
          completed: false,
        },
      ],
    },
    {
      id: "ddt-documentation",
      title: "DDT - Documentation & Next Ticket",
      description:
        "Record device IDs, timings, alarms, Quip/logbook notes + prep next-week TT.",
      priority: "high",
      completed: false,
      subtasks: [
        {
          id: "ddt-tt-comment",
          title:
            "Comment TT with devices ZRH60-1.2.10-YZN-ID IN/OUT HD, start 07:08, end 07:13, alarms summary.",
          completed: false,
        },
        {
          id: "ddt-quip",
          title: "Update Quip dated 24/11/2025 with run outcome.",
          completed: true,
        },
        {
          id: "ddt-handover",
          title:
            "Handover & logbook note: “07:08 AM CEST DDT performed… 3x DFO, 1x DHO, 1x Invalid Pin, 2x Granted No Entry, 1x AA”.",
          completed: false,
        },
        {
          id: "ddt-next-ticket",
          title:
            "Create TT D295348996 for next week and store under master tracker.",
          completed: false,
        },
        {
          id: "ddt-corrado",
          title:
            "Ping Corrado: parts from Samuel @dearant verified, seal matches request.",
          completed: false,
        },
      ],
    },
    {
      id: "pde-test",
      title: "PDE Test - DH1 Aisle 10501-10610",
      description:
        "Slack broadcast, TT severity change 2→5, resolution comment, Quip + handover.",
      priority: "high",
      completed: false,
      subtasks: [
        {
          id: "pde-slack",
          title: "Send start/finish Slack lines for DH1 PDE test.",
          completed: false,
        },
        {
          id: "pde-tt",
          title:
            "Resolve TT with severity 5 + comment “PDE test, resolving TT (no person in aisle)”.",
          completed: false,
        },
        {
          id: "pde-quip",
          title: "Update Quip entry 08/27/2025.",
          completed: true,
        },
        {
          id: "pde-handover",
          title:
            "Handover entries: 8:49 PM PDE DH4 (TT ...), 9:09 PM PDE DH4 no alarms.",
          completed: false,
        },
      ],
    },
    {
      id: "shade-rotation",
      title: "Shade Test Rotation",
      description:
        "Track every shade test + CGF outcome for CICO 2/3/4 lanes.",
      priority: "medium",
      completed: true,
      subtasks: [
        {
          id: "shade-cico3",
          title: "3:00 PM CEST CICO3 gregdemd@ ➜ CGF ivappavl@ passed.",
          completed: true,
        },
        {
          id: "shade-cico2",
          title: "3:40 PM CEST CICO2 dfischef@ ➜ CGF @karandrv passed.",
          completed: true,
        },
        {
          id: "shade-cico4",
          title: "3:10 PM CEST CICO4 stamenjo@ ➜ CGF metzyaid@ failed (follow up).",
          completed: false,
        },
      ],
    },
    {
      id: "rack-delivery",
      title: "Rack Delivery Oversight",
      description:
        "Trace DBS arrival, delivery progress, and post to #zrh60-information-flow.",
      priority: "medium",
      completed: false,
      subtasks: [
        {
          id: "rack-arrival",
          title: "Log 09:30 AM CEST DBS arrival + rack traceability.",
          completed: true,
        },
        {
          id: "rack-delivery-note",
          title: "Report delivery start/completion (1 unit DH4).",
          completed: false,
        },
        {
          id: "rack-handover",
          title: "Add completion + DBS departure to handover.",
          completed: false,
        },
      ],
    },
    {
      id: "security-seals",
      title: "Security Seal Tracking",
      description:
        "TT + Quip alignment for envelopes / devices coming from sakujund@ & elvixdiv@.",
      priority: "medium",
      completed: false,
      subtasks: [
        {
          id: "seal-tt",
          title: "Ensure TT “Security Seal Tracking ZRH60 Site” is updated.",
          completed: false,
        },
        {
          id: "seal-quip",
          title:
            "Document seal 3LG348426 (1x YB, 4x CB, 1x Yubico) and devices from elvixdiv@.",
          completed: false,
        },
        {
          id: "seal-handover",
          title: "Share recap on #zrh60-information-flow + handover.",
          completed: false,
        },
      ],
    },
    {
      id: "visitor-management",
      title: "Visitor / Vendor Management",
      description:
        "NDS, PIN setup, ZRH60 information flow, monthly tracker, check-out, handover.",
      priority: "low",
      completed: false,
      subtasks: [
        {
          id: "visitor-nds",
          title: "Raise NDS + pre-registration for VB ZRH60-001 (if required).",
          completed: false,
        },
        {
          id: "visitor-tracker",
          title: "Log IN/OUT on monthly visitor tracker + Slack note.",
          completed: false,
        },
        {
          id: "visitor-handover",
          title: "Add final note in handover once visitor leaves.",
          completed: false,
        },
      ],
    },
    {
      id: "alarm-handling",
      title: "Alarm TT Comments",
      description:
        "Follow CRO ➜ CGF ➜ report sequence with timestamps for DFO/DHO alarms.",
      priority: "low",
      completed: false,
      subtasks: [
        {
          id: "alarm-awareness",
          title: "11:00 AM CEST – CRO Metzyaid@ aware of DFO alarm.",
          completed: true,
        },
        {
          id: "alarm-dispatch",
          title: "11:02 AM CEST – Dispatch CGF Kilcht@.",
          completed: true,
        },
        {
          id: "alarm-onsite",
          title: "11:04 AM CEST – Kilcht@ on-site, add root-cause once known.",
          completed: false,
        },
      ],
    },
  ]);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

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
            ZRH60 Operations Console
          </h1>
          <p className="text-white/60 text-lg">
            One place to track DDT, PDE, shade tests, rack deliveries, seals, visitors, and alarms.
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
                  Ops Checklist
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
              label="Procedures closed"
              value={completedCount}
              max={totalCount}
              color="blue"
            />
          </motion.div>

          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">
                  High Priority (DDT/PDE)
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
              label="Still open"
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
              label="Backlog"
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
                    onToggleSubtask={handleToggleSubtask}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              className="glass rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-wide">
                    PDE / Ops Contacts
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    Alias Directory
                  </h3>
                </div>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {aliasDirectory.map((person) => (
                  <div
                    key={person.alias}
                    className="flex items-center justify-between border-b border-white/5 pb-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {person.name}
                      </p>
                      <p className="text-xs text-white/50">{person.focus}</p>
                    </div>
                    <span className="text-xs font-mono text-blue-300">
                      {person.alias}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              className="glass rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick paste snippets
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                {quickSnippets.map((snippet, idx) => (
                  <li
                    key={`${snippet}-${idx}`}
                    className="rounded border border-white/10 bg-white/5 px-3 py-2"
                  >
                    {snippet}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              className="glass rounded-lg p-6 text-center"
            >
              <CircularProgress
                value={completedCount}
                max={totalCount}
                label="Ops completion"
                size="lg"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-xs mt-4"
              >
                Keep logging each milestone—console stays green when every run
                has notes, TT updates, and a handover line.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {procedureBlocks.map((block) => (
            <motion.div
              key={block.id}
              variants={staggerItem}
              className="glass rounded-lg p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide">
                    Procedure reminder
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {block.title}
                  </h3>
                  {block.subtitle && (
                    <p className="text-white/60 text-sm mt-1">
                      {block.subtitle}
                    </p>
                  )}
                </div>
                {block.tt && (
                  <a
                    href={block.tt}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-300 underline"
                  >
                    Open TT
                  </a>
                )}
              </div>
              <ol className="mt-4 space-y-3 text-sm text-white/80 list-decimal list-inside">
                {block.steps.map((step, index) => (
                  <li key={`${block.id}-step-${index}`}>{step}</li>
                ))}
              </ol>
              {block.meta && (
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {block.meta.map((meta) => (
                    <div
                      key={`${block.id}-${meta.label}`}
                      className="rounded border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <p className="text-xs text-white/50">{meta.label}</p>
                      <p className="text-sm text-white">{meta.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
        >
          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase text-white/50">Forward plan</p>
                <h3 className="text-xl font-semibold text-white">
                  Next DDT master ticket
                </h3>
              </div>
              <span className="text-xs font-semibold text-blue-300">
                09/08 ➜ 09/12
              </span>
            </div>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {nextDdtSchedule.map((entry) => (
                <div
                  key={entry.date}
                  className="rounded border border-white/10 bg-white/5 p-3"
                >
                  <p className="text-sm font-semibold text-white">
                    {entry.date}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-white/70">
                    {entry.locations.map((loc) => (
                      <li key={`${entry.date}-${loc}`}>• {loc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <p className="text-xs uppercase text-white/50">Recent runs</p>
            <h3 className="text-xl font-semibold text-white mb-4">
              Shade test & rack timeline
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-white/80 mb-2">
                  Shade tests
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  {shadeTestNotes.map((note, idx) => (
                    <li
                      key={`shade-note-${idx}`}
                      className="rounded border border-white/10 bg-white/5 px-3 py-2"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-sm font-semibold text-white/80 mb-2">
                  Rack delivery
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  {rackDeliveryNotes.map((note, idx) => (
                    <li
                      key={`rack-note-${idx}`}
                      className="rounded border border-white/10 bg-white/5 px-3 py-2"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <p className="text-xs uppercase text-white/50">Security seals</p>
            <h3 className="text-xl font-semibold text-white mb-4">
              Tracking checklist
            </h3>
            <ol className="space-y-3 text-sm text-white/80 list-decimal list-inside">
              {securitySealSteps.map((step, idx) => (
                <li key={`seal-step-${idx}`}>{step}</li>
              ))}
            </ol>
          </motion.div>

          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <p className="text-xs uppercase text-white/50">Visitor flow</p>
            <h3 className="text-xl font-semibold text-white mb-4">
              Checklist
            </h3>
            <ol className="space-y-3 text-sm text-white/80 list-decimal list-inside">
              {visitorFlowSteps.map((step, idx) => (
                <li key={`visitor-step-${idx}`}>{step}</li>
              ))}
            </ol>
          </motion.div>

          <motion.div variants={staggerItem} className="glass rounded-lg p-6">
            <p className="text-xs uppercase text-white/50">Alarm comments</p>
            <h3 className="text-xl font-semibold text-white mb-4">
              TT template
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              {alarmPlaybook.map((line, idx) => (
                <li
                  key={`alarm-line-${idx}`}
                  className="rounded border border-white/10 bg-white/5 px-3 py-2"
                >
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: "Total Tasks", value: totalCount },
            { label: "Completed", value: completedCount },
            { label: "In Progress", value: totalCount - completedCount },
            { label: "Success Rate", value: `${completionPercentage}%` },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
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
