'use client';

import { SuperAdminLayout } from '@/components/super-admin/layout';
import { SuperAdminStats } from '@/components/super-admin/stats';
import { SystemOverview } from '@/components/super-admin/system-overview';
import { RecentActivity } from '@/components/super-admin/recent-activity';
import { PlatformMetrics } from '@/components/super-admin/platform-metrics';

export default function SuperAdminPage() {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform-wide management and analytics.</p>
        </div>

        <SuperAdminStats />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PlatformMetrics />
          </div>
          <div>
            <SystemOverview />
          </div>
        </div>

        <RecentActivity />
      </div>
    </SuperAdminLayout>
  );
}