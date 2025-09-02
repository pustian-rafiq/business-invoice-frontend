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
  Building,
  Users,
  DollarSign,
  FileText,
  Crown,
  AlertTriangle,
  Clock,
  Activity,
  Settings,
  UserCheck,
  Send,
  RefreshCw,
  Trash2,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const inactiveBusinesses = [
  {
    id: '6',
    name: 'Dormant Design Studio',
    description: 'Creative design services for small businesses',
    industry: 'Design',
    logo: 'DD',
    plan: 'Personal',
    status: 'inactive',
    owner: {
      name: 'Emily Davis',
      email: 'emily@dormantdesign.com',
      avatar: 'ED'
    },
    members: 2,
    invoices: 34,
    revenue: 12000,
    createdAt: '2024-05-10',
    lastActivity: '2024-10-15T14:20:00Z',
    inactiveSince: '2024-10-15',
    inactiveReason: 'No activity for 90+ days',
    subscription: {
      plan: 'Personal',
      status: 'cancelled',
      amount: 29.00,
      cancelledDate: '2024-10-15'
    },
    reactivationAttempts: 3,
    lastContactDate: '2024-12-01',
    autoSuspendDate: '2025-02-15'
  },
  {
    id: '7',
    name: 'Seasonal Consulting',
    description: 'Seasonal business consulting services',
    industry: 'Consulting',
    logo: 'SC',
    plan: 'Team',
    status: 'inactive',
    owner: {
      name: 'Robert Wilson',
      email: 'robert@seasonalconsult.com',
      avatar: 'RW'
    },
    members: 4,
    invoices: 67,
    revenue: 23000,
    createdAt: '2024-03-20',
    lastActivity: '2024-09-30T16:45:00Z',
    inactiveSince: '2024-09-30',
    inactiveReason: 'Seasonal business closure',
    subscription: {
      plan: 'Team',
      status: 'paused',
      amount: 79.00,
      pausedDate: '2024-09-30'
    },
    reactivationAttempts: 1,
    lastContactDate: '2024-11-15',
    autoSuspendDate: '2025-03-30'
  },
  {
    id: '8',
    name: 'Failed Startup Inc',
    description: 'Technology startup that ceased operations',
    industry: 'Technology',
    logo: 'FS',
    plan: 'Personal',
    status: 'inactive',
    owner: {
      name: 'Alex Thompson',
      email: 'alex@failedstartup.com',
      avatar: 'AT'
    },
    members: 1,
    invoices: 12,
    revenue: 3500,
    createdAt: '2024-08-01',
    lastActivity: '2024-11-20T09:30:00Z',
    inactiveSince: '2024-11-20',
    inactiveReason: 'Business closure notification',
    subscription: {
      plan: 'Personal',
      status: 'cancelled',
      amount: 29.00,
      cancelledDate: '2024-11-20'
    },
    reactivationAttempts: 0,
    lastContactDate: null,
    autoSuspendDate: '2025-02-20'
  }
];

const getInactiveReasonColor = (reason: string) => {
  if (reason.includes('90+ days')) return 'bg-yellow-900/50 text-yellow-400';
  if (reason.includes('closure')) return 'bg-red-900/50 text-red-400';
  if (reason.includes('Seasonal')) return 'bg-blue-900/50 text-blue-400';
  return 'bg-gray-700/50 text-gray-400';
};

const getSubscriptionStatusColor = (status: string) => {
  switch (status) {
    case 'cancelled':
      return 'bg-red-900/50 text-red-400';
    case 'paused':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'expired':
      return 'bg-orange-900/50 text-orange-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

export default function InactiveBusinessesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredBusinesses = inactiveBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.inactiveReason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: inactiveBusinesses.length,
    cancelled: inactiveBusinesses.filter(b => b.subscription.status === 'cancelled').length,
    paused: inactiveBusinesses.filter(b => b.subscription.status === 'paused').length,
    autoSuspendSoon: inactiveBusinesses.filter(b => 
      new Date(b.autoSuspendDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length,
    totalLostRevenue: inactiveBusinesses.reduce((sum, b) => sum + b.subscription.amount, 0)
  };

  const handleBusinessAction = (action: string, business: any) => {
    toast({
      title: `Business ${action}`,
      description: `${business.name} has been ${action.toLowerCase()}`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${selectedBusinesses.length} businesses have been ${action.toLowerCase()}`,
    });
    setSelectedBusinesses([]);
  };

  const toggleBusinessSelection = (businessId: string) => {
    setSelectedBusinesses(prev => 
      prev.includes(businessId) 
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/super-admin/businesses">
              <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Businesses
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Inactive Businesses</h1>
              <p className="text-gray-400 mt-2">Manage dormant and cancelled business accounts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            {selectedBusinesses.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    Bulk Actions ({selectedBusinesses.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleBulkAction('Reactivated')}>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Reactivate Businesses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('Contacted')}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reactivation Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('Extended')}>
                    <Clock className="mr-2 h-4 w-4" />
                    Extend Suspension Date
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
              <CardTitle className="text-sm font-medium text-gray-300">Inactive Businesses</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">Require attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Lost Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalLostRevenue}/mo</div>
              <p className="text-xs text-gray-400 mt-1">Monthly subscription loss</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Auto-Suspend Soon</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.autoSuspendSoon}</div>
              <p className="text-xs text-gray-400 mt-1">Within 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Paused Subscriptions</CardTitle>
              <RefreshCw className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.paused}</div>
              <p className="text-xs text-gray-400 mt-1">Can be reactivated</p>
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
                  placeholder="Search inactive businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Reason
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Select All */}
              <div className="flex items-center space-x-2 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <input
                  type="checkbox"
                  checked={selectedBusinesses.length === filteredBusinesses.length && filteredBusinesses.length > 0}
                  onChange={() => {
                    if (selectedBusinesses.length === filteredBusinesses.length) {
                      setSelectedBusinesses([]);
                    } else {
                      setSelectedBusinesses(filteredBusinesses.map(b => b.id));
                    }
                  }}
                  className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-gray-300">
                  Select all {filteredBusinesses.length} inactive businesses
                </span>
              </div>

              {filteredBusinesses.map((business) => (
                <div key={business.id} className="p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedBusinesses.includes(business.id)}
                      onChange={() => toggleBusinessSelection(business.id)}
                      className="mt-2 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                    />
                    
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-gradient-to-r from-gray-500 to-slate-500 text-white text-lg font-bold">
                        {business.logo}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-white text-lg">{business.name}</h3>
                        <Badge className="bg-gray-700/50 text-gray-400">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Inactive
                        </Badge>
                        <Badge className={getSubscriptionStatusColor(business.subscription.status)}>
                          {business.subscription.status.charAt(0).toUpperCase() + business.subscription.status.slice(1)}
                        </Badge>
                        <Badge className="bg-blue-900/50 text-blue-400">
                          <Building className="mr-1 h-3 w-3" />
                          {business.industry}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-400 mb-4">{business.description}</p>
                      
                      {/* Inactive Information */}
                      <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-700/30 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-orange-400" />
                          <span className="font-medium text-orange-300">Inactive Since</span>
                        </div>
                        <div className="text-sm text-orange-200">
                          <div>{new Date(business.inactiveSince).toLocaleDateString()}</div>
                          <div className="text-orange-300 mt-1">{business.inactiveReason}</div>
                        </div>
                      </div>

                      {/* Owner Information */}
                      <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm">
                            {business.owner.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{business.owner.name}</div>
                          <div className="text-sm text-gray-400">{business.owner.email}</div>
                        </div>
                        <Badge className="bg-yellow-900/50 text-yellow-400">
                          <Crown className="mr-1 h-3 w-3" />
                          Owner
                        </Badge>
                      </div>

                      {/* Business Stats */}
                      <div className="grid grid-cols-4 gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-white">{business.invoices}</div>
                          <div className="text-xs text-gray-400">Invoices</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{business.members}</div>
                          <div className="text-xs text-gray-400">Members</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">${business.revenue.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{business.reactivationAttempts}</div>
                          <div className="text-xs text-gray-400">Attempts</div>
                        </div>
                      </div>

                      {/* Timeline Information */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Created {new Date(business.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-gray-500" />
                          <span>Last active {new Date(business.lastActivity).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>Auto-suspend {new Date(business.autoSuspendDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="text-right mr-4">
                        <div className="text-lg font-bold text-white">${business.subscription.amount}/mo</div>
                        <div className="text-sm text-gray-400">Lost revenue</div>
                        {business.lastContactDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            Last contact: {new Date(business.lastContactDate).toLocaleDateString()}
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
                          <DropdownMenuItem onClick={() => handleBusinessAction('Viewed', business)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBusinessAction('Contacted', business)}>
                            <Send className="mr-2 h-4 w-4" />
                            Contact Owner
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBusinessAction('Reactivated', business)} className="text-green-400">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Reactivate Business
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBusinessAction('Extended', business)}>
                            <Clock className="mr-2 h-4 w-4" />
                            Extend Suspension
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleBusinessAction('Data Exported', business)}>
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleBusinessAction('Permanently Deleted', business)}
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

              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12">
                  <Building className="mx-auto h-12 w-12 text-gray-500" />
                  <h3 className="mt-2 text-sm font-medium text-white">No inactive businesses found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {searchTerm ? 'Try adjusting your search terms.' : 'All businesses are currently active.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reactivation Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Reactivation Opportunities</h3>
                  <p className="text-orange-200 mb-4">
                    Potential revenue recovery from inactive businesses
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-300">Paused Subscriptions</span>
                      <span className="font-medium text-white">{stats.paused}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-300">Potential Revenue</span>
                      <span className="font-medium text-white">${stats.totalLostRevenue}/mo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-300">Success Rate</span>
                      <span className="font-medium text-white">34%</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Retention Insights</h3>
                  <p className="text-blue-200 mb-4">
                    Analysis of business churn and retention patterns
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Avg Lifetime</span>
                      <span className="font-medium text-white">8.5 months</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Churn Rate</span>
                      <span className="font-medium text-white">5.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Reactivation Rate</span>
                      <span className="font-medium text-white">34%</span>
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