'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`;

interface SkeletonProps {
  $width?: string;
  $height?: string;
  $radius?: string;
}

const Skeleton = styled.span<SkeletonProps>`
  display: block;
  width: ${({ $width = '100%' }) => $width};
  height: ${({ $height = '1rem' }) => $height};
  border-radius: ${({ $radius, theme }) => $radius ?? theme.radius.sm};
  background: var(--color-surface-muted);
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

export default Skeleton;
