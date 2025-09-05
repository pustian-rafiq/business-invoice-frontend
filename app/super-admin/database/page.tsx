'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Database,
  Server,
  HardDrive,
  Activity,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  TrendingUp,
  Zap,
  Globe,
  Users,
  FileText,
  Search,
  Eye,
  Play,
  Pause,
  Square,
  Trash2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const databaseMetrics = {
  totalSize: 156.7, // GB
  connections: {
    active: 45,
    max: 100,
    idle: 23
  },
  performance: {
    avgQueryTime: 2.3, // ms
    slowQueries: 12,
    queriesPerSecond: 1247,
    cacheHitRatio: 94.5
  },
  replication: {
    status: 'healthy',
    lag: 0.2, // seconds
    replicas: 3
  },
  backup: {
    lastBackup: '2025-01-15T03:00:00Z',
    nextBackup: '2025-01-16T03:00:00Z',
    backupSize: 142.3, // GB
    status: 'completed'
  }
};

const performanceData = [
  { time: '00:00', queries: 850, connections: 32, response: 1.8 },
  { time: '04:00', queries: 420, connections: 18, response: 1.2 },
  { time: '08:00', queries: 2100, connections: 67, response: 3.1 },
  { time: '12:00', queries: 3200, connections: 89, response: 2.8 },
  { time: '16:00', queries: 2800, connections: 72, response: 2.1 },
  { time: '20:00', queries: 1900, connections: 45, response: 1.9 }
];

const tables = [
  {
    name: 'users',
    rows: 12458,
    size: 45.2, // MB
    lastUpdated: '2025-01-15T14:30:00Z',
    indexes: 8,
    status: 'healthy'
  },
  {
    name: 'businesses',
    rows: 3247,
    size: 23.8,
    lastUpdated: '2025-01-15T14:25:00Z',
    indexes: 6,
    status: 'healthy'
  },
  {
    name: 'invoices',
    rows: 89456,
    size: 234.7,
    lastUpdated: '2025-01-15T14:35:00Z',
    indexes: 12,
    status: 'healthy'
  },
  {
    name: 'payments',
    rows: 67234,
    size: 156.3,
    lastUpdated: '2025-01-15T14:32:00Z',
    indexes: 10,
    status: 'healthy'
  },
  {
    name: 'audit_logs',
    rows: 456789,
    size: 1234.5,
    lastUpdated: '2025-01-15T14:36:00Z',
    indexes: 5,
    status: 'warning'
  }
];

const backupHistory = [
  {
    id: 1,
    type: 'full',
    status: 'completed',
    startTime: '2025-01-15T03:00:00Z',
    endTime: '2025-01-15T03:45:00Z',
    size: 142.3,
    duration: 45 // minutes
  },
  {
    id: 2,
    type: 'incremental',
    status: 'completed',
    startTime: '2025-01-14T15:00:00Z',
    endTime: '2025-01-14T15:12:00Z',
    size: 8.7,
    duration: 12
  },
  {
    id: 3,
    type: 'full',
    status: 'completed',
    startTime: '2025-01-14T03:00:00Z',
    endTime: '2025-01-14T03:42:00Z',
    size: 138.9,
    duration: 42
  },
  {
    id: 4,
    type: 'incremental',
    status: 'failed',
    startTime: '2025-01-13T15:00:00Z',
    endTime: '2025-01-13T15:05:00Z',
    size: 0,
    duration: 5
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

const getBackupStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-900/50 text-green-400';
    case 'running':
      return 'bg-blue-900/50 text-blue-400';
    case 'failed':
      return 'bg-red-900/50 text-red-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

export default function DatabasePage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDatabaseAction = (action: string, target?: string) => {
    toast({
      title: `Database ${action}`,
      description: target ? `${action} initiated for ${target}` : `Database ${action.toLowerCase()} initiated`,
    });
  };

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Database Management</h1>
            <p className="text-gray-400 mt-2">Monitor database performance, manage backups, and optimize queries</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => handleDatabaseAction('Backup')}
              variant="outline" 
              className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Manual Backup
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Settings className="mr-2 h-4 w-4" />
              DB Settings
            </Button>
            <Button 
              onClick={() => handleDatabaseAction('Optimization')}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              <Zap className="mr-2 h-4 w-4" />
              Optimize
            </Button>
          </div>
        </div>

        {/* Database Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Database className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{databaseMetrics.totalSize}GB</div>
                  <div className="text-sm text-gray-400">Database Size</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{databaseMetrics.connections.active}</div>
                  <div className="text-sm text-gray-400">Active Connections</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{databaseMetrics.performance.avgQueryTime}ms</div>
                  <div className="text-sm text-gray-400">Avg Query Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{databaseMetrics.performance.cacheHitRatio}%</div>
                  <div className="text-sm text-gray-400">Cache Hit Ratio</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Performance</TabsTrigger>
            <TabsTrigger value="tables" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Tables</TabsTrigger>
            <TabsTrigger value="backups" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Backups</TabsTrigger>
            <TabsTrigger value="maintenance" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Maintenance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Connection Status */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Connection Pool</CardTitle>
                  <CardDescription className="text-gray-400">Database connection status and utilization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Active Connections</span>
                      <span className="font-semibold text-white">
                        {databaseMetrics.connections.active} / {databaseMetrics.connections.max}
                      </span>
                    </div>
                    <Progress value={(databaseMetrics.connections.active / databaseMetrics.connections.max) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{databaseMetrics.connections.active}</div>
                      <div className="text-sm text-gray-400">Active</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{databaseMetrics.connections.idle}</div>
                      <div className="text-sm text-gray-400">Idle</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Replication Status */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Replication Status</CardTitle>
                  <CardDescription className="text-gray-400">Database replication health and lag metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Server className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">Replication Status</span>
                    </div>
                    <Badge className={getStatusColor(databaseMetrics.replication.status)}>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {databaseMetrics.replication.status.charAt(0).toUpperCase() + databaseMetrics.replication.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{databaseMetrics.replication.lag}s</div>
                      <div className="text-sm text-gray-400">Replication Lag</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{databaseMetrics.replication.replicas}</div>
                      <div className="text-sm text-gray-400">Active Replicas</div>
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
                <CardTitle className="text-white">Database Performance</CardTitle>
                <CardDescription className="text-gray-400">Real-time database performance metrics</CardDescription>
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
                                  Queries/sec: {payload[0].value}
                                </p>
                                <p className="text-sm text-green-400">
                                  Connections: {payload[1].value}
                                </p>
                                <p className="text-sm text-purple-400">
                                  Response: {payload[2].value}ms
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="queries" 
                        stroke="#3B82F6" 
                        fill="url(#queriesGradient)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="connections" 
                        stroke="#10B981" 
                        fill="url(#connectionsGradient)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="response" 
                        stroke="#8B5CF6" 
                        fill="url(#responseGradient)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="queriesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="connectionsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
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

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Database Tables</CardTitle>
                    <CardDescription className="text-gray-400">Table statistics and health monitoring</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search tables..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTables.map((table) => (
                    <div key={table.name} className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-700/50 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{table.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>{table.rows.toLocaleString()} rows</span>
                              <span>•</span>
                              <span>{table.size}MB</span>
                              <span>•</span>
                              <span>{table.indexes} indexes</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(table.status)}>
                            {table.status === 'healthy' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {table.status === 'warning' && <AlertTriangle className="mr-1 h-3 w-3" />}
                            {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                          </Badge>
                          <Button 
                            onClick={() => handleDatabaseAction('Analysis', table.name)}
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-400 hover:text-white"
                          >
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

          {/* Backups Tab */}
          <TabsContent value="backups" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Backup Status</CardTitle>
                  <CardDescription className="text-gray-400">Current backup configuration and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{databaseMetrics.backup.backupSize}GB</div>
                      <div className="text-sm text-gray-400">Last Backup Size</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-lg font-bold text-white">
                        {new Date(databaseMetrics.backup.lastBackup).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-400">Last Backup</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <span className="text-gray-400">Backup Status:</span>
                      <Badge className={getBackupStatusColor(databaseMetrics.backup.status)}>
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {databaseMetrics.backup.status.charAt(0).toUpperCase() + databaseMetrics.backup.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <span className="text-gray-400">Next Backup:</span>
                      <span className="text-white">{new Date(databaseMetrics.backup.nextBackup).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleDatabaseAction('Full Backup')}
                      className="flex-1 bg-blue-900/50 hover:bg-blue-900/70 text-blue-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Full Backup
                    </Button>
                    <Button 
                      onClick={() => handleDatabaseAction('Incremental Backup')}
                      variant="outline" 
                      className="flex-1 bg-gray-800/60 border-gray-700/50 text-gray-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Incremental
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Backup History</CardTitle>
                  <CardDescription className="text-gray-400">Recent backup operations and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {backupHistory.map((backup) => (
                      <div key={backup.id} className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-white capitalize">{backup.type} Backup</span>
                              <Badge className={getBackupStatusColor(backup.status)}>
                                {backup.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                                {backup.status === 'failed' && <AlertTriangle className="mr-1 h-3 w-3" />}
                                {backup.status.charAt(0).toUpperCase() + backup.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                              {new Date(backup.startTime).toLocaleString()} • {backup.duration}min • {backup.size}GB
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          
          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Maintenance Operations</CardTitle>
                  <CardDescription className="text-gray-400">Database maintenance and optimization tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => handleDatabaseAction('Index Rebuild')}
                    className="w-full justify-start bg-blue-900/50 hover:bg-blue-900/70 text-blue-300"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rebuild Indexes
                  </Button>
                  <Button 
                    onClick={() => handleDatabaseAction('Statistics Update')}
                    variant="outline" 
                    className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Update Statistics
                  </Button>
                  <Button 
                    onClick={() => handleDatabaseAction('Vacuum')}
                    variant="outline" 
                    className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Vacuum Database
                  </Button>
                  <Button 
                    onClick={() => handleDatabaseAction('Analyze')}
                    variant="outline" 
                    className="w-full justify-start bg-gray-800/60 border-gray-700/50 text-gray-300"
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Analyze Tables
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Query Performance</CardTitle>
                  <CardDescription className="text-gray-400">Slow query monitoring and optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{databaseMetrics.performance.avgQueryTime}ms</div>
                      <div className="text-sm text-gray-400">Avg Query Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{databaseMetrics.performance.slowQueries}</div>
                      <div className="text-sm text-gray-400">Slow Queries</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <span className="text-gray-400">Queries/Second:</span>
                      <span className="text-white">{databaseMetrics.performance.queriesPerSecond.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <span className="text-gray-400">Cache Hit Ratio:</span>
                      <span className="text-white">{databaseMetrics.performance.cacheHitRatio}%</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleDatabaseAction('Query Optimization')}
                    className="w-full bg-green-900/50 hover:bg-green-900/70 text-green-300"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Optimize Queries
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Database Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Performance Health</h3>
                  <p className="text-blue-200 mb-4">
                    Excellent database performance and optimization
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Query Performance</span>
                      <span className="font-medium text-white">Excellent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Index Efficiency</span>
                      <span className="font-medium text-white">94.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Cache Hit Rate</span>
                      <span className="font-medium text-white">{databaseMetrics.performance.cacheHitRatio}%</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Backup Health</h3>
                  <p className="text-green-200 mb-4">
                    Reliable backup system with automated scheduling
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">Daily backups active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">Encryption enabled</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">Off-site storage</span>
                    </div>
                  </div>
                </div>
                <Shield className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Storage Metrics</h3>
                  <p className="text-purple-200 mb-4">
                    Database storage utilization and growth
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Total Size</span>
                      <span className="font-medium text-white">{databaseMetrics.totalSize}GB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Growth Rate</span>
                      <span className="font-medium text-white">+2.3GB/month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Compression</span>
                      <span className="font-medium text-white">67%</span>
                    </div>
                  </div>
                </div>
                <HardDrive className="h-12 w-12 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}