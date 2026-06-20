"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL PROJECT DATA  (only 4 projects remain)
// ─────────────────────────────────────────────────────────────────────────────
const localProjects = [
  {
    id: "proj-1",
    title: "Stellar Dashboard",
    category: "SaaS \u00b7 UI Design",
    description:
      "A next-gen analytics platform with real-time data visualization and AI-powered insights.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&auto=format&fit=crop",
    tags: ["Next.js", "D3.js", "Framer Motion"],
    year: "2024",
    challenge:
      "Developing high-performance, real-time rendering logic for thousands of concurrent data streams without causing browser main-thread blocking or layout thrashing. The dashboard needed to support microsecond-precision time-series data while remaining interactive and running complex D3 layout equations simultaneously on lower-end devices.",
    solution:
      "Leveraged D3.js mathematical paths bound directly to lightweight React state and accelerated by WebGL/CSS 3D transforms. Implemented requestAnimationFrame debounce buffers, offloaded parsing of heavy JSON payloads to an offline Web Worker thread, and designed a custom virtualized grid system that only renders active chart modules in the current viewport.",
    features: [
      "Real-time event logging pipeline with low-latency WebSocket connection",
      "Interactive multi-axis time-series visualization charts with dynamic brush-zooming",
      "Custom drag-and-drop workspace layout builder with local storage persistence",
      "Automatic dark-mode color palette generator using HSL color-space mathematical interpolation",
      "AI-driven anomaly detection visualizer highlighting unusual network spike patterns",
    ],
  },
  {
    id: "proj-2",
    title: "Aura E-Commerce",
    category: "E-Commerce \u00b7 Full Stack",
    description:
      "Premium luxury shopping experience with 3D product previews and seamless checkout flow.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85&auto=format&fit=crop",
    tags: ["React", "Shopify", "Three.js"],
    year: "2024",
    challenge:
      "Integrating complex, photorealistic 3D WebGL assets into a standard mobile-responsive checkout pipeline. High-poly models caused significant loading delays, memory leaks, and dropped frame rates on mobile Safari browsers, leading to user drop-offs during checkout.",
    solution:
      "Used Three.js with glTF Draco compression to shrink 3D assets by up to 80%. Implemented progressive enhancement with lazy-loading models on variant selection, offloaded complex texture decoding to Web Workers, and configured a global state engine that synchronizes custom configurations directly with Stripe and headless Shopify checkout sessions.",
    features: [
      "Interactive 3D model customizer supporting dynamic physical materials and texture mapping",
      "Seamless Shopify headless cart integration with edge-cached GraphQL API queries",
      "Dynamic pricing engine calculating customization markups in real-time",
      "Single-page checkout with Stripe elements and automated shipping tax estimation",
      "AR quick-look toggle allowing users to view products in their room via mobile cameras",
    ],
  },
  {
    id: "proj-4",
    title: "Mosaic Architecture",
    category: "Branding \u00b7 Web Design",
    description:
      "Minimalist portfolio for an award-winning architecture studio with cinematic scroll storytelling.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85&auto=format&fit=crop",
    tags: ["Webflow", "GSAP", "Three.js"],
    year: "2023",
    challenge:
      "Achieving complex multi-timeline scroll animations and smooth page transitions without degrading page performance or creating scroll stutter. The layout required heavy high-resolution media loading combined with continuous DOM coordinate transformations.",
    solution:
      "Implemented GSAP ScrollTrigger with passive event listeners and optimized CSS hardware acceleration rules. Used WebGL canvas displacement filters for page transitions, and structured a service-worker-based media prefetching scheme that predicts user navigation based on mouse hover vectors.",
    features: [
      "Cinematic horizontal project slideshow transitions with custom WebGL image distortion filters",
      "Interactive 3D architectural blueprint viewer utilizing light-weight CAD model imports",
      "Sleek custom mouse follower with inertial dampening and contextual state changes",
      "Responsive typography using clamp() mathematical fluid scaling and screen-optimized fonts",
      "Dynamic metadata injection for SEO and social sharing cards based on active scroll index",
    ],
  },
  {
    id: "proj-6",
    title: "Nexus Attendance System",
    category: "AI \u2022 BIOMETRIC INTEGRATION",
    description:
      "An intelligent facial recognition platform featuring automated logging, data persistence, and secure verification with integrated, real-time graph visualization.",
    image: "/nexus_attendance_thumbnail.png",
    tags: ["React", "OpenCV", "D3.js", "Highcharts"],
    year: "2026",
    challenge:
      "Implementing low-latency real-time facial recognition in the browser while maintaining high accuracy, spoofing protection, and secure client-server data synchronization without database timeout locks.",
    solution:
      "Built a hybrid architecture utilizing OpenCV for local image preprocessing, WebSockets for fast server streams, and a Mongoose backend for persistent logs with real-time dynamic graphing. Deployed lightweight ONNX face-detection models in-browser, offloading identity matching to serverless APIs with caching.",
    features: [
      "Automated biometric logging within 300ms using face mesh coordinates matching",
      "Live time-series check-in trend charts displaying system throughput and detection logs",
      "Anti-spoofing face-liveness check analytics utilizing custom optical flow calculations",
      "Secure admin control dashboard and automatic Slack/Email integration alerts",
      "Offline buffering mode queueing logs in LocalStorage when server connectivity drops",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHART 1  Stellar Dashboard — Live Multi-line Analytics
// ─────────────────────────────────────────────────────────────────────────────
function StellarChart() {
  const [series, setSeries] = useState({
    sessions: [60, 72, 55, 80, 65, 90, 75, 95, 85, 100],
    api:      [40, 50, 45, 65, 55, 70, 60, 80, 70, 88],
    errors:   [8,  12, 6,  18, 10, 14, 9,  20, 15, 11],
  });

  useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) => {
        const bump = (arr: number[], lo: number, hi: number) => {
          const last = arr[arr.length - 1];
          const next = Math.max(lo, Math.min(hi, Math.round(last + (Math.random() - 0.5) * 18)));
          return [...arr.slice(1), next];
        };
        return {
          sessions: bump(prev.sessions, 30, 100),
          api:      bump(prev.api, 20, 90),
          errors:   bump(prev.errors, 2, 25),
        };
      });
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const W = 600, H = 180, P = 24;
  const toPath = (arr: number[], lo: number, hi: number) => {
    const pts = arr.map((v, i) => ({
      x: P + (i * (W - P * 2)) / (arr.length - 1),
      y: H - P - ((v - lo) / (hi - lo)) * (H - P * 2),
    }));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  };

  const lines = [
    { arr: series.sessions, lo: 30, hi: 100, stroke: "#818cf8", fill: "#818cf8", label: "Sessions" },
    { arr: series.api,      lo: 20, hi: 90,  stroke: "#34d399", fill: "#34d399", label: "API Calls" },
    { arr: series.errors,   lo: 2,  hi: 25,  stroke: "#f87171", fill: "#f87171", label: "Errors" },
  ];

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Live Platform Analytics</h4>
          <p className="text-xs text-slate-500">User sessions \u00b7 API calls \u00b7 Error rate</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping" />
          <span className="text-xs font-semibold text-indigo-400">LIVE</span>
        </div>
      </div>

      <div className="flex gap-5 mb-3">
        {lines.map(({ stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-4 h-1 rounded-full inline-block" style={{ background: stroke }} />
            <span className="text-[10px] text-slate-400">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative h-[180px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible">
          <defs>
            <filter id="sg-glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            {lines.map(({ stroke, label }) => (
              <linearGradient key={label} id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity="0.3" />
                <stop offset="100%" stopColor={stroke} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {[0.25, 0.5, 0.75].map((r) => (
            <line key={r} x1={P} y1={H * r} x2={W - P} y2={H * r} stroke="#1e293b" strokeDasharray="4 4" />
          ))}
          {lines.map(({ arr, lo, hi, stroke, label }) => (
            <g key={label}>
              <path d={`${toPath(arr, lo, hi)} L ${W - P} ${H - P} L ${P} ${H - P} Z`} fill={`url(#sg-${label})`} />
              <motion.path
                d={toPath(arr, lo, hi)}
                fill="none"
                stroke={stroke}
                strokeWidth="2.5"
                filter="url(#sg-glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 border-t border-slate-800/60 pt-4 text-center">
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Peak Sessions</span><span className="text-base font-bold text-indigo-400">{Math.max(...series.sessions)}/min</span></div>
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">API Calls</span><span className="text-base font-bold text-emerald-400">{Math.max(...series.api)}/s</span></div>
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Error Rate</span><span className="text-base font-bold text-red-400">{series.errors[series.errors.length - 1]}%</span></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHART 2  Aura E-Commerce — Animated Revenue Bar Chart
// ─────────────────────────────────────────────────────────────────────────────
function AuraChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const [revenues, setRevenues] = useState([42, 58, 51, 73, 65, 88, 79, 95, 83, 110]);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setRevenues((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.max(40, Math.min(130, Math.round(last + (Math.random() - 0.5) * 15)));
        return [...prev.slice(1), next];
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const maxRev = Math.max(...revenues);

  return (
    <div ref={ref} className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Monthly Revenue Performance</h4>
          <p className="text-xs text-slate-500">Store gross revenue &middot; thousands USD &middot; 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="text-xs font-semibold text-emerald-400">LIVE</span>
        </div>
      </div>

      <div className="flex items-end gap-2 h-[160px] mt-2">
        {revenues.map((val, i) => {
          const pct = (val / maxRev) * 100;
          const isTop = val === maxRev;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full relative flex flex-col justify-end" style={{ height: 140 }}>
                <motion.div
                  className={`w-full rounded-t-md ${isTop
                    ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                    : "bg-gradient-to-t from-slate-700 to-slate-600 group-hover:from-emerald-700 group-hover:to-emerald-500"
                  } transition-colors duration-300 relative`}
                  initial={{ height: 0 }}
                  animate={{ height: animated ? `${pct}%` : 0 }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: "easeOut" }}
                >
                  {isTop && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-400 whitespace-nowrap">${val}k</span>
                  )}
                </motion.div>
              </div>
              <span className="text-[9px] text-slate-500">{months[i]}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 border-t border-slate-800/60 pt-4 text-center">
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Peak Month</span><span className="text-base font-bold text-emerald-400">${maxRev}k</span></div>
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Avg Order</span><span className="text-base font-bold text-white">$284</span></div>
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Conversion</span><span className="text-base font-bold text-violet-400">4.7%</span></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHART 3  Mosaic Architecture — Core Web Vitals Progress Bars
// ─────────────────────────────────────────────────────────────────────────────
function MosaicChart() {
  const [metrics, setMetrics] = useState([
    { label: "LCP",  val: 1.2,  max: 4,    color: "#34d399", unit: "s" },
    { label: "FID",  val: 8,    max: 100,  color: "#818cf8", unit: "ms" },
    { label: "CLS",  val: 0.04, max: 0.25, color: "#f59e0b", unit: "" },
    { label: "FCP",  val: 0.9,  max: 3,    color: "#38bdf8", unit: "s" },
    { label: "TTFB", val: 180,  max: 600,  color: "#e879f9", unit: "ms" },
  ]);
  const [lighthouseScore, setLighthouseScore] = useState(98);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          let nextVal = m.val;
          if (m.label === "LCP") {
            nextVal = Math.max(0.8, Math.min(3.0, Number((m.val + (Math.random() - 0.5) * 0.15).toFixed(2))));
          } else if (m.label === "FID") {
            nextVal = Math.max(2, Math.min(30, Math.round(m.val + (Math.random() - 0.5) * 3)));
          } else if (m.label === "CLS") {
            nextVal = Math.max(0.01, Math.min(0.12, Number((m.val + (Math.random() - 0.5) * 0.008).toFixed(3))));
          } else if (m.label === "FCP") {
            nextVal = Math.max(0.5, Math.min(2.0, Number((m.val + (Math.random() - 0.5) * 0.08).toFixed(2))));
          } else if (m.label === "TTFB") {
            nextVal = Math.max(120, Math.min(260, Math.round(m.val + (Math.random() - 0.5) * 15)));
          }
          return { ...m, val: nextVal };
        })
      );
      setLighthouseScore((prev) => Math.max(96, Math.min(100, Math.round(prev + (Math.random() - 0.5) * 2))));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={ref} className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Core Web Vitals Score</h4>
          <p className="text-xs text-slate-500">Performance metrics for cinematic scroll site</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          <span className="text-xs font-semibold text-amber-400">LIVE VITALS</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {metrics.map((m, i) => (
          <div key={m.label} className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-300 w-10 shrink-0">{m.label}</span>
            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: m.color, boxShadow: `0 0 10px ${m.color}60` }}
                initial={{ width: 0 }}
                animate={{ width: animated ? `${(m.val / m.max) * 100}%` : 0 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-bold w-14 text-right shrink-0" style={{ color: m.color }}>
              {m.val}{m.unit}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 border-t border-slate-800/60 pt-4 text-center">
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Page Load</span><span className="text-base font-bold text-emerald-400">0.9s</span></div>
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Bundle Size</span><span className="text-base font-bold text-white">48kb</span></div>
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Lighthouse</span><span className="text-base font-bold text-amber-400">{lighthouseScore}/100</span></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHART 4  Nexus Attendance — Real-time Biometric Check-in Feed
// ─────────────────────────────────────────────────────────────────────────────
function NexusChart() {
  const [dataPoints, setDataPoints] = useState<number[]>([40, 55, 48, 65, 50, 72, 60, 80, 75, 95]);

  useEffect(() => {
    const id = setInterval(() => {
      setDataPoints((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.max(30, Math.min(100, Math.round(last + (Math.random() - 0.5) * 25)));
        return [...prev.slice(1), next];
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const W = 600, H = 200, P = 20;
  const pts = dataPoints.map((v, i) => ({
    x: P + (i * (W - P * 2)) / (dataPoints.length - 1),
    y: H - P - (v * (H - P * 2)) / 100,
  }));
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${H - P} L ${pts[0].x} ${H - P} Z`;

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Live Check-in Frequency (API logs)</h4>
          <p className="text-xs text-slate-500">Real-time biometric detection hits per minute</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
          <span className="text-xs font-semibold text-cyan-400">LIVE FEED</span>
        </div>
      </div>

      <div className="relative h-[200px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible">
          <defs>
            <filter id="nx-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="nx-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5c62ec" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nx-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5c62ec" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <line x1={P} y1={H / 2} x2={W - P} y2={H / 2} stroke="#1e293b" strokeDasharray="4 4" />
          <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#1e293b" />
          <motion.path d={areaD} fill="url(#nx-area)" animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
          <motion.path d={pathD} fill="none" stroke="url(#nx-stroke)" strokeWidth="3" filter="url(#nx-glow)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" className="fill-cyan-400 stroke-slate-950 stroke-2" />
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 border-t border-slate-800/60 pt-4 text-center">
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Peak Rate</span><span className="text-base font-bold text-white">{Math.max(...dataPoints)}/min</span></div>
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Mean Latency</span><span className="text-base font-bold text-cyan-400">284ms</span></div>
        <div><span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Data Packets</span><span className="text-base font-bold text-purple-400">2,416/hr</span></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHART ROUTER + TITLE MAP
// ─────────────────────────────────────────────────────────────────────────────
function ProjectChart({ id }: { id: string }) {
  if (id === "proj-1") return <StellarChart />;
  if (id === "proj-2") return <AuraChart />;
  if (id === "proj-4") return <MosaicChart />;
  if (id === "proj-6") return <NexusChart />;
  return null;
}

const chartTitles: Record<string, string> = {
  "proj-1": "Live Analytics Engine",
  "proj-2": "Revenue Performance Dashboard",
  "proj-4": "Core Web Vitals Monitor",
  "proj-6": "Integrated Biometric Data Engine",
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectPage() {
  const { id } = useParams() as { id: string };

  const getLocalProject = (pid: string) =>
    localProjects.find(
      (p) => p.id === pid || p.id.replace("proj-", "") === pid.replace("proj-", "")
    );

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const local = getLocalProject(id);
    if (local) {
      setProject(local);
      setLoading(false);
    } else {
      setLoading(true);
    }

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const result = await res.json();
        if (result.success && result.data) {
          setProject((prev: any) => ({
            ...prev,
            ...result.data,
            challenge: result.data.challenge || prev?.challenge,
            solution:  result.data.solution  || prev?.solution,
            features:  result.data.features?.length ? result.data.features : prev?.features,
          }));
        }
      } catch (err) {
        console.warn("MongoDB unavailable, using local fallback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-400 font-medium">Loading project details...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="text-sm text-slate-400 mb-6 max-w-sm">
          We couldn&apos;t find the project you were looking for. It may have been removed.
        </p>
        <Link href="/" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-semibold transition-all">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const hasChart = chartTitles.hasOwnProperty(project.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Back */}
        <Link href="/" className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Hero Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-[#5c62ec] uppercase">{project.category}</span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-xs font-semibold text-[#9ca3af] rounded-full">{project.year}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h1>
          <p className="text-lg text-slate-400 leading-relaxed font-light">{project.description}</p>
        </div>

        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#1a233a] mb-12 bg-slate-900">
          <Image
            src={project.image || project.imageUrl || "/nexus_attendance_thumbnail.png"}
            alt={`${project.title} detailed preview`}
            fill
            className="object-cover"
          />
        </div>

        {/* Graph — unique per project */}
        {hasChart && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <h3 className="text-lg font-bold text-white mb-4">{chartTitles[project.id]}</h3>
            <ProjectChart id={project.id} />
          </motion.div>
        )}

        {/* Case Study */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800 pt-12">

          {/* Sidebar */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <span key={tag} className="text-xs bg-[#1a233a]/40 text-[#d1d5db] px-3 py-1.5 rounded-full border border-[#1a233a]">{tag}</span>
                ))}
              </div>
            </div>
            {(project.liveUrl || project.githubUrl) && (
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Links</h3>
                <div className="flex flex-col gap-2">
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:underline">Live Preview \u2192</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:underline">View Codebase \u2192</a>}
                </div>
              </div>
            )}
          </div>

          {/* Main Details */}
          <div className="flex flex-col gap-8 md:col-span-2">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">The Challenge</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {project.challenge || "Building high-performance modules and state synchronizations that operate within strict constraints, ensuring high availability and rendering speeds."}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">The Solution</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {project.solution || "We designed a robust caching architecture backed by modern framework controls, offloading latency-heavy calculations to async cycles and streamlining DOM paints."}
              </p>
            </div>
            {project.features?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  {project.features.map((feat: string, i: number) => (
                    <li key={i} className="text-sm text-slate-400 leading-relaxed">{feat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
