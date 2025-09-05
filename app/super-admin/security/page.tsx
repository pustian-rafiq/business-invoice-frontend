'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Activity,
  Globe,
  Users,
  Database,
  Key,
  Smartphone,
  Mail,
  Clock,
  Ban,
  RefreshCw,
  Download,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Zap,
  Server,
  Wifi
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const securityMetrics = {
  threatLevel: 'low',
  blockedAttacks: 1247,
  failedLogins: 89,
  suspiciousIPs: 23,
  twoFactorAdoption: 78.5,
  passwordCompliance: 92.3,
  sslCertStatus: 'valid',
  lastSecurityScan: '2025-01-15T02:00:00Z',
  vulnerabilities: {
    critical: 0,
    high: 2,
    medium: 5,
    low: 12
  }
};

const securityEvents = [
  {
    id: 1,
    type: 'failed_login',
    severity: 'medium',
    description: 'Multiple failed login attempts from IP 203.0.113.1',
    timestamp: '2025-01-15T14:30:00Z',
    ipAddress: '203.0.113.1',
    location: 'Unknown',
    userAgent: 'Bot/1.0',
    blocked: true,
    resolved: false
  },
  {
    id: 2,
    type: 'suspicious_activity',
    severity: 'high',
    description: 'Unusual API usage pattern detected',
    timestamp: '2025-01-15T13:45:00Z',
    ipAddress: '192.168.1.100',
    location: 'New York, NY',
    userAgent: 'Chrome 120.0.0.0',
    blocked: false,
    resolved: false
  },
  {
    id: 3,
    type: 'brute_force',
    severity: 'high',
    description: 'Brute force attack detected and blocked',
    timestamp: '2025-01-15T12:20:00Z',
    ipAddress: '198.51.100.1',
    location: 'Unknown',
    userAgent: 'Python/3.9',
    blocked: true,
    resolved: true
  },
  {
    id: 4,
    type: 'data_access',
    severity: 'low',
    description: 'Admin accessed user data for support ticket',
    timestamp: '2025-01-15T11:15:00Z',
    ipAddress: '192.168.1.50',
    location: 'San Francisco, CA',
    userAgent: 'Chrome 120.0.0.0',
    blocked: false,
    resolved: true
  }
];

const threatData = [
  { hour: '00:00', attacks: 12, blocked: 12, failed_logins: 5 },
  { hour: '04:00', attacks: 8, blocked: 8, failed_logins: 3 },
  { hour: '08:00', attacks: 45, blocked: 43, failed_logins: 15 },
  { hour: '12:00', attacks: 67, blocked: 65, failed_logins: 23 },
  { hour: '16:00', attacks: 34, blocked: 32, failed_logins: 12 },
  { hour: '20:00', attacks: 23, blocked: 23, failed_logins: 8 }
];

const complianceData = [
  { metric: 'Password Policy', score: 92.3, target: 95 },
  { metric: '2FA Adoption', score: 78.5, target: 85 },
  { metric: 'SSL/TLS', score: 100, target: 100 },
  { metric: 'Data Encryption', score: 98.7, target: 100 },
  { metric: 'Access Controls', score: 94.2, target: 95 },
  { metric: 'Audit Logging', score: 96.8, target: 95 }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-900/50 text-red-400';
    case 'high':
      return 'bg-orange-900/50 text-orange-400';
    case 'medium':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'low':
      return 'bg-blue-900/50 text-blue-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getThreatLevelColor = (level: string) => {
  switch (level) {
    case 'critical':
      return 'text-red-400';
    case 'high':
      return 'text-orange-400';
    case 'medium':
      return 'text-yellow-400';
    case 'low':
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
};

const getComplianceColor = (score: number, target: number) => {
  if (score >= target) return 'text-green-400';
  if (score >= target * 0.9) return 'text-yellow-400';
  return 'text-red-400';
};

export default function SecurityPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('24hours');

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Security Center</h1>
            <p className="text-gray-400 mt-2">Monitor platform security, threats, and compliance status</p>
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
              Security Report
            </Button>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Shield className={`h-8 w-8 ${getThreatLevelColor(securityMetrics.threatLevel)}`} />
                <div>
                  <div className={`text-2xl font-bold ${getThreatLevelColor(securityMetrics.threatLevel)}`}>
                    {securityMetrics.threatLevel.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-400">Threat Level</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Ban className="h-8 w-8 text-red-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{securityMetrics.blockedAttacks.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Blocked Attacks</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Lock className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{securityMetrics.twoFactorAdoption}%</div>
                  <div className="text-sm text-gray-400">2FA Adoption</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{securityMetrics.vulnerabilities.high + securityMetrics.vulnerabilities.critical}</div>
                  <div className="text-sm text-gray-400">Active Vulnerabilities</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Threats</TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Compliance</TabsTrigger>
            <TabsTrigger value="access" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Access Control</TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Audit Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Threat Detection */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Threat Detection</CardTitle>
                  <CardDescription className="text-gray-400">Real-time security threat monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={threatData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="hour" 
                          stroke="#9CA3AF"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#9CA3AF"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg">
                                  <p className="font-medium text-white">{label}</p>
                                  <p className="text-sm text-red-400">
                                    Attacks: {payload[0].value}
                                  </p>
                                  <p className="text-sm text-green-400">
                                    Blocked: {payload[1].value}
                                  </p>
                                  <p className="text-sm text-yellow-400">
                                    Failed Logins: {payload[2].value}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="attacks" fill="#EF4444" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="blocked" fill="#10B981" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="failed_logins" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Security Events */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Recent Security Events</CardTitle>
                  <CardDescription className="text-gray-400">Latest security incidents and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {securityEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-1 bg-gray-700/50 rounded">
                              {event.type === 'failed_login' && <Lock className="h-4 w-4 text-yellow-400" />}
                              {event.type === 'suspicious_activity' && <Eye className="h-4 w-4 text-orange-400" />}
                              {event.type === 'brute_force' && <Shield className="h-4 w-4 text-red-400" />}
                              {event.type === 'data_access' && <Database className="h-4 w-4 text-blue-400" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{event.description}</p>
                              <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                                <span>{event.ipAddress}</span>
                                <span>•</span>
                                <span>{event.location}</span>
                                <span>•</span>
                                <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getSeverityColor(event.severity)}>
                              {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                            </Badge>
                            {event.blocked && (
                              <Badge className="bg-red-900/50 text-red-400">
                                <Ban className="mr-1 h-3 w-3" />
                                Blocked
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Security Compliance</CardTitle>
                <CardDescription className="text-gray-400">Platform security compliance metrics and standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.map((item) => (
                    <div key={item.metric} className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{item.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${getComplianceColor(item.score, item.target)}`}>
                            {item.score}%
                          </span>
                          <span className="text-gray-400">/ {item.target}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.score >= item.target ? 'bg-green-500' :
                            item.score >= item.target * 0.9 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(item.score, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access Control Tab */}
          <TabsContent value="access" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Access Control Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">Active Admin Sessions</span>
                    </div>
                    <span className="font-semibold text-white">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">API Keys Active</span>
                    </div>
                    <span className="font-semibold text-white">45</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">2FA Enabled Users</span>
                    </div>
                    <span className="font-semibold text-white">{securityMetrics.twoFactorAdoption}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-orange-400" />
                      <span className="text-gray-300">Password Compliance</span>
                    </div>
                    <span className="font-semibold text-white">{securityMetrics.passwordCompliance}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Vulnerability Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-red-900/20 rounded-lg border border-red-700/30">
                      <div className="text-2xl font-bold text-red-400">{securityMetrics.vulnerabilities.critical}</div>
                      <div className="text-sm text-red-300">Critical</div>
                    </div>
                    <div className="text-center p-3 bg-orange-900/20 rounded-lg border border-orange-700/30">
                      <div className="text-2xl font-bold text-orange-400">{securityMetrics.vulnerabilities.high}</div>
                      <div className="text-sm text-orange-300">High</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
                      <div className="text-2xl font-bold text-yellow-400">{securityMetrics.vulnerabilities.medium}</div>
                      <div className="text-sm text-yellow-300">Medium</div>
                    </div>
                    <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
                      <div className="text-2xl font-bold text-blue-400">{securityMetrics.vulnerabilities.low}</div>
                      <div className="text-sm text-blue-300">Low</div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Last Security Scan</span>
                      <span className="text-white">{new Date(securityMetrics.lastSecurityScan).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Security Audit Logs</CardTitle>
                <CardDescription className="text-gray-400">Comprehensive security event logging and monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-gray-700/50 rounded-lg">
                            {event.type === 'failed_login' && <Lock className="h-4 w-4 text-yellow-400" />}
                            {event.type === 'suspicious_activity' && <Eye className="h-4 w-4 text-orange-400" />}
                            {event.type === 'brute_force' && <Shield className="h-4 w-4 text-red-400" />}
                            {event.type === 'data_access' && <Database className="h-4 w-4 text-blue-400" />}
                          </div>
                          <div>
                            <p className="font-medium text-white">{event.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                              <span>IP: {event.ipAddress}</span>
                              <span>Location: {event.location}</span>
                              <span>{new Date(event.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">User Agent: {event.userAgent}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                          </Badge>
                          {event.blocked && (
                            <Badge className="bg-red-900/50 text-red-400">
                              <Ban className="mr-1 h-3 w-3" />
                              Blocked
                            </Badge>
                          )}
                          {event.resolved && (
                            <Badge className="bg-green-900/50 text-green-400">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Resolved
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Threat Intelligence</h3>
                  <p className="text-red-200 mb-4">
                    Advanced threat detection and prevention
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Blocked Today</span>
                      <span className="font-medium text-white">247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Success Rate</span>
                      <span className="font-medium text-white">99.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">False Positives</span>
                      <span className="font-medium text-white">0.8%</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Access Security</h3>
                  <p className="text-blue-200 mb-4">
                    User authentication and access control
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">2FA Adoption</span>
                      <span className="font-medium text-white">{securityMetrics.twoFactorAdoption}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Strong Passwords</span>
                      <span className="font-medium text-white">{securityMetrics.passwordCompliance}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Failed Logins</span>
                      <span className="font-medium text-white">{securityMetrics.failedLogins}</span>
                    </div>
                  </div>
                </div>
                <Lock className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Platform Security</h3>
                  <p className="text-green-200 mb-4">
                    Overall platform security health
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">SSL Certificate Valid</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">Firewall Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">DDoS Protection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">Data Encryption</span>
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