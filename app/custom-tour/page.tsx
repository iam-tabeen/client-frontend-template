import Navbar from '@/components/Theme1/Navbar';
import Footer from '@/components/Theme1/Footer';
import CustomTourForm from '@/components/CustomTourForm';
import CustomTripHeader2 from '@/components/Theme2/CustomTripHeader2';
import React from 'react';
import { notFound } from 'next/navigation';

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

export const dynamic = 'force-dynamic';

export default async function CustomTourPage() {
  // 1. THE HEADLESS CONNECTION
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const AGENCY_ID = process.env.NEXT_PUBLIC_AGENCY_ID || '';

  let tenant = null;

  try {
    // 2. Fetch the Agency Branding with Agency ID query param (No API Key needed)
    const queryParams = new URLSearchParams({ agencyId: AGENCY_ID });
    
    const data = await fetchWithRetry(
      `${API_URL}/public/tours?${queryParams.toString()}`, 
      { next: { revalidate: 0 } }
    );
    
    if (data && data.success && data.agency) {
      tenant = data.agency;
    }
  } catch (error) {
    console.error("Failed to fetch agency data for custom tour page:", error);
  }

  // If the API fails, or agency is suspended, trigger Next.js 404 page
  if (!tenant) {
    notFound(); 
  }

  // 3. Map the backend colors to your frontend CSS variables
  const globalTheme = {
    '--theme-primary': tenant.primaryColor || '#003580',
    '--theme-accent': tenant.accentColor || '#FF8C00',
    '--theme-navbar': tenant.navbarColor || '#003580',
    '--theme-button': tenant.buttonColor || '#FF8C00',
    '--theme-heading': tenant.headingColor || '#1F2937',
    '--theme-footer': tenant.footerColor || '#111827',
    '--theme-card': tenant.cardColor || '#111827',
    '--navlink': tenant.navlink || '#ffffff',
  } as React.CSSProperties;

  return (
    <main className="min-h-screen bg-gray-50" style={globalTheme}>
      <Navbar companyName={tenant.companyName} logoUrl={tenant.logoUrl} />

      {/* Hero Header */}
      <CustomTripHeader2 />

      {/* Main Form Container */}
      <div className="py-20 px-4 sm:px-6">
        {/* Pass the tenant ID so the CustomTourForm knows where to send the lead in the DB! */}
        <CustomTourForm tenantId={tenant.id || "headless"} />
      </div>

      <div className="or-spacer-down">
        <div className="mask"></div>
      </div>

      <Footer companyName={tenant.companyName} logoUrl={tenant.logoUrl} />
    </main>
  );
}