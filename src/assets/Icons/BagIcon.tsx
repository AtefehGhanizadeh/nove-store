import type { SVGProps } from 'react';

/** NOVA brand mark: an orange shopping bag. */
export default function BagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M11 11V9a5 5 0 0 1 10 0v2"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M5.5 11h21l-1.6 15.2A3 3 0 0 1 21.9 29H10.1a3 3 0 0 1-3-2.8L5.5 11Z"
        fill="var(--color-accent)"
      />
    </svg>
  );
}
