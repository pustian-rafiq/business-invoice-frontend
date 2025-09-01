'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', users: 1200, businesses: 400, revenue: 15000 },
  { name: 'Feb', users: 1800, businesses: 600, revenue: 22000 },
  { name: 'Mar', users: 2400, businesses: 800, revenue: 28000 },
  { name: 'Apr', users: 3200, businesses: 1100, revenue: 35000 },
  { name: 'May', users: 4100, businesses: 1400, revenue: 42000 },
  { name: 'Jun', users: 5200, businesses: 1800, revenue: 51000 },
  { name: 'Jul', users: 6500, businesses: 2200, revenue: 62000 },
  { name: 'Aug', users: 7800, businesses: 2600, revenue: 71000 },
  { name: 'Sep', users: 9200, businesses: 3000, revenue: 78000 },
  { name: 'Oct', users: 10800, businesses: 3200, revenue: 85000 },
  { name: 'Nov', users: 11900, businesses: 3100, revenue: 89000 },
  { name: 'Dec', users: 12458, businesses: 3247, revenue: 89420 },
];

export function PlatformMetrics() {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-white">Platform Growth</CardTitle>
          <CardDescription className="text-gray-400">
            User registration and business creation trends
          </CardDescription>
        </div>
        <Select defaultValue="12months">
          <SelectTrigger className="w-32 bg-gray-700/50 border-gray-600/50 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
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
                          Users: {payload[0].value?.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-400">
                          Businesses: {payload[1].value?.toLocaleString()}
                        </p>
                        <p className="text-sm text-purple-400">
                          Revenue: ${payload[2].value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#3B82F6" 
                fill="url(#userGradient)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="businesses" 
                stroke="#10B981" 
                fill="url(#businessGradient)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8B5CF6" 
                fill="url(#revenueGradient)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="businessGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}