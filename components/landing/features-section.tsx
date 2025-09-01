import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Users, 
  FileText, 
  BarChart3, 
  Shield, 
  Zap,
  CreditCard,
  MessageSquare,
  Globe,
  Settings,
  Bell,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Smart suggestions, expense categorization, and business forecasting powered by advanced AI algorithms.',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    icon: FileText,
    title: 'Smart Invoicing',
    description: 'Create, send, and track invoices with AI assistance. Automated reminders and payment tracking.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite team members, assign roles, and collaborate on business operations with built-in chat.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive reports, revenue tracking, and business insights to drive growth.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: CreditCard,
    title: 'Payment Management',
    description: 'Accept online payments, track transactions, and manage multiple payment gateways.',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with data encryption, audit logs, and GDPR compliance.',
    gradient: 'from-gray-500 to-slate-500'
  },
  {
    icon: MessageSquare,
    title: 'Client Communication',
    description: 'Built-in messaging system for client communication and project collaboration.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Globe,
    title: 'Multi-Business Support',
    description: 'Manage multiple businesses from one account with separate data isolation.',
    gradient: 'from-teal-500 to-green-500'
  },
  {
    icon: TrendingUp,
    title: 'Growth Analytics',
    description: 'Track business growth, identify trends, and get AI-powered recommendations.',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}Scale Your Business
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines AI intelligence with powerful business management tools 
            to help you grow faster and work smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-1">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features List */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Plus Many More Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Custom Branding</span>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Smart Notifications</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">API Integration</span>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Document Management</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}