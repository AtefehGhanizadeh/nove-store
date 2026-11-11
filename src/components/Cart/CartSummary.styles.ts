import styled from 'styled-components';

export const Card = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);
  box-shadow: ${({ theme }) => theme.shadow.card};

  ${({ theme }) => theme.media.lg} {
    position: sticky;
    inset-block-start: calc(
      ${({ theme }) => theme.layout.headerHeight} + ${({ theme }) => theme.space.lg}
    );
  }
`;

export const Title = styled.h2`
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  color: var(--color-text-muted);

  & + & {
    padding-block-start: ${({ theme }) => theme.space.md};
    border-block-start: 1px solid var(--color-border);
  }
`;

export const TotalLabel = styled.span`
  color: var(--color-text);
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Note = styled.p`
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-align: center;
`;
