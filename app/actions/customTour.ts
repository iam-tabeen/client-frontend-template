"use server";

export async function submitCustomTour(tenantId: string, formData: FormData) {
  // 1. THE HEADLESS CONNECTION
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const API_KEY = process.env.AGENCY_API_KEY || '';

  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const cityCountry = formData.get('cityCountry') as string;
  const dateFrom = formData.get('dateFrom') as string;
  const dateTo = formData.get('dateTo') as string;
  const travelers = formData.get('travelers') as string;
  const accommodation = formData.get('accommodation') as string;
  const budget = formData.get('budget') as string;
  const requirements = formData.get('requirements') as string;

  const destinations = formData.getAll('destinations') as string[];
  const tourTypes = formData.getAll('tourTypes') as string[];

  // 2. SEND TO BACKEND ENGINE VIA API
  try {
    const response = await fetch(`${API_URL}/api/public/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY 
      },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        cityCountry,
        dateFrom,
        dateTo,
        travelers,
        accommodation,
        budget,
        destinations: destinations.join(', '),
        tourTypes: tourTypes.join(', '),
        requirements
      })
    });

    const result = await response.json();

    if (!result.success) {
      console.error("Backend rejected the lead:", result.error);
      return { success: false, error: result.error || "Failed to submit lead" };
    }
    
    return { success: true };

  } catch (error) {
    console.error("API Fetch Error:", error);
    return { success: false, error: "Network error submitting lead." };
  }
}