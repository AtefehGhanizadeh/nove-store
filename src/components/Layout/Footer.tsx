'use client';

import type { ComponentType, SVGProps } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { InstagramIcon, LinkedinIcon, TelegramIcon, XIcon } from '@/assets/Icons';
import Container from '@/shared/Container';
import { formatNumber } from '@/utils/formatNumber';
import {
  Bottom,
  Brand,
  Column,
  ColumnTitle,
  FooterBar,
  FooterLink,
  Grid,
  LinkList,
  PlainItem,
  SocialLink,
  SocialList,
  Tagline,
} from './Footer.styles';
import Logo from './Logo';

interface FooterProps {
  year: number;
}

type FooterMessageKey = 'telegram' | 'instagram' | 'linkedin' | 'x';

interface SocialItem {
  labelKey: FooterMessageKey;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const SOCIAL_LINKS: SocialItem[] = [
  { labelKey: 'telegram', href: 'https://telegram.org', Icon: TelegramIcon },
  { labelKey: 'instagram', href: 'https://www.instagram.com', Icon: InstagramIcon },
  { labelKey: 'linkedin', href: 'https://www.linkedin.com', Icon: LinkedinIcon },
  { labelKey: 'x', href: 'https://x.com', Icon: XIcon },
];

const GUIDE_KEYS = ['shippingMethods', 'returns', 'securePayment', 'faq'] as const;

export default function Footer({ year }: FooterProps) {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <FooterBar>
      <Container>
        <Grid>
          <Brand>
            <Logo tone="light" />
            <Tagline>{t('tagline')}</Tagline>
          </Brand>

          <Column>
            <ColumnTitle>{t('shoppingGuide')}</ColumnTitle>
            <LinkList>
              {GUIDE_KEYS.map((key) => (
                <PlainItem key={key}>{t(key)}</PlainItem>
              ))}
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>{t('usefulLinks')}</ColumnTitle>
            <LinkList>
              <li>
                <FooterLink href="/">{t('home')}</FooterLink>
              </li>
              <li>
                <FooterLink href={{ pathname: '/', hash: 'products' }}>{t('products')}</FooterLink>
              </li>
              <PlainItem>{t('about')}</PlainItem>
              <PlainItem>{t('contact')}</PlainItem>
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>{t('social')}</ColumnTitle>
            <SocialList>
              {SOCIAL_LINKS.map(({ labelKey, href, Icon }) => (
                <li key={labelKey}>
                  <SocialLink
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(labelKey)}
                  >
                    <Icon />
                  </SocialLink>
                </li>
              ))}
            </SocialList>
          </Column>
        </Grid>

        <Bottom>
          {t('copyright', { year: formatNumber(year, locale, { useGrouping: false }) })}
        </Bottom>
      </Container>
    </FooterBar>
  );
}
