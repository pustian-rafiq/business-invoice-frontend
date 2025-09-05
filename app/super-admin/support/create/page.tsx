'use client';

import { useState } from 'react';
import { SuperAdminLayout } from '@/components/super-admin/layout';
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
  Send,
  HelpCircle,
  User,
  Building,
  Mail,
  Phone,
  Flag,
  AlertTriangle,
  Upload,
  Search,
  Plus,
  X,
  Paperclip,
  Crown,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const mockCustomers = [
  {
    id: 'user_123',
    name: 'John Doe',
    email: 'john@acme.com',
    company: 'Acme Corporation',
    avatar: 'JD',
    plan: 'Team',
    status: 'active'
  },
  {
    id: 'user_456',
    name: 'Jane Smith',
    email: 'jane@techsol.com',
    company: 'Tech Solutions Inc',
    avatar: 'JS',
    plan: 'Personal',
    status: 'active'
  },
  {
    id: 'user_789',
    name: 'Mike Johnson',
    email: 'mike@digipro.com',
    company: 'Digital Marketing Pro',
    avatar: 'MJ',
    plan: 'Team',
    status: 'active'
  }
];

const supportAgents = [
  {
    id: 'agent_1',
    name: 'Sarah Tech',
    avatar: 'ST',
    department: 'Technical Support',
    specialties: ['technical', 'integrations']
  },
  {
    id: 'agent_2',
    name: 'Mike Billing',
    avatar: 'MB',
    department: 'Billing Support',
    specialties: ['billing', 'subscriptions']
  },
  {
    id: 'agent_3',
    name: 'Lisa Product',
    avatar: 'LP',
    department: 'Product Team',
    specialties: ['feature_request', 'product']
  },
  {
    id: 'agent_4',
    name: 'Emma Support',
    avatar: 'ES',
    department: 'Customer Success',
    specialties: ['how_to', 'general']
  }
];

const priorityLevels = [
  { value: 'low', label: 'Low', color: 'bg-blue-900/50 text-blue-400', sla: 480 },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-900/50 text-yellow-400', sla: 240 },
  { value: 'high', label: 'High', color: 'bg-orange-900/50 text-orange-400', sla: 60 },
  { value: 'critical', label: 'Critical', color: 'bg-red-900/50 text-red-400', sla: 30 }
];

const categories = [
  { value: 'technical', label: 'Technical Issue', icon: Shield },
  { value: 'billing', label: 'Billing Question', icon: Crown },
  { value: 'feature_request', label: 'Feature Request', icon: Plus },
  { value: 'how_to', label: 'How To', icon: HelpCircle },
  { value: 'bug_report', label: 'Bug Report', icon: AlertTriangle },
  { value: 'general', label: 'General Inquiry', icon: Mail }
];

export default function CreateTicketPage() {
  const [loading, setLoading] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'general',
    assignedTo: '',
    businessImpact: 'medium',
    internalNotes: '',
    autoAssign: true,
    sendNotification: true
  });

  const { toast } = useToast();

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.company.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const selectedPriority = priorityLevels.find(p => p.value === formData.priority);
  const selectedCategory = categories.find(c => c.value === formData.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Support ticket created successfully!",
        description: `Ticket has been created and assigned to ${formData.assignedTo || 'auto-assignment'}.`,
      });
      
      // Reset form
      setFormData({
        subject: '',
        description: '',
        priority: 'medium',
        category: 'general',
        assignedTo: '',
        businessImpact: 'medium',
        internalNotes: '',
        autoAssign: true,
        sendNotification: true
      });
      setSelectedCustomer(null);
      setTags([]);
      setAttachments([]);
      
    } catch (error) {
      toast({
        title: "Error creating ticket",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const autoAssignAgent = () => {
    const categoryAgents = supportAgents.filter(agent => 
      agent.specialties.includes(formData.category)
    );
    if (categoryAgents.length > 0) {
      const randomAgent = categoryAgents[Math.floor(Math.random() * categoryAgents.length)];
      setFormData({ ...formData, assignedTo: randomAgent.id });
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/super-admin/support">
              <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Support
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Create Support Ticket</h1>
              <p className="text-gray-400 mt-2">Create a new support ticket on behalf of a customer</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Selection */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <User className="h-5 w-5 text-blue-400" />
                    <span>Customer Information</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Select the customer this ticket is for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customerSearch" className="text-gray-300">Search Customer</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="customerSearch"
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        placeholder="Search by name, email, or company..."
                        className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {customerSearch && (
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {filteredCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedCustomer?.id === customer.id
                              ? 'border-red-500 bg-red-900/20'
                              : 'border-gray-700 hover:border-gray-600 bg-gray-900/30'
                          }`}
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm">
                                {customer.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{customer.name}</div>
                              <div className="text-sm text-gray-400">{customer.company}</div>
                              <div className="text-sm text-gray-400">{customer.email}</div>
                            </div>
                            <Badge className="bg-purple-900/50 text-purple-400">
                              <Crown className="mr-1 h-3 w-3" />
                              {customer.plan}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedCustomer && (
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            {selectedCustomer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{selectedCustomer.name}</div>
                          <div className="text-sm text-blue-200">{selectedCustomer.company}</div>
                          <div className="text-sm text-blue-200">{selectedCustomer.email}</div>
                        </div>
                        <Badge className="bg-purple-900/50 text-purple-400">
                          <Crown className="mr-1 h-3 w-3" />
                          {selectedCustomer.plan}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ticket Details */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <HelpCircle className="h-5 w-5 text-green-400" />
                    <span>Ticket Details</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Provide detailed information about the support request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief description of the issue"
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed description of the issue or request..."
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="priority" className="text-gray-300">Priority *</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityLevels.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              <div className="flex items-center space-x-2">
                                <Flag className="h-4 w-4" />
                                <div>
                                  <div className="font-medium">{priority.label}</div>
                                  <div className="text-sm text-gray-500">SLA: {priority.sla} minutes</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-gray-300">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center space-x-2">
                                <category.icon className="h-4 w-4" />
                                <span>{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessImpact" className="text-gray-300">Business Impact</Label>
                      <Select value={formData.businessImpact} onValueChange={(value) => setFormData({ ...formData, businessImpact: value })}>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Impact</SelectItem>
                          <SelectItem value="medium">Medium Impact</SelectItem>
                          <SelectItem value="high">High Impact</SelectItem>
                          <SelectItem value="critical">Critical Impact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="assignedTo" className="text-gray-300">Assign To</Label>
                      <div className="flex space-x-2">
                        <Select value={formData.assignedTo} onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white">
                            <SelectValue placeholder="Auto-assign" />
                          </SelectTrigger>
                          <SelectContent>
                            {supportAgents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.id}>
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                      {agent.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{agent.name}</div>
                                    <div className="text-sm text-gray-500">{agent.department}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" onClick={autoAssignAgent} variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                          Auto
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label className="text-gray-300">Tags</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          placeholder="Add a tag..."
                          className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                        />
                        <Button type="button" onClick={addTag} size="sm" variant="outline" className="bg-gray-800/60 border-gray-700/50 text-gray-300">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-gray-700/50 text-gray-300 flex items-center space-x-1">
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-red-400"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attachments */}
                  <div>
                    <Label className="text-gray-300">Attachments</Label>
                    <div className="space-y-2">
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-400 mb-2">
                          Drop files here or click to browse
                        </p>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="bg-gray-800/60 border-gray-700/50 text-gray-300"
                        >
                          Choose Files
                        </Button>
                      </div>
                      {attachments.length > 0 && (
                        <div className="space-y-2">
                          {attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-900/30 rounded border border-gray-700/30">
                              <div className="flex items-center space-x-2">
                                <Paperclip className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-300">{file.name}</span>
                                <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAttachment(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Internal Notes */}
                  <div>
                    <Label htmlFor="internalNotes" className="text-gray-300">Internal Notes</Label>
                    <Textarea
                      id="internalNotes"
                      value={formData.internalNotes}
                      onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
                      placeholder="Internal notes for support team (not visible to customer)..."
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      rows={3}
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
                    disabled={loading || !selectedCustomer}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Ticket...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Ticket
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full bg-gray-800/60 border-gray-700/50 text-gray-300"
                    disabled={!selectedCustomer}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Create & Notify Customer
                  </Button>
                </CardContent>
              </Card>

              {/* Ticket Preview */}
              {selectedCustomer && (
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Ticket Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Customer:</span>
                        <span className="text-white">{selectedCustomer.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Company:</span>
                        <span className="text-white">{selectedCustomer.company}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Plan:</span>
                        <Badge className="bg-purple-900/50 text-purple-400">
                          {selectedCustomer.plan}
                        </Badge>
                      </div>
                      {selectedPriority && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Priority:</span>
                          <Badge className={selectedPriority.color}>
                            {selectedPriority.label}
                          </Badge>
                        </div>
                      )}
                      {selectedCategory && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{selectedCategory.label}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">SLA Target:</span>
                        <span className="text-white">{selectedPriority?.sla} minutes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Support Guidelines */}
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-5 w-5 text-purple-300" />
                    <h3 className="font-semibold text-white">Support Guidelines</h3>
                  </div>
                  <div className="space-y-2 text-sm text-purple-100">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Critical issues require immediate escalation</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Always verify customer identity before sharing sensitive information</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Document all customer interactions thoroughly</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Follow up within 24 hours of resolution</p>
                    </div>
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