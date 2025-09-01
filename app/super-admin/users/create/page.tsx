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
  User,
  Shield,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Settings,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Crown,
  Users,
  Lock,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const roles = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Full platform access with all administrative privileges',
    permissions: ['platform_management', 'user_management', 'business_management', 'system_settings'],
    color: 'text-red-400',
    icon: Shield
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Administrative access to manage businesses and users',
    permissions: ['user_management', 'business_management', 'support'],
    color: 'text-orange-400',
    icon: Crown
  },
  {
    id: 'business_owner',
    name: 'Business Owner',
    description: 'Full access to their own business and team management',
    permissions: ['business_management', 'team_management', 'invoice_management'],
    color: 'text-purple-400',
    icon: Building
  },
  {
    id: 'team_member',
    name: 'Team Member',
    description: 'Limited access based on assigned permissions',
    permissions: ['invoice_management'],
    color: 'text-blue-400',
    icon: Users
  }
];

const subscriptionPlans = [
  { id: 'free_trial', name: 'Free Trial', description: '14-day trial period' },
  { id: 'personal', name: 'Personal Plan', description: '$29/month - Individual use' },
  { id: 'team', name: 'Team Plan', description: '$79/month - Team collaboration' },
  { id: 'enterprise', name: 'Enterprise Plan', description: 'Custom pricing - Large organizations' }
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'Other'
];

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Account Settings
    password: '',
    role: 'team_member',
    status: 'active',
    
    // Business Assignment
    assignedBusinesses: [] as string[],
    defaultBusiness: '',
    
    // Subscription
    subscriptionPlan: 'personal',
    subscriptionStatus: 'active',
    
    // Location
    country: '',
    timezone: 'America/New_York',
    
    // Security
    emailVerified: true,
    twoFactorEnabled: false,
    accountLocked: false,
    
    // Permissions
    customPermissions: [] as string[],
    
    // Additional
    notes: '',
    sendWelcomeEmail: true,
    requirePasswordChange: false
  });

  const { toast } = useToast();

  const selectedRole = roles.find(r => r.id === formData.role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "User created successfully!",
        description: `${formData.firstName} ${formData.lastName} has been added to the platform.`,
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'team_member',
        status: 'active',
        assignedBusinesses: [],
        defaultBusiness: '',
        subscriptionPlan: 'personal',
        subscriptionStatus: 'active',
        country: '',
        timezone: 'America/New_York',
        emailVerified: true,
        twoFactorEnabled: false,
        accountLocked: false,
        customPermissions: [],
        notes: '',
        sendWelcomeEmail: true,
        requirePasswordChange: false
      });
      
    } catch (error) {
      toast({
        title: "Error creating user",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password });
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/super-admin/users">
              <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Users
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Create New User</h1>
              <p className="text-gray-400 mt-2">Add a new user to the platform with specific roles and permissions</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <User className="h-5 w-5 text-blue-400" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Basic user details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                          placeholder="john@example.com"
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country" className="text-gray-300">Country</Label>
                      <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
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
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          <SelectItem value="Europe/London">London Time</SelectItem>
                          <SelectItem value="Europe/Paris">Paris Time</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <span>Account Settings</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Role assignment and account configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="password" className="text-gray-300">Password *</Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10 pr-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                          placeholder="Enter password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <Button type="button" onClick={generatePassword} variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role" className="text-gray-300">Role *</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              <div className="flex items-center space-x-2">
                                <role.icon className={`h-4 w-4 ${role.color}`} />
                                <div>
                                  <div className="font-medium">{role.name}</div>
                                  <div className="text-sm text-gray-500">{role.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status" className="text-gray-300">Account Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending Verification</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedRole && (
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <selectedRole.icon className={`h-5 w-5 ${selectedRole.color}`} />
                        <h4 className="font-medium text-white">{selectedRole.name}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{selectedRole.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.permissions.map((permission) => (
                          <Badge key={permission} className="bg-gray-700/50 text-gray-300">
                            {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Subscription Settings */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <CreditCard className="h-5 w-5 text-green-400" />
                    <span>Subscription Settings</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Configure user subscription and billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subscriptionPlan" className="text-gray-300">Subscription Plan</Label>
                      <Select value={formData.subscriptionPlan} onValueChange={(value) => setFormData({ ...formData, subscriptionPlan: value })}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {subscriptionPlans.map((plan) => (
                            <SelectItem key={plan.id} value={plan.id}>
                              <div>
                                <div className="font-medium">{plan.name}</div>
                                <div className="text-sm text-gray-500">{plan.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subscriptionStatus" className="text-gray-300">Subscription Status</Label>
                      <Select value={formData.subscriptionStatus} onValueChange={(value) => setFormData({ ...formData, subscriptionStatus: value })}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="trial">Trial</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Shield className="h-5 w-5 text-red-400" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Configure security and verification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emailVerified"
                          checked={formData.emailVerified}
                          onCheckedChange={(checked) => setFormData({ ...formData, emailVerified: checked as boolean })}
                          className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                        />
                        <Label htmlFor="emailVerified" className="text-gray-300">Email Verified</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="twoFactorEnabled"
                          checked={formData.twoFactorEnabled}
                          onCheckedChange={(checked) => setFormData({ ...formData, twoFactorEnabled: checked as boolean })}
                          className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                        />
                        <Label htmlFor="twoFactorEnabled" className="text-gray-300">Two-Factor Authentication</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="accountLocked"
                          checked={formData.accountLocked}
                          onCheckedChange={(checked) => setFormData({ ...formData, accountLocked: checked as boolean })}
                          className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                        />
                        <Label htmlFor="accountLocked" className="text-gray-300">Account Locked</Label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendWelcomeEmail"
                          checked={formData.sendWelcomeEmail}
                          onCheckedChange={(checked) => setFormData({ ...formData, sendWelcomeEmail: checked as boolean })}
                          className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                        />
                        <Label htmlFor="sendWelcomeEmail" className="text-gray-300">Send Welcome Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="requirePasswordChange"
                          checked={formData.requirePasswordChange}
                          onCheckedChange={(checked) => setFormData({ ...formData, requirePasswordChange: checked as boolean })}
                          className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                        />
                        <Label htmlFor="requirePasswordChange" className="text-gray-300">Require Password Change</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Settings className="h-5 w-5 text-indigo-400" />
                    <span>Additional Information</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Notes and additional configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="notes" className="text-gray-300">Admin Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      placeholder="Add any notes about this user..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating User...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create User
                      </>
                    )}
                  </Button>
                  
                  <Button type="button" variant="outline" className="w-full bg-gray-800/60 border-gray-700/50 text-gray-300">
                    <Send className="mr-2 h-4 w-4" />
                    Create & Send Invite
                  </Button>
                </CardContent>
              </Card>

              {/* Role Information */}
              {selectedRole && (
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <selectedRole.icon className={`h-5 w-5 ${selectedRole.color}`} />
                      <span>{selectedRole.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-400">{selectedRole.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Permissions</h4>
                      <div className="space-y-2">
                        {selectedRole.permissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2 text-sm text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span>{permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Guidelines */}
              <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-5 w-5 text-red-300" />
                    <h3 className="font-semibold text-white">Security Guidelines</h3>
                  </div>
                  <div className="space-y-2 text-sm text-red-100">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Always verify user identity before granting admin access</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Enable 2FA for all administrative accounts</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Monitor user activity for suspicious behavior</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Regular password updates are recommended</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Platform Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Total Users</span>
                    <span className="font-medium text-white">{stats.total}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Active Users</span>
                    <span className="font-medium text-white">{stats.active}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Admin Users</span>
                    <span className="font-medium text-white">{stats.admins}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Platform Revenue</span>
                    <span className="font-medium text-white">${stats.totalRevenue.toLocaleString()}</span>
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