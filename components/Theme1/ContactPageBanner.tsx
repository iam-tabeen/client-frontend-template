interface ContactHeaderProps {
    title?: string;
    tagline?: string;
    description?: string;
  }
  
  const ContactHeader = ({
    title = "Contact Us",
    tagline = "Reach Out",
    description = "Have a question about a tour, need help with a booking, or want a custom travel package? We are here to help you plan your next great adventure."
  }: ContactHeaderProps) => {
    return (
      <div className="relative overflow-hidden bg-white py-24 border-b border-gray-100" style={{ backgroundColor: 'var(--theme-primary)' }}>
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: 'url("https://res.cloudinary.com/dmjgwmkuy/image/upload/v1772801682/mountains-bg-2_ht6rhu.png")', 
            backgroundSize: '1920px',
            backgroundPositionY: '150px',
            opacity: 0.1,
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm font-black uppercase tracking-[0.3em]" style={{ color: 'var(--theme-heading)' }}>
            {tagline}
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 text-white" >
            {title}
          </h1>
          <p className="text-white max-w-2xl mx-auto text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  };
  
  export default ContactHeader;