import { toApiResult } from '@/api/handleApiError';
import CategoryChips from '@/components/Home/CategoryChips';
import Hero from '@/components/Home/Hero';
import ProductsError from '@/components/Home/ProductsError';
import ProductsSection from '@/components/Home/ProductsSection';
import { getCategories, getProducts } from '@/requests/products';
import type { RawSearchParams } from '@/types/productQuery';
import { parseProductQuery, queryProducts } from '@/utils/productQuery';

interface HomePageProps {
  searchParams: Promise<RawSearchParams>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = parseProductQuery(await searchParams);

  const [productsResult, categoriesResult] = await Promise.all([
    toApiResult(getProducts()),
    toApiResult(getCategories()),
  ]);

  return (
    <>
      <Hero />

      {productsResult.ok ? (
        <>
          <CategoryChips
            categories={categoriesResult.ok ? categoriesResult.data : []}
            query={query}
          />
          <ProductsSection result={queryProducts(productsResult.data, query)} query={query} />
        </>
      ) : (
        <ProductsError code={productsResult.error.code} />
      )}
    </>
  );
}
