'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push('/login');
          return;
        }

        setUser(session.user);

        // Get user data from our users table
        const { data: dbUser } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUserData(dbUser);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

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
          : 5; // free

    return Math.max(0, limit - (userData.scans_used_this_month || 0));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <span className="font-bold text-xl">SEO Advisor</span>
          </Link>

          <div className="flex items-center gap-4">
            {userData?.is_admin && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.user_metadata?.name || 'there'}! 👋
          </h1>
          <p className="text-slate-600">
            Manage your SEO analysis scans and account settings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Scans Remaining */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-600">Scans Remaining</h3>
              <Badge
                variant={userData?.plan === 'free' ? 'secondary' : 'default'}
              >
                {userData?.plan?.toUpperCase() || 'FREE'}
              </Badge>
            </div>
            <div className="text-4xl font-bold mb-2">{getScansRemaining()}</div>
            <p className="text-sm text-slate-600">
              {userData?.scans_used_this_month || 0} used this month
            </p>
          </Card>

          {/* Total Scans */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-600 mb-4">Total Scans</h3>
            <div className="text-4xl font-bold mb-2">
              {userData?.total_scans_used || 0}
            </div>
            <p className="text-sm text-slate-600">All-time scans completed</p>
          </Card>

          {/* Account Status */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-600 mb-4">
              Account Status
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold">Active</span>
            </div>
            <p className="text-sm text-slate-600">
              Member since{' '}
              {userData?.created_at
                ? new Date(userData.created_at).toLocaleDateString()
                : 'today'}
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
              >
                <div className="text-left">
                  <div className="font-semibold mb-1">Install Extension</div>
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
                  <div className="font-semibold mb-1">Upgrade Plan</div>
                  <div className="text-sm text-slate-600">
                    Get more scans and features
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Extension Setup Guide */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">How to Use SEO Advisor</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Install the Extension</h3>
                <p className="text-sm text-slate-600">
                  Add SEO Advisor to Chrome from the Web Store
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Visit a Product Page</h3>
                <p className="text-sm text-slate-600">
                  Navigate to any Shopify, WooCommerce, or ecommerce product
                  page
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Click Analyze</h3>
                <p className="text-sm text-slate-600">
                  The extension will scan the page and show you critical SEO
                  issues
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Follow the Guide</h3>
                <p className="text-sm text-slate-600">
                  Get step-by-step instructions to fix each issue
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Upgrade CTA (for free users) */}
        {userData?.plan === 'free' && (
          <Card className="p-8 mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h2 className="text-2xl font-bold mb-2">Need More Scans?</h2>
            <p className="mb-6 opacity-90">
              Upgrade to Solo for 50 scans/month or Pro for unlimited scans
            </p>
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
