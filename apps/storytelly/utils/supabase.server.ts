import { type Database } from '@vanaheim/storytelly/db';
import * as ssr from '@supabase/auth-helpers-remix';

export const createServerClient = (request: Request, response: Response) => {
  return ssr.createServerClient<Database>(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON as string,
    {
      request,
      response,
    }
  );
};
