'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function AdminPanel() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [grants, setGrants] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [email, setEmail] = useState('');
  const [planType, setPlanType] = useState('solo');
  const [customLimit, setCustomLimit] = useState('500');
  const [duration, setDuration] = useState('1_year');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAdminAccess();
    loadRecentGrants();
    loadAllUsers();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (!userData?.is_admin) {
        alert('Access denied: Admin only');
        router.push('/dashboard');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadRecentGrants = async () => {
    const { data } = await supabase
      .from('admin_grants')
      .select('*')
      .order('granted_at', { ascending: false })
      .limit(10);

    if (data) setGrants(data);
  };

  const loadAllUsers = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setUsers(data);
  };

  const calculateExpiry = (dur: string) => {
    if (dur === 'lifetime') return null;
    const now = new Date();
    if (dur === '1_month') now.setMonth(now.getMonth() + 1);
    else if (dur === '1_year') now.setFullYear(now.getFullYear() + 1);
    return now.toISOString();
  };

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('users').upsert(
        {
          email,
          plan: planType,
          custom_scan_limit:
            planType === 'custom' ? parseInt(customLimit) : null,
          plan_expires_at: calculateExpiry(duration),
          granted_by: user.id,
        },
        { onConflict: 'email' },
      );

      await supabase.from('admin_grants').insert({
        admin_id: user.id,
        user_email: email,
        plan_type: planType,
        custom_limit: planType === 'custom' ? parseInt(customLimit) : null,
        duration,
        reason: reason || 'Admin grant',
      });

      alert(`Access granted to ${email}`);
      setEmail('');
      setPlanType('solo');
      setCustomLimit('500');
      setDuration('1_year');
      setReason('');
      loadRecentGrants();
      loadAllUsers();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to grant access');
    } finally {
      setSubmitting(false);
    }
  };

  const revokeAccess = async (userEmail: string) => {
    if (!confirm(`Revoke access for ${userEmail}?`)) return;

    await supabase
      .from('users')
      .update({
        plan: 'free',
        custom_scan_limit: null,
        plan_expires_at: null,
      })
      .eq('email', userEmail);

    alert('Access revoked');
    loadRecentGrants();
    loadAllUsers();
  };

  const filteredUsers = users.filter((u) =>
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo />
              <span className="font-semibold">SEO Advisor</span>
            </Link>
            <Badge variant="secondary" className="text-xs">
              Admin
            </Badge>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              ← Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="font-semibold mb-6">Grant Access</h2>
            <form onSubmit={handleGrantAccess} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoer@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Plan</label>
                <select
                  value={planType}
                  onChange={(e) => setPlanType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="solo">Solo (50/month)</option>
                  <option value="pro">Pro (Unlimited)</option>
                  <option value="team">Team (Unlimited)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {planType === 'custom' && (
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Limit
                  </label>
                  <Input
                    type="number"
                    value={customLimit}
                    onChange={(e) => setCustomLimit(e.target.value)}
                    min="1"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium block mb-2">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="1_month">1 Month</option>
                  <option value="1_year">1 Year</option>
                  <option value="lifetime">Lifetime</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Reason</label>
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Partner, Beta, etc."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-slate-800"
                disabled={submitting}
              >
                {submitting ? 'Granting...' : 'Grant Access'}
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-6">Recent Grants</h2>
            {grants.length === 0 ? (
              <p className="text-sm text-slate-500">No grants yet</p>
            ) : (
              <div className="space-y-3">
                {grants.map((grant) => (
                  <div key={grant.id} className="p-3 border rounded-lg text-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{grant.user_email}</div>
                        <div className="text-xs text-slate-600">
                          {grant.plan_type}
                          {grant.custom_limit && ` (${grant.custom_limit}/mo)`}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(grant.granted_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => revokeAccess(grant.user_email)}
                        className="text-xs"
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">All Users ({users.length})</h2>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg text-sm"
              >
                <div className="flex-1">
                  {user.email}
                  {user.is_admin && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Badge>{user.plan?.toUpperCase() || 'FREE'}</Badge>
                  <div className="text-xs text-slate-600">
                    {user.scans_used_this_month || 0} used
                  </div>
                  <div className="text-xs text-slate-600">
                    {user.total_scans_used || 0} total
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
