import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  'https://ramcxprsiqraxropkfon.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  'sb_publishable_Jh8JwYjhJL6LU09mxTOMzg_gmgyF7rc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

