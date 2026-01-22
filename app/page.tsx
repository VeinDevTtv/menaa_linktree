"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  Instagram, Mail, Calendar, Users, Star,
  ArrowRight, ExternalLink, MapPin, Heart
} from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"
import { InteractiveCard } from "@/components/interactive-card"

// --- Custom Components ---

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12 text-gradient-gold drop-shadow-lg">
    {children}
  </h2>
)

const JewelCard = ({
  href,
  title,
  subtitle,
  icon: Icon,
  delay = 0
}: {
  href: string
  title: string
  subtitle: string
  icon: any
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="w-full"
    >
      <Link href={href} className="block h-full group">
        <InteractiveCard className="h-full flex flex-row items-center gap-6 p-6 md:p-8 bg-gradient-to-br from-indigo-950/80 to-midnight/80 border-primary/20">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-500" />
            <div className="relative w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-midnight/50 group-hover:scale-110 transition-transform duration-500">
              <Icon className="w-8 h-8 text-primary group-hover:text-amber-200 transition-colors" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mt-1 group-hover:text-foreground/80 transition-colors">
              {subtitle}
            </p>
          </div>

          <ArrowRight className="w-6 h-6 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </InteractiveCard>
      </Link>
    </motion.div>
  )
}

const StatCard = ({ number, label, delay = 0 }: { number: string, label: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
  >
    <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{number}</div>
    <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">{label}</div>
  </motion.div>
)

const FooterLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-2 group"
  >
    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
      <Icon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
    </div>
    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
  </a>
)

export default function Home() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-primary/30">
      <ArabesquePatterns />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 pb-10">
        <motion.div
          style={{ y: heroY, opacity }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Logo Container with Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-48 h-48 md:w-64 md:h-64 mb-8 group"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse-glow" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700">
              <Image
                src="/MENAA_LOGO.jpg"
                alt="MENAA Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Titles */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-4"
          >
            <span className="text-gradient-gold">DE ANZA</span> <span className="text-foreground">MENAA</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed"
          >
            The Middle Eastern & North African Association
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 flex items-center gap-2 text-sm text-primary/80 uppercase tracking-widest"
          >
            <Star className="w-4 h-4" /> Est. 2024 <Star className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent mx-auto mb-2" />
          <span className="text-xs uppercase tracking-widest">Discover</span>
        </motion.div>
      </section>

      {/* --- LINKS SECTION --- */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <SectionHeading>Our Portals</SectionHeading>

          <JewelCard
            href="/events"
            title="Events & Gatherings"
            subtitle="Join our upcoming cultural celebrations and movie nights."
            icon={Calendar}
            delay={0.1}
          />

          <JewelCard
            href="/apply-officer"
            title="Become an Officer"
            subtitle="Lead the community and shape the future of MENAA."
            icon={Star}
            delay={0.2}
          />

          <JewelCard
            href="/member-form"
            title="Join the Community"
            subtitle="Become an official member and connect with us."
            icon={Users}
            delay={0.3}
          />
        </div>
      </section>

      {/* --- MISSION STATEMENT --- */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <SectionHeading>Our Mission</SectionHeading>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl border-primary/10 relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <p className="text-lg md:text-2xl leading-relaxed text-foreground/90 font-serif">
              "To create a welcoming sanctuary where the rich tapestries of Middle Eastern and North African cultures are celebrated, preserved, and shared with the De Anza community."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <StatCard number="20+" label="Nations" delay={0.2} />
              <StatCard number="100+" label="Members" delay={0.4} />
              <StatCard number="∞" label="Stories" delay={0.6} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative pt-24 pb-12 px-4 bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-12">
            <FooterLink href="https://instagram.com/deanzamenaa" icon={Instagram} label="Instagram" />
            <FooterLink href="mailto:menasc.da@gmail.com" icon={Mail} label="Email" />
            <FooterLink href="https://discord.gg/UAS7xXRj27" icon={ExternalLink} label="Discord" />
          </div>

          <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">De Anza College, Cupertino, CA</span>
          </div>

          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} De Anza MENAA. <br className="md:hidden" />
            Designed with <Heart className="w-3 h-3 text-red-500 inline fill-red-500" /> by <span className="text-primary hover:text-primary/80 transition-colors cursor-pointer">Abdelkarim Ait Bourich</span>
          </p>
        </div>

        {/* Bottom decorative gradient */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-900 via-primary/50 to-indigo-900" />
      </footer>
    </main>
  )
}
