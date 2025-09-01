'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Save, 
  DollarSign,
  User,
  CreditCard,
  Building,
  Calendar,
  FileText,
  Upload,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const mockClients = [
  { id: '1', name: 'John Doe', company: 'Acme Corporation', avatar: 'AC' },
  { id: '2', name: 'Jane Smith', company: 'Tech Solutions Inc', avatar: 'TS' },
  { id: '3', name: 'Mike Johnson', company: 'Digital Marketing Pro', avatar: 'DM' }
];

const mockInvoices = [
  { id: 'INV-001234', amount: 2500.00, client: 'Acme Corporation', dueDate: '2025-01-20' },
  { id: 'INV-001235', amount: 1800.00, client: 'Tech Solutions Inc', dueDate: '2025-01-25' },
  { id: 'INV-001236', amount: 3200.00, client: 'Digital Marketing Pro', dueDate: '2025-01-30' }
];

const paymentMethods = [
  { id: 'stripe', name: 'Credit Card (Stripe)', fees: '2.9% + $0.30' },
  { id: 'paypal', name: 'PayPal', fees: '3.49% + $0.49' },
  { id: 'bank', name: 'Bank Transfer', fees: '$25 flat' },
  { id: 'square', name: 'Square', fees: '2.6% + $0.10' },
  { id: 'cash', name: 'Cash', fees: 'No fees' },
  { id: 'check', name: 'Check', fees: 'No fees' }
];

export default function CreatePaymentPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    invoiceId: '',
    amount: '',
    paymentMethod: '',
    transactionId: '',
    reference: '',
    notes: '',
    paymentDate: new Date().toISOString().split('T')[0],
    fees: 0,
    currency: 'USD'
  });

  const { toast } = useToast();

  const selectedClient = mockClients.find(c => c.id === formData.clientId);
  const selectedInvoice = mockInvoices.find(i => i.id === formData.invoiceId);
  const selectedMethod = paymentMethods.find(m => m.id === formData.paymentMethod);

  const calculateFees = (amount: number, method: string) => {
    switch (method) {
      case 'stripe':
        return (amount * 0.029) + 0.30;
      case 'paypal':
        return (amount * 0.0349) + 0.49;
      case 'bank':
        return 25.00;
      case 'square':
        return (amount * 0.026) + 0.10;
      default:
        return 0;
    }
  };

  const handleAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    const fees = calculateFees(amount, formData.paymentMethod);
    setFormData({ ...formData, amount: value, fees });
  };

  const handleMethodChange = (method: string) => {
    const amount = parseFloat(formData.amount) || 0;
    const fees = calculateFees(amount, method);
    setFormData({ ...formData, paymentMethod: method, fees });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment recorded successfully!",
        description: `Payment of $${formData.amount} has been recorded.`,
      });
      
      // Reset form
      setFormData({
        clientId: '',
        invoiceId: '',
        amount: '',
        paymentMethod: '',
        transactionId: '',
        reference: '',
        notes: '',
        paymentDate: new Date().toISOString().split('T')[0],
        fees: 0,
        currency: 'USD'
      });
      
    } catch (error) {
      toast({
        title: "Error recording payment",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const netAmount = (parseFloat(formData.amount) || 0) - formData.fees;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/payments">
              <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Payments
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Record Payment</h1>
              <p className="text-gray-600 mt-2">Log a new payment received from a client</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Client and Invoice Selection */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Client & Invoice</span>
                  </CardTitle>
                  <CardDescription>Select the client and associated invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="clientId">Client *</Label>
                    <Select value={formData.clientId} onValueChange={(value) => setFormData({ ...formData, clientId: value })}>
                      <SelectTrigger className="bg-white/60 border-white/30">
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                                  {client.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{client.name}</div>
                                <div className="text-sm text-gray-500">{client.company}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="invoiceId">Invoice (Optional)</Label>
                    <Select value={formData.invoiceId} onValueChange={(value) => setFormData({ ...formData, invoiceId: value })}>
                      <SelectTrigger className="bg-white/60 border-white/30">
                        <SelectValue placeholder="Select an invoice or leave blank" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockInvoices.map((invoice) => (
                          <SelectItem key={invoice.id} value={invoice.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{invoice.id}</span>
                              <span className="text-sm text-gray-500">
                                ${invoice.amount.toLocaleString()} - Due {new Date(invoice.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedClient && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            {selectedClient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-blue-900">{selectedClient.name}</div>
                          <div className="text-sm text-blue-700">{selectedClient.company}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Details */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span>Payment Details</span>
                  </CardTitle>
                  <CardDescription>Enter the payment amount and method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          value={formData.amount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          placeholder="0.00"
                          className="pl-10 bg-white/60 border-white/30"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                        <SelectTrigger className="bg-white/60 border-white/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <Select value={formData.paymentMethod} onValueChange={handleMethodChange}>
                      <SelectTrigger className="bg-white/60 border-white/30">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{method.name}</span>
                              <span className="text-sm text-gray-500">Fees: {method.fees}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="paymentDate">Payment Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="paymentDate"
                        type="date"
                        value={formData.paymentDate}
                        onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                        className="pl-10 bg-white/60 border-white/30"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="transactionId">Transaction ID</Label>
                    <Input
                      id="transactionId"
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      placeholder="txn_1234567890"
                      className="bg-white/60 border-white/30"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reference">Reference</Label>
                    <Input
                      id="reference"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                      placeholder="Payment reference or description"
                      className="bg-white/60 border-white/30"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Additional notes about this payment..."
                      className="bg-white/60 border-white/30"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              {formData.amount && formData.paymentMethod && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Payment Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Amount:</span>
                        <span className="font-semibold text-gray-900">${parseFloat(formData.amount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Processing Fees:</span>
                        <span className="text-red-600">-${formData.fees.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="text-gray-900">{selectedMethod?.name}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">Net Amount:</span>
                          <span className="font-bold text-green-600 text-lg">${netAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Recording Payment...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Record Payment
                      </>
                    )}
                  </Button>
                  
                  <Button type="button" variant="outline" className="w-full bg-white/60 border-white/30">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Receipt
                  </Button>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="font-semibold">AI Suggestions</h3>
                  </div>
                  <div className="space-y-2 text-sm text-purple-100">
                    <p>• Consider setting up automatic payment reminders</p>
                    <p>• Enable recurring payments for regular clients</p>
                    <p>• Add payment links to invoices for faster collection</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Recording Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Always include transaction IDs for easier reconciliation</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Add detailed references to track payment sources</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Upload receipts for better record keeping</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Processing fees are automatically calculated</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Payments */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Your latest payment records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                            AC
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">$2,500.00</div>
                          <div className="text-sm text-gray-500">Acme Corporation</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Completed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            TS
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">$1,800.00</div>
                          <div className="text-sm text-gray-500">Tech Solutions</div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}