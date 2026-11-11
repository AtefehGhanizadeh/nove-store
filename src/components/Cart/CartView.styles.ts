import styled from 'styled-components';

export const Page = styled.div`
  padding-block: ${({ theme }) => theme.space.lg};
`;

export const Heading = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-block-end: ${({ theme }) => theme.space.lg};
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};

  svg {
    width: 28px;
    height: 28px;
  }
`;

/** Rows and summary stack on small screens; side by side from 1024px. */
export const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 1fr) 340px;
    align-items: start;
  }
`;

export const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

export const LoadingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;
