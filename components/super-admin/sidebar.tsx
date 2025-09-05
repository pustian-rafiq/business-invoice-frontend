'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Users, 
  Building, 
  CreditCard, 
  BarChart3, 
  Settings, 
  HelpCircle,
  AlertTriangle,
  Database,
  ChevronDown,
  X,
  Activity
} from 'lucide-react';

interface SuperAdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/super-admin', icon: BarChart3 },
  { 
    name: 'User Management', 
    href: '/super-admin/users', 
    icon: Users,
    children: [
      { name: 'All Users', href: '/super-admin/users' },
      { name: 'Create User', href: '/super-admin/users/create' },
      { name: 'Suspended Users', href: '/super-admin/users/suspended' },
      { name: 'Admin Users', href: '/super-admin/users/admins' },
      { name: 'User Analytics', href: '/super-admin/users/analytics' },
      { name: 'Activity Logs', href: '/super-admin/users/activity' },
    ]
  },
  { 
    name: 'Business Management', 
    href: '/super-admin/businesses', 
    icon: Building,
    children: [
      { name: 'All Businesses', href: '/super-admin/businesses' },
      { name: 'Create Business', href: '/super-admin/businesses/create' },
      { name: 'Active Businesses', href: '/super-admin/businesses/active' },
      { name: 'Inactive Businesses', href: '/super-admin/businesses/inactive' },
      { name: 'Business Analytics', href: '/super-admin/businesses/analytics' },
      { name: 'Business Settings', href: '/super-admin/businesses/settings' },
    ]
  },
  { 
    name: 'Subscriptions', 
    href: '/super-admin/subscriptions', 
    icon: CreditCard,
    children: [
      { name: 'All Subscriptions', href: '/super-admin/subscriptions' },
      { name: 'Active Plans', href: '/super-admin/subscriptions/active' },
      { name: 'Expired Plans', href: '/super-admin/subscriptions/expired' },
      { name: 'Payment Issues', href: '/super-admin/subscriptions/issues' },
    ]
  },
  { name: 'System Health', href: '/super-admin/system', icon: Activity },
  { name: 'Database', href: '/super-admin/database', icon: Database },
  { name: 'Security', href: '/super-admin/security', icon: Shield },
  { 
    name: 'Support Tickets', 
    href: '/super-admin/support', 
    icon: HelpCircle,
    children: [
      { name: 'All Tickets', href: '/super-admin/support' },
      { name: 'Create Ticket', href: '/super-admin/support/create' },
      { name: 'Open Tickets', href: '/super-admin/support/open' },
      { name: 'Escalated Tickets', href: '/super-admin/support/escalated' },
      { name: 'Support Analytics', href: '/super-admin/support/analytics' },
      { name: 'Agent Management', href: '/super-admin/support/agents' },
    ]
  },
  { name: 'System Alerts', href: '/super-admin/alerts', icon: AlertTriangle },
  { name: 'Settings', href: '/super-admin/settings', icon: Settings },
];

export function SuperAdminSidebar({ isOpen, onClose }: SuperAdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/90 backdrop-blur-md border-r border-gray-700/50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Super Admin
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const isExpanded = expandedItems.includes(item.name);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left font-normal text-gray-300 hover:text-white hover:bg-gray-800",
                      isActive && "bg-red-900/50 text-red-200 border border-red-500/20"
                    )}
                    onClick={(e) => {
                      if (hasChildren) {
                        e.preventDefault();
                        toggleExpanded(item.name);
                      }
                    }}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                    {hasChildren && (
                      <ChevronDown className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        isExpanded && "rotate-180"
                      )} />
                    )}
                  </Button>
                </Link>
                
                {hasChildren && isExpanded && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children?.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <Button
                          variant={pathname === child.href ? "secondary" : "ghost"}
                          size="sm"
                          className={cn(
                            "w-full justify-start text-left font-normal text-gray-400 hover:text-white hover:bg-gray-800",
                            pathname === child.href && "bg-red-900/30 text-red-300"
                          )}
                        >
                          {child.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">System Status</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-xs text-gray-400">
              <div>Uptime: 99.9%</div>
              <div>Load: 0.3</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}