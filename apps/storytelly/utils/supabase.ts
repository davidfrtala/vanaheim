import { createClient } from '@vanaheim/storytelly/db';

export default createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON!
);
