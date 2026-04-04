import Navbar from '@/components/Theme1/Navbar';
import Footer from '@/components/Theme1/Footer';
import CustomTourForm from '@/components/CustomTourForm';
import CustomTripHeader2 from '@/components/Theme2/CustomTripHeader2';
import React from 'react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CustomTourPage() {
  // 1. THE HEADLESS CONNECTION
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const API_KEY = process.env.AGENCY_API_KEY || '';

  // 2. Fetch the Agency Branding from your SaaS Engine
  const res = await fetch(`${API_URL}/api/public/tours`, {
    headers: { 'x-api-key': API_KEY },
    cache: 'no-store'
  });

  // --- THE SAFETY NET ---
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    console.error("Backend sent HTML instead of JSON! Check if the backend is running.");
    notFound(); 
  }

  const data = await res.json();

  // If the API key is wrong, show 404
  if (!data.success || !data.agency) {
    notFound();
  }

  // 3. Extract the agency data
  const tenant = data.agency;

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
      <CustomTripHeader2></CustomTripHeader2>
      {/* <div className="or-spacer">
        <div className="mask"></div>
      </div> */}

      {/* Main Form Container */}
      <div className="py-20 px-4 sm:px-6">
      {/* Notice we pass the tenant ID if your form component still expects it, 
          though our new API route actually figures it out via the API Key! */}
      <CustomTourForm tenantId={tenant.id || "headless"} />
      </div>

      <div className="or-spacer-down">
        <div className="mask"></div>
      </div>

      <Footer companyName={tenant.companyName} logoUrl={tenant.logoUrl} />
    </main>
  );
}