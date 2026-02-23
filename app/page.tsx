"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Phone,
  MessageCircle,
  Check,
  Play,
  ChevronDown,
  Package,
  DoorOpen,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────
const STRIPE_LINKS = {
  small:  "https://buy.stripe.com/9B6aEQ9Pj3mzfUKere6Vq01",
  medium: "https://buy.stripe.com/dRm8wIgdH9KXdMC2Iw6Vq02",
  large:  "https://buy.stripe.com/aFacMY3qVaP1fUKere6Vq03",
};

const PHONE_TEL     = "tel:+14809459939";
const PHONE_SMS     = "sms:+14809459939";
const PHONE_DISPLAY = "(480) 945-9939";

const faqs = [
  {
    q: "Do you pick up from dorms?",
    a: "Yes — any dorm, apartment, or complex near ASU. Just leave your bag outside your door. No need to be home.",
  },
  {
    q: "What's the turnaround time?",
    a: "48 hours standard. Drop off Monday, back Wednesday. You'll get a confirmation after booking.",
  },
  {
    q: "How do I pay?",
    a: "Securely online via Stripe — Apple Pay, Google Pay, Visa, and Mastercard all accepted. First order? Use code FIRST50 at checkout for 50% off.",
  },
  {
    q: "Which bag size should I pick?",
    a: "A typical full hamper is about 15–20 lbs — most students go Medium. Not sure? Text us at (480) 945-9939 and we'll help.",
  },
  {
    q: "What happens to my clothes?",
    a: "Professionally washed and folded at our facility. Have preferences like fragrance-free or cold wash? Add a note in Special Instructions at Stripe checkout.",
  },
  {
    q: "Is there a contract?",
    a: "Nope. No subscription, no commitment. Order whenever you need it.",
  },
];

function scrollToPricing() {
  const el = document.getElementById("pricing");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── FadeUp ────────────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Scroll Progress Bar ───────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-[#8C1D40] to-[#FFC627]"
      aria-hidden
    />
  );
}

// ── Header (floating) ─────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-4 inset-x-4 z-40">
      <div className="max-w-6xl mx-auto">
        <header
          className={`bg-maroon rounded-2xl px-5 py-3.5 transition-shadow duration-300 ${
            scrolled ? "shadow-2xl" : "shadow-lg"
          }`}
        >
          <div className="flex items-center justify-center gap-2.5">
            <Image
              src="/logo.png"
              alt="AZ Laundry Service"
              width={28}
              height={28}
              className="object-contain brightness-0 invert"
              priority
            />
            <span className="text-white font-black text-sm tracking-tight uppercase">
              AZ Laundry Service
            </span>
          </div>
        </header>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={heroRef}
      className="relative bg-maroon overflow-hidden px-5 pt-36 pb-24 text-center"
    >
      {/* Parallax decorative element — desktop only, creates depth */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-[#5C132A]/40 hidden md:block pointer-events-none"
        style={!reduceMotion && isDesktop ? { y: bgY, willChange: "transform" } : {}}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-1/3 -left-1/4 w-2/3 h-2/3 rounded-full bg-[#5C132A]/25 hidden md:block pointer-events-none"
        style={!reduceMotion && isDesktop ? { y: bgY, willChange: "transform" } : {}}
        aria-hidden
      />

      <div className="relative max-w-xl mx-auto flex flex-col items-center gap-8">
        {/* Headline */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-[clamp(2.25rem,9vw,3.75rem)] font-extrabold text-white leading-[1.2] tracking-tight"
        >
          Laundry Done.
          <br />
          <span className="text-gold">Life Lived.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-white/80 text-xl font-semibold leading-relaxed max-w-sm mx-auto"
        >
          Pickup &amp; delivery for ASU students.
          <br />
          Starting at $15/bag.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          className="w-full max-w-sm"
        >
          <motion.button
            onClick={scrollToPricing}
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            whileTap={reduceMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="cta-glow-pulse w-full bg-gold hover:bg-gold-dark text-dark font-black text-lg rounded-xl py-4 min-h-[44px] shadow-lg cursor-pointer"
          >
            Schedule Pickup — 50% Off First Order →
          </motion.button>
        </motion.div>

        {/* Call / Text links */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? false : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href={PHONE_TEL}
            className="flex items-center gap-2 text-white/90 hover:text-gold text-base font-semibold transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 flex-none" aria-hidden />
            <span>Call us: {PHONE_DISPLAY}</span>
          </a>
          <span className="text-white/30 hidden sm:block" aria-hidden>|</span>
          <a
            href={PHONE_SMS}
            className="flex items-center gap-2 text-white/90 hover:text-gold text-base font-semibold transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 flex-none" aria-hidden />
            <span>Text us: {PHONE_DISPLAY}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const steps = [
    {
      Icon: Package,
      title: "Pick your bag size",
      body: "Small $15, Medium $30, or Large $45. Stuff it full.",
    },
    {
      Icon: DoorOpen,
      title: "Leave it at your door",
      body: "No need to be home. We grab it.",
    },
    {
      Icon: Clock,
      title: "Back in 48 hours",
      body: "Clean, folded, delivered back to your door.",
    },
  ];

  return (
    <section className="bg-white px-5 py-20">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.625rem,5vw,2rem)] font-bold text-dark mb-8 leading-[1.2]">
            How It Works
          </h2>
        </FadeUp>
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="flex items-start gap-5 p-5 rounded-xl border border-gray-100 shadow-sm bg-white">
                <div className="flex-none w-11 h-11 rounded-full bg-gold/20 flex items-center justify-center">
                  <motion.div
                    initial={reduceMotion ? undefined : { scale: 0.5 }}
                    whileInView={reduceMotion ? undefined : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    viewport={{ once: true }}
                  >
                    <step.Icon className="w-5 h-5 text-maroon" aria-hidden />
                  </motion.div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-maroon font-black text-xl leading-none">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-dark text-base leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#666666] text-base font-normal leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing() {
  const reduceMotion = useReducedMotion();
  const bags = [
    {
      name: "Small Bag",
      weight: "~10 lbs",
      price: "$15",
      badge: "50% OFF FIRST ORDER",
      badgeStyle: "bg-gold text-dark",
      featured: false,
      features: ["Up to 10 lbs", "Free delivery", "No commitment"],
      link: STRIPE_LINKS.small,
    },
    {
      name: "Medium Bag",
      weight: "~20 lbs",
      price: "$30",
      badge: "MOST POPULAR",
      badgeStyle: "bg-maroon text-white",
      featured: true,
      features: ["Up to 20 lbs", "Free delivery", "No commitment"],
      link: STRIPE_LINKS.medium,
    },
    {
      name: "Large Bag",
      weight: "~30 lbs",
      price: "$45",
      badge: null,
      badgeStyle: "",
      featured: false,
      features: ["Up to 30 lbs", "Free delivery", "No commitment"],
      link: STRIPE_LINKS.large,
    },
  ];

  return (
    <section id="pricing" className="bg-off-white px-5 py-20 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.625rem,5vw,2rem)] font-bold text-dark mb-1 leading-[1.2]">
            Simple, Flat Pricing
          </h2>
          <p className="text-[#666666] text-base font-normal leading-relaxed mb-10">
            No contracts. No commitments. 50% off your first order.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {bags.map((bag, i) => (
            <FadeUp key={bag.name} delay={i * 0.1} className="flex flex-col">
              <motion.div
                whileHover={reduceMotion ? {} : { y: -8, transition: { duration: 0.2 } }}
                className={`relative rounded-[12px] overflow-hidden flex flex-col flex-grow cursor-pointer transition-shadow duration-300 ${
                  bag.featured
                    ? "border-2 border-maroon gold-pulse-card"
                    : "border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.13)]"
                }`}
              >
                {/* Top banner (or invisible spacer for equal height) */}
                {bag.featured ? (
                  <div className="bg-maroon text-white text-xs font-semibold text-center py-2.5 tracking-widest uppercase">
                    ⭐ Most Popular
                  </div>
                ) : (
                  <div className="py-2.5 opacity-0 select-none text-xs" aria-hidden>
                    &nbsp;
                  </div>
                )}

                <div className="p-8 flex flex-col gap-5 flex-grow bg-white">
                  {/* Badge */}
                  {bag.badge && !bag.featured && (
                    <span
                      className={`inline-block self-start text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${bag.badgeStyle}`}
                    >
                      {bag.badge}
                    </span>
                  )}

                  {/* Name + Price */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className={`text-xl font-bold leading-tight ${
                          bag.featured ? "text-maroon" : "text-dark"
                        }`}
                      >
                        {bag.name}
                      </h3>
                      <p className="text-[#999999] text-sm font-normal mt-0.5">
                        {bag.weight}
                      </p>
                    </div>
                    <div className="text-right flex-none">
                      <span
                        className={`text-3xl font-bold ${
                          bag.featured ? "text-maroon" : "text-dark"
                        }`}
                      >
                        {bag.price}
                      </span>
                      <p className="text-[#999999] text-[11px] font-semibold uppercase tracking-wide">
                        / pickup
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 flex-grow">
                    {bag.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-base font-normal text-[#666666] leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-gold flex-none" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href={bag.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduceMotion ? {} : { scale: 1.04 }}
                    whileTap={reduceMotion ? {} : { scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="group mt-auto w-full flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-dark text-dark font-black text-base rounded-xl h-12 shadow-sm cursor-pointer transition-colors"
                  >
                    <span>Order Now</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </motion.a>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Sizing note */}
        <FadeUp delay={0.3}>
          <div className="mt-10 text-center space-y-2">
            <p className="text-base text-[#666666] font-normal leading-relaxed max-w-2xl mx-auto">
              Not sure which size? A typical hamper = about 15–20 lbs. When in doubt, go Medium.
            </p>
            <p className="text-base font-semibold text-dark">
              Questions?{" "}
              <a
                href={PHONE_TEL}
                className="text-maroon hover:underline cursor-pointer inline-flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 flex-none" aria-hidden />
                Call or text us: {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Social Proof ──────────────────────────────────────────────────────────────
function SocialProof() {
  const reduceMotion = useReducedMotion();
  const videos = [
    { caption: "Dorm life hack" },
    { caption: "No more laundry room" },
    { caption: "Exam week lifesaver" },
  ];
  const trustBadges = [
    { Icon: ShieldCheck, label: "Licensed & Insured" },
    { Icon: Star,        label: "Professional" },
    { Icon: Clock,       label: "48-Hr Turnaround" },
    { Icon: MapPin,      label: "Tempe, AZ" },
  ];

  return (
    <section className="bg-white px-5 py-20">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.625rem,5vw,2rem)] font-bold text-dark mb-1 leading-[1.2]">
            What Students Are Saying
          </h2>
          <p className="text-[#666666] text-base font-normal leading-relaxed mb-8">
            See why ASU students are ditching the laundromat.
          </p>
        </FadeUp>

        {/* TikTok-style cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {videos.map((v, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <motion.div
                whileHover={reduceMotion ? {} : { scale: 1.03, transition: { duration: 0.2 } }}
                className="flex-none w-36 aspect-[9/16] bg-gray-900 rounded-xl relative overflow-hidden snap-center shadow-lg cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0.7 }}
                    whileHover={reduceMotion ? {} : { opacity: 1 }}
                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
                  >
                    <Play
                      className="w-6 h-6 text-white ml-0.5"
                      aria-label="Play video"
                      fill="white"
                    />
                  </motion.div>
                </div>
                <div className="absolute bottom-3 left-3 z-10">
                  <p className="text-white text-[10px] font-semibold opacity-80 mb-0.5">
                    @AZLaundryService
                  </p>
                  <p className="text-white text-[11px] font-bold leading-tight">{v.caption}</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Trust badge strip */}
        <FadeUp delay={0.2}>
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="shimmer-strip flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {trustBadges.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[#666666]">
                  <Icon className="w-4 h-4 text-maroon flex-none" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-off-white px-5 py-20">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.625rem,5vw,2rem)] font-bold text-dark mb-8 leading-[1.2]">
            Quick Answers
          </h2>
        </FadeUp>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeUp key={i} delay={i * 0.05}>
                <div
                  className={`relative bg-white rounded-xl shadow-sm overflow-hidden border transition-colors duration-200 ${
                    isOpen ? "border-gold/50" : "border-gray-100"
                  }`}
                >
                  {/* Left accent bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                    aria-hidden
                  />
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-base text-dark leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`flex-none w-5 h-5 text-[#666666] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-base text-[#666666] font-normal leading-relaxed max-w-2xl">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-footer text-white px-5 pt-14 pb-8">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AZ Laundry Service"
            width={44}
            height={44}
            className="object-contain"
          />
          <span className="text-white font-black text-xl tracking-tight">
            AZ Laundry Service
          </span>
        </div>

        {/* Phone — large + prominent */}
        <div className="flex flex-col items-center gap-2">
          <a
            href={PHONE_TEL}
            className="flex items-center gap-2.5 text-gold font-black text-3xl hover:underline cursor-pointer"
          >
            <Phone className="w-7 h-7 flex-none" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_SMS}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gold text-base font-semibold transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 flex-none" aria-hidden />
            Text us
          </a>
        </div>

        <p className="text-gray-400 text-base font-normal">
          Tempe &amp; Scottsdale, AZ
        </p>

        <p className="text-sm text-gray-400 font-semibold">
          @AZLaundryService on{" "}
          <span className="text-white">Instagram</span> &amp;{" "}
          <span className="text-white">TikTok</span>
        </p>

        <div className="w-full border-t border-white/10 pt-5 text-xs text-gray-500">
          <p>© 2026 AZ Laundry Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ── Sticky Bottom CTA ─────────────────────────────────────────────────────────
function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <motion.button
            onClick={scrollToPricing}
            whileTap={reduceMotion ? {} : { scale: 0.97 }}
            className="w-full bg-gold hover:bg-gold-dark text-dark font-black text-base h-14 shadow-[0_-4px_12px_rgba(0,0,0,0.15)] tracking-tight cursor-pointer transition-colors"
          >
            50% Off Your First Pickup → Order Now
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Pricing />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
