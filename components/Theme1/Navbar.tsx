"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Mountain } from "lucide-react";

interface NavbarProps {
  companyName: string;
  logoUrl?: string | null;
}

const Navbar = ({ companyName, logoUrl }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 transition-colors duration-500"
      style={{ backgroundColor: '#00000045' }}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:px-16 px-6">
        
        {/* Logo OR Text/Icon */}
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={companyName} 
              className="h-10 w-auto object-contain drop-shadow-md" 
            />
          ) : (
            <Mountain className="h-7 w-7 text-white" />
          )}
        </Link>

        {/* THE FIX: Added the Customize button to the Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:opacity-80 transition-opacity" style={{color:"var(--navlink)", fontFamily:"var(--font-poppins)"}}>Home</Link>
          <Link href="/tours" className="hover:opacity-80 transition-opacity" style={{color:"var(--navlink)", fontFamily:"var(--font-poppins)"}}>Tours</Link>
          <Link href="/contact" className="hover:opacity-80 transition-opacity" style={{color:"var(--navlink)", fontFamily:"var(--font-poppins)"}}>Contact Us</Link>
          
          <Link
            href="/custom-tour"
            className="inline-block px-4 py-2 text-[0.88rem] font-medium tracking-wide transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "var(--theme-button)", color: "#fff", borderRadius:"8px", fontFamily:"var(--font-poppins)" }}
          >
            Customize My Trip
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white z-50">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* The Mobile Menu Dropdown */}
      {open && (
        <div 
          className="md:hidden absolute top-16 left-0 right-0 border-b border-white/10 flex flex-col items-center py-8 gap-6 shadow-2xl backdrop-blur-xl"
          style={{ backgroundColor: 'var(--theme-primary)' }}
        >
          <Link 
            href="/" 
            onClick={() => setOpen(false)} 
            className="text-lg hover:opacity-80 transition-opacity"
            style={{color:"var(--navlink)", fontFamily:"var(--font-poppins)"}}
          >
            Home
          </Link>
          
          <Link 
            href="/tours" 
            onClick={() => setOpen(false)} 
            className="text-lg hover:opacity-80 transition-opacity"
            style={{color:"var(--navlink)", fontFamily:"var(--font-poppins)"}}
          >
            Tours
          </Link>

          <Link 
            href="/contact" 
            onClick={() => setOpen(false)} 
            className="text-lg hover:opacity-80 transition-opacity"
            style={{color:"var(--navlink)", fontFamily:"var(--font-poppins)"}}
          >
            Contact Us
          </Link>
          
          <Link
            href="/custom-tour"
            onClick={() => setOpen(false)}
            className="inline-block mt-2 px-8 py-3 text-sm font-medium tracking-wide transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--theme-button)", color: "#fff", borderRadius:"8px", fontFamily:"var(--font-poppins)" }}
          >
            Customize My Trip
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;