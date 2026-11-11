import styled from 'styled-components';

export const Row = styled.article`
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr) auto;
  grid-template-areas:
    'image info info'
    'stepper total remove';
  align-items: center;
  gap: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 96px minmax(0, 1fr) auto minmax(110px, auto) auto;
    grid-template-areas: 'image info stepper total remove';
  }
`;

export const ImageBox = styled.div`
  position: relative;
  grid-area: image;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: var(--color-image-bg);
  overflow: hidden;

  img {
    padding: ${({ theme }) => theme.space.xs};
    object-fit: contain;
    mix-blend-mode: multiply;
  }
`;

export const Info = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  min-width: 0;
`;

export const Title = styled.h2`
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.5;
  unicode-bidi: plaintext;
  text-align: start;
`;

export const Meta = styled.p`
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export const StepperArea = styled.div`
  grid-area: stepper;
`;

export const Total = styled.div`
  grid-area: total;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: end;
`;

export const TotalLabel = styled.span`
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export const RemoveArea = styled.div`
  grid-area: remove;
  color: var(--color-danger);

  button {
    color: inherit;
  }
`;
