'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentMethodCard, type PaymentMethod } from '@/components/payments/payment-method-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Settings,
  CreditCard,
  Building,
  Globe,
  Smartphone,
  Shield,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'Primary Stripe Account',
    type: 'stripe',
    status: 'active',
    isDefault: true,
    lastUsed: '2025-01-15',
    totalTransactions: 145,
    totalAmount: 89500,
    fees: { percentage: 2.9, fixed: 0.30 },
    details: {
      apiKey: 'sk_live_****',
      webhookUrl: 'https://api.yourapp.com/webhooks/stripe'
    },
    currency: '$',
    countries: ['US', 'CA', 'UK', 'EU']
  },
  {
    id: '2',
    name: 'Business Bank Account',
    type: 'bank_account',
    status: 'active',
    isDefault: false,
    lastUsed: '2025-01-12',
    totalTransactions: 23,
    totalAmount: 45600,
    fees: { percentage: 0, fixed: 25.00 },
    details: {
      accountNumber: '****1234',
      routingNumber: '021000021'
    },
    currency: '$',
    countries: ['US']
  },
  {
    id: '3',
    name: 'PayPal Business',
    type: 'paypal',
    status: 'active',
    isDefault: false,
    lastUsed: '2025-01-10',
    totalTransactions: 67,
    totalAmount: 23400,
    fees: { percentage: 3.49, fixed: 0.49 },
    details: {
      email: 'business@yourcompany.com'
    },
    currency: '$',
    countries: ['US', 'CA', 'UK', 'EU', 'AU']
  },
  {
    id: '4',
    name: 'Square Terminal',
    type: 'square',
    status: 'inactive',
    isDefault: false,
    lastUsed: '2024-12-20',
    totalTransactions: 12,
    totalAmount: 5600,
    fees: { percentage: 2.6, fixed: 0.10 },
    details: {
      apiKey: 'sq_****'
    },
    currency: '$',
    countries: ['US', 'CA', 'UK', 'AU']
  },
  {
    id: '5',
    name: 'Crypto Wallet',
    type: 'crypto',
    status: 'pending',
    isDefault: false,
    totalTransactions: 3,
    totalAmount: 8900,
    fees: { percentage: 1.0, fixed: 0 },
    details: {},
    currency: '$',
    countries: ['Global']
  }
];

export default function PaymentMethodsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const { toast } = useToast();

  const filteredMethods = mockPaymentMethods.filter(method => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         method.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || method.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockPaymentMethods.length,
    active: mockPaymentMethods.filter(m => m.status === 'active').length,
    inactive: mockPaymentMethods.filter(m => m.status === 'inactive').length,
    pending: mockPaymentMethods.filter(m => m.status === 'pending').length,
    totalVolume: mockPaymentMethods.reduce((sum, m) => sum + m.totalAmount, 0),
    totalTransactions: mockPaymentMethods.reduce((sum, m) => sum + m.totalTransactions, 0)
  };

  const handleEditMethod = (method: PaymentMethod) => {
    toast({
      title: "Edit Payment Method",
      description: `Editing ${method.name}`,
    });
  };

  const handleDeleteMethod = (method: PaymentMethod) => {
    toast({
      title: "Payment Method Deleted",
      description: `${method.name} has been removed`,
      variant: "destructive"
    });
  };

  const handleToggleStatus = (method: PaymentMethod) => {
    const newStatus = method.status === 'active' ? 'inactive' : 'active';
    toast({
      title: "Status Updated",
      description: `${method.name} is now ${newStatus}`,
    });
  };

  const handleSetDefault = (method: PaymentMethod) => {
    toast({
      title: "Default Method Updated",
      description: `${method.name} is now your default payment method`,
    });
  };

  const handleViewTransactions = (method: PaymentMethod) => {
    toast({
      title: "View Transactions",
      description: `Viewing transactions for ${method.name}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
            <p className="text-gray-600 mt-2">Manage your payment gateways and processing methods</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Settings className="mr-2 h-4 w-4" />
              Gateway Settings
            </Button>
            <Link href="/dashboard/payments/methods/add">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Methods</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">{stats.active} active</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Volume</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.totalVolume.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Transactions</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</div>
              <p className="text-xs text-gray-500 mt-1">Total processed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Setup</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <p className="text-xs text-gray-500 mt-1">Need configuration</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payment methods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/60 border-white/30"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4 bg-gray-100/50">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
                <TabsTrigger value="inactive">Inactive ({stats.inactive})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      onEdit={handleEditMethod}
                      onDelete={handleDeleteMethod}
                      onToggleStatus={handleToggleStatus}
                      onSetDefault={handleSetDefault}
                      onViewTransactions={handleViewTransactions}
                    />
                  ))}
                </div>

                {filteredMethods.length === 0 && (
                  <div className="text-center py-12">
                    <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first payment method.'}
                    </p>
                    {!searchTerm && (
                      <div className="mt-6">
                        <Link href="/dashboard/payments/methods/add">
                          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Payment Method
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Gateway Recommendations */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Recommended Payment Gateways</h3>
                <p className="text-purple-100 mb-4">
                  Based on your business type and location, we recommend these payment methods
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-purple-200" />
                    <span className="text-purple-100">Stripe - Best for online payments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-purple-200" />
                    <span className="text-purple-100">PayPal - Global reach</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-purple-200" />
                    <span className="text-purple-100">Bank transfers - Lower fees</span>
                  </div>
                </div>
              </div>
              <Shield className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}