'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  Star,
  FileText,
  Palette,
  Layout,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const templates = [
  {
    id: '1',
    name: 'Modern Professional',
    description: 'Clean and professional design with blue accents',
    category: 'Professional',
    color: 'blue',
    isDefault: true,
    isPremium: false,
    usageCount: 45,
    preview: '/api/placeholder/300/400'
  },
  {
    id: '2',
    name: 'Creative Agency',
    description: 'Bold and creative template for design agencies',
    category: 'Creative',
    color: 'purple',
    isDefault: false,
    isPremium: true,
    usageCount: 23,
    preview: '/api/placeholder/300/400'
  },
  {
    id: '3',
    name: 'Minimalist',
    description: 'Simple and clean design with minimal elements',
    category: 'Minimal',
    color: 'gray',
    isDefault: false,
    isPremium: false,
    usageCount: 67,
    preview: '/api/placeholder/300/400'
  },
  {
    id: '4',
    name: 'Corporate Elite',
    description: 'Premium corporate template with gold accents',
    category: 'Corporate',
    color: 'yellow',
    isDefault: false,
    isPremium: true,
    usageCount: 12,
    preview: '/api/placeholder/300/400'
  },
  {
    id: '5',
    name: 'Tech Startup',
    description: 'Modern tech-focused design with gradients',
    category: 'Tech',
    color: 'indigo',
    isDefault: false,
    isPremium: false,
    usageCount: 34,
    preview: '/api/placeholder/300/400'
  },
  {
    id: '6',
    name: 'Healthcare Pro',
    description: 'Professional template for healthcare services',
    category: 'Healthcare',
    color: 'green',
    isDefault: false,
    isPremium: true,
    usageCount: 18,
    preview: '/api/placeholder/300/400'
  }
];

const categories = ['All', 'Professional', 'Creative', 'Minimal', 'Corporate', 'Tech', 'Healthcare'];

export default function InvoiceTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      green: 'bg-green-100 text-green-700 border-green-200'
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoice Templates</h1>
            <p className="text-gray-600 mt-2">Choose from professional templates or create your own</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/60 border-white/30">
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
            <Link href="/dashboard/invoices/create">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <FileText className="mr-2 h-4 w-4" />
                Use Template
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/60 border-white/30"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "bg-white/60 border-white/30"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative">
                  {/* Template Preview */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className={`w-24 h-32 ${getColorClasses(template.color)} rounded shadow-sm flex items-center justify-center`}>
                      <Layout className="h-8 w-8" />
                    </div>
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center space-x-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Copy className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {template.isDefault && (
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        <Star className="mr-1 h-3 w-3" />
                        Default
                      </Badge>
                    )}
                    {template.isPremium && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        <Zap className="mr-1 h-3 w-3" />
                        Premium
                      </Badge>
                    )}
                  </div>

                  {/* Usage Count */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {template.usageCount} uses
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getColorClasses(template.color)}>
                      <Palette className="mr-1 h-3 w-3" />
                      {template.category}
                    </Badge>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      {!template.isDefault && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No templates found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'Create your first custom template.'}
              </p>
              <div className="mt-6">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Template Builder CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Create Custom Templates</h3>
                <p className="text-blue-100 mb-4">
                  Design your own invoice templates with our drag-and-drop builder. 
                  Add your branding, customize colors, and create professional invoices that reflect your business.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Custom Branding</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Layout className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Drag & Drop Builder</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">AI Assistance</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Plus className="mr-2 h-5 w-5" />
                  Start Building
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}