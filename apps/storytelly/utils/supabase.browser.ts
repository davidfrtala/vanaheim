import { useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import * as ssr from '@supabase/auth-helpers-remix';

import type { Database } from '@vanaheim/storytelly/db';

export type SupabaseOutletContext = {
  supabase: SupabaseClient<Database>;
};

export const useSupabase = (url: string, anonKey: string) => {
  const [client] = useState(() =>
    ssr.createBrowserClient<Database>(url, anonKey)
  );

  return client;
};
