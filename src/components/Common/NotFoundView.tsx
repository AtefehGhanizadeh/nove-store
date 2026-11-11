'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { BoxIcon } from '@/assets/Icons';
import { LinkButton } from '@/shared/Button';
import Container from '@/shared/Container';
import EmptyState from '@/shared/EmptyState';

const Wrapper = styled.div`
  padding-block: ${({ theme }) => theme.space.xxl};
`;

export default function NotFoundView() {
  const t = useTranslations('errors');
  const tCommon = useTranslations('common');

  return (
    <Container>
      <Wrapper>
        <EmptyState
          icon={<BoxIcon />}
          title={t('notFoundTitle')}
          description={t('notFoundDescription')}
          headingLevel="h1"
          action={<LinkButton href="/">{tCommon('backToStore')}</LinkButton>}
        />
      </Wrapper>
    </Container>
  );
}
