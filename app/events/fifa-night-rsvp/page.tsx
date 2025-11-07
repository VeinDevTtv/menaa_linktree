"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Trophy, Calendar, MapPin, Clock, Sparkles, Star, Camera, Users, Gamepad2, Megaphone 
} from "lucide-react"

import { SoccerBall3D } from "@/components/soccer-ball-3d"
import { SoccerFieldBg } from "@/components/soccer-field-bg"
import { SoccerParticles } from "@/components/soccer-particles"

const highlightStats = [
  { label: "Players", value: "+15", subtitle: "MENAA gamers across 10 squads", icon: Users },
  { label: "Champion", value: "Adam", subtitle: "Won a free jersey of his choice", icon: Trophy },
  { label: "Runner-Up", value: "Ahmed", subtitle: "Fought through every elimination round, sorry lil bro", icon: Star },
]

const timeline = [
  {
    title: "Kickoff Rally",
    description: "Teams repped their regions, warmed up with dribbling challenges, and lined up under stadium-inspired lights.",
    time: "4:00 PM",
  },
  {
    title: "Group Stage Thrillers",
    description: "Golden goals, penalty drama, and tactical showdowns kept the crowd roaring all afternoon.",
    time: "4:20 PM",
  },
  {
    title: "Final Showdown",
    description: "Top seeds clashed for the MENAA cup, with fan chants echoing across the venue.",
    time: "5:30 PM",
  },
  {
    title: "Winner’s Circle",
    description: "Adam sealed the title, Ahmed claimed runner-up honors, and the champion walked away with a free jersey of his choice.",
    time: "5:50 PM",
  },
]

const shoutouts = [
  {
    title: "Champion Highlight",
    detail: "Adam delivered the clinching goal, lifted the trophy, and chose a dream jersey as his prize.",
  },
  {
    title: "Runner-Up Salute",
    detail: "Ahmed pushed every match to the limit and kept the final buzzing until the last whistle.",
  },
  {
    title: "Fan MVP",
    detail: "The supporter squad with drums & scarves made the space feel like an international stadium.",
  },
]

export default function FifaNightRecapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-stone-950 text-white relative overflow-hidden">
      {/* Background */}
      <SoccerFieldBg opacity={0.2} />
      <SoccerParticles density="high" speed="medium" />
      <SoccerBall3D size="lg" position={{ x: 15, y: 18 }} />
      <SoccerBall3D size="md" position={{ x: 82, y: 30 }} />
      <SoccerBall3D size="sm" position={{ x: 25, y: 74 }} />
      <SoccerBall3D size="md" position={{ x: 70, y: 82 }} />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link 
          href="/events"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Events
        </Link>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/60 via-green-900/40 to-stone-950/60 backdrop-blur-xl p-8 md:p-12">
          <motion.div
            className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[140px] bg-[url('/textures/pitch-lines.svg')] opacity-10"
            animate={{ backgroundPositionX: ["0%", "100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 grid lg:grid-cols-[1.6fr,1fr] gap-10 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-emerald-200 via-lime-200 to-yellow-200 bg-clip-text text-transparent"
              >
                MENAA FIFA Night Recap
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-4 text-lg sm:text-xl text-emerald-100/80 leading-relaxed"
              >
                The pitch may be quiet now, but the energy lives on. Catch the highlights, stats, and moments that made our MENAA FIFA Night unforgettable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6 flex flex-wrap gap-4 text-emerald-100/70 text-sm"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 border border-emerald-400/20">
                  <Calendar className="w-4 h-4" />
                  November 5, 2025
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 border border-emerald-400/20">
                  <Clock className="w-4 h-4" />
                  4:00 PM – 6:00 PM
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 border border-emerald-400/20">
                  <MapPin className="w-4 h-4" />
                  L73 · Social & Humanities Village
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {["Heart-pounding matches", "MENAA community pride", "Electric fan atmosphere"].map((tag, idx) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-lime-500/10 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-emerald-100/80 border border-emerald-400/20"
                    style={{ transitionDelay: `${idx * 0.05}s` }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative rounded-3xl border border-emerald-400/20 bg-black/40 backdrop-blur-xl p-6 flex flex-col items-center text-center shadow-2xl"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-lime-400/10 to-yellow-400/10 opacity-50" />
              <div className="absolute -top-10 w-full flex justify-center">
                <div className="rounded-3xl bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-300 p-1 shadow-[0_10px_40px_rgba(16,185,129,0.4)]">
                  <div className="rounded-[22px] bg-stone-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
                    MENAA CUP
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-10 flex flex-col items-center gap-4">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/40">
                  <Trophy className="h-10 w-10 text-emerald-200" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-100">Champions Crowned</h2>
                <p className="text-sm text-emerald-100/70 leading-relaxed">
                  Adam raised the trophy after a clutch overtime strike, earning a free jersey of his choice while Ahmed took home runner-up honors. Every team brought their best — and every fan brought MENAA pride.
                </p>
                <Link
                  href="/events"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/25 transition-transform duration-300 hover:scale-105"
                >
                  <Megaphone className="w-4 h-4" />
                  See Upcoming Events
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlightStats.map(({ label, value, subtitle, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-900/40 via-stone-950/40 to-emerald-900/40 backdrop-blur-xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-emerald-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-400/30">
                  <Icon className="w-7 h-7 text-emerald-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">{label}</p>
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="text-sm text-emerald-100/60">{subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Timeline */}
        <section className="mt-16 rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-stone-950/60 via-emerald-950/40 to-stone-950/50 backdrop-blur-xl p-8 md:p-12">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30">
              <Gamepad2 className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Matchday Timeline</h2>
              <p className="text-sm text-emerald-100/70">Relive the pulse of the night — moment by moment.</p>
            </div>
          </div>

          <div className="mt-10 space-y-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-10"
              >
                <div className="absolute left-0 top-1.5 flex items-center">
                  <div className="h-12 w-0.5 bg-gradient-to-b from-emerald-400/60 to-transparent" />
                  <div className="ml-[-6px] h-3 w-3 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 shadow-[0_0_18px_rgba(74,222,128,0.5)]" />
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-wide text-emerald-200/80">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-emerald-100/70 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Shoutouts & memories */}
        <section className="mt-16 grid lg:grid-cols-[1.4fr,1fr] gap-8">
          <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-stone-950/50 via-emerald-900/40 to-stone-950/60 p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30">
                <Sparkles className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Shoutouts from the Pitch</h2>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Moments that lit up the stadium</p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {shoutouts.map((shout, idx) => (
                <motion.div
                  key={shout.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 font-semibold">
                      #{idx + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{shout.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-emerald-100/70 leading-relaxed">{shout.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/10 via-stone-950/40 to-emerald-900/30 p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30">
                <Camera className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Event Gallery</h2>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Captured memories loading</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {[1, 2, 3].map((placeholder, idx) => (
                <motion.div
                  key={placeholder}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="relative overflow-hidden rounded-2xl border border-emerald-400/25 bg-gradient-to-r from-emerald-500/15 via-emerald-400/10 to-yellow-400/10 p-5"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                      <Camera className="w-6 h-6 text-emerald-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-100">Event photos coming soon</p>
                      <p className="text-xs text-emerald-100/60">Professional game-day shots in edit — stay tuned!</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="mt-6 text-sm text-emerald-100/70"
            >
              Want to share your shots? Tag{" "}
              <a
                href="https://instagram.com/deanzamenaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 underline-offset-4 hover:underline"
              >
                @deanzamenaa
              </a>{" "}
              and we might feature you!
            </motion.div>
          </div>
        </section>

        {/* Call to action */}
        <section className="mt-16 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-green-900/60 via-emerald-900/50 to-stone-950/60 p-10 text-center backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-500/15 px-5 py-2 text-xs uppercase tracking-[0.4em] text-emerald-200">
              Next Up
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              MENAA matchdays never stop. Ready for the next event?
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-emerald-100/70 leading-relaxed">
              We&apos;re already planning the next community experience. Keep an eye on our events page and socials for announcements, volunteer opportunities, and sign-up details.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-300 px-7 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/25 transition-transform duration-300 hover:scale-105"
              >
                <Star className="w-4 h-4" />
                Explore upcoming events
              </Link>
              <a
                href="https://instagram.com/deanzamenaa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-emerald-500/15 px-7 py-3 text-sm font-semibold text-emerald-100 border border-emerald-400/30 transition-transform duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                Follow the highlights
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
