import { notFound } from 'next/navigation';

/** Sends unknown localized paths to `[locale]/not-found.tsx`, inside the localized layout. */
export default function CatchAllPage() {
  notFound();
}
