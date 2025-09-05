'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Server,
  Database,
  Shield,
  CreditCard,
  Users,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Mail,
  Bell,
  Settings,
  RefreshCw,
  Trash2,
  Send,
  Zap,
  Globe,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const systemAlerts = [
  {
    id: 'ALT-001',
    title: 'High CPU Usage Detected',
    description: 'CPU usage has exceeded 80% threshold for the past 15 minutes on web server cluster',
    type: 'performance',
    severity: 'high',
    status: 'active',
    source: 'System Monitor',
    affectedService: 'Web Application',
    createdAt: '2025-01-15T14:30:00Z',
    updatedAt: '2025-01-15T14:45:00Z',
    acknowledgedBy: null,
    resolvedBy: null,
    resolvedAt: null,
    metrics: {
      currentValue: 85,
      threshold: 80,
      unit: '%'
    },
    actions: [
      'Scale up instances',
      'Investigate high-load processes',
      'Enable auto-scaling'
    ],
    impact: 'Potential performance degradation for users',
    escalationLevel: 1
  },
  {
    id: 'ALT-002',
    title: 'Failed Payment Spike',
    description: 'Unusual increase in payment failures detected - 15% failure rate in last hour',
    type: 'billing',
    severity: 'critical',
    status: 'active',
    source: 'Payment Monitor',
    affectedService: 'Payment Gateway',
    createdAt: '2025-01-15T13:45:00Z',
    updatedAt: '2025-01-15T14:30:00Z',
    acknowledgedBy: 'Billing Team',
    resolvedBy: null,
    resolvedAt: null,
    metrics: {
      currentValue: 15,
      threshold: 5,
      unit: '%'
    },
    actions: [
      'Check payment gateway status',
      'Contact payment processor',
      'Notify affected customers'
    ],
    impact: 'Revenue loss and customer dissatisfaction',
    escalationLevel: 2
  },
  {
    id: 'ALT-003',
    title: 'Database Connection Pool Exhausted',
    description: 'Database connection pool is at 95% capacity, new connections may be rejected',
    type: 'database',
    severity: 'medium',
    status: 'acknowledged',
    source: 'Database Monitor',
    affectedService: 'Database Cluster',
    createdAt: '2025-01-15T12:20:00Z',
    updatedAt: '2025-01-15T13:15:00Z',
    acknowledgedBy: 'DevOps Team',
    resolvedBy: null,
    resolvedAt: null,
    metrics: {
      currentValue: 95,
      threshold: 90,
      unit: '%'
    },
    actions: [
      'Increase connection pool size',
      'Optimize long-running queries',
      'Add read replicas'
    ],
    impact: 'Potential database timeouts and errors',
    escalationLevel: 1
  },
  {
    id: 'ALT-004',
    title: 'SSL Certificate Expiring Soon',
    description: 'SSL certificate for api.invoiceai.com expires in 7 days',
    type: 'security',
    severity: 'medium',
    status: 'active',
    source: 'Certificate Monitor',
    affectedService: 'API Gateway',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    acknowledgedBy: null,
    resolvedBy: null,
    resolvedAt: null,
    metrics: {
      currentValue: 7,
      threshold: 14,
      unit: 'days'
    },
    actions: [
      'Renew SSL certificate',
      'Update certificate in load balancer',
      'Test certificate deployment'
    ],
    impact: 'API access will be disrupted if not renewed',
    escalationLevel: 0
  },
  {
    id: 'ALT-005',
    title: 'Disk Space Warning',
    description: 'File storage server disk usage has reached 85% capacity',
    type: 'storage',
    severity: 'medium',
    status: 'resolved',
    source: 'Storage Monitor',
    affectedService: 'File Storage',
    createdAt: '2025-01-15T08:30:00Z',
    updatedAt: '2025-01-15T11:45:00Z',
    acknowledgedBy: 'Infrastructure Team',
    resolvedBy: 'John DevOps',
    resolvedAt: '2025-01-15T11:45:00Z',
    metrics: {
      currentValue: 85,
      threshold: 80,
      unit: '%'
    },
    actions: [
      'Clean up old files',
      'Add additional storage',
      'Implement file archiving'
    ],
    impact: 'File uploads may fail if storage fills up',
    escalationLevel: 0
  }
];

const getAlertTypeIcon = (type: string) => {
  switch (type) {
    case 'performance':
      return <Cpu className="h-4 w-4" />;
    case 'billing':
      return <CreditCard className="h-4 w-4" />;
    case 'database':
      return <Database className="h-4 w-4" />;
    case 'security':
      return <Shield className="h-4 w-4" />;
    case 'storage':
      return <HardDrive className="h-4 w-4" />;
    case 'network':
      return <Wifi className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-900/50 text-red-400 hover:bg-red-900/70';
    case 'high':
      return 'bg-orange-900/50 text-orange-400 hover:bg-orange-900/70';
    case 'medium':
      return 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900/70';
    case 'low':
      return 'bg-blue-900/50 text-blue-400 hover:bg-blue-900/70';
    default:
      return 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-red-900/50 text-red-400';
    case 'acknowledged':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'resolved':
      return 'bg-green-900/50 text-green-400';
    case 'dismissed':
      return 'bg-gray-700/50 text-gray-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getEscalationColor = (level: number) => {
  switch (level) {
    case 0:
      return 'text-blue-400';
    case 1:
      return 'text-yellow-400';
    case 2:
      return 'text-orange-400';
    case 3:
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

export default function SystemAlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredAlerts = systemAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.affectedService.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || alert.status === selectedTab ||
                      (selectedTab === 'critical' && alert.severity === 'critical');
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    return matchesSearch && matchesTab && matchesSeverity && matchesType;
  });

  const stats = {
    total: systemAlerts.length,
    active: systemAlerts.filter(a => a.status === 'active').length,
    acknowledged: systemAlerts.filter(a => a.status === 'acknowledged').length,
    resolved: systemAlerts.filter(a => a.status === 'resolved').length,
    critical: systemAlerts.filter(a => a.severity === 'critical').length,
    high: systemAlerts.filter(a => a.severity === 'high').length,
    avgResolutionTime: 45 // minutes
  };

  const handleAlertAction = (action: string, alert: any) => {
    toast({
      title: `Alert ${action}`,
      description: `Alert ${alert.id} has been ${action.toLowerCase()}`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${selectedAlerts.length} alerts have been ${action.toLowerCase()}`,
    });
    setSelectedAlerts([]);
  };

  const toggleAlertSelection = (alertId: string) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">System Alerts</h1>
            <p className="text-gray-400 mt-2">Monitor and manage platform alerts and notifications</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Settings className="mr-2 h-4 w-4" />
              Alert Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Alerts</CardTitle>
              <Bell className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.active} active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.critical}</div>
              <p className="text-xs text-gray-400 mt-1">Immediate attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Resolution</CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.avgResolutionTime}m</div>
              <p className="text-xs text-gray-400 mt-1">Resolution time</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Acknowledged</CardTitle>
              <CheckCircle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.acknowledged}</div>
              <p className="text-xs text-gray-400 mt-1">Being handled</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-32 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
                {selectedAlerts.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                        Bulk Actions ({selectedAlerts.length})
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleBulkAction('Acknowledged')}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Acknowledge All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkAction('Resolved')}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkAction('Escalated')}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Escalate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleBulkAction('Dismissed')}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Dismiss
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                <TabsTrigger value="acknowledged" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Acknowledged ({stats.acknowledged})
                </TabsTrigger>
                <TabsTrigger value="resolved" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Resolved ({stats.resolved})
                </TabsTrigger>
                <TabsTrigger value="critical" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Critical ({stats.critical})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div key={alert.id} className="p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedAlerts.includes(alert.id)}
                          onChange={() => toggleAlertSelection(alert.id)}
                          className="mt-2 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                        />
                        
                        <div className="p-2 bg-gray-700/50 rounded-lg">
                          {getAlertTypeIcon(alert.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-semibold text-white">{alert.title}</h3>
                            <Badge className={getSeverityColor(alert.severity)}>
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                            </Badge>
                            <Badge className={getStatusColor(alert.status)}>
                              {alert.status === 'active' && <AlertTriangle className="mr-1 h-3 w-3" />}
                              {alert.status === 'acknowledged' && <Clock className="mr-1 h-3 w-3" />}
                              {alert.status === 'resolved' && <CheckCircle className="mr-1 h-3 w-3" />}
                              {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                            </Badge>
                            {alert.escalationLevel > 0 && (
                              <Badge className="bg-red-900/50 text-red-400">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Escalation Level {alert.escalationLevel}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-400 mb-4">{alert.description}</p>
                          
                          {/* Alert Metrics */}
                          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 mb-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Current Value:</span>
                                <span className="text-white ml-2 font-medium">
                                  {alert.metrics.currentValue}{alert.metrics.unit}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Threshold:</span>
                                <span className="text-white ml-2 font-medium">
                                  {alert.metrics.threshold}{alert.metrics.unit}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Service:</span>
                                <span className="text-white ml-2 font-medium">{alert.affectedService}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Source:</span>
                                <span className="text-white ml-2 font-medium">{alert.source}</span>
                              </div>
                            </div>
                          </div>

                          {/* Impact and Actions */}
                          <div className="space-y-3">
                            <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-700/30">
                              <div className="flex items-center space-x-2 mb-2">
                                <AlertTriangle className="h-4 w-4 text-orange-400" />
                                <span className="font-medium text-orange-300">Business Impact</span>
                              </div>
                              <p className="text-sm text-orange-200">{alert.impact}</p>
                            </div>

                            <div>
                              <h4 className="font-medium text-white mb-2">Suggested Actions</h4>
                              <div className="space-y-1">
                                {alert.actions.map((action, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    <span>{action}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Timeline */}
                          <div className="flex items-center space-x-6 text-sm text-gray-400 mt-4">
                            <div>
                              <span>Created: {new Date(alert.createdAt).toLocaleString()}</span>
                            </div>
                            {alert.acknowledgedBy && (
                              <div>
                                <span>Acknowledged by: {alert.acknowledgedBy}</span>
                              </div>
                            )}
                            {alert.resolvedBy && (
                              <div>
                                <span>Resolved by: {alert.resolvedBy}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAlertAction('Viewed', alert)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {alert.status === 'active' && (
                              <DropdownMenuItem onClick={() => handleAlertAction('Acknowledged', alert)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Acknowledge
                              </DropdownMenuItem>
                            )}
                            {alert.status !== 'resolved' && (
                              <DropdownMenuItem onClick={() => handleAlertAction('Resolved', alert)} className="text-green-400">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Resolved
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleAlertAction('Escalated', alert)} className="text-orange-400">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Escalate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleAlertAction('Notification Sent', alert)}>
                              <Send className="mr-2 h-4 w-4" />
                              Send Notification
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAlertAction('Dismissed', alert)} className="text-red-400">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Dismiss Alert
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}

                  {filteredAlerts.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="mx-auto h-12 w-12 text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-white">No alerts found</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {searchTerm ? 'Try adjusting your search terms.' : 'All systems are running smoothly!'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Alert Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Alert Trends</h3>
                  <p className="text-red-200 mb-4">
                    System alert patterns and resolution metrics
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Alerts Today</span>
                      <span className="font-medium text-white">{stats.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Resolution Rate</span>
                      <span className="font-medium text-white">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Avg Response</span>
                      <span className="font-medium text-white">12 minutes</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">System Health</h3>
                  <p className="text-blue-200 mb-4">
                    Overall platform health and stability
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Uptime: 99.97%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Performance: Excellent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Security: Strong</span>
                    </div>
                  </div>
                </div>
                <Activity className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}