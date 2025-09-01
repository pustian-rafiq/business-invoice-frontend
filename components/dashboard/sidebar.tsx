'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Package, 
  CreditCard, 
  BarChart3, 
  Settings, 
  MessageSquare,
  Bell,
  Zap,
  ChevronDown,
  Building,
  UserPlus,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { 
    name: 'Invoices', 
    href: '/dashboard/invoices', 
    icon: FileText,
    children: [
      { name: 'All Invoices', href: '/dashboard/invoices' },
      { name: 'Create Invoice', href: '/dashboard/invoices/create' },
      { name: 'Templates', href: '/dashboard/invoices/templates' },
    ]
  },
  { name: 'Clients', href: '/dashboard/clients', icon: Users },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { 
    name: 'Payments', 
    href: '/dashboard/payments', 
    icon: CreditCard,
    children: [
      { name: 'All Payments', href: '/dashboard/payments' },
      { name: 'Payment Methods', href: '/dashboard/payments/methods' },
      { name: 'Record Payment', href: '/dashboard/payments/create' },
    ]
  },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Team', href: '/dashboard/team', icon: UserPlus },
  { name: 'Business', href: '/dashboard/business', icon: Building },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
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
        "fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-md border-r border-white/20 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InvoiceAI
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
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
                      "w-full justify-start text-left font-normal",
                      isActive && "bg-blue-50 text-blue-700 border border-blue-200"
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
                            "w-full justify-start text-left font-normal",
                            pathname === child.href && "bg-blue-50 text-blue-700"
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
      </div>
    </>
  );
}