"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search } from "lucide-react";


const CSS_VARS = {
  
  titleFont: "'Manrope', sans-serif",
  bodyFont: "'Inter', sans-serif",
  styleFont: "'Montez', cursive",
};


const photos = [
  { src: "/assets/images/gallery/tour-hunza-1.jpg", alt: "Attabad Lake, Hunza" },
  { src: "/assets/images/gallery/tour-hunza-2.jpg", alt: "Janabad Passu, Hunza" },
  { src: "/assets/images/gallery/tour-hunza-3.jpg", alt: "Fairy Meadows, Hunza" },
  { src: "/assets/images/gallery/tour-hunza-4.jpg", alt: "Hussaini Suspension Bridge, Gojal, Hunza" },
  { src: "/assets/images/gallery/tour-skardu-2.jpg", alt: "Swat Valley" },
  { src: "/assets/images/gallery/tour-kashmir-1.jpg", alt: "Kashmir" },
  { src: "/assets/images/gallery/tour-skardu-5.jpg", alt: "Skardu" },
];

// Layout config: each card gets a height and an optional flex-grow
// Mirrors the screenshot: left small | 2 stacked medium | 1 tall large (center) | 2 stacked medium | 1 small right
const layout = [
  { heightClass: "h-[320px]", flex: "flex-none w-[200px]" },           // 0 - left single tall card
  { heightClass: "h-[155px]", flex: "flex-none w-[185px]" },           // 1 - top-left of stacked pair
  { heightClass: "h-[155px]", flex: "flex-none w-[185px]" },           // 2 - bottom-left of stacked pair
  { heightClass: "h-[320px]", flex: "flex-none w-[280px]" },           // 3 - big center card
  { heightClass: "h-[155px]", flex: "flex-none w-[185px]" },           // 4 - top-right stacked pair
  { heightClass: "h-[155px]", flex: "flex-none w-[185px]" },           // 5 - bottom-right stacked pair
  { heightClass: "h-[320px]", flex: "flex-none w-[200px]" },           // 6 - right single tall card
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
<style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Manrope:wght@200..800&family=Montez&display=swap');

    /* ── CSS variables ── */
    :root {
      --title-font: ${CSS_VARS.titleFont};
      --body-font: ${CSS_VARS.bodyFont};
      --style-font: ${CSS_VARS.styleFont};
      
    }

  `}</style>
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "100px",
        paddingBottom: "110px",
        fontFamily: "'Lato', sans-serif",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="container mx-auto px-[15px] max-w-[1200px] w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h6
            className="text-[48px] leading-[1.71em] tracking-[0.05em] font-black "
            style={{ color: "#4c86fa", fontFamily:"var(--style-font)" }}
          >
            Captured Moments
          </h6>
          <h2 className="text-[32px] leading-[1em] tracking-[0.05em] font-black pb-[20px] text-black" style={{fontFamily:"var(--title-font)"}}>
            Photo Gallery
          </h2>
          
        </div>

        {/* ── Mosaic Row (desktop) ───────────────────────────────────────── */}
        <div className="hidden md:flex items-center justify-center gap-[12px]">

          {/* Column 0 – single tall card */}
          <div className="flex-none w-[200px] h-[155px]">
            <GalleryCard photo={photos[0]} index={0} onClick={() => setLightbox(0)} />
          </div>

          {/* Column 1 – two stacked cards */}
          <div className="flex-none w-[185px] flex flex-col gap-[12px]">
            <div className="h-[155px]">
              <GalleryCard photo={photos[1]} index={1} onClick={() => setLightbox(1)} />
            </div>
            <div className="h-[155px]">
              <GalleryCard photo={photos[2]} index={2} onClick={() => setLightbox(2)} />
            </div>
          </div>

          {/* Column 2 – large center hero card */}
          <div className="flex-none w-[280px] h-[420px]">
            <GalleryCard photo={photos[3]} index={3} onClick={() => setLightbox(3)} />
          </div>

          {/* Column 3 – two stacked cards */}
          <div className="flex-none w-[185px] flex flex-col gap-[12px]">
            <div className="h-[155px]">
              <GalleryCard photo={photos[4]} index={4} onClick={() => setLightbox(4)} />
            </div>
            <div className="h-[155px]">
              <GalleryCard photo={photos[5]} index={5} onClick={() => setLightbox(5)} />
            </div>
          </div>

          {/* Column 4 – single tall card */}
          <div className="flex-none w-[200px] h-[155]">
            <GalleryCard photo={photos[6]} index={6} onClick={() => setLightbox(6)} />
          </div>
        </div>

        {/* ── Mobile fallback 2-column grid ─────────────────────────────── */}
        <div className="md:hidden grid grid-cols-2 gap-[10px]">
          {photos.map((photo, i) => (
            <div key={i} className={`h-[160px] ${i === 3 ? "col-span-2 h-[220px]" : ""}`}>
              <GalleryCard photo={photo} index={i} onClick={() => setLightbox(i)} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
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
            style={{ cursor: "pointer" }}
          >
            <X className="h-10 w-10" strokeWidth={1} />
          </button>
          <div className="relative w-full max-w-[1100px] h-[80vh] z-[1010] shadow-2xl rounded-[16px] overflow-hidden bg-black">
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

/* ── Reusable card ────────────────────────────────────────────────────────── */
interface Photo { src: string; alt: string }
interface GalleryCardProps { photo: Photo; index: number; onClick: () => void }

const GalleryCard = ({ photo, index, onClick }: GalleryCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="relative w-full h-full rounded-[16px] overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500"
    style={{ cursor: "pointer" }}
  >
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
      sizes="(max-width: 768px) 50vw, 280px"
    />

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-[#4c86fa] p-3 rounded-full mb-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <Search className="text-white h-4 w-4" />
      </div>
      <p className="text-white text-[12px] font-bold uppercase tracking-[0.08em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 leading-tight">
        {photo.alt}
      </p>
    </div>
  </button>
);

export default GallerySection;