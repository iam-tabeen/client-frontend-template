import Link from "next/link";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";

const CtaBanner = () => {
  return (
    <section 
      className="relative overflow-hidden font-lato" 
      style={{ 
        backgroundColor: "#edf3ff",
        backgroundImage: "url('https://images.unsplash.com/photo-1585308057198-67070eb477d2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // The image from your style.css
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      {/* Signature Theme 2 Overlay (.overlay class) */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* --- TOP DECORATIVE BORDER --- */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-20">
        <img 
          src="/assets/top-border-styled.png" 
          alt="top border" 
          className="mx-auto h-auto block" 
        />
      </div>

      {/* --- BOTTOM DECORATIVE BORDER --- */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20" style={{marginBottom:"-1px"}}>
        <img 
          src="/assets/top-border-styled.png" 
          alt="bottom border" 
          className="mx-auto h-auto block -scale-y-100" 
        />
      </div>

      <div className="py-[120px] md:py-[150px] relative z-30"> 
        <div className="container mx-auto px-[15px] max-w-[1200px]">
          <div className="flex flex-wrap items-center -mx-[15px]">
            
            {/* Left Content Side */}
            <div className="w-full lg:w-7/12 px-[15px] mb-[40px] lg:mb-0 max-lg:text-center">
              <h6 
                className="text-[14px] leading-[1.71em] tracking-[0.1em] font-black uppercase mb-[15px]"
                style={{ color: '#4c86fa' }}
              >
                Limited Time Offer
              </h6>
              <h2 className="text-white text-[38px] md:text-[48px] font-black leading-[1.1em] tracking-[0.05em] mb-[25px] uppercase">
                Explore the Unseen <br /> Beauty of Pakistan
              </h2>
              <p className="text-white/80 text-[18px] leading-[1.66em] font-light tracking-[0.05em] mb-[30px]">
                Join over 10,000+ happy travelers. We provide premium transport, luxury stays, and certified local guides for an unforgettable experience.
              </p>
              
              {/* Feature Tags using Theme 2 weights */}
              <div className="flex flex-wrap gap-4 max-lg:justify-center">
                {['Expert Guides', 'Luxury Stays', 'Safe Travel'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white text-[12px] font-black uppercase tracking-[0.1em]">
                    <CheckCircle size={16} className="text-[#4c86fa]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Side */}
            <div className="w-full lg:w-5/12 px-[15px]">
              <div className="bg-white p-[40px] md:p-[50px] rounded-[6px] shadow-2xl max-w-[450px] mx-auto">
                <h4 className="text-black text-[24px] font-black leading-[1.2em] tracking-[0.05em] mb-[15px] uppercase">
                  Book Your Seat
                </h4>
                <p className="text-[#777] text-[16px] font-light mb-[30px] leading-[1.66em]">
                  Sign up today and get an exclusive 15% discount on your first group tour.
                </p>
                
                <div className="flex flex-col gap-4">
                  {/* Primary Button Styling from style.css */}
                  <Link
                    href="/tours"
                    className="inline-block text-[14px] leading-[50px] font-black text-white bg-[#4c86fa] uppercase px-[30px] rounded-[25px] text-center tracking-[0.1em] transition-all duration-500 ease-in-out hover:bg-black"
                  >
                    Browse All Tours
                    <ArrowRight className="inline-block h-4 w-4 ml-2 mb-1" />
                  </Link>
                  
                  {/* Whatsapp/Call Styling from style.css */}
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[14px] leading-[46px] font-black text-[#777] border-2 border-[#edf3ff] uppercase px-[30px] rounded-[25px] text-center tracking-[0.1em] transition-all duration-500 ease-in-out hover:bg-[#edf3ff] hover:text-[#4c86fa]"
                  >
                    <Phone className="inline-block h-4 w-4 mr-2 mb-1" />
                    Get Free Quote
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;