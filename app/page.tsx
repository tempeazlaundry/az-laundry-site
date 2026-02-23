"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Phone,
  MessageCircle,
  Play,
  ChevronDown,
  Package,
  DoorOpen,
  Clock,
  ShieldCheck,
  Star,
  Lock,
  Tag,
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

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Do you pick up from dorms?",
    a: "Yes — any dorm, apartment, or complex near ASU. Just leave your bag outside your door. No need to be home.",
  },
  {
    q: "How do I pay?",
    a: <>Securely online via Stripe — Apple Pay, Google Pay, Visa, and Mastercard all accepted. First order? Use code <strong style={{ color: "#FFC627", fontWeight: 800 }}>FIRST50</strong> at checkout for 50% off.</>,
  },
  {
    q: "What's the turnaround time?",
    a: "48 hours standard. Drop off Monday, back Wednesday. You'll get a confirmation after booking.",
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
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, ease: "easeOut", delay }}
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

// ── Header ────────────────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-maroon px-5 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
          <Image
            src="/logo-full.png"
            alt="AZ Laundry Service"
            width={120}
            height={80}
            className="object-contain"
            priority
          />
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white px-5 pt-36 pb-16 text-center border-b border-gray-100">
      <div className="max-w-sm mx-auto md:max-w-3xl flex flex-col items-center gap-6">
        {/* Headline */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="text-[clamp(2.25rem,7vw,3rem)] md:text-[2.75rem] font-extrabold leading-[1.1] tracking-tight md:whitespace-nowrap"
        >
          <span className="text-dark">Laundry Sucks. </span>
          <span className="text-maroon">We Do It For You.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
          className="text-[#777777] text-base font-normal leading-relaxed"
        >
          Pickup &amp; delivery for ASU students
          <br />
          starting at $15/bag
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.38 }}
          className="w-full"
        >
          <motion.button
            onClick={scrollToPricing}
            whileTap={reduceMotion ? {} : { scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="w-full bg-gold hover:bg-gold-dark text-dark rounded-xl py-4 px-6 flex flex-col items-center gap-0.5 shadow-md cursor-pointer transition-colors cta-glow-pulse"
          >
            <span className="font-black text-lg leading-tight">Schedule Pickup</span>
            <span className="text-dark/60 text-sm font-normal">50% Off First Order</span>
          </motion.button>
        </motion.div>

        {/* Have Questions? */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? false : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.56 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-[0.18em]">
            Have Questions?
          </p>
          <div className="flex gap-3">
            <a
              href={PHONE_TEL}
              className="flex items-center gap-1.5 border border-gray-200 rounded-full px-5 py-2 text-sm font-semibold text-dark hover:border-maroon hover:text-maroon transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 flex-none" aria-hidden />
              Call
            </a>
            <a
              href={PHONE_SMS}
              className="flex items-center gap-1.5 border border-gray-200 rounded-full px-5 py-2 text-sm font-semibold text-dark hover:border-maroon hover:text-maroon transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 flex-none" aria-hidden />
              Text
            </a>
          </div>
          {/* FIRST50 callout */}
          <div className="flex items-center gap-1.5 rounded-full px-4 py-1.5 bg-gold text-dark">
            <Tag className="w-3 h-3 flex-none" aria-hidden />
            <p className="text-[11px] font-bold">
              Use code <strong className="font-black">FIRST50</strong> — 50% off first order
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      Icon: Package,
      title: "Pick your bag size",
      body: "Choose between Small, Medium, or Large. Stuff it full.",
    },
    {
      Icon: DoorOpen,
      title: "We pick up",
      body: "We grab it directly from your dorm or apartment door.",
    },
    {
      Icon: Clock,
      title: "Delivered clean in 48hrs",
      body: "Folded, fresh, and back at your door in 2 days.",
    },
  ];

  return (
    <section className="bg-white px-5 py-16">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-bold text-dark mb-6 leading-[1.2]">
            How It Works
          </h2>
        </FadeUp>
        <div className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 shadow-sm bg-white">
                {/* Number circle */}
                <div className="flex-none w-10 h-10 rounded-full bg-maroon flex items-center justify-center shadow-sm">
                  <span className="text-white font-black text-base leading-none">{i + 1}</span>
                </div>
                <div className="flex flex-col gap-1 pt-0.5">
                  <h3 className="font-bold text-dark text-[15px] leading-snug">{step.title}</h3>
                  <p className="text-[#777777] text-sm font-normal leading-relaxed">{step.body}</p>
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
      description: "~1 load of laundry",
      price: "$15",
      featured: false,
      link: STRIPE_LINKS.small,
      buttonLabel: "Book Small Bag",
      buttonIcon: "→",
      buttonClass: "bg-[#1C1C1C] hover:bg-[#2e2e2e] text-white",
    },
    {
      name: "Medium Bag",
      description: "~2–3 loads. Perfect for weekly.",
      price: "$30",
      featured: true,
      link: STRIPE_LINKS.medium,
      buttonLabel: "Book Medium Bag",
      buttonIcon: "→",
      buttonClass: "bg-gold hover:bg-gold-dark text-dark",
    },
    {
      name: "Large Bag",
      description: "~4+ loads. Heavy duty.",
      price: "$45",
      featured: false,
      link: STRIPE_LINKS.large,
      buttonLabel: "Book Large Bag",
      buttonIcon: "→",
      buttonClass: "bg-[#1C1C1C] hover:bg-[#2e2e2e] text-white",
    },
  ];

  return (
    <section id="pricing" className="bg-off-white px-5 py-16 scroll-mt-14 border-t border-gray-100">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-bold text-dark mb-1 leading-[1.2]">
            Select a Bag
          </h2>
          <p className="text-[#777777] text-sm font-normal mb-8">
            Instant booking via Stripe.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-4">
          {bags.map((bag, i) => (
            <FadeUp key={bag.name} delay={i * 0.1}>
              <motion.div
                whileHover={reduceMotion ? {} : { y: -3, transition: { duration: 0.18 } }}
                className={`relative rounded-2xl overflow-hidden bg-white transition-shadow duration-300 ${
                  bag.featured
                    ? "border-2 border-gold shadow-[0_4px_28px_rgba(255,198,39,0.22)] gold-pulse-card"
                    : "border border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Most Popular banner */}
                {bag.featured && (
                  <div className="bg-gold text-dark text-[10px] font-black text-center py-2 tracking-[0.2em] uppercase">
                    Most Popular Choice
                  </div>
                )}

                <div className="p-5 flex flex-col gap-4">
                  {/* Name + Price row */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3
                        className={`text-[17px] font-bold leading-tight ${
                          bag.featured ? "text-maroon" : "text-dark"
                        }`}
                      >
                        {bag.name}
                      </h3>
                      <p className="text-[#999999] text-sm font-normal mt-0.5">
                        {bag.description}
                      </p>
                    </div>
                    <div className="text-right flex-none">
                      <span
                        className={`text-3xl font-black leading-none ${
                          bag.featured ? "text-maroon" : "text-dark"
                        }`}
                      >
                        {bag.price}
                      </span>
                      <p className="text-[#AAAAAA] text-[9px] font-bold uppercase tracking-[0.15em] mt-0.5">
                        Flat Rate
                      </p>
                    </div>
                  </div>

                  {/* FIRST50 pill */}
                  <div className="rounded-md py-1 px-3 text-center bg-gold">
                    <span className="text-[12px] font-bold text-dark">
                      Use code: <strong className="font-black">FIRST50</strong> for 50% off →
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href={bag.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduceMotion ? {} : { scale: 1.02 }}
                    whileTap={reduceMotion ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className={`w-full flex items-center justify-center gap-2 font-black text-[15px] rounded-xl h-12 cursor-pointer transition-colors ${bag.buttonClass}`}
                  >
                    {bag.buttonLabel}{" "}
                    <span className="ml-0.5">{bag.buttonIcon}</span>
                  </motion.a>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Sizing hint */}
        <FadeUp delay={0.32}>
          <div className="mt-8 text-center">
            <p className="text-sm text-[#777777] mb-1">Questions? Call or text us:</p>
            <a
              href={PHONE_TEL}
              className="text-maroon font-black text-lg hover:underline cursor-pointer"
            >
              {PHONE_DISPLAY}
            </a>
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
    { caption: "Dorm life hack 🧺" },
    { caption: "No more laundry room" },
    { caption: "Exam week lifesaver" },
  ];
  const trustBadges = [
    { Icon: ShieldCheck, label: "Insured" },
    { Icon: Lock,        label: "Secure" },
    { Icon: Star,        label: "5.0 Stars" },
  ];

  return (
    <section className="bg-white px-5 py-16 border-t border-gray-100">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-bold text-dark mb-1 leading-[1.2]">
            Students Love Us
          </h2>
          <p className="text-[#777777] text-sm font-normal mb-8">
            See why ASU students are ditching the laundromat.
          </p>
        </FadeUp>

        {/* TikTok-style cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {videos.map((v, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                whileHover={reduceMotion ? {} : { opacity: 0.82, transition: { duration: 0.18 } }}
                className="flex-none w-36 aspect-[9/16] bg-gray-900 rounded-xl relative overflow-hidden snap-center shadow-lg cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white ml-0.5" aria-label="Play video" fill="white" />
                  </div>
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

        {/* Trust badges */}
        <FadeUp delay={0.2}>
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="shimmer-strip flex items-center justify-center gap-8">
              {trustBadges.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[#666666]">
                  <Icon className="w-4 h-4 text-maroon flex-none" aria-hidden />
                  <span className="text-xs font-bold uppercase tracking-[0.12em]">{label}</span>
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
    <section className="bg-off-white px-5 py-16 border-t border-gray-100">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-bold text-dark mb-8 leading-[1.2]">
            Quick Answers
          </h2>
        </FadeUp>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeUp key={i} delay={i * 0.04}>
                <div
                  className={`bg-white rounded-xl border transition-colors duration-200 overflow-hidden ${
                    isOpen ? "border-gold/60" : "border-gray-100"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-[15px] text-dark leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`flex-none w-5 h-5 text-[#AAAAAA] transition-transform duration-300 ${
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
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-[#666666] font-normal leading-relaxed">
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
    <footer className="bg-footer text-white px-5 pt-12 pb-8 border-t border-white/5">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-5 text-center">
        {/* Logo */}
        <Image
          src="/logo-full.png"
          alt="AZ Laundry Service"
          width={240}
          height={160}
          className="object-contain"
        />

        {/* Tagline */}
        <p className="text-gray-400 text-sm font-normal leading-relaxed max-w-[260px]">
          Making student life easier, one load at a time. Proudly serving students in Tempe &amp; Scottsdale, AZ.
        </p>

        {/* Social icons */}
        <div className="flex gap-3">
          {/* TikTok */}
          <a
            href="https://tiktok.com/@AZLaundryService"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden>
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com/AZLaundryService"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        {/* Divider + legal */}
        <div className="w-full border-t border-white/10 pt-5 flex flex-col gap-2">
          <p className="text-xs text-gray-500">© 2026 AZ Laundry Service. All rights reserved.</p>
          <div className="flex items-center justify-center gap-5">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer">
              Privacy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer">
              Terms
            </a>
          </div>
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
            className="w-full bg-gold hover:bg-gold-dark text-dark font-black text-sm h-14 shadow-[0_-4px_16px_rgba(0,0,0,0.18)] tracking-[0.1em] uppercase cursor-pointer transition-colors"
          >
            50% Off Your First Pickup →
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
