/** FakeStoreAPI prices are in US dollars; only the digits and separators are localized. */
const PRICE_CURRENCY = 'USD';

export function formatPrice(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: PRICE_CURRENCY }).format(
    value,
  );
}
