import { createClient } from '@supabase/supabase-js';

const url = 'https://qgtvlpoyonmnjecinaxw.supabase.co';
const key = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndHZscG95b25tbmplY2luYXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTY3NzQsImV4cCI6MjA4OTU3Mjc3NH0.tOzR4GLPvh1Fd64e_4WC85rJLoKgYapMcK3djIwEJlY'; // from previous file

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from('newsletters').select('*').limit(1);
  console.log(data, error);
}
check();
