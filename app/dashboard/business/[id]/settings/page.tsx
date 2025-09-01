'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Building,
  Settings,
  Mail,
  MessageSquare,
  Bell,
  CreditCard,
  FileText,
  Palette,
  Shield,
  Globe,
  Smartphone,
  Upload,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Zap,
  Users,
  Calendar,
  DollarSign,
  Printer,
  Download,
  Lock,
  Key,
  Database,
  Webhook,
  Code,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const businessData = {
  id: '1',
  name: 'Acme Corporation',
  email: 'contact@acme.com',
  phone: '+1 (555) 123-4567',
  website: 'https://acme.com',
  address: '123 Business St, New York, NY 10001',
  taxId: 'TAX123456789',
  currency: 'USD',
  timezone: 'America/New_York',
  logo: null,
  primaryColor: '#3B82F6',
  invoicePrefix: 'INV',
  plan: 'Team'
};

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
];

const timezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Australia/Sydney'
];

const emailProviders = [
  { id: 'smtp', name: 'Custom SMTP', description: 'Use your own SMTP server' },
  { id: 'sendgrid', name: 'SendGrid', description: 'Popular email service' },
  { id: 'mailgun', name: 'Mailgun', description: 'Developer-friendly email API' },
  { id: 'ses', name: 'Amazon SES', description: 'AWS Simple Email Service' }
];

const smsProviders = [
  { id: 'twilio', name: 'Twilio', description: 'Leading SMS platform' },
  { id: 'nexmo', name: 'Vonage (Nexmo)', description: 'Global SMS API' },
  { id: 'textlocal', name: 'Textlocal', description: 'UK-based SMS service' },
  { id: 'custom', name: 'Custom API', description: 'Your own SMS gateway' }
];

const paymentGateways = [
  { id: 'stripe', name: 'Stripe', description: 'Popular payment processor', logo: '💳' },
  { id: 'paypal', name: 'PayPal', description: 'Global payment platform', logo: '🅿️' },
  { id: 'square', name: 'Square', description: 'All-in-one payments', logo: '⬜' },
  { id: 'razorpay', name: 'Razorpay', description: 'Indian payment gateway', logo: '💰' }
];

export default function BusinessSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    name: businessData.name,
    email: businessData.email,
    phone: businessData.phone,
    website: businessData.website,
    address: businessData.address,
    taxId: businessData.taxId,
    currency: businessData.currency,
    timezone: businessData.timezone,
    
    // Branding
    logo: businessData.logo,
    primaryColor: businessData.primaryColor,
    secondaryColor: '#6366F1',
    invoicePrefix: businessData.invoicePrefix,
    
    // Email Settings
    emailProvider: 'smtp',
    smtpHost: '',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromEmail: businessData.email,
    fromName: businessData.name,
    
    // SMS Settings
    smsProvider: 'twilio',
    smsApiKey: '',
    smsApiSecret: '',
    smsFromNumber: '',
    
    // Notifications
    emailNotifications: {
      invoiceCreated: true,
      invoiceSent: true,
      paymentReceived: true,
      paymentOverdue: true,
      teamMemberAdded: true,
      clientAdded: false
    },
    smsNotifications: {
      paymentReceived: false,
      paymentOverdue: true,
      invoiceReminder: true
    },
    
    // Payment Settings
    paymentGateways: {
      stripe: { enabled: true, publicKey: '', secretKey: '' },
      paypal: { enabled: false, clientId: '', clientSecret: '' },
      square: { enabled: false, applicationId: '', accessToken: '' }
    },
    
    // Invoice Settings
    invoiceSettings: {
      autoNumbering: true,
      defaultDueDays: 30,
      lateFeeEnabled: false,
      lateFeePercentage: 5,
      reminderDays: [7, 3, 1],
      autoSendReminders: true,
      requireSignature: false,
      showPaymentInstructions: true,
      paymentInstructions: 'Payment is due within 30 days of invoice date.'
    },
    
    // Security Settings
    twoFactorEnabled: false,
    sessionTimeout: 60,
    ipWhitelist: '',
    auditLogging: true,
    
    // API Settings
    apiEnabled: true,
    apiKey: 'sk_live_51234567890abcdef',
    webhookUrl: '',
    webhookSecret: ''
  });

  const { toast } = useToast();

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Settings saved successfully!",
        description: `${section} settings have been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = () => {
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setSettings({ ...settings, apiKey: newKey });
    toast({
      title: "New API key generated",
      description: "Make sure to copy your new API key. You won't be able to see it again.",
    });
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(settings.apiKey);
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/business">
              <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Businesses
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Business Settings</h1>
              <p className="text-gray-600 mt-2">Configure your business operations and integrations</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-700">
            <Building className="mr-1 h-3 w-3" />
            {businessData.name}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8 bg-gray-100/50">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span>Business Information</span>
                </CardTitle>
                <CardDescription>Basic information about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={settings.website}
                      onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="bg-white/60 border-white/30"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      value={settings.taxId}
                      onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => setSettings({ ...settings, currency: value })}>
                      <SelectTrigger className="bg-white/60 border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.name} ({currency.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
                      <SelectTrigger className="bg-white/60 border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((timezone) => (
                          <SelectItem key={timezone} value={timezone}>
                            {timezone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('General')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Settings */}
          <TabsContent value="branding" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5 text-blue-600" />
                  <span>Brand Identity</span>
                </CardTitle>
                <CardDescription>Customize your business branding and appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Business Logo</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drop your logo here, or <span className="text-blue-600 cursor-pointer">browse</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB (Recommended: 200x80px)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="w-16 h-10 bg-white/60 border-white/30"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="bg-white/60 border-white/30"
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        className="w-16 h-10 bg-white/60 border-white/30"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        className="bg-white/60 border-white/30"
                        placeholder="#6366F1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                  <Input
                    id="invoicePrefix"
                    value={settings.invoicePrefix}
                    onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
                    className="bg-white/60 border-white/30 max-w-xs"
                    placeholder="INV"
                  />
                  <p className="text-sm text-gray-500 mt-1">This will be used for invoice numbering (e.g., INV-001)</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Brand Preview</h4>
                  <div className="p-6 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div style={{ color: settings.primaryColor }} className="text-2xl font-bold">
                        {settings.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Sample Invoice: {settings.invoicePrefix}-001
                      </div>
                    </div>
                    <div className="h-2 rounded" style={{ backgroundColor: settings.primaryColor }}></div>
                    <div className="mt-2 h-1 rounded" style={{ backgroundColor: settings.secondaryColor }}></div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('Branding')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Branding
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>Email Configuration</span>
                </CardTitle>
                <CardDescription>Configure email sending for invoices and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Email Provider</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {emailProviders.map((provider) => (
                      <div
                        key={provider.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          settings.emailProvider === provider.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSettings({ ...settings, emailProvider: provider.id })}
                      >
                        <h4 className="font-medium">{provider.name}</h4>
                        <p className="text-sm text-gray-600">{provider.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {settings.emailProvider === 'smtp' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">SMTP Configuration</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input
                          id="smtpHost"
                          value={settings.smtpHost}
                          onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                          className="bg-white/60 border-white/30"
                          placeholder="smtp.gmail.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input
                          id="smtpPort"
                          value={settings.smtpPort}
                          onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                          className="bg-white/60 border-white/30"
                          placeholder="587"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtpUsername">Username</Label>
                        <Input
                          id="smtpUsername"
                          value={settings.smtpUsername}
                          onChange={(e) => setSettings({ ...settings, smtpUsername: e.target.value })}
                          className="bg-white/60 border-white/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtpPassword">Password</Label>
                        <Input
                          id="smtpPassword"
                          type="password"
                          value={settings.smtpPassword}
                          onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                          className="bg-white/60 border-white/30"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="smtpEncryption">Encryption</Label>
                      <Select value={settings.smtpEncryption} onValueChange={(value) => setSettings({ ...settings, smtpEncryption: value })}>
                        <SelectTrigger className="bg-white/60 border-white/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={settings.fromEmail}
                      onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={settings.fromName}
                      onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
                      className="bg-white/60 border-white/30"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" className="bg-white/60 border-white/30">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Test Email
                  </Button>
                  <Button 
                    onClick={() => handleSave('Email')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Email Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMS Settings */}
          <TabsContent value="sms" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <span>SMS Configuration</span>
                </CardTitle>
                <CardDescription>Configure SMS notifications for payments and reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>SMS Provider</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {smsProviders.map((provider) => (
                      <div
                        key={provider.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          settings.smsProvider === provider.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSettings({ ...settings, smsProvider: provider.id })}
                      >
                        <h4 className="font-medium">{provider.name}</h4>
                        <p className="text-sm text-gray-600">{provider.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">API Configuration</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smsApiKey">API Key</Label>
                      <Input
                        id="smsApiKey"
                        type="password"
                        value={settings.smsApiKey}
                        onChange={(e) => setSettings({ ...settings, smsApiKey: e.target.value })}
                        className="bg-white/60 border-white/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smsApiSecret">API Secret</Label>
                      <Input
                        id="smsApiSecret"
                        type="password"
                        value={settings.smsApiSecret}
                        onChange={(e) => setSettings({ ...settings, smsApiSecret: e.target.value })}
                        className="bg-white/60 border-white/30"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smsFromNumber">From Number</Label>
                    <Input
                      id="smsFromNumber"
                      value={settings.smsFromNumber}
                      onChange={(e) => setSettings({ ...settings, smsFromNumber: e.target.value })}
                      className="bg-white/60 border-white/30"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" className="bg-white/60 border-white/30">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Test SMS
                  </Button>
                  <Button 
                    onClick={() => handleSave('SMS')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save SMS Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Configure when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    {Object.entries(settings.emailNotifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </Label>
                          <p className="text-xs text-gray-500">
                            {key === 'invoiceCreated' && 'Get notified when a new invoice is created'}
                            {key === 'invoiceSent' && 'Get notified when an invoice is sent to a client'}
                            {key === 'paymentReceived' && 'Get notified when a payment is received'}
                            {key === 'paymentOverdue' && 'Get notified when a payment becomes overdue'}
                            {key === 'teamMemberAdded' && 'Get notified when a new team member joins'}
                            {key === 'clientAdded' && 'Get notified when a new client is added'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => 
                            setSettings({
                              ...settings,
                              emailNotifications: {
                                ...settings.emailNotifications,
                                [key]: checked
                              }
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">SMS Notifications</h4>
                  <div className="space-y-4">
                    {Object.entries(settings.smsNotifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </Label>
                          <p className="text-xs text-gray-500">
                            {key === 'paymentReceived' && 'SMS when payment is received'}
                            {key === 'paymentOverdue' && 'SMS when payment becomes overdue'}
                            {key === 'invoiceReminder' && 'SMS reminders for upcoming due dates'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => 
                            setSettings({
                              ...settings,
                              smsNotifications: {
                                ...settings.smsNotifications,
                                [key]: checked
                              }
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('Notifications')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span>Payment Gateways</span>
                </CardTitle>
                <CardDescription>Configure payment processing for your invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {paymentGateways.map((gateway) => (
                  <div key={gateway.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{gateway.logo}</span>
                        <div>
                          <h4 className="font-medium">{gateway.name}</h4>
                          <p className="text-sm text-gray-600">{gateway.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.paymentGateways[gateway.id as keyof typeof settings.paymentGateways]?.enabled || false}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            paymentGateways: {
                              ...settings.paymentGateways,
                              [gateway.id]: {
                                ...settings.paymentGateways[gateway.id as keyof typeof settings.paymentGateways],
                                enabled: checked
                              }
                            }
                          })
                        }
                      />
                    </div>
                    
                    {settings.paymentGateways[gateway.id as keyof typeof settings.paymentGateways]?.enabled && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label>Public Key / Client ID</Label>
                          <Input
                            type="password"
                            className="bg-white/60 border-white/30"
                            placeholder="Enter public key"
                          />
                        </div>
                        <div>
                          <Label>Secret Key / Client Secret</Label>
                          <Input
                            type="password"
                            className="bg-white/60 border-white/30"
                            placeholder="Enter secret key"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('Payment')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Payment Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoice Settings */}
          <TabsContent value="invoices" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Invoice Configuration</span>
                </CardTitle>
                <CardDescription>Configure invoice behavior and automation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Numbering</Label>
                        <p className="text-xs text-gray-500">Automatically generate invoice numbers</p>
                      </div>
                      <Switch
                        checked={settings.invoiceSettings.autoNumbering}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            invoiceSettings: {
                              ...settings.invoiceSettings,
                              autoNumbering: checked
                            }
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="defaultDueDays">Default Due Days</Label>
                      <Input
                        id="defaultDueDays"
                        type="number"
                        value={settings.invoiceSettings.defaultDueDays}
                        onChange={(e) => 
                          setSettings({
                            ...settings,
                            invoiceSettings: {
                              ...settings.invoiceSettings,
                              defaultDueDays: parseInt(e.target.value)
                            }
                          })
                        }
                        className="bg-white/60 border-white/30"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Late Fee</Label>
                        <p className="text-xs text-gray-500">Charge late fees for overdue invoices</p>
                      </div>
                      <Switch
                        checked={settings.invoiceSettings.lateFeeEnabled}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            invoiceSettings: {
                              ...settings.invoiceSettings,
                              lateFeeEnabled: checked
                            }
                          })
                        }
                      />
                    </div>

                    {settings.invoiceSettings.lateFeeEnabled && (
                      <div>
                        <Label htmlFor="lateFeePercentage">Late Fee Percentage</Label>
                        <Input
                          id="lateFeePercentage"
                          type="number"
                          value={settings.invoiceSettings.lateFeePercentage}
                          onChange={(e) => 
                            setSettings({
                              ...settings,
                              invoiceSettings: {
                                ...settings.invoiceSettings,
                                lateFeePercentage: parseFloat(e.target.value)
                              }
                            })
                          }
                          className="bg-white/60 border-white/30"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Send Reminders</Label>
                        <p className="text-xs text-gray-500">Automatically send payment reminders</p>
                      </div>
                      <Switch
                        checked={settings.invoiceSettings.autoSendReminders}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            invoiceSettings: {
                              ...settings.invoiceSettings,
                              autoSendReminders: checked
                            }
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Signature</Label>
                        <p className="text-xs text-gray-500">Require client signature on invoices</p>
                      </div>
                      <Switch
                        checked={settings.invoiceSettings.requireSignature}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            invoiceSettings: {
                              ...settings.invoiceSettings,
                              requireSignature: checked
                            }
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Payment Instructions</Label>
                        <p className="text-xs text-gray-500">Display payment instructions on invoices</p>
                      </div>
                      <Switch
                        checked={settings.invoiceSettings.showPaymentInstructions}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            invoiceSettings: {
                              ...settings.invoiceSettings,
                              showPaymentInstructions: checked
                            }
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {settings.invoiceSettings.showPaymentInstructions && (
                  <div>
                    <Label htmlFor="paymentInstructions">Payment Instructions</Label>
                    <Textarea
                      id="paymentInstructions"
                      value={settings.invoiceSettings.paymentInstructions}
                      onChange={(e) => 
                        setSettings({
                          ...settings,
                          invoiceSettings: {
                            ...settings.invoiceSettings,
                            paymentInstructions: e.target.value
                          }
                        })
                      }
                      className="bg-white/60 border-white/30"
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('Invoice')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Invoice Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Security & API</span>
                </CardTitle>
                <CardDescription>Manage security settings and API access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-xs text-gray-500">Add extra security to your account</p>
                      </div>
                      <Switch
                        checked={settings.twoFactorEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, twoFactorEnabled: checked })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                        className="bg-white/60 border-white/30"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Audit Logging</Label>
                        <p className="text-xs text-gray-500">Track all system activities</p>
                      </div>
                      <Switch
                        checked={settings.auditLogging}
                        onCheckedChange={(checked) => setSettings({ ...settings, auditLogging: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                      <Textarea
                        id="ipWhitelist"
                        value={settings.ipWhitelist}
                        onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value })}
                        className="bg-white/60 border-white/30"
                        placeholder="192.168.1.1&#10;10.0.0.1"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">One IP address per line</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">API Configuration</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>API Access</Label>
                        <p className="text-xs text-gray-500">Enable API access for integrations</p>
                      </div>
                      <Switch
                        checked={settings.apiEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, apiEnabled: checked })}
                      />
                    </div>

                    {settings.apiEnabled && (
                      <>
                        <div>
                          <Label>API Key</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Input
                              type={showApiKey ? 'text' : 'password'}
                              value={settings.apiKey}
                              readOnly
                              className="bg-gray-100 border-gray-200"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={copyApiKey}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={generateApiKey}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Keep your API key secure and don't share it publicly</p>
                        </div>

                        <div>
                          <Label htmlFor="webhookUrl">Webhook URL</Label>
                          <Input
                            id="webhookUrl"
                            type="url"
                            value={settings.webhookUrl}
                            onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                            className="bg-white/60 border-white/30"
                            placeholder="https://your-app.com/webhooks"
                          />
                        </div>

                        <div>
                          <Label htmlFor="webhookSecret">Webhook Secret</Label>
                          <Input
                            id="webhookSecret"
                            type="password"
                            value={settings.webhookSecret}
                            onChange={(e) => setSettings({ ...settings, webhookSecret: e.target.value })}
                            className="bg-white/60 border-white/30"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('Security')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API Documentation */}
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">API Documentation</h3>
                    <p className="text-purple-100 mb-4">
                      Integrate InvoiceAI with your applications using our comprehensive REST API. 
                      Access invoices, clients, payments, and more programmatically.
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Code className="h-4 w-4 text-purple-200" />
                        <span className="text-purple-100">REST API</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Webhook className="h-4 w-4 text-purple-200" />
                        <span className="text-purple-100">Webhooks</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-purple-200" />
                        <span className="text-purple-100">Real-time Data</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                      <Code className="mr-2 h-5 w-5" />
                      View API Docs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}