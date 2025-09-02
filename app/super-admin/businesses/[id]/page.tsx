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
  Globe,
  Users,
  FileText,
  DollarSign,
  CreditCard,
  Activity,
  Settings,
  Crown,
  Shield,
  Ban,
  UserCheck,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Download,
  Send,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// Mock business data - in real app this would come from API
const businessData = {
  id: '1',
  name: 'Acme Corporation',
  description: 'Technology solutions and consulting services for enterprise clients',
  industry: 'Technology',
  businessType: 'Corporation',
  logo: 'AC',
  status: 'active',
  plan: 'Team',
  website: 'https://acme.com',
  email: 'contact@acme.com',
  phone: '+1 (555) 123-4567',
  address: '123 Business St, New York, NY 10001',
  taxId: 'TAX123456789',
  registrationNumber: 'REG123456789',
  currency: 'USD',
  timezone: 'America/New_York',
  createdAt: '2024-01-15',
  lastActivity: '2025-01-15T10:30:00Z',
  
  owner: {
    id: '1',
    name: 'John Doe',
    email: 'john@acme.com',
    phone: '+1 (555) 123-4567',
    avatar: 'JD',
    role: 'business_owner',
    status: 'active',
    joinedDate: '2024-01-15',
    lastActive: '2025-01-15T10:30:00Z',
    twoFactorEnabled: true,
    emailVerified: true
  },
  
  subscription: {
    plan: 'Team',
    status: 'active',
    amount: 79.00,
    billingCycle: 'monthly',
    nextBilling: '2025-02-15',
    startDate: '2024-01-15',
    trialEnds: null,
    paymentMethod: 'Credit Card',
    lastPayment: '2025-01-15',
    totalPaid: 948.00
  },
  
  usage: {
    invoices: { used: 245, limit: 'unlimited', percentage: 0 },
    clients: { used: 89, limit: 500, percentage: 17.8 },
    teamMembers: { used: 12, limit: 15, percentage: 80 },
    storage: { used: 2.1, limit: 10, percentage: 21 },
    apiCalls: { used: 15420, limit: 50000, percentage: 30.8 }
  },
  
  stats: {
    totalRevenue: 125000,
    totalInvoices: 245,
    totalClients: 89,
    totalMembers: 12,
    averageInvoiceValue: 510.20,
    paymentSuccessRate: 94.5,
    clientRetentionRate: 87.6
  },
  
  compliance: {
    taxCompliant: true,
    gdprCompliant: true,
    dataRetention: 'compliant',
    lastAudit: '2024-12-01',
    certifications: ['SOC2', 'GDPR', 'PCI DSS']
  },
  
  teamMembers: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@acme.com',
      role: 'Owner',
      status: 'active',
      avatar: 'JD',
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@acme.com',
      role: 'Manager',
      status: 'active',
      avatar: 'JS',
      joinedDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@acme.com',
      role: 'Accountant',
      status: 'active',
      avatar: 'MJ',
      joinedDate: '2024-03-10'
    }
  ],
  
  recentActivity: [
    {
      id: 1,
      type: 'invoice_created',
      description: 'Invoice INV-001234 created',
      user: 'John Doe',
      timestamp: '2025-01-15T10:30:00Z',
      amount: 2500
    },
    {
      id: 2,
      type: 'payment_received',
      description: 'Payment received for INV-001233',
      user: 'System',
      timestamp: '2025-01-14T16:45:00Z',
      amount: 1800
    },
    {
      id: 3,
      type: 'team_member_added',
      description: 'New team member invited',
      user: 'John Doe',
      timestamp: '2025-01-13T09:15:00Z'
    },
    {
      id: 4,
      type: 'settings_updated',
      description: 'Business settings updated',
      user: 'Jane Smith',
      timestamp: '2025-01-12T14:20:00Z'
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-900/50 text-green-400';
    case 'trial':
      return 'bg-blue-900/50 text-blue-400';
    case 'suspended':
      return 'bg-red-900/50 text-red-400';
    case 'inactive':
      return 'bg-gray-700/50 text-gray-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
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

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'invoice_created':
      return <FileText className="h-4 w-4 text-green-400" />;
    case 'payment_received':
      return <DollarSign className="h-4 w-4 text-blue-400" />;
    case 'team_member_added':
      return <Users className="h-4 w-4 text-purple-400" />;
    case 'settings_updated':
      return <Settings className="h-4 w-4 text-orange-400" />;
    default:
      return <Activity className="h-4 w-4 text-gray-400" />;
  }
};

const getUsageColor = (percentage: number) => {
  if (percentage >= 90) return 'text-red-400';
  if (percentage >= 70) return 'text-yellow-400';
  return 'text-green-400';
};

export default function BusinessDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const handleBusinessAction = (action: string) => {
    toast({
      title: `Business ${action}`,
      description: `${businessData.name} has been ${action.toLowerCase()}`,
    });
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
                Back to Businesses
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-bold">
                  {businessData.logo}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-white">{businessData.name}</h1>
                <p className="text-gray-400">{businessData.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getStatusColor(businessData.status)}>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {businessData.status.charAt(0).toUpperCase() + businessData.status.slice(1)}
                  </Badge>
                  <Badge className={getPlanColor(businessData.plan)}>
                    <Crown className="mr-1 h-3 w-3" />
                    {businessData.plan}
                  </Badge>
                  <Badge className="bg-blue-900/50 text-blue-400">
                    <Building className="mr-1 h-3 w-3" />
                    {businessData.industry}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <UserCheck className="mr-2 h-4 w-4" />
              Impersonate Owner
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Edit className="mr-2 h-4 w-4" />
              Edit Business
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">${businessData.stats.totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{businessData.stats.totalInvoices}</div>
                  <div className="text-sm text-gray-400">Total Invoices</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{businessData.stats.totalClients}</div>
                  <div className="text-sm text-gray-400">Total Clients</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{businessData.stats.paymentSuccessRate}%</div>
                  <div className="text-sm text-gray-400">Payment Success</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-gray-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Subscription</TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Team</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Activity</TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Compliance</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Business Information */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Business Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Building className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{businessData.industry}</div>
                            <div className="text-sm text-gray-400">Industry</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{businessData.email}</div>
                            <div className="text-sm text-gray-400">Email Address</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{businessData.phone}</div>
                            <div className="text-sm text-gray-400">Phone Number</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <div className="font-medium text-white">{businessData.address}</div>
                            <div className="text-sm text-gray-400">Address</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{businessData.website}</div>
                            <div className="text-sm text-gray-400">Website</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">
                              {new Date(businessData.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-400">Created Date</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Statistics */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Usage Statistics</CardTitle>
                    <CardDescription className="text-gray-400">Current plan usage and limits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(businessData.usage).map(([key, usage]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                          <div>
                            <div className="font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                            <div className="text-sm text-gray-400">
                              {usage.used} {usage.limit === 'unlimited' ? '' : `/ ${usage.limit}`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${getUsageColor(usage.percentage || 0)}`}>
                              {usage.limit === 'unlimited' ? 'Unlimited' : `${usage.percentage?.toFixed(1)}%`}
                            </div>
                            {usage.limit !== 'unlimited' && (
                              <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full ${
                                    (usage.percentage || 0) >= 90 ? 'bg-red-500' :
                                    (usage.percentage || 0) >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(usage.percentage || 0, 100)}%` }}
                                />
                              </div>
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
                {/* Owner Information */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Crown className="h-5 w-5 text-yellow-400" />
                      <span>Business Owner</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold">
                          {businessData.owner.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{businessData.owner.name}</div>
                        <div className="text-sm text-gray-400">{businessData.owner.email}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(businessData.owner.status)}>
                            {businessData.owner.status.charAt(0).toUpperCase() + businessData.owner.status.slice(1)}
                          </Badge>
                          {businessData.owner.twoFactorEnabled && (
                            <Badge className="bg-green-900/50 text-green-400">
                              <Shield className="mr-1 h-3 w-3" />
                              2FA
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Joined:</span>
                        <span className="text-white">{new Date(businessData.owner.joinedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Active:</span>
                        <span className="text-white">{new Date(businessData.owner.lastActive).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => handleBusinessAction('Impersonated')}
                      className="w-full justify-start bg-blue-900/50 hover:bg-blue-900/70 text-blue-300"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Impersonate Owner
                    </Button>
                    <Button 
                      onClick={() => handleBusinessAction('Plan Changed')}
                      variant="outline" 
                      className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                    >
                      <Crown className="mr-2 h-4 w-4" />
                      Change Plan
                    </Button>
                    <Button 
                      onClick={() => handleBusinessAction('Data Exported')}
                      variant="outline" 
                      className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    <Button 
                      onClick={() => handleBusinessAction('Suspended')}
                      variant="outline" 
                      className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-red-400 hover:text-red-300"
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      Suspend Business
                    </Button>
                  </CardContent>
                </Card>

                {/* Subscription Summary */}
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <CreditCard className="h-5 w-5 text-green-400" />
                      <span>Subscription</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Plan:</span>
                      <span className="font-medium text-white">{businessData.subscription.plan}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <Badge className={getStatusColor(businessData.subscription.status)}>
                        {businessData.subscription.status.charAt(0).toUpperCase() + businessData.subscription.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Amount:</span>
                      <span className="font-medium text-white">${businessData.subscription.amount}/month</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Next Billing:</span>
                      <span className="text-white">{new Date(businessData.subscription.nextBilling).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Subscription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Plan:</span>
                      <span className="font-medium text-white">{businessData.subscription.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <Badge className={getStatusColor(businessData.subscription.status)}>
                        {businessData.subscription.status.charAt(0).toUpperCase() + businessData.subscription.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Billing Cycle:</span>
                      <span className="text-white capitalize">{businessData.subscription.billingCycle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">${businessData.subscription.amount}/{businessData.subscription.billingCycle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date:</span>
                      <span className="text-white">{new Date(businessData.subscription.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Billing:</span>
                      <span className="text-white">{new Date(businessData.subscription.nextBilling).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Paid:</span>
                      <span className="text-white">${businessData.subscription.totalPaid.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Billing Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => handleBusinessAction('Plan Upgraded')}
                    className="w-full justify-start bg-purple-900/50 hover:bg-purple-900/70 text-purple-300"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Button>
                  <Button 
                    onClick={() => handleBusinessAction('Plan Downgraded')}
                    variant="outline" 
                    className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Downgrade Plan
                  </Button>
                  <Button 
                    onClick={() => handleBusinessAction('Billing Updated')}
                    variant="outline" 
                    className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Update Billing
                  </Button>
                  <Button 
                    onClick={() => handleBusinessAction('Subscription Suspended')}
                    variant="outline" 
                    className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-red-400 hover:text-red-300"
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Suspend Subscription
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Team Members</CardTitle>
                <CardDescription className="text-gray-400">All team members in this business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessData.teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-sm text-gray-400">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-purple-900/50 text-purple-400">
                          {member.role}
                        </Badge>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="h-4 w-4" />
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
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Latest business activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessData.recentActivity.map((activity) => (
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
                        <div className="text-sm text-gray-400 mt-1">
                          By {activity.user}
                          {activity.amount && (
                            <span className="text-green-400 ml-2">
                              ${activity.amount.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Compliance Status</CardTitle>
                <CardDescription className="text-gray-400">Business compliance and certification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <span className="text-gray-400">Tax Compliant</span>
                      {businessData.compliance.taxCompliant ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <span className="text-gray-400">GDPR Compliant</span>
                      {businessData.compliance.gdprCompliant ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {businessData.compliance.certifications.map((cert) => (
                        <Badge key={cert} className="bg-green-900/50 text-green-400">
                          <Shield className="mr-1 h-3 w-3" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last Audit:</span>
                    <span className="text-white">{new Date(businessData.compliance.lastAudit).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Business Settings</CardTitle>
                <CardDescription className="text-gray-400">Administrative settings and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Business Status</h4>
                    <p className="text-sm text-gray-400">Current operational status</p>
                  </div>
                  <Button 
                    onClick={() => handleBusinessAction(businessData.status === 'active' ? 'Suspended' : 'Activated')}
                    variant="outline" 
                    className="bg-gray-800/60 border-gray-700/50 text-gray-300"
                  >
                    {businessData.status === 'active' ? 'Suspend' : 'Activate'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Data Export</h4>
                    <p className="text-sm text-gray-400">Export all business data</p>
                  </div>
                  <Button 
                    onClick={() => handleBusinessAction('Data Exported')}
                    variant="outline" 
                    className="bg-gray-800/60 border-gray-700/50 text-gray-300"
                  >
                    Export
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Reset Business</h4>
                    <p className="text-sm text-gray-400">Reset all business data</p>
                  </div>
                  <Button 
                    onClick={() => handleBusinessAction('Reset')}
                    variant="outline" 
                    className="bg-gray-800/60 border-gray-700/50 text-red-400 hover:text-red-300"
                  >
                    Reset
                  </Button>
                </div>
                
                <div className="pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-400">Delete Business</h4>
                      <p className="text-sm text-gray-400">Permanently delete this business and all data</p>
                    </div>
                    <Button 
                      onClick={() => handleBusinessAction('Deleted')}
                      variant="outline" 
                      className="bg-red-900/20 border-red-700/50 text-red-400 hover:bg-red-900/30"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
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