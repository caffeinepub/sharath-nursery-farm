import { Outlet } from '@tanstack/react-router';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="hidden lg:flex" />
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-semibold text-nursery-primary">Sharath Nursery Farm</span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>

        <footer className="border-t py-6 px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Sharath Nursery Farm. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'sharath-nursery'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-nursery-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs">Grow Green, Stay Green 🌱</p>
          </div>
        </footer>
      </div>
      
      <Toaster />
    </div>
  );
}
