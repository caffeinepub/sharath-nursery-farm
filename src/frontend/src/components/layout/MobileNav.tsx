import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { X, LayoutDashboard, Leaf, Container, Sprout, Receipt, Skull, DollarSign, Users, UserCircle, BarChart3, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Plants', href: '/plants', icon: Leaf },
  { name: 'Pots', href: '/pots', icon: Container },
  { name: 'Propagation', href: '/propagation', icon: Sprout },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Dead Plants', href: '/dead-plants', icon: Skull },
  { name: 'Expenses', href: '/expenses', icon: DollarSign },
  { name: 'Workers', href: '/workers', icon: Users },
  { name: 'Customers', href: '/customers', icon: UserCircle },
  { name: 'Reports', href: '/reports/monthly', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-card lg:hidden">
        <div className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-nursery-primary">Sharath Nursery</span>
          </div>
          <button onClick={onClose} className="rounded-md p-2 hover:bg-accent">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-11',
                  isActive
                    ? 'bg-nursery-primary text-white'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
