"use client";

import { useState } from 'react';
import { submitCustomTour } from '@/app/actions/customTour';

// 1. Accept the tenantId prop
export default function CustomTourForm({ tenantId }: { tenantId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 2. Bind the tenantId to the server action
  const formAction = submitCustomTour.bind(null, tenantId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // 3. Call the bound action
      await formAction(formData);
      setIsSuccess(true);
// ... rest of the file stays exactly the same ...
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 p-12 rounded-3xl text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-5xl mb-6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"60px"} height={"70px"}><path fill="var(--color-green-800)" d="M264.3 24a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm-8 181.3l-22.6 22.6c-6 6-9.4 14.1-9.4 22.6l0 37.5c0 12.3-7 23-17.2 28.4-.9 4.2-2.4 8.4-4.3 12.3l-69 138.1-.8-.4-27.7 55.3c-9.9 19.8-33.9 27.8-53.7 17.9L14.6 521c-19.8-9.9-27.8-33.9-17.9-53.7L47.3 366.3c9.9-19.8 33.9-27.8 53.7-17.9l30.7 15.3 28.3-56.6c.3-.6 .4-1.2 .4-1.8l0-16.9c0-.2 0-.3 0-.5l0-37.5c0-25.5 10.1-49.9 28.1-67.9l35.1-35.1c22.8-22.8 53.6-35.6 85.8-35.6 36.9 0 71.8 16.8 94.8 45.6L422.1 180c6.1 7.6 15.3 12 25 12l33.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-33.2 0c-29.2 0-56.7-13.3-75-36l-3.8-4.7 0 115.2 34.5 29.6c17.7 15.2 29.3 36.2 32.6 59.3L448 507.5c2.5 17.5-9.7 33.7-27.2 36.2s-33.7-9.7-36.2-27.2L372 428.4c-1.1-7.7-5-14.7-10.9-19.8l-71.4-61.2c-21.3-18.2-33.5-44.9-33.5-72.9l0-69.3zm.1 165.8c2.4 2.3 4.8 4.6 7.4 6.8l46 39.4-2.2 7.6c-4.5 15.7-12.9 30-24.4 41.5l-68.3 68.3c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L238 421.1c3.8-3.8 6.6-8.6 8.1-13.8L256.4 371z"/></svg></div>
        <h3 className="text-2xl font-black text-green-800 uppercase tracking-widest mb-3">Trip Request Sent!</h3>
        <p className="text-green-700 font-medium text-lg max-w-md mx-auto">
          Thank you for trusting us with your adventure. One of our travel experts will review your preferences and contact you shortly with a personalized itinerary.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-8 text-sm font-bold text-green-600 hover:text-green-800 underline transition-colors cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-gray-100 pb-6 text-center md:text-left">
        <h3 className="text-2xl font-black mb-2" style={{ color: 'var(--theme-heading)', fontFamily:'var(--font-poppins)' }}>
          Tailor-Made Journey
        </h3>
        <p className="text-gray-500 font-medium text-sm">
          Customize your holiday to suit your exact preferences. Fill out the details below and we will craft the perfect itinerary.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* SECTION 1: Personal Info */}
        <div className="space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">1. Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Full Name <span className="text-red-500">*</span></label>
              <input type="text" name="fullName" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Email Address <span className="text-red-500">*</span></label>
              <input type="email" name="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Phone Number <span className="text-red-500">*</span></label>
              <input type="tel" name="phone" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">City & Country</label>
              <input type="text" name="cityCountry" placeholder="e.g. Lahore, Pakistan" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium" />
            </div>
          </div>
        </div>

        {/* SECTION 2: Travel Details */}
        <div className="space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 border-t border-gray-100 pt-8">2. Travel Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Travel Date From <span className="text-red-500">*</span></label>
              <input type="date" name="dateFrom" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium text-gray-700" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Travel Date To <span className="text-red-500">*</span></label>
              <input type="date" name="dateTo" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium text-gray-700" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Number of Travelers <span className="text-red-500">*</span></label>
              <input type="number" min="1" name="travelers" defaultValue="2" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Accommodation Preference</label>
              <select name="accommodation" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium text-gray-700">
                <option value="Any">No Preference</option>
                <option value="Standard (3 Star)">Standard (3 Star)</option>
                <option value="Deluxe (4 Star)">Deluxe (4 Star)</option>
                <option value="Luxury (5 Star)">Luxury (5 Star)</option>
                <option value="Glamping/Camps">Glamping / Camps</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: Preferences (Checkboxes) */}
        <div className="space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 border-t border-gray-100 pt-8">3. Preferences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Destinations */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-4">Destinations Interested In</label>
              <div className="space-y-3">
                {['Gilgit-Baltistan', 'Hunza & Skardu', 'Swat & KPK', 'Kashmir', 'Balochistan', 'Federal Capital / Punjab', 'Sindh'].map((dest) => (
                  <label key={dest} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" name="destinations" value={dest} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">{dest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tour Types */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-4">Tour Style</label>
              <div className="space-y-3">
                {['Adventure & Trekking', 'Cultural & Heritage', 'Family Retreat', 'Honeymoon Package', 'Corporate & Team Building', 'Special Interest / Photography'].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" name="tourTypes" value={type} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 4: Final Details */}
        <div className="space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 border-t border-gray-100 pt-8">4. Final Details</h4>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600">Estimated Total Budget (Optional)</label>
            <input type="text" name="budget" placeholder="e.g. Rs. 150,000 to Rs. 300,000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 font-medium" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600">Additional Requirements</label>
            <textarea rows={5} name="requirements" placeholder="Tell us more about your dream trip... dietary restrictions, specific sites you want to see, etc." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-blue-400 transition-colors resize-none font-medium"></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 text-white font-black py-5 rounded-xl text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-md mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed" 
          style={{ backgroundColor: isSubmitting ? '' : 'var(--theme-primary)', fontFamily:'var(--font-poppins)', fontWeight:"700", cursor: isSubmitting ? "not-allowed" : "pointer" }}
        >
          {isSubmitting ? "Submitting Request..." : "Submit Custom Tour Request"}
        </button>
      </form>
    </div>
  );
}