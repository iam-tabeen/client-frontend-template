import Navbar from '@/components/Theme1/Navbar';
import TourCard2 from '@/components/Theme2/TourCard2';
import TourCard3 from '@/components/Theme3/TourCard3';
import TourCard from '@/components/Theme1/TourCard';
import Footer from '@/components/Theme1/Footer';
import TourFilters from '@/components/TourFilters';
import TourPageBanner2 from '@/components/Theme2/TourPageBanner2'
import React from 'react';

// ─── Retry Helper ─────────────────────────────────────────────────────────────
/**
 * Fetches data with built-in automatic retries for transient errors.
 */
// ─── Retry Helper ─────────────────────────────────────────────────────────────
/**
 * Fetches data with built-in automatic retries for transient errors.
 */
// ─── Retry Helper ─────────────────────────────────────────────────────────────
/**
 * Fetches data with built-in automatic retries for transient errors.
 */
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return await response.json(); 
      }
      
      // If it's the last attempt, return null
      if (i === retries - 1) {
        // Changed to console.warn so Next.js doesn't throw a red screen!
        console.warn(`API completely failed with status: ${response.status}`);
        return null; 
      }
      
      // Throw internally just to trigger the catch block and retry
      throw new Error(`Status ${response.status}`);
      
    } catch (error) {
      if (i === retries - 1) {
        // Changed to console.warn
        console.warn("Fetch failed after all retries.");
        return null; // Return null gracefully
      }
      
      console.warn(`Fetch attempt ${i + 1} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return null;
}
// ──────────────────────────────────────────────────────────────────────────────

export const dynamic = 'force-dynamic';

export default async function ToursPage({
  searchParams, 
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const search = params?.search || '';
  const sort = params?.sort || 'newest';

  // 1. THE HEADLESS CONNECTION
  // 1. THE HEADLESS CONNECTION
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const AGENCY_ID = process.env.NEXT_PUBLIC_AGENCY_ID || ''; // ID zaroori hai

  let tenant = null;

  try {
    // 2. Fetch from your backend API with the new retry logic!
    // YAHAN AGENCY ID ADD KI HAI:
    const queryParams = new URLSearchParams({ search, sort, agencyId: AGENCY_ID }); 
    
    // We swapped out the standard fetch for our resilient fetchWithRetry
    const data = await fetchWithRetry(
      `${API_URL}/public/tours?${queryParams.toString()}`, 
      { next: { revalidate: 0 } }
    );
    
    if (data && data.success && data.agency) {
      tenant = data.agency;
    }
  } catch (error) {
    console.error("Failed to fetch tours from backend API after multiple attempts:", error);
  }

  // 3. Fallback UI if API fails or API Key is wrong
  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl font-bold">Failed to load agency data. Check API configuration.</p>
      </div>
    );
  }

  // 4. Map the backend colors to your CSS variables
  const globalTheme = {
    '--theme-primary': tenant.primaryColor || '#003580',
    '--theme-accent': tenant.accentColor || '#FF8C00',
    '--theme-navbar': tenant.navbarColor || '#003580',
    '--navlink': tenant.navlink || '#003580' ,
    '--theme-button': tenant.buttonColor || '#FF8C00',
    '--theme-heading': tenant.headingColor || '#1F2937',
    '--theme-footer': tenant.footerColor || '#111827', 
    '--theme-card': tenant.cardColor || '#111827', 
  } as React.CSSProperties;

  return (
    <main className="min-h-screen bg-white flex flex-col" style={globalTheme}>
      
      <Navbar companyName={tenant.companyName} logoUrl={tenant.logoUrl} />

      <TourPageBanner2 
        title="All Destinations" 
        subtitle="Explore the breathtaking beauty of Pakistan with our curated tour packages." 
      />
      

      {/* <div className="or-spacer">
        <div className="mask"></div>
      </div> */}

      {/* Tours Grid Section */}
      <section className="flex-1 py-16 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full">


        
        <TourFilters />

        {/* Results Counter */}
        <div className="mb-10 border-b border-gray-200 pb-4">
          <p className="text-gray-500 font-bold">
            Showing <span style={{ color: 'var(--theme-accent)' }}>{tenant.tours?.length || 0}</span> active packages
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tenant.tours?.map((tour: any) => (
            <TourCard3 key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Empty State */}
        {(!tenant.tours || tenant.tours.length === 0) && (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ color: 'var(--theme-heading)' }}>No Tours Found</h3>
            <p className="text-gray-500 font-medium">
              We couldn't find any adventures matching your search. Try adjusting your filters!
            </p>
          </div>
        )}
      </section>

      <div className="or-spacer-down">
        <div className="mask"></div>
      </div>
      <Footer companyName={tenant.companyName} logoUrl={tenant.logoUrl}></Footer>
      
    </main>  );
}