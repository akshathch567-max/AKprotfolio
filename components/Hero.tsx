"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=90&auto=format&fit=crop";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const wordVariants = {
  hidden: { y: 60, opacity: 0, skewY: 4 },
  visible: {
    y: 0,
    opacity: 1,
    skewY: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Left — Typography */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 section-padding"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium tracking-widest uppercase text-indigo-400 border border-indigo-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Available for hire
            </span>
          </motion.div>

          {/* Main title — word by word reveal */}
          <div className="overflow-hidden mb-3">
            <motion.p
              variants={wordVariants}
              className="text-slate-400 text-lg font-light tracking-[0.25em] uppercase"
            >
              Creative Developer
            </motion.p>
          </div>

          <h1 className="mb-6">
            {["Crafting", "Digital", "Experiences"].map((word) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  variants={wordVariants}
                  className="block text-6xl md:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {word === "Digital" ? (
                    <span className="gradient-text text-glow">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md"
          >
            I design and build high-performance web experiences that live at the
            intersection of art and engineering — pixel-perfect, motion-rich,
            and deeply human.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <a
              href="#work"
              id="hero-view-work-btn"
              className="group relative px-7 py-3.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#about"
              id="hero-about-btn"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium transition-all duration-300"
            >
              About Me
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>


        </motion.div>
      </motion.div>

      {/* Right — Parallax Image */}
      <div className="hidden lg:flex relative w-1/2 overflow-hidden">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={HERO_IMAGE}
            alt="Abstract digital art representing creative development"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          {/* Gradient fade left */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          {/* Gradient fade bottom */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-10" />
          {/* Color overlay */}
          <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply z-10" />
        </motion.div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 30, x: 30 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" as const }}
          className="absolute bottom-16 right-10 z-20"
        >
          <div className="glass rounded-2xl p-4 border border-slate-700/50 glow-accent max-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Project Launched
                </p>
                <p className="text-[10px] text-slate-400">Just now</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Stellar UI v2.0 deployed successfully 🚀
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-xs text-slate-600 tracking-widest uppercase">
          Scroll
        </p>
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
