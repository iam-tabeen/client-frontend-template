import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Tour {
  id: string | number;
  title: string;
  destination?: string;
  coverImage?: string;
  duration?: string;
  basePrice: number;
  transportType?: string;
  accommodation?: string;
  rating?: number;
  reviewCount?: number;
  departureType?: string;
  departureDate?: string;
  departureEveryYear?: boolean;
  maxCapacity?: number | null;
  bookedSpots?: number;
}

interface TourCardProps {
  tour: Tour;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDepartureDisplay(tour: Tour): string {
  if (tour.departureType !== 'CUSTOM_DATE' || !tour.departureDate) {
    return "Departure: Client Choice";
  }

  const d = new Date(tour.departureDate);

  if (tour.departureEveryYear) {
    const today = new Date();
    let targetDate = new Date(today.getFullYear(), d.getMonth(), d.getDate());

    if (targetDate < today) {
      targetDate.setFullYear(today.getFullYear() + 1);
    }
    
    return `Departure: ${targetDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  }

  return `Departure: ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

/** Screenshot-style Star Rating */
function StarRating({ rating = 5 }: { rating?: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i <= Math.round(rating) ? "#FF8A00" : "#E5E7EB"}
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );
  }
  return <div className="flex gap-[2px]">{stars}</div>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TourCard({ tour }: TourCardProps) {
  // Assuming rating is passed or defaults to 5 to match the screenshot design
  const rating = tour.rating ?? 4.8; 

  const getTransportIcon = (type?: string) => {
    const t = type?.toLowerCase() || "car";
    
    if (t.includes("plane") || t.includes("flight")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 550" className="w-[14px] h-[14px] fill-current">
          <path d="M544 192c35.3 0 64 28.7 64 64s-28.7 64-64 64l-105 0-171.2 186.8c-3 3.3-7.3 5.2-11.8 5.2l-80 0c-5.1 0-10-2.5-13-6.6s-3.8-9.5-2.2-14.4l57-170.9-58.1 0-59.2 74c-3 3.8-7.6 6-12.5 6l-48 0c-4.9 0-9.6-2.3-12.6-6.2s-4.1-8.9-2.9-13.7l31-124.1-31-124.1c-1.2-4.8-.1-9.8 2.9-13.7S35.1 112 40 112l48 0c4.9 0 9.5 2.2 12.5 6l59.2 74 58.1 0-57-170.9c-1.6-4.9-.8-10.2 2.2-14.4S170.9 0 176 0l80 0c4.5 0 8.8 1.9 11.8 5.2L439 192 544 192zm32 64c0-17.7-14.3-32-32-32l-392 0c-4.9 0-9.5-2.2-12.5-6l-59.2-74-19.8 0 27 108.1c.6 2.5 .6 5.2 0 7.8l-27 108.1 19.8 0 59.2-74c3-3.8 7.6-6 12.5-6l392 0c17.7 0 32-14.3 32-32zM395.6 320l-144.1 0-53.3 160 50.8 0 146.7-160zM249 32l-50.8 0 53.3 160 144.1 0-146.7-160z"/>
        </svg>
      );
    }
    if (t.includes("bus")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 512" className="w-[14px] h-[14px] fill-current">
          <path d="M488.2 .2C572.8 4.5 640 74.4 640 160l0 224-.3 6.5c-3.1 30.1-27 54.1-57.1 57.1l-6.5 .3-5.6 0c-13.2 37.3-48.6 64-90.4 64s-77.3-26.7-90.4-64l-139.1 0c-13.2 37.3-48.7 64-90.4 64s-77.2-26.7-90.4-64l-5.6 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 384 0 96C0 44.6 40.3 2.7 91.1 .1L96 0 480 0 488.2 .2zM160 352a64 64 0 1 0 0 128 64 64 0 1 0 0-128zm320 0a64 64 0 1 0 0 128 64 64 0 1 0 0-128zM32 224l0 160c0 17.7 14.3 32 32 32 0-53 43-96 96-96s96 43 96 96l128 0c0-41.8 26.7-77.3 64-90.4l0-101.6-416 0zm448 96c53 0 96 43 96 96 17.7 0 32-14.3 32-32l0-224c0-70.7-57.3-128-128-128l0 288zM256 192l192 0 0-160-192 0 0 160zM96 32C60.7 32 32 60.7 32 96l0 96 192 0 0-160-128 0z"/>
        </svg>
      );
    }
    
    // Default: Car
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-[14px] h-[14px] fill-current">
        <path d="M171.3 64c-19.6 0-37.3 11.9-44.6 30.2l-39.1 97.8 136.4 0 0-128-52.7 0zM256 192l216 0-81.6-108.8C381.3 71.1 367.1 64 352 64l-96 0 0 128zm256 0c70.7 0 128 57.3 128 128l0 16c0 35.3-28.7 64-64 64l-16.4 0c-4 44.9-41.7 80-87.6 80s-83.6-35.1-87.6-80l-144.7 0c-4 44.9-41.7 80-87.6 80s-83.6-35.1-87.6-80l-.4 0c-35.3 0-64-28.7-64-64l0-80c0-31.5 22.8-57.7 52.8-63L97.1 82.3C109.2 51.9 138.6 32 171.3 32L352 32c25.2 0 48.9 11.9 64 32l96 128zM387.3 368c10.4-36.9 44.4-64 84.7-64s74.2 27.1 84.7 64l19.3 0c17.7 0 32-14.3 32-32l0-16c0-53-43-96-96-96L64 224c-17.7 0-32 14.3-32 32l0 80c0 17.7 14.3 32 32 32l3.3 0c10.4-36.9 44.4-64 84.7-64s74.2 27.1 84.7 64l150.6 0zM152 448a56 56 0 1 0 0-112 56 56 0 1 0 0 112zm376-56a56 56 0 1 0 -112 0 56 56 0 1 0 112 0z"/>
      </svg>
    );
  };

  // --- FOMO CAPACITY LOGIC ---
  const hasCapacityLimit = tour.maxCapacity !== null && tour.maxCapacity !== undefined;
  
  const availableSpots = hasCapacityLimit ? (tour.maxCapacity as number) - (tour.bookedSpots || 0) : null;
  
  const isSoldOut = hasCapacityLimit && availableSpots !== null && availableSpots <= 0;
  const isAlmostFull = hasCapacityLimit && availableSpots !== null && availableSpots > 0 && availableSpots <= 5;

  return (
    <div className="group w-full max-w-[350px] bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full font-sans transition-all duration-600 hover:shadow-xl hover:-translate-y-1.5">

      {/* ── Top Image Section ── */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-110"
          src={tour.coverImage || "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
          alt={tour.title}
        />
        
        {/* FOMO BADGE */}
        {hasCapacityLimit && (
          <div className="absolute top-3 left-3 z-10">
            {isSoldOut ? (
              <span className="bg-black/60 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-sm font-semibold backdrop-blur-sm">
                Sold out
              </span>
            ) : isAlmostFull ? (
              <span className="bg-black/60 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-sm font-semibold backdrop-blur-sm flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[10px] h-[12px] fill-[#FF8C00]">
                  <path d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"/>
                </svg>
                {availableSpots} Spots Left
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* ── Content Section ── */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Destination Subtitle */}
        {tour.destination && (
          <div className="text-gray-500 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mb-1.5">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-[9px] fill-current">
               <path d="M192 284.4C256.1 269.9 304 212.5 304 144 304 64.5 239.5 0 160 0S16 64.5 16 144c0 68.5 47.9 125.9 112 140.4L128 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-195.6zM168 96c-30.9 0-56 25.1-56 56 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4 46.6-104 104-104 13.3 0 24 10.7 24 24s-10.7 24-24 24z"/>
             </svg> 
             {tour.destination}
          </div>
        )}

        {/* Title */}
        <h3 className="text-[18px] font-medium text-gray-900 leading-snug mb-2 line-clamp-2">
          <Link href={`/tours/${tour.id}`} className="hover:text-blue-600 transition-colors">
            {tour.title}
          </Link>
        </h3>


        {/* Included Details: Transport & Accommodation */}
        {(tour.transportType || tour.accommodation) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tour.transportType && (
              <span className="flex items-center gap-1.5 border border-gray-400 text-gray-600 px-5 py-1.5 rounded-full text-xs font-medium">
                {getTransportIcon(tour.transportType)}
                {tour.transportType}
              </span>
            )}
            {tour.accommodation && (
              <span className="flex items-center gap-1.5 border border-gray-400 text-gray-600 px-5 py-1.5 rounded-full text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 550" className="w-[14px] h-[14px] fill-current">
                  <path d="M0 16C0 7.2 7.2 0 16 0L496 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0 0 448 16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L16 512c-8.8 0-16-7.2-16-16s7.2-16 16-16l16 0 0-448-16 0C7.2 32 0 24.8 0 16zM64 32l0 448 128 0 0-80-8 0c-13.3 0-24.3-10.9-21-23.8 10.6-41.5 48.2-72.2 93-72.2s82.5 30.7 93 72.2c3.3 12.8-7.8 23.8-21 23.8l-8 0 0 80 128 0 0-448-384 0zM224 400l0 80 64 0 0-80-64 0zm32-64c-23.7 0-44.4 12.9-55.4 32l110.9 0c-11.1-19.1-31.8-32-55.4-32zM232 120c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16 80l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zM136 120c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16 80l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zm176-80c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16 80l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16z"/>
                </svg>
                {tour.accommodation || 'Hotel'}
              </span>
            )}
          </div>
        )}

        {/* Departure Date */}
        <div className="text-[13px] text-gray-600 flex items-center gap-2 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[12px] fill-current">
            <path d="M120 0c13.3 0 24 10.7 24 24l0 40 160 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-40c0-13.3 10.7-24 24-24zm0 112l-56 0c-8.8 0-16 7.2-16 16l0 48 352 0 0-48c0-8.8-7.2-16-16-16l-264 0zM48 224l0 192c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-192-352 0z"/>
          </svg>
          {getDepartureDisplay(tour)}
        </div>

        {/* Price */}
        <div className="mb-2">
          <span className="text-[22px] font-semibold text-gray-900 tracking-tight">
            Rs. {tour.basePrice.toLocaleString()}
          </span>
          <span className="text-[14px] font-normal text-gray-500 ml-1">
            /Person
          </span>
        </div>

        {/* Spacer to push actions to bottom */}
        <div className="flex-grow"></div>

        {/* ── Action Row (Duration + Button) ── */}
        <div className="flex justify-between items-center pt-2 mt-4 border-t border-gray-100">
          
          <span className="text-[14px] text-[#034a5e] flex items-center gap-1.5 font-medium">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {tour.duration ?? '—'}
          </span>
          
          <Link
            href={`/tours/${tour.id}`}
            className="flex items-center gap-1.5 px-5 py-2 border border-gray-200 rounded-full text-[14px] font-medium text-[#034a5e] hover:text-white bg-white hover:bg-[var(--theme-primary)] transition-colors duration-500 whitespace-nowrap"
          >
            Book Now
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          
        </div>
      </div>
    </div>
  );
}