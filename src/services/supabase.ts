import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldWJlc3hkdnh5YmN5amtmZW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NzgxOTAsImV4cCI6MjAzMzM1NDE5MH0.bXe4bO4PyHKLhXsh_U_ICW4NQ67ScAVw4d8-Ycpgoyg";

const supabaseUrl = "https://beubesxdvxybcyjkfemt.supabase.co";
const supabase = createClient(supabaseUrl, SUPABASE_KEY);

export default supabase;
