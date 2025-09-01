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
  Users,
  Shield,
  Mail,
  Phone,
  Calendar,
  Building,
  CreditCard,
  Activity,
  Ban,
  UserCheck,
  Crown,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Settings,
  Send,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@acme.com',
    phone: '+1 (555) 123-4567',
    role: 'business_owner',
    status: 'active',
    avatar: 'JD',
    joinedDate: '2024-01-15',
    lastActive: '2025-01-15T10:30:00Z',
    businesses: ['Acme Corporation'],
    subscription: 'Team Plan',
    totalRevenue: 125000,
    invoicesCreated: 245,
    location: 'New York, NY',
    ipAddress: '192.168.1.100',
    loginCount: 1247,
    twoFactorEnabled: true,
    emailVerified: true,
    accountLocked: false
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@techsol.com',
    phone: '+1 (555) 987-6543',
    role: 'business_owner',
    status: 'active',
    avatar: 'JS',
    joinedDate: '2024-02-20',
    lastActive: '2025-01-14T16:45:00Z',
    businesses: ['Tech Solutions Inc'],
    subscription: 'Personal Plan',
    totalRevenue: 89000,
    invoicesCreated: 156,
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.101',
    loginCount: 892,
    twoFactorEnabled: false,
    emailVerified: true,
    accountLocked: false
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@digipro.com',
    phone: '+1 (555) 456-7890',
    role: 'team_member',
    status: 'active',
    avatar: 'MJ',
    joinedDate: '2024-03-10',
    lastActive: '2025-01-13T09:15:00Z',
    businesses: ['Digital Marketing Pro'],
    subscription: 'Team Plan',
    totalRevenue: 45000,
    invoicesCreated: 89,
    location: 'Austin, TX',
    ipAddress: '192.168.1.102',
    loginCount: 567,
    twoFactorEnabled: true,
    emailVerified: true,
    accountLocked: false
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@startupxyz.com',
    phone: '+1 (555) 321-0987',
    role: 'business_owner',
    status: 'suspended',
    avatar: 'SW',
    joinedDate: '2024-08-15',
    lastActive: '2024-12-20T14:20:00Z',
    businesses: ['StartupXYZ'],
    subscription: 'Free Trial',
    totalRevenue: 8500,
    invoicesCreated: 23,
    location: 'Seattle, WA',
    ipAddress: '192.168.1.103',
    loginCount: 234,
    twoFactorEnabled: false,
    emailVerified: false,
    accountLocked: true
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@globalventures.com',
    phone: '+1 (555) 654-3210',
    role: 'admin',
    status: 'active',
    avatar: 'DB',
    joinedDate: '2023-11-05',
    lastActive: '2025-01-12T11:30:00Z',
    businesses: ['Global Ventures', 'Investment Corp'],
    subscription: 'Enterprise Plan',
    totalRevenue: 456000,
    invoicesCreated: 678,
    location: 'Miami, FL',
    ipAddress: '192.168.1.104',
    loginCount: 2156,
    twoFactorEnabled: true,
    emailVerified: true,
    accountLocked: false
  },
  {
    id: '6',
    name: 'Lisa Chen',
    email: 'lisa@designstudio.com',
    phone: '+1 (555) 789-0123',
    role: 'team_member',
    status: 'inactive',
    avatar: 'LC',
    joinedDate: '2024-06-12',
    lastActive: '2024-11-15T08:45:00Z',
    businesses: ['Design Studio Pro'],
    subscription: 'Personal Plan',
    totalRevenue: 23000,
    invoicesCreated: 67,
    location: 'Los Angeles, CA',
    ipAddress: '192.168.1.105',
    loginCount: 345,
    twoFactorEnabled: false,
    emailVerified: true,
    accountLocked: false
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-900/50 text-green-400 hover:bg-green-900/70';
    case 'inactive':
      return 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70';
    case 'suspended':
      return 'bg-red-900/50 text-red-400 hover:bg-red-900/70';
    case 'pending':
      return 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900/70';
    default:
      return 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4" />;
    case 'inactive':
      return <Clock className="h-4 w-4" />;
    case 'suspended':
      return <Ban className="h-4 w-4" />;
    case 'pending':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'super_admin':
      return 'bg-red-900/50 text-red-400';
    case 'admin':
      return 'bg-orange-900/50 text-orange-400';
    case 'business_owner':
      return 'bg-purple-900/50 text-purple-400';
    case 'team_member':
      return 'bg-blue-900/50 text-blue-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'super_admin':
      return <Shield className="h-3 w-3" />;
    case 'admin':
      return <Crown className="h-3 w-3" />;
    case 'business_owner':
      return <Building className="h-3 w-3" />;
    case 'team_member':
      return <Users className="h-3 w-3" />;
    default:
      return <Users className="h-3 w-3" />;
  }
};

const formatRole = (role: string) => {
  return role.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.businesses.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = selectedTab === 'all' || user.status === selectedTab || 
                      (selectedTab === 'admins' && ['admin', 'super_admin'].includes(user.role));
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    inactive: mockUsers.filter(u => u.status === 'inactive').length,
    suspended: mockUsers.filter(u => u.status === 'suspended').length,
    admins: mockUsers.filter(u => ['admin', 'super_admin'].includes(u.role)).length,
    totalRevenue: mockUsers.reduce((sum, u) => sum + u.totalRevenue, 0),
    totalInvoices: mockUsers.reduce((sum, u) => sum + u.invoicesCreated, 0)
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleUserAction = (action: string, user: any) => {
    toast({
      title: `User ${action}`,
      description: `${user.name} has been ${action.toLowerCase()}`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${selectedUsers.length} users have been ${action.toLowerCase()}`,
    });
    setSelectedUsers([]);
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 mt-2">Manage platform users, roles, and permissions</p>
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
            <Link href="/super-admin/users/create">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.active} active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Platform Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">Generated by users</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Invoices</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalInvoices.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">Platform wide</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Admin Users</CardTitle>
              <Shield className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.admins}</div>
              <p className="text-xs text-gray-400 mt-1">Privileged access</p>
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
                  placeholder="Search users..."
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
                {selectedUsers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-red-900/50 text-red-400">
                      {selectedUsers.length} selected
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
                          Activate Users
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('Suspended')}>
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend Users
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('Emailed')}>
                          <Send className="mr-2 h-4 w-4" />
                          Send Email
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
                <TabsTrigger value="inactive" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Inactive ({stats.inactive})
                </TabsTrigger>
                <TabsTrigger value="suspended" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Suspended ({stats.suspended})
                </TabsTrigger>
                <TabsTrigger value="admins" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Admins ({stats.admins})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {/* Select All */}
                  <div className="flex items-center space-x-2 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={selectAllUsers}
                      className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-300">
                      Select all {filteredUsers.length} users
                    </span>
                  </div>

                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-4 p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                      />
                      
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-white">{user.name}</h3>
                          <Badge className={`${getStatusColor(user.status)} flex items-center space-x-1`}>
                            {getStatusIcon(user.status)}
                            <span>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                          </Badge>
                          <Badge className={`${getRoleColor(user.role)} flex items-center space-x-1`}>
                            {getRoleIcon(user.role)}
                            <span>{formatRole(user.role)}</span>
                          </Badge>
                          {user.twoFactorEnabled && (
                            <Badge className="bg-green-900/50 text-green-400">
                              <Shield className="mr-1 h-3 w-3" />
                              2FA
                            </Badge>
                          )}
                          {!user.emailVerified && (
                            <Badge className="bg-yellow-900/50 text-yellow-400">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Unverified
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span>{user.businesses.join(', ')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                            <span>{user.subscription}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-gray-500" />
                            <span>
                              {user.lastActive 
                                ? `Active ${new Date(user.lastActive).toLocaleDateString()}`
                                : 'Never logged in'
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        {/* User Stats */}
                        <div className="hidden lg:flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-white">{user.invoicesCreated}</div>
                            <div className="text-xs text-gray-400">Invoices</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-white">${user.totalRevenue.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Revenue</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-white">{user.loginCount}</div>
                            <div className="text-xs text-gray-400">Logins</div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleUserAction('Viewed', user)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUserAction('Edited', user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUserAction('Impersonated', user)}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Impersonate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUserAction('Reset Password', user)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUserAction('Emailed', user)}>
                              <Send className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUserAction('Activity Viewed', user)}>
                              <Activity className="mr-2 h-4 w-4" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem 
                                onClick={() => handleUserAction('Suspended', user)}
                                className="text-red-400"
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : user.status === 'suspended' ? (
                              <DropdownMenuItem 
                                onClick={() => handleUserAction('Activated', user)}
                                className="text-green-400"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('Deleted', user)}
                              className="text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="mx-auto h-12 w-12 text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-white">No users found</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {searchTerm ? 'Try adjusting your search terms.' : 'No users match the current filter.'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* User Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">User Growth</h3>
                  <p className="text-blue-200 mb-4">
                    Platform user registration and engagement trends
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">This Month</span>
                      <span className="font-medium text-white">+234 users</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Active Rate</span>
                      <span className="font-medium text-white">87.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Retention</span>
                      <span className="font-medium text-white">92.1%</span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Security Overview</h3>
                  <p className="text-purple-200 mb-4">
                    Platform security metrics and user compliance
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">2FA Enabled</span>
                      <span className="font-medium text-white">
                        {mockUsers.filter(u => u.twoFactorEnabled).length}/{mockUsers.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Email Verified</span>
                      <span className="font-medium text-white">
                        {mockUsers.filter(u => u.emailVerified).length}/{mockUsers.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Locked Accounts</span>
                      <span className="font-medium text-white">
                        {mockUsers.filter(u => u.accountLocked).length}
                      </span>
                    </div>
                  </div>
                </div>
                <Shield className="h-12 w-12 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}