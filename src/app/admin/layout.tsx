'use client';

import Main from '@/components/admin/Main';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Main>{children}</Main>;
}
