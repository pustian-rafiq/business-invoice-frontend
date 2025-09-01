import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon, DollarSign, FileText, Users, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Revenue',
    value: '$24,560',
    change: '+12.5%',
    changeType: 'increase',
    description: 'from last month',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    name: 'Invoices Sent',
    value: '148',
    change: '+8.2%',
    changeType: 'increase',
    description: 'from last month',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    name: 'Active Clients',
    value: '42',
    change: '+5.1%',
    changeType: 'increase',
    description: 'from last month',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    name: 'Pending Payments',
    value: '$8,420',
    change: '-2.3%',
    changeType: 'decrease',
    description: 'from last month',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.name}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={stat.changeType === 'increase' ? 'default' : 'secondary'}
                className={`text-xs ${
                  stat.changeType === 'increase' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {stat.change}
              </Badge>
              <CardDescription className="text-xs">
                {stat.description}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}