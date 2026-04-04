"use client"; // Required for potential Framer Motion animations in the ZIP

import { Shield, Award, Users, MapPin } from "lucide-react";

interface AgencyProps {
  agencyName?: string;
  agencyDescription?: string | null;
  brandColor?: string | null;
  statsData?: { label: string; value: string; icon: any }[];
}

const defaultStats = [
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Users, value: "10K+", label: "Happy Travelers" },
  { icon: Award, value: "8+", label: "Years Experience" },
  { icon: Shield, value: "100%", label: "Safe Journeys" },
];

const AboutSection = ({
  agencyName = "PakVoyage",
  agencyDescription,
  brandColor, // Now dynamically passed from tenant.brandColor
  statsData
}: AgencyProps) => {
  const displayStats = statsData || defaultStats;

  // Fallback to your primary blue if no brand color is set in the database
  const activeColor = brandColor || "#003580";

  return (
    <section className="py-20 bg-gray-50">
      <div className="container md:px-15 px-6 mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="font-bold tracking-[0.3em] uppercase text-xs "
              style={{ color: 'var(--theme-accent)' , fontFamily: 'var(--font-poppins)' , fontWeight:"700"  }} // Dynamically applies your Green/Blue
            >
              Who We Are
            </p>
            <h2
              style={{ color: 'var(--theme-heading)' , fontFamily: 'var(--font-poppins)' , fontWeight:"bold"  }}
              className="text-4xl py-4 font-black tracking-[0.05em] "
            >
              Your Trusted Partner
            </h2>

            <div className="text-gray-600 leading-relaxed mb-12 space-y-6 text-lg font-medium">
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {displayStats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Icon
                    className="h-7 w-7 mx-auto mb-3"
                    style={{ color: 'var(--theme-primary)' }}
                  />
                  <p className="text-2xl font-black tracking-[0.025em] text-gray-900" style={{  fontFamily: 'var(--font-poppins)' , fontWeight:"bold"   }} >{value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery Side */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {/* THE FIX: Added duration-500, ease-out, and hover:shadow-xl */}
                <div className="rounded-3xl overflow-hidden h-48 shadow-lg transform hover:scale-[1.02] transition-all duration-500 ease-out hover:shadow-xl">
                  <img src="/mountains.jpg" alt="Mountain landscape" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden h-64 shadow-lg transform hover:scale-[1.02] transition-all duration-500 ease-out hover:shadow-xl">
                  <img src="/valley.jpg" alt="Valley view" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="rounded-3xl overflow-hidden h-64 shadow-lg transform hover:scale-[1.02] transition-all duration-500 ease-out hover:shadow-xl">
                  <img src="/peaks.jpg" alt="Scenic peaks" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden h-48 shadow-lg transform hover:scale-[1.02] transition-all duration-500 ease-out hover:shadow-xl">
                  <img src="/lake.jpg" alt="Serene lake" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Multi-tenant accent decoration */}
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full -z-10 opacity-10 blur-2xl"
              style={{ backgroundColor: activeColor }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;