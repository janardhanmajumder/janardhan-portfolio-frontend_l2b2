'use client';

import { useEffect, type FormEvent, type ReactNode } from 'react';
import { FiLoader, FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';

// ─── Shared style exports ────────────────────────────────────────────────────

export const adminFormFieldClass =
  'w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40';

export const adminFormLabelClass =
  'text-[11px] font-semibold uppercase tracking-wider text-zinc-400';

// ─── AdminFormField ───────────────────────────────────────────────────────────

type AdminFormFieldProps = {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function AdminFormField({
  label,
  hint,
  required,
  children,
  className,
}: AdminFormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between gap-2">
        <label className={adminFormLabelClass}>
          {label}
          {required && <span className="ml-0.5 text-violet-400">*</span>}
        </label>
        {hint && (
          <span className="shrink-0 text-[10px] text-zinc-500">{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── AdminFormGrid ────────────────────────────────────────────────────────────

type AdminFormGridProps = {
  children: ReactNode;
  cols?: 2 | 3;
  className?: string;
};

export function AdminFormGrid({ children, cols = 2, className }: AdminFormGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4',
        cols === 2 && 'sm:grid-cols-2',
        cols === 3 && 'sm:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── AdminFormSection ─────────────────────────────────────────────────────────

type AdminFormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function AdminFormSection({
  title,
  description,
  children,
  className,
}: AdminFormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            {title}
          </p>
          {description && (
            <p className="mt-0.5 text-[10px] text-zinc-600">{description}</p>
          )}
        </div>
        <div className="h-px flex-1 bg-zinc-800" aria-hidden />
      </div>
      {children}
    </div>
  );
}

// ─── AdminFormDrawer (main component) ────────────────────────────────────────

type AdminFormDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  submitting?: boolean;
  children: ReactNode;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
};

const sizeClass = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const AdminFormDrawer = ({
  open,
  onClose,
  title,
  description,
  onSubmit,
  submitLabel,
  submitting = false,
  children,
  size = 'lg',
  className,
}: AdminFormDrawerProps) => {
  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/*
        ── Stacking context ──────────────────────────────────────────────────
        z-[20]  → sits above header (z-10) and sidebar (z-[15])
        On desktop the backdrop starts AFTER the sidebar via ml offset,
        so the sidebar stays fully visible and interactive.
        On mobile the backdrop covers everything (sidebar slides on top via z-[15]).
      */}
      <div
        className="fixed inset-0 z-[20] flex"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Backdrop — full screen on mobile, offset past sidebar on desktop */}
        <button
          type="button"
          aria-label="Close form"
          className={cn(
            'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity',
            // On md+ push backdrop start past the sidebar so sidebar stays clear
            'md:left-[250px] 2xl:left-[272px]'
          )}
          onClick={onClose}
        />

        {/* Drawer panel — slides in from the right edge */}
        <aside
          className={cn(
            'relative ml-auto flex h-full w-full flex-col border-l border-zinc-800/80 bg-zinc-900 shadow-2xl',
            sizeClass[size],
            className
          )}
          style={{ animation: 'drawerSlideIn 0.22s cubic-bezier(0.3,0,0,1)' }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-800 bg-zinc-950/80 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <h2 className="text-base font-bold tracking-tight text-white">{title}</h2>
              {description && (
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-0.5 shrink-0 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Close"
            >
              <FiX className="h-[18px] w-[18px]" />
            </button>
          </div>

          {/* Scrollable form body */}
          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 [scrollbar-color:oklch(0.4_0_0)_transparent] [scrollbar-width:thin]">
              {children}
            </div>

            {/* Footer actions */}
            <div className="flex shrink-0 items-center gap-3 border-t border-zinc-800 bg-zinc-950/80 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-zinc-800 bg-transparent py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none"
              >
                {submitting && <FiLoader className="h-3.5 w-3.5 animate-spin" />}
                {submitLabel}
              </button>
            </div>
          </form>
        </aside>
      </div>

      <style>{`
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); opacity: 0.6; }
          to   { transform: translateX(0);    opacity: 1;   }
        }
      `}</style>
    </>
  );
};

export default AdminFormDrawer;
