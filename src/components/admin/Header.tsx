'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { useAppSelector } from '@/lib/hooks';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FiMenu, FiZap } from 'react-icons/fi';

type HeaderProps = {
  onMobileMenuClick?: () => void;
};

const Header = ({ onMobileMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const notificationRef = useRef<HTMLDivElement>(null);
  // const { user } = useAppSelector((state) => state.auth);
  const [notificationPopup, setNotificationPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-cborder/50 bg-white/75 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_32px_-12px_rgba(15,23,42,0.08)] transition-[box-shadow,background-color] duration-300 ease-[cubic-bezier(0.3,0,0,1)]">
      <div className="relative mx-auto flex w-full max-w-[1920px] items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-3.5 md:px-8">
        <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
          {onMobileMenuClick ? (
            <button
              type="button"
              aria-label="Open navigation menu"
              className="mt-0.5 shrink-0 rounded-xl border border-cborder/40 p-2 text-brand transition-colors hover:bg-playground/80 md:hidden"
              onClick={onMobileMenuClick}
            >
              <FiMenu className="h-5 w-5" />
            </button>
          ) : null}
          <span
            className="mt-0.5 shrink-0 rounded-lg bg-[#e65f2b]/15 p-1.5 text-[#e65f2b] lg:hidden"
            aria-hidden
          >
            <FiZap className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-medium leading-snug tracking-[-0.02em] text-light-brand sm:line-clamp-none sm:text-[15px]">
              Welcome to admin portal
            </p>
            <p className="mt-0.5 hidden text-xs text-owngray sm:block">
              Here’s what’s happening today
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-5">
          <button
            onClick={() => setNotificationPopup(true)}
            className="relative flex items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#e65f2b]/35 focus-visible:ring-offset-2"
            type="button"
            aria-expanded={notificationPopup}
            aria-haspopup="true"
          >
            <span className="relative inline-flex rounded-2xl border border-cborder/40 bg-playground/60 p-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 ease-[cubic-bezier(0.3,0,0,1)] hover:border-[#e65f2b]/20 hover:bg-[#e65f2b]/10 hover:shadow-[0_8px_24px_-12px_rgba(230,95,43,0.25)] active:scale-[0.97] sm:p-2.5">
              <span
                className="absolute -right-1 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FFD700] px-1 text-[10px] font-semibold text-black"
                aria-label="0 unread notifications"
              >
                0
              </span>
              <IoNotificationsOutline className="h-6 w-6 cursor-pointer text-[#e65f2b] sm:h-7 sm:w-7" />
            </span>
          </button>
          <div className="flex items-center gap-2 border-l border-cborder/50 pl-2 sm:gap-3 sm:pl-4">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-playground ring-2 ring-white shadow-md sm:h-11 sm:w-11 sm:ring-[3px]">
              <img
                src="/statics/profile.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden min-w-0 text-left min-[380px]:block">
              <h4 className="max-w-[120px] truncate text-sm font-semibold text-brand sm:max-w-[200px]">
                {'Admin'}
              </h4>
              <span className="hidden text-xs text-owngray sm:inline">Administrator</span>
            </div>
          </div>
        </div>
        {notificationPopup ? (
          <div
            ref={notificationRef}
            className="motion-safe:animate-header-pop absolute right-4 top-[calc(100%+12px)] z-20 w-[min(100vw-2rem,400px)] max-w-[400px] divide-y divide-cborder/30 rounded-2xl border border-cborder/40 bg-white/95 px-3 py-4 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.15)] backdrop-blur-md sm:right-8"
          >
            <div className="pb-3 text-center text-sm text-owngray">No new notifications</div>
            <div className="mx-auto mt-4 w-fit">
              <Link
                href="/admin"
                className="inline-flex h-10 w-40 items-center justify-center rounded-xl border-0 bg-emerald-500 text-sm font-medium text-white shadow-sm transition-shadow hover:shadow-md"
              >
                Back to overview
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
