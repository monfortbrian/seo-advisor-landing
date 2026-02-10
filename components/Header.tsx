'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />

          <span className="font-semibold">SEO Advisor</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#pricing"
            className="text-sm text-slate-600 hover:text-black"
          >
            Pricing
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-black hover:bg-slate-800">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
