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
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Send, 
  Plus,
  X,
  UserPlus,
  Mail,
  Shield,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  Sparkles,
  Copy,
  Upload
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const roles = [
  {
    name: 'Manager',
    description: 'Can manage invoices, clients, and view reports',
    permissions: ['invoices', 'clients', 'reports', 'team'],
    color: 'bg-purple-100 text-purple-700'
  },
  {
    name: 'Accountant',
    description: 'Can manage invoices, payments, and financial reports',
    permissions: ['invoices', 'payments', 'reports'],
    color: 'bg-green-100 text-green-700'
  },
  {
    name: 'User',
    description: 'Basic access to assigned features',
    permissions: ['invoices'],
    color: 'bg-blue-100 text-blue-700'
  }
];

const permissions = [
  { id: 'invoices', name: 'Invoices', description: 'Create, edit, and manage invoices', icon: FileText },
  { id: 'clients', name: 'Clients', description: 'Manage client information and relationships', icon: Users },
  { id: 'payments', name: 'Payments', description: 'Track and manage payments', icon: CreditCard },
  { id: 'reports', name: 'Reports', description: 'View business reports and analytics', icon: BarChart3 },
  { id: 'team', name: 'Team', description: 'Manage team members and permissions', icon: Shield },
  { id: 'settings', name: 'Settings', description: 'Access business settings', icon: Settings }
];

export default function InviteTeamMemberPage() {
  const [loading, setLoading] = useState(false);
  const [inviteMethod, setInviteMethod] = useState<'single' | 'bulk'>('single');
  const [invitations, setInvitations] = useState([
    { id: 1, email: '', role: 'User', customPermissions: [] as string[], message: '' }
  ]);
  const [bulkEmails, setBulkEmails] = useState('');
  const [defaultRole, setDefaultRole] = useState('User');
  const [defaultMessage, setDefaultMessage] = useState('');

  const { toast } = useToast();

  const addInvitation = () => {
    const newId = Math.max(...invitations.map(i => i.id)) + 1;
    setInvitations([...invitations, { 
      id: newId, 
      email: '', 
      role: 'User', 
      customPermissions: [],
      message: '' 
    }]);
  };

  const removeInvitation = (id: number) => {
    if (invitations.length > 1) {
      setInvitations(invitations.filter(inv => inv.id !== id));
    }
  };

  const updateInvitation = (id: number, field: string, value: any) => {
    setInvitations(invitations.map(inv => 
      inv.id === id ? { ...inv, [field]: value } : inv
    ));
  };

  const handleRoleChange = (id: number, role: string) => {
    const roleConfig = roles.find(r => r.name === role);
    updateInvitation(id, 'role', role);
    updateInvitation(id, 'customPermissions', roleConfig?.permissions || []);
  };

  const handlePermissionChange = (id: number, permission: string, checked: boolean) => {
    const invitation = invitations.find(inv => inv.id === id);
    if (!invitation) return;

    const updatedPermissions = checked
      ? [...invitation.customPermissions, permission]
      : invitation.customPermissions.filter(p => p !== permission);
    
    updateInvitation(id, 'customPermissions', updatedPermissions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (inviteMethod === 'single') {
        const validInvitations = invitations.filter(inv => inv.email.trim());
        toast({
          title: "Invitations sent successfully!",
          description: `${validInvitations.length} team member${validInvitations.length > 1 ? 's' : ''} invited.`,
        });
      } else {
        const emails = bulkEmails.split('\n').filter(email => email.trim());
        toast({
          title: "Bulk invitations sent!",
          description: `${emails.length} invitations sent successfully.`,
        });
      }
      
      // Reset form
      setInvitations([{ id: 1, email: '', role: 'User', customPermissions: [], message: '' }]);
      setBulkEmails('');
      
    } catch (error) {
      toast({
        title: "Error sending invitations",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateInviteLink = () => {
    const link = `${window.location.origin}/invite/accept?token=sample-token-123`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Invite link copied!",
      description: "Share this link with your team member.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/team">
              <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Team
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Invite Team Members</h1>
              <p className="text-gray-600 mt-2">Add new members to your team and assign roles</p>
            </div>
          </div>
          <Button onClick={generateInviteLink} variant="outline" className="bg-white/60 border-white/30">
            <Copy className="mr-2 h-4 w-4" />
            Generate Invite Link
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Invite Method Selection */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Invitation Method</CardTitle>
                  <CardDescription>Choose how you want to invite team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        inviteMethod === 'single'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setInviteMethod('single')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          inviteMethod === 'single'
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {inviteMethod === 'single' && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">Individual Invites</h3>
                          <p className="text-sm text-gray-600">Invite members one by one with custom roles</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        inviteMethod === 'bulk'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setInviteMethod('bulk')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          inviteMethod === 'bulk'
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {inviteMethod === 'bulk' && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">Bulk Invites</h3>
                          <p className="text-sm text-gray-600">Invite multiple members with same role</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Invites */}
              {inviteMethod === 'single' && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Team Member Invitations</CardTitle>
                      <CardDescription>Add team members with specific roles and permissions</CardDescription>
                    </div>
                    <Button type="button" onClick={addInvitation} size="sm" variant="outline" className="bg-white/60 border-white/30">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {invitations.map((invitation, index) => (
                      <div key={invitation.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-900">Invitation {index + 1}</h3>
                          {invitations.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeInvitation(invitation.id)}
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`email-${invitation.id}`}>Email Address *</Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  id={`email-${invitation.id}`}
                                  type="email"
                                  value={invitation.email}
                                  onChange={(e) => updateInvitation(invitation.id, 'email', e.target.value)}
                                  className="pl-10 bg-white/60 border-white/30"
                                  placeholder="member@example.com"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`role-${invitation.id}`}>Role</Label>
                              <Select 
                                value={invitation.role} 
                                onValueChange={(value) => handleRoleChange(invitation.id, value)}
                              >
                                <SelectTrigger className="bg-white/60 border-white/30">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {roles.map((role) => (
                                    <SelectItem key={role.name} value={role.name}>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{role.name}</span>
                                        <span className="text-sm text-gray-500">{role.description}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Custom Permissions */}
                          <div>
                            <Label>Permissions</Label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                              {permissions.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                                  <Checkbox
                                    id={`${invitation.id}-${permission.id}`}
                                    checked={invitation.customPermissions.includes(permission.id)}
                                    onCheckedChange={(checked) => 
                                      handlePermissionChange(invitation.id, permission.id, checked as boolean)
                                    }
                                  />
                                  <div className="flex items-center space-x-2">
                                    <permission.icon className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <Label htmlFor={`${invitation.id}-${permission.id}`} className="text-sm font-medium">
                                        {permission.name}
                                      </Label>
                                      <p className="text-xs text-gray-500">{permission.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor={`message-${invitation.id}`}>Personal Message (Optional)</Label>
                            <Textarea
                              id={`message-${invitation.id}`}
                              value={invitation.message}
                              onChange={(e) => updateInvitation(invitation.id, 'message', e.target.value)}
                              className="bg-white/60 border-white/30"
                              placeholder="Add a personal message to the invitation..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Bulk Invites */}
              {inviteMethod === 'bulk' && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Bulk Invitation</CardTitle>
                    <CardDescription>Invite multiple team members with the same role</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bulkEmails">Email Addresses *</Label>
                      <Textarea
                        id="bulkEmails"
                        value={bulkEmails}
                        onChange={(e) => setBulkEmails(e.target.value)}
                        className="bg-white/60 border-white/30"
                        placeholder="Enter email addresses, one per line:&#10;john@example.com&#10;jane@example.com&#10;mike@example.com"
                        rows={6}
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Enter one email address per line. {bulkEmails.split('\n').filter(e => e.trim()).length} emails entered.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="defaultRole">Default Role</Label>
                      <Select value={defaultRole} onValueChange={setDefaultRole}>
                        <SelectTrigger className="bg-white/60 border-white/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.name} value={role.name}>
                              <div className="flex flex-col">
                                <span className="font-medium">{role.name}</span>
                                <span className="text-sm text-gray-500">{role.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="defaultMessage">Default Message (Optional)</Label>
                      <Textarea
                        id="defaultMessage"
                        value={defaultMessage}
                        onChange={(e) => setDefaultMessage(e.target.value)}
                        className="bg-white/60 border-white/30"
                        placeholder="Add a message that will be sent to all invitees..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Invitations...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Invitations
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Role Information */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Available Roles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.name} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{role.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission.charAt(0).toUpperCase() + permission.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Invitation Tips */}
              <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="font-semibold">Invitation Tips</h3>
                  </div>
                  <div className="space-y-2 text-sm text-green-100">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Invitations expire after 7 days</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Members can accept invitations and create accounts automatically</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mt-2 flex-shrink-0"></div>
                      <p>You can resend or cancel invitations anytime</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Role permissions can be modified after joining</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-white/60 border-white/30">
                    <Upload className="mr-2 h-4 w-4" />
                    Import from CSV
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white/60 border-white/30">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Invite Link
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white/60 border-white/30">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Roles
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