"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Check if we are anywhere inside the admin dashboard
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      // Removed the dynamic 'bottom-x' class from here so Tailwind doesn't get confused
      className={`fixed right-8 z-[99] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:opacity-90 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      // 👇 Applied the positioning via inline styles to guarantee it always renders!
      style={{ 
        backgroundColor: 'var(--theme-primary)', 
        color: 'white', 
        cursor: "pointer",
        bottom: isAdmin ? '32px' : '104px' // 32px equals bottom-8, 104px equals bottom-26
      }}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}