'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Mail, ArrowLeft, RefreshCw } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InvoiceAI
            </span>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
            <Mail className="h-10 w-10 text-blue-600" />
          </div>
          
          <CardTitle className="text-2xl font-bold text-gray-900">Check Your Email</CardTitle>
          <CardDescription className="text-gray-600">
            We've sent a verification link to your email address. Click the link to verify your account and get started.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Resend Verification Email
            </Button>
            
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Didn't receive an email?</p>
            <p>Check your spam folder or contact support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}