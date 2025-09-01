'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Users,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import Link from 'next/link';

const clients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    address: '123 Business St, New York, NY 10001',
    status: 'active',
    totalInvoices: 12,
    totalAmount: 25600.00,
    paidAmount: 22100.00,
    pendingAmount: 3500.00,
    lastInvoice: '2025-01-15',
    joinedDate: '2024-03-15',
    avatar: 'JD',
    tags: ['VIP', 'Corporate'],
    paymentTerms: '30 days',
    creditLimit: 50000,
    taxId: 'TAX123456789'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@techsol.com',
    phone: '+1 (555) 987-6543',
    company: 'Tech Solutions Inc',
    address: '456 Tech Ave, San Francisco, CA 94105',
    status: 'active',
    totalInvoices: 8,
    totalAmount: 18900.00,
    paidAmount: 18900.00,
    pendingAmount: 0,
    lastInvoice: '2025-01-10',
    joinedDate: '2024-05-20',
    avatar: 'JS',
    tags: ['Tech', 'Recurring'],
    paymentTerms: '15 days',
    creditLimit: 25000,
    taxId: 'TAX987654321'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@digipro.com',
    phone: '+1 (555) 456-7890',
    company: 'Digital Marketing Pro',
    address: '789 Marketing Blvd, Austin, TX 73301',
    status: 'inactive',
    totalInvoices: 15,
    totalAmount: 32400.00,
    paidAmount: 28900.00,
    pendingAmount: 3500.00,
    lastInvoice: '2024-12-20',
    joinedDate: '2024-01-10',
    avatar: 'MJ',
    tags: ['Marketing'],
    paymentTerms: '45 days',
    creditLimit: 40000,
    taxId: 'TAX456789123'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@startupxyz.com',
    phone: '+1 (555) 321-0987',
    company: 'StartupXYZ',
    address: '321 Startup Lane, Seattle, WA 98101',
    status: 'overdue',
    totalInvoices: 5,
    totalAmount: 9500.00,
    paidAmount: 6000.00,
    pendingAmount: 3500.00,
    lastInvoice: '2024-12-01',
    joinedDate: '2024-08-15',
    avatar: 'SW',
    tags: ['Startup'],
    paymentTerms: '30 days',
    creditLimit: 15000,
    taxId: 'TAX789123456'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@globalventures.com',
    phone: '+1 (555) 654-3210',
    company: 'Global Ventures',
    address: '654 Global St, Miami, FL 33101',
    status: 'active',
    totalInvoices: 20,
    totalAmount: 45000.00,
    paidAmount: 45000.00,
    pendingAmount: 0,
    lastInvoice: '2025-01-12',
    joinedDate: '2023-11-05',
    avatar: 'DB',
    tags: ['VIP', 'International'],
    paymentTerms: '60 days',
    creditLimit: 100000,
    taxId: 'TAX321654987'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'inactive':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    case 'overdue':
      return 'bg-red-100 text-red-700 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4" />;
    case 'inactive':
      return <Clock className="h-4 w-4" />;
    case 'overdue':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getTagColor = (tag: string) => {
  const colors: { [key: string]: string } = {
    'VIP': 'bg-yellow-100 text-yellow-700',
    'Corporate': 'bg-blue-100 text-blue-700',
    'Tech': 'bg-purple-100 text-purple-700',
    'Recurring': 'bg-green-100 text-green-700',
    'Marketing': 'bg-pink-100 text-pink-700',
    'Startup': 'bg-orange-100 text-orange-700',
    'International': 'bg-indigo-100 text-indigo-700'
  };
  return colors[tag] || 'bg-gray-100 text-gray-700';
};

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || client.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    inactive: clients.filter(c => c.status === 'inactive').length,
    overdue: clients.filter(c => c.status === 'overdue').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalAmount, 0),
    pendingAmount: clients.reduce((sum, c) => sum + c.pendingAmount, 0)
  };

  const toggleClientSelection = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const selectAllClients = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(c => c.id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600 mt-2">Manage your clients and track their business relationships</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/60 border-white/30">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  Import CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Excel
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/60 border-white/30">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/dashboard/clients/create">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">{stats.active} active</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Amount</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Outstanding</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overdue Clients</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.overdue}</div>
              <p className="text-xs text-gray-500 mt-1">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/60 border-white/30"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                {selectedClients.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{selectedClients.length} selected</Badge>
                    <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                      Bulk Actions
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4 bg-gray-100/50">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
                <TabsTrigger value="inactive">Inactive ({stats.inactive})</TabsTrigger>
                <TabsTrigger value="overdue">Overdue ({stats.overdue})</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {/* Select All */}
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                      onChange={selectAllClients}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">
                      Select all {filteredClients.length} clients
                    </span>
                  </div>

                  {filteredClients.map((client) => (
                    <div key={client.id} className="flex items-center space-x-4 p-6 bg-white/60 rounded-lg border border-white/20 hover:bg-white/80 transition-all duration-200">
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => toggleClientSelection(client.id)}
                        className="rounded border-gray-300"
                      />
                      
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                          {client.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{client.name}</h3>
                          <Badge className={`${getStatusColor(client.status)} flex items-center space-x-1`}>
                            {getStatusIcon(client.status)}
                            <span>{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span>
                          </Badge>
                          {client.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span>{client.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{client.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{client.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${client.totalAmount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{client.totalInvoices} invoices</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-green-600 font-medium">${client.paidAmount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Paid</div>
                        </div>

                        {client.pendingAmount > 0 && (
                          <div className="text-right">
                            <div className="text-sm text-orange-600 font-medium">${client.pendingAmount.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Pending</div>
                          </div>
                        )}

                        <div className="text-right">
                          <div className="text-sm text-gray-600">Last Invoice</div>
                          <div className="text-xs text-gray-500">{new Date(client.lastInvoice).toLocaleDateString()}</div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Client
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Create Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="mr-2 h-4 w-4" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}

                  {filteredClients.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first client.'}
                      </p>
                      {!searchTerm && (
                        <div className="mt-6">
                          <Link href="/dashboard/clients/create">
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Client
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Top Performing Clients</h3>
                  <p className="text-blue-100 mb-4">Clients with highest revenue contribution</p>
                  <div className="space-y-2">
                    {clients.slice(0, 3).map((client, index) => (
                      <div key={client.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-200">#{index + 1}</span>
                          <span>{client.company}</span>
                        </div>
                        <span className="font-medium">${client.totalAmount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                  <p className="text-green-100 mb-4">Latest client interactions</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-200" />
                      <span className="text-sm">Payment received from Acme Corp</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-green-200" />
                      <span className="text-sm">Invoice sent to Tech Solutions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-200" />
                      <span className="text-sm">New client Global Ventures added</span>
                    </div>
                  </div>
                </div>
                <Activity className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}