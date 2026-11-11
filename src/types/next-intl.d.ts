import type { routing } from '@/utils/i18n/routing';
import type messages from '@/dictionary/fa.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
