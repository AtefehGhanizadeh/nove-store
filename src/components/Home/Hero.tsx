'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import heroImage from '@/assets/Images/hero.svg';
import { AnchorButton } from '@/shared/Button';
import Container from '@/shared/Container';
import { Section, Banner, Content, Title, Subtitle, ForwardArrow, Media } from './Hero.styles';

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
