"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socialLinks = [
  {
    id: "social-github",
    label: "GitHub",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "social-twitter",
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "social-linkedin",
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "social-dribbble",
    label: "Dribbble",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4.006-.814zm-9.492-9.18c.176-.5.9-2.96 3.07-4.26 2.17-1.3 4.51-1.098 4.77-1.078a14.8 14.8 0 0 1 1.388 3.44c-1.916 1.01-3.985 1.45-6.005 1.45-1.126 0-2.252-.152-3.222-.553zm-1.41 1.43c.132.94 2.286 4.92 6.264 3.36 1.038-.4 1.99-.942 2.858-1.63-.57-1.438-.985-2.527-1.36-3.4a19.3 19.3 0 0 1-3.202.56c-1.59 0-3.18-.398-4.56-.89zM12 2c-3.07 0-5.893 1.16-8.013 3.063 0 .035 2.065 4.36 6.994 5.617 1.196-2.47 1.95-4.62 2.192-5.57C13.097 5.04 12.546 5 12 5V2.003A10 10 0 0 1 22 12c0 .35-.018.696-.052 1.037-.34-.11-.7-.204-1.07-.28-3.43-.7-6.8-.17-6.97-.14L14 12.6c.59-3.615 2.72-6.43 5.72-8.18A9.955 9.955 0 0 0 12 2z" />
      </svg>
    ),
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (data.success) {
        setFormState("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setFormState("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setFormState("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden" ref={ref}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Contact CTA section */}
      <div className="section-padding pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden p-10 md:p-16"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, rgba(2,6,23,0.8) 70%)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-6 text-center"
            >
              Let&apos;s Collaborate
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-center"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Have a project in mind?
              <br />
              <span className="gradient-text italic">Let&apos;s talk.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-slate-400 text-lg mb-10 max-w-xl mx-auto text-center"
            >
              I&apos;m currently available for freelance and full-time
              opportunities. Fill the form below and I&apos;ll get back within 24 hours.
            </motion.p>

            {/* Full contact form */}
            <motion.form
              id="contact-form"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto flex flex-col gap-4"
            >
              {formState === "success" ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-emerald-400 font-semibold text-lg">Message sent successfully!</p>
                  <p className="text-slate-400 text-sm">Thanks for reaching out — I&apos;ll be in touch soon.</p>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm underline underline-offset-2 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-xs text-slate-400 font-medium tracking-wide">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Akshath CH"
                        required
                        disabled={formState === "loading"}
                        className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:outline-none text-slate-200 placeholder-slate-600 text-sm transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-xs text-slate-400 font-medium tracking-wide">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        disabled={formState === "loading"}
                        className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:outline-none text-slate-200 placeholder-slate-600 text-sm transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs text-slate-400 font-medium tracking-wide">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project, timeline, and budget..."
                      required
                      rows={5}
                      disabled={formState === "loading"}
                      className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:outline-none text-slate-200 placeholder-slate-600 text-sm transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  {formState === "error" && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errorMsg}
                    </div>
                  )}

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
                  >
                    {formState === "loading" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </>
              )}
            </motion.form>

            {/* Direct email */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 text-sm text-slate-500 text-center"
            >
              Or reach me directly at{" "}
              <a
                href="mailto:hello@akshathch.dev"
                className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
              >
                hello@akshathch.dev
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-bold">
              <span className="gradient-text font-[var(--font-playfair)] italic">AKSHATH</span>
              <span className="text-slate-500 text-sm ml-2 font-light tracking-widest uppercase">
                PORTFOLIO
              </span>
            </p>
            <p className="text-slate-600 text-xs mt-1">
              © {new Date().getFullYear()} Akshath CH. All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.id}
                id={link.id}
                href={link.href}
                aria-label={link.label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full glass border border-slate-700/60 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors duration-300"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-slate-600 text-xs text-center md:text-right">
            Built with Next.js, Tailwind CSS &{" "}
            <span className="text-indigo-500">♥</span> Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
