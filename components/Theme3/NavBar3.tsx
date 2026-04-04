"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  companyName: string;
  logoUrl?: string | null;
}

const Navbar = ({ companyName, logoUrl }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* ==============================
          Mobile Menu Overlay
      ============================== */}
      <div
        className={`th-menu-wrapper onepage-nav fixed inset-0 z-[1050] bg-black/80 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="th-menu-area text-center bg-white w-[300px] h-full overflow-y-auto py-8 px-6 relative ml-auto shadow-2xl">
          {/* Close Button */}
          <button
            className="th-menu-toggle absolute top-4 right-4 text-2xl text-gray-600 hover:text-[#1CA8CB]"
            onClick={() => setMobileOpen(false)}
          >
            <X size={22} />
          </button>

          {/* Mobile Logo */}
          <div className="mobile-logo mb-6 flex">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              {logoUrl ? (
                <img src={logoUrl} alt={companyName} className="h-10 w-auto mx-auto " />
              ) : (
                <span className="text-2xl font-bold text-[#1CA8CB]">{companyName}</span>
              )}
            </Link>
          </div>

          {/* Mobile Nav Links */}
          <div className="th-mobile-menu text-left">
            <ul className="space-y-1">
              {/* Home */}
              <li className="border-b border-gray-100">
                <button
                  className="w-full flex justify-between items-center py-3 px-2 text-[#113D48] font-semibold hover:text-[#1CA8CB] transition-colors"
                  onClick={() => toggleDropdown("home")}
                style={{cursor:"pointer"}}>
                  Home
                  
                </button>
                
              
              </li>

              {/* About Us */}
              <li className="border-b border-gray-100">
                <Link
                  href="/tours"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-2 text-[#113D48] font-semibold hover:text-[#1CA8CB] transition-colors"
                >
                  Tours
                </Link>
              </li>

              <li className="border-b border-gray-100">
                <Link
                  href="/custom-tour"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-2 text-[#113D48] font-semibold hover:text-[#1CA8CB] transition-colors"
                >
                  Customize Tour
                </Link>
              </li>

              

              {/* Contact */}
              <li>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-2 text-[#113D48] font-semibold hover:text-[#1CA8CB] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ==============================
          Main Header
      ============================== */}
      <header
        className="th-header header-layout1"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 99 }}
      >
        {/* ---- Header Top Bar ---- */}
        {/* HIDING ON MOBILE: Added 'hidden md:block' here */}
        <div className="header-top border-b border-white/10 py-2 bg-[#0071a9] hidden md:block">
          <div className=" mx-auto px-4 xl:px-6">
            <div className="flex items-center justify-between">
              {/* Left: Address & Hours */}
              <div className="hidden md:flex items-center gap-6">
                <div className="hidden xl:flex items-center gap-2 text-sm text-white/80">
                  <i className="fa-sharp fa-regular fa-location-dot text-[#1CA8CB]"></i>
                  <span>45 New Eskaton Road, Austria</span>
                </div>
                <div className="hidden xl:flex items-center gap-2 text-sm text-white/80">
                  <i className="fa-regular fa-clock text-[#1CA8CB]"></i>
                  <span>Sun to Friday: 8.00 am - 7.00 pm</span>
                </div>
              </div>

              {/* Right: Language, FAQ, Support, Sign In */}
              <div className="ml-auto flex items-center gap-4">
                <Link
                  href="/faq"
                  className="hidden md:inline text-sm text-white/80 hover:text-[#1CA8CB] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/contact"
                  className="hidden md:inline text-sm text-white/80 hover:text-[#1CA8CB] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Sticky Menu Area ---- */}
        <div className="sticky-wrapper">
          <div className="menu-area py-3 relative z-10" style={{backgroundColor:"var(--theme-primary)"}}>
            <div className=" mx-auto px-4 xl:px-6 relative z-20">
              <div className="flex items-center justify-between gap-4">

                {/* Logo */}
                <div className="header-logo flex-shrink-0">
                  <Link href="/">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={companyName}
                        className="h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-[#113D48]">{companyName}</span>
                    )}
                  </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="main-menu hidden xl:flex items-center gap-1 mr-auto" style={{marginLeft:"6rem"}}>
                  {/* Home */}
                  <div className="group relative">
                    <Link
                      href="/"
                      className="px-4 py-2 text-white text-sm hover:text-[#ff8000] transition-colors inline-flex items-center gap-1"
                    style={{fontFamily:"var(--font-poppins)", fontWeight:"500"}}>
                      Home
                    </Link>
                  </div>

                  {/* Tours */}
                  <Link
                    href="/tours"
                    className="px-4 py-2 text-white text-sm hover:text-[#ff8000] transition-colors inline-flex items-center gap-1"
                    style={{fontFamily:"var(--font-poppins)", fontWeight:"500"}}
                  >
                    Tours
                  </Link>

                  {/* Contact Us */}
                  <div className="group relative">
                    <Link
                      href="/contact"
                      className="px-4 py-2 text-white text-sm hover:text-[#ff8000] transition-colors inline-flex items-center gap-1"
                      style={{ fontFamily: "var(--font-poppins)", fontWeight: "500" }}
                    >
                      Contact Us
                    </Link>
                  </div>
                </nav>

                {/* Book Now CTA (desktop) */}
                <div className="hidden xl:block flex-shrink-0">
                  <Link
                    href="/custom-tour"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-[#0db0ff] rounded transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: "white" }}
                  >
                    Customize Tour
                    <i className="fa-regular fa-paper-plane text-xs"></i>
                  </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setMobileOpen(true)}
                  className="xl:hidden text-white z-50 p-1"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

            {/* THE FIX: Responsive width for logo background mask. Wider on mobile (60%), narrower on desktop (20%) */}
            <div
              className="logo-bg absolute top-0 left-0 h-full pointer-events-none w-[60%] sm:w-[40%] lg:w-[25%] xl:w-[20%]"
              style={{
                WebkitMaskImage: "url('/assets/logo_bg_mask.png')",
                maskImage: "url('/assets/logo_bg_mask.png')",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "left bottom",
                maskPosition: "left bottom",
                backgroundColor: "#ffffff",
                zIndex: 10,
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;