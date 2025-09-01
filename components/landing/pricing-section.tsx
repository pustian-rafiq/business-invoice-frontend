import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free Trial',
    price: '0',
    period: '14 days',
    description: 'Perfect for testing our platform',
    features: [
      'Up to 5 invoices',
      '2 clients',
      '1 business',
      'Basic templates',
      'Email support',
      'Mobile app access'
    ],
    popular: false,
    cta: 'Start Free Trial',
    gradient: 'from-gray-500 to-slate-500'
  },
  {
    name: 'Personal',
    price: '29',
    period: 'month',
    description: 'Ideal for freelancers and small businesses',
    features: [
      'Unlimited invoices',
      'Up to 50 clients',
      '1 business',
      'AI invoice suggestions',
      'Payment gateway integration',
      'Advanced reporting',
      'Priority support',
      'Custom branding'
    ],
    popular: true,
    cta: 'Get Started',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Team',
    price: '79',
    period: 'month',
    description: 'Perfect for growing teams',
    features: [
      'Everything in Personal',
      'Up to 500 clients',
      'Up to 3 businesses',
      'Team collaboration (5 members)',
      'Advanced AI insights',
      'Role-based permissions',
      'API access',
      'Phone support',
      'Custom integrations'
    ],
    popular: false,
    cta: 'Choose Team',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations',
    features: [
      'Everything in Team',
      'Unlimited clients',
      'Unlimited businesses',
      'Unlimited team members',
      'Custom AI training',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom development',
      'On-premise deployment'
    ],
    popular: false,
    cta: 'Contact Sales',
    gradient: 'from-orange-500 to-red-500'
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include our core features 
            with no hidden fees. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative overflow-hidden border-0 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center py-2">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Most Popular</span>
                  </div>
                </div>
              )}
              
              <CardHeader className={`${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.gradient} p-3 mb-4`}>
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                <div className="flex items-baseline space-x-1">
                  {plan.price === 'Custom' ? (
                    <span className="text-3xl font-bold text-gray-900">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </>
                  )}
                </div>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/auth/register" className="block">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600' 
                        : 'bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h4>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h4>
              <p className="text-gray-600">No setup fees, no hidden costs. Only pay for your chosen plan.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee on all paid plans.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}