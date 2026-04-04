import Navbar from '@/components/Theme1/Navbar';
import Footer from '@/components/Theme1/Footer';
import ContactForm from '@/components/ContactForm'; 
import ContactPageBanner2 from '@/components/Theme2/ContactPageBanner2'
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  // 1. THE HEADLESS CONNECTION: Fetch data from your Backend API instead of Prisma!
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const API_KEY = process.env.AGENCY_API_KEY || '';

  let tenant = null;

  try {
    const res = await fetch(`${API_URL}/api/public/tours`, {
      headers: { 'x-api-key': API_KEY },
      cache: 'no-store' // Keep it dynamic
    });
    const data = await res.json();
    
    if (data.success && data.agency) {
      tenant = data.agency;
    }
  } catch (error) {
    console.error("Failed to fetch agency data for contact page.");
  }

  // If the API fails or agency is suspended, don't crash, just return empty/null
  if (!tenant) return null;

  // 2. Map the backend colors to your frontend CSS variables
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
    <main className="min-h-screen bg-white" style={globalTheme}>
      <Navbar companyName={tenant.companyName} logoUrl={tenant.logoUrl} />

      <ContactPageBanner2></ContactPageBanner2>

      {/* <div className="or-spacer">
        <div className="mask"></div>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* LEFT COLUMN: Contact Information */}
          <div className="lg:col-span-1 space-y-10">
            <h3 className="text-2xl font-black" style={{ color: 'var(--theme-heading)', fontFamily:'var(--font-poppins)', fontWeight:"700" }}>
              Get In Touch
            </h3>

            <div className="space-y-8">
              {/* Phone Info */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0" style={{ color: 'var(--theme-primary)' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"26px"}><path fill="currentColor" d="M112.8 10.9c27.3-9.1 57 3.9 68.9 30l39.7 87.3c10.6 23.4 4 51-16 67.1l-24.2 19.3c25.5 50 65.5 91.4 114.4 118.8l21.2-26.6c16.1-20.1 43.7-26.7 67.1-16l87.3 39.7c26.2 11.9 39.1 41.6 30 68.9-20.7 62.3-83.7 116.2-160.9 102.6-173.7-30.6-299.6-156.5-330.2-330.2-13.6-77.2 40.4-140.1 102.6-160.9zm25.2 49.9c-1.7-3.8-6-5.7-10-4.4-45.2 15.1-79.1 58.6-70.5 107 27.1 153.8 137.4 264.2 291.2 291.3 48.4 8.5 91.9-25.3 107-70.5 1.3-4-.6-8.3-4.4-10L364 334.4c-3.4-1.5-7.4-.6-9.7 2.3l-33.5 41.9c-7 8.7-19 11.5-29 6.7-72.5-34.4-130.5-94.3-162.4-168.2-4.3-9.9-1.4-21.5 7-28.2l38.9-31.1c2.9-2.3 3.9-6.3 2.3-9.7L137.9 60.7z"/></svg></div>
                <div className="pt-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1" style={{fontFamily:"var(--font-poppins)", fontWeight:"600"}}>Call Us</p>
                  <p className="text-lg font-black" style={{ color: 'var(--theme-accent)', fontFamily:'var(--font-poppins)', fontWeight:"700" }}>
                    +92 339 3836344
                  </p>
                  <p className="text-sm text-gray-500 mt-1 font-medium">Mon-Sat, 10am to 7pm</p>
                </div>
              </div>

              {/* Email Info */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0" style={{ color: 'var(--theme-primary)' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"26px"}><path fill="currentColor" d="M61.4 64C27.5 64 0 91.5 0 125.4 0 126.3 0 127.1 .1 128L0 128 0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256-.1 0c0-.9 .1-1.7 .1-2.6 0-33.9-27.5-61.4-61.4-61.4L61.4 64zM464 192.3L464 384c0 8.8-7.2 16-16 16L64 400c-8.8 0-16-7.2-16-16l0-191.7 154.8 117.4c31.4 23.9 74.9 23.9 106.4 0L464 192.3zM48 125.4C48 118 54 112 61.4 112l389.2 0c7.4 0 13.4 6 13.4 13.4 0 4.2-2 8.2-5.3 10.7L280.2 271.5c-14.3 10.8-34.1 10.8-48.4 0L53.3 136.1c-3.3-2.5-5.3-6.5-5.3-10.7z"/></svg></div>
                <div className="pt-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1" style={{fontFamily:"var(--font-poppins)", fontWeight:"600"}}>Email Us</p>
                  <p className="text-lg font-black" style={{ color: 'var(--theme-accent)', fontFamily:'var(--font-poppins)', fontWeight:"700" }}>
                    hello@axiusdigital.com
                  </p>
                  <p className="text-sm text-gray-500 mt-1 font-medium">We reply within 24 hours</p>
                </div>
              </div>

              {/* Location Info */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0" style={{ color: 'var(--theme-primary)' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={"22px"}><path fill="currentColor" d="M48 188.6C48 111.7 111.7 48 192 48s144 63.7 144 140.6c0 45.6-23.8 101.5-58.9 157.1-28.3 44.8-61 84.8-85.1 112.1-24.1-27.3-56.7-67.2-85.1-112.1-35.1-55.5-58.9-111.5-58.9-157.1zM192 0C86 0 0 84.4 0 188.6 0 307.9 120.2 450.9 170.4 505.4 182.2 518.2 201.8 518.2 213.6 505.4 263.8 450.9 384 307.9 384 188.6 384 84.4 298 0 192 0zM160 192a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm112 0a80 80 0 1 0 -160 0 80 80 0 1 0 160 0z"/></svg></div>
                <div className="pt-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1" style={{fontFamily:"var(--font-poppins)", fontWeight:"600"}}>Visit Us</p>
                  <p className="text-lg font-black" style={{ color: 'var(--theme-accent)', fontFamily:'var(--font-poppins)', fontWeight:"700" }}>
                    {tenant.companyName || 'Axius Digital'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 font-medium">Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

        </div>
      </div>
      <div className="or-spacer-down">
        <div className="mask"></div>
      </div>

      <Footer companyName={tenant.companyName} logoUrl={tenant.logoUrl} />
    </main>
  );
}