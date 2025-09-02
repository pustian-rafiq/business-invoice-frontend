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
  CheckCircle,
  TrendingUp,
  Activity,
  Settings,
  BarChart3,
  CreditCard,
  Globe,
  Calendar,
  UserCheck,
  Send
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const activeBusinesses = [
  {
    id: '1',
    name: 'Acme Corporation',
    description: 'Technology solutions and consulting services',
    industry: 'Technology',
    logo: 'AC',
    plan: 'Team',
    owner: {
      name: 'John Doe',
      email: 'john@acme.com',
      avatar: 'JD'
    },
    members: 12,
    invoices: 245,
    revenue: 125000,
    monthlyRevenue: 10400,
    growth: 15.2,
    createdAt: '2024-01-15',
    lastActivity: '2025-01-15T10:30:00Z',
    subscription: {
      amount: 79.00,
      nextBilling: '2025-02-15',
      status: 'active'
    },
    performance: {
      invoicesSent: 245,
      paymentsReceived: 220,
      successRate: 89.8,
      avgPaymentTime: 18
    },
    compliance: {
      score: 95,
      issues: 0
    }
  },
  {
    id: '2',
    name: 'Tech Solutions Inc',
    description: 'Software development and IT consulting',
    industry: 'Technology',
    logo: 'TS',
    plan: 'Personal',
    owner: {
      name: 'Jane Smith',
      email: 'jane@techsol.com',
      avatar: 'JS'
    },
    members: 5,
    invoices: 156,
    revenue: 89000,
    monthlyRevenue: 7400,
    growth: 8.7,
    createdAt: '2024-02-20',
    lastActivity: '2025-01-14T16:45:00Z',
    subscription: {
      amount: 29.00,
      nextBilling: '2025-02-20',
      status: 'active'
    },
    performance: {
      invoicesSent: 156,
      paymentsReceived: 142,
      successRate: 91.0,
      avgPaymentTime: 22
    },
    compliance: {
      score: 88,
      issues: 1
    }
  },
  {
    id: '5',
    name: 'Global Ventures',
    description: 'International business consulting',
    industry: 'Consulting',
    logo: 'GV',
    plan: 'Enterprise',
    owner: {
      name: 'David Brown',
      email: 'david@globalventures.com',
      avatar: 'DB'
    },
    members: 25,
    invoices: 678,
    revenue: 456000,
    monthlyRevenue: 38000,
    growth: 22.1,
    createdAt: '2023-11-05',
    lastActivity: '2025-01-12T11:30:00Z',
    subscription: {
      amount: 299.00,
      nextBilling: '2025-02-05',
      status: 'active'
    },
    performance: {
      invoicesSent: 678,
      paymentsReceived: 645,
      successRate: 95.1,
      avgPaymentTime: 12
    },
    compliance: {
      score: 98,
      issues: 0
    }
  }
];

const getPlanColor = (plan: string) => {
  switch (plan) {
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

const getGrowthColor = (growth: number) => {
  if (growth > 15) return 'text-green-400';
  if (growth > 5) return 'text-yellow-400';
  return 'text-red-400';
};

const getComplianceColor = (score: number) => {
  if (score >= 95) return 'text-green-400';
  if (score >= 80) return 'text-yellow-400';
  return 'text-red-400';
};

export default function ActiveBusinessesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredBusinesses = activeBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: activeBusinesses.length,
    totalRevenue: activeBusinesses.reduce((sum, b) => sum + b.revenue, 0),
    totalInvoices: activeBusinesses.reduce((sum, b) => sum + b.invoices, 0),
    totalMembers: activeBusinesses.reduce((sum, b) => sum + b.members, 0),
    avgGrowth: activeBusinesses.reduce((sum, b) => sum + b.growth, 0) / activeBusinesses.length,
    avgCompliance: activeBusinesses.reduce((sum, b) => sum + b.compliance.score, 0) / activeBusinesses.length
  };

  const handleBusinessAction = (action: string, business: any) => {
    toast({
      title: `Business ${action}`,
      description: `${business.name} has been ${action.toLowerCase()}`,
    });
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
              <h1 className="text-3xl font-bold text-white">Active Businesses</h1>
              <p className="text-gray-400 mt-2">Monitor and manage all active business accounts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Active
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <BarChart3 className="mr-2 h-4 w-4" />
              Performance Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Businesses</CardTitle>
              <Building className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">Currently operational</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Combined Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">Generated by active businesses</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+{stats.avgGrowth.toFixed(1)}%</div>
              <p className="text-xs text-gray-400 mt-1">Monthly growth</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Compliance Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.avgCompliance.toFixed(0)}%</div>
              <p className="text-xs text-gray-400 mt-1">Average compliance</p>
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
                  placeholder="Search active businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Plan
                </Button>
                {selectedBusinesses.length > 0 && (
                  <Badge variant="secondary" className="bg-red-900/50 text-red-400">
                    {selectedBusinesses.length} selected
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-bold">
                        {business.logo}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-white text-lg">{business.name}</h3>
                        <Badge className="bg-green-900/50 text-green-400">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                        <Badge className={getPlanColor(business.plan)}>
                          <Crown className="mr-1 h-3 w-3" />
                          {business.plan}
                        </Badge>
                        <Badge className="bg-blue-900/50 text-blue-400">
                          <Building className="mr-1 h-3 w-3" />
                          {business.industry}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-400 mb-4">{business.description}</p>
                      
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

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-white">{business.performance.invoicesSent}</div>
                          <div className="text-xs text-gray-400">Invoices Sent</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{business.performance.paymentsReceived}</div>
                          <div className="text-xs text-gray-400">Payments</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{business.performance.successRate}%</div>
                          <div className="text-xs text-gray-400">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{business.performance.avgPaymentTime}d</div>
                          <div className="text-xs text-gray-400">Avg Payment</div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{business.members} team members</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className={`h-4 w-4 ${getGrowthColor(business.growth)}`} />
                          <span className={getGrowthColor(business.growth)}>
                            +{business.growth}% growth
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className={`h-4 w-4 ${getComplianceColor(business.compliance.score)}`} />
                          <span className={getComplianceColor(business.compliance.score)}>
                            {business.compliance.score}% compliance
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-6">
                      {/* Revenue Stats */}
                      <div className="hidden lg:flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-white">${business.revenue.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Total Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">${business.monthlyRevenue.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Monthly</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">${business.subscription.amount}/mo</div>
                          <div className="text-xs text-gray-400">Subscription</div>
                        </div>
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
                          <DropdownMenuItem onClick={() => handleBusinessAction('Edited', business)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Business
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBusinessAction('Impersonated', business)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Impersonate Owner
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBusinessAction('Analytics Viewed', business)}>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleBusinessAction('Plan Upgraded', business)}>
                            <Crown className="mr-2 h-4 w-4" />
                            Upgrade Plan
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBusinessAction('Message Sent', business)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBusinessAction('Settings Updated', business)}>
                            <Settings className="mr-2 h-4 w-4" />
                            Business Settings
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
                  <h3 className="mt-2 text-sm font-medium text-white">No active businesses found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {searchTerm ? 'Try adjusting your search terms.' : 'No businesses are currently active.'}
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
                    Strong revenue growth across active businesses
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Total Revenue</span>
                      <span className="font-medium text-white">${stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Avg Growth</span>
                      <span className="font-medium text-white">+{stats.avgGrowth.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Top Performer</span>
                      <span className="font-medium text-white">Global Ventures</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Business Activity</h3>
                  <p className="text-blue-200 mb-4">
                    High engagement and platform utilization
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Total Invoices</span>
                      <span className="font-medium text-white">{stats.totalInvoices.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Team Members</span>
                      <span className="font-medium text-white">{stats.totalMembers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Avg Team Size</span>
                      <span className="font-medium text-white">{Math.round(stats.totalMembers / stats.total)}</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Compliance Health</h3>
                  <p className="text-purple-200 mb-4">
                    Excellent compliance across active businesses
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Avg Score</span>
                      <span className="font-medium text-white">{stats.avgCompliance.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Fully Compliant</span>
                      <span className="font-medium text-white">
                        {activeBusinesses.filter(b => b.compliance.score >= 95).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Issues</span>
                      <span className="font-medium text-white">
                        {activeBusinesses.reduce((sum, b) => sum + b.compliance.issues, 0)}
                      </span>
                    </div>
                  </div>
                </div>
                <CheckCircle className="h-12 w-12 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}