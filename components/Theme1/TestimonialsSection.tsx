

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed & Fatima",
    trip: "Hunza Honeymoon Tour",
    rating: 5,
    text: "Our honeymoon in Hunza was absolutely magical! PakVoyage handled everything perfectly — from the comfortable Prado ride to the stunning hotels. The Eagle's Nest sunset was the highlight of our lives.",
    avatar: "AF",
  },
  {
    name: "Sarah Khan",
    trip: "Fairy Meadows Adventure",
    rating: 5,
    text: "As a solo female traveler, I felt completely safe throughout the trip. The guide was knowledgeable and the trek to Fairy Meadows was surreal. Highly recommend PakVoyage to everyone!",
    avatar: "SK",
  },
  {
    name: "Bilal Hussain",
    trip: "Skardu Explorer",
    rating: 5,
    text: "Skardu exceeded every expectation. The Deosai plains, Shangrila Lake, and the sheer beauty of Baltistan left us speechless. PakVoyage's planning was flawless from start to finish.",
    avatar: "BH",
  },
  {
    name: "Zara & Ali",
    trip: "Swat Cultural Tour",
    rating: 4,
    text: "Swat was an incredible cultural journey. The Buddhist ruins, Malam Jabba, and the warm local hospitality made it a trip to remember. Great value for money!",
    avatar: "ZA",
  },
];

const TestimonialsSection = () => {
  return (
    <section className=" bg-[white] relative overflow-hidden px-4 " style={{marginTop:"-20px"}} >
      <div className="py-20 " style={{ 
      backgroundImage: "url('/background-1.jpg')", 
      backgroundSize:"cover", 
      backgroundRepeat:"no-repeat",
      backgroundPosition: "center",
      zIndex: "99",
      
      
       // Adjust this if you want it moved
    }} >
      {/* Decorative circles */}
      

      <div className="container mx-auto px-4 relative z-10" >
        <div className="text-center mb-14">
          <p className="text-[var(--theme-accent)] font-semibold tracking-widest uppercase text-sm mb-3" style={{ fontFamily: 'var(--font-montez)' , fontWeight:"bold", fontSize:"1.2rem" }}>
            Testimonials
          </p>
          <h2 
            className="text-[var(--theme-heading)] text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-poppins)'  }}
          >
            What Our Travelers Say
          </h2>
          <p className="mt-3 max-w-xl mx-auto opacity-70">
            Real stories from real adventurers who explored Pakistan with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300"
              style={{border:"3px solid var(--theme-primary)"}}
            >
              <Quote className="h-8 w-8 text-[var(--theme-accent)] opacity-30 mb-4" />
              <p className="text-sm leading-relaxed mb-6 opacity-80">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s < t.rating 
                        ? "text-[var(--theme-accent)] fill-[var(--theme-accent)]" 
                        : "opacity-20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--theme-accent)]/20 flex items-center justify-center text-[var(--theme-accent)] font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs opacity-60">{t.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};



export default TestimonialsSection;