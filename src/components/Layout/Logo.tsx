'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { BagIcon } from '@/assets/Icons';
import { Link } from '@/utils/i18n/navigation';

type LogoTone = 'default' | 'light';

interface LogoProps {
  tone?: LogoTone;
}

const LogoLink = styled(Link)<{ $tone: LogoTone }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  color: ${({ $tone }) =>
    $tone === 'light' ? 'var(--color-footer-text)' : 'var(--color-primary)'};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  letter-spacing: 0.04em;
  /* The brand name is Latin; keep it LTR inside RTL pages. */
  direction: ltr;
`;

export default function Logo({ tone = 'default' }: LogoProps) {
  const t = useTranslations('common');

  return (
    <LogoLink href="/" $tone={tone} aria-label={t('homeLink')}>
      <span>{t('brand')}</span>
      <BagIcon />
    </LogoLink>
  );
}
