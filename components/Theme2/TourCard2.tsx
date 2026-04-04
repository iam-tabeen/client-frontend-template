import Link from 'next/link';
import Image from 'next/image';

export interface Tour {
  id: string | number;
  title: string;
  destination: string;
  duration: string;
  coverImage?: string;
  transportType?: string;
  accommodation?: string;
  departureType?: string;
  departureDate?: string;
  departureEveryYear?: boolean;
  maxCapacity?: number;
  bookedSpots?: number;
  basePrice: number;
}

function getDepartureDisplay(tour: Tour) {
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

export default function TourCard({ tour }: { tour: Tour }) {
  
  const getTransportIcon = (type?: string) => {
    const t = type?.toLowerCase() || "car";
    const iconColor = "#4c86fa"; 
    
    if (t.includes("plane") || t.includes("flight")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 550" width="20px">
          <path fill={iconColor} d="M544 192c35.3 0 64 28.7 64 64s-28.7 64-64 64l-105 0-171.2 186.8c-3 3.3-7.3 5.2-11.8 5.2l-80 0c-5.1 0-10-2.5-13-6.6s-3.8-9.5-2.2-14.4l57-170.9-58.1 0-59.2 74c-3 3.8-7.6 6-12.5 6l-48 0c-4.9 0-9.6-2.3-12.6-6.2s-4.1-8.9-2.9-13.7l31-124.1-31-124.1c-1.2-4.8-.1-9.8 2.9-13.7S35.1 112 40 112l48 0c4.9 0 9.5 2.2 12.5 6l59.2 74 58.1 0-57-170.9c-1.6-4.9-.8-10.2 2.2-14.4S170.9 0 176 0l80 0c4.5 0 8.8 1.9 11.8 5.2L439 192 544 192zm32 64c0-17.7-14.3-32-32-32l-392 0c-4.9 0-9.5-2.2-12.5-6l-59.2-74-19.8 0 27 108.1c.6 2.5 .6 5.2 0 7.8l-27 108.1 19.8 0 59.2-74c3-3.8 7.6-6 12.5-6l392 0c17.7 0 32-14.3 32-32zM395.6 320l-144.1 0-53.3 160 50.8 0 146.7-160zM249 32l-50.8 0 53.3 160 144.1 0-146.7-160z"/>
        </svg>
      );
    }
    if (t.includes("bus")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 512" width="20px">
          <path fill={iconColor} d="M488.2 .2C572.8 4.5 640 74.4 640 160l0 224-.3 6.5c-3.1 30.1-27 54.1-57.1 57.1l-6.5 .3-5.6 0c-13.2 37.3-48.6 64-90.4 64s-77.3-26.7-90.4-64l-139.1 0c-13.2 37.3-48.7 64-90.4 64s-77.2-26.7-90.4-64l-5.6 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 384 0 96C0 44.6 40.3 2.7 91.1 .1L96 0 480 0 488.2 .2zM160 352a64 64 0 1 0 0 128 64 64 0 1 0 0-128zm320 0a64 64 0 1 0 0 128 64 64 0 1 0 0-128zM32 224l0 160c0 17.7 14.3 32 32 32 0-53 43-96 96-96s96 43 96 96l128 0c0-41.8 26.7-77.3 64-90.4l0-101.6-416 0zm448 96c53 0 96 43 96 96 17.7 0 32-14.3 32-32l0-224c0-70.7-57.3-128-128-128l0 288zM256 192l192 0 0-160-192 0 0 160zM96 32C60.7 32 32 60.7 32 96l0 96 192 0 0-160-128 0z"/>
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20px">
        <path fill={iconColor} d="M171.3 64c-19.6 0-37.3 11.9-44.6 30.2l-39.1 97.8 136.4 0 0-128-52.7 0zM256 192l216 0-81.6-108.8C381.3 71.1 367.1 64 352 64l-96 0 0 128zm256 0c70.7 0 128 57.3 128 128l0 16c0 35.3-28.7 64-64 64l-16.4 0c-4 44.9-41.7 80-87.6 80s-83.6-35.1-87.6-80l-144.7 0c-4 44.9-41.7 80-87.6 80s-83.6-35.1-87.6-80l-.4 0c-35.3 0-64-28.7-64-64l0-80c0-31.5 22.8-57.7 52.8-63L97.1 82.3C109.2 51.9 138.6 32 171.3 32L352 32c25.2 0 48.9 11.9 64 32l96 128zM387.3 368c10.4-36.9 44.4-64 84.7-64s74.2 27.1 84.7 64l19.3 0c17.7 0 32-14.3 32-32l0-16c0-53-43-96-96-96L64 224c-17.7 0-32 14.3-32 32l0 80c0 17.7 14.3 32 32 32l3.3 0c10.4-36.9 44.4-64 84.7-64s74.2 27.1 84.7 64l150.6 0zM152 448a56 56 0 1 0 0-112 56 56 0 1 0 0 112zm376-56a56 56 0 1 0 -112 0 56 56 0 1 0 112 0z"/>
      </svg>
    );
  };

  const hasCapacityLimit = tour.maxCapacity !== null && tour.maxCapacity !== undefined;
  const availableSpots = hasCapacityLimit ? (tour.maxCapacity as number) - (tour.bookedSpots || 0) : null;
  const isSoldOut = hasCapacityLimit && (availableSpots as number) <= 0;
  const isAlmostFull = hasCapacityLimit && (availableSpots as number) > 0 && (availableSpots as number) <= 5;

  return (
    <div className="w-full bg-white rounded-[6px] shadow-sm transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full font-lato overflow-hidden group">
      
      {/* Top Image Section */}
      <div className="relative">
        <img
          className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
          src={tour.coverImage || "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
          alt={tour.title}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-0"></div>
        
        {hasCapacityLimit && (
          <div className="absolute top-[15px] left-[15px] z-10">
            {isSoldOut ? (
              <span className="bg-[#e74c3c] text-white text-[10px] font-black uppercase tracking-[0.1em] px-[12px] py-[6px] rounded-[3px] shadow-sm">
                Sold out
              </span>
            ) : isAlmostFull ? (
              <span className="bg-[#f39c12] text-white text-[10px] font-black uppercase tracking-[0.1em] px-[12px] py-[6px] rounded-[3px] shadow-sm flex items-center gap-1">
                {availableSpots} Spots Left
              </span>
            ) : null}
          </div>
        )}

        <div className="absolute top-[15px] right-[15px] bg-[#4c86fa] text-white px-[12px] py-[6px] rounded-[3px] text-[11px] font-black tracking-[0.1em] uppercase shadow-md z-10 flex items-center gap-[6px]">
          {tour.duration}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-[25px] flex flex-col flex-grow bg-white relative z-20">
        
        {/* Destination Tag */}
        <div className="text-[#4c86fa] flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.05em] mb-[10px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="10px"><path fill="#4c86fa" d="M192 284.4C256.1 269.9 304 212.5 304 144 304 64.5 239.5 0 160 0S16 64.5 16 144c0 68.5 47.9 125.9 112 140.4L128 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-195.6zM168 96c-30.9 0-56 25.1-56 56 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4 46.6-104 104-104 13.3 0 24 10.7 24 24s-10.7 24-24 24z"/></svg> 
          <span className="opacity-70 mr-0"></span> {tour.destination}
        </div>

        {/* Title */}
        <h2 className="text-[22px] font-black leading-[1.3em] tracking-[0.05em] mb-[20px] text-black line-clamp-2 transition-colors duration-300 group-hover:text-[#4c86fa]">
          {tour.title}
        </h2>

        {/* Transport & Accommodation Pills */}
        <div className="flex flex-wrap gap-[10px] mb-[20px]">
          <div className="bg-[#edf3ff] px-[15px] py-[6px] rounded-[25px] flex items-center text-[#777] text-[14px] tracking-[0.05em]" style={{fontFamily:"var(--font-poppins)", fontWeight:"500"}}>
            <span className="mr-[8px]">
              {getTransportIcon(tour.transportType)}
            </span>
            <span className="truncate">{tour.transportType}</span>
          </div>
          
          <div className="bg-[#edf3ff] px-[15px] py-[6px] rounded-[25px] flex items-center text-[#777] text-[14px] tracking-[0.05em]" style={{fontFamily:"var(--font-poppins)", fontWeight:"500"}}>
            <span className="mr-[8px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 550" width="18px"><path fill="#4c86fa" d="M0 16C0 7.2 7.2 0 16 0L496 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0 0 448 16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L16 512c-8.8 0-16-7.2-16-16s7.2-16 16-16l16 0 0-448-16 0C7.2 32 0 24.8 0 16zM64 32l0 448 128 0 0-80-8 0c-13.3 0-24.3-10.9-21-23.8 10.6-41.5 48.2-72.2 93-72.2s82.5 30.7 93 72.2c3.3 12.8-7.8 23.8-21 23.8l-8 0 0 80 128 0 0-448-384 0zM224 400l0 80 64 0 0-80-64 0zm32-64c-23.7 0-44.4 12.9-55.4 32l110.9 0c-11.1-19.1-31.8-32-55.4-32zM232 120c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16 80l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zM136 120c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16 80l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zm176-80c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16 80l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16z"/></svg>
            </span>
            <span>{tour.accommodation || 'Hotel'}</span>
          </div>
        </div>

        {/* Departure Text */}
        <div className="py-[12px] border-t border-b border-[#edf3ff] flex items-center gap-[10px] text-[#777] text-[15px] font-bold tracking-[0.05em]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14px"><path fill="#4c86fa" d="M120 0c13.3 0 24 10.7 24 24l0 40 160 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-40c0-13.3 10.7-24 24-24zm0 112l-56 0c-8.8 0-16 7.2-16 16l0 48 352 0 0-48c0-8.8-7.2-16-16-16l-264 0zM48 224l0 192c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-192-352 0z"/></svg>
          {getDepartureDisplay(tour)}
        </div>

        {/* Bottom Row: Price & Action Button */}
        <div className="flex justify-between items-center mt-auto pt-[20px]">
          <div className="flex flex-col">
            <span className="text-[24px] font-black tracking-[0.05em] text-[#4c86fa] leading-none">
              <span className="text-[14px] text-black mr-1 font-black uppercase">Rs.</span>
              {tour.basePrice.toLocaleString()}
            </span>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">/ Per Person</span>
          </div>
          
          <Link
            href={`/tours/${tour.id}`}
            className="inline-block text-[12px] leading-[36px] font-black text-white bg-[#4c86fa] uppercase px-[20px] rounded-[25px] text-center tracking-[0.1em] transition-all duration-500 ease-in-out hover:bg-black whitespace-nowrap"
          >
            Details
          </Link>
        </div>

      </div>
    </div>
  );
}