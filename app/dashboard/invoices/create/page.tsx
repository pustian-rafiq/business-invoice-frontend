'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Minus, 
  Save, 
  Send, 
  Eye, 
  ArrowLeft, 
  Sparkles, 
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Copy
} from 'lucide-react';
import Link from 'next/link';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  address: string;
  phone: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@acme.com',
    company: 'Acme Corporation',
    address: '123 Business St, New York, NY 10001',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@techsol.com',
    company: 'Tech Solutions Inc',
    address: '456 Tech Ave, San Francisco, CA 94105',
    phone: '+1 (555) 987-6543'
  }
];

const mockProducts = [
  { id: '1', name: 'Web Development', rate: 100 },
  { id: '2', name: 'UI/UX Design', rate: 80 },
  { id: '3', name: 'SEO Optimization', rate: 60 },
  { id: '4', name: 'Content Writing', rate: 40 }
];

export default function CreateInvoicePage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001239');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
  ]);
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState('Payment is due within 30 days of invoice date.');
  const [taxRate, setTaxRate] = useState(10);
  const [discountRate, setDiscountRate] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = (subtotal * discountRate) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const total = taxableAmount + taxAmount;

  useEffect(() => {
    const dueDateTime = new Date();
    dueDateTime.setDate(dueDateTime.getDate() + 30);
    setDueDate(dueDateTime.toISOString().split('T')[0]);
  }, []);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const suggestProduct = (description: string) => {
    const suggestion = mockProducts.find(p => 
      p.name.toLowerCase().includes(description.toLowerCase())
    );
    return suggestion;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/invoices">
              <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
              <p className="text-gray-600 mt-2">Build your invoice with AI assistance</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Send className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Invoice Builder */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span>Invoice Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-white/60 border-white/30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Client Selection */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Client Information</span>
                  <Badge className="bg-blue-100 text-blue-700">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Suggested
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select onValueChange={(value) => {
                  const client = mockClients.find(c => c.id === value);
                  setSelectedClient(client || null);
                }}>
                  <SelectTrigger className="bg-white/60 border-white/30">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{client.name}</span>
                          <span className="text-sm text-gray-500">{client.company}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedClient && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{selectedClient.company}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span>{selectedClient.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>{selectedClient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{selectedClient.address}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Invoice Items */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span>Invoice Items</span>
                    <Badge className="bg-green-100 text-green-700">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Smart Suggestions
                    </Badge>
                  </CardTitle>
                  <Button onClick={addItem} size="sm" variant="outline" className="bg-white/60 border-white/30">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-700">Item {index + 1}</span>
                        {items.length > 1 && (
                          <Button
                            onClick={() => removeItem(item.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => {
                              updateItem(item.id, 'description', e.target.value);
                              // AI suggestion logic
                              const suggestion = suggestProduct(e.target.value);
                              if (suggestion && e.target.value.length > 3) {
                                updateItem(item.id, 'rate', suggestion.rate);
                              }
                            }}
                            placeholder="Describe your service or product..."
                            className="bg-white/60 border-white/30"
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <Label>Quantity</Label>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                              className="bg-white/60 border-white/30"
                            />
                          </div>
                          <div>
                            <Label>Rate ($)</Label>
                            <Input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                              className="bg-white/60 border-white/30"
                            />
                          </div>
                          <div>
                            <Label>Amount ($)</Label>
                            <Input
                              value={item.amount.toFixed(2)}
                              readOnly
                              className="bg-gray-100 border-gray-200"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discountRate">Discount (%)</Label>
                    <Input
                      id="discountRate"
                      type="number"
                      value={discountRate}
                      onChange={(e) => setDiscountRate(parseFloat(e.target.value) || 0)}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional notes..."
                    className="bg-white/60 border-white/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    className="bg-white/60 border-white/30"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span>Live Preview</span>
                </CardTitle>
                <CardDescription>See how your invoice will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  {/* Invoice Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
                      <p className="text-gray-600">{invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">Your Company</div>
                      <p className="text-sm text-gray-600">123 Business Street</p>
                      <p className="text-sm text-gray-600">City, State 12345</p>
                      <p className="text-sm text-gray-600">contact@company.com</p>
                    </div>
                  </div>

                  {/* Client Info */}
                  {selectedClient && (
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{selectedClient.company}</p>
                        <p>{selectedClient.name}</p>
                        <p>{selectedClient.email}</p>
                        <p>{selectedClient.address}</p>
                      </div>
                    </div>
                  )}

                  {/* Invoice Details */}
                  <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                    <div>
                      <p><span className="font-medium">Issue Date:</span> {new Date(issueDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Due Date:</span> {new Date(dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="mb-8">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2">Description</th>
                          <th className="text-right py-2">Qty</th>
                          <th className="text-right py-2">Rate</th>
                          <th className="text-right py-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-2">{item.description || 'Item description'}</td>
                            <td className="text-right py-2">{item.quantity}</td>
                            <td className="text-right py-2">${item.rate.toFixed(2)}</td>
                            <td className="text-right py-2">${item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end mb-8">
                    <div className="w-64 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discountRate > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({discountRate}%):</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Tax ({taxRate}%):</span>
                        <span>${taxAmount.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes and Terms */}
                  {notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
                      <p className="text-sm text-gray-600">{notes}</p>
                    </div>
                  )}
                  
                  {terms && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Terms & Conditions:</h4>
                      <p className="text-sm text-gray-600">{terms}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}