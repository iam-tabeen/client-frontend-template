import HomePage1 from '@/components/Theme1/HomePage1';
 import HomePage2 from '@/components/Theme2/HomePage2';
 import HomePage3 from '@/components/Theme3/HomePage3';

// Ensure the page always fetches fresh data from your SaaS engine
export const dynamic = 'force-dynamic';

export default function PublicWebsiteRoot() {
  
  // 🟢 ACTIVE THEME (Currently showing Theme 1 to the world)
  return <HomePage3/>;

  // 🔴 INACTIVE THEMES (To switch, comment out HomePage1 and uncomment one below)
  // return <HomePage2 />;

}
