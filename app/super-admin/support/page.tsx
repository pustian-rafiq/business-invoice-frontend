'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  HelpCircle,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Activity,
  Send,
  RefreshCw,
  Star,
  Flag,
  Paperclip,
  Users,
  BarChart3,
  TrendingUp,
  Zap,
  Shield,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const mockTickets = [
  {
    id: 'TKT-001234',
    subject: 'Unable to send invoices - SMTP error',
    description: 'Getting SMTP authentication errors when trying to send invoices to clients. This started happening yesterday.',
    customer: {
      name: 'John Doe',
      email: 'john@acme.com',
      company: 'Acme Corporation',
      avatar: 'JD',
      plan: 'Team',
      userId: 'user_123'
    },
    status: 'open',
    priority: 'high',
    category: 'technical',
    assignedTo: {
      name: 'Sarah Tech',
      avatar: 'ST',
      department: 'Technical Support'
    },
    createdAt: '2025-01-15T09:30:00Z',
    updatedAt: '2025-01-15T14:20:00Z',
    firstResponseTime: 45, // minutes
    resolutionTime: null,
    tags: ['smtp', 'email', 'invoicing'],
    attachments: 2,
    responses: 3,
    satisfaction: null,
    escalated: false,
    sla: {
      responseTarget: 60, // minutes
      resolutionTarget: 480, // minutes (8 hours)
      breached: false
    },
    relatedTickets: ['TKT-001230', 'TKT-001228'],
    businessImpact: 'high'
  },
  {
    id: 'TKT-001235',
    subject: 'Billing question about team member limits',
    description: 'I was charged for additional team members but I only have 3 people on my team. Can you help clarify the billing?',
    customer: {
      name: 'Jane Smith',
      email: 'jane@techsol.com',
      company: 'Tech Solutions Inc',
      avatar: 'JS',
      plan: 'Personal',
      userId: 'user_456'
    },
    status: 'pending',
    priority: 'medium',
    category: 'billing',
    assignedTo: {
      name: 'Mike Billing',
      avatar: 'MB',
      department: 'Billing Support'
    },
    createdAt: '2025-01-14T16:45:00Z',
    updatedAt: '2025-01-15T10:15:00Z',
    firstResponseTime: 120,
    resolutionTime: null,
    tags: ['billing', 'team-limits', 'charges'],
    attachments: 1,
    responses: 2,
    satisfaction: null,
    escalated: false,
    sla: {
      responseTarget: 240,
      resolutionTarget: 1440,
      breached: false
    },
    relatedTickets: [],
    businessImpact: 'medium'
  },
  {
    id: 'TKT-001236',
    subject: 'Feature request: Custom invoice templates',
    description: 'Would love to have more customization options for invoice templates. Our brand requires specific colors and layouts.',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@digipro.com',
      company: 'Digital Marketing Pro',
      avatar: 'MJ',
      plan: 'Team',
      userId: 'user_789'
    },
    status: 'resolved',
    priority: 'low',
    category: 'feature_request',
    assignedTo: {
      name: 'Lisa Product',
      avatar: 'LP',
      department: 'Product Team'
    },
    createdAt: '2025-01-12T11:20:00Z',
    updatedAt: '2025-01-14T15:30:00Z',
    firstResponseTime: 180,
    resolutionTime: 2880, // 48 hours
    tags: ['feature-request', 'templates', 'customization'],
    attachments: 3,
    responses: 5,
    satisfaction: 5,
    escalated: false,
    sla: {
      responseTarget: 480,
      resolutionTarget: 4320,
      breached: false
    },
    relatedTickets: ['TKT-001200', 'TKT-001195'],
    businessImpact: 'low'
  },
  {
    id: 'TKT-001237',
    subject: 'URGENT: Payment gateway not working',
    description: 'Our payment gateway integration is completely broken. Customers cannot pay invoices. This is costing us money!',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarah@startupxyz.com',
      company: 'StartupXYZ',
      avatar: 'SW',
      plan: 'Personal',
      userId: 'user_101'
    },
    status: 'escalated',
    priority: 'critical',
    category: 'technical',
    assignedTo: {
      name: 'Alex Senior',
      avatar: 'AS',
      department: 'Senior Engineering'
    },
    createdAt: '2025-01-15T08:15:00Z',
    updatedAt: '2025-01-15T08:45:00Z',
    firstResponseTime: 15,
    resolutionTime: null,
    tags: ['urgent', 'payment-gateway', 'integration', 'revenue-impact'],
    attachments: 5,
    responses: 1,
    satisfaction: null,
    escalated: true,
    sla: {
      responseTarget: 30,
      resolutionTarget: 240,
      breached: false
    },
    relatedTickets: [],
    businessImpact: 'critical'
  },
  {
    id: 'TKT-001238',
    subject: 'How to export client data?',
    description: 'I need to export all my client data for my accountant. Can you guide me through the process?',
    customer: {
      name: 'David Brown',
      email: 'david@globalventures.com',
      company: 'Global Ventures',
      avatar: 'DB',
      plan: 'Enterprise',
      userId: 'user_202'
    },
    status: 'closed',
    priority: 'low',
    category: 'how_to',
    assignedTo: {
      name: 'Emma Support',
      avatar: 'ES',
      department: 'Customer Success'
    },
    createdAt: '2025-01-13T14:30:00Z',
    updatedAt: '2025-01-13T16:45:00Z',
    firstResponseTime: 30,
    resolutionTime: 135,
    tags: ['how-to', 'export', 'data'],
    attachments: 0,
    responses: 2,
    satisfaction: 5,
    escalated: false,
    sla: {
      responseTarget: 480,
      resolutionTarget: 4320,
      breached: false
    },
    relatedTickets: [],
    businessImpact: 'low'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-blue-900/50 text-blue-400 hover:bg-blue-900/70';
    case 'pending':
      return 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900/70';
    case 'escalated':
      return 'bg-red-900/50 text-red-400 hover:bg-red-900/70';
    case 'resolved':
      return 'bg-green-900/50 text-green-400 hover:bg-green-900/70';
    case 'closed':
      return 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70';
    default:
      return 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open':
      return <MessageSquare className="h-4 w-4" />;
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'escalated':
      return <Flag className="h-4 w-4" />;
    case 'resolved':
      return <CheckCircle className="h-4 w-4" />;
    case 'closed':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
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

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'technical':
      return 'bg-red-900/50 text-red-400';
    case 'billing':
      return 'bg-green-900/50 text-green-400';
    case 'feature_request':
      return 'bg-purple-900/50 text-purple-400';
    case 'how_to':
      return 'bg-blue-900/50 text-blue-400';
    case 'bug_report':
      return 'bg-orange-900/50 text-orange-400';
    default:
      return 'bg-gray-700/50 text-gray-400';
  }
};

const getBusinessImpactColor = (impact: string) => {
  switch (impact) {
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

export default function SupportTicketsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || ticket.status === selectedTab ||
                      (selectedTab === 'urgent' && ['critical', 'high'].includes(ticket.priority));
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    return matchesSearch && matchesTab && matchesPriority && matchesCategory;
  });

  const stats = {
    total: mockTickets.length,
    open: mockTickets.filter(t => t.status === 'open').length,
    pending: mockTickets.filter(t => t.status === 'pending').length,
    escalated: mockTickets.filter(t => t.status === 'escalated').length,
    resolved: mockTickets.filter(t => t.status === 'resolved').length,
    closed: mockTickets.filter(t => t.status === 'closed').length,
    critical: mockTickets.filter(t => t.priority === 'critical').length,
    avgResponseTime: mockTickets.reduce((sum, t) => sum + t.firstResponseTime, 0) / mockTickets.length,
    avgSatisfaction: mockTickets.filter(t => t.satisfaction).reduce((sum, t) => sum + (t.satisfaction || 0), 0) / mockTickets.filter(t => t.satisfaction).length
  };

  const handleTicketAction = (action: string, ticket: any) => {
    toast({
      title: `Ticket ${action}`,
      description: `Ticket ${ticket.id} has been ${action.toLowerCase()}`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${selectedTickets.length} tickets have been ${action.toLowerCase()}`,
    });
    setSelectedTickets([]);
  };

  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const selectAllTickets = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets.map(t => t.id));
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Support Tickets</h1>
            <p className="text-gray-400 mt-2">Manage customer support requests and track resolution metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Tickets
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Import Customers
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/super-admin/support/create">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Ticket
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Tickets</CardTitle>
              <HelpCircle className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.open} open</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{Math.round(stats.avgResponseTime)}m</div>
              <p className="text-xs text-gray-400 mt-1">First response</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.critical}</div>
              <p className="text-xs text-gray-400 mt-1">Urgent attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.avgSatisfaction.toFixed(1)}/5</div>
              <p className="text-xs text-gray-400 mt-1">Customer rating</p>
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
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-32 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40 bg-gray-700/50 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="feature_request">Feature Request</SelectItem>
                    <SelectItem value="how_to">How To</SelectItem>
                    <SelectItem value="bug_report">Bug Report</SelectItem>
                  </SelectContent>
                </Select>
                {selectedTickets.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-red-900/50 text-red-400">
                      {selectedTickets.length} selected
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleBulkAction('Assigned')}>
                          <User className="mr-2 h-4 w-4" />
                          Assign to Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('Priority Updated')}>
                          <Flag className="mr-2 h-4 w-4" />
                          Update Priority
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('Closed')}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Close Tickets
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleBulkAction('Exported')}>
                          <Download className="mr-2 h-4 w-4" />
                          Export Selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-6 bg-gray-700/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  All ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="open" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Open ({stats.open})
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Pending ({stats.pending})
                </TabsTrigger>
                <TabsTrigger value="escalated" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Escalated ({stats.escalated})
                </TabsTrigger>
                <TabsTrigger value="resolved" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Resolved ({stats.resolved})
                </TabsTrigger>
                <TabsTrigger value="urgent" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                  Urgent ({stats.critical})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {/* Select All */}
                  <div className="flex items-center space-x-2 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                    <input
                      type="checkbox"
                      checked={selectedTickets.length === filteredTickets.length && filteredTickets.length > 0}
                      onChange={selectAllTickets}
                      className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-300">
                      Select all {filteredTickets.length} tickets
                    </span>
                  </div>

                  {filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedTickets.includes(ticket.id)}
                          onChange={() => toggleTicketSelection(ticket.id)}
                          className="mt-2 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                        />
                        
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                            {ticket.customer.avatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-semibold text-white">{ticket.id}</h3>
                            <Badge className={getStatusColor(ticket.status)}>
                              {getStatusIcon(ticket.status)}
                              <span className="ml-1">{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</span>
                            </Badge>
                            <Badge className={getPriorityColor(ticket.priority)}>
                              <Flag className="mr-1 h-3 w-3" />
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                            </Badge>
                            <Badge className={getCategoryColor(ticket.category)}>
                              {ticket.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                            {ticket.escalated && (
                              <Badge className="bg-red-900/50 text-red-400">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Escalated
                              </Badge>
                            )}
                          </div>
                          
                          <h4 className="font-medium text-white mb-2">{ticket.subject}</h4>
                          <p className="text-gray-400 mb-4 line-clamp-2">{ticket.description}</p>
                          
                          {/* Customer Information */}
                          <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                            <div>
                              <div className="font-medium text-white">{ticket.customer.name}</div>
                              <div className="text-sm text-gray-400">{ticket.customer.company}</div>
                              <div className="text-sm text-gray-400">{ticket.customer.email}</div>
                            </div>
                            <Badge className="bg-purple-900/50 text-purple-400">
                              <Crown className="mr-1 h-3 w-3" />
                              {ticket.customer.plan}
                            </Badge>
                          </div>

                          {/* Ticket Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 mb-4">
                            <div className="text-center">
                              <div className="font-semibold text-white">{ticket.responses}</div>
                              <div className="text-xs text-gray-400">Responses</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">{ticket.firstResponseTime}m</div>
                              <div className="text-xs text-gray-400">First Response</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">{ticket.attachments}</div>
                              <div className="text-xs text-gray-400">Attachments</div>
                            </div>
                            <div className="text-center">
                              <div className={`font-semibold ${getBusinessImpactColor(ticket.businessImpact)}`}>
                                {ticket.businessImpact.charAt(0).toUpperCase() + ticket.businessImpact.slice(1)}
                              </div>
                              <div className="text-xs text-gray-400">Impact</div>
                            </div>
                          </div>

                          {/* Assignment and SLA */}
                          <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span>Assigned to {ticket.assignedTo.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4 text-gray-500" />
                              <span>{ticket.assignedTo.department}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className={ticket.sla.breached ? 'text-red-400' : 'text-green-400'}>
                                SLA: {ticket.sla.breached ? 'Breached' : 'On track'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-6">
                          {/* Ticket Stats */}
                          <div className="hidden lg:flex items-center space-x-6 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {new Date(ticket.createdAt).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-400">Created</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-white">
                                {new Date(ticket.updatedAt).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-400">Updated</div>
                            </div>
                            {ticket.satisfaction && (
                              <div className="text-center">
                                <div className="font-semibold text-yellow-400">{ticket.satisfaction}/5</div>
                                <div className="text-xs text-gray-400">Rating</div>
                              </div>
                            )}
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleTicketAction('Viewed', ticket)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTicketAction('Edited', ticket)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Ticket
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTicketAction('Assigned', ticket)}>
                                <User className="mr-2 h-4 w-4" />
                                Reassign
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTicketAction('Responded', ticket)}>
                                <Send className="mr-2 h-4 w-4" />
                                Add Response
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleTicketAction('Escalated', ticket)} className="text-orange-400">
                                <Flag className="mr-2 h-4 w-4" />
                                Escalate Ticket
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTicketAction('Resolved', ticket)} className="text-green-400">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Resolved
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleTicketAction('Deleted', ticket)}
                                className="text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Ticket
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredTickets.length === 0 && (
                    <div className="text-center py-12">
                      <HelpCircle className="mx-auto h-12 w-12 text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-white">No tickets found</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {searchTerm ? 'Try adjusting your search terms.' : 'No tickets match the current filters.'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Support Analytics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Response Performance</h3>
                  <p className="text-blue-200 mb-4">
                    Excellent response times and customer satisfaction
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Avg Response</span>
                      <span className="font-medium text-white">{Math.round(stats.avgResponseTime)} minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">SLA Compliance</span>
                      <span className="font-medium text-white">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">First Contact Resolution</span>
                      <span className="font-medium text-white">78%</span>
                    </div>
                  </div>
                </div>
                <Clock className="h-12 w-12 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Customer Satisfaction</h3>
                  <p className="text-green-200 mb-4">
                    High customer satisfaction across all categories
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Avg Rating</span>
                      <span className="font-medium text-white">{stats.avgSatisfaction.toFixed(1)}/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">5-Star Ratings</span>
                      <span className="font-medium text-white">67%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Response Rate</span>
                      <span className="font-medium text-white">89%</span>
                    </div>
                  </div>
                </div>
                <Star className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Ticket Categories</h3>
                  <p className="text-purple-200 mb-4">
                    Most common support request types
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Technical</span>
                      <span className="font-medium text-white">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Billing</span>
                      <span className="font-medium text-white">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">How To</span>
                      <span className="font-medium text-white">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Features</span>
                      <span className="font-medium text-white">10%</span>
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