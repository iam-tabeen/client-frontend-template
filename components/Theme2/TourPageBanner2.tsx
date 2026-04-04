interface PageHeaderProps {
  title?: string;
  tagline?: string;
  subtitle?: string;
  companyName?: string;
}

const PageHeader = ({ 
  title = "All Destinations", 
  tagline = "Explore Our Packages", 
  subtitle,
  companyName = "PakVoyage"
}: PageHeaderProps) => {
  return (
    <section 
      className="relative pt-[140px] pb-[100px] px-[15px] text-center overflow-hidden font-lato" 
      style={{ backgroundColor: '#4c86fa' }}
    >
      {/* --- NEW THEME BACKGROUND IMAGE --- */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1707549058636-c57a5dbe99b8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Theme 2 header image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Theme Overlay (.overlay in style.css) */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* --- TOP DECORATIVE BORDER --- */}
      

      {/* --- BOTTOM DECORATIVE BORDER --- */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20">
        <img 
          src="/assets/top-border-styled.png" 
          alt="bottom border" 
          className="mx-auto h-auto block -scale-y-100" 
        />
      </div>

      <div className="relative z-30 max-w-[1200px] mx-auto">
        {/* Tagline: Using 14px Black Uppercase from font.css */}
        <p className="font-black text-white tracking-[0.3em] uppercase text-[14px] mb-[15px] drop-shadow-md">
          {tagline}
        </p>
        
        {/* Main Heading: Using 60px Black from font.css */}
        <h1 className="text-[40px] md:text-[60px] font-black text-white leading-[1.1em] tracking-[0.05em] mb-[25px] uppercase drop-shadow-lg">
          {title}
        </h1>

        {/* Subtitle: Using 18px Light from font.css */}
        <p className="text-white/90 text-[18px] md:text-[22px] leading-[1.66em] font-light max-w-[800px] mx-auto drop-shadow-md">
          {subtitle || `Find your next great adventure with ${companyName}. We handle the details, you enjoy the journey.`}
        </p>
      </div>
    </section>
  );
};

export default PageHeader;