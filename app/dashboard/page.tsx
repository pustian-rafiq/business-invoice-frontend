'use client';

import { DashboardLayout } from '@/components/dashboard/layout';
import { DashboardStats } from '@/components/dashboard/stats';
import { RecentInvoices } from '@/components/dashboard/recent-invoices';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
        </div>

        <DashboardStats />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <RecentInvoices />
      </div>
    </DashboardLayout>
  );
}