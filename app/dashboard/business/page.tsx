'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Building, 
  Users, 
  FileText, 
  DollarSign,
  Settings,
  Crown,
  Star,
  TrendingUp,
  Calendar,
  Globe,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  MoreHorizontal,
  Zap,
  Shield,
  Activity,
  BarChart3,
  CreditCard,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const businesses = [
  {
    id: '1',
    name: 'Acme Corporation',
    description: 'Technology solutions and consulting services',
    industry: 'Technology',
    logo: 'AC',
    status: 'active',
    plan: 'Team',
    isOwner: true,
    role: 'Owner',
    members: 12,
    invoices: 145,
    revenue: 125000,
    createdAt: '2024-01-15',
    address: '123 Business St, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'contact@acme.com',
    website: 'https://acme.com',
    taxId: 'TAX123456789',
    currency: 'USD',
    timezone: 'America/New_York',
    features: {
      invoices: { used: 145, limit: 'unlimited' },
      clients: { used: 89, limit: 500 },
      teamMembers: { used: 12, limit: 15 },
      storage: { used: 2.1, limit: 10 }
    }
  },
  {
    id: '2',
    name: 'Digital Marketing Pro',
    description: 'Full-service digital marketing agency',
    industry: 'Marketing',
    logo: 'DM',
    status: 'active',
    plan: 'Personal',
    isOwner: false,
    role: 'Manager',
    members: 5,
    invoices: 67,
    revenue: 45000,
    createdAt: '2024-03-20',
    address: '456 Marketing Ave, Los Angeles, CA 90210',
    phone: '+1 (555) 987-6543',
    email: 'hello@digitalmarketingpro.com',
    website: 'https://digitalmarketingpro.com',
    taxId: 'TAX987654321',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    features: {
      invoices: { used: 67, limit: 'unlimited' },
      clients: { used: 34, limit: 50 },
      teamMembers: { used: 5, limit: 1 },
      storage: { used: 1.2, limit: 5 }
    }
  },
  {
    id: '3',
    name: 'StartupXYZ',
    description: 'Innovative startup in fintech space',
    industry: 'Fintech',
    logo: 'SX',
    status: 'trial',
    plan: 'Free Trial',
    isOwner: true,
    role: 'Owner',
    members: 3,
    invoices: 12,
    revenue: 8500,
    createdAt: '2024-12-01',
    address: '789 Startup Lane, Austin, TX 73301',
    phone: '+1 (555) 456-7890',
    email: 'team@startupxyz.com',
    website: 'https://startupxyz.com',
    taxId: 'TAX456789123',
    currency: 'USD',
    timezone: 'America/Chicago',
    features: {
      invoices: { used: 12, limit: 5 },
      clients: { used: 8, limit: 2 },
      teamMembers: { used: 3, limit: 1 },
      storage: { used: 0.3, limit: 1 }
    }
  }
];

const planColors = {
  'Free Trial': 'bg-gray-100 text-gray-700',
  'Personal': 'bg-blue-100 text-blue-700',
  'Team': 'bg-purple-100 text-purple-700',
  'Enterprise': 'bg-orange-100 text-orange-700'
};

const statusColors = {
  'active': 'bg-green-100 text-green-700',
  'trial': 'bg-yellow-100 text-yellow-700',
  'suspended': 'bg-red-100 text-red-700',
  'inactive': 'bg-gray-100 text-gray-700'
};

const getUsageColor = (used: number, limit: number | string) => {
  if (limit === 'unlimited') return 'text-green-600';
  const percentage = (used / (limit as number)) * 100;
  if (percentage >= 90) return 'text-red-600';
  if (percentage >= 70) return 'text-yellow-600';
  return 'text-green-600';
};

export default function BusinessPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'owned' && business.isOwner) ||
                      (selectedTab === 'member' && !business.isOwner);
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: businesses.length,
    owned: businesses.filter(b => b.isOwner).length,
    member: businesses.filter(b => !b.isOwner).length,
    totalRevenue: businesses.reduce((sum, b) => sum + b.revenue, 0),
    totalInvoices: businesses.reduce((sum, b) => sum + b.invoices, 0)
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Management</h1>
            <p className="text-gray-600 mt-2">Manage your businesses and switch between different organizations</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Link href="/dashboard/business/create">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Business
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Businesses</CardTitle>
              <Building className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">{stats.owned} owned, {stats.member} member</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Across all businesses</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalInvoices}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Plans</CardTitle>
              <Crown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{businesses.filter(b => b.status === 'active').length}</div>
              <p className="text-xs text-gray-500 mt-1">Subscriptions</p>
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
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/60 border-white/30"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-100/50">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="owned">Owned ({stats.owned})</TabsTrigger>
                <TabsTrigger value="member">Member ({stats.member})</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="grid gap-6">
                  {filteredBusinesses.map((business) => (
                    <Card key={business.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-bold">
                                {business.logo}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{business.name}</h3>
                                {business.isOwner && (
                                  <Badge className="bg-yellow-100 text-yellow-700">
                                    <Crown className="mr-1 h-3 w-3" />
                                    Owner
                                  </Badge>
                                )}
                                <Badge className={statusColors[business.status as keyof typeof statusColors]}>
                                  {business.status === 'active' && <CheckCircle className="mr-1 h-3 w-3" />}
                                  {business.status === 'trial' && <AlertCircle className="mr-1 h-3 w-3" />}
                                  {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                                </Badge>
                                <Badge className={planColors[business.plan as keyof typeof planColors]}>
                                  {business.plan}
                                </Badge>
                              </div>
                              
                              <p className="text-gray-600 mb-4">{business.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center space-x-2">
                                  <Building className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{business.industry}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Users className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{business.members} members</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{business.invoices} invoices</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Since {new Date(business.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>

                              {/* Usage Statistics */}
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="text-center">
                                  <div className={`text-lg font-semibold ${getUsageColor(business.features.invoices.used, business.features.invoices.limit)}`}>
                                    {business.features.invoices.used}
                                    {business.features.invoices.limit !== 'unlimited' && `/${business.features.invoices.limit}`}
                                  </div>
                                  <div className="text-xs text-gray-500">Invoices</div>
                                </div>
                                <div className="text-center">
                                  <div className={`text-lg font-semibold ${getUsageColor(business.features.clients.used, business.features.clients.limit)}`}>
                                    {business.features.clients.used}/{business.features.clients.limit}
                                  </div>
                                  <div className="text-xs text-gray-500">Clients</div>
                                </div>
                                <div className="text-center">
                                  <div className={`text-lg font-semibold ${getUsageColor(business.features.teamMembers.used, business.features.teamMembers.limit)}`}>
                                    {business.features.teamMembers.used}/{business.features.teamMembers.limit}
                                  </div>
                                  <div className="text-xs text-gray-500">Team</div>
                                </div>
                                <div className="text-center">
                                  <div className={`text-lg font-semibold ${getUsageColor(business.features.storage.used, business.features.storage.limit)}`}>
                                    {business.features.storage.used}GB/{business.features.storage.limit}GB
                                  </div>
                                  <div className="text-xs text-gray-500">Storage</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <div className="text-right mr-4">
                              <div className="text-2xl font-bold text-gray-900">${business.revenue.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">Total Revenue</div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Activity className="mr-2 h-4 w-4" />
                                  Switch to Business
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart3 className="mr-2 h-4 w-4" />
                                  View Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="mr-2 h-4 w-4" />
                                  Business Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Users className="mr-2 h-4 w-4" />
                                  Manage Team
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Upgrade Plan
                                </DropdownMenuItem>
                                {business.isOwner && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit Business
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Business
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredBusinesses.length === 0 && (
                    <div className="text-center py-12">
                      <Building className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No businesses found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first business.'}
                      </p>
                      {!searchTerm && (
                        <div className="mt-6">
                          <Link href="/dashboard/business/create">
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                              <Plus className="mr-2 h-4 w-4" />
                              Create Business
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upgrade Your Plan</h3>
                  <p className="text-blue-100 mb-4">
                    Unlock more features and grow your business with advanced plans
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-blue-200" />
                      <span className="text-blue-100">Unlimited invoices</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-200" />
                      <span className="text-blue-100">More team members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-200" />
                      <span className="text-blue-100">Advanced security</span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Business Analytics</h3>
                  <p className="text-green-100 mb-4">
                    Track performance across all your businesses
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-200">Total Revenue</span>
                      <span className="font-medium">${stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-200">Active Businesses</span>
                      <span className="font-medium">{businesses.filter(b => b.status === 'active').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-200">Total Invoices</span>
                      <span className="font-medium">{stats.totalInvoices}</span>
                    </div>
                  </div>
                </div>
                <BarChart3 className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}