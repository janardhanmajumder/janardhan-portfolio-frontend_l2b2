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
        <h1 className="text-2xl font-bold tracking-tight text-white">Overview</h1>
        <p className="mt-1 text-sm text-zinc-400">
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
              className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-sm transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-zinc-400">{s.label}</p>
                <Icon className="h-5 w-5 shrink-0 text-violet-400 transition-colors group-hover:text-violet-300" />
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums text-white">{s.value}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-violet-400 group-hover:text-violet-300">
                Open section
                <FiArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-white">Getting started</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
          This shell uses the components under{' '}
          <code className="rounded bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 text-xs text-violet-300 font-mono">components/admin</code>
          — sidebar navigation, header, and content area. Add feature modules as nested routes under{' '}
          <code className="rounded bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 text-xs text-violet-300 font-mono">/admin</code>.
        </p>
      </div>
    </div>
  );
}
