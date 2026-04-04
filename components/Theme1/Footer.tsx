"use client";

import { useState } from "react";
  import Link from "next/link";
import { Mountain, Phone, Mail, MapPin } from "lucide-react";

// 1. Add logoUrl to the interface


interface FooterProps {
  companyName: string;
  logoUrl?: string | null;
}

const Footer = ({ companyName, logoUrl }: FooterProps) => {
  return (
    <footer 
  style={{ backgroundColor: 'var(--theme-footer)' }} 
  className="relative text-primary-foreground py-14 px-16 overflow-hidden"
>
  {/* Background Image Layer */}
  <div 
    className="absolute inset-0 z-0 pointer-events-none"
    style={{ 
      backgroundImage: 'url("https://res.cloudinary.com/dmjgwmkuy/image/upload/v1772802340/palm-tree_xnc7iv.png")', 
      backgroundSize: '250px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom left',
      opacity: 0.3 
    }}
  />

  {/* Content Layer */}
  <div className="container mx-auto px-0 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      
      {/* Brand Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Link href="/" className="flex items-center gap-0">
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
        </div>
        <p className="opacity-70 text-sm leading-relaxed">
          Pakistan's premier domestic tour agency. We craft unforgettable journeys through the
          breathtaking northern valleys and beyond.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 
          className="font-semibold text-lg mb-4"
          style={{ fontFamily: 'var(--font-poppins)', color: 'var(--theme-heading)' }}
        >
          Quick Links
        </h4>
        <ul className="space-y-2 text-sm opacity-70">
          {[
            { label: "Home", to: "/" },
            { label: "Tour Packages", to: "/tours" },
            { label: "Contact", to: "/contact" },
          ].map((link) => (
            <li key={link.label}>
              <Link 
                href={link.to} 
                className="transition-colors hover:opacity-100"
                style={{ color: 'inherit' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Section */}
      <div>
        <h4 
          className="font-semibold text-lg mb-4"
          style={{ fontFamily: 'var(--font-poppins)', color: 'var(--theme-heading)' }}
        >
          Contact Us
        </h4>
        <ul className="space-y-3 text-sm opacity-70">
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4" style={{ color: 'var(--theme-accent)' }} /> 
            +92 300 1234567
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4" style={{ color: 'var(--theme-accent)' }} /> 
            info@pakvoyage.pk
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4" style={{ color: 'var(--theme-accent)' }} /> 
            F-7 Markaz, Islamabad
          </li>
        </ul>
      </div>

      {/* Map Section */}
      <div>
        <h4 
          className="font-semibold text-lg mb-4"
          style={{ fontFamily: 'var(--font-poppins)', color: 'var(--theme-heading)' }}
        >
          Find Us
        </h4>
        <div 
          className="rounded-xl overflow-hidden border h-44"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <iframe
            title={`${companyName} Office Location`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.572481061266!2d73.0536486!3d33.719918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf9002237889%3A0x6a1006526be4c83d!2sF-7%20Markaz%20Islamabad!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div 
      className="border-t mt-10 pt-6 text-center text-xs opacity-50"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      © {new Date().getFullYear()} {companyName}. All rights reserved.
    </div>
  </div>
</footer>
  );
};

export default Footer;