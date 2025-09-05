'use client';

import { useState, useEffect } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Cloud,
  Monitor,
  Smartphone,
  Users,
  Building
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const systemMetrics = {
  uptime: 99.97,
  totalRequests: 2456789,
  activeUsers: 11850,
  activeSessions: 3247,
  cpu: {
    current: 45,
    average: 38,
    peak: 78,
    cores: 16
  },
  memory: {
    used: 62,
    total: 64, // GB
    available: 24.3,
    cached: 18.2
  },
  disk: {
    used: 78,
    total: 2048, // GB
    available: 450,
    iops: 1250
  },
  network: {
    inbound: 125.6, // Mbps
    outbound: 89.3,
    latency: 12, // ms
    packets: 45678
  },
  database: {
    connections: 45,
    maxConnections: 100,
    queryTime: 2.3, // ms
    slowQueries: 12,
    size: 156.7 // GB
  }
};

const performanceData = [
  { time: '00:00', cpu: 35, memory: 58, requests: 1200 },
  { time: '04:00', cpu: 28, memory: 55, requests: 800 },
  { time: '08:00', cpu: 65, memory: 72, requests: 3400 },
  { time: '12:00', cpu: 78, memory: 68, requests: 4200 },
  { time: '16:00', cpu: 45, memory: 62, requests: 2800 },
  { time: '20:00', cpu: 38, memory: 59, requests: 1900 }
];

const services = [
  {
    name: 'Web Application',
    status: 'healthy',
    uptime: 99.98,
    responseTime: 120,
    instances: 3,
    version: '2.1.4'
  },
  {
    name: 'API Gateway',
    status: 'healthy',
    uptime: 99.95,
    responseTime: 45,
    instances: 2,
    version: '1.8.2'
  },
  {
    name: 'Database Cluster',
    status: 'healthy',
    uptime: 99.99,
    responseTime: 2.3,
    instances: 3,
    version: '14.9'
  },
  {
    name: 'Redis Cache',
    status: 'healthy',
    uptime: 99.97,
    responseTime: 0.8,
    instances: 2,
    version: '7.0.5'
  },
  {
    name: 'Email Service',
    status: 'warning',
    uptime: 98.5,
    responseTime: 890,
    instances: 1,
    version: '3.2.1'
  },
  {
    name: 'File Storage',
    status: 'healthy',
    uptime: 99.99,
    responseTime: 156,
    instances: 4,
    version: '2.0.8'
  }
];

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High CPU Usage',
    description: 'CPU usage has been above 75% for the last 10 minutes',
    timestamp: '2025-01-15T14:30:00Z',
    service: 'Web Application',
    resolved: false
  },
  {
    id: 2,
    type: 'info',
    title: 'Scheduled Maintenance',
    description: 'Database maintenance scheduled for tonight at 2:00 AM',
    timestamp: '2025-01-15T12:00:00Z',
    service: 'Database',
    resolved: false
  },
  {
    id: 3,
    type: 'error',
    title: 'Email Service Degraded',
    description: 'Email delivery is experiencing delays',
    timestamp: '2025-01-15T11:45:00Z',
    service: 'Email Service',
    resolved: false
  },
  {
    id: 4,
    type: 'success',
    title: 'Backup Completed',
    description: 'Daily database backup completed successfully',
    timestamp: '2025-01-15T03:00:00Z',
    service: 'Database',
    resolved: true
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'bg-green-900/50 text-green-400';
    case 'warning':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'error':
      return 'bg-red-900/50 text-red-400';
    case 'maintenance':
      return 'bg-blue-900/50 text-blue-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-4 w-4" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4" />;
    case 'error':
      return <AlertTriangle className="h-4 w-4" />;
    case 'maintenance':
      return <Settings className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-900/50 text-red-400 border-red-700/50';
    case 'warning':
      return 'bg-yellow-900/50 text-yellow-400 border-yellow-700/50';
    case 'info':
      return 'bg-blue-900/50 text-blue-400 border-blue-700/50';
    case 'success':
      return 'bg-green-900/50 text-green-400 border-green-700/50';
    default:
      return 'bg-gray-700/50 text-gray-400 border-gray-600/50';
  }
};

export default function SystemHealthPage() {
  const [refreshing, setRefreshing] = useState(false);

  const refreshMetrics = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">System Health</h1>
            <p className="text-gray-400 mt-2">Monitor platform performance, resources, and service health</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={refreshMetrics}
              disabled={refreshing}
              variant="outline" 
              className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{systemMetrics.uptime}%</div>
                  <div className="text-sm text-gray-400">System Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{systemMetrics.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{systemMetrics.totalRequests.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Requests</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Globe className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{systemMetrics.activeSessions.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Active Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4 bg-gray-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Performance</TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Services</TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Alerts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Resource Usage */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Resource Usage</CardTitle>
                  <CardDescription className="text-gray-400">Current system resource utilization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Cpu className="h-4 w-4 text-blue-400" />
                          <span className="text-gray-300">CPU Usage</span>
                        </div>
                        <span className={`font-semibold ${getUsageColor(systemMetrics.cpu.current)}`}>
                          {systemMetrics.cpu.current}%
                        </span>
                      </div>
                      <Progress value={systemMetrics.cpu.current} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Avg: {systemMetrics.cpu.average}%</span>
                        <span>Peak: {systemMetrics.cpu.peak}%</span>
                        <span>{systemMetrics.cpu.cores} cores</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-green-400" />
                          <span className="text-gray-300">Memory Usage</span>
                        </div>
                        <span className={`font-semibold ${getUsageColor(systemMetrics.memory.used)}`}>
                          {systemMetrics.memory.used}%
                        </span>
                      </div>
                      <Progress value={systemMetrics.memory.used} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Available: {systemMetrics.memory.available}GB</span>
                        <span>Cached: {systemMetrics.memory.cached}GB</span>
                        <span>Total: {systemMetrics.memory.total}GB</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <HardDrive className="h-4 w-4 text-purple-400" />
                          <span className="text-gray-300">Disk Usage</span>
                        </div>
                        <span className={`font-semibold ${getUsageColor(systemMetrics.disk.used)}`}>
                          {systemMetrics.disk.used}%
                        </span>
                      </div>
                      <Progress value={systemMetrics.disk.used} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Available: {systemMetrics.disk.available}GB</span>
                        <span>IOPS: {systemMetrics.disk.iops}</span>
                        <span>Total: {systemMetrics.disk.total}GB</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Wifi className="h-4 w-4 text-orange-400" />
                          <span className="text-gray-300">Network</span>
                        </div>
                        <span className="font-semibold text-white">
                          {systemMetrics.network.latency}ms
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Inbound:</span>
                          <span className="text-white">{systemMetrics.network.inbound} Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Outbound:</span>
                          <span className="text-white">{systemMetrics.network.outbound} Mbps</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Database Metrics */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Database className="h-5 w-5 text-green-400" />
                    <span>Database Health</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Database performance and connection status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-white">{systemMetrics.database.connections}</div>
                      <div className="text-sm text-gray-400">Active Connections</div>
                      <div className="text-xs text-gray-500">Max: {systemMetrics.database.maxConnections}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-white">{systemMetrics.database.queryTime}ms</div>
                      <div className="text-sm text-gray-400">Avg Query Time</div>
                      <div className="text-xs text-gray-500">Slow: {systemMetrics.database.slowQueries}</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Database Size</span>
                      <span className="font-semibold text-white">{systemMetrics.database.size}GB</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <div className="text-xs text-gray-400 mt-1">65% of allocated storage</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <span className="text-gray-400">Replication Status</span>
                      <Badge className="bg-green-900/50 text-green-400">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <span className="text-gray-400">Backup Status</span>
                      <Badge className="bg-green-900/50 text-green-400">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Up to Date
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <span className="text-gray-400">Index Health</span>
                      <Badge className="bg-green-900/50 text-green-400">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Optimized
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
                <CardDescription className="text-gray-400">Real-time system performance monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="time" 
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
                                <p className="text-sm text-blue-400">
                                  CPU: {payload[0].value}%
                                </p>
                                <p className="text-sm text-green-400">
                                  Memory: {payload[1].value}%
                                </p>
                                <p className="text-sm text-purple-400">
                                  Requests: {payload[2].value?.toLocaleString()}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cpu" 
                        stroke="#3B82F6" 
                        fill="url(#cpuGradient)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="memory" 
                        stroke="#10B981" 
                        fill="url(#memoryGradient)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="requests" 
                        stroke="#8B5CF6" 
                        fill="url(#requestsGradient)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.name} className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Server className="h-6 w-6 text-blue-400" />
                        <div>
                          <h3 className="font-semibold text-white">{service.name}</h3>
                          <p className="text-sm text-gray-400">v{service.version}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusIcon(service.status)}
                        <span className="ml-1">{service.status.charAt(0).toUpperCase() + service.status.slice(1)}</span>
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Uptime:</span>
                        <span className="text-white">{service.uptime}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Response Time:</span>
                        <span className="text-white">{service.responseTime}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Instances:</span>
                        <span className="text-white">{service.instances} running</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">System Alerts</CardTitle>
                <CardDescription className="text-gray-400">Recent system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-gray-700/50 rounded-lg">
                            {alert.type === 'error' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                            {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-400" />}
                            {alert.type === 'info' && <Activity className="h-4 w-4 text-blue-400" />}
                            {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-400" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{alert.title}</h4>
                            <p className="text-sm text-gray-300 mt-1">{alert.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                              <span>Service: {alert.service}</span>
                              <span>•</span>
                              <span>{new Date(alert.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!alert.resolved && (
                            <Button size="sm" variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                              Resolve
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">System Health</h3>
                  <p className="text-blue-200 mb-4">
                    All systems operational with excellent performance
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Uptime: {systemMetrics.uptime}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Response: 120ms avg</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Security: All green</span>
                    </div>
                  </div>
                </div>
                <Activity className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Performance</h3>
                  <p className="text-green-200 mb-4">
                    Excellent performance across all metrics
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">CPU Load</span>
                      <span className="font-medium text-white">{systemMetrics.cpu.current}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Memory Usage</span>
                      <span className="font-medium text-white">{systemMetrics.memory.used}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Disk Usage</span>
                      <span className="font-medium text-white">{systemMetrics.disk.used}%</span>
                    </div>
                  </div>
                </div>
                <BarChart3 className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Platform Stats</h3>
                  <p className="text-purple-200 mb-4">
                    Real-time platform usage and activity
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Active Users</span>
                      <span className="font-medium text-white">{systemMetrics.activeUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Active Sessions</span>
                      <span className="font-medium text-white">{systemMetrics.activeSessions.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Total Requests</span>
                      <span className="font-medium text-white">{(systemMetrics.totalRequests / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
                <Users className="h-12 w-12 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}