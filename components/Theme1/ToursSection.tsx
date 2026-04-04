import Link from 'next/link';
import TourCard2 from '@/components/Theme2/TourCard2'; // Adjust this path if your TourCard is located elsewhere

interface ToursSectionProps {
  tours: any[];
}

export default function ToursSection({ tours = [] }: ToursSectionProps) {
  return (
    <section id="tours" className="relative py-24 px-6 sm:px-12 lg:px-24 mx-0" style={{ marginTop: "-2px" }}>
      
      {/* Background Layer */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundColor:"white",
          zIndex: 0 
        }} 
      />

      <div className="relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-center mb-16 gap-4">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span 
              className="text-xs font-black uppercase tracking-[0.3em]"
              style={{ 
                color: 'var(--theme-accent)', 
                fontFamily:"var(--font-poppins)", fontWeight:"500",
                fontSize: "1rem" 
              }}
            >
              Our Best Packages
            </span>
            <h2 
              className="text-4xl font-bold mt-2"
              style={{ 
                color: 'var(--theme-heading)', 
                fontFamily: 'var(--font-poppins)', 
                fontWeight: "bold" 
              }}
            >
              Upcoming Adventures
            </h2>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tours.slice(0, 3).map((tour: any) => (
            <TourCard2 key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Empty State */}
        {tours.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              More adventures coming soon!
            </p>
          </div>
        )}

        {/* View All Button (Shows only if there are more than 3 tours) */}
        {tours.length > 3 && (
          <div className="mt-16 flex justify-center">
            <Link 
              href="/tours" 
              style={{ background: 'var(--theme-primary)' }}
              className="text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-xl"
            >
              View All Tours &rarr;
            </Link>
          </div>
        )}
    
      </div>
    </section>
  );
}