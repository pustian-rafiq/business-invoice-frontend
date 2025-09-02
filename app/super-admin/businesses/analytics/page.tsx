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
  Building,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Calendar,
  Crown,
  RefreshCw,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const businessGrowthData = [
  { month: 'Jan', businesses: 400, revenue: 15000, churn: 12 },
  { month: 'Feb', businesses: 600, revenue: 22000, churn: 18 },
  { month: 'Mar', businesses: 800, revenue: 28000, churn: 24 },
  { month: 'Apr', businesses: 1100, revenue: 35000, churn: 31 },
  { month: 'May', businesses: 1400, revenue: 42000, churn: 28 },
  { month: 'Jun', businesses: 1800, revenue: 51000, churn: 35 },
  { month: 'Jul', businesses: 2200, revenue: 62000, churn: 42 },
  { month: 'Aug', businesses: 2600, revenue: 71000, churn: 38 },
  { month: 'Sep', businesses: 3000, revenue: 78000, churn: 45 },
  { month: 'Oct', businesses: 3200, revenue: 85000, churn: 52 },
  { month: 'Nov', businesses: 3100, revenue: 89000, churn: 48 },
  { month: 'Dec', businesses: 3247, revenue: 89420, churn: 41 }
];

const planDistributionData = [
  { name: 'Free Trial', value: 1245, color: '#6B7280', revenue: 0 },
  { name: 'Personal', value: 1567, color: '#3B82F6', revenue: 45443 },
  { name: 'Team', value: 389, color: '#8B5CF6', revenue: 30731 },
  { name: 'Enterprise', value: 46, color: '#F59E0B', revenue: 13746 }
];

const industryData = [
  { industry: 'Technology', businesses: 892, revenue: 234500, growth: 15.2 },
  { industry: 'Consulting', businesses: 567, revenue: 156700, growth: 12.8 },
  { industry: 'Marketing', businesses: 445, revenue: 123400, growth: 18.5 },
  { industry: 'Healthcare', businesses: 334, revenue: 98600, growth: 9.7 },
  { industry: 'Finance', businesses: 289, revenue: 187300, growth: 22.1 },
  { industry: 'Education', businesses: 234, revenue: 67800, growth: 7.3 },
  { industry: 'Other', businesses: 486, revenue: 89200, growth: 11.4 }
];

const revenueByPlanData = [
  { plan: 'Personal', monthly: 45443, yearly: 545316, businesses: 1567 },
  { plan: 'Team', monthly: 30731, yearly: 368772, businesses: 389 },
  { plan: 'Enterprise', monthly: 13746, yearly: 164952, businesses: 46 }
];

export default function BusinessAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('businesses');

  const totalBusinesses = 3247;
  const totalRevenue = 89420;
  const monthlyGrowth = 4.7;
  const churnRate = 1.3;

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/super-admin/businesses">
              <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Businesses
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Business Analytics</h1>
              <p className="text-gray-400 mt-2">Comprehensive business performance and growth analytics</p>
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
                <Building className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{totalBusinesses.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Businesses</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Monthly Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">+{monthlyGrowth}%</div>
                  <div className="text-sm text-gray-400">Monthly Growth</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingDown className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{churnRate}%</div>
                  <div className="text-sm text-gray-400">Churn Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Business Growth Chart */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Business Growth Trend</CardTitle>
              <CardDescription className="text-gray-400">
                Monthly business registration and revenue growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={businessGrowthData}>
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
                                Businesses: {payload[0].value?.toLocaleString()}
                              </p>
                              <p className="text-sm text-green-400">
                                Revenue: ${payload[1].value?.toLocaleString()}
                              </p>
                              <p className="text-sm text-red-400">
                                Churn: {payload[2].value}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="businesses" 
                      stroke="#3B82F6" 
                      fill="url(#businessGradient)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10B981" 
                      fill="url(#revenueGradient)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="businessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Plan Distribution */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Subscription Plan Distribution</CardTitle>
              <CardDescription className="text-gray-400">
                Business distribution across subscription plans
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
                                {data.value.toLocaleString()} businesses ({((data.value / totalBusinesses) * 100).toFixed(1)}%)
                              </p>
                              <p className="text-sm text-green-400">
                                Revenue: ${data.revenue.toLocaleString()}/mo
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <RechartsPieChart data={planDistributionData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                      {planDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {planDistributionData.map((plan) => (
                  <div key={plan.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: plan.color }}
                    />
                    <span className="text-sm text-gray-300">{plan.name}</span>
                    <span className="text-sm text-white font-medium">{plan.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Industry Analysis */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Industry Breakdown</CardTitle>
            <CardDescription className="text-gray-400">
              Business distribution and performance by industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {industryData.map((industry, index) => (
                <div key={industry.industry} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-white">{industry.industry}</div>
                      <div className="text-sm text-gray-400">{industry.businesses} businesses</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="font-semibold text-white">${industry.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Revenue</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        industry.growth > 15 ? 'text-green-400' :
                        industry.growth > 10 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        +{industry.growth}%
                      </div>
                      <div className="text-sm text-gray-400">Growth</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Analysis */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Revenue by Subscription Plan</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly and yearly revenue breakdown by plan type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByPlanData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="plan" 
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
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg">
                            <p className="font-medium text-white">{label} Plan</p>
                            <p className="text-sm text-blue-400">
                              Monthly: ${data.monthly.toLocaleString()}
                            </p>
                            <p className="text-sm text-green-400">
                              Yearly: ${data.yearly.toLocaleString()}
                            </p>
                            <p className="text-sm text-purple-400">
                              Businesses: {data.businesses.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="monthly" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="yearly" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Insights Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Growth Insights</h3>
                  <p className="text-blue-200 mb-4">
                    Strong business acquisition with healthy growth
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Monthly growth: +{monthlyGrowth}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">New businesses: +147 this month</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-200">Enterprise adoption: +22%</span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Revenue Health</h3>
                  <p className="text-green-200 mb-4">
                    Excellent revenue performance and retention
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">ARPU: $27.54</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">Revenue growth: +15.8%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-green-300" />
                      <span className="text-green-200">LTV: $892</span>
                    </div>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Market Trends</h3>
                  <p className="text-purple-200 mb-4">
                    Industry trends and market opportunities
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-purple-300" />
                      <span className="text-purple-200">Top industry: Technology</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-purple-300" />
                      <span className="text-purple-200">Fastest growing: Finance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-300" />
                      <span className="text-purple-200">Avg team size: 7.8</span>
                    </div>
                  </div>
                </div>
                <BarChart3 className="h-12 w-12 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}