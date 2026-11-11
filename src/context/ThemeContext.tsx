'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StorageKey } from '@/types/enums/StorageKey';
import { ThemeMode } from '@/types/enums/ThemeMode';
import { designTokens } from '@/utils/designTokens';

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getTheme(): ThemeMode {
  return document.documentElement.dataset.theme === ThemeMode.Dark
    ? ThemeMode.Dark
    : ThemeMode.Light;
}

function getServerTheme(): ThemeMode {
  return ThemeMode.Light;
}

function toggleTheme() {
  const nextTheme = getTheme() === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(StorageKey.Theme, nextTheme);

  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={designTokens}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider.');
  }

  return context;
}
