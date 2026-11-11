import { StorageKey } from '@/types/enums/StorageKey';
import { ThemeMode } from '@/types/enums/ThemeMode';

export const THEME_INIT_SCRIPT = `
  const savedTheme = localStorage.getItem('${StorageKey.Theme}');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const theme =
    savedTheme === '${ThemeMode.Light}' || savedTheme === '${ThemeMode.Dark}'
      ? savedTheme
      : prefersDark
        ? '${ThemeMode.Dark}'
        : '${ThemeMode.Light}';

  document.documentElement.dataset.theme = theme;
`;
