'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft,
  Search, 
  Filter, 
  Download,
  Eye, 
  Edit, 
  MoreHorizontal,
  CreditCard,
  Crown,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Building,
  Users,
  Calendar,
  Activity,
  Send,
  RefreshCw,
  BarChart3,
  Zap,
  Globe,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const activeSubscriptions = [
  {
    id: 'sub_1',
    business: {
      id: '1',
      name: 'Acme Corporation',
      logo: 'AC',
      owner: 'John Doe',
      email: 'john@acme.com',
      industry: 'Technology'
    },
    plan: {
      name: 'Team',
      price: 79.00,
      billingCycle: 'monthly',
      tier: 'team'
    },
    status: 'active',
    health: 'excellent',
    nextBilling: '2025-02-15',
    daysSinceStart: 365,
    totalPaid: 948.00,
    paymentMethod: 'Credit Card',
    lastPayment: '2025-01-15',
    paymentSuccess: 100,
    usage: {
      invoices: { used: 245, limit: 'unlimited', percentage: 0 },
      clients: { used: 89, limit: 500, percentage: 17.8 },
      teamMembers: { used: 12, limit: 15, percentage: 80 },
      storage: { used: 2.1, limit: 10, percentage: 21 }
    },
    metrics: {
      mrr: 79.00,
      ltv: 892.00,
      churnRisk: 'low',
      engagementScore: 94,
      nps: 9,
      supportTickets: 2
    },
    growth: {
      invoiceGrowth: 15.2,
      clientGrowth: 8.7,
      revenueGrowth: 22.1
    }
  },
  {
    id: 'sub_2',
    business: {
      id: '2',
      name: 'Tech Solutions Inc',
      logo: 'TS',
      owner: 'Jane Smith',
      email: 'jane@techsol.com',
      industry: 'Technology'
    },
    plan: {
      name: 'Personal',
      price: 29.00,
      billingCycle: 'monthly',
      tier: 'personal'
    },
    status: 'active',
    health: 'good',
    nextBilling: '2025-02-05',
    daysSinceStart: 298,
    totalPaid: 348.00,
    paymentMethod: 'PayPal',
    lastPayment: '2025-01-05',
    paymentSuccess: 91.7,
    usage: {
      invoices: { used: 156, limit: 'unlimited', percentage: 0 },
      clients: { used: 34, limit: 50, percentage: 68 },
      teamMembers: { used: 5, limit: 1, percentage: 500 },
      storage: { used: 1.2, limit: 5, percentage: 24 }
    },
    metrics: {
      mrr: 29.00,
      ltv: 348.00,
      churnRisk: 'medium',
      engagementScore: 78,
      nps: 7,
      supportTickets: 5
    },
    growth: {
      invoiceGrowth: 8.3,
      clientGrowth: 12.1,
      revenueGrowth: 5.7
    }
  },
  {
    id: 'sub_4',
    business: {
      id: '4',
      name: 'Global Ventures',
      logo: 'GV',
      owner: 'David Brown',
      email: 'david@globalventures.com',
      industry: 'Consulting'
    },
    plan: {
      name: 'Enterprise',
      price: 299.00,
      billingCycle: 'monthly',
      tier: 'enterprise'
    },
    status: 'active',
    health: 'excellent',
    nextBilling: '2025-02-01',
    daysSinceStart: 456,
    totalPaid: 3588.00,
    paymentMethod: 'Bank Transfer',
    lastPayment: '2025-01-01',
    paymentSuccess: 100,
    usage: {
      invoices: { used: 678, limit: 'unlimited', percentage: 0 },
      clients: { used: 234, limit: 'unlimited', percentage: 0 },
      teamMembers: { used: 25, limit: 'unlimited', percentage: 0 },
      storage: { used: 8.5, limit: 'unlimited', percentage: 0 }
    },
    metrics: {
      mrr: 299.00,
      ltv: 3588.00,
      churnRisk: 'low',
      engagementScore: 98,
      nps: 10,
      supportTickets: 0
    },
    growth: {
      invoiceGrowth: 28.5,
      clientGrowth: 18.9,
      revenueGrowth: 35.2
    }
  }
];

const getHealthColor = (health: string) => {
  switch (health) {
    case 'excellent':
      return 'text-green-400';
    case 'good':
      return 'text-blue-400';
    case 'fair':
      return 'text-yellow-400';
    case 'poor':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const getHealthIcon = (health: string) => {
  switch (health) {
    case 'excellent':
      return <CheckCircle className="h-4 w-4" />;
    case 'good':
      return <TrendingUp className="h-4 w-4" />;
    case 'fair':
      return <Activity className="h-4 w-4" />;
    case 'poor':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getPlanColor = (tier: string) => {
  switch (tier) {
    case 'personal':
      return 'bg-blue-900/50 text-blue-400';
    case 'team':
      return 'bg-purple-900/50 text-purple-400';
    case 'enterprise':
      return 'bg-orange-900/50 text-orange-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getUsageColor = (percentage: number) => {
  if (percentage >= 90) return 'text-red-400';
  if (percentage >= 70) return 'text-yellow-400';
  return 'text-green-400';
};

const getGrowthColor = (growth: number) => {
  if (growth > 20) return 'text-green-400';
  if (growth > 10) return 'text-yellow-400';
  return 'text-red-400';
};

export default function ActiveSubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [healthFilter, setHealthFilter] = useState('all');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredSubscriptions = activeSubscriptions.filter(subscription => {
    const matchesSearch = subscription.business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'all' || subscription.plan.tier === planFilter;
    const matchesHealth = healthFilter === 'all' || subscription.health === healthFilter;
    return matchesSearch && matchesPlan && matchesHealth;
  });

  const stats = {
    total: activeSubscriptions.length,
    totalMRR: activeSubscriptions.reduce((sum, s) => sum + s.plan.price, 0),
    avgLTV: activeSubscriptions.reduce((sum, s) => sum + s.metrics.ltv, 0) / activeSubscriptions.length,
    avgEngagement: activeSubscriptions.reduce((sum, s) => sum + s.metrics.engagementScore, 0) / activeSubscriptions.length,
    excellentHealth: activeSubscriptions.filter(s => s.health === 'excellent').length,
    avgPaymentSuccess: activeSubscriptions.reduce((sum, s) => sum + s.paymentSuccess, 0) / activeSubscriptions.length
  };

  const handleSubscriptionAction = (action: string, subscription: any) => {
    toast({
      title: `Subscription ${action}`,
      description: `${subscription.business.name} subscription has been ${action.toLowerCase()}`,
    });
  };

  const toggleSubscriptionSelection = (subscriptionId: string) => {
    setSelectedSubscriptions(prev => 
      prev.includes(subscriptionId) 
        ? prev.filter(id => id !== subscriptionId)
        : [...prev, subscriptionId]
    );
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/super-admin/subscriptions">
              <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Subscriptions
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Active Subscriptions</h1>
              <p className="text-gray-400 mt-2">Monitor healthy, revenue-generating subscriptions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Active
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <BarChart3 className="mr-2 h-4 w-4" />
              Revenue Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Subscriptions</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.excellentHealth} excellent health</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalMRR.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">From active subscriptions</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg LTV</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.avgLTV.toFixed(0)}</div>
              <p className="text-xs text-gray-400 mt-1">Customer lifetime value</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Payment Success</CardTitle>
              <Shield className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.avgPaymentSuccess.toFixed(1)}%</div>
              <p className="text-xs text-gray-400 mt-1">Success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search active subscriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-32 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={healthFilter} onValueChange={setHealthFilter}>
                  <SelectTrigger className="w-32 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Health</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
                {selectedSubscriptions.length > 0 && (
                  <Badge variant="secondary" className="bg-red-900/50 text-red-400">
                    {selectedSubscriptions.length} selected
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubscriptions.map((subscription) => (
                <div key={subscription.id} className="p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedSubscriptions.includes(subscription.id)}
                      onChange={() => toggleSubscriptionSelection(subscription.id)}
                      className="mt-2 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                    />
                    
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-bold">
                        {subscription.business.logo}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-white text-lg">{subscription.business.name}</h3>
                        <Badge className="bg-green-900/50 text-green-400">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                        <Badge className={getPlanColor(subscription.plan.tier)}>
                          <Crown className="mr-1 h-3 w-3" />
                          {subscription.plan.name}
                        </Badge>
                        <Badge className={`${getHealthColor(subscription.health)} bg-gray-800/50`}>
                          {getHealthIcon(subscription.health)}
                          <span className="ml-1">{subscription.health.charAt(0).toUpperCase() + subscription.health.slice(1)}</span>
                        </Badge>
                      </div>
                      
                      {/* Owner Information */}
                      <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm">
                            {subscription.business.owner.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{subscription.business.owner}</div>
                          <div className="text-sm text-gray-400">{subscription.business.email}</div>
                        </div>
                        <Badge className="bg-yellow-900/50 text-yellow-400">
                          <Crown className="mr-1 h-3 w-3" />
                          Owner
                        </Badge>
                        <Badge className="bg-blue-900/50 text-blue-400">
                          <Building className="mr-1 h-3 w-3" />
                          {subscription.business.industry}
                        </Badge>
                      </div>

                      {/* Usage Progress Bars */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {Object.entries(subscription.usage).map(([key, usage]) => (
                          <div key={key} className="text-center">
                            <div className="text-sm text-gray-400 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                            <div className={`font-semibold ${getUsageColor(usage.percentage || 0)}`}>
                              {usage.used}
                              {usage.limit !== 'unlimited' && `/${usage.limit}`}
                            </div>
                            {usage.limit !== 'unlimited' && (
                              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    (usage.percentage || 0) >= 90 ? 'bg-red-500' :
                                    (usage.percentage || 0) >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(usage.percentage || 0, 100)}%` }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-white">${subscription.metrics.mrr.toFixed(0)}</div>
                          <div className="text-xs text-gray-400">MRR</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">${subscription.metrics.ltv.toFixed(0)}</div>
                          <div className="text-xs text-gray-400">LTV</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-semibold ${getEngagementColor(subscription.metrics.engagementScore)}`}>
                            {subscription.metrics.engagementScore}%
                          </div>
                          <div className="text-xs text-gray-400">Engagement</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{subscription.metrics.nps}/10</div>
                          <div className="text-xs text-gray-400">NPS Score</div>
                        </div>
                      </div>

                      {/* Growth Metrics */}
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Invoice Growth:</span>
                          <span className={`font-medium ${getGrowthColor(subscription.growth.invoiceGrowth)}`}>
                            +{subscription.growth.invoiceGrowth}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Client Growth:</span>
                          <span className={`font-medium ${getGrowthColor(subscription.growth.clientGrowth)}`}>
                            +{subscription.growth.clientGrowth}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Revenue Growth:</span>
                          <span className={`font-medium ${getGrowthColor(subscription.growth.revenueGrowth)}`}>
                            +{subscription.growth.revenueGrowth}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-6">
                      {/* Subscription Stats */}
                      <div className="hidden lg:flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-white">${subscription.totalPaid.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Total Paid</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{subscription.daysSinceStart}d</div>
                          <div className="text-xs text-gray-400">Customer Age</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{subscription.paymentSuccess}%</div>
                          <div className="text-xs text-gray-400">Payment Success</div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Viewed', subscription)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Edited', subscription)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Subscription
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Usage Viewed', subscription)}>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Usage Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Billing Updated', subscription)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Update Billing
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Plan Upgraded', subscription)}>
                            <Crown className="mr-2 h-4 w-4" />
                            Upgrade Plan
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Discount Applied', subscription)}>
                            <Zap className="mr-2 h-4 w-4" />
                            Apply Discount
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Contacted', subscription)}>
                            <Send className="mr-2 h-4 w-4" />
                            Contact Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}

              {filteredSubscriptions.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard className="mx-auto h-12 w-12 text-gray-500" />
                  <h3 className="mt-2 text-sm font-medium text-white">No active subscriptions found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {searchTerm ? 'Try adjusting your search terms.' : 'No subscriptions match the current filters.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Revenue Performance</h3>
                  <p className="text-green-200 mb-4">
                    Strong revenue growth from active subscriptions
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Monthly Revenue</span>
                      <span className="font-medium text-white">${stats.totalMRR.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Annual Revenue</span>
                      <span className="font-medium text-white">${(stats.totalMRR * 12).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Growth Rate</span>
                      <span className="font-medium text-white">+18.5%</span>
                    </div>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Customer Health</h3>
                  <p className="text-blue-200 mb-4">
                    Excellent customer satisfaction and engagement
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Avg Engagement</span>
                      <span className="font-medium text-white">{stats.avgEngagement.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Excellent Health</span>
                      <span className="font-medium text-white">{stats.excellentHealth}/{stats.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Retention Rate</span>
                      <span className="font-medium text-white">94.2%</span>
                    </div>
                  </div>
                </div>
                <Activity className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Plan Distribution</h3>
                  <p className="text-purple-200 mb-4">
                    Healthy mix across all subscription tiers
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Enterprise</span>
                      <span className="font-medium text-white">
                        {activeSubscriptions.filter(s => s.plan.tier === 'enterprise').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Team</span>
                      <span className="font-medium text-white">
                        {activeSubscriptions.filter(s => s.plan.tier === 'team').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Personal</span>
                      <span className="font-medium text-white">
                        {activeSubscriptions.filter(s => s.plan.tier === 'personal').length}
                      </span>
                    </div>
                  </div>
                </div>
                <Crown className="h-12 w-12 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}