import { MapPin, Ticket, PlaneTakeoff } from 'lucide-react';

const CSS_VARS = {
  
  titleFont: "'Manrope', sans-serif",
  bodyFont: "'Inter', sans-serif",
  styleFont: "'Montez', cursive",
};


<style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Manrope:wght@200..800&family=Montez&display=swap');

    /* ── CSS variables ── */
    :root {
      --title-font: ${CSS_VARS.titleFont};
      --body-font: ${CSS_VARS.bodyFont};
      --style-font: ${CSS_VARS.styleFont};
      
    }

  `}</style>
export default function ProcessSection() {
  return (
    <section className="pt-[93px] pb-[53px] bg-[#edf3ff] font-lato">
      <div className="container mx-auto px-[15px] max-w-[1200px] w-full">
        <div className="flex flex-wrap -mx-[15px]">
          
          {/* Process 1: Select Destination */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-[15px]">
            <div className="relative pl-[80px] mb-[40px]">
              {/* Size 60 replicates font-size: 60px from your CSS */}
              <MapPin 
                className="absolute top-0 left-0 text-[#4c86fa]" 
                size={60} 
                strokeWidth={1.5} 
              />
              <h6 className="text-[14px] leading-[1.71em] tracking-[0.05em] font-black uppercase text-black pb-[5px]" style={{fontFamily:"var(--title-font)"}}>
                Select Destination
              </h6>
              <p className="text-[18px] leading-[1.66em] font-light tracking-[0.05em] text-[#777]">
                At first choose the place you always wanted to go.
              </p>
            </div>
          </div>

          {/* Process 2: Book a trip */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-[15px]">
            <div className="relative pl-[80px] mb-[40px]">
              <Ticket 
                className="absolute top-0 left-0 text-[#4c86fa]" 
                size={60} 
                strokeWidth={1.5} 
              />
              <h6 className="text-[14px] leading-[1.71em] tracking-[0.05em] font-black uppercase text-black pb-[5px]" style={{fontFamily:"var(--title-font)"}}>
                Book a trip
              </h6>
              <p className="text-[18px] leading-[1.66em] font-light tracking-[0.05em] text-[#777]">
                Then book your trip from our exclusive offers.
              </p>
            </div>
          </div>

          {/* Process 3: Take your flight */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-[15px]">
            <div className="relative pl-[80px] mb-[40px]">
              <PlaneTakeoff 
                className="absolute top-0 left-0 text-[#4c86fa]" 
                size={60} 
                strokeWidth={1.5} 
              />
              <h6 className="text-[14px] leading-[1.71em] tracking-[0.05em] font-black uppercase text-black pb-[5px]" style={{fontFamily:"var(--title-font)"}}>
                Take your flight
              </h6>
              {/* Note: I fixed the "yourr" typo from the original HTML here! */}
              <p className="text-[18px] leading-[1.66em] font-light tracking-[0.05em] text-[#777]">
                Take your flight on selected date and enjoy.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}