import 'styled-components';
import type { DesignTokens } from '@/utils/designTokens';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends DesignTokens {}
}
