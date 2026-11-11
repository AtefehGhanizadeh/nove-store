import styled from 'styled-components';
import { ArrowIcon } from '@/assets/Icons';

export const Section = styled.section`
  padding-block-start: ${({ theme }) => theme.space.md};

  ${({ theme }) => theme.media.md} {
    padding-block-start: ${({ theme }) => theme.space.lg};
  }
`;

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-muted) 100%);
  border: 1px solid var(--color-border);
  overflow: hidden;

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }) => `${theme.space.xl} ${theme.space.xxl}`};
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.sm};
`;

export const Title = styled.h1`
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  line-height: 1.3;

  ${({ theme }) => theme.media.lg} {
    font-size: ${({ theme }) => theme.fontSize.display};
  }
`;

export const Subtitle = styled.p`
  margin-block-end: ${({ theme }) => theme.space.xs};
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.md};

  ${({ theme }) => theme.media.lg} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const ForwardArrow = styled(ArrowIcon)`
  width: 18px;
  height: 18px;

  [dir='rtl'] & {
    transform: scaleX(-1);
  }
`;

export const Media = styled.div`
  flex: 1.1;
  min-width: 0;

  img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`;
