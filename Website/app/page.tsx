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
  ChevronDown,
  Package,
  CalendarCheck,
  Truck,
  Sparkles,
} from "lucide-react";

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
    a: "Securely online by clicking Place an Order. Your order will be fulfilled by our Corporate Division GinnysLaundry.com.",
  },
  {
    q: "What's the turnaround time?",
    a: "48 hours standard. Drop off Monday, back Wednesday. You'll get a confirmation after booking.",
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
          className="text-[clamp(1.75rem,6vw,2.5rem)] md:text-[2.5rem] font-extrabold leading-[1.15] tracking-tight"
        >
          <span className="text-maroon">Fresh, clean laundry delivered straight to your door.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
          className="text-[#777777] text-base font-normal leading-relaxed"
        >
          <p>Pickup &amp; delivery laundry service for ASU students. We wash, fold &amp; deliver back within 48 hours.</p>
        </motion.div>

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
        </motion.div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      Icon: CalendarCheck,
      title: "Schedule a Pickup",
      body: "Pick a day and time that works for you. We'll come right to your door.",
      bg: "bg-gradient-to-br from-maroon to-[#6b1530]",
    },
    {
      Icon: Truck,
      title: "We Pick Up & Wash",
      body: "Our team grabs your laundry, washes and folds everything with care at our facility.",
      bg: "bg-gradient-to-br from-gold to-[#e6b020]",
    },
    {
      Icon: Sparkles,
      title: "Fresh Delivery",
      body: "Clean, folded clothes delivered back to your door within 48 hours.",
      bg: "bg-gradient-to-br from-maroon to-[#6b1530]",
    },
  ];

  return (
    <section className="bg-white px-5 py-16">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-bold text-dark mb-2 leading-[1.2]">
            How It All Works
          </h2>
          <p className="text-[#777777] text-sm font-normal mb-8">
            Three simple steps. That&apos;s it.
          </p>
        </FadeUp>
        <div className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
                {/* Image-style branded block */}
                <div className={`${step.bg} px-6 py-10 flex flex-col items-center gap-3 text-center`}>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <step.Icon className={`w-8 h-8 ${i === 1 ? "text-dark" : "text-white"}`} strokeWidth={2} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <span className="text-maroon font-black text-sm leading-none">{i + 1}</span>
                  </div>
                </div>
                {/* Text content */}
                <div className="bg-white px-5 py-5">
                  <h3 className="font-bold text-dark text-base leading-snug mb-1">{step.title}</h3>
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

// ── Bag Info ──────────────────────────────────────────────────────────────────
function BagInfo() {
  return (
    <section className="bg-off-white px-5 py-16 border-t border-gray-100">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-maroon to-[#6b1530] px-6 py-5 flex items-center gap-3">
              <Package className="w-6 h-6 text-gold flex-none" />
              <h2 className="text-white font-bold text-lg leading-snug">About Our Bags</h2>
            </div>
            <div className="px-6 py-6">
              <p className="text-[#555555] text-sm font-normal leading-relaxed">
                AZ Laundry bags will be brought to you with your first scheduled pickup.
                If you&apos;re going to be present for your pickup, you can stuff them with
                your laundry before handing them back to the driver. If you&apos;re not present
                for your first pickup, you can leave your clothes in any type of bag or hamper.
                We&apos;ll return these with your order along with AZ Laundry bags for next time.
              </p>
              <p className="text-[#555555] text-sm font-normal leading-relaxed mt-4">
                When you&apos;re ready to schedule a pickup, hop onto our website or give us a
                call to set up a time that works best for you.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Delivery Van ─────────────────────────────────────────────────────────────
function DeliveryVan() {
  return (
    <section className="bg-white px-5 py-16 border-t border-gray-100">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-bold text-dark mb-2 leading-[1.2]">
            Look for Our Van
          </h2>
          <p className="text-[#777777] text-sm font-normal mb-6">
            You&apos;ll know us when you see us.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
            {/* Van illustration block */}
            <div className="bg-gradient-to-br from-maroon via-[#7a1938] to-[#5a1028] px-6 py-14 flex flex-col items-center gap-5 text-center relative">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Truck className="w-14 h-14 text-gold" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Image
                  src="/logo-full.png"
                  alt="AZ Laundry Service"
                  width={140}
                  height={93}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-[0.2em]">
                Pickup &amp; Delivery
              </p>
            </div>
            <div className="bg-white px-5 py-5">
              <p className="text-[#777777] text-sm font-normal leading-relaxed">
                Our branded AZ Laundry van serves the Tempe &amp; Scottsdale area daily.
                Free pickup and delivery right to your door — no extra fees, ever.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Gift Cards (temporarily removed from page) ──────────────────────────────
// GiftCardPaymentForm and GiftCards components preserved for future use.
// To re-enable, uncomment the components below and add <GiftCards /> back to Home.

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="bg-off-white px-5 py-16 scroll-mt-14 border-t border-gray-100">
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-bold text-dark mb-1 leading-[1.2]">
            Pricing
          </h2>
          <p className="text-[#777777] text-sm font-normal mb-8">
            Simple, transparent pricing.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-gold shadow-[0_4px_28px_rgba(255,198,39,0.22)]">
            <div className="p-8 flex flex-col items-center gap-4 text-center">
              <div>
                <span className="text-4xl font-black text-maroon leading-none">$1.50</span>
                <span className="text-lg font-bold text-dark ml-1">/ lb</span>
              </div>
              <p className="text-[#777777] text-sm font-normal">
                Minimum charge $20
              </p>
              <motion.a
                href="https://mylaundryorder.com/?s=1773232209146x732803473043145500&page=ZIP%20Check"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="w-full flex items-center justify-center gap-2 font-black text-[15px] rounded-xl h-12 cursor-pointer transition-colors bg-gold hover:bg-gold-dark text-dark"
              >
                Schedule a Pickup <span className="ml-0.5">→</span>
              </motion.a>
            </div>
          </div>
        </FadeUp>

        {/* Contact hint */}
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

// ── Social Proof (temporarily removed from page) ─────────────────────────────
// SocialProof component preserved for future use.
// To re-enable, uncomment the component below and add <SocialProof /> back to Home.

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
            Schedule a Pickup →
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
        <BagInfo />
        <DeliveryVan />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
