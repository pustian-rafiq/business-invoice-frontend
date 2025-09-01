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
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Shield,
  Crown,
  Mail,
  Phone,
  Calendar,
  Activity,
  Settings,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Lock,
  Unlock,
  UserPlus,
  Send,
  ArrowLeft,
  Globe,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const adminUsers = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@invoiceai.com',
    phone: '+1 (555) 000-0001',
    role: 'super_admin',
    status: 'active',
    avatar: 'SA',
    joinedDate: '2023-01-01',
    lastActive: '2025-01-15T10:30:00Z',
    permissions: ['all'],
    managedUsers: 12458,
    managedBusinesses: 3247,
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.1',
    loginCount: 5678,
    twoFactorEnabled: true,
    emailVerified: true,
    lastPasswordChange: '2024-12-01',
    createdBy: 'System',
    notes: 'Primary super administrator account'
  },
  {
    id: '2',
    name: 'David Brown',
    email: 'david@invoiceai.com',
    phone: '+1 (555) 000-0002',
    role: 'admin',
    status: 'active',
    avatar: 'DB',
    joinedDate: '2023-06-15',
    lastActive: '2025-01-14T16:45:00Z',
    permissions: ['user_management', 'business_management', 'support'],
    managedUsers: 2456,
    managedBusinesses: 892,
    location: 'New York, NY',
    ipAddress: '192.168.1.2',
    loginCount: 3421,
    twoFactorEnabled: true,
    emailVerified: true,
    lastPasswordChange: '2024-11-15',
    createdBy: 'Super Admin',
    notes: 'Senior administrator for user support'
  },
  {
    id: '3',
    name: 'Lisa Chen',
    email: 'lisa@invoiceai.com',
    phone: '+1 (555) 000-0003',
    role: 'admin',
    status: 'active',
    avatar: 'LC',
    joinedDate: '2024-02-20',
    lastActive: '2025-01-13T09:15:00Z',
    permissions: ['business_management', 'support'],
    managedUsers: 1234,
    managedBusinesses: 567,
    location: 'Austin, TX',
    ipAddress: '192.168.1.3',
    loginCount: 1876,
    twoFactorEnabled: true,
    emailVerified: true,
    lastPasswordChange: '2024-12-20',
    createdBy: 'Super Admin',
    notes: 'Business operations specialist'
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    email: 'michael@invoiceai.com',
    phone: '+1 (555) 000-0004',
    role: 'admin',
    status: 'inactive',
    avatar: 'MR',
    joinedDate: '2024-08-10',
    lastActive: '2024-12-15T14:20:00Z',
    permissions: ['user_management', 'support'],
    managedUsers: 678,
    managedBusinesses: 234,
    location: 'Chicago, IL',
    ipAddress: '192.168.1.4',
    loginCount: 892,
    twoFactorEnabled: false,
    emailVerified: true,
    lastPasswordChange: '2024-08-10',
    createdBy: 'David Brown',
    notes: 'Currently on leave - temporary admin access'
  }
];

const permissions = [
  { id: 'all', name: 'All Permissions', description: 'Complete platform access', icon: Shield },
  { id: 'user_management', name: 'User Management', description: 'Manage platform users', icon: Users },
  { id: 'business_management', name: 'Business Management', description: 'Manage businesses', icon: Building },
  { id: 'support', name: 'Support Access', description: 'Handle support tickets', icon: Settings },
  { id: 'billing', name: 'Billing Management', description: 'Manage subscriptions', icon: Crown },
  { id: 'system_settings', name: 'System Settings', description: 'Platform configuration', icon: Settings }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-900/50 text-green-400';
    case 'inactive':
      return 'bg-gray-700/50 text-gray-400';
    case 'suspended':
      return 'bg-red-900/50 text-red-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'super_admin':
      return 'bg-red-900/50 text-red-400';
    case 'admin':
      return 'bg-orange-900/50 text-orange-400';
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
    default:
      return <Users className="h-3 w-3" />;
  }
};

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredUsers = adminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.permissions.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const stats = {
    total: adminUsers.length,
    superAdmins: adminUsers.filter(u => u.role === 'super_admin').length,
    admins: adminUsers.filter(u => u.role === 'admin').length,
    active: adminUsers.filter(u => u.status === 'active').length,
    inactive: adminUsers.filter(u => u.status === 'inactive').length,
    with2FA: adminUsers.filter(u => u.twoFactorEnabled).length
  };

  const handleUserAction = (action: string, user: any) => {
    toast({
      title: `Admin ${action}`,
      description: `${user.name} has been ${action.toLowerCase()}`,
    });
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/super-admin/users">
              <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Users
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Users</h1>
              <p className="text-gray-400 mt-2">Manage platform administrators and their permissions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Admins
            </Button>
            <Link href="/super-admin/users/create">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Admins</CardTitle>
              <Shield className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.superAdmins} super admins</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Admins</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.active}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.inactive} inactive</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">2FA Enabled</CardTitle>
              <Lock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.with2FA}</div>
              <p className="text-xs text-gray-400 mt-1">Security compliant</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Managed Users</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {adminUsers.reduce((sum, u) => sum + u.managedUsers, 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-400 mt-1">Total oversight</p>
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
                  placeholder="Search admin users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Role
                </Button>
                {selectedUsers.length > 0 && (
                  <Badge variant="secondary" className="bg-red-900/50 text-red-400">
                    {selectedUsers.length} selected
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className={`text-white font-bold ${
                        user.role === 'super_admin' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                          : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                      }`}>
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-white text-lg">{user.name}</h3>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1">
                            {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                          </span>
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                        {user.twoFactorEnabled && (
                          <Badge className="bg-green-900/50 text-green-400">
                            <Lock className="mr-1 h-3 w-3" />
                            2FA
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <span>{user.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-gray-500" />
                          <span>
                            Last active {new Date(user.lastActive).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Permissions */}
                      <div className="mb-4">
                        <h4 className="font-medium text-white mb-2">Permissions</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.permissions.map((permission) => (
                            <Badge key={permission} className="bg-blue-900/50 text-blue-400">
                              {permission === 'all' ? 'All Permissions' : permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Management Stats */}
                      <div className="grid grid-cols-3 gap-4 p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-center">
                          <div className="font-semibold text-white">{user.managedUsers.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Users Managed</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{user.managedBusinesses.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Businesses</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{user.loginCount.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Total Logins</div>
                        </div>
                      </div>

                      {/* Notes */}
                      {user.notes && (
                        <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
                          <p className="text-sm text-blue-200">{user.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="text-right mr-4">
                        <div className="text-sm text-gray-400">Created by</div>
                        <div className="font-medium text-white">{user.createdBy}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(user.joinedDate).toLocaleDateString()}
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
                            Edit Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('Permissions Updated', user)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('Activity Viewed', user)}>
                            <Activity className="mr-2 h-4 w-4" />
                            View Activity Log
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUserAction('Password Reset', user)}>
                            <Settings className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('Contacted', user)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('Deactivated', user)}
                              className="text-orange-400"
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              Deactivate Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('Activated', user)}
                              className="text-green-400"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate Admin
                            </DropdownMenuItem>
                          )}
                          {user.role !== 'super_admin' && (
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('Removed', user)}
                              className="text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Admin
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Shield className="mx-auto h-12 w-12 text-gray-500" />
                  <h3 className="mt-2 text-sm font-medium text-white">No admin users found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {searchTerm ? 'Try adjusting your search terms.' : 'No admin users match the current criteria.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Admin Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Admin Activity</h3>
                  <p className="text-red-200 mb-4">
                    Administrative actions and platform management
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Users Managed</span>
                      <span className="font-medium text-white">
                        {adminUsers.reduce((sum, u) => sum + u.managedUsers, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Businesses Overseen</span>
                      <span className="font-medium text-white">
                        {adminUsers.reduce((sum, u) => sum + u.managedBusinesses, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Total Logins</span>
                      <span className="font-medium text-white">
                        {adminUsers.reduce((sum, u) => sum + u.loginCount, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Shield className="h-12 w-12 text-red-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Security Compliance</h3>
                  <p className="text-blue-200 mb-4">
                    Admin security status and compliance metrics
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">2FA Adoption</span>
                      <span className="font-medium text-white">
                        {Math.round((stats.with2FA / stats.total) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Email Verified</span>
                      <span className="font-medium text-white">100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Active Admins</span>
                      <span className="font-medium text-white">
                        {Math.round((stats.active / stats.total) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                <Lock className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permission Overview */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Permission Overview</CardTitle>
            <CardDescription className="text-gray-400">Available administrative permissions and their descriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permissions.map((permission) => (
                <div key={permission.id} className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="flex items-center space-x-3 mb-2">
                    <permission.icon className="h-5 w-5 text-blue-400" />
                    <h4 className="font-medium text-white">{permission.name}</h4>
                  </div>
                  <p className="text-sm text-gray-400">{permission.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      Used by {adminUsers.filter(u => u.permissions.includes(permission.id) || u.permissions.includes('all')).length} admins
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}