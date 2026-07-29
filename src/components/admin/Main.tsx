'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

type AdminDashboardShellProps = {
  children: ReactNode;
};

const AdminDashboardShell = ({ children }: AdminDashboardShellProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <Sidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />
      <div className="min-h-screen flex-1 pl-0 md:pl-[250px] 2xl:pl-[272px]">
        <Header onMobileMenuClick={() => setMobileNavOpen(true)} />
        <div className="mx-auto max-w-[1920px] p-3 sm:p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardShell;
