import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.md}`};
  border: 1px dashed var(--color-border);
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);
  text-align: center;
`;

export const IconCircle = styled.span`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-block-end: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: var(--color-accent-soft);
  color: var(--color-accent);

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: var(--color-primary);
`;

export const Description = styled.p`
  max-width: 420px;
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const Actions = styled.div`
  margin-block-start: ${({ theme }) => theme.space.sm};
`;
