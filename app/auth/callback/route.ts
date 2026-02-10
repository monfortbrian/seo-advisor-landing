import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  console.log('Auth callback - Code:', code ? 'received' : 'missing');

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log('Exchange result - Success:', !!data.session);
    console.log('Exchange result - Error:', error?.message || 'none');

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${error.message}`,
      );
    }

    if (data.session) {
      console.log('Session created for:', data.session.user.email);
    }
  }

  // Redirect to dashboard
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
