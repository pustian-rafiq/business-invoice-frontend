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
  Search, 
  Filter, 
  Download,
  Eye, 
  Edit, 
  MoreHorizontal,
  Users,
  Ban,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Building,
  AlertTriangle,
  Clock,
  Activity,
  RefreshCw,
  Send,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const suspendedUsers = [
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@startupxyz.com',
    phone: '+1 (555) 321-0987',
    role: 'business_owner',
    avatar: 'SW',
    suspendedDate: '2024-12-20',
    suspendedBy: 'Super Admin',
    reason: 'Multiple payment failures and policy violations',
    businesses: ['StartupXYZ'],
    subscription: 'Free Trial',
    totalRevenue: 8500,
    invoicesCreated: 23,
    location: 'Seattle, WA',
    lastActive: '2024-12-20T14:20:00Z',
    suspensionType: 'temporary',
    autoReactivate: '2025-01-20',
    violations: [
      { type: 'payment_failure', count: 3, lastOccurrence: '2024-12-15' },
      { type: 'spam_reports', count: 2, lastOccurrence: '2024-12-18' },
      { type: 'terms_violation', count: 1, lastOccurrence: '2024-12-20' }
    ]
  },
  {
    id: '7',
    name: 'Robert Martinez',
    email: 'robert@fraudcorp.com',
    phone: '+1 (555) 999-8888',
    role: 'business_owner',
    avatar: 'RM',
    suspendedDate: '2024-11-30',
    suspendedBy: 'Admin Team',
    reason: 'Fraudulent activity detected',
    businesses: ['Fraud Corp'],
    subscription: 'Team Plan',
    totalRevenue: 0,
    invoicesCreated: 156,
    location: 'Unknown',
    lastActive: '2024-11-30T09:15:00Z',
    suspensionType: 'permanent',
    autoReactivate: null,
    violations: [
      { type: 'fraud_detection', count: 5, lastOccurrence: '2024-11-30' },
      { type: 'fake_invoices', count: 12, lastOccurrence: '2024-11-29' },
      { type: 'chargeback', count: 8, lastOccurrence: '2024-11-28' }
    ]
  },
  {
    id: '8',
    name: 'Emily Davis',
    email: 'emily@inactivecompany.com',
    phone: '+1 (555) 777-6666',
    role: 'team_member',
    avatar: 'ED',
    suspendedDate: '2024-10-15',
    suspendedBy: 'System Auto',
    reason: 'Extended inactivity (90+ days)',
    businesses: ['Inactive Company'],
    subscription: 'Personal Plan',
    totalRevenue: 12000,
    invoicesCreated: 45,
    location: 'Portland, OR',
    lastActive: '2024-07-15T16:30:00Z',
    suspensionType: 'temporary',
    autoReactivate: null,
    violations: [
      { type: 'inactivity', count: 1, lastOccurrence: '2024-10-15' }
    ]
  }
];

const getViolationColor = (type: string) => {
  switch (type) {
    case 'fraud_detection':
    case 'fake_invoices':
    case 'chargeback':
      return 'bg-red-900/50 text-red-400';
    case 'payment_failure':
      return 'bg-orange-900/50 text-orange-400';
    case 'spam_reports':
    case 'terms_violation':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'inactivity':
      return 'bg-gray-700/50 text-gray-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getSuspensionTypeColor = (type: string) => {
  switch (type) {
    case 'permanent':
      return 'bg-red-900/50 text-red-400';
    case 'temporary':
      return 'bg-yellow-900/50 text-yellow-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

export default function SuspendedUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredUsers = suspendedUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: suspendedUsers.length,
    temporary: suspendedUsers.filter(u => u.suspensionType === 'temporary').length,
    permanent: suspendedUsers.filter(u => u.suspensionType === 'permanent').length,
    autoReactivate: suspendedUsers.filter(u => u.autoReactivate).length
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
              <h1 className="text-3xl font-bold text-white">Suspended Users</h1>
              <p className="text-gray-400 mt-2">Manage suspended accounts and review violations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            {selectedUsers.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    Bulk Actions ({selectedUsers.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleBulkAction('Reactivated')}>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Reactivate Users
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('Extended Suspension')}>
                    <Clock className="mr-2 h-4 w-4" />
                    Extend Suspension
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('Emailed')}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Notification
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction('Permanently Banned')} className="text-red-400">
                    <Ban className="mr-2 h-4 w-4" />
                    Permanent Ban
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
              <CardTitle className="text-sm font-medium text-gray-300">Total Suspended</CardTitle>
              <Ban className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">Accounts suspended</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Temporary</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.temporary}</div>
              <p className="text-xs text-gray-400 mt-1">Can be reactivated</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Permanent</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.permanent}</div>
              <p className="text-xs text-gray-400 mt-1">Permanently banned</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Auto Reactivate</CardTitle>
              <RefreshCw className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.autoReactivate}</div>
              <p className="text-xs text-gray-400 mt-1">Scheduled</p>
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
                  placeholder="Search suspended users..."
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
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={() => {
                    if (selectedUsers.length === filteredUsers.length) {
                      setSelectedUsers([]);
                    } else {
                      setSelectedUsers(filteredUsers.map(u => u.id));
                    }
                  }}
                  className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-gray-300">
                  Select all {filteredUsers.length} suspended users
                </span>
              </div>

              {filteredUsers.map((user) => (
                <div key={user.id} className="p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="mt-2 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                    />
                    
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-white">{user.name}</h3>
                        <Badge className={getSuspensionTypeColor(user.suspensionType)}>
                          <Ban className="mr-1 h-3 w-3" />
                          {user.suspensionType.charAt(0).toUpperCase() + user.suspensionType.slice(1)}
                        </Badge>
                        {user.autoReactivate && (
                          <Badge className="bg-blue-900/50 text-blue-400">
                            <RefreshCw className="mr-1 h-3 w-3" />
                            Auto-reactivate {new Date(user.autoReactivate).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span>{user.businesses.join(', ')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Suspended {new Date(user.suspendedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>By {user.suspendedBy}</span>
                        </div>
                      </div>

                      {/* Suspension Reason */}
                      <div className="p-3 bg-red-900/20 rounded-lg border border-red-700/30 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="font-medium text-red-300">Suspension Reason</span>
                        </div>
                        <p className="text-sm text-red-200">{user.reason}</p>
                      </div>

                      {/* Violations */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Violations</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.violations.map((violation, index) => (
                            <Badge key={index} className={getViolationColor(violation.type)}>
                              {violation.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} ({violation.count})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="text-right mr-4">
                        <div className="text-lg font-bold text-white">${user.totalRevenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">{user.invoicesCreated} invoices</div>
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
                          <DropdownMenuItem onClick={() => handleUserAction('Activity Viewed', user)}>
                            <Activity className="mr-2 h-4 w-4" />
                            View Activity Log
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUserAction('Contacted', user)}>
                            <Send className="mr-2 h-4 w-4" />
                            Contact User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction('Reactivated', user)}
                            className="text-green-400"
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Reactivate Account
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleUserAction('Permanently Banned', user)}
                            className="text-red-400"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Permanent Ban
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction('Deleted', user)}
                            className="text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Ban className="mx-auto h-12 w-12 text-gray-500" />
                  <h3 className="mt-2 text-sm font-medium text-white">No suspended users found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {searchTerm ? 'Try adjusting your search terms.' : 'No users are currently suspended.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Suspension Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Suspension Reasons</h3>
                  <p className="text-red-200 mb-4">
                    Most common reasons for account suspension
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Payment Failures</span>
                      <span className="font-medium text-white">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Policy Violations</span>
                      <span className="font-medium text-white">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Fraud Detection</span>
                      <span className="font-medium text-white">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Inactivity</span>
                      <span className="font-medium text-white">10%</span>
                    </div>
                  </div>
                </div>
                <AlertTriangle className="h-12 w-12 text-red-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Reactivation Stats</h3>
                  <p className="text-blue-200 mb-4">
                    Account reactivation and recovery metrics
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Successful Appeals</span>
                      <span className="font-medium text-white">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Auto Reactivations</span>
                      <span className="font-medium text-white">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Manual Reviews</span>
                      <span className="font-medium text-white">67%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Avg Review Time</span>
                      <span className="font-medium text-white">2.3 days</span>
                    </div>
                  </div>
                </div>
                <UserCheck className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}