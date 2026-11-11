import type { SVGProps } from 'react';

export default function DressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9 2v4l-2 4 3 1-4 11h12l-4-11 3-1-2-4V2" />
      <path d="M9 6h6" />
    </svg>
  );
}
