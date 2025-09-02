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
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  Save,
  Settings,
  Building,
  Crown,
  Shield,
  Globe,
  CreditCard,
  Mail,
  Bell,
  Database,
  Lock,
  AlertTriangle,
  CheckCircle,
  Zap,
  Users,
  FileText,
  BarChart3,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function BusinessSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    // Business Limits
    maxBusinessesPerUser: 3,
    maxTeamMembersPersonal: 1,
    maxTeamMembersTeam: 15,
    maxTeamMembersEnterprise: 100,
    maxClientsPersonal: 50,
    maxClientsTeam: 500,
    maxClientsEnterprise: 5000,
    maxStoragePersonal: 5, // GB
    maxStorageTeam: 50,
    maxStorageEnterprise: 500,
    
    // Trial Settings
    trialDuration: 14, // days
    trialFeatures: ['invoices', 'clients', 'basic_reports'],
    autoUpgradeAfterTrial: false,
    trialExtensionAllowed: true,
    maxTrialExtensions: 1,
    
    // Subscription Management
    allowPlanDowngrade: true,
    downgradeCooldown: 30, // days
    allowPlanUpgrade: true,
    prorationEnabled: true,
    gracePeriodDays: 7,
    autoSuspendAfterDays: 30,
    
    // Business Creation
    requireEmailVerification: true,
    requirePhoneVerification: false,
    autoApproveBusinesses: true,
    manualReviewRequired: false,
    businessNameUniqueness: true,
    
    // Compliance
    gdprComplianceRequired: true,
    dataRetentionPeriod: 365, // days
    auditLogRetention: 2555, // days (7 years)
    requireTaxId: false,
    
    // Notifications
    sendWelcomeEmails: true,
    sendBillingReminders: true,
    sendUsageAlerts: true,
    sendComplianceNotifications: true,
    
    // API & Integrations
    apiRateLimitPersonal: 1000, // requests per hour
    apiRateLimitTeam: 5000,
    apiRateLimitEnterprise: 50000,
    webhookRetryAttempts: 3,
    webhookTimeoutSeconds: 30,
    
    // Security
    enforcePasswordPolicy: true,
    requireTwoFactor: false,
    sessionTimeoutMinutes: 480, // 8 hours
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 30,
    
    // Data Management
    autoBackupEnabled: true,
    backupFrequencyHours: 24,
    dataExportEnabled: true,
    bulkOperationsEnabled: true
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Settings updated successfully!",
        description: "Business management settings have been saved.",
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
              <h1 className="text-3xl font-bold text-white">Business Settings</h1>
              <p className="text-gray-400 mt-2">Configure platform-wide business management settings</p>
            </div>
          </div>
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
                Save Settings
              </>
            )}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Limits */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Building className="h-5 w-5 text-blue-400" />
                <span>Business Limits & Quotas</span>
              </CardTitle>
              <CardDescription className="text-gray-400">Configure usage limits for different subscription plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-300">Max Businesses per User</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Slider
                    value={[settings.maxBusinessesPerUser]}
                    onValueChange={(value) => updateSetting('maxBusinessesPerUser', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-white font-medium w-8">{settings.maxBusinessesPerUser}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-4">Personal Plan Limits</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Team Members</Label>
                      <Input
                        type="number"
                        value={settings.maxTeamMembersPersonal}
                        onChange={(e) => updateSetting('maxTeamMembersPersonal', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Clients</Label>
                      <Input
                        type="number"
                        value={settings.maxClientsPersonal}
                        onChange={(e) => updateSetting('maxClientsPersonal', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Storage (GB)</Label>
                      <Input
                        type="number"
                        value={settings.maxStoragePersonal}
                        onChange={(e) => updateSetting('maxStoragePersonal', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Team Plan Limits</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Team Members</Label>
                      <Input
                        type="number"
                        value={settings.maxTeamMembersTeam}
                        onChange={(e) => updateSetting('maxTeamMembersTeam', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Clients</Label>
                      <Input
                        type="number"
                        value={settings.maxClientsTeam}
                        onChange={(e) => updateSetting('maxClientsTeam', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Storage (GB)</Label>
                      <Input
                        type="number"
                        value={settings.maxStorageTeam}
                        onChange={(e) => updateSetting('maxStorageTeam', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Enterprise Plan Limits</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Team Members</Label>
                      <Input
                        type="number"
                        value={settings.maxTeamMembersEnterprise}
                        onChange={(e) => updateSetting('maxTeamMembersEnterprise', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Clients</Label>
                      <Input
                        type="number"
                        value={settings.maxClientsEnterprise}
                        onChange={(e) => updateSetting('maxClientsEnterprise', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Storage (GB)</Label>
                      <Input
                        type="number"
                        value={settings.maxStorageEnterprise}
                        onChange={(e) => updateSetting('maxStorageEnterprise', parseInt(e.target.value) || 0)}
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trial Settings */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span>Trial Management</span>
              </CardTitle>
              <CardDescription className="text-gray-400">Configure free trial settings and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300">Trial Duration (Days)</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Slider
                      value={[settings.trialDuration]}
                      onValueChange={(value) => updateSetting('trialDuration', value[0])}
                      max={30}
                      min={7}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-white font-medium w-8">{settings.trialDuration}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Max Trial Extensions</Label>
                  <Input
                    type="number"
                    value={settings.maxTrialExtensions}
                    onChange={(e) => updateSetting('maxTrialExtensions', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Auto-upgrade after trial</Label>
                    <Switch
                      checked={settings.autoUpgradeAfterTrial}
                      onCheckedChange={(checked) => updateSetting('autoUpgradeAfterTrial', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Allow trial extensions</Label>
                    <Switch
                      checked={settings.trialExtensionAllowed}
                      onCheckedChange={(checked) => updateSetting('trialExtensionAllowed', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Management */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <CreditCard className="h-5 w-5 text-green-400" />
                <span>Subscription Management</span>
              </CardTitle>
              <CardDescription className="text-gray-400">Configure subscription policies and billing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300">Downgrade Cooldown (Days)</Label>
                  <Input
                    type="number"
                    value={settings.downgradeCooldown}
                    onChange={(e) => updateSetting('downgradeCooldown', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Grace Period (Days)</Label>
                  <Input
                    type="number"
                    value={settings.gracePeriodDays}
                    onChange={(e) => updateSetting('gracePeriodDays', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Allow plan downgrades</Label>
                    <Switch
                      checked={settings.allowPlanDowngrade}
                      onCheckedChange={(checked) => updateSetting('allowPlanDowngrade', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Allow plan upgrades</Label>
                    <Switch
                      checked={settings.allowPlanUpgrade}
                      onCheckedChange={(checked) => updateSetting('allowPlanUpgrade', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Enable proration</Label>
                    <Switch
                      checked={settings.prorationEnabled}
                      onCheckedChange={(checked) => updateSetting('prorationEnabled', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Creation */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Building className="h-5 w-5 text-purple-400" />
                <span>Business Creation Policies</span>
              </CardTitle>
              <CardDescription className="text-gray-400">Configure requirements for new business registration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Require email verification</Label>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => updateSetting('requireEmailVerification', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Require phone verification</Label>
                    <Switch
                      checked={settings.requirePhoneVerification}
                      onCheckedChange={(checked) => updateSetting('requirePhoneVerification', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Auto-approve businesses</Label>
                    <Switch
                      checked={settings.autoApproveBusinesses}
                      onCheckedChange={(checked) => updateSetting('autoApproveBusinesses', checked)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Manual review required</Label>
                    <Switch
                      checked={settings.manualReviewRequired}
                      onCheckedChange={(checked) => updateSetting('manualReviewRequired', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Enforce unique names</Label>
                    <Switch
                      checked={settings.businessNameUniqueness}
                      onCheckedChange={(checked) => updateSetting('businessNameUniqueness', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Require Tax ID</Label>
                    <Switch
                      checked={settings.requireTaxId}
                      onCheckedChange={(checked) => updateSetting('requireTaxId', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Shield className="h-5 w-5 text-red-400" />
                <span>Security Policies</span>
              </CardTitle>
              <CardDescription className="text-gray-400">Configure security requirements for business accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300">Session Timeout (Minutes)</Label>
                  <Input
                    type="number"
                    value={settings.sessionTimeoutMinutes}
                    onChange={(e) => updateSetting('sessionTimeoutMinutes', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Enforce password policy</Label>
                    <Switch
                      checked={settings.enforcePasswordPolicy}
                      onCheckedChange={(checked) => updateSetting('enforcePasswordPolicy', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Require two-factor auth</Label>
                    <Switch
                      checked={settings.requireTwoFactor}
                      onCheckedChange={(checked) => updateSetting('requireTwoFactor', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API & Integration Settings */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Zap className="h-5 w-5 text-indigo-400" />
                <span>API & Integration Settings</span>
              </CardTitle>
              <CardDescription className="text-gray-400">Configure API rate limits and integration policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label className="text-gray-300">Personal API Limit (req/hour)</Label>
                  <Input
                    type="number"
                    value={settings.apiRateLimitPersonal}
                    onChange={(e) => updateSetting('apiRateLimitPersonal', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Team API Limit (req/hour)</Label>
                  <Input
                    type="number"
                    value={settings.apiRateLimitTeam}
                    onChange={(e) => updateSetting('apiRateLimitTeam', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Enterprise API Limit (req/hour)</Label>
                  <Input
                    type="number"
                    value={settings.apiRateLimitEnterprise}
                    onChange={(e) => updateSetting('apiRateLimitEnterprise', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300">Webhook Retry Attempts</Label>
                  <Input
                    type="number"
                    value={settings.webhookRetryAttempts}
                    onChange={(e) => updateSetting('webhookRetryAttempts', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Webhook Timeout (Seconds)</Label>
                  <Input
                    type="number"
                    value={settings.webhookTimeoutSeconds}
                    onChange={(e) => updateSetting('webhookTimeoutSeconds', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Settings */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Compliance & Data Management</span>
              </CardTitle>
              <CardDescription className="text-gray-400">Configure compliance requirements and data policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300">Data Retention Period (Days)</Label>
                  <Input
                    type="number"
                    value={settings.dataRetentionPeriod}
                    onChange={(e) => updateSetting('dataRetentionPeriod', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Audit Log Retention (Days)</Label>
                  <Input
                    type="number"
                    value={settings.auditLogRetention}
                    onChange={(e) => updateSetting('auditLogRetention', parseInt(e.target.value) || 0)}
                    className="bg-gray-700/50 border-gray-600/50 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">GDPR compliance required</Label>
                    <Switch
                      checked={settings.gdprComplianceRequired}
                      onCheckedChange={(checked) => updateSetting('gdprComplianceRequired', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Auto-backup enabled</Label>
                    <Switch
                      checked={settings.autoBackupEnabled}
                      onCheckedChange={(checked) => updateSetting('autoBackupEnabled', checked)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Data export enabled</Label>
                    <Switch
                      checked={settings.dataExportEnabled}
                      onCheckedChange={(checked) => updateSetting('dataExportEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Bulk operations enabled</Label>
                    <Switch
                      checked={settings.bulkOperationsEnabled}
                      onCheckedChange={(checked) => updateSetting('bulkOperationsEnabled', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Bell className="h-5 w-5 text-orange-400" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription className="text-gray-400">Configure automated notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Send welcome emails</Label>
                    <Switch
                      checked={settings.sendWelcomeEmails}
                      onCheckedChange={(checked) => updateSetting('sendWelcomeEmails', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Send billing reminders</Label>
                    <Switch
                      checked={settings.sendBillingReminders}
                      onCheckedChange={(checked) => updateSetting('sendBillingReminders', checked)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Send usage alerts</Label>
                    <Switch
                      checked={settings.sendUsageAlerts}
                      onCheckedChange={(checked) => updateSetting('sendUsageAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Send compliance notifications</Label>
                    <Switch
                      checked={settings.sendComplianceNotifications}
                      onCheckedChange={(checked) => updateSetting('sendComplianceNotifications', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </SuperAdminLayout>
  );
}