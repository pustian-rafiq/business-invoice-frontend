'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft,
  Search, 
  Filter, 
  Download,
  Eye, 
  Edit, 
  MoreHorizontal,
  CreditCard,
  Crown,
  DollarSign,
  AlertTriangle,
  Clock,
  Ban,
  RefreshCw,
  Building,
  Users,
  Calendar,
  Activity,
  Send,
  UserCheck,
  Trash2,
  Mail,
  Phone,
  XCircle,
  CheckCircle,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const subscriptionIssues = [
  {
    id: 'sub_issue_1',
    business: {
      id: '5',
      name: 'Failed Payments Co',
      logo: 'FP',
      owner: 'Mike Johnson',
      email: 'mike@failedpayments.com',
      phone: '+1 (555) 456-7890',
      industry: 'Marketing'
    },
    plan: {
      name: 'Team',
      price: 79.00,
      billingCycle: 'monthly',
      tier: 'team'
    },
    status: 'past_due',
    issue: {
      type: 'payment_failed',
      severity: 'high',
      description: 'Multiple payment failures - card declined',
      firstOccurred: '2025-01-20',
      lastAttempt: '2025-01-22',
      attemptCount: 4,
      nextRetry: '2025-01-25',
      autoSuspendDate: '2025-01-30'
    },
    paymentMethod: {
      type: 'Credit Card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/24',
      status: 'expired'
    },
    dunning: {
      emailsSent: 3,
      lastEmailSent: '2025-01-22',
      emailsOpened: 2,
      paymentPageVisits: 1,
      responseReceived: false
    },
    usage: {
      invoices: { used: 89, limit: 'unlimited' },
      clients: { used: 45, limit: 500 },
      teamMembers: { used: 7, limit: 15 }
    },
    metrics: {
      mrr: 0,
      ltv: 237.00,
      daysPastDue: 5,
      churnRisk: 'high',
      engagementScore: 62
    },
    resolution: {
      suggestedActions: ['Update payment method', 'Contact customer', 'Offer payment plan'],
      priority: 'high',
      assignedTo: 'Billing Team'
    }
  },
  {
    id: 'sub_issue_2',
    business: {
      id: '9',
      name: 'Disputed Charges LLC',
      logo: 'DC',
      owner: 'Lisa Chen',
      email: 'lisa@disputedcharges.com',
      phone: '+1 (555) 789-0123',
      industry: 'Legal'
    },
    plan: {
      name: 'Personal',
      price: 29.00,
      billingCycle: 'monthly',
      tier: 'personal'
    },
    status: 'disputed',
    issue: {
      type: 'chargeback',
      severity: 'critical',
      description: 'Customer initiated chargeback with bank',
      firstOccurred: '2025-01-18',
      lastAttempt: '2025-01-18',
      attemptCount: 1,
      nextRetry: null,
      autoSuspendDate: '2025-01-25'
    },
    paymentMethod: {
      type: 'Credit Card',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '06/26',
      status: 'disputed'
    },
    dunning: {
      emailsSent: 1,
      lastEmailSent: '2025-01-18',
      emailsOpened: 1,
      paymentPageVisits: 0,
      responseReceived: true
    },
    usage: {
      invoices: { used: 34, limit: 'unlimited' },
      clients: { used: 12, limit: 50 },
      teamMembers: { used: 1, limit: 1 }
    },
    metrics: {
      mrr: 0,
      ltv: 87.00,
      daysPastDue: 7,
      churnRisk: 'critical',
      engagementScore: 23
    },
    resolution: {
      suggestedActions: ['Investigate dispute', 'Contact customer urgently', 'Gather evidence'],
      priority: 'critical',
      assignedTo: 'Legal Team'
    }
  },
  {
    id: 'sub_issue_3',
    business: {
      id: '10',
      name: 'Overdue Invoices Inc',
      logo: 'OI',
      owner: 'Tom Wilson',
      email: 'tom@overdueinvoices.com',
      phone: '+1 (555) 321-9876',
      industry: 'Consulting'
    },
    plan: {
      name: 'Team',
      price: 79.00,
      billingCycle: 'monthly',
      tier: 'team'
    },
    status: 'payment_retry',
    issue: {
      type: 'insufficient_funds',
      severity: 'medium',
      description: 'Insufficient funds in linked bank account',
      firstOccurred: '2025-01-21',
      lastAttempt: '2025-01-23',
      attemptCount: 2,
      nextRetry: '2025-01-26',
      autoSuspendDate: '2025-02-05'
    },
    paymentMethod: {
      type: 'Bank Account',
      last4: '1234',
      brand: 'Chase Bank',
      expiry: null,
      status: 'insufficient_funds'
    },
    dunning: {
      emailsSent: 2,
      lastEmailSent: '2025-01-23',
      emailsOpened: 2,
      paymentPageVisits: 3,
      responseReceived: true
    },
    usage: {
      invoices: { used: 156, limit: 'unlimited' },
      clients: { used: 78, limit: 500 },
      teamMembers: { used: 12, limit: 15 }
    },
    metrics: {
      mrr: 0,
      ltv: 553.00,
      daysPastDue: 4,
      churnRisk: 'medium',
      engagementScore: 78
    },
    resolution: {
      suggestedActions: ['Retry payment', 'Suggest alternative payment method', 'Offer payment plan'],
      priority: 'medium',
      assignedTo: 'Customer Success'
    }
  }
];

const getIssueTypeColor = (type: string) => {
  switch (type) {
    case 'payment_failed':
      return 'bg-red-900/50 text-red-400';
    case 'chargeback':
      return 'bg-red-900/50 text-red-400';
    case 'insufficient_funds':
      return 'bg-orange-900/50 text-orange-400';
    case 'card_expired':
      return 'bg-yellow-900/50 text-yellow-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-900/50 text-red-400';
    case 'high':
      return 'bg-orange-900/50 text-orange-400';
    case 'medium':
      return 'bg-yellow-900/50 text-yellow-400';
    case 'low':
      return 'bg-blue-900/50 text-blue-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'text-red-400';
    case 'high':
      return 'text-orange-400';
    case 'medium':
      return 'text-yellow-400';
    case 'low':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
};

export default function SubscriptionIssuesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [issueFilter, setIssueFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredIssues = subscriptionIssues.filter(issue => {
    const matchesSearch = issue.business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIssue = issueFilter === 'all' || issue.issue.type === issueFilter;
    const matchesSeverity = severityFilter === 'all' || issue.issue.severity === severityFilter;
    return matchesSearch && matchesIssue && matchesSeverity;
  });

  const stats = {
    total: subscriptionIssues.length,
    critical: subscriptionIssues.filter(i => i.issue.severity === 'critical').length,
    high: subscriptionIssues.filter(i => i.issue.severity === 'high').length,
    medium: subscriptionIssues.filter(i => i.issue.severity === 'medium').length,
    totalAtRisk: subscriptionIssues.reduce((sum, i) => sum + i.plan.price, 0),
    avgDaysPastDue: subscriptionIssues.reduce((sum, i) => sum + i.metrics.daysPastDue, 0) / subscriptionIssues.length
  };

  const handleIssueAction = (action: string, issue: any) => {
    toast({
      title: `Issue ${action}`,
      description: `${issue.business.name} issue has been ${action.toLowerCase()}`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${selectedIssues.length} issues have been ${action.toLowerCase()}`,
    });
    setSelectedIssues([]);
  };

  const toggleIssueSelection = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/super-admin/subscriptions">
              <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Subscriptions
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Payment Issues</h1>
              <p className="text-gray-400 mt-2">Resolve subscription payment problems and billing disputes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Issues
            </Button>
            {selectedIssues.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    Bulk Actions ({selectedIssues.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleBulkAction('Retry Attempted')}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Payments
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('Contacted')}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('Suspended')}>
                    <Ban className="mr-2 h-4 w-4" />
                    Suspend Subscriptions
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction('Escalated')} className="text-orange-400">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Escalate to Team
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.critical} critical</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Revenue at Risk</CardTitle>
              <DollarSign className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalAtRisk}/mo</div>
              <p className="text-xs text-gray-400 mt-1">Monthly revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Days Past Due</CardTitle>
              <Clock className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{Math.round(stats.avgDaysPastDue)}</div>
              <p className="text-xs text-gray-400 mt-1">Days overdue</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Critical Issues</CardTitle>
              <XCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.critical}</div>
              <p className="text-xs text-gray-400 mt-1">Immediate attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payment issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={issueFilter} onValueChange={setIssueFilter}>
                  <SelectTrigger className="w-40 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Issues</SelectItem>
                    <SelectItem value="payment_failed">Payment Failed</SelectItem>
                    <SelectItem value="chargeback">Chargeback</SelectItem>
                    <SelectItem value="insufficient_funds">Insufficient Funds</SelectItem>
                    <SelectItem value="card_expired">Card Expired</SelectItem>
                  </SelectContent>
                </Select>
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Select All */}
              <div className="flex items-center space-x-2 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <input
                  type="checkbox"
                  checked={selectedIssues.length === filteredIssues.length && filteredIssues.length > 0}
                  onChange={() => {
                    if (selectedIssues.length === filteredIssues.length) {
                      setSelectedIssues([]);
                    } else {
                      setSelectedIssues(filteredIssues.map(i => i.id));
                    }
                  }}
                  className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-gray-300">
                  Select all {filteredIssues.length} payment issues
                </span>
              </div>

              {filteredIssues.map((issue) => (
                <div key={issue.id} className="p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedIssues.includes(issue.id)}
                      onChange={() => toggleIssueSelection(issue.id)}
                      className="mt-2 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                    />
                    
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg font-bold">
                        {issue.business.logo}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-white text-lg">{issue.business.name}</h3>
                        <Badge className={getIssueTypeColor(issue.issue.type)}>
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          {issue.issue.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                        <Badge className={getSeverityColor(issue.issue.severity)}>
                          <XCircle className="mr-1 h-3 w-3" />
                          {issue.issue.severity.charAt(0).toUpperCase() + issue.issue.severity.slice(1)}
                        </Badge>
                        <Badge className="bg-blue-900/50 text-blue-400">
                          <Building className="mr-1 h-3 w-3" />
                          {issue.business.industry}
                        </Badge>
                      </div>
                      
                      {/* Issue Description */}
                      <div className="p-3 bg-red-900/20 rounded-lg border border-red-700/30 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="font-medium text-red-300">Payment Issue</span>
                          <Badge className={`${getPriorityColor(issue.resolution.priority)} bg-gray-800/50`}>
                            {issue.resolution.priority.charAt(0).toUpperCase() + issue.resolution.priority.slice(1)} Priority
                          </Badge>
                        </div>
                        <div className="text-sm text-red-200">
                          <div className="mb-2">{issue.issue.description}</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>First occurred: {new Date(issue.issue.firstOccurred).toLocaleDateString()}</div>
                            <div>Attempts: {issue.issue.attemptCount}</div>
                            <div>Days past due: {issue.metrics.daysPastDue}</div>
                            <div>Next retry: {issue.issue.nextRetry ? new Date(issue.issue.nextRetry).toLocaleDateString() : 'None'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Owner Information */}
                      <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm">
                            {issue.business.owner.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{issue.business.owner}</div>
                          <div className="text-sm text-gray-400">{issue.business.email}</div>
                          <div className="text-sm text-gray-400">{issue.business.phone}</div>
                        </div>
                        <Badge className="bg-yellow-900/50 text-yellow-400">
                          <Crown className="mr-1 h-3 w-3" />
                          Owner
                        </Badge>
                      </div>

                      {/* Payment Method Info */}
                      <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-700/30 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CreditCard className="h-4 w-4 text-orange-400" />
                          <span className="font-medium text-orange-300">Payment Method</span>
                        </div>
                        <div className="text-sm text-orange-200">
                          <div>{issue.paymentMethod.type} ending in {issue.paymentMethod.last4}</div>
                          <div>Status: {issue.paymentMethod.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                          {issue.paymentMethod.expiry && (
                            <div>Expires: {issue.paymentMethod.expiry}</div>
                          )}
                        </div>
                      </div>

                      {/* Dunning Campaign Status */}
                      <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/30 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Mail className="h-4 w-4 text-blue-400" />
                          <span className="font-medium text-blue-300">Dunning Campaign</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
                          <div>Emails sent: {issue.dunning.emailsSent}</div>
                          <div>Emails opened: {issue.dunning.emailsOpened}</div>
                          <div>Page visits: {issue.dunning.paymentPageVisits}</div>
                          <div>Response: {issue.dunning.responseReceived ? 'Yes' : 'No'}</div>
                        </div>
                      </div>

                      {/* Suggested Actions */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Suggested Actions</h4>
                        <div className="flex flex-wrap gap-2">
                          {issue.resolution.suggestedActions.map((action, index) => (
                            <Badge key={index} className="bg-green-900/50 text-green-400">
                              {action}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-gray-400">
                          Assigned to: {issue.resolution.assignedTo}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="text-right mr-4">
                        <div className="text-lg font-bold text-white">${issue.plan.price}/mo</div>
                        <div className="text-sm text-gray-400">At risk</div>
                        <div className="text-xs text-gray-500 mt-1">
                          LTV: ${issue.metrics.ltv.toFixed(0)}
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleIssueAction('Viewed', issue)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIssueAction('Retry Attempted', issue)} className="text-blue-400">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retry Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIssueAction('Contacted', issue)}>
                            <Send className="mr-2 h-4 w-4" />
                            Contact Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIssueAction('Payment Method Updated', issue)} className="text-green-400">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Update Payment Method
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleIssueAction('Discount Offered', issue)}>
                            <Crown className="mr-2 h-4 w-4" />
                            Offer Discount
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIssueAction('Payment Plan Created', issue)}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Create Payment Plan
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleIssueAction('Suspended', issue)}
                            className="text-red-400"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}

              {filteredIssues.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <h3 className="mt-2 text-sm font-medium text-white">No payment issues found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {searchTerm ? 'Try adjusting your search terms.' : 'All subscriptions are in good standing!'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Issue Resolution Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Issue Resolution</h3>
                  <p className="text-red-200 mb-4">
                    Payment issue resolution rates and recovery metrics
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Resolution Rate</span>
                      <span className="font-medium text-white">67%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Avg Resolution Time</span>
                      <span className="font-medium text-white">3.2 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Recovery Rate</span>
                      <span className="font-medium text-white">45%</span>
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
                  <h3 className="text-lg font-semibold mb-2 text-white">Dunning Performance</h3>
                  <p className="text-blue-200 mb-4">
                    Email campaign effectiveness and customer response
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Email Open Rate</span>
                      <span className="font-medium text-white">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Click Rate</span>
                      <span className="font-medium text-white">34%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Payment Rate</span>
                      <span className="font-medium text-white">23%</span>
                    </div>
                  </div>
                </div>
                <Mail className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}