'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Save,
  Settings,
  Shield,
  Database,
  Mail,
  Bell,
  Globe,
  CreditCard,
  Users,
  Building,
  Zap,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  FileText,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Cloud,
  Key,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SuperAdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [activeTab, setActiveTab] = useState('platform');
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    // Platform Settings
    platformName: 'InvoiceAI',
    platformDescription: 'AI-powered business management platform',
    platformUrl: 'https://invoiceai.com',
    supportEmail: 'support@invoiceai.com',
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    defaultTimezone: 'America/New_York',
    defaultCurrency: 'USD',
    
    // Security Settings
    sessionTimeout: 480, // minutes
    maxLoginAttempts: 5,
    lockoutDuration: 30, // minutes
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    enforcePasswordHistory: 5,
    twoFactorRequired: false,
    twoFactorGracePeriod: 7, // days
    
    // API Settings
    apiRateLimit: 1000, // requests per hour
    apiTimeout: 30, // seconds
    webhookRetries: 3,
    webhookTimeout: 30,
    apiVersioning: true,
    deprecationNotice: 90, // days
    
    // Email Settings
    smtpHost: 'smtp.invoiceai.com',
    smtpPort: 587,
    smtpUsername: 'noreply@invoiceai.com',
    smtpPassword: '••••••••••••',
    smtpEncryption: 'tls',
    emailFromName: 'InvoiceAI Support',
    emailFromAddress: 'noreply@invoiceai.com',
    emailTemplatesEnabled: true,
    
    // Database Settings
    backupFrequency: 24, // hours
    backupRetention: 30, // days
    autoBackup: true,
    compressionEnabled: true,
    encryptionEnabled: true,
    replicationEnabled: true,
    maintenanceWindow: '02:00',
    
    // Notification Settings
    systemAlerts: true,
    securityAlerts: true,
    performanceAlerts: true,
    billingAlerts: true,
    slackWebhook: '',
    discordWebhook: '',
    emailNotifications: true,
    smsNotifications: false,
    
    // Business Rules
    maxBusinessesPerUser: 3,
    trialDuration: 14, // days
    gracePeriod: 7, // days
    autoSuspendDays: 30,
    dataRetentionDays: 365,
    auditLogRetention: 2555, // 7 years
    
    // Payment Settings
    stripePublishableKey: 'pk_live_••••••••••••',
    stripeSecretKey: 'sk_live_••••••••••••',
    stripeWebhookSecret: 'whsec_••••••••••••',
    paypalClientId: '••••••••••••',
    paypalClientSecret: '••••••••••••',
    defaultPaymentMethod: 'stripe',
    
    // Feature Flags
    aiSuggestionsEnabled: true,
    advancedAnalytics: true,
    multiBusinessSupport: true,
    apiAccessEnabled: true,
    customBrandingEnabled: true,
    whitelabelEnabled: false,
    
    // System Resources
    maxCpuUsage: 80, // percentage
    maxMemoryUsage: 85, // percentage
    maxDiskUsage: 90, // percentage
    autoScaling: true,
    loadBalancing: true,
    cdnEnabled: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Settings updated successfully!",
        description: "All platform settings have been saved and applied.",
      });
      
    } catch (error) {
      toast({
        title: "Error updating settings",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const generateApiKey = (type: string) => {
    const key = `${type}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    toast({
      title: "API Key Generated",
      description: `New ${type} API key has been generated.`,
    });
    return key;
  };

  const testEmailSettings = () => {
    toast({
      title: "Testing email configuration...",
      description: "Sending test email to verify SMTP settings.",
    });
  };

  const backupDatabase = () => {
    toast({
      title: "Database backup initiated",
      description: "Manual backup has been started and will complete shortly.",
    });
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
            <p className="text-gray-400 mt-2">Configure and manage all platform settings and integrations</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Config
            </Button>
            <Button variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
              <Upload className="mr-2 h-4 w-4" />
              Import Config
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Settings
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8 bg-gray-700/50">
            <TabsTrigger value="platform" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Platform</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Security</TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Database</TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Email</TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">API</TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Payments</TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Features</TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">System</TabsTrigger>
          </TabsList>

          {/* Platform Settings */}
          <TabsContent value="platform" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span>Platform Configuration</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Basic platform settings and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="platformName" className="text-gray-300">Platform Name</Label>
                    <Input
                      id="platformName"
                      value={settings.platformName}
                      onChange={(e) => updateSetting('platformName', e.target.value)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="platformUrl" className="text-gray-300">Platform URL</Label>
                    <Input
                      id="platformUrl"
                      value={settings.platformUrl}
                      onChange={(e) => updateSetting('platformUrl', e.target.value)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="platformDescription" className="text-gray-300">Platform Description</Label>
                  <Textarea
                    id="platformDescription"
                    value={settings.platformDescription}
                    onChange={(e) => updateSetting('platformDescription', e.target.value)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="defaultTimezone" className="text-gray-300">Default Timezone</Label>
                    <Select value={settings.defaultTimezone} onValueChange={(value) => updateSetting('defaultTimezone', value)}>
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
                  <div>
                    <Label htmlFor="defaultCurrency" className="text-gray-300">Default Currency</Label>
                    <Select value={settings.defaultCurrency} onValueChange={(value) => updateSetting('defaultCurrency', value)}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
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

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Maintenance Mode</Label>
                      <Switch
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Allow New Registrations</Label>
                      <Switch
                        checked={settings.allowRegistrations}
                        onCheckedChange={(checked) => updateSetting('allowRegistrations', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Require Email Verification</Label>
                      <Switch
                        checked={settings.requireEmailVerification}
                        onCheckedChange={(checked) => updateSetting('requireEmailVerification', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Shield className="h-5 w-5 text-red-400" />
                  <span>Security Configuration</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Configure platform security policies and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Session Timeout (Minutes)</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Slider
                        value={[settings.sessionTimeout]}
                        onValueChange={(value) => updateSetting('sessionTimeout', value[0])}
                        max={1440}
                        min={30}
                        step={30}
                        className="flex-1"
                      />
                      <span className="text-white font-medium w-16">{settings.sessionTimeout}m</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Max Login Attempts</Label>
                    <Input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => updateSetting('maxLoginAttempts', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Lockout Duration (Minutes)</Label>
                    <Input
                      type="number"
                      value={settings.lockoutDuration}
                      onChange={(e) => updateSetting('lockoutDuration', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Password Min Length</Label>
                    <Input
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => updateSetting('passwordMinLength', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Password Requirements</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Require Special Characters</Label>
                      <Switch
                        checked={settings.requireSpecialChars}
                        onCheckedChange={(checked) => updateSetting('requireSpecialChars', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Require Numbers</Label>
                      <Switch
                        checked={settings.requireNumbers}
                        onCheckedChange={(checked) => updateSetting('requireNumbers', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Require Uppercase</Label>
                      <Switch
                        checked={settings.requireUppercase}
                        onCheckedChange={(checked) => updateSetting('requireUppercase', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Enforce Password History</Label>
                      <Input
                        type="number"
                        value={settings.enforcePasswordHistory}
                        onChange={(e) => updateSetting('enforcePasswordHistory', parseInt(e.target.value) || 0)}
                        className="w-20 bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Two-Factor Authentication</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Require 2FA for All Users</Label>
                      <Switch
                        checked={settings.twoFactorRequired}
                        onCheckedChange={(checked) => updateSetting('twoFactorRequired', checked)}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Grace Period (Days)</Label>
                      <Input
                        type="number"
                        value={settings.twoFactorGracePeriod}
                        onChange={(e) => updateSetting('twoFactorGracePeriod', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Settings */}
          <TabsContent value="database" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Database className="h-5 w-5 text-green-400" />
                  <span>Database Management</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Configure database backups, maintenance, and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Backup Frequency (Hours)</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Slider
                        value={[settings.backupFrequency]}
                        onValueChange={(value) => updateSetting('backupFrequency', value[0])}
                        max={168}
                        min={1}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-white font-medium w-12">{settings.backupFrequency}h</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Backup Retention (Days)</Label>
                    <Input
                      type="number"
                      value={settings.backupRetention}
                      onChange={(e) => updateSetting('backupRetention', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Maintenance Window</Label>
                  <Input
                    type="time"
                    value={settings.maintenanceWindow}
                    onChange={(e) => updateSetting('maintenanceWindow', e.target.value)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Auto Backup</Label>
                      <Switch
                        checked={settings.autoBackup}
                        onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Compression Enabled</Label>
                      <Switch
                        checked={settings.compressionEnabled}
                        onCheckedChange={(checked) => updateSetting('compressionEnabled', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Encryption Enabled</Label>
                      <Switch
                        checked={settings.encryptionEnabled}
                        onCheckedChange={(checked) => updateSetting('encryptionEnabled', checked)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Replication Enabled</Label>
                      <Switch
                        checked={settings.replicationEnabled}
                        onCheckedChange={(checked) => updateSetting('replicationEnabled', checked)}
                      />
                    </div>
                    <Button onClick={backupDatabase} variant="outline" className="w-full bg-gray-800/60 border-gray-700/50 text-gray-300">
                      <Download className="mr-2 h-4 w-4" />
                      Manual Backup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <span>Email Configuration</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Configure SMTP settings and email templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="smtpHost" className="text-gray-300">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => updateSetting('smtpHost', e.target.value)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort" className="text-gray-300">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => updateSetting('smtpPort', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="smtpUsername" className="text-gray-300">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={settings.smtpUsername}
                      onChange={(e) => updateSetting('smtpUsername', e.target.value)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword" className="text-gray-300">SMTP Password</Label>
                    <div className="relative">
                      <Input
                        id="smtpPassword"
                        type={showApiKeys ? 'text' : 'password'}
                        value={settings.smtpPassword}
                        onChange={(e) => updateSetting('smtpPassword', e.target.value)}
                        className="bg-gray-700/50 border-gray-600/50 text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                      >
                        {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emailFromName" className="text-gray-300">From Name</Label>
                    <Input
                      id="emailFromName"
                      value={settings.emailFromName}
                      onChange={(e) => updateSetting('emailFromName', e.target.value)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailFromAddress" className="text-gray-300">From Address</Label>
                    <Input
                      id="emailFromAddress"
                      type="email"
                      value={settings.emailFromAddress}
                      onChange={(e) => updateSetting('emailFromAddress', e.target.value)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Email Templates Enabled</Label>
                  <Switch
                    checked={settings.emailTemplatesEnabled}
                    onCheckedChange={(checked) => updateSetting('emailTemplatesEnabled', checked)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={testEmailSettings} variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                    <Send className="mr-2 h-4 w-4" />
                    Test Email Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Zap className="h-5 w-5 text-indigo-400" />
                  <span>API Configuration</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Configure API settings, rate limits, and webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Rate Limit (Requests/Hour)</Label>
                    <Input
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => updateSetting('apiRateLimit', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">API Timeout (Seconds)</Label>
                    <Input
                      type="number"
                      value={settings.apiTimeout}
                      onChange={(e) => updateSetting('apiTimeout', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Webhook Retries</Label>
                    <Input
                      type="number"
                      value={settings.webhookRetries}
                      onChange={(e) => updateSetting('webhookRetries', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Webhook Timeout (Seconds)</Label>
                    <Input
                      type="number"
                      value={settings.webhookTimeout}
                      onChange={(e) => updateSetting('webhookTimeout', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">API Versioning</Label>
                    <Switch
                      checked={settings.apiVersioning}
                      onCheckedChange={(checked) => updateSetting('apiVersioning', checked)}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Deprecation Notice (Days)</Label>
                    <Input
                      type="number"
                      value={settings.deprecationNotice}
                      onChange={(e) => updateSetting('deprecationNotice', parseInt(e.target.value) || 0)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <CreditCard className="h-5 w-5 text-green-400" />
                  <span>Payment Gateway Configuration</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Configure payment processors and billing settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white mb-4">Stripe Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Publishable Key</Label>
                      <div className="relative">
                        <Input
                          type={showApiKeys ? 'text' : 'password'}
                          value={settings.stripePublishableKey}
                          onChange={(e) => updateSetting('stripePublishableKey', e.target.value)}
                          className="bg-gray-700/50 border-gray-600/50 text-white pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKeys(!showApiKeys)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                        >
                          {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300">Secret Key</Label>
                      <Input
                        type="password"
                        value={settings.stripeSecretKey}
                        onChange={(e) => updateSetting('stripeSecretKey', e.target.value)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Webhook Secret</Label>
                    <Input
                      type="password"
                      value={settings.stripeWebhookSecret}
                      onChange={(e) => updateSetting('stripeWebhookSecret', e.target.value)}
                      className="bg-gray-700/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4">PayPal Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Client ID</Label>
                      <Input
                        type="password"
                        value={settings.paypalClientId}
                        onChange={(e) => updateSetting('paypalClientId', e.target.value)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Client Secret</Label>
                      <Input
                        type="password"
                        value={settings.paypalClientSecret}
                        onChange={(e) => updateSetting('paypalClientSecret', e.target.value)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Default Payment Method</Label>
                  <Select value={settings.defaultPaymentMethod} onValueChange={(value) => updateSetting('defaultPaymentMethod', value)}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feature Flags */}
          <TabsContent value="features" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span>Feature Management</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Enable or disable platform features and capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">AI Suggestions</Label>
                        <p className="text-sm text-gray-400">Enable AI-powered invoice and business suggestions</p>
                      </div>
                      <Switch
                        checked={settings.aiSuggestionsEnabled}
                        onCheckedChange={(checked) => updateSetting('aiSuggestionsEnabled', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Advanced Analytics</Label>
                        <p className="text-sm text-gray-400">Enable advanced reporting and analytics features</p>
                      </div>
                      <Switch
                        checked={settings.advancedAnalytics}
                        onCheckedChange={(checked) => updateSetting('advancedAnalytics', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Multi-Business Support</Label>
                        <p className="text-sm text-gray-400">Allow users to manage multiple businesses</p>
                      </div>
                      <Switch
                        checked={settings.multiBusinessSupport}
                        onCheckedChange={(checked) => updateSetting('multiBusinessSupport', checked)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">API Access</Label>
                        <p className="text-sm text-gray-400">Enable API access for integrations</p>
                      </div>
                      <Switch
                        checked={settings.apiAccessEnabled}
                        onCheckedChange={(checked) => updateSetting('apiAccessEnabled', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Custom Branding</Label>
                        <p className="text-sm text-gray-400">Allow custom branding and white-labeling</p>
                      </div>
                      <Switch
                        checked={settings.customBrandingEnabled}
                        onCheckedChange={(checked) => updateSetting('customBrandingEnabled', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">White Label Mode</Label>
                        <p className="text-sm text-gray-400">Enable complete white-label solution</p>
                      </div>
                      <Switch
                        checked={settings.whitelabelEnabled}
                        onCheckedChange={(checked) => updateSetting('whitelabelEnabled', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Resources */}
          <TabsContent value="system" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Server className="h-5 w-5 text-orange-400" />
                  <span>System Resources</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Monitor and configure system resource limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label className="text-gray-300">Max CPU Usage (%)</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Slider
                        value={[settings.maxCpuUsage]}
                        onValueChange={(value) => updateSetting('maxCpuUsage', value[0])}
                        max={100}
                        min={50}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-white font-medium w-12">{settings.maxCpuUsage}%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Max Memory Usage (%)</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Slider
                        value={[settings.maxMemoryUsage]}
                        onValueChange={(value) => updateSetting('maxMemoryUsage', value[0])}
                        max={100}
                        min={50}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-white font-medium w-12">{settings.maxMemoryUsage}%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Max Disk Usage (%)</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Slider
                        value={[settings.maxDiskUsage]}
                        onValueChange={(value) => updateSetting('maxDiskUsage', value[0])}
                        max={100}
                        min={70}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-white font-medium w-12">{settings.maxDiskUsage}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Auto Scaling</Label>
                    <Switch
                      checked={settings.autoScaling}
                      onCheckedChange={(checked) => updateSetting('autoScaling', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Load Balancing</Label>
                    <Switch
                      checked={settings.loadBalancing}
                      onCheckedChange={(checked) => updateSetting('loadBalancing', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">CDN Enabled</Label>
                    <Switch
                      checked={settings.cdnEnabled}
                      onCheckedChange={(checked) => updateSetting('cdnEnabled', checked)}
                    />
                  </div>
                </div>

                {/* Current System Status */}
                <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <h4 className="font-medium text-white mb-3">Current System Status</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Cpu className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-gray-300">CPU</span>
                      </div>
                      <div className="text-lg font-semibold text-white">45%</div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Activity className="h-5 w-5 text-green-400" />
                        <span className="text-sm text-gray-300">Memory</span>
                      </div>
                      <div className="text-lg font-semibold text-white">62%</div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }} />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <HardDrive className="h-5 w-5 text-purple-400" />
                        <span className="text-sm text-gray-300">Disk</span>
                      </div>
                      <div className="text-lg font-semibold text-white">78%</div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
}