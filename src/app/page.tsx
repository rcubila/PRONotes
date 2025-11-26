"use client";
import "./global.css";
import { useState, Fragment } from "react";
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

const awsCalendars = [
  { icon: "📅", label: "AWS InfraOps Standfast Calendar" },
  { icon: "📅", label: "ZRH CGF Calendar" },
];

const securityContacts = [
  { label: "ZRH60 Green Security", number: "044 545 19 00" },
  { label: "ZRH61 Vantage Security", number: "076 281 12 63" },
  { label: "ZRH62 Digital Realty 1", number: "044 562 30 53" },
  { label: "ZRH62 Digital Realty 2", number: "079 104 70 72" },
  { label: "ZRH65 Digital Realty", number: "044 562 30 16" },
  { label: "EMS • Ambulance", number: "144" },
];

const radioGroups = [
  {
    title: "ZRH60 Radios",
    channels: [
      "ZRH-37000",
      "ZRH-37001",
      "ZRH-37002",
      "ZRH-37003",
      "ZRH-37004",
      "ZRH-37005",
      "ZRH-37006",
      "ZRH-37007",
      "ZRH-37008",
      "ZRH-37009",
      "ZRH-37010",
      "ZRH-37011",
      "ZRH-37012",
      "ZRH-37013",
      "ZRH-37014",
      "ZRH-37015",
      "ZRH-37016",
      "ZRH-37017",
      "ZRH-37018",
      "ZRH-37019",
      "ZRH-37020",
      "ZRH-37021",
      "ZRH-37022",
      "ZRH-37023",
      "ZRH-37024",
      "ZRH-37025",
      "ZRH-37026",
      "ZRH-37027",
      "ZRH-37028",
      "ZRH-37029",
      "ZRH-37030",
      "ZRH-37031",
      "ZRH-37032",
      "ZRH-37051",
      "ZRH-37052",
      "ZRH-37053",
      "ZRH-37054",
      "ZRH-37055",
      "ZRH-37056",
      "ZRH-37057",
      "ZRH-37058",
      "ZRH-37059",
      "ZRH-37060",
      "ZRH-37061",
      "ZRH-37062",
      "ZRH-37063",
      "ZRH-37064",
      "ZRH-37065",
      "ZRH-37066",
      "ZRH-37067",
      "ZRH-37068",
      "ZRH-37069",
      "ZRH-37070",
      "ZRH-37071",
      "ZRH-37072",
      "ZRH-37073",
    ],
  },
  {
    title: "ZRH61 Radios",
    channels: [
      "ZRH-37101",
      "ZRH-37102",
      "ZRH-37103",
      "ZRH-37104",
      "ZRH-37105",
      "ZRH-37106",
      "ZRH-37107 (Emergency · ZRH65 A100 office)",
      "ZRH-37108",
      "ZRH-37109",
      "ZRH-37110",
      "ZRH-37111",
      "ZRH-37112",
      "ZRH-37113 (ZRH65 DH)",
      "ZRH-37114",
      "ZRH-37115",
      "ZRH-37116 (Emergency)",
      "ZRH-37117",
      "ZRH-37118",
      "ZRH-37119",
      "ZRH-37120",
      "ZRH-37121",
    ],
  },
  {
    title: "ZRH62 / 65 Radios",
    channels: [
      "ZRH-37122",
      "ZRH-37123",
      "ZRH-37124",
      "ZRH-37125",
      "ZRH-37126",
      "ZRH-37127",
      "ZRH-37128",
      "ZRH-37129 (Emergency · ZRH62 A100 office)",
      "ZRH-37130",
      "ZRH-37131",
      "ZRH-37132 (ZRH62 DH)",
      "ZRH-37133",
      "ZRH-37134",
      "ZRH-37135 (ZRH62 focus)",
      "ZRH-37136",
      "ZRH-37137",
      "ZRH-37138",
      "ZRH-37139 (Emergency · ZRH62 A100 office)",
      "ZRH-37140",
    ],
  },
];

const cgfRosters = [
  {
    site: "ZRH60",
    location: "Green Data Center · Industriestrasse 33 · 5242 Lupfig",
    phones: [
      { label: "Wired Phone", number: "052 529 00 75" },
      { label: "SEC1", number: "076 378 4574" },
    ],
    team: [
      { name: "Joshua Stamenkov", alias: "stamenjo@", badge: "" },
      { name: "Gregory Roriz", alias: "gregdemd@", badge: "4600698" },
      { name: "Andreas Karagiannis", alias: "karandrv@", badge: "4601049" },
      { name: "Elvira Diveki", alias: "elvixdiv@", badge: "4600697" },
      { name: "Julia Plaskiewicz", alias: "juliplah@", badge: "4600712" },
      { name: "Krisztina Kobilarov", alias: "kobilkri@", badge: "4600836" },
      { name: "Lucas Alves", alias: "martxluc@", badge: "4600719" },
      { name: "Natalia Biernacka", alias: "biernnat@", badge: "4600699" },
      { name: "Paulo Melo", alias: "paulodig@", badge: "4600972" },
      { name: "Petar Janev", alias: "janpetar@", badge: "4601028" },
      { name: "Thomas Kilcher", alias: "kilcht@", badge: "4600832" },
      { name: "Yaidy Metzger", alias: "metzyaid@", badge: "4600696" },
      { name: "Raul Cubila", alias: "cubiljra", badge: "4601069" },
    ],
  },
  {
    site: "ZRH61",
    location: "Vantage Data Centers · Fabrikstrasse 12 · 8404 Winterthur",
    phones: [
      { label: "Wired Phone", number: "052 529 00 46" },
      { label: "SEC1", number: "079 374 4996" },
      { label: "SEC2", number: "076 378 0635" },
    ],
    team: [
      { name: "Wasim Abbas", alias: "rabbwasi@", badge: "4600770" },
      { name: "Nikolina Bonefacic", alias: "nikolbon@", badge: "4600738" },
      { name: "Boris Bosnjak", alias: "borbosnj@", badge: "4600805" },
      { name: "Hysen Janca", alias: "chysgian@", badge: "4600704" },
      { name: "Hrvoje Biondic", alias: "hrvbiond@", badge: "4600844" },
      { name: "Abdulbari Soliman", alias: "asolimat@", badge: "4600705" },
      { name: "Luka Milicevic", alias: "lukamili@", badge: "4600715" },
      { name: "Maria Gamboa Gomez", alias: "gamboago@", badge: "4600838" },
      { name: "Marjana Lleshi", alias: "ollesmar@", badge: "4600734" },
      { name: "Marko Milicevic", alias: "mmmilice@", badge: "4600746" },
      { name: "Nader Soliman", alias: "nadesoli@", badge: "4600709" },
      { name: "Mira Pavlovic", alias: "mirapavl@", badge: "4600713" },
      { name: "Jesus Cullell Carbonell", alias: "mjesucar@", badge: "4601044" },
      { name: "Luciano Roriz Gama", alias: "lrorizga@", badge: "4601045" },
    ],
  },
  {
    site: "ZRH62 / ZRH65",
    location:
      "ZRH62 · Sägereistrasse 33/35 · 8152 Glattbrugg · ZRH65 · Bäulerwiesenstrasse 6 · 8152 Opfikon",
    phones: [
      { label: "Wired Phone", number: "044 529 54 41" },
      { label: "SEC1", number: "076 478 72 16" },
      { label: "SEC2", number: "076 280 91 30" },
    ],
    team: [
      { name: "Antun Budim", alias: "budantun@", badge: "4600762" },
      { name: "Victor Borges", alias: "barbosvh@", badge: "4600677" },
      { name: "Ahmet Yasar", alias: "yaahmet@", badge: "4600695" },
      { name: "Audberto Cubillas", alias: "aucubill@", badge: "4600751" },
      { name: "Bartosz Wojnowski", alias: "wojnobar@", badge: "4600730" },
      { name: "Dragana Mazzone", alias: "mazzdrag@", badge: "4600752" },
      { name: "Laura Mikus", alias: "laurmiku@", badge: "4600732" },
      { name: "Ledina Islami", alias: "lgislami@", badge: "4600969" },
      { name: "Mario Paja", alias: "xpamario@", badge: "4600679" },
      { name: "Michal Kusiewicz", alias: "kusiewmi@", badge: "4600765" },
      { name: "Miralem Sherifoski", alias: "sherifog@", badge: "4600970" },
      { name: "Najeem Takiyu Deen", alias: "cnatakiy@", badge: "4600678" },
      { name: "Nonic Veljko", alias: "noveljko@", badge: "4600720" },
      { name: "Regina Mrowca", alias: "mrowregi@", badge: "4600726" },
      { name: "Rikard Murati", alias: "rikamura@", badge: "4600748" },
      {
        name: "Theepika Umamaheswaran",
        alias: "umamathe@",
        badge: "4600799",
      },
      { name: "Ioannis Stogiannis", alias: "stoioann@", badge: "4600753" },
      { name: "Emanuel Marinac", alias: "emanuemx@", badge: "4601068" },
    ],
  },
];

const protectasManagement = [
  { name: "Andrijana Simjanovska", alias: "asimjano@", badge: "4600675" },
  { name: "Daniel Fischer", alias: "dfischef@", badge: "4600672" },
];

const cameraPresets = [
  {
    site: "ZRH60",
    presets: [
      { label: "CICO’s", url: "https://tiny.amazon.com/kpkk9isj/amazon-optics" },
      { label: "RZN Entry Doors", url: "https://tiny.amazon.com/dgsvavg2/amazon-optics" },
      { label: "YZN Offices Entry & Exit Doors", url: "https://tiny.amazon.com/tbtgvezc/amazon-optics" },
      { label: "YZN Support Rooms Entry & Exit Doors", url: "https://tiny.amazon.com/zbgi57wk/amazon-optics" },
      { label: "RZN All CICO's 1-4", url: "https://tiny.amazon.com/5mqtj1wp/amazon-optics" },
      { label: "Important Doors", url: "https://tiny.amazon.com/14t7yf6m0/amazon-optics" },
    ],
  },
  {
    site: "ZRH61",
    presets: [
      {
        label: "CICO’s & Yellow Zones",
        url: "https://tiny.amazon.com/36ida3ms/amazon-optics",
      },
      {
        label: "DH2",
        url: "https://optics.amazon.dev/AWS_SOC/video/d5f9ff85-53e6-4cad-90b7-df07b6e552f6",
      },
      {
        label: "DH1",
        url: "https://optics.amazon.dev/AWS_SOC/video/b0777448-aa91-495b-aecd-543311cdc64e",
      },
      {
        label: "Yellow Zone sweep",
        url: "https://optics.amazon.dev/AWS_SOC/video/92116035-28ea-4f2e-80e9-84b68cff7f82",
      },
    ],
  },
  {
    site: "ZRH62 / ZRH65",
    presets: [
      {
        label: "ZUR1 & ZUR2 (CICO / Yellow Zones)",
        url: "https://tiny.amazon.com/orvw9bvd/amazon-optics",
      },
      {
        label: "ZUR3 (CICO & Yellow Zones)",
        url: "https://tiny.amazon.com/8wyo5nbp/amazon-optics",
      },
      {
        label: "All DH Cameras",
        url: "https://tiny.amazon.com/aes8hc95/amazon-optics",
      },
    ],
  },
];

const handoverMonths = [
  ["January 2025", "July 2025"],
  ["February 2025", "August 2025"],
  ["March 2025", "September 2025"],
  ["April 2025", "October 2025"],
  ["May 2025", "November 2025"],
  ["June 2025", "December 2025"],
];

const boostCodes = [
  { location: "ZRH62 CICO LOBBY", code: "ZRH62_CICO1" },
  { location: "ZRH65 CICO LOBBY 1 (Old DH)", code: "ZRH65_CICO1" },
  { location: "ZRH65 CICO LOBBY 2 (New DH)", code: "ZRH65_CICO2" },
  { location: "ZRH60 CICO LOBBY 1", code: "ZRH60_CICO1" },
  { location: "ZRH60 CICO LOBBY 2", code: "ZRH60_CICO2" },
  { location: "ZRH60 CICO LOBBY 3", code: "ZRH60_CICO3" },
  { location: "ZRH60 CICO LOBBY 4", code: "ZRH60_CICO4" },
  { location: "ZRH61 CICO LOBBY 1", code: "ZRH61_CICO1" },
  { location: "ZRH61 CICO LOBBY 2", code: "ZRH61_CICO2" },
];

const importantLinks = [
  "🌐 Optics",
  "🖥️ A100 Dashboard",
  "🧧 Red Zone Passport (RZP)",
  "📱 The Phone Tool",
  "🤖 Scheduler NextGen",
  "📧 Amazon Mail",
  "👽 Asset Operations",
  "💬 Slack",
  "📓 Amazon Wiki",
  "💾 Mobility",
  "✒️ Amazon Contract Central",
  "📥 Quip",
  "👨🏻‍🔧 SOC On Call",
  "🚀 ASSET EURI Quicklinks",
];

const ticketTrackers = [
  "📂 ZRH Cluster tracker",
  "📂 ZRH62/65 - Alarm Record File",
  "📂 ZRH Cluster - Repair TT Tracker 2024",
  "🔗 ZRH Cluster TIN number",
  "⛓️ TIN Assignment",
];

const awarenessItems = [
  "⚠️ Awareness ZRH60",
  "⚠️ Awareness ZRH61",
  "⚠️ Awareness ZRH62",
  "⚠️ Awareness ZRH65",
  "🔥 Fire evacuation ZRH60",
  "🔥 Fire evacuation ZRH61",
  "🔥 Fire evacuation ZRH62",
  "🔥 Fire evacuation ZRH65",
];

const repairAndTestItems = [
  "⛏️ Repair ZRH60",
  "⛏️ Repair ZRH61",
  "⛏️ Repair ZRH62",
  "⛏️ Repair ZRH65",
  "🕹️ Daily Device Test ZRH60",
  "🕹️ Daily Device Test ZRH61",
  "🕹️ Daily Device Test ZRH62",
  "🕹️ Daily Device Test ZRH65",
];

const supportEngineeringLinks = [
  "💻 Lenel Device Troubleshooting",
  "💻 Camera Troubleshooting (Communication Lost)",
  "💻 Lenel NVR Troubleshooting",
  "🎴 Cardholder Record Creation",
  "🎴 Badge Issue / Modification",
  "💻 ROW Account Creation",
  "🇿 Zorro Badge Configuration",
  "📷 Photo camera transit",
  "🎴 Badge Printing",
  "🩺 Medical exception",
  "⚠️ Dropped / Dark Hours Tracking Ticket (NEW)",
  "🎭 Masking (Asset)",
  "🎭 Masking (ASSET-EURI) Quicklinks",
  "📧 Masking Support · asset-euri@amazon.com",
  "📖 ZRH CGF Resolver Group Templates",
  "🆕 Incident Tracking Ticket",
];

const medicalResponseItems = [
  "🏥 Medical Incident Response (NEW)",
  "🚑 Medical Incident Response ZRH60",
  "🚑 Medical Incident Response ZRH61",
  "🚑 Medical Incident Response ZRH62",
  "🚑 Medical Incident Response ZRH65",
];

const alarmResponseItems = [
  "🔞 APB ZRH60",
  "🔞 APB ZRH61",
  "🔞 APB ZRH62",
  "🔞 APB ZRH65",
  "🚨 Alarm Active ZRH60",
  "🚨 Alarm Active ZRH61",
  "🚨 Alarm Active ZRH62",
  "🚨 Alarm Active ZRH65",
  "🚪 DHO ZRH60",
  "🚪 DHO ZRH61",
  "🚪 DHO ZRH62",
  "🚪 DHO ZRH65",
  "🚪 DFO ZRH60",
  "🚪 DFO ZRH61",
  "🚪 DFO ZRH62",
  "🚪 DFO ZRH65",
];

const securitySealTickets = [
  "🏷️ Security seal tracking (all sites)",
  "🔖 Security seal ZRH62",
  "🔖 Security seal ZRH65",
  "🔖 Security seal ZRH61",
  "🔖 Security seal ZRH60",
  "🔖 ZRH62/65 Media Bins Tamper Seal Tracking Ticket",
  "🔖 Weekly anti-tamper seals ZRH62",
  "🔖 Weekly anti-tamper seals ZRH65",
];

const keyVisitorLinks = [
  "🔐 Keys",
  "🗝️ Key Tracking ZRH62/65",
  "🗝️ Key list ZRH62/65",
  "🚪 Monthly Visitor Cluster",
  "🚶 ZRH Cluster - Monthly Visitor Tracker",
];

const linksTools = [
  "🛃 Amazon Permission",
  "📅 DCSM OnCall",
  "🕵️ Amazon Password Tool",
  "🖇️ Amazon QR Code Generator",
  "⚙️ Security key dashboard",
  "⌨️ AWS OnPoint",
];

const dailyOpsLinks = [
  "🏁 Daily Operations ZRH62/65",
  "🧬 Status Tree ZRH65",
  "🧬 Status Tree ZRH62",
  "🧬 Status Tree ZRH51",
  "🧬 Status Tree ZRH52",
  "🗝️ Key Tracking 2025",
];

const roomDirectory = [
  { site: "ZUR1", room: "SEC CONTROL ROOM", reference: "—" },
  { site: "ZUR1", room: "A100 OFFICE", reference: "ZUR1.2.224" },
  { site: "ZUR1", room: "MDF ROOM", reference: "ZUR1.2.201" },
  { site: "ZUR2", room: "SEC LOBBY", reference: "ZUR2.L1.121" },
  { site: "ZUR2", room: "DCO PARTS ROOM", reference: "ZUR2.L1.119" },
  { site: "ZUR2", room: "MAIN DOOR DH ENT ZRH62", reference: "ZUR2.L2.204.1" },
  { site: "ZUR2", room: "ZORRO DOOR DH ZRH62", reference: "ZUR2.L2.204.2" },
  { site: "ZUR2", room: "SEV2 DOOR DH ZRH62", reference: "ZUR2.L2.202.2" },
  { site: "ZUR2", room: "EMERGENCY EXIT DH ZRH62", reference: "ZUR2.L2.202.1" },
  { site: "ZUR3", room: "A100 OFFICE", reference: "L1.015A" },
  { site: "ZUR3", room: "MAIN DOOR DH3 ENT ZRH65", reference: "L1.094" },
  { site: "ZUR3", room: "ZORRO DOOR DH3 ZRH65", reference: "L1.094" },
  { site: "ZUR3", room: "DECOM DOOR DH3 ZRH65", reference: "L1.094" },
  { site: "ZUR3", room: "MAIN DOOR DH2 ENT ZRH65", reference: "L0.089" },
  { site: "ZUR3", room: "ZORRO DOOR DH2 ZRH65", reference: "L0.089" },
  { site: "ZUR3", room: "SEV2 DOOR DH1 ZRH65", reference: "L0.090" },
  { site: "ZUR3", room: "DECOM DOOR DH1 ZRH65", reference: "L0.090" },
  { site: "ZUR3", room: "STORAGE ROOM BASEMENT", reference: "B1.054" },
];

const trainingResources = ["✏️ Knet", "✏️ Knet2"];

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
        id="console"
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

      <section
        id="new-tools"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10"
      >
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Resource vault
          </p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-white">
              🗃️ New Tools ZRH
            </span>
          </div>
          <p className="text-white/70 text-sm max-w-4xl">
            Everything the cluster relies on: calendars, rosters, radios, camera
            presets, boost codes, tickets, and training. Use these cards to move
            through daily handovers without digging through multiple docs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              📆 AWS Calendars
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {awsCalendars.map((entry) => (
                <li
                  key={entry.label}
                  className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span>{entry.icon}</span>
                  <span>{entry.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">
                ☎️ COLO Security Numbers in Cluster
              </h3>
              <span className="text-xs font-semibold text-emerald-300">
                NEW
              </span>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full text-sm text-white/80">
                <tbody>
                  {securityContacts.map((contact) => (
                    <tr
                      key={contact.label}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="py-2 pr-4">{contact.label}</td>
                      <td className="py-2 font-semibold text-white text-right">
                        {contact.number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              📶 Radios Cluster List
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {radioGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-semibold text-white">
                  {group.title}
                </p>
                <div className="mt-3 max-h-48 overflow-y-auto pr-1">
                  <div className="flex flex-wrap gap-2 text-xs text-white/70">
                    {group.channels.map((code) => (
                      <span
                        key={code}
                        className="rounded border border-white/15 px-2 py-1"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {cgfRosters.map((roster) => (
            <div
              key={roster.site}
              className="glass rounded-2xl border border-white/10 p-6 space-y-4"
            >
              <div>
                <p className="text-xs uppercase text-white/50">👮 CGFs</p>
                <h3 className="text-2xl font-semibold text-white">
                  {roster.site} Names / Alias
                </h3>
                <p className="text-sm text-white/70">{roster.location}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                {roster.phones.map((phone) => (
                  <span
                    key={`${roster.site}-${phone.label}`}
                    className="rounded border border-white/10 bg-white/5 px-3 py-1"
                  >
                    {phone.label}:{" "}
                    <span className="text-white font-semibold">
                      {phone.number}
                    </span>
                  </span>
                ))}
              </div>
              <div className="overflow-auto max-h-64">
                <table className="min-w-full text-sm text-white/80">
                  <thead>
                    <tr className="text-left text-white/50 uppercase text-xs tracking-wide">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Alias</th>
                      <th className="pb-2 text-right">Badge ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roster.team.map((person) => (
                      <tr
                        key={`${roster.site}-${person.name}`}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="py-2 pr-3 text-white">
                          {person.name}
                        </td>
                        <td className="py-2 pr-3">{person.alias}</td>
                        <td className="py-2 text-right font-semibold text-white">
                          {person.badge || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="glass rounded-2xl border border-white/10 p-6">
            <p className="text-xs uppercase text-white/50">👨‍💼 Protectas</p>
            <h3 className="text-2xl font-semibold text-white">
              Management Names / Alias
            </h3>
            <div className="mt-4 overflow-auto">
              <table className="min-w-full text-sm text-white/80">
                <thead>
                  <tr className="text-left text-white/50 uppercase text-xs tracking-wide">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Alias</th>
                    <th className="pb-2 text-right">Badge ID</th>
                  </tr>
                </thead>
                <tbody>
                  {protectasManagement.map((person) => (
                    <tr
                      key={person.alias}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="py-2 pr-3 text-white">{person.name}</td>
                      <td className="py-2 pr-3">{person.alias}</td>
                      <td className="py-2 text-right font-semibold text-white">
                        {person.badge}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white">
            🎥 Optics NextGen Dev · Camera Presets
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {cameraPresets.map((preset) => (
              <div
                key={preset.site}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-semibold text-white">
                  {preset.site}
                </p>
                <ul className="mt-3 space-y-2 text-xs text-white/80">
                  {preset.presets.map((link) => (
                    <li key={`${preset.site}-${link.url}`}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-300 hover:text-blue-200 underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              📋 Daily Handover Report
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
              {handoverMonths.map(([a, b]) => (
                <Fragment key={a}>
                  <div className="rounded border border-white/10 bg-white/5 px-3 py-2">
                    {a}
                  </div>
                  <div className="rounded border border-white/10 bg-white/5 px-3 py-2">
                    {b}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">
                ⚙️ CICO IN/OUT – BOOST
              </h3>
              <div className="flex items-center gap-3 text-xs text-white/70">
                <span>✅ Boost In</span>
                <span>🅾️ Boost Out</span>
              </div>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full text-sm text-white/80">
                <tbody>
                  {boostCodes.map((entry) => (
                    <tr
                      key={entry.code}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="py-2 pr-4 text-white">{entry.location}</td>
                      <td className="py-2 text-right font-semibold text-blue-200">
                        {entry.code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { title: "💻 Important Links", items: importantLinks },
            { title: "🔎 Ticket Trackers", items: ticketTrackers },
            { title: "📄 Templates & Awareness", items: awarenessItems },
            { title: "🛠️ Repairs & Tests", items: repairAndTestItems },
            {
              title: "👷 Support Engineering / Asset (NEW CTI)",
              items: supportEngineeringLinks,
            },
            { title: "🏥 Medical Response", items: medicalResponseItems },
            { title: "🚨 Alarm Response", items: alarmResponseItems },
          ].map((card) => (
            <div
              key={card.title}
              className="glass rounded-2xl border border-white/10 p-5"
            >
              <h3 className="text-sm font-semibold text-white mb-3">
                {card.title}
              </h3>
              <ul className="space-y-2 text-sm text-white/80">
                {card.items.map((item) => (
                  <li
                    key={`${card.title}-${item}`}
                    className="rounded border border-white/10 bg-white/5 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                ☑️ Security Seals · Workflow + Tickets
              </h3>
            </div>
            <ol className="space-y-2 text-sm text-white/80 list-decimal list-inside">
              {securitySealSteps.map((step, idx) => (
                <li key={`seal-step-${idx}`}>{step}</li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-2 text-xs text-white/80">
              {securitySealTickets.map((ticket) => (
                <span
                  key={ticket}
                  className="rounded border border-white/10 bg-white/5 px-3 py-2"
                >
                  {ticket}
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                🚪 Visitor Flow & Keys
              </h3>
            </div>
            <ol className="space-y-2 text-sm text-white/80 list-decimal list-inside">
              {visitorFlowSteps.map((step, idx) => (
                <li key={`visitor-step-${idx}`}>{step}</li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-2 text-xs text-white/80">
              {keyVisitorLinks.map((entry) => (
                <span
                  key={entry}
                  className="rounded border border-white/10 bg-white/5 px-3 py-2"
                >
                  {entry}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              👾 Links & Utilities
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              {linksTools.map((link, idx) => (
                <span
                  key={`link-${idx}-${link}`}
                  className="rounded border border-white/10 bg-white/5 px-3 py-2"
                >
                  {link}
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              🏁 Daily Ops & Status Trees
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              {dailyOpsLinks.map((item) => (
                <span
                  key={item}
                  className="rounded border border-white/10 bg-white/5 px-3 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            🗂️ Room Name · COLO Reference
          </h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-white/80">
              <thead>
                <tr className="text-left text-white/50 uppercase text-xs tracking-wide">
                  <th className="pb-2">Campus</th>
                  <th className="pb-2">Room</th>
                  <th className="pb-2 text-right">Reference</th>
                </tr>
              </thead>
              <tbody>
                {roomDirectory.map((row, idx) => (
                  <tr
                    key={`${row.site}-${row.room}-${idx}`}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-2 pr-3 text-white font-semibold">
                      {row.site}
                    </td>
                    <td className="py-2 pr-3">{row.room}</td>
                    <td className="py-2 text-right">{row.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            🎓 Training
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-white/80">
            {trainingResources.map((item) => (
              <span
                key={item}
                className="rounded border border-white/10 bg-white/5 px-3 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
