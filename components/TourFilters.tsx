"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function TourFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load existing filters from the URL if they exist
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  const applyFilters = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    
    // Push the new filters to the URL!
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <form onSubmit={applyFilters} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-10 items-center">
      
      <div className="flex-1 w-full relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Search destinations or tour names..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#003580] transition-all text-sm font-medium"
        />
      </div>

      <div className="w-full md:w-64">
      <div className="w-full md:w-64">
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            params.set('sort', e.target.value);
            router.push(`/tours?${params.toString()}`);
          }}
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#003580] transition-all text-sm font-bold text-gray-700 cursor-pointer appearance-none"
        >
          <option value="newest">Latest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          {/* THE FIX: Added Duration Sorting Options */}
          <option value="duration_asc">Duration: Shortest First</option>
          <option value="duration_desc">Duration: Longest First</option>
        </select>
      </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-8 py-4 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
        style={{ backgroundColor: 'var(--theme-primary)' }}
      >
        Search
      </button>

    </form>
  );
}