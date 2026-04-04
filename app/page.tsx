import HomePage1 from '@/components/Theme1/HomePage1';
import HomePage2 from '@/components/Theme2/HomePage2';
import HomePage3 from '@/components/Theme3/HomePage3';

export const revalidate = 0; 
export const dynamic = 'force-dynamic';

export default async function PublicWebsiteRoot() {
  // 1. Get the Agency ID from Environment Variables
  const agencyId = process.env.NEXT_PUBLIC_AGENCY_ID || '';

  // 2. Pass the ID to the Theme so it knows WHOSE tours to fetch
  return <HomePage3 agencyId={agencyId} />;
}