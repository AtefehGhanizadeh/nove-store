'use client';

import { useTranslations } from 'next-intl';
import { MoonIcon, SunIcon } from '@/assets/Icons';
import { useTheme } from '@/context/ThemeContext';
import IconButton from '@/shared/IconButton';
import { ThemeMode } from '@/types/enums/ThemeMode';

export default function ThemeToggle() {
  const t = useTranslations('header');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === ThemeMode.Dark;

  return (
    <IconButton onClick={toggleTheme} aria-label={isDark ? t('switchToLight') : t('switchToDark')}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
