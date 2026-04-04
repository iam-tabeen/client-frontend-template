"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

// Replace these paths with your actual asset structure


const photos = [
  { src: "/assets/images/gallery/tour-hunza-1.jpg", alt: "Attabad Lake, Hunza", span: "col-span-2 row-span-2", blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" },
  { src: "/assets/images/gallery/tour-hunza-2.jpg", alt: "Janabad Passu, Hunza", span: "" , blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" },
  { src: "/assets/images/gallery/tour-hunza-3.jpg", alt: "Fairy Meadows, Hunza", span: "" , blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" },
  { src: "/assets/images/gallery/tour-hunza-4.jpg", alt: "Hussaini Suspension Bridge, Gojal, Hunza", span: "" , blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" },
  { src: "/assets/images/gallery/tour-skardu-2.jpg", alt: "Swat Valley", span: "" , blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" },
  { src: "/assets/images/gallery/tour-kashmir-1.jpg", alt: "Kashmir", span: "" , blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" },
  { src: "/assets/images/gallery/tour-skardu-5.jpg", alt: "Skardu", span: "" , blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" },
  { src: "/assets/images/gallery/tour-skardu-1.jpg", alt: "Skardu", span: "col-span-2" , blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  

  return (
    <section className="py-20 bg-[white]" >
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[var(--theme-accent)] font-semibold tracking-widest uppercase text-sm mb-3" style={{ color: 'var(--theme-accent)', fontFamily: 'var(--font-montez)' , fontWeight:"bold", fontSize:"1rem" }} >
            Captured Moments
          </p>
          <h2 
            className="section-heading text-[var(--theme-hea
            ding)] text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--theme-heading)' , fontFamily: 'var(--font-poppins)' , fontWeight:"bold" }}
          >
            Photo Gallery
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Stunning glimpses from our tours across Pakistan's northern paradise.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(i)}
              className={`relative rounded-2xl overflow-hidden group w-full h-full ${photo.span}`}
              style={{cursor:"pointer"}}
            >
              <Image
  src={photo.src}
  alt={photo.alt}
  fill
  className="object-cover transition-transform duration-500 group-hover:scale-110"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
              
              {/* Separate overlay layer to ensure CSS variable opacities work correctly */}
              <div className="absolute inset-0 bg-[black] opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10" />
              
              <div className="absolute inset-0 flex items-end p-4 z-20">
                <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {photo.alt}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" style={{width:"auto !Impostant"}}>
          {/* Robust background layer to support CSS variable formats */}
          <div 
            className="absolute inset-0 bg-[white] opacity-90"
            onClick={() => setLightbox(null)}
          />
          
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-[var(--theme-primary)] hover:text-[var(--theme-heading)] transition-colors z-[60]"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative w-full max-w-5xl h-[85vh] z-[60] pointer-events-none">
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-cover rounded-2xl shadow-2xl  pointer-events-auto"
              sizes="auto"
              
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;