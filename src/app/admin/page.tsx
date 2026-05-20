'use client';

import Link from 'next/link';
import { FiArrowUpRight, FiFolder, FiBookOpen, FiCpu, FiBriefcase } from 'react-icons/fi';

const stats = [
  { label: 'Total Projects', value: '12', icon: FiFolder, href: '/admin/projects' },
  { label: 'Published Blogs', value: '5', icon: FiBookOpen, href: '/admin/blogs' },
  { label: 'Skills', value: '24', icon: FiCpu, href: '/admin/skills' },
  { label: 'Experiences', value: '3', icon: FiBriefcase, href: '/admin/experiences' },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-brand">Overview</h1>
        <p className="mt-1 text-sm text-owngray">
          Connect your data sources to populate these metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group flex flex-col rounded-2xl border border-cborder/60 bg-white/90 p-5 shadow-sm transition hover:border-[#e65f2b]/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-owngray">{s.label}</p>
                <Icon className="h-5 w-5 shrink-0 text-[#e65f2b]/80 transition group-hover:text-[#e65f2b]" />
              </div>
              <p className="mt-3 text-3xl font-semibold tabular-nums text-brand">{s.value}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#e65f2b]">
                Open section
                <FiArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-cborder/60 bg-white/90 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-brand">Getting started</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-owngray">
          This shell uses the components under{' '}
          <code className="rounded bg-playground px-1.5 py-0.5 text-xs text-brand">components/admin</code>
          — sidebar navigation, header, and content area. Add feature modules as nested routes under{' '}
          <code className="rounded bg-playground px-1.5 py-0.5 text-xs text-brand">/admin</code>.
        </p>
      </div>
    </div>
  );
}
