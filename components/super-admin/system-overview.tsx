import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Database, Server, Cpu, HardDrive, Globe } from 'lucide-react';

const systemMetrics = [
  {
    name: 'System Uptime',
    value: '99.9%',
    status: 'healthy',
    icon: Activity,
    description: 'Last 30 days'
  },
  {
    name: 'Database Status',
    value: 'Online',
    status: 'healthy',
    icon: Database,
    description: 'All connections active'
  },
  {
    name: 'API Response Time',
    value: '120ms',
    status: 'healthy',
    icon: Server,
    description: 'Average response'
  },
  {
    name: 'CPU Usage',
    value: '45%',
    status: 'warning',
    icon: Cpu,
    description: 'Current load'
  },
  {
    name: 'Storage Used',
    value: '62%',
    status: 'healthy',
    icon: HardDrive,
    description: '2.1TB of 3.5TB'
  },
  {
    name: 'CDN Status',
    value: 'Active',
    status: 'healthy',
    icon: Globe,
    description: 'All regions online'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'bg-green-900/50 text-green-400 hover:bg-green-900/70';
    case 'warning':
      return 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900/70';
    case 'critical':
      return 'bg-red-900/50 text-red-400 hover:bg-red-900/70';
    default:
      return 'bg-gray-900/50 text-gray-400 hover:bg-gray-900/70';
  }
};

export function SystemOverview() {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">System Overview</CardTitle>
        <CardDescription className="text-gray-400">
          Real-time system health and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemMetrics.map((metric) => (
            <div key={metric.name} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-700/50">
                  <metric.icon className="h-4 w-4 text-gray-300" />
                </div>
                <div>
                  <div className="font-medium text-white">{metric.name}</div>
                  <div className="text-sm text-gray-400">{metric.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-white mb-1">{metric.value}</div>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}