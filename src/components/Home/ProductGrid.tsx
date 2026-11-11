'use client';

import styled from 'styled-components';
import type { Product } from '@/types/product';
import ProductCard from './ProductCard';

const PRIORITY_IMAGE_COUNT = 3;

export const GridList = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.md};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <GridList>
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < PRIORITY_IMAGE_COUNT} />
        </li>
      ))}
    </GridList>
  );
}
