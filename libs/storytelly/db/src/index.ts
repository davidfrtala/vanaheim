import { createClient as supabaseCreateClient } from '@supabase/supabase-js';
import * as Types from './types/database.types';

export type Database = Types.Database['public'];

export const createClient = (url: string, anonKey: string) =>
  supabaseCreateClient<Types.Database>(url, anonKey);
