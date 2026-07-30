'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createElement, useCallback, useEffect, useState } from 'react';
import { FiLogOut, FiX, FiChevronRight } from 'react-icons/fi';
import { adminNavItems } from '@/constants/admin-nav';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logout } from '@/lib/features/auth/authSlice';
import { cn } from '@/lib/utils';

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

function pathMatches(pathname: string, href: string) {
  if (pathname === href) return true;
  if (href !== '/admin' && pathname.startsWith(`${href}/`)) return true;
  return false;
}

const Sidebar = ({ mobileOpen = false, onMobileClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const syncOpenGroup = useCallback(() => {
    const group = adminNavItems.find(
      (item) => item.children?.some((c) => pathMatches(pathname, c.path)) ?? false
    );
    setOpenGroup(group?.name ?? null);
  }, [pathname]);

  useEffect(() => {
    syncOpenGroup();
  }, [syncOpenGroup]);

  const handleLogOut = () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    dispatch(logout());
    router.push('/login');
  };

  // initials fallback for avatar
  const initials = (user?.name ?? 'A')
    .split(' ')
    .map((w: any[]) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-[14] bg-black/50 backdrop-blur-[2px] md:hidden"
          onClick={() => onMobileClose?.()}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-[15] h-screen w-[min(272px,88vw)] md:w-[250px] 2xl:w-[272px]',
          'transition-transform duration-300 ease-[cubic-bezier(0.3,0,0,1)] will-change-transform',
          'max-md:-translate-x-full',
          mobileOpen && 'max-md:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col border-r border-zinc-800/80 bg-zinc-950 shadow-2xl">

          {/* ── Brand / Logo area ── */}
          <div className="flex shrink-0 items-center justify-between gap-2 px-4 pb-4 pt-4 md:px-5">
            <div className="flex items-center gap-2.5">
              {/* Purple accent dot */}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-500/30">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 1L14.5 4.5V11.5L8 15L1.5 11.5V4.5L8 1Z" fill="currentColor" fillOpacity="0.9" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold leading-tight text-white">Admin Panel</p>
                <p className="truncate text-[10px] text-zinc-500">Portfolio CMS</p>
              </div>
            </div>
            {/* Mobile close */}
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => onMobileClose?.()}
              className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-white md:hidden"
            >
              <FiX className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* ── Nav items ── */}
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2.5 pb-2 pt-1 [scrollbar-color:oklch(0.4_0_0)_transparent] [scrollbar-width:thin]">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              Navigation
            </p>
            <ul className="space-y-0.5">
              {adminNavItems.map(({ name, icon, path, children }, idx) => {
                const childActive =
                  children?.some((c) => pathMatches(pathname, c.path)) ?? false;
                const expanded = openGroup === name || childActive;

                // Group item with children
                if (children?.length) {
                  return (
                    <li key={idx} className="overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenGroup((cur) => {
                            if (cur === name) return childActive ? name : null;
                            return name;
                          })
                        }
                        className={cn(
                          'group flex w-full items-center justify-between gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white',
                          (childActive || openGroup === name) && 'text-violet-400'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {createElement(icon, { size: 16 })}
                          <span className="font-medium">{name}</span>
                        </div>
                        <FiChevronRight
                          className={cn(
                            'h-3.5 w-3.5 shrink-0 text-zinc-600 transition-transform duration-200 group-hover:text-zinc-400',
                            expanded && 'rotate-90 text-zinc-400'
                          )}
                        />
                      </button>
                      {expanded && (
                        <ul className="mt-0.5 space-y-0.5 pb-1 pl-3">
                          {children.map((child, cidx) => {
                            const active = pathMatches(pathname, child.path);
                            return (
                              <li key={cidx}>
                                <Link
                                  href={child.path}
                                  onClick={() => onMobileClose?.()}
                                  className={cn(
                                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white',
                                    active && 'bg-violet-500/10 text-violet-400 font-semibold'
                                  )}
                                >
                                  {createElement(child.icon, { size: 13 })}
                                  <span>{child.name}</span>
                                  {active && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-500" aria-hidden />
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                }

                if (!path) return null;
                const active = pathMatches(pathname, path);

                return (
                  <li key={idx}>
                    <Link
                      href={path}
                      onClick={() => onMobileClose?.()}
                      className={cn(
                        'group flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white',
                        active && 'bg-violet-500/10 text-violet-400 font-semibold'
                      )}
                    >
                      {/* Left active bar */}
                      <span
                        className={cn(
                          'relative flex shrink-0 items-center',
                          active && 'text-violet-400'
                        )}
                      >
                        {createElement(icon, { size: 16 })}
                      </span>
                      <span className="flex-1">{name}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── User profile + logout ── */}
          <div className="shrink-0 border-t border-zinc-800/80 px-3 py-3">
            {/* User info row */}
            <div className="mb-2 flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/90 px-3 py-2.5">
              <div className="relative h-8 w-8 shrink-0">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-violet-950/80 text-xs font-bold text-violet-300 ring-2 ring-violet-500/30">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name ?? 'Admin'}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    initials
                  )}
                </div>
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-zinc-950 bg-emerald-400" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">
                  {user?.name ?? 'Administrator'}
                </p>
                <p className="truncate text-[10px] font-mono text-zinc-400">
                  {user?.email ?? 'admin@portfolio.dev'}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogOut}
              type="button"
              className="group flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <FiLogOut
                size={15}
                className="shrink-0 text-red-400 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-red-300"
              />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
