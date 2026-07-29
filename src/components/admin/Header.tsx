'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { IoNotificationsOutline } from 'react-icons/io5';
import {
  FiMenu,
  FiActivity,
  FiFolder,
  FiBookOpen,
  FiCpu,
  FiBriefcase,
} from 'react-icons/fi';

type HeaderProps = {
  onMobileMenuClick?: () => void;
};

const PAGE_META: Record<string, { title: string; subtitle: string; Icon: React.ElementType }> = {
  '/admin': {
    title: 'Dashboard',
    subtitle: "Overview of your portfolio content",
    Icon: FiActivity,
  },
  '/admin/projects': {
    title: 'Projects',
    subtitle: 'Manage your portfolio project showcases',
    Icon: FiFolder,
  },
  '/admin/blogs': {
    title: 'Blogs',
    subtitle: 'Manage your portfolio articles and tutorials',
    Icon: FiBookOpen,
  },
  '/admin/skills': {
    title: 'Skills',
    subtitle: 'Manage your technology stack proficiency levels',
    Icon: FiCpu,
  },
  '/admin/experiences': {
    title: 'Experience',
    subtitle: 'Manage your professional career timeline',
    Icon: FiBriefcase,
  },
};

function getPageMeta(pathname: string) {
  if (PAGE_META[pathname]) return PAGE_META[pathname];
  const parent = Object.keys(PAGE_META)
    .filter((k) => k !== '/admin' && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return parent
    ? PAGE_META[parent]
    : { title: 'Admin Portal', subtitle: "Here's what's happening today", Icon: FiActivity };
}

const Header = ({ onMobileMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const notifRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [notifOpen, setNotifOpen] = useState(false);

  const { title, subtitle, Icon } = getPageMeta(pathname);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setNotifOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[16] w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-3 px-3 py-2.5 sm:px-6 md:px-8">

        {/* ── Left: hamburger + breadcrumb title ── */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          {onMobileMenuClick && (
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={onMobileMenuClick}
              className="shrink-0 rounded-xl border border-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white md:hidden"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          )}

          {/* Page icon */}
          <span className="hidden shrink-0 rounded-lg bg-violet-500/10 p-1.5 text-violet-400 sm:flex">
            <Icon className="h-4 w-4" />
          </span>

          {/* Title stack */}
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold leading-tight tracking-tight text-white sm:text-[15px]">
              {title}
            </h1>
            <p className="mt-0.5 hidden truncate text-[11px] text-zinc-500 sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* ── Right: notification bell + profile ── */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">

          {/* Notification bell */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={notifOpen}
              onClick={() => setNotifOpen((v) => !v)}
              className="relative flex items-center outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
            >
              <span className="relative inline-flex rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 transition-all hover:border-violet-500/40 hover:bg-zinc-800 active:scale-95 sm:p-2.5">
                <span
                  aria-hidden
                  className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-violet-600 px-0.5 text-[9px] font-bold text-white"
                >
                  0
                </span>
                <IoNotificationsOutline className="h-5 w-5 text-violet-400 sm:h-[22px] sm:w-[22px]" />
              </span>
            </button>

            {/* Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-900/95 shadow-2xl backdrop-blur-md">
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-zinc-300">Notifications</p>
                </div>
                <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
                  <IoNotificationsOutline className="h-7 w-7 text-zinc-600" />
                  <p className="text-xs text-zinc-500">No new notifications</p>
                </div>
                <div className="px-4 py-3">
                  <Link
                    href="/admin"
                    onClick={() => setNotifOpen(false)}
                    className="flex h-9 w-full items-center justify-center rounded-xl bg-violet-600 text-xs font-semibold text-white transition-colors hover:bg-violet-500"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-7 w-px bg-zinc-800" aria-hidden />

          {/* Profile */}
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 shrink-0 sm:h-9 sm:w-9">
              <div className="h-full w-full overflow-hidden rounded-full bg-zinc-800 ring-2 ring-zinc-700">
                <img
                  src="/statics/profile.jpg"
                  alt={user?.name ?? 'Admin'}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                  }}
                />
              </div>
              {/* Online dot */}
              <span
                aria-hidden
                className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-emerald-500"
              />
            </div>
            <div className="hidden min-w-0 min-[380px]:block">
              <p className="max-w-[120px] truncate text-sm font-semibold leading-tight text-zinc-100 sm:max-w-[160px]">
                {user?.name ?? 'Admin'}
              </p>
              <p className="hidden text-[11px] text-zinc-500 sm:block">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
