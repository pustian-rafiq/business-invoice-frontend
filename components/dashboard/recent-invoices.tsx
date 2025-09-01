import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, Download, Send } from 'lucide-react';

const recentInvoices = [
  {
    id: 'INV-001234',
    client: {
      name: 'Acme Corporation',
      avatar: 'AC'
    },
    amount: '$2,500.00',
    status: 'paid',
    dueDate: '2025-01-15',
    issueDate: '2025-01-01'
  },
  {
    id: 'INV-001235',
    client: {
      name: 'Tech Solutions Inc',
      avatar: 'TS'
    },
    amount: '$1,800.00',
    status: 'pending',
    dueDate: '2025-01-20',
    issueDate: '2025-01-05'
  },
  {
    id: 'INV-001236',
    client: {
      name: 'Digital Marketing Pro',
      avatar: 'DM'
    },
    amount: '$3,200.00',
    status: 'sent',
    dueDate: '2025-01-25',
    issueDate: '2025-01-10'
  },
  {
    id: 'INV-001237',
    client: {
      name: 'StartupXYZ',
      avatar: 'SX'
    },
    amount: '$950.00',
    status: 'overdue',
    dueDate: '2025-01-12',
    issueDate: '2024-12-28'
  },
  {
    id: 'INV-001238',
    client: {
      name: 'Global Ventures',
      avatar: 'GV'
    },
    amount: '$4,500.00',
    status: 'draft',
    dueDate: '2025-02-01',
    issueDate: '2025-01-15'
  }
];

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
    case 'draft':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

export function RecentInvoices() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900">Recent Invoices</CardTitle>
          <CardDescription className="text-gray-600">
            Your latest invoice activity and status updates
          </CardDescription>
        </div>
        <Button variant="outline" className="bg-white/60 border-white/30">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-white/20 hover:bg-white/80 transition-colors">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    {invoice.client.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">{invoice.id}</div>
                  <div className="text-sm text-gray-600">{invoice.client.name}</div>
                  <div className="text-xs text-gray-500">
                    Issued: {new Date(invoice.issueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{invoice.amount}</div>
                  <div className="text-xs text-gray-500">
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                </div>
                
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  {invoice.status === 'draft' && (
                    <Button variant="ghost" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}