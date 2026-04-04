"use client";

import { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Map, Compass, ArrowRight } from "lucide-react";

// Import Swiper core and required modules styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Slider Data matching your exact text
const slides = [
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2070&auto=format&fit=crop", 
    subtitle: "Get unforgettable pleasure with us",
    title: "Natural Wonder of the world",
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop", 
    subtitle: "Get unforgettable pleasure with us",
    title: "Let's make your best trip with us",
  },
  {
    id: 3,
    bgImage: "/assets/headerTheme2.jpg", 
    subtitle: "Get unforgettable pleasure with us",
    title: "Explore beauty of the whole world",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = slides.length;

  // Swiper React best practice for custom navigation elements
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section className="relative w-full h-[100vh] min-h-[700px] font-lato bg-black group overflow-hidden" >
      
      <Swiper
        modules={[EffectFade, Navigation, Autoplay]}
        effect="fade"
        speed={1000}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        // Bind the state elements directly to Swiper
        navigation={{ prevEl, nextEl }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="absolute w-full h-full overflow-hidden">
            
            {/* Background Image - Animated via CSS below (Ken Burns Zoom) */}
            <div
              className="slide-bg absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[7000ms] ease-linear"
              style={{ backgroundImage: `url('${slide.bgImage}')` }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Content Container (Left Aligned) */}
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-center text-left px-[30px] md:px-[80px] mx-auto w-full ">
              
              {/* Subtitle */}
              <span 
                className="slide-content slide-subtitle text-white/90 text-[18px] md:text-[28px] md:mt-[120px] font-black tracking-[0.2em] mb-[15px] drop-shadow-md"
                style={{ fontFamily: "var(--font-montez)" }}
              >
                {slide.subtitle}
              </span>
              
              {/* Title */}
              <h1 className="slide-content slide-title text-white text-[40px] md:text-[70px] lg:text-[80px] font-black uppercase leading-[1.1em] tracking-[0.05em] mb-[35px] max-w-[1000px] drop-shadow-lg">
                {slide.title}
              </h1>

              {/* --- HERO BUTTONS --- */}
              <div className="slide-content slide-buttons flex flex-wrap gap-[15px]">
                {/* Primary Filled Button */}
                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center h-[50px] px-[35px] bg-[#4c86fa] text-white text-[14px] font-black uppercase tracking-[0.1em] rounded-[25px] transition-all duration-500 hover:bg-white hover:text-black shadow-lg group"
                >
                  Explore Tours
                  <ArrowRight className="w-4 h-4 ml-2 mb-[2px] group-hover:translate-x-1 transition-transform" />
                </Link>
                
                {/* Secondary Outlined Button */}
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center h-[50px] px-[35px] bg-transparent border-2 border-white text-white text-[14px] font-black uppercase tracking-[0.1em] rounded-[25px] transition-all duration-500 hover:bg-white hover:text-black shadow-lg"
                >
                  Our Services
                </Link>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- BOTTOM RIGHT NAVIGATION & FEATURES BOX --- */}
      <div className="absolute bottom-[30px] right-[30px] z-30 flex flex-col items-end gap-[15px]">
        
        {/* Floating Feature Boxes */}
        <div className="hidden md:flex gap-[15px]">
           <Link href="/tours" className="bg-white/10 backdrop-blur-md border border-white/20 px-[35px] py-[25px] rounded-[6px] text-white flex flex-col items-center hover:bg-[#4c86fa] transition-colors cursor-pointer group">
              <Map className="w-8 h-8 mb-[10px] group-hover:-translate-y-1 transition-transform" />
              <span className="font-black uppercase tracking-[0.1em] text-[12px]">Tours</span>
           </Link>
           <Link href="/custom-tour" className="bg-white/10 backdrop-blur-md border border-white/20 px-[35px] py-[25px] rounded-[6px] text-white flex flex-col items-center hover:bg-[#4c86fa] transition-colors cursor-pointer group">
              <Compass className="w-8 h-8 mb-[10px] group-hover:-translate-y-1 transition-transform" />
              <span className="font-black uppercase tracking-[0.1em] text-[12px] text-center max-w-[100px]">Customize</span>
           </Link>
        </div>

        {/* Counter & Navigation Arrows */}
        <div className="flex items-center justify-between gap-[30px] bg-white/10 backdrop-blur-md px-[30px] py-[15px] rounded-[6px] border border-white/20 w-full">
          <div className="text-white font-black text-[28px] leading-none">
            0{currentSlide} <span className="text-[16px] text-white/50 font-light">/ 0{totalSlides}</span>
          </div>
          <div className="flex gap-[10px]">
            {/* Using ref assignment to bind buttons to state */}
            <button
              ref={(node) => setPrevEl(node)}
              className="w-[45px] h-[45px] rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#4c86fa] hover:border-[#4c86fa] transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              ref={(node) => setNextEl(node)}
              className="w-[45px] h-[45px] rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#4c86fa] hover:border-[#4c86fa] transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* --- ROCK SOLID ANIMATION CSS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Ensure Swiper takes full height */
        .swiper { width: 100%; height: 100%; }
        .swiper-slide { height: 100%; }

        /* Initial Hidden States */
        .slide-bg { transform: scale(1); }
        .slide-content { opacity: 0; transform: translateY(40px); transition: all 1s ease; }
        .slide-subtitle { transition-delay: 0.2s; }
        .slide-title { transition-delay: 0.4s; }
        .slide-buttons { transition-delay: 0.6s; }

        /* Trigger Animations when slide becomes active */
        .swiper-slide-active .slide-bg { transform: scale(1.1); }
        .swiper-slide-active .slide-content { opacity: 1; transform: translateY(0); }
      `}} />
    </section>
  );
}