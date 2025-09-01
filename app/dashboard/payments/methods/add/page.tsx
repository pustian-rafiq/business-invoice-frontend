'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  CreditCard,
  Building,
  Globe,
  Smartphone,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const paymentMethodTypes = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Accept credit cards, digital wallets, and more',
    icon: CreditCard,
    color: 'from-indigo-500 to-purple-500',
    fees: '2.9% + $0.30',
    features: ['Credit/Debit Cards', 'Apple Pay', 'Google Pay', 'ACH', 'International'],
    setupTime: '5 minutes',
    countries: ['US', 'CA', 'UK', 'EU', 'AU', '40+ more']
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Global payment platform with buyer protection',
    icon: Globe,
    color: 'from-blue-500 to-indigo-500',
    fees: '3.49% + $0.49',
    features: ['PayPal Balance', 'Credit Cards', 'Bank Transfers', 'Buy Now Pay Later'],
    setupTime: '3 minutes',
    countries: ['200+ countries']
  },
  {
    id: 'square',
    name: 'Square',
    description: 'In-person and online payment processing',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-500',
    fees: '2.6% + $0.10',
    features: ['Card Reader', 'Online Payments', 'Invoicing', 'Point of Sale'],
    setupTime: '10 minutes',
    countries: ['US', 'CA', 'UK', 'AU', 'JP']
  },
  {
    id: 'bank_account',
    name: 'Bank Account',
    description: 'Direct bank transfers and ACH payments',
    icon: Building,
    color: 'from-blue-600 to-blue-700',
    fees: '$25 flat fee',
    features: ['Wire Transfers', 'ACH', 'Direct Deposit', 'Low Fees'],
    setupTime: '1 day',
    countries: ['US', 'CA', 'UK', 'EU']
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    description: 'Accept Bitcoin, Ethereum, and other cryptocurrencies',
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    fees: '1.0%',
    features: ['Bitcoin', 'Ethereum', 'Stablecoins', 'DeFi Integration'],
    setupTime: '15 minutes',
    countries: ['Global']
  },
  {
    id: 'mobile_payment',
    name: 'Mobile Payments',
    description: 'Venmo, Cash App, and other mobile payment apps',
    icon: Smartphone,
    color: 'from-pink-500 to-rose-500',
    fees: '1.9% + $0.10',
    features: ['Venmo', 'Cash App', 'Zelle', 'Mobile Wallets'],
    setupTime: '5 minutes',
    countries: ['US', 'CA']
  }
];

export default function AddPaymentMethodPage() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isDefault: false,
    
    // Stripe/Square/Crypto
    apiKey: '',
    secretKey: '',
    webhookSecret: '',
    
    // Bank Account
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    bankName: '',
    
    // PayPal
    clientId: '',
    clientSecret: '',
    email: '',
    
    // General
    currency: 'USD',
    countries: [] as string[],
    testMode: true,
    
    // Fees
    customFees: false,
    feePercentage: 0,
    feeFixed: 0
  });

  const { toast } = useToast();

  const selectedMethodType = paymentMethodTypes.find(type => type.id === selectedType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment method added successfully!",
        description: `${formData.name} has been configured and is ready to use.`,
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        isDefault: false,
        apiKey: '',
        secretKey: '',
        webhookSecret: '',
        accountNumber: '',
        routingNumber: '',
        accountType: 'checking',
        bankName: '',
        clientId: '',
        clientSecret: '',
        email: '',
        currency: 'USD',
        countries: [],
        testMode: true,
        customFees: false,
        feePercentage: 0,
        feeFixed: 0
      });
      setSelectedType('');
      
    } catch (error) {
      toast({
        title: "Error adding payment method",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyWebhookUrl = () => {
    const webhookUrl = `${window.location.origin}/api/webhooks/${selectedType}`;
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "Webhook URL copied!",
      description: "Use this URL in your payment gateway settings.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/payments/methods">
              <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Payment Methods
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add Payment Method</h1>
              <p className="text-gray-600 mt-2">Configure a new payment gateway for your business</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Method Selection */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Choose Payment Method Type</CardTitle>
                  <CardDescription>Select the payment gateway you want to integrate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {paymentMethodTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                            selectedType === type.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedType === type.id && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${type.color}`}>
                                <type.icon className="h-4 w-4 text-white" />
                              </div>
                              <h3 className="font-semibold">{type.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                            <div className="space-y-1 text-xs text-gray-500">
                              <div>Fees: {type.fees}</div>
                              <div>Setup: {type.setupTime}</div>
                              <div>Countries: {type.countries.join(', ')}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Configuration Form */}
              {selectedType && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <selectedMethodType!.icon className="h-5 w-5 text-blue-600" />
                      <span>Configure {selectedMethodType!.name}</span>
                    </CardTitle>
                    <CardDescription>
                      Enter your {selectedMethodType!.name} credentials and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Display Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={`My ${selectedMethodType!.name} Account`}
                          className="bg-white/60 border-white/30"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Optional description for this payment method"
                          className="bg-white/60 border-white/30"
                          rows={2}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Stripe Configuration */}
                    {selectedType === 'stripe' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Stripe Configuration</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="apiKey">Publishable Key *</Label>
                            <Input
                              id="apiKey"
                              value={formData.apiKey}
                              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                              placeholder="pk_live_..."
                              className="bg-white/60 border-white/30"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="secretKey">Secret Key *</Label>
                            <div className="relative">
                              <Input
                                id="secretKey"
                                type={showApiKey ? 'text' : 'password'}
                                value={formData.secretKey}
                                onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                                placeholder="sk_live_..."
                                className="bg-white/60 border-white/30 pr-10"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                              >
                                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="webhookSecret">Webhook Secret</Label>
                          <Input
                            id="webhookSecret"
                            value={formData.webhookSecret}
                            onChange={(e) => setFormData({ ...formData, webhookSecret: e.target.value })}
                            placeholder="whsec_..."
                            className="bg-white/60 border-white/30"
                          />
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Copy className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-900">Webhook URL</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={copyWebhookUrl}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Copy
                            </Button>
                          </div>
                          <code className="text-sm text-blue-700 break-all">
                            {window.location.origin}/api/webhooks/stripe
                          </code>
                        </div>
                      </div>
                    )}

                    {/* PayPal Configuration */}
                    {selectedType === 'paypal' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">PayPal Configuration</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="clientId">Client ID *</Label>
                            <Input
                              id="clientId"
                              value={formData.clientId}
                              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                              placeholder="Your PayPal Client ID"
                              className="bg-white/60 border-white/30"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="clientSecret">Client Secret *</Label>
                            <div className="relative">
                              <Input
                                id="clientSecret"
                                type={showApiKey ? 'text' : 'password'}
                                value={formData.clientSecret}
                                onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                                placeholder="Your PayPal Client Secret"
                                className="bg-white/60 border-white/30 pr-10"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                              >
                                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">PayPal Business Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="business@yourcompany.com"
                            className="bg-white/60 border-white/30"
                          />
                        </div>
                      </div>
                    )}

                    {/* Bank Account Configuration */}
                    {selectedType === 'bank_account' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Bank Account Details</h3>
                        <div>
                          <Label htmlFor="bankName">Bank Name *</Label>
                          <Input
                            id="bankName"
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                            placeholder="Chase Bank"
                            className="bg-white/60 border-white/30"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="accountNumber">Account Number *</Label>
                            <Input
                              id="accountNumber"
                              value={formData.accountNumber}
                              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                              placeholder="1234567890"
                              className="bg-white/60 border-white/30"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="routingNumber">Routing Number *</Label>
                            <Input
                              id="routingNumber"
                              value={formData.routingNumber}
                              onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                              placeholder="021000021"
                              className="bg-white/60 border-white/30"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accountType">Account Type</Label>
                          <Select value={formData.accountType} onValueChange={(value) => setFormData({ ...formData, accountType: value })}>
                            <SelectTrigger className="bg-white/60 border-white/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checking">Checking</SelectItem>
                              <SelectItem value="savings">Savings</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {/* Square Configuration */}
                    {selectedType === 'square' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Square Configuration</h3>
                        <div>
                          <Label htmlFor="apiKey">Application ID *</Label>
                          <Input
                            id="apiKey"
                            value={formData.apiKey}
                            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                            placeholder="sq0idp-..."
                            className="bg-white/60 border-white/30"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="secretKey">Access Token *</Label>
                          <div className="relative">
                            <Input
                              id="secretKey"
                              type={showApiKey ? 'text' : 'password'}
                              value={formData.secretKey}
                              onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                              placeholder="EAAAl..."
                              className="bg-white/60 border-white/30 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* General Settings */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">General Settings</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
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
                              <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isDefault"
                          checked={formData.isDefault}
                          onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked as boolean })}
                        />
                        <Label htmlFor="isDefault">Set as default payment method</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="testMode"
                          checked={formData.testMode}
                          onCheckedChange={(checked) => setFormData({ ...formData, testMode: checked as boolean })}
                        />
                        <Label htmlFor="testMode">Enable test mode (recommended for initial setup)</Label>
                      </div>
                    </div>

                    {/* Custom Fees */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="customFees"
                          checked={formData.customFees}
                          onCheckedChange={(checked) => setFormData({ ...formData, customFees: checked as boolean })}
                        />
                        <Label htmlFor="customFees">Override default fees</Label>
                      </div>

                      {formData.customFees && (
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <Label htmlFor="feePercentage">Percentage Fee (%)</Label>
                            <Input
                              id="feePercentage"
                              type="number"
                              step="0.01"
                              value={formData.feePercentage}
                              onChange={(e) => setFormData({ ...formData, feePercentage: parseFloat(e.target.value) || 0 })}
                              className="bg-white/60 border-white/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="feeFixed">Fixed Fee ($)</Label>
                            <Input
                              id="feeFixed"
                              type="number"
                              step="0.01"
                              value={formData.feeFixed}
                              onChange={(e) => setFormData({ ...formData, feeFixed: parseFloat(e.target.value) || 0 })}
                              className="bg-white/60 border-white/30"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Configuring...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Payment Method
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Selected Method Info */}
              {selectedMethodType && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <selectedMethodType.icon className="h-5 w-5 text-blue-600" />
                      <span>{selectedMethodType.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {selectedMethodType.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Processing Fees</h4>
                      <p className="text-sm text-gray-600">{selectedMethodType.fees}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Setup Time</h4>
                      <p className="text-sm text-gray-600">{selectedMethodType.setupTime}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Supported Countries</h4>
                      <p className="text-sm text-gray-600">{selectedMethodType.countries.join(', ')}</p>
                    </div>

                    <Button variant="outline" className="w-full bg-white/60 border-white/30">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Setup Guide
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Security Notice */}
              <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-5 w-5" />
                    <h3 className="font-semibold">Security Notice</h3>
                  </div>
                  <div className="space-y-2 text-sm text-green-100">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mt-2 flex-shrink-0"></div>
                      <p>All API keys are encrypted and stored securely</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mt-2 flex-shrink-0"></div>
                      <p>We never store sensitive payment information</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mt-2 flex-shrink-0"></div>
                      <p>All transactions are PCI DSS compliant</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    <span>Need Help?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-white/60 border-white/30">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Setup Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white/60 border-white/30">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white/60 border-white/30">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}