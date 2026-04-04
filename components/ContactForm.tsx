"use client";

import { useState } from 'react';
import { submitContact } from '@/app/actions/contact';

export default function ContactForm({ contactEmail }: { contactEmail?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await submitContact(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Message failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 p-12 rounded-3xl text-center shadow-sm h-full flex flex-col justify-center items-center min-h-[400px]">
        <div className="text-5xl mb-6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={"70px"} ><path fill="green" d="M64 112c0-26.5 21.5-48 48-48l416 0c26.5 0 48 21.5 48 48l0 81.4c-24.4-11.2-51.4-17.4-80-17.4-87.7 0-161.7 58.8-184.7 139.2-7.1-1.3-14.1-4.2-20.1-8.8l-208-156C71.1 141.3 64 127.1 64 112zM304 368c0 28.6 6.2 55.6 17.4 80L128 448c-35.3 0-64-28.7-64-64l0-188 198.4 148.8c12.6 9.4 26.9 15.4 41.7 17.9 0 1.8-.1 3.5-.1 5.3zm48 0a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm201.4-60.9c-7.1-5.2-17.2-3.6-22.4 3.5l-53 72.9-26.8-26.8c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c3.3 3.3 7.9 5 12.6 4.6s8.9-2.8 11.7-6.5l64-88c5.2-7.1 3.6-17.2-3.5-22.3z"/></svg></div>
        <h3 className="text-2xl font-black text-green-800 uppercase tracking-widest mb-3">Message Sent!</h3>
        <p className="text-green-700 font-medium text-lg max-w-sm">
          Thank you for reaching out. We have received your message and will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-8 text-sm font-bold text-green-600 hover:text-green-800 underline transition-colors cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100">
      <h3 className="text-2xl font-black mb-8" style={{ color: 'var(--theme-heading)', fontFamily:'var(--font-poppins)', fontWeight:"700" }}>
        Send a Message
      </h3>
      
      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
          <input type="hidden" name="agencyContactEmail" value={contactEmail || ""} />
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" style={{fontFamily:"var(--font-poppins)", fontWeight:"500"}}>Full Name</label>
            {/* THE FIX: Added name="name" */}
            <input type="text" name="name" placeholder="Ali Khan" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-blue-400 transition-colors font-medium" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" style={{fontFamily:"var(--font-poppins)", fontWeight:"500"}}>Email Address</label>
            {/* THE FIX: Added name="email" */}
            <input type="email" name="email" placeholder="ali@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-blue-400 transition-colors font-medium" required />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" style={{fontFamily:"var(--font-poppins)", fontWeight:"500"}}>Subject</label>
          {/* THE FIX: Added name="subject" */}
          <input type="text" name="subject" placeholder="Inquiry about Skardu Tour..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-blue-400 transition-colors font-medium" required />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" style={{fontFamily:"var(--font-poppins)", fontWeight:"500"}}>Your Message</label>
          {/* THE FIX: Added name="message" */}
          <textarea rows={5} name="message" placeholder="How can we help you?" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-blue-400 transition-colors resize-none font-medium" required></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full text-white font-black py-5 rounded-xl text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-md mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed" 
          style={{ backgroundColor: isSubmitting ? '' : 'var(--theme-primary)', fontFamily:'var(--font-poppins)', fontWeight:"700", fontSize:"16px", cursor: isSubmitting ? "not-allowed" : "pointer" }}
        >
          <div className='flex justify-center gap-3'>
            {isSubmitting ? "Sending..." : "Send Message"} 
            {!isSubmitting && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={"10px"}><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            )}
          </div>
        </button>
      </form>
    </div>
  );
}