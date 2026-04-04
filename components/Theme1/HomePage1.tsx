import Link from 'next/link'; 
import Navbar from '@/components/Theme1/Navbar';
import TourCard from '@/components/Theme1/TourCard';
import HeroSection from '@/components/Theme1/HeroSection';
import AboutSection from '@/components/Theme1/AboutSection';
import Footer from '@/components/Theme1/Footer';
import GallerySection from '@/components/Theme1/GallerySection';
import TestimonialsSection from '@/components/Theme1/TestimonialsSection';
import CtaBanner from '@/components/Theme1/CTASection';
import ToursSection from '@/components/Theme1/ToursSection';

export const dynamic = 'force-dynamic';

export default async function HomePage1({ agencyId }: { agencyId: string }) {
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  // Note: AGENCY_ID specifically prop se le rahe hain jo layout/page se aa rahi hai
  const activeAgencyId = agencyId || process.env.NEXT_PUBLIC_AGENCY_ID;

  // 2. FETCH THE DATA (Clean URL without unnecessary headers)
  const res = await fetch(`${API_URL}/public/tours?agencyId=${activeAgencyId}`, {
    next: { revalidate: 0 }
  });

  const data = await res.json();

  // 3. ERROR HANDLING
  if (!data.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-red-500">Access Denied</h1>
          <p className="font-medium text-gray-500">{data.error || "Agency data could not be loaded."}</p>
        </div>
      </div>
    );
  }

  const { agency } = data;
  const tours = agency?.tours || [];

  // 4. MAP THE API COLORS
  const globalTheme = {
    '--theme-primary': agency.primaryColor || '#003580',
    '--theme-accent': agency.accentColor || '#FF8C00',
    '--theme-navbar': agency.navbarColor || '#003580',
    '--theme-button': agency.buttonColor || '#FF8C00',
    '--theme-heading': agency.headingColor || '#1F2937',
    '--theme-footer': agency.footerColor || '#111827', 
    '--theme-card': agency.cardColor || '#111827', 
    '--navlink': agency.navlink || '#111827', 
  } as React.CSSProperties;

  return (
    <main className="min-h-screen bg-white" style={globalTheme}>
      <Navbar 
        companyName={agency.companyName} 
        logoUrl={agency.logoUrl} 
      />
      <HeroSection />
      <AboutSection agencyName={agency.companyName} />
      <ToursSection tours={tours} />
      
      {/* Visual Spacers */}
      <div className="or-spacer-down"><div className="mask"></div></div>
      <GallerySection />
      <div className="or-spacer"><div className="mask"></div></div>
      <TestimonialsSection />
      <div className="or-spacer-down"><div className="mask"></div></div>
      <CtaBanner />
      <div className="or-spacer"><div className="mask" id='footerid'></div></div>

      <Footer companyName={agency.companyName} logoUrl={agency.logoUrl} />
    </main>
  );
}