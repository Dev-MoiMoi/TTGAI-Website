import { createClient } from '@supabase/supabase-js';

const url = 'https://qgtvlpoyonmnjecinaxw.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndHZscG95b25tbmplY2luYXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTY3NzQsImV4cCI6MjA4OTU3Mjc3NH0.tOzR4GLPvh1Fd64e_4WC85rJLoKgYapMcK3djIwEJlY';

const supabase = createClient(url, key);

async function testFetch() {
  console.log('Fetching active subscribers...');
  const { data, error } = await supabase
    .from('subscribers')
    .select('name, email, is_active');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total rows returned: ${data?.length || 0}`);
  const active = (data || []).filter(
    (s) => s.is_active === true || s.is_active === 'true' || s.is_active === null
  );
  console.log(`Filtered active: ${active.length}`);
  console.log('Sample row:', data?.[0]);
}

testFetch();
