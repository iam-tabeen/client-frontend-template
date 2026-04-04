import { notFound } from 'next/navigation';
import TourClient from './TourClient';
import React from 'react';

// Import your Navbar and Footer
import Navbar from '@/components/Theme1/Navbar'; 
import Footer from '@/components/Theme1/Footer'; 

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TourDetail({ params }: Props) {
  const { id } = await params;

  // 1. THE HEADLESS CONNECTION
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const API_KEY = process.env.AGENCY_API_KEY || '';

  // 2. Fetch the specific tour from your SaaS Engine
  const res = await fetch(`${API_URL}/api/public/tours/${id}`, {
    headers: { 
      'x-api-key': API_KEY,
      'Content-Type': 'application/json' 
    },
    cache: 'no-store'
});

  // --- THE SAFETY NET ---
  // Check if the backend actually sent JSON before trying to parse it
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    console.error("Backend sent HTML instead of JSON! Check if the backend is running on port 3000 and the route [id]/route.ts exists.");
    notFound(); // Gracefully show the 404 page instead of crashing
  }

  const data = await res.json();

  // If the API key is wrong, or the tour doesn't exist, show 404
  if (!data.success || !data.tour) {
    notFound();
  }

  const tour = data.tour;
  const tenant = data.agency;

  // 3. Setup the theme variables
  const globalTheme = {
    '--theme-primary': tenant.primaryColor || '#003580',
    '--theme-accent': tenant.accentColor || '#FF8C00',
    '--theme-navbar': tenant.navbarColor || '#003580',
    '--theme-button': tenant.buttonColor || '#FF8C00',
    '--theme-heading': tenant.headingColor || '#1F2937',
    '--theme-footer': tenant.footerColor || '#111827', 
    '--theme-card': tenant.cardColor || '#111827', 
    '--navlink': tenant.navlink || '#111827', 
    '--axius-primary': tenant.primaryColor || '#003580',
    '--axius-secondary': tenant.headingColor || '#1F2937',
  } as React.CSSProperties;

  // --- Calculate the correct fixed date string ---
  let calculatedFixedDate: string | undefined = undefined;
  
  if (tour.departureType === 'CUSTOM_DATE' && tour.departureDate) {
    const d = new Date(tour.departureDate);
    
    if (tour.departureEveryYear) {
      const today = new Date();
      let targetDate = new Date(today.getFullYear(), d.getMonth(), d.getDate());
      
      if (targetDate < today) {
        targetDate.setFullYear(today.getFullYear() + 1);
      }
      calculatedFixedDate = targetDate.toISOString().split('T')[0]; 
    } else {
      calculatedFixedDate = d.toISOString().split('T')[0];
    }
  }

  return (
    <div style={globalTheme}> 
      <Navbar companyName={tenant.companyName} logoUrl={tenant.logoUrl} />

      <div className="bg-gray-50 pt-20"> 
        <TourClient 
          tour={tour} 
          fixedDate={calculatedFixedDate} 
          isPro={tenant.planTier === 'PRO'} 
          // 4. IMPORTANT: Pass these down so the BookingForm can use them!
          apiKey={API_KEY}
          apiUrl={API_URL}
        />
      </div>

      <Footer companyName={tenant.companyName} logoUrl={tenant.logoUrl} />
    </div>
  );
}