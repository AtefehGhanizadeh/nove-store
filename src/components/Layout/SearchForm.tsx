'use client';

import { Suspense, useId } from 'react';
import type { FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { SearchIcon } from '@/assets/Icons';
import type { ProductQuery } from '@/types/productQuery';
import { useRouter } from '@/utils/i18n/navigation';
import { QUERY_PARAMS, buildProductListHref, parseProductQuery } from '@/utils/productQuery';

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => `${theme.space.md} ${theme.layout.touchTarget}`};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.pill};
  background: var(--color-surface-muted);
  font-size: ${({ theme }) => theme.fontSize.sm};

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus-visible {
    border-color: var(--color-accent);
    outline-offset: 0;
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const SubmitButton = styled.button.attrs({ type: 'submit' })`
  position: absolute;
  inset-inline-end: 0;
  display: grid;
  place-items: center;
  width: ${({ theme }) => theme.layout.touchTarget};
  height: ${({ theme }) => theme.layout.touchTarget};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: var(--color-text-muted);

  &:hover {
    color: var(--color-accent);
  }
`;

function SearchFormFields({ query }: { query: ProductQuery }) {
  const t = useTranslations('header');
  const router = useRouter();
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = new FormData(event.currentTarget).get(QUERY_PARAMS.search);
    const q = typeof value === 'string' ? value.trim() : '';

    router.push(buildProductListHref({ ...query, q, page: 1 }, 'products'));
  }

  return (
    <Form role="search" onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="visually-hidden">
        {t('searchLabel')}
      </label>
      <Input
        key={query.q ?? ''}
        id={inputId}
        name={QUERY_PARAMS.search}
        type="search"
        defaultValue={query.q}
        placeholder={t('searchPlaceholder')}
        autoComplete="off"
        enterKeyHint="search"
      />
      <SubmitButton aria-label={t('searchSubmit')}>
        <SearchIcon />
      </SubmitButton>
    </Form>
  );
}

function SearchFormWithQuery() {
  const searchParams = useSearchParams();

  return <SearchFormFields query={parseProductQuery(Object.fromEntries(searchParams))} />;
}

const EMPTY_QUERY = parseProductQuery({});

export default function SearchForm() {
  return (
    <Suspense fallback={<SearchFormFields query={EMPTY_QUERY} />}>
      <SearchFormWithQuery />
    </Suspense>
  );
}
