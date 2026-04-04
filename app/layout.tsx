import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Montez } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';


// --- FONT CONFIGURATIONS ---
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-poppins", subsets: ["latin"] });
const montez = Montez({ weight: ["400"], variable: "--font-montez", subsets: ["latin"] });


export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Fast Travels | Powered by Travelo",
  description: "Book your next adventure with us.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 1. THE HEADLESS CONNECTION (Using the correct ID variable!)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const AGENCY_ID = process.env.NEXT_PUBLIC_AGENCY_ID || '';

  let globalTheme = {} as React.CSSProperties;

  // 2. FETCH AGENCY BRANDING GLOBALLY
  try {
    // FIX 1 & 2: Use the exact /theme endpoint we built, and pass the agencyId!
    // ❌ Galat: `${API_URL}/api/theme...` (Kyunki API_URL mein pehle se /api hai)
// ✅ Sahi:
// layout.tsx mein theme fetch karne ke liye:
const res = await fetch(`${API_URL}/theme?agencyId=${AGENCY_ID}`, {
  next: { revalidate: 0 }
});
    // Parse the JSON data we tested in the browser
    const tenant = await res.json();

    // Make sure we didn't get an error from the backend
    if (tenant && !tenant.error) {
      
      // Map the backend colors to CSS variables
      globalTheme = {
        '--theme-primary': tenant.accentColor || '#003580', 
        '--theme-accent': tenant.accentColor || '#FF8C00',
        '--theme-navbar': tenant.navlink || '#003580',
        '--theme-button': tenant.buttonColor || '#FF8C00',
        '--theme-heading': tenant.headingColor || '#1F2937',
        '--theme-footer': tenant.footerColor || '#111827', 
        '--theme-card': tenant.cardColor || '#111827', 
        '--navlink': tenant.navlink || '#111827', 
        '--axius-primary': tenant.accentColor || '#003580',
        '--axius-secondary': tenant.cardColor || '#1F2937',
      } as React.CSSProperties;
    }
  } catch (error) {
    console.error("Failed to fetch global theme from backend.", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      {/* 3. INJECT THE BACKEND COLORS INTO THE BODY TAG! */}
      <body style={globalTheme} className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montez.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          
          {children}
          
          {/* Because these sit inside the body, they now have access to var(--theme-primary)! */}
          <WhatsAppButton />
          <ScrollToTop />
          
        </ThemeProvider>
      </body>
    </html>
  );
}