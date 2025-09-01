'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentsDatatable, type Payment } from '@/components/payments/payments-datatable';
import { 
  Plus, 
  Download, 
  Upload,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  CreditCard,
  Building,
  Globe,
  BarChart3,
  Calendar,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const mockPayments: Payment[] = [
  {
    id: 'PAY-001234',
    invoiceId: 'INV-001234',
    client: {
      name: 'John Doe',
      company: 'Acme Corporation',
      avatar: 'AC'
    },
    amount: 2500.00,
    method: 'Credit Card',
    status: 'completed',
    date: '2025-01-15T10:30:00Z',
    transactionId: 'txn_1234567890',
    currency: '$',
    fees: 75.00,
    netAmount: 2425.00,
    gateway: 'Stripe',
    reference: 'Payment for web development services'
  },
  {
    id: 'PAY-001235',
    invoiceId: 'INV-001235',
    client: {
      name: 'Jane Smith',
      company: 'Tech Solutions Inc',
      avatar: 'TS'
    },
    amount: 1800.00,
    method: 'Bank Transfer',
    status: 'pending',
    date: '2025-01-14T14:20:00Z',
    transactionId: 'txn_1234567891',
    currency: '$',
    fees: 25.00,
    netAmount: 1775.00,
    gateway: 'Bank Wire',
    reference: 'Monthly retainer payment'
  },
  {
    id: 'PAY-001236',
    invoiceId: 'INV-001236',
    client: {
      name: 'Mike Johnson',
      company: 'Digital Marketing Pro',
      avatar: 'DM'
    },
    amount: 3200.00,
    method: 'PayPal',
    status: 'processing',
    date: '2025-01-13T09:15:00Z',
    transactionId: 'txn_1234567892',
    currency: '$',
    fees: 96.00,
    netAmount: 3104.00,
    gateway: 'PayPal',
    reference: 'Marketing campaign setup'
  },
  {
    id: 'PAY-001237',
    invoiceId: 'INV-001237',
    client: {
      name: 'Sarah Wilson',
      company: 'StartupXYZ',
      avatar: 'SX'
    },
    amount: 950.00,
    method: 'Credit Card',
    status: 'failed',
    date: '2025-01-12T16:45:00Z',
    transactionId: 'txn_1234567893',
    currency: '$',
    fees: 0,
    netAmount: 0,
    gateway: 'Stripe',
    reference: 'Consulting services'
  },
  {
    id: 'PAY-001238',
    invoiceId: 'INV-001238',
    client: {
      name: 'David Brown',
      company: 'Global Ventures',
      avatar: 'GV'
    },
    amount: 4500.00,
    method: 'Wire Transfer',
    status: 'completed',
    date: '2025-01-11T11:30:00Z',
    transactionId: 'txn_1234567894',
    currency: '$',
    fees: 45.00,
    netAmount: 4455.00,
    gateway: 'Bank Wire',
    reference: 'Project milestone payment'
  },
  {
    id: 'PAY-001239',
    invoiceId: 'INV-001239',
    client: {
      name: 'Lisa Chen',
      company: 'Design Studio',
      avatar: 'DS'
    },
    amount: 1200.00,
    method: 'Square',
    status: 'refunded',
    date: '2025-01-10T13:20:00Z',
    transactionId: 'txn_1234567895',
    currency: '$',
    fees: 36.00,
    netAmount: 1164.00,
    gateway: 'Square',
    reference: 'Design services - refunded due to scope change'
  }
];

export default function PaymentsPage() {
  const { toast } = useToast();

  const stats = {
    total: mockPayments.length,
    completed: mockPayments.filter(p => p.status === 'completed').length,
    pending: mockPayments.filter(p => p.status === 'pending').length,
    failed: mockPayments.filter(p => p.status === 'failed').length,
    totalAmount: mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    totalFees: mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.fees, 0),
    netAmount: mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.netAmount, 0),
    processing: mockPayments.filter(p => p.status === 'processing').length
  };

  const handleViewPayment = (payment: Payment) => {
    toast({
      title: "Payment Details",
      description: `Viewing payment ${payment.id} for ${payment.client.company}`,
    });
  };

  const handleEditPayment = (payment: Payment) => {
    toast({
      title: "Edit Payment",
      description: `Editing payment ${payment.id}`,
    });
  };

  const handleDeletePayment = (payment: Payment) => {
    toast({
      title: "Delete Payment",
      description: `Payment ${payment.id} has been deleted`,
      variant: "destructive"
    });
  };

  const handleRefundPayment = (payment: Payment) => {
    toast({
      title: "Refund Initiated",
      description: `Refund for payment ${payment.id} has been initiated`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600 mt-2">Track and manage all your payment transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/dashboard/payments/methods">
              <Button variant="outline" className="bg-white/60 border-white/30">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
            </Link>
            <Link href="/dashboard/payments/create">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Record Payment
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Payments</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">{stats.completed} completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Amount</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.totalAmount.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Gross revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Net Amount</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.netAmount.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">After fees: ${stats.totalFees.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pending + stats.processing}</div>
              <p className="text-xs text-gray-500 mt-1">{stats.failed} failed</p>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">Payment History</CardTitle>
                <CardDescription className="text-gray-600">
                  Complete record of all payment transactions
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PaymentsDatatable
              data={mockPayments}
              onViewPayment={handleViewPayment}
              onEditPayment={handleEditPayment}
              onDeletePayment={handleDeletePayment}
              onRefundPayment={handleRefundPayment}
            />
          </CardContent>
        </Card>

        {/* Payment Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Methods Performance</h3>
                  <p className="text-blue-100 mb-4">
                    Track which payment methods your clients prefer
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Credit Cards</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Bank Transfers</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">PayPal</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>
                <BarChart3 className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Insights</h3>
                  <p className="text-green-100 mb-4">
                    AI-powered insights to optimize your payment flow
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-200" />
                      <span className="text-green-100">Average payment time: 12 days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-200" />
                      <span className="text-green-100">Payment success rate: 94%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-200" />
                      <span className="text-green-100">Monthly growth: +15%</span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common payment-related tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/payments/create">
                <Button variant="outline" className="w-full h-auto p-4 justify-start bg-white/60 border-white/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Record Payment</div>
                      <div className="text-sm text-gray-600">Log a new payment</div>
                    </div>
                  </div>
                </Button>
              </Link>

              <Link href="/dashboard/payments/methods">
                <Button variant="outline" className="w-full h-auto p-4 justify-start bg-white/60 border-white/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Payment Methods</div>
                      <div className="text-sm text-gray-600">Manage gateways</div>
                    </div>
                  </div>
                </Button>
              </Link>

              <Button variant="outline" className="w-full h-auto p-4 justify-start bg-white/60 border-white/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Payment Reports</div>
                    <div className="text-sm text-gray-600">View analytics</div>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full h-auto p-4 justify-start bg-white/60 border-white/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Reconciliation</div>
                    <div className="text-sm text-gray-600">Match payments</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}