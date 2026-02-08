'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Try it out',
      features: [
        '5 page scans total',
        'Visual step-by-step guides',
        'Platform detection',
        'All SEO checks',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Solo',
      price: { monthly: 29, yearly: 319 },
      description: 'For solo store owners',
      features: [
        '50 scans per month',
        'Everything in Free',
        'Priority email support',
        'Monthly usage reports',
        'Tech stack detection',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Pro',
      price: { monthly: 60, yearly: 650 },
      description: 'For power users',
      features: [
        'Unlimited scans',
        'Everything in Solo',
        'Auto-fix (coming soon)',
        'Dedicated support',
        'API access (coming soon)',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Team',
      price: { monthly: 120, yearly: 1300 },
      description: 'For agencies',
      features: [
        'Unlimited scans',
        'Up to 5 team members',
        'Everything in Pro',
        'White-label reports',
        'Account manager',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur sticky top-0 z-50">
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
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Start free. Upgrade when you need more scans. Cancel anytime.
        </p>

        {/* Monthly/Yearly Toggle */}
        <div className="inline-flex items-center gap-4 bg-slate-100 p-2 rounded-lg mb-12">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              !isYearly
                ? 'bg-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
              isYearly
                ? 'bg-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Yearly
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Save 15%
            </Badge>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 relative ${
                plan.popular ? 'border-2 border-indigo-600 shadow-xl' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600">
                  Most Popular
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-4">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-slate-600">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  )}
                </div>

                {isYearly && plan.price.monthly > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    Save ${plan.price.monthly * 12 - plan.price.yearly}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/login">
                <Button
                  className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-2">Can I change plans later?</h3>
              <p className="text-slate-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                take effect immediately.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">
                What happens when I hit my scan limit?
              </h3>
              <p className="text-slate-600">
                You'll be prompted to upgrade. Free users get 5 scans total,
                Solo gets 50/month, Pro gets unlimited.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">Do you offer refunds?</h3>
              <p className="text-slate-600">
                Yes! We offer a 30-day money-back guarantee. If you're not
                satisfied, we'll refund you in full.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">What platforms do you support?</h3>
              <p className="text-slate-600">
                We support Shopify, WooCommerce, BigCommerce, Wix Stores, and
                most custom ecommerce platforms.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">Is there a free trial?</h3>
              <p className="text-slate-600">
                Yes! All paid plans come with a 7-day free trial. No credit card
                required to start.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our team is here to help. Get in touch with us.
          </p>
          <Button size="lg" variant="secondary">
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  );
}
