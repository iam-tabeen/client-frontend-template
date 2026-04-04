"use client";
import { useState } from 'react';

export default function BookingForm({
  tourId,
  tenantId, // Kept for reference if needed
  apiKey,   // <-- NEW: API Key prop
  apiUrl,   // <-- NEW: Base API URL prop
  basePrice,
  fixedDate,
  isSoldOut = false,
  availableSpots = null,
  blockedDates = [],
  tourAddOns = [],
  isPro = false
}: {
  tourId: string;
  tenantId: string;
  apiKey: string;
  apiUrl: string;
  basePrice: number;
  fixedDate?: string | null;
  isSoldOut?: boolean;
  availableSpots?: number | null;
  blockedDates?: string[];
  tourAddOns?: { name: string; price: number }[];
  isPro?: boolean;
}) {
  const [travelers, setTravelers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Promo Code States
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);

  // Add-on State (stores indices of selected items)
  const [selectedAddOnIndices, setSelectedAddOnIndices] = useState<number[]>([]);

  // --- PRICE CALCULATIONS ---
  const subtotalBase = basePrice * travelers;

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'PERCENTAGE') {
      discountAmount = subtotalBase * (appliedPromo.discountValue / 100);
    } else if (appliedPromo.discountType === 'FIXED') {
      discountAmount = appliedPromo.discountValue;
    }
  }

  const addonsTotal = selectedAddOnIndices.reduce((acc, idx) => acc + (tourAddOns[idx].price), 0);
  const finalTotal = subtotalBase - discountAmount + addonsTotal;

  // --- DYNAMIC LOGIC ---
  const isWaitlistMode = isSoldOut || (availableSpots !== null && travelers > availableSpots);

  // --- HEADLESS SUBMIT HANDLER ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop the form from reloading the page
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const addOnNames = selectedAddOnIndices.map(idx => tourAddOns[idx].name).join(', ');

    const payload = {
      tourId: tourId,
      fullName: formData.get('customerName'),
      email: formData.get('customerEmail'),
      phone: formData.get('customerPhone'),
      travelDate: formData.get('travelDate'),
      travelers: travelers.toString(),
      specialNotes: formData.get('specialNotes'),
      selectedAddOns: addOnNames,
      finalPrice: finalTotal,
      promoCodeId: appliedPromo ? appliedPromo.id : null,
      isWaitlist: isWaitlistMode
    };

    try {
      const response = await fetch(`${apiUrl}/public/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey // Secure the route
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
      } else {
        alert(result.error || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking API Error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- HEADLESS PROMO VALIDATOR ---
  const handleApplyPromo = async () => {
    if (!promoInput) return;
    setIsCheckingPromo(true);
    setPromoMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${apiUrl}/public/promos?code=${promoInput}`, {
        headers: { 'x-api-key': apiKey }
      });
      const result = await response.json();

      if (result.error) {
        setPromoMessage({ text: result.error, type: 'error' });
        setAppliedPromo(null);
      } else if (result.success) {
        setPromoMessage({ text: 'Promo applied!', type: 'success' });
        setAppliedPromo(result.promo);
        setPromoInput('');
      }
    } catch (err) {
      setPromoMessage({ text: "Failed to verify promo.", type: 'error' });
    } finally {
      setIsCheckingPromo(false);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoMessage({ text: '', type: '' });
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center shadow-sm flex flex-col justify-center items-center">
        <div className="text-4xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"50px"} height={"50px"}><path fill="green" d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z" /></svg>
        </div>
        <h3 className="text-xl font-black text-green-800 uppercase tracking-widest mb-2">
          {isWaitlistMode ? "Waitlist Confirmed!" : "Request Received!"}
        </h3>
        <p className="text-green-700 font-medium text-sm">
          Check your email/WhatsApp soon! Our team is processing your request.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl border border-gray-100" style={{ border: "3px solid var(--theme-heading)" }}>
      <h3 className="text-xl font-black text-axius-secondary uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
        {isWaitlistMode ? "Join the Waitlist" : "Request to Book"}
      </h3>

      {/* Changed action= to onSubmit= */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-xs font-black text-axius-secondary uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "bold" }}>Full Name</label>
          <input type="text" name="customerName" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-axius-primary bg-gray-50 focus:bg-white transition-all" placeholder="Enter your full name" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-axius-secondary uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "bold" }}>Email</label>
            <input type="email" name="customerEmail" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-axius-primary bg-gray-50 focus:bg-white transition-all" placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-xs font-black text-axius-secondary uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "bold" }}>Phone</label>
            <input type="tel" name="customerPhone" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-axius-primary bg-gray-50 focus:bg-white transition-all" placeholder="Your phone number" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-axius-secondary uppercase tracking-widest mb-2">Travel Date</label>
            <input
              type="date"
              name="travelDate"
              required
              defaultValue={fixedDate || undefined}
              readOnly={!!fixedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                if (blockedDates.includes(e.target.value)) {
                  alert("Date unavailable.");
                  e.target.value = '';
                }
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none bg-gray-50 focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-axius-secondary uppercase tracking-widest mb-2">Travelers</label>
            <input
              type="number"
              name="numTravelers"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-axius-secondary uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-poppins)', fontWeight: "bold" }}>Special Requests</label>
          <textarea name="specialNotes" rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-axius-primary bg-gray-50 focus:bg-white transition-all" placeholder="e.g., Dietary requirements..."></textarea>
        </div>

        {/* --- ADD-ONS SECTION --- */}
        {tourAddOns.length > 0 && (
          <div className="space-y-3 pt-2">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Optional Extras</p>
            {tourAddOns.map((addon, i) => (
              <label key={i} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${selectedAddOnIndices.includes(i) ? 'border-blue-400 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-400"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedAddOnIndices([...selectedAddOnIndices, i]);
                      else setSelectedAddOnIndices(selectedAddOnIndices.filter(idx => idx !== i));
                    }}
                  />
                  <span className="text-sm font-bold text-gray-700">{addon.name}</span>
                </div>
                <span className="text-xs font-black text-blue-500 tracking-tighter">+ Rs. {addon.price.toLocaleString()}</span>
              </label>
            ))}
          </div>
        )}

        {/* --- PROMO SECTION (HIDDEN IF NOT PRO) --- */}
        {isPro && (
          <div className="pt-2">
            {!appliedPromo ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold uppercase outline-none"
                />
                <button type="button" onClick={handleApplyPromo} disabled={isCheckingPromo} className="shrink-0 bg-gray-800 text-white px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-gray-700 transition disabled:opacity-50">
                  {isCheckingPromo ? '...' : 'Apply'}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-xl">
                <span className="text-green-800 font-black text-xs uppercase">{appliedPromo.code} - {appliedPromo.discountValue}{appliedPromo.discountType === 'PERCENTAGE' ? '%' : ' OFF'}</span>
                <button type="button" onClick={removePromo} className="text-[10px] font-bold text-red-500 uppercase cursor-pointer hover:underline">Remove</button>
              </div>
            )}
            {/* Optional UI feedback for Promos */}
            {promoMessage.text && (
              <p className={`text-xs font-bold mt-2 ${promoMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                {promoMessage.text}
              </p>
            )}
          </div>
        )}

        {/* --- LIVE TOTAL --- */}
        <div className="flex justify-between items-end pt-4 border-t border-gray-100 mt-2">
          <div>
            {(isPro || addonsTotal > 0) && (
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price Summary</p>
            )}
            {isPro && (
              <p className="text-xs text-gray-500 font-medium">Base: Rs. {(basePrice * travelers).toLocaleString()}</p>
            )}

            {addonsTotal > 0 && <p className="text-xs text-blue-600 font-medium">Extras: + Rs. {addonsTotal.toLocaleString()}</p>}
            {discountAmount > 0 && <p className="text-xs text-green-600 font-medium">Discount: - Rs. {discountAmount.toLocaleString()}</p>}
          </div>
          <div className="text-right">
            <p className="text-2xl font-black" style={{ color: "var(--theme-primary)" }}>
              Rs. {finalTotal.toLocaleString()}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white cursor-pointer font-black py-4 rounded-xl text-sm uppercase tracking-widest shadow-md disabled:bg-gray-400 transition-colors"
          style={{ backgroundColor: isWaitlistMode ? "#DC2626" : "var(--theme-primary)" }}
        >
          {isSubmitting ? "Processing..." : isWaitlistMode ? "Join Waitlist" : "Confirm Booking Request"}
        </button>
      </form>
    </div>
  );
}