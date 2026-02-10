'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Home() {
  const [isYearly, setIsYearly] = useState(false)

  const features = [
    {
      title: 'Critical issues first',
      description: 'We prioritize issues that actually hurt your rankings. Fix what matters most.'
    },
    {
      title: 'Platform detection',
      description: 'Automatically detects Shopify, WooCommerce, or custom platforms.'
    },
    {
      title: 'Instant analysis',
      description: 'Scan any product page in seconds. Get fixes immediately.'
    }
  ]

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      features: ['5 page scans', 'All SEO checks', 'Visual guides'],
      popular: false,
    },
    {
      name: 'Solo',
      price: { monthly: 29, yearly: 319 },
      features: ['50 scans/month', 'Priority support', 'Usage analytics'],
      popular: true,
    },
    {
      name: 'Pro',
      price: { monthly: 60, yearly: 650 },
      features: ['Unlimited scans', 'API access', 'Dedicated support'],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Chrome Extension
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Fix your product pages.<br />
            Rank higher on Google.
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Get instant, actionable SEO fixes for your ecommerce store. 
            No jargon, no guesswork—just results.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link href="/login">
              <Button size="lg" className="bg-black hover:bg-slate-800 h-11 px-6">
                Start free
              </Button>
            </Link>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener">
              <Button size="lg" variant="outline" className="h-11 px-6">
                Install extension
              </Button>
            </a>
          </div>

          <p className="text-xs text-slate-500 mt-6">
            5 free scans • No credit card required
          </p>
        </motion.div>
      </section>

      {/* Features - Clean Cards */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4 transition-all group-hover:bg-slate-900">
                  {index === 0 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-white transition-colors">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-white transition-colors">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-white transition-colors">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-3">Simple pricing</h2>
          <p className="text-slate-600 mb-8">Start free. Upgrade when you need more.</p>

          <div className="inline-flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                !isYearly ? 'bg-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly ? 'bg-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Yearly
              <Badge className="bg-green-100 text-green-700 text-xs">Save 15%</Badge>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-8 h-full transition-all duration-200 hover:shadow-lg ${
                plan.popular ? 'border-2 border-black' : 'border'
              }`}>
                {plan.popular && (
                  <Badge className="mb-4 bg-black text-white text-xs">Popular</Badge>
                )}
                
                <div className="text-sm font-medium text-slate-600 mb-2">{plan.name}</div>
                <div className="text-3xl font-bold mb-1">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                  <span className="text-lg text-slate-600">
                    {plan.price.monthly > 0 ? (isYearly ? '/yr' : '/mo') : ''}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mb-6 h-4">
                  {isYearly && plan.price.monthly > 0 && (
                    <span className="text-green-600">
                      Save ${plan.price.monthly * 12 - plan.price.yearly}/year
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/login">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-black hover:bg-slate-800' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get started
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}