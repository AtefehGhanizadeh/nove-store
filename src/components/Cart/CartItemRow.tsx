'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { TrashIcon } from '@/assets/Icons';
import IconButton from '@/shared/IconButton';
import Price from '@/shared/Price';
import QuantityStepper from '@/shared/QuantityStepper';
import { getLineTotal, useCartStore } from '@/storage/cartStore';
import type { CartItem } from '@/types/cart';
import { formatPrice } from '@/utils/formatPrice';
import { useCategoryLabel } from '@/utils/i18n/useCategoryLabel';
import {
  ImageBox,
  Info,
  Meta,
  RemoveArea,
  Row,
  StepperArea,
  Title,
  Total,
  TotalLabel,
} from './CartItemRow.styles';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const t = useTranslations('cart');
  const locale = useLocale();
  const getCategoryLabel = useCategoryLabel();
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);
  const { product, quantity } = item;

  return (
    <Row>
      <ImageBox>
        <Image src={product.image} alt={product.title} fill sizes="96px" />
      </ImageBox>

      <Info>
        <Title lang="en" dir="auto">
          {product.title}
        </Title>
        <Meta>{getCategoryLabel(product.category)}</Meta>
        <Meta>{t('unitPrice', { price: formatPrice(product.price, locale) })}</Meta>
      </Info>

      <StepperArea>
        <QuantityStepper
          value={quantity}
          onIncrement={() => increment(product.id)}
          onDecrement={() => decrement(product.id)}
          increaseLabel={t('increase', { title: product.title })}
          decreaseLabel={t('decrease', { title: product.title })}
          groupLabel={t('quantity')}
        />
      </StepperArea>

      <Total>
        <TotalLabel>{t('lineTotal')}</TotalLabel>
        <Price value={getLineTotal(item)} />
      </Total>

      <RemoveArea>
        <IconButton
          onClick={() => removeItem(product.id)}
          aria-label={t('remove', { title: product.title })}
        >
          <TrashIcon />
        </IconButton>
      </RemoveArea>
    </Row>
  );
}
