// Only export client version here
export { createClient } from './supabase/client';

// Default client export
import { createClient as createBrowserClient } from './supabase/client';
export const supabase = createBrowserClient();
