'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Download,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 1200, active: 1100, new: 150 },
  { month: 'Feb', users: 1800, active: 1650, new: 600 },
  { month: 'Mar', users: 2400, active: 2200, new: 600 },
  { month: 'Apr', users: 3200, active: 2950, new: 800 },
  { month: 'May', users: 4100, active: 3800, new: 900 },
  { month: 'Jun', users: 5200, active: 4850, new: 1100 },
  { month: 'Jul', users: 6500, active: 6100, new: 1300 },
  { month: 'Aug', users: 7800, active: 7300, new: 1300 },
  { month: 'Sep', users: 9200, active: 8650, new: 1400 },
  { month: 'Oct', users: 10800, active: 10200, new: 1600 },
  { month: 'Nov', users: 11900, active: 11300, new: 1100 },
  { month: 'Dec', users: 12458, active: 11850, new: 558 }
];

const roleDistributionData = [
  { name: 'Business Owners', value: 3247, color: '#8B5CF6' },
  { name: 'Team Members', value: 8934, color: '#3B82F6' },
  { name: 'Admins', value: 245, color: '#F59E0B' },
  { name: 'Super Admins', value: 32, color: '#EF4444' }
];

const activityData = [
  { hour: '00:00', logins: 45, actions: 120 },
  { hour: '04:00', logins: 23, actions: 67 },
  { hour: '08:00', logins: 234, actions: 890 },
  { hour: '12:00', logins: 456, actions: 1234 },
  { hour: '16:00', logins: 345, actions: 987 },
  { hour: '20:00', logins: 123, actions: 456 }
];

const geographicData = [
  { country: 'United States', users: 5678, percentage: 45.6 },
  { country: 'Canada', users: 1234, percentage: 9.9 },
  { country: 'United Kingdom', users: 987, percentage: 7.9 },
  { country: 'Germany', users: 765, percentage: 6.1 },
  { country: 'Australia', users: 543, percentage: 4.4 },
  { country: 'Others', users: 3251, percentage: 26.1 }
];

export default function UserAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12months');

  const totalUsers = 12458;
  const activeUsers = 11850;
  const newUsersThisMonth = 558;
  const growthRate = 4.7;

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
              <h1 className="text-3xl font-bold text-white">User Analytics</h1>
              <p className="text-gray-400 mt-2">Comprehensive user behavior and platform usage analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 bg-gray-700/50 border-gray-600/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">+{newUsersThisMonth}</div>
                  <div className="text-sm text-gray-400">New This Month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">+{growthRate}%</div>
                  <div className="text-sm text-gray-400">Growth Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Growth Chart */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">User Growth Trend</CardTitle>
              <CardDescription className="text-gray-400">
                Monthly user registration and activity trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="month" 
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
                                Total: {payload[0].value?.toLocaleString()}
                              </p>
                              <p className="text-sm text-green-400">
                                Active: {payload[1].value?.toLocaleString()}
                              </p>
                              <p className="text-sm text-purple-400">
                                New: {payload[2].value?.toLocaleString()}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="new" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Role Distribution */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">User Role Distribution</CardTitle>
              <CardDescription className="text-gray-400">
                Breakdown of users by role and access level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg">
                              <p className="font-medium text-white">{data.name}</p>
                              <p className="text-sm text-gray-300">
                                {data.value.toLocaleString()} users ({((data.value / totalUsers) * 100).toFixed(1)}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <RechartsPieChart data={roleDistributionData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                      {roleDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {roleDistributionData.map((role) => (
                  <div key={role.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: role.color }}
                    />
                    <span className="text-sm text-gray-300">{role.name}</span>
                    <span className="text-sm text-white font-medium">{role.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Patterns */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Daily Activity Patterns</CardTitle>
            <CardDescription className="text-gray-400">
              User login and activity patterns throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
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
                            <p className="text-sm text-blue-400">
                              Logins: {payload[0].value?.toLocaleString()}
                            </p>
                            <p className="text-sm text-green-400">
                              Actions: {payload[1].value?.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="logins" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actions" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Geographic Distribution</CardTitle>
            <CardDescription className="text-gray-400">
              User distribution by country and region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geographicData.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-white">{country.country}</div>
                      <div className="text-sm text-gray-400">{country.percentage}% of total users</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{country.users.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">users</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">User Engagement</h3>
                  <p className="text-blue-200 mb-4">
                    High user engagement with 95.1% active rate
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Daily active users: 8,450</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Avg session: 42 minutes</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Growth Metrics</h3>
                  <p className="text-green-200 mb-4">
                    Steady growth with {growthRate}% monthly increase
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">Monthly growth: +{growthRate}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">Retention rate: 92.3%</span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Platform Health</h3>
                  <p className="text-purple-200 mb-4">
                    Excellent platform health with low churn
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-purple-300" />
                      <span className="text-purple-200">Churn rate: 2.1%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-purple-300" />
                      <span className="text-purple-200">Global reach: 45 countries</span>
                    </div>
                  </div>
                </div>
                <Globe className="h-12 w-12 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}