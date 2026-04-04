"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search } from "lucide-react";

const photos = [
  { src: "/assets/images/gallery/tour-hunza-1.jpg", alt: "Attabad Lake, Hunza", span: "col-span-2 row-span-2" },
  { src: "/assets/images/gallery/tour-hunza-2.jpg", alt: "Janabad Passu, Hunza", span: "" },
  { src: "/assets/images/gallery/tour-hunza-3.jpg", alt: "Fairy Meadows, Hunza", span: "" },
  { src: "/assets/images/gallery/tour-hunza-4.jpg", alt: "Hussaini Suspension Bridge, Gojal, Hunza", span: "" },
  { src: "/assets/images/gallery/tour-skardu-2.jpg", alt: "Swat Valley", span: "" },
  { src: "/assets/images/gallery/tour-kashmir-1.jpg", alt: "Kashmir", span: "" },
  { src: "/assets/images/gallery/tour-skardu-5.jpg", alt: "Skardu", span: "" },
  { src: "/assets/images/gallery/tour-skardu-1.jpg", alt: "Skardu", span: "col-span-2" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section 
      className="relative overflow-hidden" 
      style={{ 
        paddingTop: '100px',
        paddingBottom: '110px',
        fontFamily: "'Lato', sans-serif",
        backgroundColor: "#edf3ff", // Updated background color
      }}
    >
      {/* --- TOP DECORATIVE BORDER --- */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <img 
          src="/assets/top-border-styled.png" 
          alt="top border" 
          className="mx-auto h-auto block" 
        />
      </div>

      {/* --- BOTTOM DECORATIVE BORDER --- */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
        <img 
          src="/assets/top-border-styled.png" 
          alt="bottom border" 
          className="mx-auto h-auto block -scale-y-100" 
        />
      </div>

      <div className="container mx-auto px-[15px] max-w-[1200px] w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h6 
            className="text-[14px] leading-[1.71em] tracking-[0.05em] font-black uppercase mb-[10px]"
            style={{ color: '#4c86fa' }}
          >
            Captured Moments
          </h6>
          <h2 
            className="text-[36px] leading-[1em] tracking-[0.05em] font-black pb-[20px] text-black"
          >
            Photo Gallery
          </h2>
          <p className="text-[18px] leading-[1.66em] font-light tracking-[0.05em] text-[#777] max-w-[700px] mx-auto">
            Stunning glimpses from our tours across Pakistan's northern paradise.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[15px] auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(i)}
              className={`relative rounded-[6px] overflow-hidden group w-full h-full shadow-sm hover:shadow-xl transition-all duration-500 ${photo.span}`}
              style={{cursor:"pointer"}}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-[#4c86fa] p-3 rounded-full mb-3 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <Search className="text-white h-5 w-5" style={{cursor:"pointer"}} />
                </div>
                <p className="text-white text-[14px] font-black uppercase tracking-[0.1em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {photo.alt}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-white/95 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          />
          
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-8 right-8 text-black hover:text-[#4c86fa] transition-colors z-[1010]"
            style={{cursor:"pointer"}}
          >
            <X className="h-10 w-10" strokeWidth={1} />
          </button>
          
          <div className="relative w-full max-w-[1100px] h-[80vh] z-[1010] shadow-2xl rounded-[6px] overflow-hidden bg-black">
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
               <p className="text-white text-[18px] font-light tracking-[0.05em]">
                 {photos[lightbox].alt}
               </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;