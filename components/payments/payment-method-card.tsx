'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  CreditCard,
  Building,
  Smartphone,
  Globe,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Star
} from 'lucide-react';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank_account' | 'credit_card' | 'paypal' | 'stripe' | 'square' | 'crypto' | 'mobile_payment';
  status: 'active' | 'inactive' | 'pending' | 'error';
  isDefault: boolean;
  lastUsed?: string;
  totalTransactions: number;
  totalAmount: number;
  fees: {
    percentage: number;
    fixed: number;
  };
  details: {
    accountNumber?: string;
    routingNumber?: string;
    cardLast4?: string;
    cardBrand?: string;
    email?: string;
    apiKey?: string;
    webhookUrl?: string;
  };
  currency: string;
  countries: string[];
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onEdit?: (method: PaymentMethod) => void;
  onDelete?: (method: PaymentMethod) => void;
  onToggleStatus?: (method: PaymentMethod) => void;
  onSetDefault?: (method: PaymentMethod) => void;
  onViewTransactions?: (method: PaymentMethod) => void;
}

const getMethodIcon = (type: string) => {
  switch (type) {
    case 'bank_account':
      return Building;
    case 'credit_card':
      return CreditCard;
    case 'paypal':
      return Globe;
    case 'stripe':
      return CreditCard;
    case 'square':
      return CreditCard;
    case 'crypto':
      return Globe;
    case 'mobile_payment':
      return Smartphone;
    default:
      return CreditCard;
  }
};

const getMethodColor = (type: string) => {
  switch (type) {
    case 'bank_account':
      return 'from-blue-500 to-blue-600';
    case 'credit_card':
      return 'from-purple-500 to-purple-600';
    case 'paypal':
      return 'from-blue-600 to-indigo-600';
    case 'stripe':
      return 'from-indigo-500 to-purple-500';
    case 'square':
      return 'from-green-500 to-emerald-500';
    case 'crypto':
      return 'from-orange-500 to-red-500';
    case 'mobile_payment':
      return 'from-pink-500 to-rose-500';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'inactive':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
    case 'error':
      return 'bg-red-100 text-red-700 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4" />;
    case 'inactive':
      return <Clock className="h-4 w-4" />;
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'error':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const formatMethodType = (type: string) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export function PaymentMethodCard({
  method,
  onEdit,
  onDelete,
  onToggleStatus,
  onSetDefault,
  onViewTransactions
}: PaymentMethodCardProps) {
  const Icon = getMethodIcon(method.type);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${getMethodColor(method.type)}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {method.name}
              </CardTitle>
              <p className="text-sm text-gray-600">{formatMethodType(method.type)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {method.isDefault && (
              <Badge className="bg-yellow-100 text-yellow-700">
                <Star className="mr-1 h-3 w-3" />
                Default
              </Badge>
            )}
            <Badge className={getStatusColor(method.status)}>
              {getStatusIcon(method.status)}
              <span className="ml-1">{method.status.charAt(0).toUpperCase() + method.status.slice(1)}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Method Details */}
        <div className="space-y-2">
          {method.details.accountNumber && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account:</span>
              <span className="font-mono">****{method.details.accountNumber.slice(-4)}</span>
            </div>
          )}
          {method.details.cardLast4 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Card:</span>
              <span className="font-mono">{method.details.cardBrand} ****{method.details.cardLast4}</span>
            </div>
          )}
          {method.details.email && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Email:</span>
              <span>{method.details.email}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Currency:</span>
            <span>{method.currency}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{method.totalTransactions}</div>
            <div className="text-xs text-gray-500">Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {method.currency} {method.totalAmount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total Volume</div>
          </div>
        </div>

        {/* Fees */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-900 font-medium mb-1">Processing Fees</div>
          <div className="text-sm text-blue-700">
            {method.fees.percentage}% + {method.currency} {method.fees.fixed.toFixed(2)}
          </div>
        </div>

        {/* Last Used */}
        {method.lastUsed && (
          <div className="text-xs text-gray-500">
            Last used: {new Date(method.lastUsed).toLocaleDateString()}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewTransactions?.(method)}
              className="bg-white/60 border-white/30"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Transactions
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(method)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Method
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewTransactions?.(method)}>
                <Eye className="mr-2 h-4 w-4" />
                View Transactions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configure Webhooks
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!method.isDefault && (
                <DropdownMenuItem onClick={() => onSetDefault?.(method)}>
                  <Star className="mr-2 h-4 w-4" />
                  Set as Default
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onToggleStatus?.(method)}>
                {method.status === 'active' ? (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete?.(method)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Method
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}