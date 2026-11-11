import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);
  box-shadow: ${({ theme }) => theme.shadow.card};
  transition: box-shadow ${({ theme }) => theme.transition};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.raised};
  }
`;

export const ImageBox = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--color-image-bg);

  img {
    padding: ${({ theme }) => theme.space.lg};
    object-fit: contain;
    /* Product photos have white backgrounds; multiply blends them into the grey backdrop. */
    mix-blend-mode: multiply;
  }
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => theme.space.md};
`;

export const CategoryBadge = styled.span`
  align-self: flex-start;
  padding: ${({ theme }) => `2px ${theme.space.sm}`};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: var(--color-surface-muted);
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Title = styled.h3`
  display: -webkit-box;
  min-height: calc(2 * 1.5em);
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.5;
  /* API titles are English; keep their punctuation in LTR order on RTL pages. */
  unicode-bidi: plaintext;
  text-align: start;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  margin-block-start: auto;
`;
