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
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar,
  Shield,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  Crown,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity,
  FileText,
  DollarSign,
  Send,
  Copy,
  Ban,
  UserCheck,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const teamMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@acme.com',
    phone: '+1 (555) 123-4567',
    role: 'Owner',
    permissions: ['all'],
    status: 'active',
    avatar: 'JD',
    joinedDate: '2024-01-15',
    lastActive: '2025-01-15T10:30:00Z',
    invitedBy: 'System',
    department: 'Management',
    stats: {
      invoicesCreated: 45,
      clientsManaged: 23,
      totalRevenue: 125000
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@acme.com',
    phone: '+1 (555) 987-6543',
    role: 'Manager',
    permissions: ['invoices', 'clients', 'reports'],
    status: 'active',
    avatar: 'JS',
    joinedDate: '2024-02-20',
    lastActive: '2025-01-15T09:15:00Z',
    invitedBy: 'John Doe',
    department: 'Sales',
    stats: {
      invoicesCreated: 67,
      clientsManaged: 34,
      totalRevenue: 89000
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@acme.com',
    phone: '+1 (555) 456-7890',
    role: 'Accountant',
    permissions: ['invoices', 'payments', 'reports'],
    status: 'active',
    avatar: 'MJ',
    joinedDate: '2024-03-10',
    lastActive: '2025-01-14T16:45:00Z',
    invitedBy: 'John Doe',
    department: 'Finance',
    stats: {
      invoicesCreated: 123,
      clientsManaged: 12,
      totalRevenue: 156000
    }
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@acme.com',
    phone: '+1 (555) 321-0987',
    role: 'User',
    permissions: ['invoices'],
    status: 'pending',
    avatar: 'SW',
    joinedDate: '2025-01-10',
    lastActive: null,
    invitedBy: 'Jane Smith',
    department: 'Sales',
    stats: {
      invoicesCreated: 0,
      clientsManaged: 0,
      totalRevenue: 0
    }
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@acme.com',
    phone: '+1 (555) 654-3210',
    role: 'User',
    permissions: ['clients'],
    status: 'suspended',
    avatar: 'DB',
    joinedDate: '2024-11-05',
    lastActive: '2024-12-20T14:20:00Z',
    invitedBy: 'John Doe',
    department: 'Support',
    stats: {
      invoicesCreated: 12,
      clientsManaged: 8,
      totalRevenue: 15000
    }
  }
];

const pendingInvitations = [
  {
    id: '1',
    email: 'alex@example.com',
    role: 'Manager',
    invitedBy: 'John Doe',
    invitedDate: '2025-01-12',
    expiresDate: '2025-01-19'
  },
  {
    id: '2',
    email: 'lisa@example.com',
    role: 'User',
    invitedBy: 'Jane Smith',
    invitedDate: '2025-01-14',
    expiresDate: '2025-01-21'
  }
];

const roles = [
  {
    name: 'Owner',
    description: 'Full access to all features and settings',
    permissions: ['all'],
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    name: 'Manager',
    description: 'Can manage invoices, clients, and view reports',
    permissions: ['invoices', 'clients', 'reports', 'team'],
    color: 'bg-purple-100 text-purple-700'
  },
  {
    name: 'Accountant',
    description: 'Can manage invoices, payments, and financial reports',
    permissions: ['invoices', 'payments', 'reports'],
    color: 'bg-green-100 text-green-700'
  },
  {
    name: 'User',
    description: 'Basic access to assigned features',
    permissions: ['invoices'],
    color: 'bg-blue-100 text-blue-700'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
    case 'suspended':
      return 'bg-red-100 text-red-700 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4" />;
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'suspended':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getRoleColor = (role: string) => {
  const roleConfig = roles.find(r => r.name === role);
  return roleConfig?.color || 'bg-gray-100 text-gray-700';
};

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('members');

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    pending: teamMembers.filter(m => m.status === 'pending').length + pendingInvitations.length,
    suspended: teamMembers.filter(m => m.status === 'suspended').length,
    totalInvitations: pendingInvitations.length
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-2">Manage your team members, roles, and permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Settings className="mr-2 h-4 w-4" />
              Role Settings
            </Button>
            <Link href="/dashboard/team/invite">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">{stats.active} active</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Members</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
              <p className="text-xs text-gray-500 mt-1">Working members</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Invitations</CardTitle>
              <Send className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalInvitations}</div>
              <p className="text-xs text-gray-500 mt-1">Sent invites</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Tabs */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search team members..."
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
                <TabsTrigger value="members">Team Members ({stats.total})</TabsTrigger>
                <TabsTrigger value="invitations">Invitations ({stats.totalInvitations})</TabsTrigger>
                <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              </TabsList>

              {/* Team Members Tab */}
              <TabsContent value="members" className="mt-6">
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-6 bg-white/60 rounded-lg border border-white/20 hover:bg-white/80 transition-all duration-200">
                      <div className="flex items-center space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            {member.role === 'Owner' && (
                              <Badge className="bg-yellow-100 text-yellow-700">
                                <Crown className="mr-1 h-3 w-3" />
                                Owner
                              </Badge>
                            )}
                            <Badge className={getStatusColor(member.status)}>
                              {getStatusIcon(member.status)}
                              <span className="ml-1">{member.status.charAt(0).toUpperCase() + member.status.slice(1)}</span>
                            </Badge>
                            <Badge className={getRoleColor(member.role)}>
                              {member.role}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{member.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4 text-gray-400" />
                              <span>
                                {member.lastActive 
                                  ? `Active ${new Date(member.lastActive).toLocaleDateString()}`
                                  : 'Never logged in'
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        {/* Member Stats */}
                        <div className="hidden lg:flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{member.stats.invoicesCreated}</div>
                            <div className="text-xs text-gray-500">Invoices</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{member.stats.clientsManaged}</div>
                            <div className="text-xs text-gray-500">Clients</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">${member.stats.totalRevenue.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Revenue</div>
                          </div>
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
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {member.status === 'active' ? (
                              <DropdownMenuItem className="text-orange-600">
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend Member
                              </DropdownMenuItem>
                            ) : member.status === 'suspended' ? (
                              <DropdownMenuItem className="text-green-600">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Reactivate Member
                              </DropdownMenuItem>
                            ) : null}
                            {member.role !== 'Owner' && (
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Member
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}

                  {filteredMembers.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No team members found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Try adjusting your search terms.' : 'Invite your first team member to get started.'}
                      </p>
                      {!searchTerm && (
                        <div className="mt-6">
                          <Link href="/dashboard/team/invite">
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Invite Member
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Invitations Tab */}
              <TabsContent value="invitations" className="mt-6">
                <div className="space-y-4">
                  {pendingInvitations.map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between p-6 bg-white/60 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gray-200 text-gray-600">
                            <Mail className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{invitation.email}</h3>
                            <Badge className="bg-yellow-100 text-yellow-700">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                            <Badge className={getRoleColor(invitation.role)}>
                              {invitation.role}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Invited by {invitation.invitedBy}</span>
                            <span>•</span>
                            <span>Sent {new Date(invitation.invitedDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>Expires {new Date(invitation.expiresDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                          <Send className="mr-2 h-4 w-4" />
                          Resend
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Invitation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}

                  {pendingInvitations.length === 0 && (
                    <div className="text-center py-12">
                      <Send className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No pending invitations</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        All invitations have been accepted or expired.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Roles Tab */}
              <TabsContent value="roles" className="mt-6">
                <div className="grid gap-6">
                  {roles.map((role) => (
                    <Card key={role.name} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                              <Shield className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                                <Badge className={role.color}>
                                  {teamMembers.filter(m => m.role === role.name).length} members
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-3">{role.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {role.permissions.map((permission) => (
                                  <Badge key={permission} variant="outline" className="text-xs">
                                    {permission === 'all' ? 'All Permissions' : permission.charAt(0).toUpperCase() + permission.slice(1)}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Team Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Team Performance</h3>
                  <p className="text-blue-100 mb-4">
                    Your team has created {teamMembers.reduce((sum, m) => sum + m.stats.invoicesCreated, 0)} invoices
                    and generated ${teamMembers.reduce((sum, m) => sum + m.stats.totalRevenue, 0).toLocaleString()} in revenue
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Total Invoices</span>
                      <span className="font-medium">{teamMembers.reduce((sum, m) => sum + m.stats.invoicesCreated, 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Clients Managed</span>
                      <span className="font-medium">{teamMembers.reduce((sum, m) => sum + m.stats.clientsManaged, 0)}</span>
                    </div>
                  </div>
                </div>
                <Activity className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Collaboration Tools</h3>
                  <p className="text-green-100 mb-4">
                    Enhance team productivity with advanced collaboration features
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-green-200" />
                      <span className="text-green-100">Real-time notifications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-green-200" />
                      <span className="text-green-100">Shared invoice templates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-200" />
                      <span className="text-green-100">Team chat integration</span>
                    </div>
                  </div>
                </div>
                <Users className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}