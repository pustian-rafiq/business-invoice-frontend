'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  CreditCard,
  Crown,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Building,
  Users,
  Calendar,
  Activity,
  Ban,
  UserCheck,
  Send,
  FileText,
  BarChart3,
  Zap,
  Globe,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const mockSubscriptions = [
  {
    id: 'sub_1',
    business: {
      id: '1',
      name: 'Acme Corporation',
      logo: 'AC',
      owner: 'John Doe',
      email: 'john@acme.com'
    },
    plan: {
      name: 'Team',
      price: 79.00,
      billingCycle: 'monthly',
      features: ['Unlimited invoices', 'Up to 500 clients', 'Team collaboration']
    },
    status: 'active',
    currentPeriodStart: '2025-01-15',
    currentPeriodEnd: '2025-02-15',
    nextBilling: '2025-02-15',
    totalPaid: 948.00,
    paymentMethod: 'Credit Card',
    lastPayment: '2025-01-15',
    usage: {
      invoices: { used: 245, limit: 'unlimited' },
      clients: { used: 89, limit: 500 },
      teamMembers: { used: 12, limit: 15 }
    },
    metrics: {
      mrr: 79.00,
      ltv: 892.00,
      churnRisk: 'low',
      engagementScore: 94
    },
    paymentHistory: [
      { date: '2025-01-15', amount: 79.00, status: 'paid' },
      { date: '2024-12-15', amount: 79.00, status: 'paid' },
      { date: '2024-11-15', amount: 79.00, status: 'paid' }
    ]
  },
  {
    id: 'sub_2',
    business: {
      id: '2',
      name: 'Tech Solutions Inc',
      logo: 'TS',
      owner: 'Jane Smith',
      email: 'jane@techsol.com'
    },
    plan: {
      name: 'Personal',
      price: 29.00,
      billingCycle: 'monthly',
      features: ['Unlimited invoices', 'Up to 50 clients', 'Basic support']
    },
    status: 'active',
    currentPeriodStart: '2025-01-05',
    currentPeriodEnd: '2025-02-05',
    nextBilling: '2025-02-05',
    totalPaid: 348.00,
    paymentMethod: 'PayPal',
    lastPayment: '2025-01-05',
    usage: {
      invoices: { used: 156, limit: 'unlimited' },
      clients: { used: 34, limit: 50 },
      teamMembers: { used: 5, limit: 1 }
    },
    metrics: {
      mrr: 29.00,
      ltv: 348.00,
      churnRisk: 'medium',
      engagementScore: 78
    },
    paymentHistory: [
      { date: '2025-01-05', amount: 29.00, status: 'paid' },
      { date: '2024-12-05', amount: 29.00, status: 'paid' },
      { date: '2024-11-05', amount: 29.00, status: 'failed' }
    ]
  },
  {
    id: 'sub_3',
    business: {
      id: '3',
      name: 'StartupXYZ',
      logo: 'SX',
      owner: 'Sarah Wilson',
      email: 'sarah@startupxyz.com'
    },
    plan: {
      name: 'Free Trial',
      price: 0,
      billingCycle: 'trial',
      features: ['Up to 5 invoices', '2 clients', 'Basic features']
    },
    status: 'trial',
    currentPeriodStart: '2025-01-01',
    currentPeriodEnd: '2025-01-15',
    nextBilling: '2025-01-15',
    totalPaid: 0,
    paymentMethod: null,
    lastPayment: null,
    usage: {
      invoices: { used: 12, limit: 5 },
      clients: { used: 8, limit: 2 },
      teamMembers: { used: 3, limit: 1 }
    },
    metrics: {
      mrr: 0,
      ltv: 0,
      churnRisk: 'high',
      engagementScore: 45
    },
    paymentHistory: []
  },
  {
    id: 'sub_4',
    business: {
      id: '4',
      name: 'Global Ventures',
      logo: 'GV',
      owner: 'David Brown',
      email: 'david@globalventures.com'
    },
    plan: {
      name: 'Enterprise',
      price: 299.00,
      billingCycle: 'monthly',
      features: ['Unlimited everything', 'Custom integrations', 'Dedicated support']
    },
    status: 'active',
    currentPeriodStart: '2025-01-01',
    currentPeriodEnd: '2025-02-01',
    nextBilling: '2025-02-01',
    totalPaid: 3588.00,
    paymentMethod: 'Bank Transfer',
    lastPayment: '2025-01-01',
    usage: {
      invoices: { used: 678, limit: 'unlimited' },
      clients: { used: 234, limit: 'unlimited' },
      teamMembers: { used: 25, limit: 'unlimited' }
    },
    metrics: {
      mrr: 299.00,
      ltv: 3588.00,
      churnRisk: 'low',
      engagementScore: 98
    },
    paymentHistory: [
      { date: '2025-01-01', amount: 299.00, status: 'paid' },
      { date: '2024-12-01', amount: 299.00, status: 'paid' },
      { date: '2024-11-01', amount: 299.00, status: 'paid' }
    ]
  },
  {
    id: 'sub_5',
    business: {
      id: '5',
      name: 'Failed Payments Co',
      logo: 'FP',
      owner: 'Mike Johnson',
      email: 'mike@failedpayments.com'
    },
    plan: {
      name: 'Team',
      price: 79.00,
      billingCycle: 'monthly',
      features: ['Unlimited invoices', 'Up to 500 clients', 'Team collaboration']
    },
    status: 'past_due',
    currentPeriodStart: '2024-12-20',
    currentPeriodEnd: '2025-01-20',
    nextBilling: '2025-01-20',
    totalPaid: 237.00,
    paymentMethod: 'Credit Card',
    lastPayment: '2024-12-20',
    usage: {
      invoices: { used: 89, limit: 'unlimited' },
      clients: { used: 45, limit: 500 },
      teamMembers: { used: 7, limit: 15 }
    },
    metrics: {
      mrr: 0,
      ltv: 237.00,
      churnRisk: 'high',
      engagementScore: 62
    },
    paymentHistory: [
      { date: '2025-01-20', amount: 79.00, status: 'failed' },
      { date: '2024-12-20', amount: 79.00, status: 'paid' },
      { date: '2024-11-20', amount: 79.00, status: 'paid' }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-900/50 text-green-400 hover:bg-green-900/70';
    case 'trial':
      return 'bg-blue-900/50 text-blue-400 hover:bg-blue-900/70';
    case 'past_due':
      return 'bg-red-900/50 text-red-400 hover:bg-red-900/70';
    case 'cancelled':
      return 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70';
    case 'paused':
      return 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900/70';
    default:
      return 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4" />;
    case 'trial':
      return <Clock className="h-4 w-4" />;
    case 'past_due':
      return <AlertTriangle className="h-4 w-4" />;
    case 'cancelled':
      return <Ban className="h-4 w-4" />;
    case 'paused':
      return <RefreshCw className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getPlanColor = (plan: string) => {
  switch (plan) {
    case 'Free Trial':
      return 'bg-gray-700/50 text-gray-400';
    case 'Personal':
      return 'bg-blue-900/50 text-blue-400';
    case 'Team':
      return 'bg-purple-900/50 text-purple-400';
    case 'Enterprise':
      return 'bg-orange-900/50 text-orange-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getChurnRiskColor = (risk: string) => {
  switch (risk) {
    case 'low':
      return 'text-green-400';
    case 'medium':
      return 'text-yellow-400';
    case 'high':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const getEngagementColor = (score: number) => {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesSearch = subscription.business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || subscription.status === selectedTab ||
                      (selectedTab === 'issues' && ['past_due', 'cancelled'].includes(subscription.status));
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockSubscriptions.length,
    active: mockSubscriptions.filter(s => s.status === 'active').length,
    trial: mockSubscriptions.filter(s => s.status === 'trial').length,
    pastDue: mockSubscriptions.filter(s => s.status === 'past_due').length,
    cancelled: mockSubscriptions.filter(s => s.status === 'cancelled').length,
    totalMRR: mockSubscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.plan.price, 0),
    totalLTV: mockSubscriptions.reduce((sum, s) => sum + s.metrics.ltv, 0),
    avgEngagement: mockSubscriptions.reduce((sum, s) => sum + s.metrics.engagementScore, 0) / mockSubscriptions.length
  };

  const handleSubscriptionAction = (action: string, subscription: any) => {
    toast({
      title: `Subscription ${action}`,
      description: `${subscription.business.name} subscription has been ${action.toLowerCase()}`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${selectedSubscriptions.length} subscriptions have been ${action.toLowerCase()}`,
    });
    setSelectedSubscriptions([]);
  };

  const toggleSubscriptionSelection = (subscriptionId: string) => {
    setSelectedSubscriptions(prev => 
      prev.includes(subscriptionId) 
        ? prev.filter(id => id !== subscriptionId)
        : [...prev, subscriptionId]
    );
  };

  const selectAllSubscriptions = () => {
    if (selectedSubscriptions.length === filteredSubscriptions.length) {
      setSelectedSubscriptions([]);
    } else {
      setSelectedSubscriptions(filteredSubscriptions.map(s => s.id));
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Subscription Management</h1>
            <p className="text-gray-400 mt-2">Monitor and manage all platform subscriptions and billing</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Subscriptions
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Import Payment Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/super-admin/subscriptions/create">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Subscription
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Subscriptions</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.active} active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalMRR.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">MRR</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Payment Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pastDue}</div>
              <p className="text-xs text-gray-400 mt-1">Past due</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Engagement</CardTitle>
              <Activity className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.avgEngagement.toFixed(0)}%</div>
              <p className="text-xs text-gray-400 mt-1">Platform usage</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search subscriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
                {selectedSubscriptions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-red-900/50 text-red-400">
                      {selectedSubscriptions.length} selected
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleBulkAction('Upgraded')}>
                          <Crown className="mr-2 h-4 w-4" />
                          Upgrade Plans
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('Suspended')}>
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend Subscriptions
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('Renewed')}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Force Renewal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleBulkAction('Exported')}>
                          <Download className="mr-2 h-4 w-4" />
                          Export Selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-6 bg-gray-700/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  All ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Active ({stats.active})
                </TabsTrigger>
                <TabsTrigger value="trial" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Trial ({stats.trial})
                </TabsTrigger>
                <TabsTrigger value="past_due" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Past Due ({stats.pastDue})
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Cancelled ({stats.cancelled})
                </TabsTrigger>
                <TabsTrigger value="issues" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Issues ({stats.pastDue + stats.cancelled})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {/* Select All */}
                  <div className="flex items-center space-x-2 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                    <input
                      type="checkbox"
                      checked={selectedSubscriptions.length === filteredSubscriptions.length && filteredSubscriptions.length > 0}
                      onChange={selectAllSubscriptions}
                      className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-300">
                      Select all {filteredSubscriptions.length} subscriptions
                    </span>
                  </div>

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
                            <Badge className={getStatusColor(subscription.status)}>
                              {getStatusIcon(subscription.status)}
                              <span className="ml-1">{subscription.status.replace('_', ' ').charAt(0).toUpperCase() + subscription.status.replace('_', ' ').slice(1)}</span>
                            </Badge>
                            <Badge className={getPlanColor(subscription.plan.name)}>
                              <Crown className="mr-1 h-3 w-3" />
                              {subscription.plan.name}
                            </Badge>
                          </div>
                          
                          {/* Business Owner Info */}
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
                          </div>

                          {/* Subscription Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span>${subscription.plan.price}/{subscription.plan.billingCycle}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>Next: {new Date(subscription.nextBilling).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="h-4 w-4 text-gray-500" />
                              <span>{subscription.paymentMethod || 'No payment method'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4 text-gray-500" />
                              <span className={getEngagementColor(subscription.metrics.engagementScore)}>
                                {subscription.metrics.engagementScore}% engagement
                              </span>
                            </div>
                          </div>

                          {/* Usage Statistics */}
                          <div className="grid grid-cols-3 gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 mb-4">
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {subscription.usage.invoices.used}
                                {subscription.usage.invoices.limit !== 'unlimited' && `/${subscription.usage.invoices.limit}`}
                              </div>
                              <div className="text-xs text-gray-400">Invoices</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {subscription.usage.clients.used}
                                {subscription.usage.clients.limit !== 'unlimited' && `/${subscription.usage.clients.limit}`}
                              </div>
                              <div className="text-xs text-gray-400">Clients</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {subscription.usage.teamMembers.used}
                                {subscription.usage.teamMembers.limit !== 'unlimited' && `/${subscription.usage.teamMembers.limit}`}
                              </div>
                              <div className="text-xs text-gray-400">Team</div>
                            </div>
                          </div>

                          {/* Metrics */}
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400">MRR:</span>
                              <span className="font-medium text-white">${subscription.metrics.mrr.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400">LTV:</span>
                              <span className="font-medium text-white">${subscription.metrics.ltv.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400">Churn Risk:</span>
                              <span className={`font-medium ${getChurnRiskColor(subscription.metrics.churnRisk)}`}>
                                {subscription.metrics.churnRisk.charAt(0).toUpperCase() + subscription.metrics.churnRisk.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-6">
                          {/* Revenue Stats */}
                          <div className="hidden lg:flex items-center space-x-6 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-white">${subscription.totalPaid.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">Total Paid</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {subscription.lastPayment ? new Date(subscription.lastPayment).toLocaleDateString() : 'Never'}
                              </div>
                              <div className="text-xs text-gray-400">Last Payment</div>
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
                              <DropdownMenuItem onClick={() => handleSubscriptionAction('Billing Updated', subscription)}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Update Billing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSubscriptionAction('Usage Viewed', subscription)}>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Usage
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleSubscriptionAction('Plan Changed', subscription)}>
                                <Crown className="mr-2 h-4 w-4" />
                                Change Plan
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSubscriptionAction('Renewed', subscription)}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Force Renewal
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSubscriptionAction('Contacted', subscription)}>
                                <Send className="mr-2 h-4 w-4" />
                                Contact Customer
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {subscription.status === 'active' ? (
                                <DropdownMenuItem 
                                  onClick={() => handleSubscriptionAction('Suspended', subscription)}
                                  className="text-red-400"
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  Suspend Subscription
                                </DropdownMenuItem>
                              ) : subscription.status === 'cancelled' ? (
                                <DropdownMenuItem 
                                  onClick={() => handleSubscriptionAction('Reactivated', subscription)}
                                  className="text-green-400"
                                >
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Reactivate Subscription
                                </DropdownMenuItem>
                              ) : null}
                              <DropdownMenuItem 
                                onClick={() => handleSubscriptionAction('Cancelled', subscription)}
                                className="text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Cancel Subscription
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
                      <h3 className="mt-2 text-sm font-medium text-white">No subscriptions found</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {searchTerm ? 'Try adjusting your search terms.' : 'No subscriptions match the current filter.'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Revenue Analytics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Revenue Metrics</h3>
                  <p className="text-green-200 mb-4">
                    Strong subscription revenue with healthy growth
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
                      <span className="font-medium text-white">+12.5%</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Subscription Health</h3>
                  <p className="text-blue-200 mb-4">
                    Excellent retention with low churn rate
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Active Rate</span>
                      <span className="font-medium text-white">{Math.round((stats.active / stats.total) * 100)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Churn Rate</span>
                      <span className="font-medium text-white">2.1%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Avg LTV</span>
                      <span className="font-medium text-white">${(stats.totalLTV / stats.total).toFixed(0)}</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Plan Performance</h3>
                  <p className="text-purple-200 mb-4">
                    Enterprise plan showing strong adoption
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Enterprise</span>
                      <span className="font-medium text-white">
                        {mockSubscriptions.filter(s => s.plan.name === 'Enterprise').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Team</span>
                      <span className="font-medium text-white">
                        {mockSubscriptions.filter(s => s.plan.name === 'Team').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Personal</span>
                      <span className="font-medium text-white">
                        {mockSubscriptions.filter(s => s.plan.name === 'Personal').length}
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