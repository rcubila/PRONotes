"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { FloatingClock } from "../../components/floating-clock";

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

const securitySealSteps = [
  "Create TT named “Security Seal Tracking ZRH60 Site”.",
  "Update the Quip file “Security Seal Tracking” with device counts.",
  "Add handover note and post recap to #zrh60-information-flow.",
  "Template: “Following security seal 3LG348426 applied on envelope containing 1x YB, 4x CB, 1x Yubico from sakujund@”.",
  "Template: “Following security seals applied on Devices from elvixdiv@…”.",
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

const visitorFlowSteps = [
  "Raise NDS if needed and pre-populate details.",
  "Check in visitor (set up PIN) and note badge: “VB (name) ZRH60-001 checked in”.",
  "Update #zrh60-information-flow + monthly visitor tracker (IN/OUT).",
  "Check out visitor, confirm CGF escort, then log it in handover.",
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

export default function NewToolsPage() {
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

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
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
