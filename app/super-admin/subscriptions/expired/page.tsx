'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  AlertTriangle,
  Clock,
  Ban,
  RefreshCw,
  Building,
  Users,
  Calendar,
  Activity,
  Send,
  UserCheck,
  Trash2,
  Mail,
  Phone,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const expiredSubscriptions = [
  {
    id: 'sub_exp_1',
    business: {
      id: '6',
      name: 'Dormant Design Studio',
      logo: 'DD',
      owner: 'Emily Davis',
      email: 'emily@dormantdesign.com',
      industry: 'Design'
    },
    plan: {
      name: 'Personal',
      price: 29.00,
      billingCycle: 'monthly',
      tier: 'personal'
    },
    status: 'expired',
    expiredDate: '2024-11-15',
    lastPayment: '2024-10-15',
    totalPaid: 348.00,
    paymentMethod: 'Credit Card',
    expiredReason: 'Payment method expired',
    daysSinceExpiry: 61,
    reactivationAttempts: 3,
    lastContactDate: '2024-12-01',
    autoDeleteDate: '2025-05-15',
    usage: {
      invoices: { used: 67, limit: 'unlimited' },
      clients: { used: 23, limit: 50 },
      teamMembers: { used: 2, limit: 1 }
    },
    metrics: {
      mrr: 0,
      ltv: 348.00,
      churnRisk: 'high',
      engagementScore: 34,
      lastLoginDays: 75
    },
    reactivationPotential: 'medium',
    winBackOffers: [
      { type: '50% discount', sent: '2024-12-01', opened: true, clicked: false },
      { type: 'Free month', sent: '2024-11-20', opened: true, clicked: false }
    ]
  },
  {
    id: 'sub_exp_2',
    business: {
      id: '7',
      name: 'Seasonal Consulting',
      logo: 'SC',
      owner: 'Robert Wilson',
      email: 'robert@seasonalconsult.com',
      industry: 'Consulting'
    },
    plan: {
      name: 'Team',
      price: 79.00,
      billingCycle: 'monthly',
      tier: 'team'
    },
    status: 'expired',
    expiredDate: '2024-09-30',
    lastPayment: '2024-08-30',
    totalPaid: 711.00,
    paymentMethod: 'Bank Transfer',
    expiredReason: 'Voluntary cancellation - seasonal business',
    daysSinceExpiry: 107,
    reactivationAttempts: 1,
    lastContactDate: '2024-11-15',
    autoDeleteDate: '2025-03-30',
    usage: {
      invoices: { used: 123, limit: 'unlimited' },
      clients: { used: 45, limit: 500 },
      teamMembers: { used: 4, limit: 15 }
    },
    metrics: {
      mrr: 0,
      ltv: 711.00,
      churnRisk: 'low',
      engagementScore: 89,
      lastLoginDays: 45
    },
    reactivationPotential: 'high',
    winBackOffers: [
      { type: 'Seasonal discount', sent: '2024-11-15', opened: true, clicked: true }
    ]
  },
  {
    id: 'sub_exp_3',
    business: {
      id: '8',
      name: 'Failed Startup Inc',
      logo: 'FS',
      owner: 'Alex Thompson',
      email: 'alex@failedstartup.com',
      industry: 'Technology'
    },
    plan: {
      name: 'Personal',
      price: 29.00,
      billingCycle: 'monthly',
      tier: 'personal'
    },
    status: 'expired',
    expiredDate: '2024-08-20',
    lastPayment: '2024-07-20',
    totalPaid: 174.00,
    paymentMethod: 'Credit Card',
    expiredReason: 'Business closure',
    daysSinceExpiry: 148,
    reactivationAttempts: 0,
    lastContactDate: null,
    autoDeleteDate: '2025-02-20',
    usage: {
      invoices: { used: 23, limit: 'unlimited' },
      clients: { used: 8, limit: 50 },
      teamMembers: { used: 1, limit: 1 }
    },
    metrics: {
      mrr: 0,
      ltv: 174.00,
      churnRisk: 'high',
      engagementScore: 12,
      lastLoginDays: 148
    },
    reactivationPotential: 'low',
    winBackOffers: []
  }
];

const getReactivationColor = (potential: string) => {
  switch (potential) {
    case 'high':
      return 'bg-green-900/50 text-green-400';
    case 'medium':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'low':
      return 'bg-red-900/50 text-red-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getExpiredReasonColor = (reason: string) => {
  if (reason.includes('Payment')) return 'bg-orange-900/50 text-orange-400';
  if (reason.includes('cancellation')) return 'bg-blue-900/50 text-blue-400';
  if (reason.includes('closure')) return 'bg-red-900/50 text-red-400';
  return 'bg-gray-700/50 text-gray-400';
};

export default function ExpiredSubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reactivationFilter, setReactivationFilter] = useState('all');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredSubscriptions = expiredSubscriptions.filter(subscription => {
    const matchesSearch = subscription.business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.expiredReason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReactivation = reactivationFilter === 'all' || subscription.reactivationPotential === reactivationFilter;
    return matchesSearch && matchesReactivation;
  });

  const stats = {
    total: expiredSubscriptions.length,
    highPotential: expiredSubscriptions.filter(s => s.reactivationPotential === 'high').length,
    mediumPotential: expiredSubscriptions.filter(s => s.reactivationPotential === 'medium').length,
    lowPotential: expiredSubscriptions.filter(s => s.reactivationPotential === 'low').length,
    totalLostRevenue: expiredSubscriptions.reduce((sum, s) => sum + s.plan.price, 0),
    avgDaysSinceExpiry: expiredSubscriptions.reduce((sum, s) => sum + s.daysSinceExpiry, 0) / expiredSubscriptions.length,
    totalReactivationAttempts: expiredSubscriptions.reduce((sum, s) => sum + s.reactivationAttempts, 0)
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
              <h1 className="text-3xl font-bold text-white">Expired Subscriptions</h1>
              <p className="text-gray-400 mt-2">Manage expired subscriptions and win-back campaigns</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            {selectedSubscriptions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    Win-Back Campaign ({selectedSubscriptions.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleBulkAction('Discount Offered')}>
                    <Crown className="mr-2 h-4 w-4" />
                    Send Discount Offer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('Contacted')}>
                    <Send className="mr-2 h-4 w-4" />
                    Personal Outreach
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('Free Trial Offered')}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Offer Free Trial
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction('Permanently Deleted')} className="text-red-400">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Permanent Deletion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Expired Subscriptions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.highPotential} high potential</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Lost Revenue</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalLostRevenue}/mo</div>
              <p className="text-xs text-gray-400 mt-1">Monthly loss</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Days Expired</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{Math.round(stats.avgDaysSinceExpiry)}</div>
              <p className="text-xs text-gray-400 mt-1">Days since expiry</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Win-Back Attempts</CardTitle>
              <Send className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalReactivationAttempts}</div>
              <p className="text-xs text-gray-400 mt-1">Total attempts</p>
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
                  placeholder="Search expired subscriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={reactivationFilter} onValueChange={setReactivationFilter}>
                  <SelectTrigger className="w-40 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Potential</SelectItem>
                    <SelectItem value="high">High Potential</SelectItem>
                    <SelectItem value="medium">Medium Potential</SelectItem>
                    <SelectItem value="low">Low Potential</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
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
                      <AvatarFallback className="bg-gradient-to-r from-gray-500 to-slate-500 text-white text-lg font-bold">
                        {subscription.business.logo}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-white text-lg">{subscription.business.name}</h3>
                        <Badge className="bg-red-900/50 text-red-400">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Expired
                        </Badge>
                        <Badge className={getReactivationColor(subscription.reactivationPotential)}>
                          <RefreshCw className="mr-1 h-3 w-3" />
                          {subscription.reactivationPotential.charAt(0).toUpperCase() + subscription.reactivationPotential.slice(1)} Potential
                        </Badge>
                        <Badge className="bg-blue-900/50 text-blue-400">
                          <Building className="mr-1 h-3 w-3" />
                          {subscription.business.industry}
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
                      </div>

                      {/* Expiry Information */}
                      <div className="p-3 bg-red-900/20 rounded-lg border border-red-700/30 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="font-medium text-red-300">Expired {subscription.daysSinceExpiry} days ago</span>
                        </div>
                        <div className="text-sm text-red-200">
                          <div>Reason: {subscription.expiredReason}</div>
                          <div>Last payment: {new Date(subscription.lastPayment).toLocaleDateString()}</div>
                          <div>Auto-delete: {new Date(subscription.autoDeleteDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      {/* Win-Back Campaign Status */}
                      {subscription.winBackOffers.length > 0 && (
                        <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/30 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Send className="h-4 w-4 text-blue-400" />
                            <span className="font-medium text-blue-300">Win-Back Campaigns</span>
                          </div>
                          <div className="space-y-1">
                            {subscription.winBackOffers.map((offer, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-blue-200">{offer.type}</span>
                                <div className="flex items-center space-x-2">
                                  <Badge className={offer.opened ? 'bg-green-900/50 text-green-400' : 'bg-gray-700/50 text-gray-400'}>
                                    {offer.opened ? 'Opened' : 'Not opened'}
                                  </Badge>
                                  {offer.clicked && (
                                    <Badge className="bg-purple-900/50 text-purple-400">
                                      Clicked
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Previous Usage */}
                      <div className="grid grid-cols-3 gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-white">{subscription.usage.invoices.used}</div>
                          <div className="text-xs text-gray-400">Invoices Created</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{subscription.usage.clients.used}</div>
                          <div className="text-xs text-gray-400">Clients Managed</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{subscription.usage.teamMembers.used}</div>
                          <div className="text-xs text-gray-400">Team Members</div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Total Paid:</span>
                          <span className="font-medium text-white">${subscription.totalPaid.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Last Login:</span>
                          <span className="text-gray-300">{subscription.metrics.lastLoginDays} days ago</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Attempts:</span>
                          <span className="text-white">{subscription.reactivationAttempts}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="text-right mr-4">
                        <div className="text-lg font-bold text-white">${subscription.plan.price}/mo</div>
                        <div className="text-sm text-gray-400">Lost revenue</div>
                        {subscription.lastContactDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            Last contact: {new Date(subscription.lastContactDate).toLocaleDateString()}
                          </div>
                        )}
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
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Contacted', subscription)}>
                            <Send className="mr-2 h-4 w-4" />
                            Contact Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Discount Offered', subscription)} className="text-green-400">
                            <Crown className="mr-2 h-4 w-4" />
                            Send Win-Back Offer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Trial Offered', subscription)} className="text-blue-400">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Offer Free Trial
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSubscriptionAction('Data Exported', subscription)}>
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleSubscriptionAction('Permanently Deleted', subscription)}
                            className="text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Permanent Delete
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
                  <h3 className="mt-2 text-sm font-medium text-white">No expired subscriptions found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {searchTerm ? 'Try adjusting your search terms.' : 'No subscriptions match the current filters.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Win-Back Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Win-Back Opportunities</h3>
                  <p className="text-orange-200 mb-4">
                    Revenue recovery potential from expired subscriptions
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-300">High Potential</span>
                      <span className="font-medium text-white">{stats.highPotential} accounts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-300">Potential Revenue</span>
                      <span className="font-medium text-white">${stats.totalLostRevenue}/mo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-300">Success Rate</span>
                      <span className="font-medium text-white">23%</span>
                    </div>
                  </div>
                </div>
                <RefreshCw className="h-12 w-12 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Churn Analysis</h3>
                  <p className="text-blue-200 mb-4">
                    Understanding why customers leave the platform
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Payment Issues</span>
                      <span className="font-medium text-white">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Business Closure</span>
                      <span className="font-medium text-white">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Seasonal</span>
                      <span className="font-medium text-white">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Other</span>
                      <span className="font-medium text-white">10%</span>
                    </div>
                  </div>
                </div>
                <BarChart3 className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}