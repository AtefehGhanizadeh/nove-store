export type PaginationItem = number | 'ellipsis';

/**
 * Page numbers to render: always the first and last page, the current page and
 * `siblings` pages on each side, with ellipses for the gaps.
 */
export function getPaginationItems(
  current: number,
  totalPages: number,
  siblings = 1,
): PaginationItem[] {
  const items: PaginationItem[] = [];

  for (let page = 1; page <= totalPages; page += 1) {
    const isEdge = page === 1 || page === totalPages;
    const isNearCurrent = Math.abs(page - current) <= siblings;

    if (isEdge || isNearCurrent) {
      items.push(page);
    } else if (items[items.length - 1] !== 'ellipsis') {
      items.push('ellipsis');
    }
  }

  return items;
}
