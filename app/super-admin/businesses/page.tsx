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
  Building,
  Users,
  DollarSign,
  FileText,
  Crown,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Settings,
  Ban,
  UserCheck,
  BarChart3,
  CreditCard,
  Globe,
  Calendar,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const mockBusinesses = [
  {
    id: '1',
    name: 'Acme Corporation',
    description: 'Technology solutions and consulting services',
    industry: 'Technology',
    logo: 'AC',
    status: 'active',
    plan: 'Team',
    owner: {
      name: 'John Doe',
      email: 'john@acme.com',
      avatar: 'JD'
    },
    members: 12,
    invoices: 245,
    revenue: 125000,
    createdAt: '2024-01-15',
    lastActivity: '2025-01-15T10:30:00Z',
    address: '123 Business St, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'contact@acme.com',
    website: 'https://acme.com',
    taxId: 'TAX123456789',
    currency: 'USD',
    timezone: 'America/New_York',
    subscription: {
      plan: 'Team',
      status: 'active',
      amount: 79.00,
      nextBilling: '2025-02-15',
      billingCycle: 'monthly'
    },
    usage: {
      invoices: { used: 245, limit: 'unlimited' },
      clients: { used: 89, limit: 500 },
      teamMembers: { used: 12, limit: 15 },
      storage: { used: 2.1, limit: 10 }
    },
    compliance: {
      taxCompliant: true,
      gdprCompliant: true,
      dataRetention: 'compliant'
    }
  },
  {
    id: '2',
    name: 'Tech Solutions Inc',
    description: 'Software development and IT consulting',
    industry: 'Technology',
    logo: 'TS',
    status: 'active',
    plan: 'Personal',
    owner: {
      name: 'Jane Smith',
      email: 'jane@techsol.com',
      avatar: 'JS'
    },
    members: 5,
    invoices: 156,
    revenue: 89000,
    createdAt: '2024-02-20',
    lastActivity: '2025-01-14T16:45:00Z',
    address: '456 Tech Ave, San Francisco, CA 94105',
    phone: '+1 (555) 987-6543',
    email: 'hello@techsol.com',
    website: 'https://techsol.com',
    taxId: 'TAX987654321',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    subscription: {
      plan: 'Personal',
      status: 'active',
      amount: 29.00,
      nextBilling: '2025-02-20',
      billingCycle: 'monthly'
    },
    usage: {
      invoices: { used: 156, limit: 'unlimited' },
      clients: { used: 34, limit: 50 },
      teamMembers: { used: 5, limit: 1 },
      storage: { used: 1.2, limit: 5 }
    },
    compliance: {
      taxCompliant: true,
      gdprCompliant: false,
      dataRetention: 'warning'
    }
  },
  {
    id: '3',
    name: 'Digital Marketing Pro',
    description: 'Full-service digital marketing agency',
    industry: 'Marketing',
    logo: 'DM',
    status: 'trial',
    plan: 'Free Trial',
    owner: {
      name: 'Mike Johnson',
      email: 'mike@digipro.com',
      avatar: 'MJ'
    },
    members: 3,
    invoices: 23,
    revenue: 15000,
    createdAt: '2024-12-01',
    lastActivity: '2025-01-13T09:15:00Z',
    address: '789 Marketing Blvd, Austin, TX 73301',
    phone: '+1 (555) 456-7890',
    email: 'team@digipro.com',
    website: 'https://digipro.com',
    taxId: 'TAX456789123',
    currency: 'USD',
    timezone: 'America/Chicago',
    subscription: {
      plan: 'Free Trial',
      status: 'trial',
      amount: 0,
      nextBilling: '2025-01-27',
      billingCycle: 'trial'
    },
    usage: {
      invoices: { used: 23, limit: 5 },
      clients: { used: 8, limit: 2 },
      teamMembers: { used: 3, limit: 1 },
      storage: { used: 0.3, limit: 1 }
    },
    compliance: {
      taxCompliant: false,
      gdprCompliant: true,
      dataRetention: 'compliant'
    }
  },
  {
    id: '4',
    name: 'StartupXYZ',
    description: 'Innovative fintech startup',
    industry: 'Fintech',
    logo: 'SX',
    status: 'suspended',
    plan: 'Personal',
    owner: {
      name: 'Sarah Wilson',
      email: 'sarah@startupxyz.com',
      avatar: 'SW'
    },
    members: 2,
    invoices: 45,
    revenue: 8500,
    createdAt: '2024-08-15',
    lastActivity: '2024-12-20T14:20:00Z',
    address: '321 Startup Lane, Seattle, WA 98101',
    phone: '+1 (555) 321-0987',
    email: 'team@startupxyz.com',
    website: 'https://startupxyz.com',
    taxId: 'TAX789123456',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    subscription: {
      plan: 'Personal',
      status: 'suspended',
      amount: 29.00,
      nextBilling: '2025-01-15',
      billingCycle: 'monthly'
    },
    usage: {
      invoices: { used: 45, limit: 'unlimited' },
      clients: { used: 12, limit: 50 },
      teamMembers: { used: 2, limit: 1 },
      storage: { used: 0.8, limit: 5 }
    },
    compliance: {
      taxCompliant: false,
      gdprCompliant: false,
      dataRetention: 'violation'
    }
  },
  {
    id: '5',
    name: 'Global Ventures',
    description: 'International business consulting',
    industry: 'Consulting',
    logo: 'GV',
    status: 'active',
    plan: 'Enterprise',
    owner: {
      name: 'David Brown',
      email: 'david@globalventures.com',
      avatar: 'DB'
    },
    members: 25,
    invoices: 678,
    revenue: 456000,
    createdAt: '2023-11-05',
    lastActivity: '2025-01-12T11:30:00Z',
    address: '654 Global St, Miami, FL 33101',
    phone: '+1 (555) 654-3210',
    email: 'contact@globalventures.com',
    website: 'https://globalventures.com',
    taxId: 'TAX321654987',
    currency: 'USD',
    timezone: 'America/New_York',
    subscription: {
      plan: 'Enterprise',
      status: 'active',
      amount: 299.00,
      nextBilling: '2025-02-05',
      billingCycle: 'monthly'
    },
    usage: {
      invoices: { used: 678, limit: 'unlimited' },
      clients: { used: 234, limit: 'unlimited' },
      teamMembers: { used: 25, limit: 'unlimited' },
      storage: { used: 8.5, limit: 'unlimited' }
    },
    compliance: {
      taxCompliant: true,
      gdprCompliant: true,
      dataRetention: 'compliant'
    }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-900/50 text-green-400 hover:bg-green-900/70';
    case 'trial':
      return 'bg-blue-900/50 text-blue-400 hover:bg-blue-900/70';
    case 'suspended':
      return 'bg-red-900/50 text-red-400 hover:bg-red-900/70';
    case 'inactive':
      return 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70';
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
    case 'suspended':
      return <Ban className="h-4 w-4" />;
    case 'inactive':
      return <AlertTriangle className="h-4 w-4" />;
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

const getComplianceColor = (compliant: boolean) => {
  return compliant ? 'text-green-400' : 'text-red-400';
};

export default function BusinessesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || business.status === selectedTab ||
                      (selectedTab === 'enterprise' && business.plan === 'Enterprise');
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockBusinesses.length,
    active: mockBusinesses.filter(b => b.status === 'active').length,
    trial: mockBusinesses.filter(b => b.status === 'trial').length,
    suspended: mockBusinesses.filter(b => b.status === 'suspended').length,
    enterprise: mockBusinesses.filter(b => b.plan === 'Enterprise').length,
    totalRevenue: mockBusinesses.reduce((sum, b) => sum + b.revenue, 0),
    totalInvoices: mockBusinesses.reduce((sum, b) => sum + b.invoices, 0),
    totalMembers: mockBusinesses.reduce((sum, b) => sum + b.members, 0)
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

  const selectAllBusinesses = () => {
    if (selectedBusinesses.length === filteredBusinesses.length) {
      setSelectedBusinesses([]);
    } else {
      setSelectedBusinesses(filteredBusinesses.map(b => b.id));
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Business Management</h1>
            <p className="text-gray-400 mt-2">Manage all businesses on the platform and their subscriptions</p>
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
                  Import CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Excel
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
            <Link href="/super-admin/businesses/create">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Business
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Businesses</CardTitle>
              <Building className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.active} active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Platform Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">Generated by businesses</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Members</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalMembers}</div>
              <p className="text-xs text-gray-400 mt-1">Across all businesses</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Enterprise Clients</CardTitle>
              <Crown className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.enterprise}</div>
              <p className="text-xs text-gray-400 mt-1">High-value accounts</p>
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
                  placeholder="Search businesses..."
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
                {selectedBusinesses.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-red-900/50 text-red-400">
                      {selectedBusinesses.length} selected
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleBulkAction('Activated')}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Activate Businesses
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('Suspended')}>
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend Businesses
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('Upgraded')}>
                          <Crown className="mr-2 h-4 w-4" />
                          Upgrade Plans
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
              <TabsList className="grid w-full grid-cols-5 bg-gray-700/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  All ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Active ({stats.active})
                </TabsTrigger>
                <TabsTrigger value="trial" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Trial ({stats.trial})
                </TabsTrigger>
                <TabsTrigger value="suspended" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Suspended ({stats.suspended})
                </TabsTrigger>
                <TabsTrigger value="enterprise" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Enterprise ({stats.enterprise})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {/* Select All */}
                  <div className="flex items-center space-x-2 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                    <input
                      type="checkbox"
                      checked={selectedBusinesses.length === filteredBusinesses.length && filteredBusinesses.length > 0}
                      onChange={selectAllBusinesses}
                      className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-300">
                      Select all {filteredBusinesses.length} businesses
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
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-bold">
                            {business.logo}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-semibold text-white text-lg">{business.name}</h3>
                            <Badge className={getStatusColor(business.status)}>
                              {getStatusIcon(business.status)}
                              <span className="ml-1">{business.status.charAt(0).toUpperCase() + business.status.slice(1)}</span>
                            </Badge>
                            <Badge className={getPlanColor(business.plan)}>
                              <Crown className="mr-1 h-3 w-3" />
                              {business.plan}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-400 mb-3">{business.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4 text-gray-500" />
                              <span>{business.industry}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{business.members} members</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span>{business.invoices} invoices</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4 text-gray-500" />
                              <span>
                                Active {new Date(business.lastActivity).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Owner Information */}
                          <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
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

                          {/* Usage Statistics */}
                          <div className="grid grid-cols-4 gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 mb-4">
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {business.usage.invoices.used}
                                {business.usage.invoices.limit !== 'unlimited' && `/${business.usage.invoices.limit}`}
                              </div>
                              <div className="text-xs text-gray-400">Invoices</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {business.usage.clients.used}
                                {business.usage.clients.limit !== 'unlimited' && `/${business.usage.clients.limit}`}
                              </div>
                              <div className="text-xs text-gray-400">Clients</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {business.usage.teamMembers.used}
                                {business.usage.teamMembers.limit !== 'unlimited' && `/${business.usage.teamMembers.limit}`}
                              </div>
                              <div className="text-xs text-gray-400">Team</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {business.usage.storage.used}GB
                                {business.usage.storage.limit !== 'unlimited' && `/${business.usage.storage.limit}GB`}
                              </div>
                              <div className="text-xs text-gray-400">Storage</div>
                            </div>
                          </div>

                          {/* Compliance Status */}
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className={`h-4 w-4 ${getComplianceColor(business.compliance.taxCompliant)}`} />
                              <span className="text-gray-400">Tax Compliant</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className={`h-4 w-4 ${getComplianceColor(business.compliance.gdprCompliant)}`} />
                              <span className="text-gray-400">GDPR</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className={`h-4 w-4 ${getComplianceColor(business.compliance.dataRetention === 'compliant')}`} />
                              <span className="text-gray-400">Data Retention</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-6">
                          {/* Business Stats */}
                          <div className="hidden lg:flex items-center space-x-6 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-white">${business.revenue.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">Revenue</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">${business.subscription.amount}/mo</div>
                              <div className="text-xs text-gray-400">Subscription</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {new Date(business.createdAt).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-400">Created</div>
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
                              <DropdownMenuItem onClick={() => handleBusinessAction('Plan Changed', business)}>
                                <Crown className="mr-2 h-4 w-4" />
                                Change Plan
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleBusinessAction('Settings Updated', business)}>
                                <Settings className="mr-2 h-4 w-4" />
                                Business Settings
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {business.status === 'active' ? (
                                <DropdownMenuItem 
                                  onClick={() => handleBusinessAction('Suspended', business)}
                                  className="text-red-400"
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  Suspend Business
                                </DropdownMenuItem>
                              ) : business.status === 'suspended' ? (
                                <DropdownMenuItem 
                                  onClick={() => handleBusinessAction('Activated', business)}
                                  className="text-green-400"
                                >
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate Business
                                </DropdownMenuItem>
                              ) : null}
                              <DropdownMenuItem 
                                onClick={() => handleBusinessAction('Deleted', business)}
                                className="text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Business
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
                      <h3 className="mt-2 text-sm font-medium text-white">No businesses found</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {searchTerm ? 'Try adjusting your search terms.' : 'No businesses match the current filter.'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Business Analytics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Business Growth</h3>
                  <p className="text-blue-200 mb-4">
                    Platform business registration and growth trends
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">This Month</span>
                      <span className="font-medium text-white">+45 businesses</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Growth Rate</span>
                      <span className="font-medium text-white">+12.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Retention</span>
                      <span className="font-medium text-white">94.2%</span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Revenue Metrics</h3>
                  <p className="text-green-200 mb-4">
                    Platform revenue and subscription analytics
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Monthly Revenue</span>
                      <span className="font-medium text-white">$89,420</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Avg per Business</span>
                      <span className="font-medium text-white">$27.54</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Churn Rate</span>
                      <span className="font-medium text-white">2.1%</span>
                    </div>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Platform Usage</h3>
                  <p className="text-purple-200 mb-4">
                    Business activity and feature adoption
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Active Businesses</span>
                      <span className="font-medium text-white">{stats.active}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Total Invoices</span>
                      <span className="font-medium text-white">{stats.totalInvoices.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Feature Adoption</span>
                      <span className="font-medium text-white">87.3%</span>
                    </div>
                  </div>
                </div>
                <BarChart3 className="h-12 w-12 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}