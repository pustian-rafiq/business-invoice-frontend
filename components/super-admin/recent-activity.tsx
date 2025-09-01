import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  UserPlus, 
  Building, 
  CreditCard, 
  AlertTriangle, 
  Shield,
  Settings
} from 'lucide-react';

const recentActivities = [
  {
    id: 1,
    type: 'user_registration',
    user: 'John Doe',
    business: 'Acme Corp',
    action: 'New user registered',
    timestamp: '5 minutes ago',
    icon: UserPlus,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/50'
  },
  {
    id: 2,
    type: 'subscription_upgrade',
    user: 'Jane Smith',
    business: 'Tech Solutions',
    action: 'Upgraded to Team plan',
    timestamp: '15 minutes ago',
    icon: CreditCard,
    color: 'text-green-400',
    bgColor: 'bg-green-900/50'
  },
  {
    id: 3,
    type: 'business_created',
    user: 'Mike Johnson',
    business: 'Digital Agency',
    action: 'Created new business',
    timestamp: '32 minutes ago',
    icon: Building,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/50'
  },
  {
    id: 4,
    type: 'security_alert',
    user: 'System',
    business: 'Platform',
    action: 'Multiple failed login attempts',
    timestamp: '1 hour ago',
    icon: Shield,
    color: 'text-red-400',
    bgColor: 'bg-red-900/50'
  },
  {
    id: 5,
    type: 'system_alert',
    user: 'System',
    business: 'Platform',
    action: 'High CPU usage detected',
    timestamp: '2 hours ago',
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/50'
  },
  {
    id: 6,
    type: 'settings_changed',
    user: 'Admin',
    business: 'Platform',
    action: 'Updated system configuration',
    timestamp: '3 hours ago',
    icon: Settings,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-900/50'
  }
];

const getActivityTypeLabel = (type: string) => {
  switch (type) {
    case 'user_registration':
      return 'User';
    case 'subscription_upgrade':
      return 'Billing';
    case 'business_created':
      return 'Business';
    case 'security_alert':
      return 'Security';
    case 'system_alert':
      return 'System';
    case 'settings_changed':
      return 'Config';
    default:
      return 'Other';
  }
};

const getActivityTypeColor = (type: string) => {
  switch (type) {
    case 'user_registration':
      return 'bg-blue-900/50 text-blue-400';
    case 'subscription_upgrade':
      return 'bg-green-900/50 text-green-400';
    case 'business_created':
      return 'bg-purple-900/50 text-purple-400';
    case 'security_alert':
      return 'bg-red-900/50 text-red-400';
    case 'system_alert':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'settings_changed':
      return 'bg-indigo-900/50 text-indigo-400';
    default:
      return 'bg-gray-900/50 text-gray-400';
  }
};

export function RecentActivity() {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Recent Activity</CardTitle>
        <CardDescription className="text-gray-400">
          Latest platform activities and system events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
              <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-white truncate">{activity.action}</p>
                  <Badge className={getActivityTypeColor(activity.type)}>
                    {getActivityTypeLabel(activity.type)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{activity.user}</span>
                  {activity.business !== 'Platform' && (
                    <>
                      <span>•</span>
                      <span>{activity.business}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{activity.timestamp}</span>
                </div>
              </div>
              
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}