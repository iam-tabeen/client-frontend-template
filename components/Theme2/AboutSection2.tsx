"use client";

import { Shield, Award, Users, MapPin } from "lucide-react";

interface AgencyProps {
  agencyName?: string;
  agencyDescription?: string | null;
  brandColor?: string | null;
  statsData?: { label: string; value: string; icon: any }[];
}

const defaultStats = [
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Users, value: "10K+", label: "Travelers" },
  { icon: Award, value: "8+", label: "Years" },
  { icon: Shield, value: "100%", label: "Safe" },
];

const AboutSection = ({
  agencyName = "PakVoyage",
  agencyDescription,
  brandColor,
  statsData
}: AgencyProps) => {
  const displayStats = statsData || defaultStats;
  const activeColor = brandColor || "#4c86fa";

  return (
    <section 
      className="relative overflow-hidden" 
      style={{ 
        paddingTop: '100px',
        paddingBottom: '110px',
        fontFamily: "'Lato', sans-serif",
        backgroundColor: "#edf3ff", 
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
          /* NOTE: If you manually created a bottom image, change this to your '-bottom.png' 
             and remove the '-scale-y-100' class below! */
          src="/assets/top-border-styled.png" 
          alt="bottom border" 
          className="mx-auto h-auto block -scale-y-100" 
        />
      </div>

      {/* Main Content (z-10 keeps it above the background images) */}

      {/* Main Content (z-10 keeps it above the background images) */}

      {/* Main Content (z-10 keeps it above the background images) */}
      <div className="container mx-auto px-[15px] max-w-[1200px] w-full relative z-10">
        <div className="flex flex-wrap -mx-[15px] items-center">
          
          {/* Text & Stats Side */}
          <div className="w-full lg:w-1/2 px-[15px] mb-[60px] lg:mb-0">
            
            <div className="mb-[40px]">
              <p 
                className="text-[14px] leading-[1.71em] tracking-[0.05em] font-black uppercase pb-[10px]"
                style={{ color: 'var(--theme-accent, #4c86fa)' }}
              >
                Who We Are
              </p>
              
              <h2 
                className="text-[36px] leading-[1em] tracking-[0.05em] font-black pb-[20px]"
                style={{ color: 'var(--theme-heading, #000)' }}
              >
                Your Trusted Partner
              </h2>
              
              <div className="text-[18px] leading-[1.66em] tracking-[0.05em] text-[#777] space-y-[20px] pr-[20px]" style={{fontFamily:"var(--font-poppins)", fontWeight:"normal"}}>
                {agencyDescription ? (
                  <p>{agencyDescription}</p>
                ) : (
                  <>
                    <p>
                      {agencyName} is a leading domestic tour agency, dedicated to showcasing the
                      breathtaking beauty of northern Pakistan. From the ancient Silk Road trails of Hunza
                      to the crystal-clear lakes of Skardu, we craft journeys that go beyond sightseeing.
                    </p>
                    <p>
                      Our team of experienced local guides ensures every trip is safe, comfortable, and filled
                      with authentic cultural experiences.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex flex-wrap -mx-[10px]">
              {displayStats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="w-1/2 sm:w-1/4 px-[10px] mb-[20px] sm:mb-0 text-center">
                  <div className="bg-[#edf3ff] rounded-[6px] p-[20px] h-full transition-all duration-300 hover:bg-white group cursor-pointer shadow-md hover:shadow-md border border-white/50">
                    <Icon
                      className="h-[30px] w-[30px] mx-auto mb-[15px] transition-colors duration-300 group-hover:text-gray"
                      style={{ color: 'var(--theme-primary, #4c86fa)' }}
                      strokeWidth={1.5}
                    />
                    <p 
                      className="text-[24px] leading-[1em] font-black tracking-[0.05em] transition-colors duration-300 group-hover:text-white"
                      style={{ color: 'var(--theme-heading, #000)' }}
                    >
                      {value}
                    </p>
                    <p className="text-[12px] leading-[1.71em] font-black uppercase tracking-[0.05em] text-[#777] mt-[5px] group-hover:text-gray-500 transition-colors duration-300">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* 🌟 NEW PREMIUM LAYERED GALLERY 🌟 */}
          <div className="w-full lg:w-1/2 px-[15px]">
            <div className="relative h-[550px] w-full mt-[20px] lg:mt-0">
              
              {/* Main Background Image (Right aligned) */}
              <div className="absolute top-0 right-0 w-[75%] h-[400px] rounded-[6px] overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-500 z-0">
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 z-10" />
                <img src="/mountains.jpg" alt="Mountain landscape" className="w-full h-full object-cover" />
              </div>

              {/* Secondary Overlapping Image (Bottom Left) */}
              <div 
                className="absolute bottom-0 left-0 w-[55%] h-[300px] rounded-[14px] shadow-2xl z-10 transform hover:-translate-y-2 transition-transform duration-500"
                style={{ border: '10px solid #edf3ff' }}
              >
                <div className="w-full h-full rounded-[6px] overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src="/valley.jpg" alt="Valley view" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Tertiary Accent Image (Floating Top Left) */}
              <div 
                className="absolute top-[50px] left-[5%] w-[35%] h-[180px] rounded-[12px] shadow-xl z-20 transform hover:-translate-y-2 transition-transform duration-500 hidden sm:block"
                style={{ border: '8px solid #edf3ff' }}
              >
                <div className="w-full h-full rounded-[6px] overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src="/peaks.jpg" alt="Scenic peaks" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Multi-tenant accent decoration */}
              <div
                className="absolute -bottom-[30px] -right-[30px] w-[150px] h-[150px] rounded-full -z-10 opacity-30 blur-3xl pointer-events-none"
                style={{ backgroundColor: activeColor }}
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;