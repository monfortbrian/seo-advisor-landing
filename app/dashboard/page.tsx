'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

interface UserData {
  id: string;
  email: string;
  plan: string;
  custom_scan_limit: number | null;
  scans_used_this_month: number;
  total_scans_used: number;
  is_admin: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);



  const checkUser = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log('Dashboard - Session:', session ? 'found' : 'not found');

      if (error || !session) {
        console.log('No valid session, redirecting to login');
        router.push('/login');
        return;
      }

      setUser(session.user);

      // Get or create user data
      let { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // If user doesn't exist in database, create them
      if (dbError && dbError.code === 'PGRST116') {
        const { data: newUser } = await supabase
          .from('users')
          .insert({
            id: session.user.id,
            email: session.user.email,
            name:
              session.user.user_metadata?.name ||
              session.user.user_metadata?.full_name ||
              session.user.email?.split('@')[0],
            avatar_url: session.user.user_metadata?.avatar_url,
            plan: 'free',
          })
          .select()
          .single();

        dbUser = newUser;
      }

      if (dbUser) {
        setUserData(dbUser);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const getScansRemaining = () => {
    if (!userData) return 0;

    if (userData.plan === 'pro' || userData.plan === 'team') return 'Unlimited';

    const limit =
      userData.plan === 'custom'
        ? userData.custom_scan_limit
        : userData.plan === 'solo'
          ? 50
          : 5;

    return Math.max(0, (limit || 0) - (userData.scans_used_this_month || 0));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-sm text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold">SEO Advisor</span>
          </Link>
          <div className="flex items-center gap-4">
            {userData?.is_admin && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Welcome, {user?.email?.split('@')[0] || 'there'}!
            👋
          </h1>
          <p className="text-slate-600">Manage your SEO scans and account</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">
                Scans Remaining
              </h3>
              <Badge
                variant={userData?.plan === 'free' ? 'secondary' : 'default'}
              >
                {userData?.plan?.toUpperCase() || 'FREE'}
              </Badge>
            </div>
            <div className="text-3xl font-bold mb-2">{getScansRemaining()}</div>
            <p className="text-sm text-slate-600">
              {userData?.scans_used_this_month || 0} used this month
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-slate-600 mb-4">
              Total Scans
            </h3>
            <div className="text-3xl font-bold mb-2">
              {userData?.total_scans_used || 0}
            </div>
            <p className="text-sm text-slate-600">All-time</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-slate-600 mb-4">Status</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-semibold">Active</span>
            </div>
            <p className="text-sm text-slate-600">
              Since{' '}
              {userData?.created_at
                ? new Date(userData.created_at).toLocaleDateString()
                : 'today'}
            </p>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
              >
                <div className="text-left">
                  <div className="font-medium mb-1">Install Extension</div>
                  <div className="text-sm text-slate-600">
                    Add SEO Advisor to Chrome
                  </div>
                </div>
              </Button>
            </a>

            <Link href="/pricing">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
              >
                <div className="text-left">
                  <div className="font-medium mb-1">Upgrade Plan</div>
                  <div className="text-sm text-slate-600">Get more scans</div>
                </div>
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">How to Use</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">Install Extension</h3>
                <p className="text-sm text-slate-600">
                  Add SEO Advisor to Chrome
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Visit Product Page</h3>
                <p className="text-sm text-slate-600">
                  Go to any ecommerce product page
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Click Analyze</h3>
                <p className="text-sm text-slate-600">Get instant SEO fixes</p>
              </div>
            </div>
          </div>
        </Card>

        {userData?.plan === 'free' && (
          <Card className="p-8 mt-8 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
            <h2 className="text-xl font-bold mb-2">Need More Scans?</h2>
            <p className="mb-6 opacity-90">Upgrade for unlimited scans</p>
            <Link href="/pricing">
              <Button size="lg" variant="secondary">
                View Plans
              </Button>
            </Link>
          </Card>
        )}
      </main>
    </div>
  );
}
