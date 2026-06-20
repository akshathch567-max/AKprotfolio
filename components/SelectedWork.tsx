"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    id: "proj-1",
    title: "Stellar Dashboard",
    category: "SaaS · UI Design",
    description:
      "A next-gen analytics platform with real-time data visualization and AI-powered insights.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&auto=format&fit=crop",
    tags: ["Next.js", "D3.js", "Framer Motion"],
    year: "2024",
    color: "from-indigo-600/20 to-violet-600/20",
    link: "/projects/proj-1",
  },
  {
    id: "proj-2",
    title: "Aura E-Commerce",
    category: "E-Commerce · Full Stack",
    description:
      "Premium luxury shopping experience with 3D product previews and seamless checkout flow.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85&auto=format&fit=crop",
    tags: ["React", "Shopify", "Three.js"],
    year: "2024",
    color: "from-emerald-600/20 to-teal-600/20",
    link: "/projects/proj-2",
  },

  {
    id: "proj-4",
    title: "Mosaic Architecture",
    category: "Branding · Web Design",
    description:
      "Minimalist portfolio for an award-winning architecture studio with cinematic scroll storytelling.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85&auto=format&fit=crop",
    tags: ["Webflow", "GSAP", "Three.js"],
    year: "2023",
    color: "from-rose-600/20 to-pink-600/20",
    link: "/projects/proj-4",
  },

  {
    id: "proj-6",
    title: "Nexus Attendance System",
    category: "AI • BIOMETRIC INTEGRATION",
    description:
      "An intelligent facial recognition platform featuring automated logging, data persistence, and secure verification with integrated, real-time graph visualization.",
    image: "/nexus_attendance_thumbnail.png",
    tags: ["React", "OpenCV", "D3.js", "Highcharts"],
    year: "2026",
    link: "/projects/proj-6",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Link href={project.link} passHref legacyBehavior>
      <motion.a
        ref={ref}
        id={`project-card-${project.id}`}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: (index % 3) * 0.1,
          ease: "easeOut" as const,
        }}
        className="group relative overflow-hidden rounded-2xl bg-[#0b0f19] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer block border border-[#1a233a] font-sans"
      >
        {/* 1. Image Container with Hover Overlay */}
        <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-gradient-to-br from-[#051329] to-[#0a0a16] border border-[#1a233a]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Year Badge */}
          <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-[12px] font-medium px-2.5 py-1 rounded-md text-[#9ca3af] border border-white/10 z-10">
            {project.year}
          </span>

          {/* View Project Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-black transition-colors text-sm">
              View Project →
            </span>
          </div>
        </div>

        {/* 2. Content Area */}
        <div className="mt-4 flex flex-col gap-2">
          <span className="text-[11px] font-bold tracking-wider text-[#5c62ec] uppercase">
            {project.category}
          </span>
          <h3 className="text-[20px] font-bold text-white group-hover:text-indigo-300 transition-colors m-0">
            {project.title}
          </h3>
          <p className="text-[14px] text-[#9ca3af] leading-relaxed m-0 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* 3. Tech Stack Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[12px] bg-[#1a233a]/40 text-[#d1d5db] px-3 py-1.5 rounded-full border border-[#1a233a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.a>
    </Link>
  );
}

export default function SelectedWork() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="relative section-padding">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
              Selected Work
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Projects that{" "}
              <span className="gradient-text italic">define me</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm leading-relaxed md:text-right">
            A curated selection of commercial and passion projects spanning
            product design, engineering, and creative direction.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#"
            id="view-all-work-btn"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-slate-700 hover:border-indigo-500/50 text-slate-300 hover:text-white transition-all duration-300 hover:bg-indigo-500/5"
          >
            <span className="font-medium">View All Projects</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
      </div>
    </section>
  );
}
