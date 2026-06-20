"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  "React / Next.js",
  "TypeScript",
  "Framer Motion",
  "Three.js / WebGL",
  "Node.js",
  "UI/UX Design",
  "Figma",
  "Tailwind CSS",
];

const bentoImages = [
  {
    id: "bento-profile",
    src: "/akshath-profile.png",
    alt: "Akshath CH — Creative Developer",
    caption: "Akshath CH",
    className: "col-span-2 row-span-2",
    height: "h-full min-h-[22rem]",
  },
  {
    id: "bento-tools",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85&auto=format&fit=crop",
    alt: "Design tools and creative instruments",
    caption: "Tools & Craft",
    className: "col-span-1 row-span-1",
    height: "h-44 sm:h-48",
  },
  {
    id: "bento-inspiration",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=85&auto=format&fit=crop",
    alt: "Retro tech and creative inspiration",
    caption: "Inspiration",
    className: "col-span-1 row-span-1",
    height: "h-44 sm:h-48",
  },
];


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-600/6 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.p
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4"
        >
          About Me
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left — Text content */}
          <div>
            <motion.h2
              custom={0.1}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-4xl md:text-5xl font-bold leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              I build things{" "}
              <span className="gradient-text italic">beautifully</span>, with
              purpose.
            </motion.h2>

            <motion.div
              custom={0.2}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-5 text-slate-400 leading-relaxed text-[15px]"
            >
              <p>
                I&apos;m{" "}
                <span className="text-slate-200 font-medium">Akshath CH</span>,
                a creative developer designing and building digital products for
                startups, agencies, and global brands. My work sits at the
                sweet spot between engineering precision and design artistry.
              </p>
              <p>
                I specialize in creating{" "}
                <span className="text-slate-200 font-medium">
                  motion-rich, high-performance web experiences
                </span>{" "}
                — from cinematic marketing sites to complex SaaS dashboards. I
                care deeply about the details: the micro-animation that makes a
                button feel alive, the typography choice that sets the tone, the
                color that evokes emotion.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring generative art,
                contributing to open-source, or sketching UI concepts in
                Figma over a good cup of coffee.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              custom={0.3}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-10"
            >
              <p className="text-xs font-medium text-slate-500 tracking-widest uppercase mb-5">
                Core Skills
              </p>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                    className="px-3.5 py-1.5 rounded-full glass border border-slate-700/60 text-sm text-slate-300 hover:border-indigo-500/50 hover:text-indigo-300 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              custom={0.5}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-10 flex gap-4"
            >
              <a
                href="mailto:hello@akshathch.dev"
                id="about-contact-btn"
                className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Get in touch
              </a>
              <a
                href="#"
                id="about-resume-btn"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300"
              >
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download CV
              </a>
            </motion.div>
          </div>

          {/* Right — Bento image grid */}
          <motion.div
            custom={0.25}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-3 grid-rows-2 gap-3 h-auto">
              {bentoImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  id={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.12,
                    duration: 0.6,
                    ease: "easeOut" as const,
                  }}
                  className={`relative ${img.className} overflow-hidden rounded-xl group`}
                >
                  <div className={`relative ${img.height} w-full`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent rounded-xl" />
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-medium text-slate-200 tracking-wide">
                        {img.caption}
                      </p>
                    </div>
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-500/40 rounded-tr-xl" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote card below bento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-4 glass rounded-xl p-5 border border-slate-800/60"
            >
              <svg
                className="w-6 h-6 text-indigo-500 mb-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                &ldquo;Design is not just what it looks like and feels like.
                Design is how it works.&rdquo;
              </p>
              <p className="text-slate-500 text-xs mt-2 font-medium">
                — Steve Jobs
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
