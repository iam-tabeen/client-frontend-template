"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    price: "$469",
    duration: "5 days 4 night",
    title: "Switzerland",
    image: "/assets/headerTheme2.jpg", // Your original image
    link: "/tours/switzerland"
  },
  {
    id: 2,
    price: "$899",
    duration: "7 days 6 night",
    title: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2070&auto=format&fit=crop", // Placeholder 1
    link: "/tours/maldives"
  },
  {
    id: 3,
    price: "$650",
    duration: "6 days 5 night",
    title: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop", // Placeholder 2
    link: "/tours/japan"
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // Changes slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <>
      {/* Global Fonts & Custom Animation Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900');
        .font-lato { font-family: 'Lato', sans-serif; }
        
        @keyframes fadeUpReveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-up-1 { animation: fadeUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .animate-fade-up-2 { animation: fadeUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
        .animate-fade-up-3 { animation: fadeUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both; }
        .animate-fade-up-4 { animation: fadeUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both; }
      `}} />

      <section id="header" className="relative h-screen w-full font-lato overflow-hidden bg-black">
        
        {/* 1. Crossfading Background Images */}
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 h-full w-full bg-cover bg-center bg-fixed transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}

        {/* 2. Dark Overlay */}
        <div className="absolute inset-0 h-full w-full bg-black/30 z-20 pointer-events-none" />

        {/* 3. Text Content (Re-renders on slide change to trigger animations) */}
        <div className="absolute inset-0 h-full w-full flex items-center z-30 max-md:py-[130px] md:max-lg:py-[160px]">
          <div className="container mx-auto px-[15px] max-w-[1200px] w-full">
            <div className="flex flex-wrap -mx-[15px]">
              <div className="w-full md:w-2/3 lg:w-1/2 px-[15px]">
                
                {/* The key={current} forces React to remount this div, restarting the CSS animations! */}
                <div key={current} className="my-[30px]">
                  
                  <h4 className="text-white text-[36px] max-md:text-[30px] font-black leading-none tracking-[0.05em] pb-[21px] animate-fade-up-1">
                    {slides[current].price}/
                    <small className="text-[14px] font-black text-white tracking-normal ml-2 drop-shadow-md">
                      per person
                    </small>
                  </h4>
                  
                  <h3 className="text-white text-[48px] max-md:text-[34px] font-black leading-none tracking-[0.075em] py-[29px] max-md:py-[14px] animate-fade-up-2 drop-shadow-lg">
                    {slides[current].duration}
                  </h3>
                  
                  <h1 className="text-white text-[80px] max-md:text-[45px] max-md:leading-[50px] font-black leading-none tracking-[0.075em] pb-[35px] animate-fade-up-3 drop-shadow-2xl">
                    {slides[current].title}
                  </h1>
                  
                  <div className="animate-fade-up-4">
                    <Link 
                      href={slides[current].link} 
                      className="inline-block text-[14px] leading-[50px] font-black text-white bg-[#4c86fa] uppercase px-[30px] rounded-[25px] text-center tracking-[0.1em] transition-all duration-500 ease-in-out hover:bg-white hover:text-[#4c86fa] shadow-lg hover:shadow-xl"
                    >
                      Book your seat now
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Manual Navigation Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 text-white hover:bg-[#4c86fa] transition-colors backdrop-blur-sm max-md:hidden"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 text-white hover:bg-[#4c86fa] transition-colors backdrop-blur-sm max-md:hidden"
        >
          <ChevronRight size={32} />
        </button>

        {/* 5. Dot Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current 
                  ? "w-8 h-2.5 bg-[#4c86fa]" 
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>

      </section>
    </>
  );
}