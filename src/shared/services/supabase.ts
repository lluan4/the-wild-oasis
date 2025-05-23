import { createClient } from '@supabase/supabase-js';

const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;
export const SUPA_BASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

const supabase = createClient(SUPA_BASE_URL, SUPABASE_KEY);

export default supabase;
