'use client';

import { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X,
  Eye,
  RefreshCw,
  Users,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface ImportError {
  row: number;
  field: string;
  message: string;
  value: string;
}

interface ImportPreview {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  status: 'valid' | 'warning' | 'error';
  errors: ImportError[];
}

const sampleData: ImportPreview[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@acme.com',
    company: 'Acme Corporation',
    phone: '+1 (555) 123-4567',
    status: 'valid',
    errors: []
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'invalid-email',
    company: 'Tech Solutions',
    phone: '+1 (555) 987-6543',
    status: 'error',
    errors: [
      { row: 2, field: 'email', message: 'Invalid email format', value: 'invalid-email' }
    ]
  },
  {
    firstName: 'Mike',
    lastName: '',
    email: 'mike@company.com',
    company: 'Digital Pro',
    phone: '',
    status: 'warning',
    errors: [
      { row: 3, field: 'lastName', message: 'Last name is recommended', value: '' },
      { row: 3, field: 'phone', message: 'Phone number is missing', value: '' }
    ]
  }
];

export default function ImportClientsPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [previewData, setPreviewData] = useState<ImportPreview[]>([]);
  const [importComplete, setImportComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate file processing
      setTimeout(() => {
        setPreviewData(sampleData);
        setActiveTab('preview');
      }, 1000);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setTimeout(() => {
        setPreviewData(sampleData);
        setActiveTab('preview');
      }, 1000);
    }
  };

  const startImport = async () => {
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          setImportComplete(true);
          setActiveTab('results');
          toast({
            title: "Import completed!",
            description: "Successfully imported 2 clients with 1 warning.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = "firstName,lastName,email,company,phone,address,city,state,zipCode,country,taxId,paymentTerms,currency,creditLimit,notes\nJohn,Doe,john@example.com,Example Corp,+1234567890,123 Main St,New York,NY,10001,USA,TAX123,30,USD,50000,Sample client";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'client_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const validClients = previewData.filter(client => client.status === 'valid').length;
  const warningClients = previewData.filter(client => client.status === 'warning').length;
  const errorClients = previewData.filter(client => client.status === 'error').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/clients">
              <Button variant="outline" size="sm" className="bg-white/60 border-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Clients
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Import Clients</h1>
              <p className="text-gray-600 mt-2">Upload CSV or Excel files to bulk import clients</p>
            </div>
          </div>
          <Button onClick={downloadTemplate} variant="outline" className="bg-white/60 border-white/30">
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-100/50">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="preview" disabled={!uploadedFile}>Preview Data</TabsTrigger>
            <TabsTrigger value="import" disabled={previewData.length === 0}>Import</TabsTrigger>
            <TabsTrigger value="results" disabled={!importComplete}>Results</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Upload Client Data</CardTitle>
                <CardDescription>
                  Upload a CSV or Excel file containing your client information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop your file here, or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports CSV and Excel files up to 10MB
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {uploadedFile && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">{uploadedFile.name}</p>
                        <p className="text-sm text-blue-600">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUploadedFile(null);
                          setPreviewData([]);
                        }}
                        className="ml-auto text-blue-600 hover:text-blue-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File Requirements */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>File Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Required Fields</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>firstName</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>lastName</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>email</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>company</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Optional Fields</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• phone</li>
                      <li>• address, city, state, zipCode, country</li>
                      <li>• taxId</li>
                      <li>• paymentTerms</li>
                      <li>• currency</li>
                      <li>• creditLimit</li>
                      <li>• notes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{validClients}</div>
                      <div className="text-sm text-gray-600">Valid Records</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{warningClients}</div>
                      <div className="text-sm text-gray-600">Warnings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{errorClients}</div>
                      <div className="text-sm text-gray-600">Errors</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>
                  Review your data before importing. Fix any errors to ensure successful import.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {previewData.map((client, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-white/60">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900">
                            {client.firstName} {client.lastName}
                          </span>
                          <Badge className={
                            client.status === 'valid' ? 'bg-green-100 text-green-700' :
                            client.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {client.status === 'valid' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {client.status === 'warning' && <AlertTriangle className="mr-1 h-3 w-3" />}
                            {client.status === 'error' && <AlertCircle className="mr-1 h-3 w-3" />}
                            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Email:</span> {client.email}
                        </div>
                        <div>
                          <span className="font-medium">Company:</span> {client.company}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {client.phone || 'N/A'}
                        </div>
                      </div>

                      {client.errors.length > 0 && (
                        <div className="space-y-2">
                          {client.errors.map((error, errorIndex) => (
                            <div key={errorIndex} className="flex items-center space-x-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="text-red-600">
                                <strong>{error.field}:</strong> {error.message}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('upload')}>
                Back to Upload
              </Button>
              <Button 
                onClick={() => setActiveTab('import')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={errorClients > 0}
              >
                Continue to Import
              </Button>
            </div>
          </TabsContent>

          {/* Import Tab */}
          <TabsContent value="import" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Import Progress</CardTitle>
                <CardDescription>
                  Importing {validClients + warningClients} clients to your database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{importProgress}%</div>
                  <Progress value={importProgress} className="w-full mb-4" />
                  <p className="text-gray-600">
                    {isImporting ? 'Importing clients...' : 'Ready to import'}
                  </p>
                </div>

                {!isImporting && !importComplete && (
                  <div className="text-center">
                    <Button 
                      onClick={startImport}
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Start Import
                    </Button>
                  </div>
                )}

                {isImporting && (
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Processing your data...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span>Import Completed Successfully!</span>
                </CardTitle>
                <CardDescription>
                  Your client data has been imported into your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{validClients}</div>
                    <div className="text-sm text-green-700">Successfully Imported</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{warningClients}</div>
                    <div className="text-sm text-yellow-700">Imported with Warnings</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{errorClients}</div>
                    <div className="text-sm text-red-700">Skipped (Errors)</div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Link href="/dashboard/clients">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Users className="mr-2 h-4 w-4" />
                      View Clients
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setActiveTab('upload');
                      setUploadedFile(null);
                      setPreviewData([]);
                      setImportComplete(false);
                      setImportProgress(0);
                    }}
                    className="bg-white/60 border-white/30"
                  >
                    Import More Clients
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}