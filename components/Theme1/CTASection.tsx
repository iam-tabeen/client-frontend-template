import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

const CtaBanner = () => {
  return (
    <section className="relative overflow-hidden bg-white">
  {/* Background Video Layer */}
  <video
    autoPlay
    loop
    muted
    playsInline
    poster="/background-4.jpg" // Fallback image while video loads
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="https://res.cloudinary.com/dmjgwmkuy/video/upload/v1772803134/mc03y7vgf5rmw0cwrd6amf2kec_result__ettjlv.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Optional Overlay to make text pop (highly recommended for video) */}
  <div className="absolute inset-0 bg-black/30 z-10" />

  <div className="py-20 relative z-20"> 
    <div className="container mx-auto px-4 text-center">
      <h2 
        className="text-3xl md:text-4xl font-bold mb-4 text-white" 
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        Ready for Your Next Adventure?
      </h2>
      
      <p className="text-white/90 text-lg max-w-xl mx-auto mb-8">
        Book your dream tour today and explore the beauty of Pakistan with expert guides and luxury travel.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-colors duration-200 group bg-[var(--theme-button)] text-white hover:opacity-90"
        >
          Browse Tours
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <a
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white hover:text-[var(--theme-button)] transition-colors duration-200"
        >
          <Phone className="h-5 w-5" />
          Call Us Now
        </a>
      </div>
    </div>
  </div>
</section>
  );
};

export default CtaBanner;