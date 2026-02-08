import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded"></div>
            <span className="font-semibold">SEO Advisor</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/pricing"
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

      {/* Hero — Minimal */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Chrome Extension
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Fix your product pages.
          <br />
          Rank higher on Google.
        </h1>

        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Get instant, actionable SEO fixes for your ecommerce store. No jargon,
          no guesswork—just results.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link href="/login">
            <Button size="lg" className="bg-black hover:bg-slate-800 h-11 px-6">
              Start free
            </Button>
          </Link>
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener"
          >
            <Button size="lg" variant="outline" className="h-11 px-6">
              Install extension
            </Button>
          </a>
        </div>

        <p className="text-xs text-slate-500 mt-6">
          5 free scans • No credit card required
        </p>
      </section>

      {/* Features — Minimal Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Critical issues first</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We prioritize issues that actually hurt your rankings. Fix what
              matters most.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Platform detection</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automatically detects Shopify, WooCommerce, or custom platforms.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Instant analysis</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Scan any product page in seconds. Get fixes immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing — Minimal */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3">Simple pricing</h2>
          <p className="text-slate-600">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 border hover:shadow-lg transition-shadow">
            <div className="text-sm font-medium text-slate-600 mb-2">Free</div>
            <div className="text-3xl font-bold mb-6">$0</div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                5 page scans
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                All SEO checks
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Visual guides
              </li>
            </ul>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Get started
              </Button>
            </Link>
          </Card>

          <Card className="p-8 border-2 border-black shadow-lg">
            <div className="text-sm font-medium mb-2">Solo</div>
            <div className="text-3xl font-bold mb-1">
              $29<span className="text-lg text-slate-600">/mo</span>
            </div>
            <div className="text-xs text-slate-600 mb-6">
              or $319/year (save 15%)
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <strong>50 scans/month</strong>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Priority support
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Usage analytics
              </li>
            </ul>
            <Link href="/login">
              <Button className="w-full bg-black hover:bg-slate-800">
                Start free trial
              </Button>
            </Link>
          </Card>

          <Card className="p-8 border hover:shadow-lg transition-shadow">
            <div className="text-sm font-medium text-slate-600 mb-2">Pro</div>
            <div className="text-3xl font-bold mb-1">
              $60<span className="text-lg text-slate-600">/mo</span>
            </div>
            <div className="text-xs text-slate-600 mb-6">
              or $650/year (save 15%)
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <strong>Unlimited scans</strong>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                API access
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Dedicated support
              </li>
            </ul>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Start free trial
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer — Minimal */}
      <footer className="border-t mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">© 2025 SEO Advisor</div>
            <div className="flex items-center gap-8 text-sm">
              <Link href="/pricing" className="text-slate-600 hover:text-black">
                Pricing
              </Link>
              <a href="#" className="text-slate-600 hover:text-black">
                Docs
              </a>
              <a href="#" className="text-slate-600 hover:text-black">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
