'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { CartIcon, CheckIcon } from '@/assets/Icons';
import { Button } from '@/shared/Button';
import Price from '@/shared/Price';
import Rating from '@/shared/Rating';
import { useCartStore } from '@/storage/cartStore';
import type { Product } from '@/types/product';
import { formatNumber } from '@/utils/formatNumber';
import { useCategoryLabel } from '@/utils/i18n/useCategoryLabel';
import { Body, Card, CategoryBadge, Footer, ImageBox, Title } from './ProductCard.styles';

const ADDED_FEEDBACK_MS = 1500;

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const t = useTranslations('products');
  const locale = useLocale();
  const getCategoryLabel = useCategoryLabel();
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(feedbackTimer.current), []);

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setAdded(false), ADDED_FEEDBACK_MS);
  }

  const ratingLabel = t('ratingLabel', {
    rate: formatNumber(product.rating.rate, locale),
    count: formatNumber(product.rating.count, locale),
  });

  return (
    <Card>
      <ImageBox>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
          priority={priority}
        />
      </ImageBox>
      <Body>
        <CategoryBadge>{getCategoryLabel(product.category)}</CategoryBadge>
        <Title lang="en" dir="auto" title={product.title}>
          {product.title}
        </Title>
        <Rating rate={product.rating.rate} count={product.rating.count} label={ratingLabel} />
        <Footer>
          <Price value={product.price} size="lg" />
          <Button
            $fullWidth
            onClick={handleAddToCart}
            aria-label={t('addToCartLabel', { title: product.title })}
          >
            {added ? <CheckIcon /> : <CartIcon />}
            {added ? t('added') : t('addToCart')}
          </Button>
          <span role="status" className="visually-hidden">
            {added ? t('added') : ''}
          </span>
        </Footer>
      </Body>
    </Card>
  );
}
