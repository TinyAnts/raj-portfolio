import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
  Mail,
  Linkedin,
  MapPin,
  Globe,
  Dna,
  Bot,
  Rocket,
  GraduationCap,
  Presentation,
  FlaskConical,
  Cpu,
  Car,
  Stethoscope,
  BookOpen,
  Award,
  Languages,
  Quote,
  ExternalLink,
  Sparkles,
  PawPrint,
  Scissors,
  Atom,
  Brain,
  Microscope,
  Download,
  Copy,
  Check,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import rajProfile from "@/assets/images/raj-profile.webp";

const EMAIL = "arvindraghav21@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/nagaraj21";
const MILKAI = "https://milkai.ai";
const AIVET = "https://aivet.work";

const HERO_WORDS = ["living things.", "gene editing.", "animal health.", "the real world."];

/* ---------- data (from LinkedIn) ---------- */

type Cat = "research" | "startup" | "industry" | "teaching";

const CATS: Record<Cat, { label: string; chip: string }> = {
  research: { label: "Research", chip: "bg-forest/10 text-forest border-forest/30" },
  startup: { label: "Startups", chip: "bg-accent/10 text-brass border-accent/40" },
  industry: { label: "Industry", chip: "bg-forest/5 text-forest/80 border-forest/25" },
  teaching: { label: "Teaching", chip: "bg-secondary text-muted-foreground border-border" },
};

const EXPERIENCE: {
  role: string; org: string; period: string; location: string; cat: Cat;
  icon: typeof Dna; desc?: string; current?: boolean;
}[] = [
  {
    role: "CRISPR & NGS Data Researcher", org: "Hirszfeld Institute of Immunology & Experimental Therapy, PAN",
    period: "2025 – now", location: "Wrocław, Poland", cat: "research", icon: Dna, current: true,
    desc: "Machine-learning pipelines for CRISPR off-target prediction on large genomic, NGS and multi-omics datasets: k-mer, scalar and one-hot encodings feeding CNN and Transformer models. Currently building multi-agent AI systems that design and validate wet-lab experiment protocols.",
  },
  {
    role: "Co-Founder & CTO", org: "MilkAI LLC",
    period: "2025 – now", location: "California, USA", cat: "startup", icon: Rocket, current: true,
    desc: "A California product studio turning ideas into production-ready web, mobile and AI-first apps, with design-to-deploy CI/CD baked in. Dozens of launches, measurable outcomes over vanity metrics.",
  },
  {
    role: "Artificial Intelligence Engineer", org: "Veterinary Information Network",
    period: "2023 – 2025", location: "Remote (US company)", cat: "industry", icon: Stethoscope,
    desc: "AI engineering for the world's largest online veterinary community, applying machine learning where it helps animal health most.",
  },
  {
    role: "Co-Founder", org: "Zaide.ai",
    period: "2023 – 2024", location: "Remote", cat: "startup", icon: Bot,
    desc: "Built private, custom large language models for healthcare and life sciences: secure local LLMs designed so sensitive clinical and research data never leaves the organization.",
  },
  {
    role: "Mentor & Alpha Tester", org: "Coursera",
    period: "2017 – 2023", location: "Orange County, CA", cat: "teaching", icon: Presentation,
    desc: "Six years mentoring the Neural Networks & Deep Learning course, guiding learners from every background, plus alpha-testing unreleased AI courses and mentoring 3D-printing applications.",
  },
  {
    role: "Assistant Lecturer", org: "Coventry University (Wrocław campus)",
    period: "2022 – 2023", location: "Wrocław, Poland", cat: "teaching", icon: GraduationCap,
    desc: "Taught AI, IoT and software engineering.",
  },
  {
    role: "Senior AI Instructor", org: "Techeta Technologies",
    period: "2021 – 2022", location: "India", cat: "teaching", icon: Presentation,
    desc: "Trained technical and corporate teams in applied AI, unlocking automation use cases across domains.",
  },
  {
    role: "Co-Founder & CTO", org: "Neurons4vet.ai",
    period: "2020 – 2021", location: "Toronto, Canada", cat: "startup", icon: Rocket,
    desc: "First venture at the intersection of AI and veterinary medicine.",
  },
  {
    role: "Cohort Member", org: "Entrepreneur First",
    period: "2021", location: "Berlin, Germany", cat: "startup", icon: Sparkles,
    desc: "Selected for Europe's leading deep-tech talent investor, backed by Reid Hoffman, Greylock and Founders Fund. EF has co-created 300+ startups worth over $2.7B.",
  },
  {
    role: "Thesis Student", org: "Scania Group",
    period: "2020 – 2021", location: "Stockholm, Sweden", cat: "industry", icon: Car,
    desc: "Visual perception for trucks: classification, detection, semantic segmentation, depth estimation and reinforcement learning on real operational data.",
  },
  {
    role: "Machine Learning Engineer", org: "ai4medicine",
    period: "2020", location: "Berlin, Germany", cat: "industry", icon: FlaskConical,
    desc: "Computer-vision AI for stroke and bleeding detection in patients.",
  },
  {
    role: "Senior Design Engineer", org: "KTH Formula Student",
    period: "2019 – 2020", location: "Stockholm, Sweden", cat: "research", icon: Car,
    desc: "Autonomous race car perception: object detection, localization, LiDAR point clouds, NVIDIA Jetson deployment.",
  },
  {
    role: "Project Assistant", org: "Indian Institute of Technology, Delhi",
    period: "2017 – 2018", location: "New Delhi, India", cat: "research", icon: Cpu,
    desc: "Driverless car project: PID tuning and GPS + IMU + LiDAR + radar sensor fusion for a complete self-driving pipeline.",
  },
  {
    role: "Research Scholar", org: "Indian Institute of Technology, Madras",
    period: "2017", location: "Chennai, India", cat: "research", icon: FlaskConical,
    desc: "Embedded programming in the biomedical research lab: bio-medical kiosks, SpO2 pulse-oximetry sensors.",
  },
];

const EDUCATION = [
  { school: "Hirszfeld Institute of Immunology & Experimental Therapy, PAN", degree: "CRISPR & NGS Data Researcher, Polish Academy of Sciences", period: "2025 – now", note: "Researcher", flag: "🇵🇱" },
  { school: "Wrocław University of Environmental and Life Sciences (UPWR)", degree: "Veterinary Medicine, Veterinary Surgeon (DVM)", period: "2021 – 2027", note: "In progress", flag: "🇵🇱" },
  { school: "Technische Universität Berlin", degree: "M.Sc. Autonomous Systems, Robotics & AI specialization", period: "2018 – 2021", note: "Full scholarship", flag: "🇩🇪" },
  { school: "KTH Royal Institute of Technology", degree: "M.Sc. Autonomous Systems, Robotics & AI specialization", period: "2018 – 2021", note: "EIT Digital double degree", flag: "🇸🇪" },
  { school: "Aalto University", degree: "EIT Digital Summer School: Disrupting Retail", period: "2019", note: "Digitalization & growth", flag: "🇫🇮" },
  { school: "Anna University", degree: "B.E. Electrical & Electronics Engineering", period: "2013 – 2017", note: "Partial scholarship", flag: "🇮🇳" },
];

const SKILL_GROUPS = [
  { title: "AI & Machine Learning", icon: Bot, skills: ["CNNs & Transformers", "Deep Reinforcement Learning", "Imitation Learning", "Multi-Agent AI Systems", "Data Analysis"] },
  { title: "Genomics & Biomedical", icon: Dna, skills: ["CRISPR Guide Design", "NGS & Multi-Omics Data", "k-mer / One-Hot Encodings", "Medical Computer Vision", "Biomedical Sensors"] },
  { title: "Autonomous Systems", icon: Car, skills: ["Object Detection & Segmentation", "Depth Estimation", "LiDAR Point Clouds", "Sensor Fusion (GPS·IMU·Radar)", "NVIDIA Jetson Deployment"] },
  { title: "Engineering & Leadership", icon: Rocket, skills: ["Technical Leadership", "IoT & Embedded (Arduino)", "3D Printing", "CI/CD & Product Delivery", "Teaching & Mentorship"] },
];

const CERTS = [
  "Smartphone Emerging Technologies",
  "Introduction to the Internet of Things and Embedded Systems",
  "Big Data, Cloud Computing & CDN Emerging Technologies",
  "Internet of Things & Augmented Reality Emerging Technologies",
  "Interfacing with the Arduino",
];

/* ---------- shared bits ---------- */

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function Counter({ to, suffix = "", pad = false, duration = 1.6 }: { to: number; suffix?: string; pad?: boolean; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const shown = pad ? String(value).padStart(2, "0") : String(value);
  return <span ref={ref}>{shown}{suffix}</span>;
}

/* Rotating serif word with fade */
function RotatingWord({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading-italic text-forest inline-block"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
      <motion.span
        className="absolute -bottom-1.5 left-0 h-[3px] bg-accent origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ width: "100%" }}
        aria-hidden="true"
      />
    </span>
  );
}

/* Faint themed symbol floating in a section background */
function FloatIcon({ Icon, className, size = 36, delay = "0s", spin = false }: { Icon: typeof Dna; className: string; size?: number; delay?: string; spin?: boolean }) {
  return (
    <span
      className={`absolute pointer-events-none select-none hidden lg:block ${spin ? "animate-spin-slow" : "animate-float"} ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={1.1} />
    </span>
  );
}

/* Rotating stamp roundel */
function Stamp() {
  return (
    <div className="absolute -right-9 -top-9 w-28 h-28 z-20 animate-spin-slow" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
          <path id="stampPath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <circle cx="50" cy="50" r="46" className="fill-forest" />
        <circle cx="50" cy="50" r="24" className="fill-paper" style={{ fill: "hsl(40 45% 96%)" }} />
        <text className="uppercase" style={{ fontSize: "8px", letterSpacing: "1.8px", fontFamily: "Inter, sans-serif", fontWeight: 600, fill: "hsl(40 45% 92%)" }}>
          <textPath href="#stampPath">AI · CRISPR · ROBOTICS · VET MED ·</textPath>
        </text>
        <text x="50" y="56" textAnchor="middle" style={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontStyle: "italic", fontWeight: 600, fill: "hsl(38 48% 44%)" }}>R</text>
      </svg>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-forest text-primary-foreground shadow-xl flex items-center justify-center hover:-translate-y-1 transition-transform"
      data-testid="button-back-to-top"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}

/* ---------- main ---------- */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Cat | "all">("all");
  const [activeSection, setActiveSection] = useState("");
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const sectionIds = ["about", "experience", "education", "skills", "contact"];
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const shown = EXPERIENCE.filter((e) => filter === "all" || e.cat === filter);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
  ];

  const tickerItems = ["Machine Learning", "CRISPR Genomics", "Autonomous Systems", "Veterinary AI", "Multi-Agent Systems", "Robotics"];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[60]"
        style={{ scaleX: progress }}
      />

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md border-b border-ink/10 py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group" data-testid="link-nav-logo">
            <span className="relative w-9 h-9 bg-forest text-primary-foreground flex items-center justify-center font-heading font-bold text-lg transition-transform duration-300 group-hover:-rotate-6">
              R
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-accent" aria-hidden="true"></span>
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-accent" aria-hidden="true"></span>
            </span>
            <span className="font-heading font-bold text-xl tracking-tight">Raj <span className="text-brass">S.</span></span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className={`relative text-sm font-medium transition-colors group ${activeSection === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`} data-testid={`link-nav-${n.id}`}>
                {n.label}
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-accent transition-all duration-300 ${activeSection === n.id ? "w-full" : "w-0 group-hover:w-full"}`} aria-hidden="true"></span>
              </button>
            ))}
            <Button onClick={() => scrollTo("contact")} className="rounded-md px-6 bg-forest text-primary-foreground hover:bg-forest/90" data-testid="button-nav-contact">
              Get in Touch
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu" data-testid="button-mobile-menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-8 flex flex-col gap-7 md:hidden">
          {navItems.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="text-2xl font-heading font-semibold text-left" data-testid={`link-mobile-${n.id}`}>
              {n.label}
            </button>
          ))}
          <Button onClick={() => scrollTo("contact")} className="rounded-md w-full py-6 text-lg mt-2 bg-forest text-primary-foreground" data-testid="button-mobile-contact">
            Get in Touch
          </Button>
        </div>
      )}

      {/* 1. HERO */}
      <section id="hero" className="relative pt-28 md:pt-32 pb-14 overflow-hidden">
        <div className="absolute top-24 right-[-6%] w-[26rem] h-[26rem] rounded-full bg-accent/10 blur-3xl animate-drift" aria-hidden="true"></div>
        <div className="absolute inset-x-0 top-0 h-full bg-dots opacity-60 pointer-events-none" aria-hidden="true"></div>
        <FloatIcon Icon={Dna} className="top-40 left-[44%] text-forest/15" size={52} />
        <FloatIcon Icon={PawPrint} className="bottom-16 left-[6%] text-brass/20" size={38} delay="1.6s" />
        <FloatIcon Icon={Atom} className="bottom-28 right-[4%] text-forest/10" size={46} spin />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          {/* Mono meta line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap justify-between gap-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground border-b border-ink/15 pb-4 mb-10"
          >
            <span>Portfolio / 2026</span>
            <span className="hidden sm:block">Wrocław, PL · 51.1°N 17.0°E</span>
            <span>AI × Life Sciences</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="eyebrow text-brass mb-7 flex items-center gap-4">
                <span className="w-11 brass-rule inline-block"></span>
                AI Engineer · CRISPR Researcher · Founder · Future Vet
              </div>

              <h1 className="font-heading font-bold text-6xl md:text-7xl leading-[1.02] tracking-tight mb-6">
                I'm Raj <span className="text-brass font-medium text-2xl md:text-3xl align-middle whitespace-nowrap">(Nagarajan Shunmugam)</span>
              </h1>
              <div className="font-heading font-semibold text-2xl md:text-[2.5rem] leading-snug mb-8">
                Machine learning for <RotatingWord words={HERO_WORDS} />
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-9 font-light">
                <strong className="text-foreground font-medium">Nine years of AI in the places it matters:</strong> autonomous
                trucks in Stockholm, stroke detection in Berlin, AI for the world's largest veterinary community, and now
                gene editing in Wrocław, where I teach neural networks to design CRISPR experiments.
                Also halfway to becoming a veterinarian.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-11">
                <Button size="lg" onClick={() => scrollTo("contact")} className="rounded-md px-9 py-6 text-base bg-forest text-primary-foreground hover:bg-[hsl(152_26%_19%)] group" data-testid="button-hero-contact">
                  Get in Touch
                  <ArrowUpRight size={19} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Button size="lg" variant="outline" className="rounded-md px-9 py-6 text-base bg-transparent border-ink/30 text-foreground hover:bg-ink/5 w-full" data-testid="button-hero-linkedin">
                    <Linkedin size={18} className="mr-1" /> LinkedIn
                  </Button>
                </a>
                <a href="/Raj-S-CV.pdf" download className="inline-flex">
                  <Button size="lg" variant="outline" className="rounded-md px-9 py-6 text-base bg-transparent border-ink/30 text-foreground hover:bg-ink/5 w-full group" data-testid="button-hero-cv">
                    <Download size={18} className="mr-1 group-hover:translate-y-0.5 transition-transform" /> CV
                  </Button>
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-2"><MapPin size={15} className="text-brass" /> Wrocław, Poland</span>
                <span className="flex items-center gap-2"><Languages size={15} className="text-brass" /> Bilingual · English (IELTS C1) & Tamil</span>
                <span className="flex items-center gap-2"><Globe size={15} className="text-brass" /> Worked across 6 countries</span>
              </motion.div>
            </motion.div>

            {/* Photo with technical frame + figures column */}
            <div className="lg:col-span-5 grid grid-cols-[1fr_auto] gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="relative group max-w-[320px] justify-self-end"
              >
                <Stamp />
                {/* Corner brackets */}
                {["-top-2 -left-2 border-r-0 border-b-0", "-top-2 -right-2 border-l-0 border-b-0", "-bottom-2 -left-2 border-r-0 border-t-0", "-bottom-2 -right-2 border-l-0 border-t-0"].map((c, i) => (
                  <span key={i} className={`absolute w-6 h-6 border-[2.5px] border-accent z-10 ${c}`} aria-hidden="true"></span>
                ))}
                <div className="border-2 border-forest/50 overflow-hidden">
                  <img
                    src={rajProfile}
                    alt="Raj S"
                    className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    data-testid="img-hero"
                  />
                </div>
                <div className="flex justify-between font-mono text-[10.5px] text-muted-foreground mt-2.5">
                  <span>fig. 01 · Nagarajan Shunmugam</span>
                  <span>WRO · PL</span>
                </div>
                {/* Floating chips */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="absolute -left-16 top-10 z-20 bg-card border border-ink/15 shadow-lg px-3.5 py-2.5 animate-float hidden md:block">
                  <div className="flex items-center gap-2 text-xs font-semibold"><Dna size={13} className="text-forest" /> CRISPR × ML</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Hirszfeld Institute</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="absolute -left-12 bottom-14 z-20 bg-card border border-ink/15 shadow-lg px-3.5 py-2.5 animate-float hidden md:block" style={{ animationDelay: "1.4s" }}>
                  <div className="flex items-center gap-2 text-xs font-semibold"><Stethoscope size={13} className="text-brass" /> DVM 2027</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">future veterinarian</div>
                </motion.div>
              </motion.div>

              {/* Oversized figures */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="hidden xl:flex flex-col border-l border-ink/15 pl-7"
              >
                {[
                  { v: 9, s: "+", label: "years in AI", pad: true },
                  { v: 3, s: "", label: "startups co-founded", pad: true },
                  { v: 5, s: "", label: "universities", pad: true },
                  { v: 6, s: "", label: "countries", pad: true },
                ].map((st, i) => (
                  <div key={i} className={`py-4 ${i < 3 ? "border-b border-ink/10" : ""} group cursor-default`} data-testid={`stat-${i}`}>
                    <div className="font-heading font-semibold text-4xl leading-none group-hover:text-forest transition-colors">
                      <Counter to={st.v} suffix={st.s} pad={st.pad} />
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1.5">{st.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Mobile stats */}
          <motion.div {...reveal} className="xl:hidden mt-12 grid grid-cols-2 sm:grid-cols-4 border border-ink/15 divide-x divide-y sm:divide-y-0 divide-ink/10 bg-card">
            {[
              { v: 9, s: "+", label: "years in AI" },
              { v: 3, s: "", label: "startups co-founded" },
              { v: 5, s: "", label: "universities" },
              { v: 6, s: "", label: "countries" },
            ].map((st, i) => (
              <div key={i} className="p-5 text-center">
                <div className="font-heading font-semibold text-3xl"><Counter to={st.v} suffix={st.s} pad /></div>
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-1">{st.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ticker band */}
      <div className="bg-forest text-primary-foreground py-4 overflow-hidden border-y border-forest" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-ticker w-max">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center font-heading text-lg mx-6">
              <span className="text-brass mr-6 text-xs" style={{ color: "hsl(38 55% 62%)" }}>✦</span>
              <span className={i % 2 ? "font-heading-italic" : ""} style={i % 2 ? { color: "hsl(38 55% 62%)" } : undefined}>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. ABOUT */}
      <section id="about" className="py-24 bg-card relative overflow-hidden">
        <div className="absolute -top-24 right-[8%] w-80 h-80 rounded-full bg-forest/5 blur-3xl animate-drift-slow" aria-hidden="true"></div>
        <FloatIcon Icon={Scissors} className="top-14 right-[5%] text-brass/20 rotate-45" size={34} delay="0.8s" />
        <FloatIcon Icon={Microscope} className="bottom-12 left-[3%] text-forest/10" size={48} delay="2.2s" />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div {...reveal}>
              <div className="eyebrow text-brass mb-5 flex items-center gap-4">
                <span className="w-11 brass-rule inline-block"></span>
                About
              </div>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl leading-tight mb-7">
                One foot in the lab,<br /><span className="font-heading-italic text-forest">one in the wild.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5 font-light text-lg">
                My path isn't a straight line. It's a helix. Electrical engineering in Chennai,
                biomedical labs at IIT Madras and Delhi, a double master's in Robotics & AI between
                TU Berlin and KTH Stockholm, autonomous trucks at Scania, medical AI in Berlin,
                then two years building AI for the world's largest veterinary community in California.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 font-light text-lg">
                Today I do CRISPR machine-learning research at the Hirszfeld Institute in Wrocław,
                run a product studio as CTO of MilkAI, and I'm halfway through veterinary school, because the thing I actually want to build is the bridge between AI and animal medicine.
              </p>
              <div className="border-l-2 border-accent pl-5 py-1">
                <p className="font-heading-italic text-xl text-foreground/90">"Excited to find my life's purpose!"</p>
                <p className="font-mono text-[11px] text-muted-foreground mt-1.5">my whole LinkedIn summary. Still accurate.</p>
              </div>
            </motion.div>

            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="grid grid-cols-2 gap-4">
              {[
                { icon: Dna, no: "01", title: "CRISPR × AI", text: "ML for guide design & off-target prediction on genomic data" },
                { icon: Bot, no: "02", title: "Multi-Agent Systems", text: "AI agents that design and validate wet-lab protocols" },
                { icon: Stethoscope, no: "03", title: "Veterinary Medicine", text: "DVM candidate, class of 2027. AI for animal health." },
                { icon: Rocket, no: "04", title: "Building Products", text: "MilkAI: idea → production-ready app, at startup speed" },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -6 }}
                  className="bg-background border border-ink/15 p-6 group relative"
                  data-testid={`card-focus-${i}`}
                >
                  <span className="absolute top-4 right-5 font-mono text-[11px] text-muted-foreground/60">{c.no}</span>
                  <c.icon size={22} className="text-forest mb-4 group-hover:scale-110 group-hover:text-brass transition-all" />
                  <h3 className="font-heading font-semibold text-lg mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">{c.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE */}
      <section id="experience" className="py-24 bg-background relative overflow-hidden">
        <FloatIcon Icon={Dna} className="top-24 right-[2%] text-forest/10" size={58} />
        <FloatIcon Icon={Brain} className="bottom-40 left-[2%] text-brass/15" size={40} delay="1.2s" />
        <FloatIcon Icon={Car} className="top-[55%] right-[3%] text-forest/10" size={36} delay="2.8s" />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...reveal} className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-forest/30 pb-6 mb-10">
            <div>
              <div className="eyebrow text-brass mb-4 flex items-center gap-4">
                <span className="w-11 brass-rule inline-block"></span>
                Experience
              </div>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl leading-tight">
                A career in <span className="font-heading-italic text-forest">chapters.</span>
              </h2>
            </div>
            <span className="font-mono text-xs text-muted-foreground">2017 → 2026 · 14 roles · 6 countries</span>
          </motion.div>

          {/* Filter tabs */}
          <motion.div {...reveal} className="flex flex-wrap gap-2.5 mb-12">
            {(["all", "research", "startup", "industry", "teaching"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-sm font-medium border transition-all ${
                  filter === f
                    ? "bg-forest text-primary-foreground border-forest"
                    : "bg-transparent border-ink/25 text-muted-foreground hover:border-ink hover:text-foreground"
                }`}
                data-testid={`filter-${f}`}
              >
                {f === "all" ? "All" : CATS[f].label}
              </button>
            ))}
          </motion.div>

          {/* Chapter rows */}
          <div className="border-t border-ink/15">
            <AnimatePresence mode="popLayout">
              {shown.map((e, i) => {
                const cat = CATS[e.cat];
                return (
                  <motion.div
                    key={e.org + e.role}
                    layout
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45 }}
                    className="group grid grid-cols-1 md:grid-cols-[70px_170px_1.15fr_1fr_auto] gap-x-8 gap-y-2 items-start py-7 px-2 md:px-4 border-b border-ink/10 border-l-2 border-transparent hover:border-accent hover:bg-card transition-colors duration-300"
                    data-testid={`row-exp-${i}`}
                  >
                    <span className="font-mono text-xs text-muted-foreground/70 pt-1 hidden md:block">{String(i + 1).padStart(2, "0")}</span>
                    <div className="font-heading-italic text-muted-foreground text-lg pt-0.5 hidden md:block">{e.period}</div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl leading-snug flex items-center gap-2.5 flex-wrap">
                        {e.role}
                        {e.current && <span className="bg-forest text-primary-foreground font-sans text-[10px] font-bold px-2 py-0.5 tracking-wide">NOW</span>}
                      </h3>
                      <div className="text-forest text-sm font-medium mt-1">{e.org}</div>
                      <div className="font-mono text-[11px] text-muted-foreground mt-1 md:hidden">{e.period} · {e.location}</div>
                      <div className="font-mono text-[11px] text-muted-foreground mt-1 hidden md:block">{e.location}</div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light pt-1">{e.desc ?? ""}</p>
                    <span className={`inline-flex items-center gap-1.5 self-start mt-1 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider border ${cat.chip}`}>
                      <e.icon size={11} /> {cat.label}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. EDUCATION */}
      <section id="education" className="py-24 bg-forest text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-drift" aria-hidden="true"></div>
        <FloatIcon Icon={Dna} className="top-16 right-[6%] text-primary-foreground/10" size={56} delay="0.5s" />
        <FloatIcon Icon={GraduationCap} className="bottom-14 left-[4%] text-primary-foreground/10" size={44} delay="2s" />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...reveal} className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow mb-4 flex items-center gap-4" style={{ color: "hsl(38 55% 62%)" }}>
                <span className="w-11 inline-block h-px" style={{ background: "hsl(38 55% 62%)" }}></span>
                Education
              </div>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl leading-tight">
                Six institutions,<br /><span className="font-heading-italic" style={{ color: "hsl(38 55% 62%)" }}>still learning.</span>
              </h2>
            </div>
            <span className="font-mono text-xs text-primary-foreground/50">2013 → today</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/15 border border-primary-foreground/15">
            {EDUCATION.map((ed, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.09 }}
                className="bg-forest p-7 hover:bg-[hsl(152_26%_20%)] transition-colors group"
                data-testid={`card-edu-${i}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-2xl">{ed.flag}</span>
                  <span className="font-mono text-[11px] text-primary-foreground/50">{ed.period}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg leading-snug mb-2 group-hover:translate-x-1 transition-transform">{ed.school}</h3>
                <p className="text-sm text-primary-foreground/65 leading-relaxed font-light">{ed.degree}</p>
                <div className="mt-5 pt-4 border-t border-primary-foreground/15 text-[11px] font-bold uppercase tracking-wider" style={{ color: "hsl(38 55% 62%)" }}>
                  {ed.note}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SKILLS */}
      <section id="skills" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" aria-hidden="true"></div>
        <FloatIcon Icon={Cpu} className="top-20 right-[4%] text-forest/10" size={44} delay="1s" />
        <FloatIcon Icon={Atom} className="bottom-24 left-[3%] text-brass/15" size={40} spin />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...reveal} className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-forest/30 pb-6 mb-12">
            <div>
              <div className="eyebrow text-brass mb-4 flex items-center gap-4">
                <span className="w-11 brass-rule inline-block"></span>
                Skills
              </div>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl leading-tight">
                From silicon <span className="font-heading-italic text-forest">to cells.</span>
              </h2>
            </div>
            <span className="font-mono text-xs text-muted-foreground">the toolbox</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {SKILL_GROUPS.map((g, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (gi % 2) * 0.1 }}
                className="bg-card border border-ink/15 p-7 hover:border-ink/40 transition-colors"
                data-testid={`card-skills-${gi}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 border border-ink/20 flex items-center justify-center bg-background">
                      <g.icon size={18} className="text-forest" />
                    </span>
                    <h3 className="font-heading font-semibold text-xl">{g.title}</h3>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground/60">{String(gi + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s, si) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.12 + si * 0.05 }}
                      className="px-3 py-1.5 bg-background border border-ink/15 text-[13px] text-foreground/80 hover:border-accent hover:text-foreground hover:-translate-y-0.5 transition-all cursor-default"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certs + publication + honors */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <motion.div {...reveal} className="bg-card border border-ink/15 p-7">
              <div className="flex items-center gap-3 mb-5">
                <Award size={18} className="text-brass" />
                <h3 className="font-heading font-semibold text-xl">Certifications</h3>
              </div>
              <ul className="space-y-2.5">
                {CERTS.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-muted-foreground font-light">
                    <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" aria-hidden="true"></span>
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="bg-card border border-ink/15 p-7">
              <div className="flex items-center gap-3 mb-5">
                <BookOpen size={18} className="text-brass" />
                <h3 className="font-heading font-semibold text-xl">Publication</h3>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed font-medium">
                Deep Learning for Hardware-Constrained Cars: Imitation Learning & Deep Reinforcement Learning
              </p>
              <p className="font-mono text-[11px] text-muted-foreground mt-3">autonomous driving · master's research</p>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.16 }} className="bg-card border border-ink/15 p-7">
              <div className="flex items-center gap-3 mb-5">
                <Sparkles size={18} className="text-brass" />
                <h3 className="font-heading font-semibold text-xl">Honors</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Full scholarship, master's education<br />
                Partial scholarship, bachelor's education<br />
                IELTS C1, English proficiency
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" className="py-24 bg-card border-t border-ink/10 relative overflow-hidden">
        <div className="absolute -bottom-28 left-[10%] w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-drift-slow" aria-hidden="true"></div>
        <FloatIcon Icon={Stethoscope} className="top-16 right-[6%] text-forest/10" size={52} delay="0.6s" />
        <FloatIcon Icon={PawPrint} className="bottom-20 right-[16%] text-brass/20" size={32} delay="2.4s" />
        <FloatIcon Icon={Dna} className="top-[45%] right-[28%] text-forest/10" size={38} delay="3.5s" />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="max-w-3xl">
            <motion.div {...reveal}>
              <div className="eyebrow text-brass mb-5 flex items-center gap-4">
                <span className="w-11 brass-rule inline-block"></span>
                Contact
              </div>
              <h2 className="font-heading font-semibold text-5xl md:text-6xl leading-tight mb-7">
                Let's build something<br /><span className="font-heading-italic text-forest">that matters.</span>
              </h2>
              <p className="text-muted-foreground text-lg font-light mb-10 max-w-xl">
                Research collaborations, product ideas, or AI × veterinary medicine: my inbox is open.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href={`mailto:${EMAIL}`} className="inline-flex">
                  <Button size="lg" className="rounded-md px-9 py-6 text-base bg-forest text-primary-foreground hover:bg-[hsl(152_26%_19%)] w-full" data-testid="button-contact-email">
                    <Mail size={18} className="mr-1" /> {EMAIL}
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={copyEmail}
                  className="rounded-md px-6 py-6 text-base bg-transparent border-ink/30 hover:bg-ink/5"
                  aria-label="Copy email address"
                  data-testid="button-copy-email"
                >
                  {copied ? <><Check size={18} className="mr-1 text-forest" /> Copied!</> : <><Copy size={18} className="mr-1" /> Copy</>}
                </Button>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Button size="lg" variant="outline" className="rounded-md px-9 py-6 text-base bg-transparent border-ink/30 hover:bg-ink/5 w-full" data-testid="button-contact-linkedin">
                    <Linkedin size={18} className="mr-1" /> Connect on LinkedIn
                  </Button>
                </a>
                <a href="/Raj-S-CV.pdf" download className="inline-flex">
                  <Button size="lg" variant="outline" className="rounded-md px-9 py-6 text-base bg-transparent border-ink/30 hover:bg-ink/5 w-full" data-testid="button-contact-cv">
                    <Download size={18} className="mr-1" /> Download CV
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <a href={MILKAI} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors group" data-testid="link-contact-milkai">
                  <Rocket size={15} className="text-brass" /> milkai.ai <ArrowRight size={13} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                </a>
                <span className="w-px h-4 bg-ink/20 hidden sm:block" aria-hidden="true"></span>
                <a href={AIVET} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors group" data-testid="link-contact-aivet">
                  <GraduationCap size={15} className="text-brass" /> Career Co-Pilot 360 <ArrowRight size={13} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-primary-foreground py-12 relative overflow-hidden">
        <span className="absolute -bottom-8 right-4 font-heading font-heading-italic text-[7rem] text-primary-foreground/[0.06] whitespace-nowrap select-none leading-none pointer-events-none font-heading-italic" aria-hidden="true">
          Raj S.
        </span>
        <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-5 relative">
          <div className="flex items-center gap-3">
            <span className="relative w-8 h-8 bg-primary-foreground/10 flex items-center justify-center font-heading font-bold text-base">
              R
              <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: "hsl(38 55% 62%)" }} aria-hidden="true"></span>
              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: "hsl(38 55% 62%)" }} aria-hidden="true"></span>
            </span>
            <span className="font-heading font-semibold text-xl">Raj <span style={{ color: "hsl(38 55% 62%)" }}>S.</span></span>
          </div>
          <div className="flex items-center gap-5 text-primary-foreground/60 text-sm">
            <a href={`mailto:${EMAIL}`} className="hover:text-primary-foreground transition-colors" data-testid="link-footer-email">{EMAIL}</a>
            <span className="w-px h-4 bg-primary-foreground/20" aria-hidden="true"></span>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary-foreground transition-colors flex items-center gap-1.5" data-testid="link-footer-linkedin"><Linkedin size={15} /> LinkedIn</a>
          </div>
          <div className="font-mono text-xs text-primary-foreground/40">© {new Date().getFullYear()} Nagarajan Shunmugam</div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
