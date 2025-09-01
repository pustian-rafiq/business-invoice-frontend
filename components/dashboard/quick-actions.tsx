import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Users, Package, CreditCard, BarChart3, Zap, Settings } from 'lucide-react';

const quickActions = [
  {
    title: 'Create Invoice',
    description: 'Generate a new invoice with AI assistance',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    href: '/dashboard/invoices/create'
  },
  {
    title: 'Add Client',
    description: 'Register a new client to your database',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    href: '/dashboard/clients/create'
  },
  {
    title: 'Add Product',
    description: 'Create a new product or service',
    icon: Package,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    href: '/dashboard/products/create'
  },
  {
    title: 'Record Payment',
    description: 'Log a new payment received',
    icon: CreditCard,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    href: '/dashboard/payments/create'
  },
  {
    title: 'Payment Methods',
    description: 'Manage payment gateways',
    icon: Settings,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    href: '/dashboard/payments/methods'
  },
  {
    title: 'View Reports',
    description: 'Analyze your business performance',
    icon: BarChart3,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    href: '/dashboard/reports'
  },
  {
    title: 'AI Insights',
    description: 'Get smart business recommendations',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    href: '/dashboard/ai-insights'
  }
];

export function QuickActions() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
        <CardDescription className="text-gray-600">
          Common tasks to help you work faster
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="ghost"
              className="h-auto p-4 justify-start bg-white/60 hover:bg-white/80 border border-white/20"
            >
              <div className={`p-2 rounded-lg ${action.bgColor} mr-4`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-600">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}