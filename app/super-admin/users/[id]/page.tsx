'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Building,
  Calendar,
  Shield,
  Activity,
  Ban,
  UserCheck,
  Send,
  RefreshCw,
  Eye,
  Download,
  CreditCard,
  Users,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Crown,
  Globe,
  Lock,
  Unlock,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// Mock user data - in real app this would come from API
const userData = {
  id: '1',
  name: 'John Doe',
  email: 'john@acme.com',
  phone: '+1 (555) 123-4567',
  role: 'business_owner',
  status: 'active',
  avatar: 'JD',
  joinedDate: '2024-01-15',
  lastActive: '2025-01-15T10:30:00Z',
  lastLogin: '2025-01-15T10:30:00Z',
  businesses: [
    { id: '1', name: 'Acme Corporation', role: 'Owner', status: 'active' },
    { id: '2', name: 'Acme Consulting', role: 'Manager', status: 'active' }
  ],
  subscription: {
    plan: 'Team Plan',
    status: 'active',
    billingCycle: 'monthly',
    nextBilling: '2025-02-15',
    amount: 79.00
  },
  location: {
    country: 'United States',
    city: 'New York',
    timezone: 'America/New_York',
    ipAddress: '192.168.1.100'
  },
  security: {
    emailVerified: true,
    twoFactorEnabled: true,
    accountLocked: false,
    loginAttempts: 0,
    lastPasswordChange: '2024-12-01'
  },
  stats: {
    totalRevenue: 125000,
    invoicesCreated: 245,
    clientsManaged: 89,
    loginCount: 1247,
    averageSessionTime: '45 minutes'
  },
  recentActivity: [
    {
      id: 1,
      type: 'login',
      description: 'Logged in from New York, NY',
      timestamp: '2025-01-15T10:30:00Z',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      type: 'invoice',
      description: 'Created invoice INV-001234',
      timestamp: '2025-01-15T09:15:00Z',
      details: 'Amount: $2,500'
    },
    {
      id: 3,
      type: 'payment',
      description: 'Received payment for INV-001233',
      timestamp: '2025-01-14T16:45:00Z',
      details: 'Amount: $1,800'
    },
    {
      id: 4,
      type: 'settings',
      description: 'Updated business profile',
      timestamp: '2025-01-14T14:20:00Z'
    },
    {
      id: 5,
      type: 'team',
      description: 'Invited new team member',
      timestamp: '2025-01-13T11:30:00Z',
      details: 'jane@acme.com'
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-900/50 text-green-400';
    case 'inactive':
      return 'bg-gray-700/50 text-gray-400';
    case 'suspended':
      return 'bg-red-900/50 text-red-400';
    case 'pending':
      return 'bg-yellow-900/50 text-yellow-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'login':
      return <Shield className="h-4 w-4 text-blue-400" />;
    case 'invoice':
      return <FileText className="h-4 w-4 text-green-400" />;
    case 'payment':
      return <CreditCard className="h-4 w-4 text-purple-400" />;
    case 'settings':
      return <Settings className="h-4 w-4 text-orange-400" />;
    case 'team':
      return <Users className="h-4 w-4 text-indigo-400" />;
    default:
      return <Activity className="h-4 w-4 text-gray-400" />;
  }
};

export default function UserDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const handleUserAction = (action: string) => {
    toast({
      title: `User ${action}`,
      description: `${userData.name} has been ${action.toLowerCase()}`,
    });
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
                Back to Users
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-bold">
                  {userData.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
                <p className="text-gray-400">{userData.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getStatusColor(userData.status)}>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
                  </Badge>
                  <Badge className="bg-purple-900/50 text-purple-400">
                    <Crown className="mr-1 h-3 w-3" />
                    Business Owner
                  </Badge>
                  {userData.security.twoFactorEnabled && (
                    <Badge className="bg-green-900/50 text-green-400">
                      <Shield className="mr-1 h-3 w-3" />
                      2FA
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <UserCheck className="mr-2 h-4 w-4" />
              Impersonate
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{userData.stats.invoicesCreated}</div>
                  <div className="text-sm text-gray-400">Invoices Created</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">${userData.stats.totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{userData.stats.clientsManaged}</div>
                  <div className="text-sm text-gray-400">Clients Managed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{userData.stats.loginCount}</div>
                  <div className="text-sm text-gray-400">Total Logins</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="businesses" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Businesses</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Activity</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Security</TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Subscription</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{userData.email}</div>
                            <div className="text-sm text-gray-400">Email Address</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{userData.phone}</div>
                            <div className="text-sm text-gray-400">Phone Number</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{userData.location.country}</div>
                            <div className="text-sm text-gray-400">Country</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">
                              {new Date(userData.joinedDate).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-400">Member Since</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Activity className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">
                              {new Date(userData.lastActive).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-400">Last Active</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{userData.location.ipAddress}</div>
                            <div className="text-sm text-gray-400">Last IP Address</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-400">Latest user actions and events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                          <div className="p-2 bg-gray-700/50 rounded-lg">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-white">{activity.description}</p>
                              <span className="text-sm text-gray-400">
                                {new Date(activity.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {activity.details && (
                              <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
                            )}
                            {activity.ipAddress && (
                              <p className="text-xs text-gray-500 mt-1">IP: {activity.ipAddress}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => handleUserAction('Impersonated')}
                      className="w-full justify-start bg-blue-900/50 hover:bg-blue-900/70 text-blue-300"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Impersonate User
                    </Button>
                    <Button 
                      onClick={() => handleUserAction('Password Reset')}
                      variant="outline" 
                      className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset Password
                    </Button>
                    <Button 
                      onClick={() => handleUserAction('Emailed')}
                      variant="outline" 
                      className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                    <Button 
                      onClick={() => handleUserAction('Data Exported')}
                      variant="outline" 
                      className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                  </CardContent>
                </Card>

                {/* Security Status */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Shield className="h-5 w-5 text-red-400" />
                      <span>Security Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Email Verified</span>
                      {userData.security.emailVerified ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Two-Factor Auth</span>
                      {userData.security.twoFactorEnabled ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Account Status</span>
                      {userData.security.accountLocked ? (
                        <Lock className="h-5 w-5 text-red-400" />
                      ) : (
                        <Unlock className="h-5 w-5 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Failed Logins</span>
                      <span className="text-white">{userData.security.loginAttempts}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Info */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <CreditCard className="h-5 w-5 text-green-400" />
                      <span>Subscription</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Plan</span>
                      <span className="text-white">{userData.subscription.plan}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Status</span>
                      <Badge className="bg-green-900/50 text-green-400">
                        {userData.subscription.status.charAt(0).toUpperCase() + userData.subscription.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Next Billing</span>
                      <span className="text-white">{new Date(userData.subscription.nextBilling).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Amount</span>
                      <span className="text-white">${userData.subscription.amount}/month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Businesses Tab */}
          <TabsContent value="businesses" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Associated Businesses</CardTitle>
                <CardDescription className="text-gray-400">Businesses this user owns or has access to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.businesses.map((business) => (
                    <div key={business.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {business.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{business.name}</div>
                          <div className="text-sm text-gray-400">Role: {business.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(business.status)}>
                          {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Activity Timeline</CardTitle>
                <CardDescription className="text-gray-400">Complete user activity history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-700/50 rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-white">{activity.description}</p>
                          <span className="text-sm text-gray-400">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                        {activity.details && (
                          <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
                        )}
                        {activity.ipAddress && (
                          <p className="text-xs text-gray-500 mt-1">IP: {activity.ipAddress}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Email Verification</h4>
                      <p className="text-sm text-gray-400">Email address verification status</p>
                    </div>
                    {userData.security.emailVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Button size="sm" onClick={() => handleUserAction('Email Verification Sent')}>
                        Send Verification
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Additional security layer</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant={userData.security.twoFactorEnabled ? "destructive" : "default"}
                      onClick={() => handleUserAction(userData.security.twoFactorEnabled ? 'Disabled 2FA' : 'Enabled 2FA')}
                    >
                      {userData.security.twoFactorEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Account Lock</h4>
                      <p className="text-sm text-gray-400">Prevent user from logging in</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant={userData.security.accountLocked ? "default" : "destructive"}
                      onClick={() => handleUserAction(userData.security.accountLocked ? 'Unlocked' : 'Locked')}
                    >
                      {userData.security.accountLocked ? 'Unlock' : 'Lock'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Login Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Last Login</h4>
                    <p className="text-sm text-gray-400">{new Date(userData.lastLogin).toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Total Logins</h4>
                    <p className="text-sm text-gray-400">{userData.stats.loginCount} times</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Average Session</h4>
                    <p className="text-sm text-gray-400">{userData.stats.averageSessionTime}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Failed Attempts</h4>
                    <p className="text-sm text-gray-400">{userData.security.loginAttempts} recent</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Subscription Details</CardTitle>
                <CardDescription className="text-gray-400">Billing and subscription management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Current Plan</h4>
                      <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                        <div className="font-medium text-white">{userData.subscription.plan}</div>
                        <div className="text-sm text-gray-400">${userData.subscription.amount}/month</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">Billing Cycle</h4>
                      <p className="text-sm text-gray-400 capitalize">{userData.subscription.billingCycle}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Next Billing Date</h4>
                      <p className="text-sm text-gray-400">{new Date(userData.subscription.nextBilling).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">Status</h4>
                      <Badge className="bg-green-900/50 text-green-400">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {userData.subscription.status.charAt(0).toUpperCase() + userData.subscription.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
}