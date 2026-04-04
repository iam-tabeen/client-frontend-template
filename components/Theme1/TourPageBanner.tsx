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
      className="relative pt-32 pb-20 px-6 text-center shadow-inner overflow-hidden" 
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("https://res.cloudinary.com/dmjgwmkuy/image/upload/v1772801682/mountains-bg-2_ht6rhu.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          opacity: 0.1 
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="font-black text-white tracking-[0.3em] uppercase text-xs mb-4">
          {tagline}
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-md">
          {title}
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-medium drop-shadow-sm">
          {subtitle || `Find your next great adventure with ${companyName}. We handle the details, you enjoy the journey.`}
        </p>
      </div>
    </section>
  );
};

export default PageHeader;