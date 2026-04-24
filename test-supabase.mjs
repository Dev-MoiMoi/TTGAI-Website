import { createClient } from '@supabase/supabase-js';

const url = 'https://qgtvlpoyonmnjecinaxw.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndHZscG95b25tbmplY2luYXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTY3NzQsImV4cCI6MjA4OTU3Mjc3NH0.tOzR4GLPvh1Fd64e_4WC85rJLoKgYapMcK3djIwEJlY';

const cb = createClient(url, key);

async function test() {
  console.log('Testing insert...');
  const { data, error } = await cb.from('subscribers').insert({ name: 'Moises Jr', email: 'fatalmoises1231@gmail.com' });
  console.log('Error:', error);
  console.log('Data:', data);
}

test();
