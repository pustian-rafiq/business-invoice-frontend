import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon, Users, Building, CreditCard, DollarSign } from 'lucide-react';

const stats = [
  {
    name: 'Total Users',
    value: '12,458',
    change: '+8.2%',
    changeType: 'increase',
    description: 'from last month',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/50'
  },
  {
    name: 'Active Businesses',
    value: '3,247',
    change: '+12.5%',
    changeType: 'increase',
    description: 'from last month',
    icon: Building,
    color: 'text-green-400',
    bgColor: 'bg-green-900/50'
  },
  {
    name: 'Active Subscriptions',
    value: '2,891',
    change: '+5.1%',
    changeType: 'increase',
    description: 'from last month',
    icon: CreditCard,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/50'
  },
  {
    name: 'Monthly Revenue',
    value: '$89,420',
    change: '-2.3%',
    changeType: 'decrease',
    description: 'from last month',
    icon: DollarSign,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/50'
  },
];

export function SuperAdminStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.name}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor} border border-gray-700/30`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={stat.changeType === 'increase' ? 'default' : 'secondary'}
                className={`text-xs ${
                  stat.changeType === 'increase' 
                    ? 'bg-green-900/50 text-green-400 hover:bg-green-900/70' 
                    : 'bg-red-900/50 text-red-400 hover:bg-red-900/70'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {stat.change}
              </Badge>
              <CardDescription className="text-xs text-gray-400">
                {stat.description}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}