import styled from 'styled-components';

export const Section = styled.section`
  margin-block-start: ${({ theme }) => theme.space.xxl};
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.lg};
  background: var(--color-surface-muted);

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.xl};
  }
`;

export const Intro = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

export const MailBadge = styled.span`
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);
  color: var(--color-primary);

  svg {
    width: 26px;
    height: 26px;
  }
`;

export const Title = styled.h2`
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const Description = styled.p`
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const Form = styled.form`
  width: 100%;

  ${({ theme }) => theme.media.md} {
    max-width: 440px;
  }
`;

export const Field = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;

export const Input = styled.input<{ $invalid: boolean }>`
  flex: 1;
  min-width: 0;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ $invalid }) => ($invalid ? 'var(--color-danger)' : 'var(--color-border)')};
  border-radius: ${({ theme }) => theme.radius.button};
  background: var(--color-surface);
  font-size: ${({ theme }) => theme.fontSize.sm};

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

export const ErrorText = styled.p`
  margin-block-start: ${({ theme }) => theme.space.xs};
  color: var(--color-danger);
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const SuccessText = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-block-start: ${({ theme }) => theme.space.xs};
  color: var(--color-success);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  svg {
    width: 18px;
    height: 18px;
  }
`;
