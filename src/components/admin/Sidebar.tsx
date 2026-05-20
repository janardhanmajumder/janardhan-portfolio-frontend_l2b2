'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createElement, useCallback, useEffect, useState } from 'react';
import { FiLogOut, FiX } from 'react-icons/fi';
import { MdOutlineArrowRight } from 'react-icons/md';
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
  const [openNome, setOpenNome] = useState<{ name: string | null }>({ name: null });

  const syncOpenGroup = useCallback(() => {
    const group = adminNavItems.find(
      (item) =>
        item.children?.some((c) => pathMatches(pathname, c.path)) ?? false
    );
    setOpenNome({ name: group?.name ?? null });
  }, [pathname]);

  useEffect(() => {
    syncOpenGroup();
  }, [syncOpenGroup]);

  const handleLogOut = () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    dispatch(logout());
    router.push('/login');
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-[15] h-screen min-h-0 w-[min(280px,88vw)] md:w-[250px] 2xl:w-[280px]',
        'transition-transform duration-300 ease-[cubic-bezier(0.3,0,0,1)] will-change-transform',
        'max-md:-translate-x-full max-md:shadow-[8px_0_40px_-8px_rgba(15,23,42,0.18)]',
        mobileOpen && 'max-md:translate-x-0'
      )}
    >
      <div className="flex h-full min-h-0 w-full flex-col border-r border-cborder/55 bg-gradient-to-b from-white via-playground/40 to-playground/70 shadow-[6px_0_40px_-20px_rgba(15,23,42,0.12)]">
        <div className="flex shrink-0 items-center justify-end px-3 pb-1 pt-3 md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => onMobileClose?.()}
            className="rounded-xl p-2 text-brand transition-colors hover:bg-[#e65f2b]/10"
          >
            <FiX className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
        <div className="flex shrink-0 flex-col items-center px-4 pb-3 pt-2 md:px-5 md:pb-3 md:pt-3">
          <img
            className="max-h-9 w-full object-contain md:max-h-none"
            src="/statics/dash-log.png"
            alt={user?.name ? `${user.name} dashboard` : 'Admin dashboard'}
          />
        </div>
        <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain scroll-py-2 px-2.5 py-1 [scrollbar-color:oklch(0.68_0_0)_transparent] [scrollbar-width:thin]">
          {adminNavItems.map(({ name, icon, path, children }, indx) => {
            const childActive =
              children?.some((c) => pathMatches(pathname, c.path)) ?? false;
            const expanded = openNome.name === name || childActive;

            if (children?.length) {
              return (
                <li key={indx} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenNome((c) => {
                        if (c.name === name) {
                          if (childActive) return { name };
                          return { name: null };
                        }
                        return { name };
                      });
                    }}
                    className={cn(
                      'group flex w-full items-center justify-between gap-3 rounded-xl py-3 pl-5 pr-4 text-[#373643] outline-none transition-colors duration-200 ease-[cubic-bezier(0.3,0,0,1)] hover:bg-[#e65f2b]/5 hover:text-[#e65f2b]',
                      (childActive || openNome.name === name) && 'text-[#e65f2b]'
                    )}
                  >
                    <div className="flex items-center justify-start gap-2.5">
                      <div>{createElement(icon, { size: '20' })}</div>
                      <span>{name}</span>
                    </div>
                    <MdOutlineArrowRight
                      className={cn(
                        'cursor-pointer text-slate-500 transition-transform duration-300 ease-[cubic-bezier(0.3,0,0,1)] group-hover:text-[#373643]',
                        expanded && 'rotate-90 text-[#373643] group-hover:text-slate-500'
                      )}
                      size={20}
                    />
                  </button>
                  <div
                    className={cn('h-0 space-y-0.5 overflow-hidden', {
                      'h-fit pt-0.5': expanded,
                    })}
                  >
                    {children.map((child, inx) => {
                      const active = pathMatches(pathname, child.path);
                      return (
                        <Link
                          key={inx}
                          href={child.path}
                          onClick={() => onMobileClose?.()}
                          className={cn(
                            'flex w-full items-center justify-start gap-2.5 rounded-lg py-2.5 pl-8 pr-4 text-sm text-brand transition-colors duration-200 ease-[cubic-bezier(0.3,0,0,1)] hover:bg-[#e65f2b]/5 hover:text-[#e65f2b] 2xl:text-base',
                            active &&
                              'relative bg-[#e65f2b]/10 text-[#e65f2b] before:absolute before:bottom-1 before:left-0 before:top-1 before:w-[3px] before:rounded-full before:bg-[#e65f2b]'
                          )}
                        >
                          <div>{createElement(child.icon, { size: '15' })}</div>
                          <span>{child.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </li>
              );
            }

            if (!path) return null;

            const active = pathMatches(pathname, path);
            return (
              <li key={indx}>
                <Link
                  href={path}
                  onClick={() => onMobileClose?.()}
                  className={cn(
                    'flex w-full items-center justify-start gap-2.5 rounded-xl py-3 pl-5 pr-4 text-brand transition-colors duration-200 ease-[cubic-bezier(0.3,0,0,1)] hover:bg-[#e65f2b]/5 hover:text-[#e65f2b] 2xl:text-lg',
                    active &&
                      'relative bg-[#e65f2b]/10 text-[#e65f2b] before:absolute before:bottom-1.5 before:left-0 before:top-1.5 before:w-[3px] before:rounded-full before:bg-[#e65f2b]'
                  )}
                >
                  <div>{createElement(icon, { size: '17' })}</div>
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="shrink-0 border-t border-cborder/50 bg-gradient-to-t from-playground/50 to-transparent px-2.5 pb-4 pt-2">
          <button
            onClick={handleLogOut}
            type="button"
            className="group flex w-full cursor-pointer items-center justify-start gap-2.5 rounded-xl px-4 py-3 text-[#373643] outline-none transition-colors duration-200 ease-[cubic-bezier(0.3,0,0,1)] hover:bg-red-50/90 active:bg-red-50 2xl:text-lg"
          >
            <FiLogOut
              className="text-red-400 transition-transform duration-200 group-hover:-translate-x-0.5"
              size={18}
            />
            <span className="font-medium text-red-500">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
