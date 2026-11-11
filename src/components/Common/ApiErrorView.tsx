'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import Container from '@/shared/Container';
import ErrorState from '@/shared/ErrorState';
import type { ApiErrorCode } from '@/types/enums/ApiErrorCode';
import { ERROR_MESSAGE_KEYS } from '@/utils/errorMessages';

interface ApiErrorViewProps {
  code: ApiErrorCode;
  onRetry: () => void;
  isRetrying?: boolean;
}

const Wrapper = styled.div`
  padding-block: ${({ theme }) => theme.space.xl};
`;

export default function ApiErrorView({ code, onRetry, isRetrying }: ApiErrorViewProps) {
  const t = useTranslations('errors');

  return (
    <Container>
      <Wrapper>
        <ErrorState
          title={t('title')}
          message={t(ERROR_MESSAGE_KEYS[code])}
          retryLabel={t('retry')}
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      </Wrapper>
    </Container>
  );
}
