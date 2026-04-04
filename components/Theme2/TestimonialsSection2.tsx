"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed & Fatima",
    trip: "Hunza Honeymoon Tour",
    rating: 5,
    text: "Our honeymoon in Hunza was absolutely magical! PakVoyage handled everything perfectly — from the comfortable Prado ride to the stunning hotels.",
    avatar: "AF",
  },
  {
    name: "Sarah Khan",
    trip: "Fairy Meadows Adventure",
    rating: 5,
    text: "As a solo female traveler, I felt completely safe throughout the trip. The guide was knowledgeable and the trek to Fairy Meadows was surreal.",
    avatar: "SK",
  },
  {
    name: "Bilal Hussain",
    trip: "Skardu Explorer",
    rating: 5,
    text: "Skardu exceeded every expectation. The Deosai plains, Shangrila Lake, and the sheer beauty of Baltistan left us speechless. Flawless planning.",
    avatar: "BH",
  },
  {
    name: "Zara & Ali",
    trip: "Swat Cultural Tour",
    rating: 4,
    text: "Swat was an incredible cultural journey. The Buddhist ruins, Malam Jabba, and the warm local hospitality made it a trip to remember.",
    avatar: "ZA",
  },
  {
    name: "M. Usman",
    trip: "Karakoram Highway",
    rating: 5,
    text: "Driving through the 8th wonder of the world with this team was an experience of a lifetime. Highly professional guides and great hotels.",
    avatar: "MU",
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const totalTestimonials = testimonials.length;

  // Responsive logic: Update items to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2); // Tablet
      } else {
        setItemsToShow(3); // Desktop
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 > totalTestimonials - itemsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? totalTestimonials - itemsToShow : prev - 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-white font-lato py-[100px]">
      
      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <img src="/assets/top-border-styled.png" alt="top border" className="mx-auto h-auto block" />
      </div>
      <div className="absolute bottom-5 left-0 w-full pointer-events-none z-0">
        <img src="/assets/top-border-styled.png" alt="bottom border" className="mx-auto h-auto block -scale-y-100" />
      </div>

      <div className="container mx-auto px-[15px] max-w-[1200px] w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[60px] gap-6">
          <div className="max-md:text-center">
            <h6 className="text-[14px] leading-[1.71em] tracking-[0.05em] font-black uppercase mb-[10px] text-[#4c86fa]">
              Testimonials
            </h6>
            <h2 className="text-[36px] leading-[1em] tracking-[0.05em] font-black text-black">
              What Our Travelers Say
            </h2>
          </div>
          
          <div className="flex gap-3 max-md:justify-center">
            <button 
              onClick={prevSlide}
              className="w-[50px] h-[50px] rounded-full border-2 border-[#edf3ff] flex items-center justify-center text-[#4c86fa] hover:bg-[#4c86fa] hover:text-white hover:border-[#4c86fa] transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-[50px] h-[50px] rounded-full border-2 border-[#edf3ff] flex items-center justify-center text-[#4c86fa] hover:bg-[#4c86fa] hover:text-white hover:border-[#4c86fa] transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Slider Window */}
        <div className="relative overflow-hidden" style={{ paddingBottom: "30px" }}>
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 px-[15px]"
                style={{ width: `${100 / itemsToShow}%` }} // Dynamic width
              >
                <div className="bg-white rounded-[6px] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#edf3ff] h-full flex flex-col">
                  
                  <div className="flex items-center p-[30px] border-b border-[#edf3ff] bg-white">
                    <div className="flex-shrink-0 w-[60px] h-[60px] rounded-full bg-[#edf3ff] flex items-center justify-center text-[#4c86fa] font-black text-[20px]">
                      {t.avatar}
                    </div>
                    <div className="pl-[20px]">
                      <h5 className="text-[16px] font-black text-black uppercase tracking-[0.05em] mb-[2px]">
                        {t.name}
                      </h5>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={`h-3 w-3 ${s < t.rating ? "text-[#4c86fa] fill-[#4c86fa]" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative p-[30px] flex-grow">
                    <Quote className="absolute top-[15px] left-[20px] h-[50px] w-[50px] text-[#edf3ff] z-0 rotate-180" />
                    <blockquote className="relative z-10 text-[16px] leading-[1.66em] font-light italic tracking-[0.05em] text-[#777]">
                      "{t.text}"
                    </blockquote>
                    <p className="relative z-10 mt-4 text-[11px] font-black text-[#4c86fa] uppercase tracking-[0.1em]">
                      {t.trip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-[0px]">
          {Array.from({ length: totalTestimonials - (itemsToShow - 1) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-8 bg-[#4c86fa]" : "w-2 bg-[#edf3ff] hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;