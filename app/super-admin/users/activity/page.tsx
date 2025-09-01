'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Search, 
  Filter, 
  Download,
  Activity,
  Shield,
  Mail,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Eye,
  RefreshCw,
  Calendar,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

const activityLogs = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      email: 'john@acme.com',
      avatar: 'JD',
      role: 'business_owner'
    },
    action: 'Created invoice INV-001234',
    type: 'invoice_created',
    timestamp: '2025-01-15T10:30:00Z',
    ipAddress: '192.168.1.100',
    location: 'New York, NY',
    userAgent: 'Chrome 120.0.0.0',
    details: {
      invoiceId: 'INV-001234',
      amount: 2500.00,
      client: 'Acme Corporation'
    },
    risk: 'low'
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      email: 'jane@techsol.com',
      avatar: 'JS',
      role: 'business_owner'
    },
    action: 'Failed login attempt',
    type: 'login_failed',
    timestamp: '2025-01-15T09:45:00Z',
    ipAddress: '192.168.1.101',
    location: 'San Francisco, CA',
    userAgent: 'Firefox 121.0.0.0',
    details: {
      reason: 'Invalid password',
      attemptCount: 3
    },
    risk: 'medium'
  },
  {
    id: '3',
    user: {
      name: 'Mike Johnson',
      email: 'mike@digipro.com',
      avatar: 'MJ',
      role: 'team_member'
    },
    action: 'Updated business settings',
    type: 'settings_changed',
    timestamp: '2025-01-15T08:20:00Z',
    ipAddress: '192.168.1.102',
    location: 'Austin, TX',
    userAgent: 'Safari 17.2.0',
    details: {
      section: 'Payment Gateway',
      changes: ['Stripe API Key Updated']
    },
    risk: 'low'
  },
  {
    id: '4',
    user: {
      name: 'Unknown User',
      email: 'suspicious@example.com',
      avatar: '??',
      role: 'unknown'
    },
    action: 'Multiple failed login attempts',
    type: 'security_alert',
    timestamp: '2025-01-15T07:15:00Z',
    ipAddress: '203.0.113.1',
    location: 'Unknown Location',
    userAgent: 'Bot/1.0',
    details: {
      attemptCount: 15,
      timespan: '5 minutes',
      blocked: true
    },
    risk: 'high'
  },
  {
    id: '5',
    user: {
      name: 'Sarah Wilson',
      email: 'sarah@startupxyz.com',
      avatar: 'SW',
      role: 'business_owner'
    },
    action: 'Payment received',
    type: 'payment_received',
    timestamp: '2025-01-14T16:30:00Z',
    ipAddress: '192.168.1.103',
    location: 'Seattle, WA',
    userAgent: 'Chrome 120.0.0.0',
    details: {
      amount: 1800.00,
      paymentMethod: 'Credit Card',
      invoiceId: 'INV-001235'
    },
    risk: 'low'
  },
  {
    id: '6',
    user: {
      name: 'David Brown',
      email: 'david@invoiceai.com',
      avatar: 'DB',
      role: 'admin'
    },
    action: 'Suspended user account',
    type: 'admin_action',
    timestamp: '2025-01-14T14:45:00Z',
    ipAddress: '192.168.1.104',
    location: 'Miami, FL',
    userAgent: 'Chrome 120.0.0.0',
    details: {
      targetUser: 'robert@fraudcorp.com',
      reason: 'Fraudulent activity detected',
      suspensionType: 'permanent'
    },
    risk: 'low'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'login_success':
    case 'login_failed':
      return <Shield className="h-4 w-4 text-blue-400" />;
    case 'invoice_created':
    case 'invoice_updated':
      return <FileText className="h-4 w-4 text-green-400" />;
    case 'payment_received':
    case 'payment_failed':
      return <CreditCard className="h-4 w-4 text-purple-400" />;
    case 'settings_changed':
      return <Settings className="h-4 w-4 text-orange-400" />;
    case 'admin_action':
      return <Shield className="h-4 w-4 text-red-400" />;
    case 'security_alert':
      return <AlertTriangle className="h-4 w-4 text-red-400" />;
    default:
      return <Activity className="h-4 w-4 text-gray-400" />;
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'high':
      return 'bg-red-900/50 text-red-400';
    case 'medium':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'low':
      return 'bg-green-900/50 text-green-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'login_success':
    case 'login_failed':
      return 'bg-blue-900/50 text-blue-400';
    case 'invoice_created':
    case 'invoice_updated':
      return 'bg-green-900/50 text-green-400';
    case 'payment_received':
    case 'payment_failed':
      return 'bg-purple-900/50 text-purple-400';
    case 'settings_changed':
      return 'bg-orange-900/50 text-orange-400';
    case 'admin_action':
      return 'bg-red-900/50 text-red-400';
    case 'security_alert':
      return 'bg-red-900/50 text-red-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

export default function UserActivityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [timeRange, setTimeRange] = useState('24hours');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || log.type.includes(selectedTab);
    const matchesRisk = riskFilter === 'all' || log.risk === riskFilter;
    return matchesSearch && matchesTab && matchesRisk;
  });

  const stats = {
    total: activityLogs.length,
    highRisk: activityLogs.filter(l => l.risk === 'high').length,
    mediumRisk: activityLogs.filter(l => l.risk === 'medium').length,
    lowRisk: activityLogs.filter(l => l.risk === 'low').length,
    securityAlerts: activityLogs.filter(l => l.type === 'security_alert').length
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
            <div>
              <h1 className="text-3xl font-bold text-white">User Activity</h1>
              <p className="text-gray-400 mt-2">Monitor user actions and security events across the platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 bg-gray-700/50 border-gray-600/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1hour">Last Hour</SelectItem>
                <SelectItem value="24hours">Last 24 Hours</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Activities</CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.securityAlerts}</div>
              <p className="text-xs text-gray-400 mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.highRisk}</div>
              <p className="text-xs text-gray-400 mt-1">Critical events</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Normal Activity</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.lowRisk}</div>
              <p className="text-xs text-gray-400 mt-1">Safe operations</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-32 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-6 bg-gray-700/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="login" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Logins
                </TabsTrigger>
                <TabsTrigger value="invoice" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Invoices
                </TabsTrigger>
                <TabsTrigger value="payment" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Settings
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-700/50 rounded-lg">
                          {getActivityIcon(log.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-white">{log.action}</h3>
                            <Badge className={getTypeColor(log.type)}>
                              {log.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                            <Badge className={getRiskColor(log.risk)}>
                              {log.risk.charAt(0).toUpperCase() + log.risk.slice(1)} Risk
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                                  {log.user.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span>{log.user.name}</span>
                            </div>
                            <span>•</span>
                            <span>{log.user.email}</span>
                            <span>•</span>
                            <span>{new Date(log.timestamp).toLocaleString()}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                              <Globe className="h-4 w-4 text-gray-500" />
                              <span>{log.ipAddress} ({log.location})</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-gray-500" />
                              <span>{log.userAgent}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{log.user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                            </div>
                          </div>

                          {/* Activity Details */}
                          {log.details && (
                            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                              <h4 className="font-medium text-white mb-2">Details</h4>
                              <div className="space-y-1 text-sm text-gray-300">
                                {Object.entries(log.details).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                    <span className="text-white">
                                      {typeof value === 'number' && key.includes('amount') 
                                        ? `$${value.toLocaleString()}` 
                                        : Array.isArray(value) 
                                          ? value.join(', ')
                                          : String(value)
                                      }
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredLogs.length === 0 && (
                    <div className="text-center py-12">
                      <Activity className="mx-auto h-12 w-12 text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-white">No activity found</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {searchTerm ? 'Try adjusting your search terms.' : 'No activity logs match the current filters.'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Security Events</h3>
                  <p className="text-red-200 mb-4">
                    Critical security events requiring attention
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Failed Logins</span>
                      <span className="font-medium text-white">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Suspicious IPs</span>
                      <span className="font-medium text-white">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Blocked Attempts</span>
                      <span className="font-medium text-white">12</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">User Actions</h3>
                  <p className="text-blue-200 mb-4">
                    Most common user activities on the platform
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Invoices Created</span>
                      <span className="font-medium text-white">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Payments Processed</span>
                      <span className="font-medium text-white">892</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Settings Updated</span>
                      <span className="font-medium text-white">156</span>
                    </div>
                  </div>
                </div>
                <BarChart3 className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Platform Health</h3>
                  <p className="text-green-200 mb-4">
                    Overall platform activity and health metrics
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Success Rate</span>
                      <span className="font-medium text-white">98.7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Avg Response</span>
                      <span className="font-medium text-white">120ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Uptime</span>
                      <span className="font-medium text-white">99.9%</span>
                    </div>
                  </div>
                </div>
                <CheckCircle className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}