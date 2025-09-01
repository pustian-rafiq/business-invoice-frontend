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
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  Building,
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Settings,
  Upload,
  Sparkles,
  Crown,
  Users,
  FileText,
  BarChart3,
  Zap
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

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
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

export default function CreateBusinessPage() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
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
    
    // Branding
    logo: null as File | null,
    primaryColor: '#3B82F6',
    invoicePrefix: 'INV',
    
    // Plan Selection
    selectedPlan: 'personal'
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
        description: `${formData.name} has been set up and is ready to use.`,
      });
      
      // Redirect to business dashboard or list
      // router.push('/dashboard/business');
      
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

  const plans = [
    {
      id: 'personal',
      name: 'Personal',
      price: '$29/month',
      features: ['Unlimited invoices', 'Up to 50 clients', '1 business', 'Basic support'],
      recommended: true
    },
    {
      id: 'team',
      name: 'Team',
      price: '$79/month',
      features: ['Everything in Personal', 'Up to 500 clients', '3 businesses', 'Team collaboration', 'Priority support'],
      recommended: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      features: ['Everything in Team', 'Unlimited everything', 'Custom integrations', 'Dedicated support'],
      recommended: false
    }
  ];

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
              <h1 className="text-3xl font-bold text-gray-900">Create New Business</h1>
              <p className="text-gray-600 mt-2">Set up your business profile and start managing invoices</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      step <= currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Contact Details'}
                      {step === 3 && 'Settings'}
                      {step === 4 && 'Plan Selection'}
                    </div>
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
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
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      <span>Basic Information</span>
                    </CardTitle>
                    <CardDescription>Tell us about your business</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Business Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/60 border-white/30"
                        placeholder="Enter your business name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-white/60 border-white/30"
                        placeholder="Brief description of your business"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="industry">Industry *</Label>
                        <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                          <SelectTrigger className="bg-white/60 border-white/30">
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
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                          <SelectTrigger className="bg-white/60 border-white/30">
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

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="pl-10 bg-white/60 border-white/30"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span>Contact Information</span>
                    </CardTitle>
                    <CardDescription>How can clients reach your business?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10 bg-white/60 border-white/30"
                            placeholder="business@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="pl-10 bg-white/60 border-white/30"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="pl-10 bg-white/60 border-white/30"
                          placeholder="123 Business Street"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="bg-white/60 border-white/30"
                          placeholder="New York"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="bg-white/60 border-white/30"
                          placeholder="NY"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="bg-white/60 border-white/30"
                          placeholder="10001"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="bg-white/60 border-white/30"
                          placeholder="United States"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Business Settings */}
              {currentStep === 3 && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      <span>Business Settings</span>
                    </CardTitle>
                    <CardDescription>Configure your business preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
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
                        <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="taxId">Tax ID/VAT Number</Label>
                        <Input
                          id="taxId"
                          value={formData.taxId}
                          onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                          className="bg-white/60 border-white/30"
                          placeholder="TAX123456789"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="registrationNumber">Registration Number</Label>
                        <Input
                          id="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                          className="bg-white/60 border-white/30"
                          placeholder="REG123456789"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label>Branding</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                          <Input
                            id="invoicePrefix"
                            value={formData.invoicePrefix}
                            onChange={(e) => setFormData({ ...formData, invoicePrefix: e.target.value })}
                            className="bg-white/60 border-white/30"
                            placeholder="INV"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="primaryColor">Primary Color</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="primaryColor"
                              type="color"
                              value={formData.primaryColor}
                              onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                              className="w-16 h-10 bg-white/60 border-white/30"
                            />
                            <Input
                              value={formData.primaryColor}
                              onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                              className="bg-white/60 border-white/30"
                              placeholder="#3B82F6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Business Logo</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drop your logo here, or <span className="text-blue-600 cursor-pointer">browse</span>
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Plan Selection */}
              {currentStep === 4 && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-blue-600" />
                      <span>Choose Your Plan</span>
                    </CardTitle>
                    <CardDescription>Select the plan that best fits your business needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.selectedPlan === plan.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData({ ...formData, selectedPlan: plan.id })}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                formData.selectedPlan === plan.id
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}>
                                {formData.selectedPlan === plan.id && (
                                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                                  {plan.recommended && (
                                    <Badge className="bg-blue-100 text-blue-700">
                                      <Sparkles className="mr-1 h-3 w-3" />
                                      Recommended
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{plan.price}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <ul className="space-y-2">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
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
                  className="bg-white/60 border-white/30"
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Step {currentStep} of 4</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    {currentStep === 1 && (
                      <>
                        <p>Tell us about your business basics like name, industry, and type.</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-blue-500" />
                            <span>Business name and description</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-blue-500" />
                            <span>Industry and website</span>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <p>Provide contact information so clients can reach you.</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-blue-500" />
                            <span>Email and phone</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span>Business address</span>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <p>Configure your business settings and branding.</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Settings className="h-4 w-4 text-blue-500" />
                            <span>Currency and timezone</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-blue-500" />
                            <span>Tax ID and branding</span>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 4 && (
                      <>
                        <p>Choose the plan that best fits your business needs.</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Crown className="h-4 w-4 text-blue-500" />
                            <span>Plan features</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-blue-500" />
                            <span>Usage limits</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Plan Benefits */}
              <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="font-semibold">Why Create a Business?</h3>
                  </div>
                  <div className="space-y-2 text-sm text-purple-100">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Professional invoicing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Team collaboration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>Business analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>AI-powered insights</span>
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