'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Building,
  Calendar,
  DollarSign,
  FileText,
  CreditCard,
  Activity,
  Plus,
  Eye,
  Download,
  Send,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users
} from 'lucide-react';
import Link from 'next/link';

// Mock client data
const clientData = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@acme.com',
  phone: '+1 (555) 123-4567',
  company: 'Acme Corporation',
  jobTitle: 'CEO',
  website: 'https://acme.com',
  industry: 'Technology',
  address: '123 Business St, New York, NY 10001',
  taxId: 'TAX123456789',
  paymentTerms: '30 days',
  currency: 'USD',
  creditLimit: 50000,
  status: 'active',
  joinedDate: '2024-03-15',
  lastActivity: '2025-01-15',
  avatar: 'JD',
  tags: ['VIP', 'Corporate'],
  notes: 'Important client with high volume orders. Prefers email communication.',
  
  // Statistics
  totalInvoices: 12,
  totalAmount: 25600.00,
  paidAmount: 22100.00,
  pendingAmount: 3500.00,
  overdueAmount: 0,
  averagePaymentTime: 18, // days
  
  // Recent invoices
  recentInvoices: [
    {
      id: 'INV-001234',
      amount: 2500.00,
      status: 'paid',
      dueDate: '2025-01-15',
      issueDate: '2025-01-01'
    },
    {
      id: 'INV-001235',
      amount: 1800.00,
      status: 'pending',
      dueDate: '2025-01-20',
      issueDate: '2025-01-05'
    },
    {
      id: 'INV-001236',
      amount: 3200.00,
      status: 'sent',
      dueDate: '2025-01-25',
      issueDate: '2025-01-10'
    }
  ],
  
  // Activity log
  activities: [
    {
      id: 1,
      type: 'payment',
      description: 'Payment received for Invoice #INV-001234',
      amount: 2500.00,
      date: '2025-01-15T10:30:00Z'
    },
    {
      id: 2,
      type: 'invoice',
      description: 'Invoice #INV-001236 sent',
      date: '2025-01-10T14:20:00Z'
    },
    {
      id: 3,
      type: 'communication',
      description: 'Email sent regarding payment terms',
      date: '2025-01-08T09:15:00Z'
    },
    {
      id: 4,
      type: 'invoice',
      description: 'Invoice #INV-001235 created',
      date: '2025-01-05T16:45:00Z'
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
    case 'sent':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    case 'overdue':
      return 'bg-red-100 text-red-700 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'paid':
      return <CheckCircle className="h-4 w-4" />;
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'sent':
      return <Send className="h-4 w-4" />;
    case 'overdue':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'payment':
      return <DollarSign className="h-4 w-4 text-green-500" />;
    case 'invoice':
      return <FileText className="h-4 w-4 text-blue-500" />;
    case 'communication':
      return <Mail className="h-4 w-4 text-purple-500" />;
    default:
      return <Activity className="h-4 w-4 text-gray-500" />;
  }
};

export default function ClientDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/clients">
              <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Clients
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-bold">
                  {clientData.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {clientData.firstName} {clientData.lastName}
                </h1>
                <p className="text-gray-600">{clientData.jobTitle} at {clientData.company}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {clientData.status.charAt(0).toUpperCase() + clientData.status.slice(1)}
                  </Badge>
                  {clientData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-blue-100 text-blue-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Link href="/dashboard/invoices/create">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </Link>
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{clientData.totalInvoices}</div>
                  <div className="text-sm text-gray-600">Total Invoices</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">${clientData.totalAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">${clientData.pendingAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Pending Amount</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{clientData.averagePaymentTime}</div>
                  <div className="text-sm text-gray-600">Avg Payment Days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-100/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{clientData.email}</div>
                            <div className="text-sm text-gray-500">Email Address</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{clientData.phone}</div>
                            <div className="text-sm text-gray-500">Phone Number</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Building className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{clientData.website}</div>
                            <div className="text-sm text-gray-500">Website</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <div className="font-medium text-gray-900">{clientData.address}</div>
                            <div className="text-sm text-gray-500">Address</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {new Date(clientData.joinedDate).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">Client Since</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Invoices */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Invoices</CardTitle>
                    <Link href="/dashboard/invoices">
                      <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                        View All
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientData.recentInvoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-white/20">
                          <div className="flex items-center space-x-4">
                            <div>
                              <div className="font-medium text-gray-900">{invoice.id}</div>
                              <div className="text-sm text-gray-500">
                                Issued: {new Date(invoice.issueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">${invoice.amount.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">
                                Due: {new Date(invoice.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(invoice.status)} flex items-center space-x-1`}>
                              {getStatusIcon(invoice.status)}
                              <span>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Business Details */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Business Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">Industry</div>
                      <div className="font-medium text-gray-900">{clientData.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tax ID</div>
                      <div className="font-medium text-gray-900">{clientData.taxId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Payment Terms</div>
                      <div className="font-medium text-gray-900">{clientData.paymentTerms}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Currency</div>
                      <div className="font-medium text-gray-900">{clientData.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Credit Limit</div>
                      <div className="font-medium text-gray-900">${clientData.creditLimit.toLocaleString()}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{clientData.notes}</p>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="secondary" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        Create Invoice
                      </Button>
                      <Button variant="secondary" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </Button>
                      <Button variant="secondary" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>All Invoices</CardTitle>
                <CardDescription>Complete invoice history for this client</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.recentInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-white/20 hover:bg-white/80 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-medium text-gray-900">{invoice.id}</div>
                          <div className="text-sm text-gray-500">
                            Issued: {new Date(invoice.issueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${invoice.amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">
                            Due: {new Date(invoice.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(invoice.status)} flex items-center space-x-1`}>
                          {getStatusIcon(invoice.status)}
                          <span>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Recent interactions and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientData.activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{activity.description}</p>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                        </div>
                        {activity.amount && (
                          <p className="text-sm text-green-600 font-medium">
                            ${activity.amount.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Client Settings</CardTitle>
                <CardDescription>Manage client preferences and configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Send invoice and payment notifications</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Auto-Reminders</h4>
                    <p className="text-sm text-gray-500">Automatic payment reminder emails</p>
                  </div>
                  <Button variant="outline" size="sm">Setup</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Credit Limit Alerts</h4>
                    <p className="text-sm text-gray-500">Notify when approaching credit limit</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="pt-6 border-t">
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Client
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}