'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { ArrowIcon } from '@/assets/Icons';
import heroImage from '@/assets/Images/hero.svg';
import { AnchorButton } from '@/shared/Button';
import Container from '@/shared/Container';

const Section = styled.section`
  padding-block-start: ${({ theme }) => theme.space.md};

  ${({ theme }) => theme.media.md} {
    padding-block-start: ${({ theme }) => theme.space.lg};
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-muted) 100%);
  border: 1px solid var(--color-border);
  overflow: hidden;

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }) => `${theme.space.xl} ${theme.space.xxl}`};
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.sm};
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  line-height: 1.3;

  ${({ theme }) => theme.media.lg} {
    font-size: ${({ theme }) => theme.fontSize.display};
  }
`;

const Subtitle = styled.p`
  margin-block-end: ${({ theme }) => theme.space.xs};
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.md};

  ${({ theme }) => theme.media.lg} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const ForwardArrow = styled(ArrowIcon)`
  width: 18px;
  height: 18px;

  [dir='rtl'] & {
    transform: scaleX(-1);
  }
`;

const Media = styled.div`
  flex: 1.1;
  min-width: 0;

  img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`;

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <Section aria-labelledby="hero-title">
      <Container>
        <Banner>
          <Content>
            <Title id="hero-title">{t('title')}</Title>
            <Subtitle>{t('subtitle')}</Subtitle>
            <AnchorButton href="#products">
              {t('cta')}
              <ForwardArrow />
            </AnchorButton>
          </Content>

          <Media>
            <Image
              src={heroImage}
              alt={t('imageAlt')}
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Media>
        </Banner>
      </Container>
    </Section>
  );
}
