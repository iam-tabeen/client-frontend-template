import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Montez } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import Script from 'next/script'; // <-- 1. NEXT.JS SCRIPT IMPORT KIYA

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
  let pixelId = null; // <-- 2. PIXEL ID STORE KARNE KE LIYE VARIABLE
  let whatsappNum = null; // <-- 1. YEH NAYI LINE ADD KAREIN

  // 2. FETCH AGENCY BRANDING GLOBALLY
  try {
    const res = await fetch(`${API_URL}/theme?agencyId=${AGENCY_ID}`, {
      next: { revalidate: 0 }
    });
    
    const tenant = await res.json();

    if (tenant && !tenant.error) {
      
      // 3. BACKEND SE PIXEL ID GET KIYA
      pixelId = tenant.metaPixelId; 
      whatsappNum = tenant.whatsappNumber; // <-- 2. YEH NAYI LINE ADD KAREIN

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
      <head>
        {/* 4. META PIXEL SCRIPT INJECTION (Sirf tab chalay ga jab ID mojood ho) */}
        {pixelId && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>

      {/* 3. INJECT THE BACKEND COLORS INTO THE BODY TAG! */}
      <body style={globalTheme} className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montez.variable} antialiased`}>
        
        {/* 5. META PIXEL NOSCRIPT FALLBACK (Un browsers k liye jahan JS disable ho) */}
        {pixelId && (
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt="Meta Pixel"
            />
          </noscript>
        )}

        <ThemeProvider attribute="class" defaultTheme="light">
          
          {children}
          
          {/* Because these sit inside the body, they now have access to var(--theme-primary)! */}
          {/* Layout mein jahan button render ho raha hai */}
          <WhatsAppButton phone={whatsappNum} />
          <ScrollToTop />
          
        </ThemeProvider>
      </body>
    </html>
  );
}