import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/utils/i18n/routing';

/** Locale-aware wrappers around Next.js navigation. Use these instead of next/link. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
