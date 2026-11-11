import styled from 'styled-components';

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  margin-block-end: ${({ theme }) => theme.space.lg};
`;

export const Heading = styled.h2`
  display: inline-block;
  padding-block-end: ${({ theme }) => theme.space.xs};
  border-block-end: 3px solid var(--color-accent);
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
`;

export const Summary = styled.p`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${({ theme }) => theme.space.sm};
  margin-block-start: ${({ theme }) => theme.space.xs};
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const PaginationWrapper = styled.div`
  margin-block-start: ${({ theme }) => theme.space.xl};
`;
