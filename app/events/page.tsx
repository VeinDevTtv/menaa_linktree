"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  MapPin,
  Clock,
  Sparkles,
  Users,
} from "lucide-react"

import { ArabesquePatterns } from "@/components/arabesque-patterns"

const pastEvents = [
  {
    id: "friendsgiving-2024",
    title: "MENAA Welcome",
    date: "November 5, 2024",
    time: "4:00 PM – 8:00 PM",
    location: "Houge Park, San Jose, CA",
    description:
      "We wove warm spices, cultural rhythms, and community gratitude into one table. An evening of food, fellowship, and celebration.",
    images: [
      "/events/menaaevent1_1.jpg",
      "/events/menaaevent1_2.jpg",
      "/events/menaaevent1_3jpg.jpg",
      "/events/menaaevent1_4.jpg",
      "/events/menaaevent1_5.jpg",
    ],
    gradient: "from-amber-500/20 via-orange-500/20 to-rose-500/20",
    borderColor: "border-amber-400/30",
  },
  {
    id: "fifa-night-2024",
    title: "MENAA FIFA Night",
    date: "November 23, 2025",
    time: "4:00 PM – 6:00 PM",
    location: "L73 · Social & Humanities Village",
    description:
      "Heart-pounding matches, MENAA community pride, and electric fan atmosphere. Champions were crowned on the digital pitch.",
    images: [
      "/events/menaaevent2_1.jpg",
      "/events/menaaevent2_2.jpg",
      "/events/menaaevent2_3.jpg",
      "/events/menaaevent2_4.jpg",
      "/events/menaaevent2_5.jpg",
      "/events/menaaevent2_6.jpg",
      "/events/menaaevent2_7.jpg",
      "/events/menaaevent2_8.jpg",
      "/events/menaaevent2_9.jpg",
      "/events/menaaevent2_10.jpg",
      "/events/menaaevent2_11.jpg",
    ],
    gradient: "from-emerald-500/20 via-green-500/20 to-lime-500/20",
    borderColor: "border-emerald-400/30",
    link: "/events/fifa-night-gallery",
  },
]

const upcomingEvents: typeof pastEvents = [
  {
    id: "hot-chocolate-social-2024",
    title: "Hot Chocolate Social / Game Night",
    date: "December 3, 2024",
    time: "3:00 PM – 5:00 PM",
    location: "Fireside Room",
    description:
      "Cozy up with a warm cup of hot chocolate, challenge your friends to board games, and enjoy a relaxing evening with the MENAA community.",
    images: [
      "/events/chocolate.jpg",
      "/events/games.jpg",
      "/events/social.jpg",
      "/events/menaachoco.jpg",
    ],
    gradient: "from-amber-700/30 via-yellow-700/30 to-orange-700/30",
    borderColor: "border-amber-600/40",
    link: "/events/hot-chocolate-social",
  },
]

const floatingAccents = [
  { Icon: Sparkles, top: "12%", left: "10%", delay: 0 },
  { Icon: Users, top: "22%", right: "12%", delay: 1.2 },
  { Icon: Camera, bottom: "18%", left: "16%", delay: 0.6 },
  { Icon: CalendarDays, bottom: "20%", right: "8%", delay: 1.8 },
]

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"upcoming" | "past">("upcoming")
  const currentEvents = viewMode === "past" ? pastEvents : upcomingEvents
  const hasEvents = currentEvents.length > 0

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.28),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(31,112,81,0.3),_transparent_55%)]" />

      <div className="absolute left-6 top-6 z-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur transition hover:border-emerald-300/40 hover:bg-emerald-500/15"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1 group-hover:text-emerald-200" />
          Back to home
        </Link>
      </div>

      <ArabesquePatterns />

      {floatingAccents.map(({ Icon, delay, ...position }, index) => (
        <motion.span
          key={index}
          className={`pointer-events-none absolute text-amber-200/70 drop-shadow-[0_0_12px_rgba(234,179,8,0.4)]`}
          style={position}
          animate={{
            y: ["0%", "-12%", "0%"],
            rotateZ: [0, 6, -4, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <Icon className="h-10 w-10" />
        </motion.span>
      ))}

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-6xl px-6 py-24 sm:px-10">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.28em] text-amber-300/90 shadow-[0_0_0_1px_rgba(244,114,35,0.35)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-amber-200" />
            {viewMode === "past" ? "Past Events" : "Upcoming Events"}
          </motion.div>

          <motion.h1
            className="text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-amber-300 via-rose-200 to-emerald-200 bg-clip-text text-transparent">
              Community Events
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Celebrating culture, connection, and community through unforgettable
            gatherings.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <button
              onClick={() => setViewMode("upcoming")}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] transition-all ${
                viewMode === "upcoming"
                  ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 text-slate-900 shadow-[0_10px_40px_rgba(16,185,129,0.45)] hover:from-emerald-300 hover:via-emerald-200 hover:to-amber-200 hover:scale-105"
                  : "border border-white/20 bg-white/5 text-slate-300 hover:border-emerald-300/40 hover:bg-emerald-500/15 hover:text-emerald-200"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              View Upcoming Events
            </button>
            <button
              onClick={() => setViewMode("past")}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] transition-all ${
                viewMode === "past"
                  ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 text-slate-900 shadow-[0_10px_40px_rgba(16,185,129,0.45)] hover:from-emerald-300 hover:via-emerald-200 hover:to-amber-200 hover:scale-105"
                  : "border border-white/20 bg-white/5 text-slate-300 hover:border-emerald-300/40 hover:bg-emerald-500/15 hover:text-emerald-200"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              View Past Events
            </button>
          </motion.div>
        </motion.div>

        {!hasEvents && viewMode === "upcoming" ? (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl text-slate-400 mb-4">No events for now...</p>
            <p className="text-slate-500">
              Check back soon for upcoming community events!
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:gap-16">
            {currentEvents.map((event, eventIndex) => (
            <motion.article
              key={event.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: eventIndex * 0.15 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative grid lg:grid-cols-2 gap-0">
                {/* Image Gallery Section */}
                <div className="relative h-[400px] lg:h-auto overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4">
                    {event.images.slice(0, 4).map((image, idx) => (
                      <motion.div
                        key={idx}
                        className="relative overflow-hidden rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: eventIndex * 0.15 + idx * 0.1,
                        }}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                      >
                        <Image
                          src={image}
                          alt={`${event.title} photo ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                  </div>
                  {event.images.length > 4 && (
                    <div className="absolute bottom-4 right-4 rounded-full bg-black/60 backdrop-blur-md px-4 py-2 text-sm font-medium text-white border border-white/20">
                      +{event.images.length - 4} more photos
                    </div>
                  )}
                </div>

                {/* Event Details Section */}
                <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <motion.h2
                      className="text-3xl lg:text-4xl font-bold text-slate-50 mb-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: eventIndex * 0.15 + 0.2 }}
                    >
                      {event.title}
                    </motion.h2>
                    <motion.p
                      className="text-lg text-slate-300 leading-relaxed"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: eventIndex * 0.15 + 0.3 }}
                    >
                      {event.description}
                    </motion.p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <motion.div
                      className="flex items-center gap-3 text-slate-300"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: eventIndex * 0.15 + 0.4 }}
                    >
                      <CalendarDays className="h-5 w-5 text-amber-300" />
                      <span className="text-base">{event.date}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3 text-slate-300"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: eventIndex * 0.15 + 0.5 }}
                    >
                      <Clock className="h-5 w-5 text-emerald-300" />
                      <span className="text-base">{event.time}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3 text-slate-300"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: eventIndex * 0.15 + 0.6 }}
                    >
                      <MapPin className="h-5 w-5 text-rose-300" />
                      <span className="text-base">{event.location}</span>
                    </motion.div>
                  </div>

                  {event.link && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: eventIndex * 0.15 + 0.7 }}
                    >
                      <Link
                        href={event.link}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-900 shadow-[0_10px_40px_rgba(16,185,129,0.45)] transition hover:from-emerald-300 hover:via-emerald-200 hover:to-amber-200 hover:scale-105"
                      >
                        <Camera className="h-4 w-4" />
                        View Gallery
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.article>
            ))}
          </div>
        )}

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-slate-400 mb-4">
            {viewMode === "past"
              ? "More events coming soon! Stay tuned for announcements."
              : "Check back soon for upcoming community events!"}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
