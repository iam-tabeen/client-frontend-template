"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";


const SLIDES = [
  {
    video: "https://res.cloudinary.com/dmjgwmkuy/video/upload/v1772434763/3094026-hd_1920_1080_30fps_dr7tmi.mp4",
    title1: "Road Trip",
    title2: "Together",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    video: "https://res.cloudinary.com/dmjgwmkuy/video/upload/v1772435204/3135811-hd_1920_1080_24fps_zos03m.mp4",
    title1: "Wild & Free",
    title2: "Explore",
    desc: "Discover remote landscapes and breathtaking vistas you never knew existed. Pack your bags, chart a course, and let the open road lead you somewhere extraordinary.",
  },
  {
    video: "https://res.cloudinary.com/dmjgwmkuy/video/upload/v1772435301/2099568-hd_1920_1080_30fps_tts8cs.mp4",
    title1: "Chase the",
    title2: "Horizon",
    desc: "Every journey begins with a single mile. From coastal highways to mountain passes, let curiosity be your compass and the world your destination.",
  },
  {
    video: "https://res.cloudinary.com/dmjgwmkuy/video/upload/v1772434763/3094026-hd_1920_1080_30fps_dr7tmi.mp4",
    title1: "Lost in",
    title2: "Paradise",
    desc: "Wander through ancient forests, golden deserts, and crystal-clear waters. The world is vast — all you need is the courage to step outside and begin.",
  },
  {
    video: "https://res.cloudinary.com/dmjgwmkuy/video/upload/v1772435418/2878084-hd_1920_1080_24fps_d77bzf.mp4",
    title1: "New Roads",
    title2: "Await",
    desc: "Leave the familiar behind and embrace the thrill of the unknown. The best memories are always made on the road, shared with the ones you love.",
  },
];

const NAV_LINKS = ["Home", "About", "Explore", "Gallery", "Contact"];

export default function TravelHero() {
  const [current, setCurrent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [wipeState, setWipeState] = useState<"idle" | "in" | "out">("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle autoplay slider
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goToNext();
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, isAnimating]);

  const goToSlide = (index: number) => {
    if (index === current || isAnimating) return;
    setIsAnimating(true);
    setWipeState("in");

    setTimeout(() => {
      setCurrent(index);
      setWipeState("out");

      setTimeout(() => {
        setWipeState("idle");
        setIsAnimating(false);
      }, 520);
    }, 520);
  };

  const goToNext = () => {
    goToSlide((current + 1) % SLIDES.length);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .wipe-overlay {
          clip-path: polygon(0 0, 0 0, 0 50%, 0 100%, 0 100%);
        }
        .wipe-in {
          animation: wipeIn 0.5s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .wipe-out {
          animation: wipeOut 0.5s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes wipeIn {
          0%   { clip-path: polygon(-10% 0%, -10% 0%,  10% 50%, -10% 100%, -10% 100%); }
          100% { clip-path: polygon(-10% 0%, 110% 0%,  130% 50%, 110% 100%, -10% 100%); }
        }
        @keyframes wipeOut {
          0%   { clip-path: polygon(-10% 0%, 110% 0%,  130% 50%, 110% 100%, -10% 100%); }
          100% { clip-path: polygon(110% 0%, 110% 0%,  130% 50%, 110% 100%, 110% 100%); }
        }
      `}} />

      {/* Header */}
      

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${
          isMobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--theme-primary)" }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link}
            href="#"
            onClick={() => setIsMobileNavOpen(false)}
            className="text-4xl font-bold uppercase tracking-widest text-white transition-colors hover:opacity-80"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {link}
          </Link>
        ))}
      </div>

      

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
      <div className="w-100 h-100 " style={{backgroundClip:"red"}} >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-400 ${
              current === i ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-50"
            >
              <source src={slide.video} type="video/mp4" />
            </video>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

            {/* Content */}
            <div className="absolute top-1/2 left-5 md:left-12 -translate-y-1/2 z-10 max-w-full md:max-w-xl pr-5 md:pr-0">
              <h1
                className={`text-[clamp(2.4rem,11vw,3.2rem)] md:text-[clamp(3rem,6vw,4.8rem)] font-black uppercase tracking-tight leading-[0.95] transition-all duration-600 delay-150 ${
                  current === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ fontFamily: "var(--font-poppins)", color: "var(--theme-heading)" }}
              >
                {slide.title1}
                <span style={{ color: "var(--theme-accent)" }}>.</span>
                <br />
                {slide.title2}
              </h1>
              <p
                className={`mt-3 md:mt-5 text-[0.84rem] md:text-[0.95rem] text-white/80 leading-relaxed max-w-lg line-clamp-3 md:line-clamp-none transition-all duration-600 delay-300 ${
                  current === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {slide.desc}
              </p>
              <Link
                href="#"
                className={`inline-block mt-5 md:mt-7 px-6 py-2.5 md:px-8 md:py-3 text-[0.82rem] md:text-[0.88rem] font-medium tracking-wide transition-all duration-600 delay-[450ms] hover:opacity-90 ${
                  current === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ backgroundColor: "var(--theme-button)", color: "#fff", borderRadius:"10px" }}
              >
                Read More
              </Link>
            </div>
          </div>
          
        ))}

     

        {/* Dot Navigation */}
        <div className="absolute bottom-6 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                current === i ? "scale-125" : "bg-white/40 hover:bg-white/60"
              }`}
              style={current === i ? { backgroundColor: "var(--theme-accent)" } : {}}
            />
          ))}
        </div>
        </div>
      </section>

      {/* Wipe Animation Overlay */}
      <div
        className={`absolute inset-0 z-[200] pointer-events-none wipe-overlay ${
          wipeState === "in" ? "wipe-in" : wipeState === "out" ? "wipe-out" : ""
        }`}
        style={{ backgroundColor: "var(--theme-primary)" }}
      />
    </>
  );
}