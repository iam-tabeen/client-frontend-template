import Link from 'next/link'; 
import Navbar from '@/components/Theme1/Navbar';
import TourCard from '@/components/Theme2/TourCard2';
import HeroSection3 from '@/components/Theme3/HeroSection3';
import ProcessSection from '@/components/Theme2/ProcessSection';
import AboutSection2 from '@/components/Theme2/AboutSection2';
import Footer from '@/components/Theme1/Footer';
import GallerySection2 from '@/components/Theme2/GallerySection2';
import TestimonialsSection2 from '@/components/Theme2/TestimonialsSection2';
import CtaBanner2 from '@/components/Theme2/CTASection2';
import ToursSection from '@/components/Theme2/ToursSection';

export const dynamic = 'force-dynamic';

export default async function HomePage2({ agencyId }: { agencyId: string }) {
  
  // 1. THE HEADLESS CONNECTION
  // We use fetch() to talk to your SaaS engine via the API Key.
  // Replace this string with the actual key you generated!
 // Add "|| ''" so TypeScript knows it will always be a string
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_KEY = process.env.AGENCY_API_KEY || '';

  // 2. FETCH THE DATA
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/tours?agencyId=${process.env.NEXT_PUBLIC_AGENCY_ID}`, {
    headers: {
      'x-api-key': process.env.AGENCY_API_KEY || '' // Ensure this matches your backend header name
    },
    next: { revalidate: 0 }
  });

  const data = await res.json();

  // If the API key is wrong, or the agency is suspended, show the error
  if (!data.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-red-500">Access Denied</h1>
          <p className="font-medium text-gray-500">{data.error}</p>
        </div>
      </div>
    );
  }

  // 3. DESTRUCTURE THE PAYLOAD
  // 3. DESTRUCTURE THE PAYLOAD
  const { agency } = data;
  
  // Safely extract tours, and default to an empty array if there are none!
  const tours = agency?.tours || [];

  // 4. MAP THE API COLORS TO GLOBAL VARIABLES
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
    <main className="min-h-screen bg-white"  style={globalTheme}>
      
      {/* Clean components using the API data! */}
      <Navbar 
        companyName={agency.companyName} 
        logoUrl={agency.logoUrl} 
      />
      <HeroSection3></HeroSection3>  
      <ProcessSection></ProcessSection>

      <AboutSection2 agencyName={agency.companyName} />

      {/* TOURS GRID SECTION */}
    
<ToursSection tours={tours}></ToursSection>
     

      

      <GallerySection2></GallerySection2>

      

      <TestimonialsSection2></TestimonialsSection2>

    

      <CtaBanner2></CtaBanner2>

      

      {/* FOOTER */}
      <Footer companyName={agency.companyName} logoUrl={agency.logoUrl}></Footer>
    </main>
  );
}