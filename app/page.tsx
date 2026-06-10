'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Star, 
  Layers, 
  Maximize2, 
  Compass, 
  Clock, 
  Send, 
  Menu, 
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';

// Custom SVG Replica of "Shree Interior Designer" company logo matching the image
const ShreeLogo = ({ className = "h-14 w-auto", darkBg = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative h-12 w-14 flex-shrink-0">
        <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4D0" />
              <stop offset="30%" stopColor="#F5D061" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8F711C" />
            </linearGradient>
            <linearGradient id="goldGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#5C4810" />
            </linearGradient>
          </defs>
          
          {/* House 1 (Left / Background House) */}
          <path 
            d="M 50 85 L 115 45 L 180 85 L 180 135 L 50 135 Z" 
            stroke="url(#goldGradient)" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Window in House 1 */}
          <rect x="95" y="93" width="26" height="26" stroke="url(#goldGradient)" strokeWidth="4" rx="2" />
          <line x1="108" y1="93" x2="108" y2="119" stroke="url(#goldGradient)" strokeWidth="3" />
          <line x1="95" y1="106" x2="121" y2="106" stroke="url(#goldGradient)" strokeWidth="3" />

          {/* House 2 (Right / Foreground House - overlapping House 1) */}
          {/* Thick backdrop fill to cover House 1 intersection */}
          <path 
            d="M 130 60 L 205 15 L 280 60 L 280 135 L 130 135 Z" 
            fill={darkBg ? "#0D1117" : "#FAF9F6"} 
          />
          <path 
            d="M 130 60 L 205 15 L 280 60 L 280 135 L 130 135 Z" 
            stroke="url(#goldGradient)" 
            strokeWidth="9" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Window in House 2 */}
          <rect x="180" y="78" width="36" height="36" stroke="url(#goldGradient)" strokeWidth="5" rx="3" />
          <line x1="198" y1="78" x2="198" y2="114" stroke="url(#goldGradient)" strokeWidth="3.5" />
          <line x1="180" y1="96" x2="216" y2="96" stroke="url(#goldGradient)" strokeWidth="3.5" />

          {/* Golden Sweeping Arc / Swoosh under houses scaling upward */}
          <path 
            d="M 25 140 C 95 185, 255 180, 305 105" 
            stroke="url(#goldGradient)" 
            strokeWidth="8" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Double thickness arc tail to create realistic ribbon feel */}
          <path 
            d="M 25 140 C 95 195, 260 188, 308 107 C 295 119, 235 155, 25 140 Z" 
            fill="url(#goldGradient)" 
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif text-2xl font-bold tracking-wide leading-none ${darkBg ? "text-white" : "text-[#222222]"}`}>
          Shree
        </span>
        <span className="text-[9px] uppercase tracking-[0.38em] text-gold font-bold leading-tight mt-1">
          Interior designer
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);

  // Form States
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formType, setFormType] = useState('Luxury Living Room');
  const [formBudget, setFormBudget] = useState('₹5L - ₹10L');
  const [formMessage, setFormMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Parallax Hero state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Statistics State for Kinetic Counts
  const [counts, setCounts] = useState({ rating: 0, projects: 0, years: 0 });
  const [hasCounted, setHasCounted] = useState(false);
  const statsSectionRef = useRef<HTMLDivElement>(null);

  // Stats numerical counter animation
  const animateStats = () => {
    let start = 0;
    const ratingTarget = 4.8;
    const projectsTarget = 150;
    const yearsTarget = 8;
    const duration = 2000; // 2 seconds
    const intervalTime = 30; // 30ms step
    const steps = duration / intervalTime;

    let stepCount = 0;
    const timer = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setCounts({
        rating: parseFloat((easedProgress * ratingTarget).toFixed(1)),
        projects: Math.floor(easedProgress * projectsTarget),
        years: Math.floor(easedProgress * yearsTarget),
      });

      if (stepCount >= steps) {
        clearInterval(timer);
        setCounts({
          rating: ratingTarget,
          projects: projectsTarget,
          years: yearsTarget,
        });
      }
    }, intervalTime);
  };

  // Timeline Progress State
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll position & Navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      setStickyNav(window.scrollY > 50);

      // Track timeline scroll progress
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const elementHeight = rect.height;
        const viewHeight = window.innerHeight;
        
        // Start track when top of timeline box matches 60% of viewport
        const startPoint = viewHeight * 0.6;
        const totalDistance = elementHeight + startPoint - viewHeight * 0.2;
        const currentDistance = startPoint - rect.top;
        
        let progress = currentDistance / totalDistance;
        progress = Math.max(0, Math.min(1, progress));
        setScrollProgress(progress);
      }

      // Track statistics viewport intersection
      if (statsSectionRef.current && !hasCounted) {
        const rect = statsSectionRef.current.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom >= 0;
        if (inViewport) {
          setHasCounted(true);
          animateStats();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasCounted]);

  // GSAP Kinetic ScrollTrigger section title animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register ScrollTrigger natively with imported gsap
    gsap.registerPlugin(ScrollTrigger);

    const titleElements = document.querySelectorAll('.gsap-section-title');
    const triggers: any[] = [];

    titleElements.forEach((titleEl) => {
      // Set the element visible once script executes, letting GSAP handle child animations
      if (titleEl instanceof HTMLElement) {
        titleEl.style.opacity = '1';
      }

      const text = titleEl.textContent || '';
      
      // Prevent double trigger side-effects from React 18/19 double-mount behavior
      if (titleEl.getAttribute('data-split-done') === 'true') return;
      titleEl.setAttribute('data-split-done', 'true');

      titleEl.innerHTML = '';

      // Split words and characters for fluid kinetic stagger animations
      const words = text.split(' ');
      words.forEach((word, wordIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';
        
        const chars = word.split('');
        chars.forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.style.display = 'inline-block';
          charSpan.style.transformOrigin = 'center bottom';
          charSpan.className = 'gsap-char-item';
          wordSpan.appendChild(charSpan);
        });

        titleEl.appendChild(wordSpan);

        if (wordIdx < words.length - 1) {
          titleEl.appendChild(document.createTextNode(' '));
        }
      });

      const chars = titleEl.querySelectorAll('.gsap-char-item');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleEl,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // 1. Identify and animate preceding eyebrow tag if present
      const prevTag = titleEl.previousElementSibling;
      if (prevTag && prevTag.classList.contains('gsap-section-subtitle')) {
        tl.fromTo(prevTag,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out'
          }
        );
      }

      // 2. Elegant, kinetic staggered character rotate & raise
      tl.fromTo(chars, 
        { 
          opacity: 0,
          y: 45,
          rotation: 4,
          scale: 0.96
        },
        { 
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.025,
          ease: 'power3.out'
        },
        prevTag ? '-=0.55' : 0
      );

      // 3. Identify and animate succeeding subtitle text/paragraph if present
      const nextSub = titleEl.nextElementSibling;
      if (nextSub && nextSub.classList.contains('gsap-section-subtitle')) {
        tl.fromTo(nextSub,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          },
          '-=0.45'
        );
      }
      
      triggers.push(tl);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Handle Hero Parallax interaction
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { width, height } = heroRef.current.getBoundingClientRect();
    const xMultiplier = (clientX / width - 0.5) * -25; // Parallax magnitude
    const yMultiplier = (clientY / height - 0.5) * -25;
    setMousePos({ x: xMultiplier, y: yMultiplier });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Custom 3D Tilt Hook applied natively
  const applyTilt = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    // Tilt calculations
    const rx = -(dy / yc) * 12; // rotateX based on mouseY offset
    const ry = (dx / xc) * 12;  // rotateY based on mouseX offset

    // Apply transform and glass reflection gradient
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
    
    const glare = card.querySelector('.card-glare') as HTMLDivElement;
    if (glare) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      glare.style.background = `linear-gradient(${angle}deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 80%)`;
      glare.style.opacity = '1';
    }
  };

  const removeTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    
    const glare = card.querySelector('.card-glare') as HTMLDivElement;
    if (glare) {
      glare.style.opacity = '0';
      glare.style.transition = 'opacity 0.5s ease';
    }
  };

  // Handle Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      alert("Please provide at least Name and Phone number.");
      return;
    }
    setFormSuccess(true);
    setTimeout(() => {
      // Trigger WhatsApp redirection prefilled with message context
      const customMessage = `Hi Shree Interior Designer, I would like to schedule a consultation. Name: ${formName}, Phone: ${formPhone}, Project: ${formType}, Budget: ${formBudget}. Msg: ${formMessage}`;
      const encodedMsg = encodeURIComponent(customMessage);
      window.open(`https://wa.me/918454958813?text=${encodedMsg}`, '_blank');
    }, 1500);
  };

  return (
    <>
      {/* GSAP and ScrollTrigger Scripts loaded from CDNs to enrich cinematic rendering on callback mount */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
        strategy="lazyOnload"
        onLoad={() => {
          // Initialize GSAP custom landing animations once loaded
          const gsapObj = (window as any).gsap;
          if (gsapObj) {
            gsapObj.from(".gsap-fade-in", {
              opacity: 0,
              y: 50,
              duration: 1.2,
              stagger: 0.2,
              ease: "power3.out"
            });
            gsapObj.from(".gsap-nav-item", {
              opacity: 0,
              y: -20,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.2
            });
          }
        }}
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="lazyOnload"
      />

      {/* Floating Sparkles Backdrop Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute top-[50%] right-[5%] w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[8%] w-80 h-80 bg-gold/5 rounded-full blur-[130px]" />
      </div>

      {/* SECTION 1: Transparent Floating Navbar */}
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          stickyNav 
            ? 'bg-[#FAF9F6]/90 backdrop-blur-md py-3 shadow-[0_10px_30px_rgba(34,34,34,0.03)] border-gold/10' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Custom SVG Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a href="#" className="block">
              <ShreeLogo />
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8 font-sans text-xs uppercase tracking-[0.25em] text-[#222222]/80 font-medium">
              <li className="gsap-nav-item">
                <a href="#about" className="hover:text-gold transition-colors duration-300 relative group py-2">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li className="gsap-nav-item">
                <a href="#portfolio" className="hover:text-gold transition-colors duration-300 relative group py-2">
                  Our Masterpieces
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li className="gsap-nav-item">
                <a href="#process" className="hover:text-gold transition-colors duration-300 relative group py-2">
                  The Process
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li className="gsap-nav-item">
                <a href="#contact" className="hover:text-gold transition-colors duration-300 relative group py-2">
                  Connect
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            </ul>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="gsap-nav-item"
            >
              <a 
                href="#contact" 
                className="relative inline-flex items-center gap-2 bg-[#222222] text-[#FAF9F6] text-[11px] uppercase tracking-[0.2em] font-medium px-6 py-3.5 rounded-none overflow-hidden group border border-gold/20"
                id="cta-launch-nav"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out -z-1" />
                <span className="relative z-1 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                  Launch Consultation
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold animate-pulse shadow-[0_0_10px_#D4AF37]" />
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-[#222222] p-2 hover:text-gold transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#FAF9F6] pt-24 px-6 md:px-12 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8 mt-4">
              <ul className="flex flex-col gap-6 text-xl font-serif text-[#222222]">
                <li>
                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:text-gold transition-colors"
                  >
                    <span>About Shree</span>
                    <ChevronRight className="w-4 h-4 text-gold" />
                  </a>
                </li>
                <li>
                  <a 
                    href="#portfolio" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:text-gold transition-colors"
                  >
                    <span>Our Masterpieces</span>
                    <ChevronRight className="w-4 h-4 text-gold" />
                  </a>
                </li>
                <li>
                  <a 
                    href="#process" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:text-gold transition-colors"
                  >
                    <span>The Process</span>
                    <ChevronRight className="w-4 h-4 text-gold" />
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:text-gold transition-colors"
                  >
                    <span>Free Consultation</span>
                    <ChevronRight className="w-4 h-4 text-gold" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="pb-12 flex flex-col gap-4">
              <a 
                href="https://wa.me/918454958813" 
                target="_blank"
                className="w-full text-center bg-[#25D366] text-white py-4 font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-5 h-5 fill-white" />
                <span>WhatsApp: +91 84549 58813</span>
              </a>
              <div className="text-center text-xs text-gray-400 mt-2 font-mono">
                Omkar Empire, Sector 10, Kharghar, Navi Mumbai
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* SECTION 2: Cinematic Hero Section (3D Depth) */}
      <section 
        id="hero"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden"
      >
        {/* Layer 0: Blur grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
          {/* Left Text Column: Overlapping 3D layout */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 gsap-fade-in z-20">
            {/* Elegant location tag */}
            <div className="inline-flex items-center gap-2 bg-white/80 border border-gold/30 gold-glow px-4 py-1.5 rounded-full shadow-[0_4px_20px_rgba(34,34,34,0.02)]">
              <MapPin className="w-3.5 h-3.5 text-gold animate-bounce" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-700">
                Omkar Empire, Sector 10, Kharghar
              </span>
            </div>

            {/* Cinematic Serif Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#222222] leading-[1.08] max-w-2xl">
              Crafting <span className="text-gold italic font-medium">Royal</span> &amp; Luxurious Spaces in Kharghar
            </h1>

            {/* Premium editorial descriptive copy */}
            <p className="text-sm md:text-base text-gray-600 font-sans tracking-wide leading-relaxed max-w-xl">
              We translate residential flats, premium penthouses, and bespoke office zones into breathtaking architectural statements of comfort, luxury, and unmatched royalty.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <a 
                href="#portfolio" 
                className="flex-1 sm:flex-initial text-center bg-gold text-[#222222] border border-gold text-[11px] uppercase tracking-[0.2em] font-bold px-8 py-4 relative overflow-hidden group hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all duration-300"
              >
                <span className="absolute inset-x-0 bottom-0 top-0 h-full bg-white opacity-0 group-hover:opacity-25 group-active:opacity-10 transition-opacity duration-300" />
                Explore Creations
              </a>
              <a 
                href="#contact" 
                className="flex-1 sm:flex-initial text-center bg-transparent border border-gray-300 hover:border-[#222222] text-[#222222] text-[11px] uppercase tracking-[0.2em] font-bold px-8 py-4 transition-all duration-300"
              >
                Connect Now
              </a>
            </div>

            {/* Micro client banner */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200/50 w-full max-w-md">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative w-9 h-9 rounded-full border-2 border-[#FAF9F6] overflow-hidden bg-gray-200">
                    <Image 
                      src={`https://picsum.photos/seed/avatar${i}/100`} 
                      alt="Verified Client" 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                  <span className="text-xs font-bold text-gray-800 ml-1.5 font-mono">4.8/5</span>
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Trusted by Kharghar families</span>
              </div>
            </div>
          </div>

          {/* Right Image Frame Column: 3D Depth Overlapped Frames */}
          <div className="lg:col-span-5 relative h-[450px] sm:h-[550px] w-full flex items-center justify-center z-10 select-none">
            {/* Interactive Parallax Canvas */}
            <div 
              style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
                transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              className="relative w-full h-full"
            >
              {/* Back Gold Border Frame */}
              <div className="absolute top-[10%] left-[8%] w-[78%] h-[82%] border border-gold shadow-[0_0_40px_rgba(212,175,55,0.15)] -z-1 translate-x-3 translate-y-3" />

              {/* Main Luxury Room Frame (Represents user chandelier room beautifully) */}
              <div className="absolute top-[10%] left-[8%] w-[78%] h-[82%] overflow-hidden shadow-[0_30px_70px_rgba(34,34,34,0.15)] ring-1 ring-gold/20">
                <Image 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80" 
                  alt="Shree Luxury Interior Living Room" 
                  fill 
                  priority
                  className="object-cover scale-105 hover:scale-110 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded luxury glass accent banner */}
                <div className="absolute bottom-5 left-5 right-5 glass-panel p-4 border border-white/20 shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-gold">Featured Concept</p>
                      <h4 className="font-serif text-sm font-semibold text-[#222222] mt-0.5">Imperial Living Lounge &amp; Crystal Chandeliers</h4>
                    </div>
                    <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Miniature overlapping accent card */}
              <div className="absolute top-[48%] -right-2 w-48 p-4 glass-panel border border-gold/20 shadow-xl hidden sm:flex flex-col gap-2 rounded-sm transform translate-x-2 -translate-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Live Showroom</span>
                </div>
                <h5 className="font-serif text-xs font-bold text-gray-800 leading-snug">Turnkey Imperial Living Room Styles</h5>
                <p className="text-[9px] text-[#222222]/70 leading-normal">Premium ambient backlit quartz displays</p>
              </div>

              {/* Behind circular gold geometry */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-gold/10 pointer-events-none -z-2" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator Accent */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-gray-500">Scroll Gallery</span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-gold to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 3: Kinetic Statistics Overlay */}
      <section 
        id="about"
        ref={statsSectionRef}
        className="relative bg-white border-y border-gold/10 py-16 md:py-24 overflow-hidden z-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center text-center">
            
            {/* Stat Row 1 */}
            <div className="flex flex-col items-center justify-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-gold/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 fill-gold text-gold" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-[#222222]">
                  {counts.rating}
                </span>
                <span className="font-sans text-xl font-bold text-gold">★</span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">
                Verified Google Rating
              </p>
              <p className="text-[11px] text-gray-400 max-w-xs font-sans tracking-wide leading-relaxed">
                Reflecting consistent quality across client reviews in Kharghar Sector 10.
              </p>
            </div>

            {/* Stat Row 2 */}
            <div className="flex flex-col items-center justify-center gap-3 group border-y md:border-y-0 md:border-x border-gray-100 py-8 md:py-0">
              <div className="w-14 h-14 rounded-full bg-gold/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-[#222222]">
                  {counts.projects}
                </span>
                <span className="font-sans text-xl font-bold text-gold">+</span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">
                Luxury Projects Handover
              </p>
              <p className="text-[11px] text-gray-400 max-w-xs font-sans tracking-wide leading-relaxed">
                Elite modular kitchens, premium apartments, and corporate workstations.
              </p>
            </div>

            {/* Stat Row 3 */}
            <div className="flex flex-col items-center justify-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-gold/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-[#222222]">
                  {counts.years}
                </span>
                <span className="font-sans text-xl font-bold text-gold">Yrs+</span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">
                Architectural Expertise
              </p>
              <p className="text-[11px] text-gray-400 max-w-xs font-sans tracking-wide leading-relaxed">
                Transforming residential layout designs into works of pure art.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: 3D Isometric Portfolio Showcase */}
      <section 
        id="portfolio"
        className="relative py-24 md:py-32 overflow-hidden z-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
            <div className="flex flex-col items-start gap-3">
              <span 
                className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold border-b border-gold/40 pb-1 gsap-section-subtitle"
                style={{ opacity: 0 }}
              >
                Luxury Portfolio
              </span>
              <h2 
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#222222] gsap-section-title"
                style={{ opacity: 0 }}
              >
                Our Masterpieces
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-500 max-w-lg font-sans tracking-wide leading-relaxed">
              Every interior is uniquely stylized with precise lighting coordinates, premium modular alignments, and the finest luxury finishes in Kharghar and Panvel.
            </p>
          </div>

          {/* Portfolio Grid with Interactive 3D Tilt and custom reflection sheens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full p-card-grid">
            
            {/* Card 1: Luxury Living Rooms */}
            <div 
              className="relative group block cursor-pointer transition-all duration-500 ease-out p-card"
              onMouseMove={(e) => applyTilt(e, 'lounge')}
              onMouseLeave={removeTilt}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Container block */}
              <div className="relative h-[350px] sm:h-[450px] w-full overflow-hidden bg-charcoal rounded-[4px] animate-shine">
                <Image 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                  alt="Luxury Living Room by Shree Interior Designer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Glare sheen reflect effect overlay */}
                <div className="card-glare absolute inset-0 opacity-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 z-10" />

                {/* Hover overlay gradient shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:from-black/95 transition-all duration-300" />

                {/* Card Content overlap details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end gap-3 translate-z-[30px]" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gold font-bold">Concept 01</span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="text-[9px] uppercase tracking-widest text-[#FAF9F6]">TV lounge wall</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white tracking-wide">
                    Luxury Living Rooms
                  </h3>
                  <p className="text-xs text-gray-300 font-sans tracking-wide leading-relaxed max-w-md">
                    Backlit golden quartz marble slabs, custom ambient false-ceiling, and state-of-the-art entertainment storage units styled for imperial spaces.
                  </p>
                  <div className="inline-flex items-center gap-2 text-gold text-[10px] uppercase font-bold tracking-[0.2em] pt-2 group-hover:translate-x-2 transition-transform duration-300">
                    <span>Inspect Design</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Modular Kitchens */}
            <div 
              className="relative group block cursor-pointer transition-all duration-500 ease-out p-card"
              onMouseMove={(e) => applyTilt(e, 'kitchen')}
              onMouseLeave={removeTilt}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-[350px] sm:h-[450px] w-full overflow-hidden bg-charcoal rounded-[4px] animate-shine">
                <Image 
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Modular Kitchen by Shree Interior Designer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                <div className="card-glare absolute inset-0 opacity-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:from-black/95 transition-all duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end gap-3" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gold font-bold">Concept 02</span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="text-[9px] uppercase tracking-widest text-[#FAF9F6]">Modular ergonomics</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white tracking-wide">
                    Modular Kitchens
                  </h3>
                  <p className="text-xs text-gray-300 font-sans tracking-wide leading-relaxed max-w-md">
                    Seamless acrylic anti-fingerprint profiles, glossy lilac/rose gold cabinetry alignments, soft-close hardware guarantees, and fully integrated chimney structures.
                  </p>
                  <div className="inline-flex items-center gap-2 text-gold text-[10px] uppercase font-bold tracking-[0.2em] pt-2 group-hover:translate-x-2 transition-transform duration-300">
                    <span>Inspect Design</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Premium Apartments */}
            <div 
              className="relative group block cursor-pointer transition-all duration-500 ease-out p-card"
              onMouseMove={(e) => applyTilt(e, 'apartments')}
              onMouseLeave={removeTilt}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-[350px] sm:h-[450px] w-full overflow-hidden bg-charcoal rounded-[4px] animate-shine">
                <Image 
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80" 
                  alt="Premium Bed Room Apartment style by Shree Interior"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                <div className="card-glare absolute inset-0 opacity-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:from-black/95 transition-all duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end gap-3" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gold font-bold">Concept 03</span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="text-[9px] uppercase tracking-widest text-[#FAF9F6]">Suite living Room</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white tracking-wide">
                    Premium Apartments
                  </h3>
                  <p className="text-xs text-gray-300 font-sans tracking-wide leading-relaxed max-w-md">
                    Turnkey master bedrooms with wood accents, automated sliding partitions, premium wardrobe arrays, and organic textured headboards.
                  </p>
                  <div className="inline-flex items-center gap-2 text-gold text-[10px] uppercase font-bold tracking-[0.2em] pt-2 group-hover:translate-x-2 transition-transform duration-300">
                    <span>Inspect Design</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Sleek Offices */}
            <div 
              className="relative group block cursor-pointer transition-all duration-500 ease-out p-card"
              onMouseMove={(e) => applyTilt(e, 'offices')}
              onMouseLeave={removeTilt}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-[350px] sm:h-[450px] w-full overflow-hidden bg-charcoal rounded-[4px] animate-shine">
                <Image 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
                  alt="Sleek Commercial Workspace by Shree Interior"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                <div className="card-glare absolute inset-0 opacity-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:from-black/95 transition-all duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end gap-3" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gold font-bold">Concept 04</span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="text-[9px] uppercase tracking-widest text-[#FAF9F6]">Aesthetic workspaces</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white tracking-wide">
                    Sleek Offices
                  </h3>
                  <p className="text-xs text-gray-300 font-sans tracking-wide leading-relaxed max-w-md">
                    Minimalist wooden vertical slate baffles, anti-glare high-end task light arrangements, collaborative spaces, and executive conference aesthetics.
                  </p>
                  <div className="inline-flex items-center gap-2 text-gold text-[10px] uppercase font-bold tracking-[0.2em] pt-2 group-hover:translate-x-2 transition-transform duration-300">
                    <span>Inspect Design</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: Dynamic Fluid Process Section */}
      <section 
        id="process"
        ref={timelineRef}
        className="relative bg-white py-24 md:py-32 overflow-hidden z-20 border-y border-gold/10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-24">
            <span 
              className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold bg-gold/5 px-4 py-1 rounded-full gsap-section-subtitle"
              style={{ opacity: 0 }}
            >
              Spatial Evolution
            </span>
            <h2 
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#222222] mt-4 gsap-section-title"
              style={{ opacity: 0 }}
            >
              The Evolution of Space
            </h2>
            <p 
              className="text-xs md:text-sm text-gray-400 font-mono tracking-widest uppercase mt-2 gsap-section-subtitle"
              style={{ opacity: 0 }}
            >
              Blueprint → Luxury Rendering → Finished Masterpiece
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-stretch">
            
            {/* Dynamic vertical timeline timeline laser path (Desktop only) */}
            <div className="hidden md:block md:col-span-1 relative z-10 flex items-center justify-center">
              <div className="absolute top-0 bottom-0 w-[4px] bg-[#FAF9F6] border border-gray-100 rounded-full overflow-hidden">
                {/* Scroll linked laser line */}
                <div 
                  className="w-full bg-gold shadow-[0_0_12px_#D4AF37]" 
                  style={{ 
                    height: `${scrollProgress * 100}%`,
                    boxShadow: '0 0 15px #D4AF37'
                  }}
                />
              </div>
            </div>

            {/* Steps Column container */}
            <div className="md:col-span-11 flex flex-col gap-16 md:gap-20">
              
              {/* Step 1: Consultation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center process-step relative">
                {/* Mobile laser indicator */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gray-100 md:hidden">
                  <div className="w-full bg-gold" style={{ height: scrollProgress > 0.1 ? '100%' : '0%' }} />
                </div>
                
                <div className="lg:col-span-4 flex items-center md:items-start gap-4 pl-4 md:pl-0">
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-none font-serif text-lg font-bold border transition-colors duration-500 ${
                    scrollProgress > 0.1 ? 'bg-gold border-gold text-[#222222] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-transparent border-gray-300 text-gray-400'
                  }`}>
                    01
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#222222]">Signature Consultation</h3>
                    <p className="text-[10px] text-gold uppercase font-mono mt-0.5 tracking-wider font-semibold">Phase One: Foundation</p>
                  </div>
                </div>

                <div className="lg:col-span-8 pl-4 md:pl-0">
                  <p className="text-sm md:text-base text-gray-600 font-sans tracking-wide leading-relaxed">
                    Collaborating closely with down-payment layouts at our Kharghar design headquarters, we decode your spatial goals, functional preferences, furniture blueprints, and exact material budgets to secure alignment before crafting.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className="text-[10px] uppercase bg-gray-100 text-gray-600 font-semibold px-3 py-1 font-mono tracking-wider">Kharghar Office</span>
                    <span className="text-[10px] uppercase bg-gray-100 text-gray-600 font-semibold px-3 py-1 font-mono tracking-wider">Concept Moodboards</span>
                    <span className="text-[10px] uppercase bg-gray-100 text-gray-600 font-semibold px-3 py-1 font-mono tracking-wider">Budget Alignment</span>
                  </div>
                </div>
              </div>

              {/* Step 2: 3D Render */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center process-step relative">
                {/* Mobile laser indicator */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gray-100 md:hidden">
                  <div className="w-full bg-gold" style={{ height: scrollProgress > 0.5 ? '100%' : '0%' }} />
                </div>
                
                <div className="lg:col-span-4 flex items-center md:items-start gap-4 pl-4 md:pl-0">
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-none font-serif text-lg font-bold border transition-colors duration-500 ${
                    scrollProgress > 0.5 ? 'bg-gold border-gold text-[#222222] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-transparent border-gray-300 text-gray-400'
                  }`}>
                    02
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#222222]">Cinematic 3D Renders</h3>
                    <p className="text-[10px] text-gold uppercase font-mono mt-0.5 tracking-wider font-semibold">Phase Two: Blueprint</p>
                  </div>
                </div>

                <div className="lg:col-span-8 pl-4 md:pl-0">
                  <p className="text-sm md:text-base text-gray-600 font-sans tracking-wide leading-relaxed">
                    We build detailed orthogonal projections and premium panoramic 3D models of your customized spacing layout. You can visualize chandeliers, backsplash tiling, and modular profiles prior to starting carpentry.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className="text-[10px] uppercase bg-gold/5 text-gold border border-gold/20 font-semibold px-3 py-1 font-mono tracking-wider">High Fidelity 3D walkthrough</span>
                    <span className="text-[10px] uppercase bg-gray-100 text-gray-600 font-semibold px-3 py-1 font-mono tracking-wider">Illumination mapping</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Handover */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center process-step relative">
                {/* Mobile laser indicator */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gray-100 md:hidden">
                  <div className="w-full bg-gold" style={{ height: scrollProgress > 0.8 ? '100%' : '0%' }} />
                </div>
                
                <div className="lg:col-span-4 flex items-center md:items-start gap-4 pl-4 md:pl-0">
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-none font-serif text-lg font-bold border transition-colors duration-500 ${
                    scrollProgress > 0.8 ? 'bg-gold border-gold text-[#222222] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-transparent border-gray-300 text-gray-400'
                  }`}>
                    03
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#222222]">Turnkey Handover</h3>
                    <p className="text-[10px] text-gold uppercase font-mono mt-0.5 tracking-wider font-semibold">Phase Three: Delivery</p>
                  </div>
                </div>

                <div className="lg:col-span-8 pl-4 md:pl-0">
                  <p className="text-sm md:text-base text-gray-600 font-sans tracking-wide leading-relaxed">
                    Under strict supervision, our team of highly skilled Navi Mumbai artisans and modular furniture carpenters install your design with premium grade materials. We execute the final clean-up for a seamless, turnkey reveal!
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className="text-[10px] uppercase bg-gray-100 text-gray-600 font-semibold px-3 py-1 font-mono tracking-wider">Finest Wood Selection</span>
                    <span className="text-[10px] uppercase bg-gray-100 text-gray-600 font-semibold px-3 py-1 font-mono tracking-wider">Turnkey Cleaning</span>
                    <span className="text-[10px] uppercase bg-gold/5 text-gold border border-gold/20 font-semibold px-3 py-1 font-mono tracking-wider">Design Integrity Match</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: High-Converting Fluid Contact Module */}
      <section 
        id="contact"
        className="relative py-24 md:py-32 overflow-hidden z-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col items-start gap-4">
              <span 
                className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold border-b border-gold/40 pb-1 gsap-section-subtitle"
                style={{ opacity: 0 }}
              >
                Initiate Project
              </span>
              <h2 
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#222222] leading-tight gsap-section-title"
                style={{ opacity: 0 }}
              >
                Let&apos;s Build Your Dream Space
              </h2>
              <p className="text-sm text-gray-600 font-sans tracking-wide leading-relaxed max-w-md mt-2">
                We are based inside **Omkar Empire, Sector 10, Kharghar**. Stop by for coffee or drop us a consultation message below to secure your free design estimation.
              </p>

              {/* Direct Touch Points */}
              <div className="flex flex-col gap-4 w-full mt-6">
                <div className="flex items-center gap-4 bg-white border border-gray-100 p-4 rounded-sm shadow-[0_5px_20px_rgba(34,34,34,0.015)]">
                  <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center text-gold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Call Design Desk</h4>
                    <p className="text-sm font-bold text-[#222222] font-mono mt-0.5">+91 84549 58813</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white border border-gray-100 p-4 rounded-sm shadow-[0_5px_20px_rgba(34,34,34,0.015)]">
                  <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center text-gold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Studio Location</h4>
                    <p className="text-sm font-semibold text-gray-700 mt-0.5 leading-snug">
                      Omkar Empire, Sector 10, Kharghar, Panvel, Navi Mumbai
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-2 mt-6 bg-gold/5 border border-gold/20 px-4 py-2">
                <Sparkles className="w-4 h-4 text-gold animate-spin" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#222222]">
                  Premium Design Garantee
                </span>
              </div>
            </div>

            {/* Right Card Column: Smooth, floating glassmorphic form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gold/15 p-8 md:p-12 shadow-[0_30px_80px_rgba(34,34,34,0.06)] rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-gold via-gold-light to-gold" />
                
                {formSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center justify-center py-16 gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2 shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#222222]">Consultation Triggered!</h3>
                    <p className="text-sm text-gray-500 max-w-sm tracking-wide leading-relaxed">
                      Your spatial coordinates are generated. We are automatically redirecting you to WhatsApp to instantly connect with our designer...
                    </p>
                    <span className="text-xs font-mono bg-green-50 text-green-600 px-3 py-1 mt-2 rounded">
                      Redirecting securely to +91 84549 58813
                    </span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#222222]">Schedule Studio Consultation</h3>
                      <p className="text-xs text-gray-400">Share your details and unlock layout solutions within hours.</p>
                    </div>

                    {/* Input Field: Name */}
                    <div className="relative border-b border-gray-200 py-2 focus-within:border-gold transition-colors duration-300">
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Type your name..."
                        className="floating-label-input peer w-full bg-transparent border-none text-[#222222] placeholder-transparent focus:ring-0 focus:outline-none text-sm pt-4"
                      />
                      <label className="absolute left-0 top-0 text-xs text-gray-400 transition-all duration-300 pointer-events-none origin-left transform translate-y-4 peer-placeholder-shown:translate-y-4 peer-focus:-translate-y-1.5 peer-focus:scale-85 peer-focus:text-gold">
                        Your Full Name
                      </label>
                    </div>

                    {/* Input Field: Phone */}
                    <div className="relative border-b border-gray-200 py-2 focus-within:border-gold transition-colors duration-300">
                      <input 
                        type="tel" 
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91..."
                        className="floating-label-input peer w-full bg-transparent border-none text-[#222222] placeholder-transparent focus:ring-0 focus:outline-none text-sm pt-4"
                      />
                      <label className="absolute left-0 top-0 text-xs text-gray-400 transition-all duration-300 pointer-events-none origin-left transform translate-y-4 peer-placeholder-shown:translate-y-4 peer-focus:-translate-y-1.5 peer-focus:scale-85 peer-focus:text-gold">
                        Mobile Phone Number
                      </label>
                    </div>

                    {/* Grid Selection fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
                      
                      {/* Select Project Type */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Project Selection</label>
                        <select 
                          value={formType}
                          onChange={(e) => setFormType(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-gray-200 text-[#222222] text-xs px-3 py-3 rounded-none focus:outline-none focus:border-gold"
                        >
                          <option value="Luxury Living Room">Luxury Living Room</option>
                          <option value="Modular Kitchen">Modular Kitchen</option>
                          <option value="Bespoke Wardrobes">Bespoke Bed &amp; Wardrobes</option>
                          <option value="Premium Penthouse / Apartment">Premium Flat Interior</option>
                          <option value="Commercial Office Space">Sleek Commercial Space</option>
                        </select>
                      </div>

                      {/* Select Budget Frame */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Approximate Budget</label>
                        <select 
                          value={formBudget}
                          onChange={(e) => setFormBudget(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-gray-200 text-[#222222] text-xs px-3 py-3 rounded-none focus:outline-none focus:border-gold"
                        >
                          <option value="₹2.5L - ₹5L">₹2.5 Lacs - ₹5 Lacs</option>
                          <option value="₹5L - ₹10L">₹5 Lacs - ₹10 Lacs</option>
                          <option value="₹10L - ₹20L">₹10 Lacs - ₹20 Lacs</option>
                          <option value="Above ₹20L">Premium Space (Above ₹20 Lacs)</option>
                        </select>
                      </div>

                    </div>

                    {/* Input Field: Message */}
                    <div className="relative border-b border-gray-200 py-2 focus-within:border-gold transition-colors duration-300">
                      <textarea 
                        rows={2}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="What are your requirements?"
                        className="floating-label-input peer w-full bg-transparent border-none text-[#222222] placeholder-transparent focus:ring-0 focus:outline-none text-sm pt-4 resize-none"
                      />
                      <label className="absolute left-0 top-0 text-xs text-gray-400 transition-all duration-300 pointer-events-none origin-left transform translate-y-4 peer-placeholder-shown:translate-y-4 peer-focus:-translate-y-1.5 peer-focus:scale-85 peer-focus:text-gold">
                        Requirement Details (Optional)
                      </label>
                    </div>

                    {/* Initiate Project Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-[#222222] text-[#FAF9F6] border border-gold/20 font-bold text-xs uppercase tracking-[0.2em] py-4 shadow-xl cursor-pointer hover:bg-gold hover:text-black hover:border-gold transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Initiate Project Consultation</span>
                    </motion.button>

                    {/* Pulsating prominent WhatsApp shortcut button directly linking */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                      <p className="text-[10px] text-gray-450 uppercase tracking-widest text-center">Or connect instantly via secure messenger</p>
                      <a 
                        href="https://wa.me/918454958813?text=Hi%20Shree%20Interior%20Designer,%20I%20visited%20your%20website%20and%20would%20like%20to%20consult%20for%20my%20home%20design."
                        target="_blank"
                        className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(37,211,102,0.25)] relative transition-all duration-300 group"
                      >
                        {/* Shimmer pulse effect border */}
                        <span className="absolute inset-x-0 bottom-0 top-0 h-full w-full rounded-none border border-green-400 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-1 animate-ping" />
                        <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse flex-shrink-0" />
                        WhatsApp Design Desk (+91 84549 58813)
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: Architectural Footer */}
      <footer 
        id="footer"
        className="relative bg-charcoal text-[#FAF9F6] pt-16 pb-12 overflow-hidden border-t-2 border-gold/40"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5 items-start">
            
            {/* Column 1: Shree Branding Logo */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <ShreeLogo darkBg />
              <p className="text-xs text-gray-400 tracking-wide leading-relaxed max-w-sm mt-2">
                Shree Interior Designer represents elite craftsmanship, functional modular blueprint layouts, and premium turnkey spatial execution in Kharghar and Panvel, Navi Mumbai.
              </p>
            </div>

            {/* Column 2: Studio Locations */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold">Design Studio</h4>
              <div className="flex items-start gap-3 mt-1.5">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs text-gray-300 font-bold">Omkar Empire HQ</p>
                  <address className="text-xs text-gray-400 not-italic leading-relaxed">
                    Shop No. 4, Omkar Empire, Sector 10, Kharghar, Panvel, Navi Mumbai, Maharashtra 410210
                  </address>
                </div>
              </div>
            </div>

            {/* Column 3: Quick Direct Contact Desk */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold">Direct Contact Desk</h4>
              <ul className="flex flex-col gap-3.5 mt-2">
                <li className="flex items-center gap-3">
                  <div className="whatsapp-pulse flex-shrink-0" />
                  <a 
                    href="https://wa.me/918454958813" 
                    target="_blank" 
                    className="text-xs text-gold hover:text-white transition-colors font-mono font-semibold flex items-center gap-1.5"
                  >
                    +91 84549 58813 (WhatsApp Active)
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <a href="tel:+918454958813" className="text-xs text-gray-300 hover:text-gold transition-colors font-mono">
                    Direct Call: +91 84549 58813
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-xs text-gray-400 font-mono">
                    Open Mon - Sun: 10AM - 9PM
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Core Architectural copyright signature bar */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div className="flex gap-4">
              <span className="font-mono">Kharghar Navi Mumbai</span>
              <span>•</span>
              <span className="font-mono">Premium Turnkey Interiors</span>
            </div>
            <div className="text-center sm:text-right font-sans tracking-wide">
              <span>© 2026 Shree Interior Designer. All rights reserved.</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
