import type { SVGProps } from 'react';

export default function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7h.01M12 17v-7M12 13a3 3 0 0 1 6 0v4" />
    </svg>
  );
}
