import { notFound } from 'next/navigation';
import TourClient from './TourClient';
import React from 'react';

// Import your Navbar and Footer
import Navbar from '@/components/Theme1/Navbar'; 
import Footer from '@/components/Theme1/Footer'; 

// ─── Retry Helper ─────────────────────────────────────────────────────────────
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return await response.json(); 
      if (i === retries - 1) return null; 
      throw new Error(`Status ${response.status}`);
    } catch (error) {
      if (i === retries - 1) return null;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return null;
}
// ──────────────────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TourDetail({ params }: Props) {
  const { id } = await params;

  // 1. THE HEADLESS CONNECTION
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const AGENCY_ID = process.env.NEXT_PUBLIC_AGENCY_ID || '';
  
  // (Optional) Keeping API_KEY just in case your TourClient uses it to submit Bookings
  const API_KEY = process.env.AGENCY_API_KEY || ''; 

  let data = null;

  try {
    // 2. Fetch the specific tour from your SaaS Engine (Correct URL + Agency ID)
    data = await fetchWithRetry(
      `${API_URL}/public/tours/${id}?agencyId=${AGENCY_ID}`, 
      { next: { revalidate: 0 } }
    );
  } catch (error) {
    console.error("Failed to fetch tour detail:", error);
  }

  // 3. THE SAFETY NET
  // If the API fails, or the tour doesn't exist, show 404
  if (!data || !data.success || !data.tour || !data.agency) {
    notFound();
  }

  const tour = data.tour;
  const tenant = data.agency;

  // 4. Setup the theme variables
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
          // IMPORTANT: Passed down so the BookingForm can use them!
          apiKey={API_KEY}
          apiUrl={API_URL}
          agencyId={AGENCY_ID} // Passed just in case client needs it
        />
      </div>

      <Footer companyName={tenant.companyName} logoUrl={tenant.logoUrl} />
    </div>
  );
}