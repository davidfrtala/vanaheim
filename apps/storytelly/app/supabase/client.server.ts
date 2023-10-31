import { type Database } from '@vanaheim/storytelly/db';
import * as ssr from '@supabase/auth-helpers-remix';

export const createServerClient = (request: Request, response: Response) => {
  if (!process.env.SUPABASE_URL) {
    throw new Error('SUPABASE_URL env is missing');
  }

  if (!process.env.SUPABASE_ANON) {
    throw new Error('SUPABASE_ANON env is missing');
  }

  return ssr.createServerClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON,
    {
      request,
      response,
    }
  );
};

export function getServerClient(request: Request) {
  const response = new Response();

  const supabase = createServerClient(request, response);

  return { supabase, headers: response.headers };
}
