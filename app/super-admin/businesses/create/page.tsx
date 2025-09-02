'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
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
  Send,
  Building,
  User,
  Crown,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Settings,
  Shield,
  Zap,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Marketing',
  'Consulting',
  'Legal',
  'Construction',
  'Food & Beverage',
  'Transportation',
  'Entertainment',
  'Other'
];

const businessTypes = [
  'Sole Proprietorship',
  'Partnership',
  'LLC',
  'Corporation',
  'S-Corporation',
  'Non-Profit',
  'Other'
];

const subscriptionPlans = [
  { id: 'free_trial', name: 'Free Trial', price: 0, description: '14-day trial period' },
  { id: 'personal', name: 'Personal Plan', price: 29, description: 'Individual use' },
  { id: 'team', name: 'Team Plan', price: 79, description: 'Team collaboration' },
  { id: 'enterprise', name: 'Enterprise Plan', price: 299, description: 'Large organizations' }
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
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
  'Australia/Sydney'
];

export default function CreateBusinessPage() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Business Information
    name: '',
    description: '',
    industry: '',
    businessType: '',
    website: '',
    
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Business Settings
    currency: 'USD',
    timezone: 'America/New_York',
    taxId: '',
    registrationNumber: '',
    
    // Owner Information
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerPassword: '',
    createOwnerAccount: true,
    
    // Subscription
    subscriptionPlan: 'personal',
    subscriptionStatus: 'active',
    billingCycle: 'monthly',
    
    // Admin Settings
    adminNotes: '',
    autoActivate: true,
    sendWelcomeEmail: true,
    skipTrial: false,
    
    // Compliance
    taxCompliant: true,
    gdprCompliant: true,
    dataRetentionCompliant: true
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Business created successfully!",
        description: `${formData.name} has been set up and configured.`,
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        industry: '',
        businessType: '',
        website: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        currency: 'USD',
        timezone: 'America/New_York',
        taxId: '',
        registrationNumber: '',
        ownerFirstName: '',
        ownerLastName: '',
        ownerEmail: '',
        ownerPhone: '',
        ownerPassword: '',
        createOwnerAccount: true,
        subscriptionPlan: 'personal',
        subscriptionStatus: 'active',
        billingCycle: 'monthly',
        adminNotes: '',
        autoActivate: true,
        sendWelcomeEmail: true,
        skipTrial: false,
        taxCompliant: true,
        gdprCompliant: true,
        dataRetentionCompliant: true
      });
      setCurrentStep(1);
      
    } catch (error) {
      toast({
        title: "Error creating business",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, ownerPassword: password });
  };

  const selectedPlan = subscriptionPlans.find(p => p.id === formData.subscriptionPlan);

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/super-admin/businesses">
              <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Businesses
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Create New Business</h1>
              <p className="text-gray-400 mt-2">Set up a new business account with owner and subscription</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      step <= currentStep ? 'text-red-400' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'Business Info'}
                      {step === 2 && 'Owner Account'}
                      {step === 3 && 'Subscription'}
                      {step === 4 && 'Configuration'}
                    </div>
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      step < currentStep ? 'bg-red-600' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Building className="h-5 w-5 text-blue-400" />
                      <span>Business Information</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">Basic business details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Business Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                        placeholder="Enter business name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description" className="text-gray-300">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                        placeholder="Brief description of the business"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="industry" className="text-gray-300">Industry *</Label>
                        <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="businessType" className="text-gray-300">Business Type</Label>
                        <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-300">Business Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                            placeholder="business@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-gray-300">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-gray-300">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                          placeholder="123 Business Street, City, State 12345"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Owner Account */}
              {currentStep === 2 && (
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <User className="h-5 w-5 text-purple-400" />
                      <span>Business Owner Account</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">Create or assign a business owner account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="createOwnerAccount"
                        checked={formData.createOwnerAccount}
                        onCheckedChange={(checked) => setFormData({ ...formData, createOwnerAccount: checked as boolean })}
                        className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <Label htmlFor="createOwnerAccount" className="text-gray-300">Create new owner account</Label>
                    </div>

                    {formData.createOwnerAccount && (
                      <div className="space-y-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="ownerFirstName" className="text-gray-300">First Name *</Label>
                            <Input
                              id="ownerFirstName"
                              value={formData.ownerFirstName}
                              onChange={(e) => setFormData({ ...formData, ownerFirstName: e.target.value })}
                              className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                              placeholder="John"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="ownerLastName" className="text-gray-300">Last Name *</Label>
                            <Input
                              id="ownerLastName"
                              value={formData.ownerLastName}
                              onChange={(e) => setFormData({ ...formData, ownerLastName: e.target.value })}
                              className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                              placeholder="Doe"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="ownerEmail" className="text-gray-300">Email Address *</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="ownerEmail"
                                type="email"
                                value={formData.ownerEmail}
                                onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                                className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                                placeholder="owner@example.com"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="ownerPhone" className="text-gray-300">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="ownerPhone"
                                value={formData.ownerPhone}
                                onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                                className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="ownerPassword" className="text-gray-300">Password *</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <Input
                                id="ownerPassword"
                                type={showOwnerPassword ? 'text' : 'password'}
                                value={formData.ownerPassword}
                                onChange={(e) => setFormData({ ...formData, ownerPassword: e.target.value })}
                                className="pr-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                                placeholder="Enter password"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                              >
                                {showOwnerPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                            <Button type="button" onClick={generatePassword} variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                              Generate
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Subscription */}
              {currentStep === 3 && (
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <CreditCard className="h-5 w-5 text-green-400" />
                      <span>Subscription Plan</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">Configure the business subscription and billing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-300">Select Plan</Label>
                      <div className="grid gap-4 mt-2">
                        {subscriptionPlans.map((plan) => (
                          <div
                            key={plan.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.subscriptionPlan === plan.id
                                ? 'border-red-500 bg-red-900/20'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                            onClick={() => setFormData({ ...formData, subscriptionPlan: plan.id })}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-4 h-4 rounded-full border-2 ${
                                  formData.subscriptionPlan === plan.id
                                    ? 'border-red-500 bg-red-500'
                                    : 'border-gray-600'
                                }`}>
                                  {formData.subscriptionPlan === plan.id && (
                                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-white">{plan.name}</h3>
                                  <p className="text-sm text-gray-400">{plan.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-white">
                                  {plan.price === 0 ? 'Free' : `$${plan.price}/month`}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subscriptionStatus" className="text-gray-300">Subscription Status</Label>
                        <Select value={formData.subscriptionStatus} onValueChange={(value) => setFormData({ ...formData, subscriptionStatus: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="trial">Trial</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="billingCycle" className="text-gray-300">Billing Cycle</Label>
                        <Select value={formData.billingCycle} onValueChange={(value) => setFormData({ ...formData, billingCycle: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                            <SelectItem value="trial">Trial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {selectedPlan && (
                      <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                        <h4 className="font-medium text-white mb-2">Plan Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Plan:</span>
                            <span className="text-white">{selectedPlan.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Price:</span>
                            <span className="text-white">
                              {selectedPlan.price === 0 ? 'Free' : `$${selectedPlan.price}/${formData.billingCycle}`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-white capitalize">{formData.subscriptionStatus}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Configuration */}
              {currentStep === 4 && (
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Settings className="h-5 w-5 text-indigo-400" />
                      <span>Business Configuration</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">Final configuration and compliance settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currency" className="text-gray-300">Currency</Label>
                        <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
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
                        <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
                        <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="taxId" className="text-gray-300">Tax ID</Label>
                        <Input
                          id="taxId"
                          value={formData.taxId}
                          onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                          className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                          placeholder="TAX123456789"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="registrationNumber" className="text-gray-300">Registration Number</Label>
                        <Input
                          id="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                          className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                          placeholder="REG123456789"
                        />
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div>
                      <Label className="text-gray-300">Compliance Settings</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="taxCompliant"
                            checked={formData.taxCompliant}
                            onCheckedChange={(checked) => setFormData({ ...formData, taxCompliant: checked as boolean })}
                            className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                          />
                          <Label htmlFor="taxCompliant" className="text-gray-300">Tax Compliant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="gdprCompliant"
                            checked={formData.gdprCompliant}
                            onCheckedChange={(checked) => setFormData({ ...formData, gdprCompliant: checked as boolean })}
                            className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                          />
                          <Label htmlFor="gdprCompliant" className="text-gray-300">GDPR Compliant</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300">Activation Settings</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="autoActivate"
                            checked={formData.autoActivate}
                            onCheckedChange={(checked) => setFormData({ ...formData, autoActivate: checked as boolean })}
                            className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                          />
                          <Label htmlFor="autoActivate" className="text-gray-300">Auto-activate business</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sendWelcomeEmail"
                            checked={formData.sendWelcomeEmail}
                            onCheckedChange={(checked) => setFormData({ ...formData, sendWelcomeEmail: checked as boolean })}
                            className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                          />
                          <Label htmlFor="sendWelcomeEmail" className="text-gray-300">Send welcome email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="skipTrial"
                            checked={formData.skipTrial}
                            onCheckedChange={(checked) => setFormData({ ...formData, skipTrial: checked as boolean })}
                            className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                          />
                          <Label htmlFor="skipTrial" className="text-gray-300">Skip trial period</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="adminNotes" className="text-gray-300">Admin Notes</Label>
                      <Textarea
                        id="adminNotes"
                        value={formData.adminNotes}
                        onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                        className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                        placeholder="Internal notes about this business..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white"
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Business...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Business
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Current Step Info */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Step {currentStep} of 4</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-400">
                    {currentStep === 1 && (
                      <>
                        <p>Set up the basic business information and contact details.</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-red-400" />
                            <span>Business name and description</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-red-400" />
                            <span>Industry and contact info</span>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <p>Create or assign a business owner account with full access.</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-red-400" />
                            <span>Owner account creation</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-red-400" />
                            <span>Security credentials</span>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <p>Configure the subscription plan and billing settings.</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-red-400" />
                            <span>Plan selection</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Crown className="h-4 w-4 text-red-400" />
                            <span>Billing configuration</span>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 4 && (
                      <>
                        <p>Final configuration and compliance settings.</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Settings className="h-4 w-4 text-red-400" />
                            <span>Business settings</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-red-400" />
                            <span>Compliance setup</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Security Guidelines */}
              <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-5 w-5 text-red-300" />
                    <h3 className="font-semibold text-white">Admin Guidelines</h3>
                  </div>
                  <div className="space-y-2 text-sm text-red-100">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Verify business legitimacy before activation</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Ensure compliance with platform policies</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Monitor initial business activity</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Document any special arrangements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Stats */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Platform Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Total Businesses</span>
                    <span className="font-medium text-white">{stats.total}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Active Businesses</span>
                    <span className="font-medium text-white">{stats.active}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Platform Revenue</span>
                    <span className="font-medium text-white">${stats.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Total Members</span>
                    <span className="font-medium text-white">{stats.totalMembers}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </SuperAdminLayout>
  );
}