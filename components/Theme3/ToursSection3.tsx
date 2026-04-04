import Link from 'next/link';
import TourCard3 from '@/components/Theme3/TourCard3'; // Adjust this path if your TourCard is located elsewhere

const CSS_VARS = {
  
  titleFont: "'Manrope', sans-serif",
  bodyFont: "'Inter', sans-serif",
  styleFont: "'Montez', cursive",
};

interface ToursSectionProps {
  tours: any[];
}

export default function ToursSection({ tours = [] }: ToursSectionProps) {
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

    
    <section id="tours" className="relative py-24 px-6 sm:px-12 lg:px-24 mx-0" style={{ marginTop: "-2px" }}>
      
      {/* Background Layer */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundColor:"#edf3ff",
          zIndex: 0 
        }} 
      />

      <div className="relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-center mb-16 gap-4">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span 
             className="text-[48px] leading-[1.71em] tracking-[0.05em] font-black"
              style={{ 
                color: 'var(--theme-accent)', 
                fontFamily: 'var(--style-font)', fontWeight:"600",
                
              }}
            >
              Our Best Packages
            </span>
            <h2 
              className="text-[22px] font-bold mt-2"
              style={{ 
                color: 'var(--theme-heading)', 
                fontFamily: 'var(--title-font)', 
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
            <TourCard3 key={tour.id} tour={tour} />
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