import type { SVGProps } from 'react';

export default function TelegramIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="m22 3-20 8 7 2 2 7 4-5 5 4 2-16Z" />
      <path d="m9 13 9-7" />
    </svg>
  );
}
