"use client";

import { useState } from 'react';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm'; // Ensure this matches your path
import React from 'react';
import { X } from 'lucide-react';

function getDepartureDisplay(tour: any) {
    if (tour.departureType !== 'CUSTOM_DATE' || !tour.departureDate) {
        return "Departure: Client Choice";
    }

    const d = new Date(tour.departureDate);

    if (tour.departureEveryYear) {
        const today = new Date();
        let targetDate = new Date(today.getFullYear(), d.getMonth(), d.getDate());

        if (targetDate < today) {
            targetDate.setFullYear(today.getFullYear() + 1);
        }
        return `Departure: ${targetDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }

    return `Departure: ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

// Is file mein ab TypeScript ki types bilkul sahi hain
type TourClientProps = {
    tour: any;
    fixedDate?: string;
    isPro?: boolean;
    apiKey: string;
    apiUrl: string;
    agencyId?: string; // Yeh bilkul theek hai
};

export default function TourClient({ tour, fixedDate, isPro = false, apiKey, apiUrl }: TourClientProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [mainImage, setMainImage] = useState(tour.coverImage);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const allImages = [tour.coverImage, ...(tour.gallery || [])];

    return (
        <main className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-12 relative">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- HEADER --- */}
                <div>
                    <Link href="/" className="text-sm font-bold text-gray-500 hover:text-axius-primary transition-colors mb-4 inline-block">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-4xl lg:text-5xl font-black text-axius-secondary mb-3">{tour.title}</h1>
                    <div className="my-0 py-2 border-t border-b border-gray-100 flex items-center gap-2 text-gray-500" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "500", fontSize: "14px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"14px"}><path fill="var(--theme-heading)" d="M120 0c13.3 0 24 10.7 24 24l0 40 160 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-40c0-13.3 10.7-24 24-24zm0 112l-56 0c-8.8 0-16 7.2-16 16l0 48 352 0 0-48c0-8.8-7.2-16-16-16l-264 0zM48 224l0 192c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-192-352 0z" /></svg>
                        {getDepartureDisplay(tour)}
                    </div>
                    <p className="text-gray-500 font-medium flex flex-wrap items-center gap-4 text-sm mt-2">
                        <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "500" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={"12px"} style={{ marginRight: "8px" }}><path fill="var(--theme-heading)" d="M192 284.4C256.1 269.9 304 212.5 304 144 304 64.5 239.5 0 160 0S16 64.5 16 144c0 68.5 47.9 125.9 112 140.4L128 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-195.6zM168 96c-30.9 0-56 25.1-56 56 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4 46.6-104 104-104 13.3 0 24 10.7 24 24s-10.7 24-24 24z" /></svg> {tour.destination}</span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "500" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"16px"} style={{ marginRight: "8px" }} color='var(--theme-heading)' ><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg> {tour.duration}</span>
                    </p>
                </div>

                {/* --- HERO GALLERY --- */}
                <div className="space-y-4">
                    <div className="w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
                        <img src={mainImage} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>

                    {allImages.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto p-2 scrollbar-hide">
                            {allImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMainImage(img)}
                                    className={`flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden border-2 border-theme-primary transition-all ${mainImage === img ? 'border-axius-primary opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- MAIN CONTENT & SIDEBAR GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: Tabs & Content */}
                    <div className="lg:col-span-2 space-y-8 min-w-0">
                        <div className="flex flex-wrap bg-white rounded-2xl shadow-sm border border-gray-100 p-2 gap-2">
                            {['overview', 'itinerary', 'inclusions', 'policy'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-axius-theme-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-axius-secondary'}`}
                                >
                                    {tab === 'inclusions' ? 'Inclusions & Exclusions' : tab}
                                </button>
                            ))}
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10 min-h-[400px]">
                            {activeTab === 'overview' && (
                                <div className="animate-fadeIn">
                                    <h2 className="text-2xl font-black text-axius-secondary mb-6">Tour Overview</h2>
                                    {tour.overview ? (
                                        <div className="text-gray-600 leading-relaxed overflow-hidden break-words [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6" dangerouslySetInnerHTML={{ __html: tour.overview.replace(/&nbsp;/g, ' ') }} />
                                    ) : (
                                        <p className="text-gray-400 italic">Overview coming soon.</p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'itinerary' && (
                                <div className="animate-fadeIn">
                                    <h2 className="text-2xl font-black text-axius-secondary mb-8">Day-by-Day Itinerary</h2>
                                    <div className="space-y-8">
                                        {tour.itineraryDays?.map((day: any, index: number) => {
                                            const isEven = index % 2 === 0;
                                            const dynamicColor = isEven ? 'var(--theme-primary)' : 'var(--theme-accent)';

                                            return (
                                                <div key={day.id} className="relative flex gap-6">
                                                    {index !== tour.itineraryDays.length - 1 && (
                                                        <div className="absolute top-12 bottom-[-2rem] left-6 w-0.5 bg-gray-100"></div>
                                                    )}
                                                    <div className="relative z-10 w-12 h-12 bg-[#FBFDFF] border-2 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg flex-shrink-0 transition-colors" style={{ borderColor: dynamicColor, color: dynamicColor }}>
                                                        {day.dayNumber}
                                                    </div>
                                                    <div className="pt-2 pb-6 min-w-0">
                                                        <h3 className="text-lg font-bold text-axius-secondary">{day.title}</h3>
                                                        <p className="text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap break-words">{day.details}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'inclusions' && (
                                <div className="animate-fadeIn">
                                    <h2 className="text-2xl font-black text-axius-secondary mb-8">What's Included</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div>
                                            <h3 className="text-sm font-black uppercase text-green-600 tracking-widest mb-4 flex items-center gap-2">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"20px"} className='mr-1' style={{ paddingTop: "2px" }}><path fill="currentColor" d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z" /></svg></span> Inclusions
                                            </h3>
                                            <ul className="space-y-4">
                                                {tour.inclusions?.length > 0 ? tour.inclusions.map((inc: string, i: number) => (
                                                    <li key={i} className="flex gap-3 text-gray-600 text-sm font-medium">
                                                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                                                        <span className="break-words">{inc}</span>
                                                    </li>
                                                )) : <li className="text-gray-400 italic text-sm">No inclusions listed.</li>}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase text-red-500 tracking-widest mb-4 flex items-center gap-2">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"20px"} className='mr-1' style={{ paddingTop: "2px" }}><path fill="currentColor" d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM202.6 152.8l53.4 65.3 53.4-65.3c8.4-10.3 23.5-11.8 33.8-3.4s11.8 23.5 3.4 33.8L287 256 346.6 328.8c8.4 10.3 6.9 25.4-3.4 33.8s-25.4 6.9-33.8-3.4l-53.4-65.3-53.4 65.3c-8.4 10.3-23.5 11.8-33.8 3.4s-11.8-23.5-3.4-33.8L225 256 165.4 183.2c-8.4-10.3-6.9-25.4 3.4-33.8s25.4-6.9 33.8 3.4z" /></svg></span> Exclusions
                                            </h3>
                                            <ul className="space-y-4">
                                                {tour.exclusions?.length > 0 ? tour.exclusions.map((exc: string, i: number) => (
                                                    <li key={i} className="flex gap-3 text-gray-600 text-sm font-medium">
                                                        <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                                                        <span className="break-words">{exc}</span>
                                                    </li>
                                                )) : <li className="text-gray-400 italic text-sm">No exclusions listed.</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'policy' && (
                                <div className="animate-fadeIn">
                                    <h2 className="text-2xl font-black text-axius-secondary mb-6">Tour Policy & Terms</h2>
                                    {tour.policy ? (
                                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                            <div className="text-gray-600 leading-relaxed text-sm overflow-hidden break-words [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6" dangerouslySetInnerHTML={{ __html: tour.policy.replace(/&nbsp;/g, ' ') }} />
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 italic">Policies coming soon.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">

                            {/* Booking Box */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Price Per Person</p>
                                    <h3 className="text-4xl font-black text-axius-secondary" style={{ color: "var(--theme-primary)" }}>
                                        Rs. {tour.basePrice.toLocaleString()}
                                    </h3>

                                    {/* --- FOMO CAPACITY TRACKER --- */}
                                    {tour.maxCapacity !== null && tour.maxCapacity !== undefined && tour.maxCapacity !== 0 && (
                                        <div className="mt-4">
                                            {(tour.maxCapacity - (tour.bookedSpots || 0)) <= 0 ? (
                                                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-xl border border-red-100">
                                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                                    <span className=" uppercase tracking-widest" style={{fontFamily:"var(--font-poppins)", fontSize:"12px", fontWeight:"600"}}>Waitlist Open</span>
                                                </div>
                                            ) : (tour.maxCapacity - (tour.bookedSpots || 0)) <= 5 ? (
                                                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-xl border border-orange-100">
                                                    <span className="text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"14px"} height={"18px"}><path fill="currentColor" d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"/></svg></span>
                                                    <span className=" uppercase tracking-widest" style={{fontFamily:"var(--font-poppins)", fontSize:"14px", fontWeight:"600"}}>
                                                        Only {tour.maxCapacity - (tour.bookedSpots || 0)} spots left!
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 rounded-xl border border-green-100">
                                                    <span className="text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={"24px"} height={"18px"} ><path fill="currentColor" d="M496 208c-77.5 0-144.3 45.9-174.6 112l-1.4 0-64 0c-47.4 0-88.9 25.8-111 64.2 35.2 39.2 86.2 63.8 143 63.8 7.4 0 14.6-.4 21.7-1.2 5.5 21.9 14.8 42.4 27.1 60.6-15.8 3-32.1 4.6-48.8 4.6-141.4 0-256-114.6-256-256S146.6 0 288 0c126.8 0 232.1 92.2 252.4 213.2-14.3-3.4-29.1-5.2-44.4-5.2zM288 272a72 72 0 1 0 0-144 72 72 0 1 0 0 144zm64 128a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm201.4-60.9c-7.1-5.2-17.2-3.6-22.4 3.5l-53 72.9-26.8-26.8c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c3.3 3.3 7.9 5 12.6 4.6s8.9-2.8 11.7-6.5l64-88c5.2-7.1 3.6-17.2-3.5-22.3z"/></svg></span>
                                                    <span className="uppercase tracking-widest" style={{fontFamily:"var(--font-poppins)", fontSize:"14px", fontWeight:"600"}}>
                                                        Spots Available
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {tour.bookingMode !== 'WHATSAPP' && (
                                        <button
                                            onClick={() => setIsBookingModalOpen(true)}
                                            className="w-full py-4 rounded-xl text-white font-black text-sm uppercase tracking-widest shadow-lg hover:opacity-90 transition-all"
                                            style={{ backgroundColor: "var(--theme-primary)", cursor:"pointer" }}
                                        >
                                            Request to Book
                                        </button>
                                    )}

                                    {tour.bookingMode === 'BOTH' && (
                                        <div className="flex items-center gap-4 px-2 my-4">
                                            <div className="h-px bg-gray-200 flex-1"></div>
                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Or</span>
                                            <div className="h-px bg-gray-200 flex-1"></div>
                                        </div>
                                    )}

                                    {tour.bookingMode !== 'FORM' && (
                                        <a
                                            href={`https://wa.me/923393836344?text=${encodeURIComponent(`Hello! I am interested in booking the "${tour.title}" for Rs. ${tour.basePrice.toLocaleString()}. Please share more details.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#1ebd5a] transition flex items-center justify-center gap-2 text-center shadow-md"
                                            style={{ fontFamily: 'var(--font-poppins)', fontWeight: "bold", fontSize: "16px" }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"26px"} style={{ marginRight: "10px" }} ><path fill="currentColor" d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" /></svg> Book on WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Need Help Box */}
                            <div className="bg-[#FBFDFF] rounded-3xl shadow-sm border border-gray-100 p-8">
                                <h3 className="text-xl font-black text-axius-secondary mb-6" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "bold" }}>Need Help?</h3>
                                <ul className="space-y-5">
                                    <li className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-axius-primary flex items-center justify-center text-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"18px"} color='var(--theme-heading)' ><path fill="currentColor" d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z" /></svg></div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold">Call us on</p>
                                            <p className="text-sm font-black text-axius-secondary" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "bold" }}>+92 339 3836344</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-axius-primary flex items-center justify-center text-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"18px"} color='var(--theme-heading)' ><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg></div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold">Timing</p>
                                            <p className="text-sm font-black text-axius-secondary" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "bold" }}>10AM to 7PM</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* --- THE UPGRADED RESPONSIVE MODAL --- */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl w-[95vw] md:w-[80vw] max-w-5xl max-h-[95vh] flex flex-col overflow-hidden relative">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start gap-4 bg-white z-10 flex-shrink-0">
                            <div className="overflow-hidden">
                                <h2 className="text-lg font-black text-axius-secondary uppercase tracking-widest">Request to Book</h2>
                                <p className="text-xs font-bold text-gray-500 mt-1 truncate">{tour.title}</p>
                            </div>
                            <button
                                onClick={() => setIsBookingModalOpen(false)}
                                className="w-8 h-8 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 bg-gray-50/30">
                        {/* 2. PASSED DYNAMIC API KEY AND URL TO BOOKING FORM */}
                        <BookingForm 
                            tourId={tour.id} 
                            basePrice={tour.basePrice} 
                            tenantId={tour.tenantId} 
                            fixedDate={fixedDate} 
                            isSoldOut={(tour.maxCapacity !== null && (tour.maxCapacity - (tour.bookedSpots || 0)) <= 0)}
                            availableSpots={tour.maxCapacity !== null ? (tour.maxCapacity - (tour.bookedSpots || 0)) : null}
                            blockedDates={tour.blockedDates ? JSON.parse(tour.blockedDates) : []} 
                            
                            apiKey={apiKey} // <--- Passed securely down from page.tsx!
                            apiUrl={apiUrl} // <--- Passed securely down from page.tsx!
                            
                            tourAddOns={tour.addOns ? JSON.parse(tour.addOns) : []}
                            isPro={isPro || tour.tenant?.planTier === 'PRO'} 
                        />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}