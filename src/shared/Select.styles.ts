import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.sm};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.button};
  background: var(--color-surface);
`;

export const Label = styled.label`
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
  white-space: nowrap;
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    inset-inline-end: 0;
    width: 16px;
    height: 16px;
    pointer-events: none;
    color: var(--color-text-muted);
  }
`;

export const NativeSelect = styled.select`
  min-height: 40px;
  padding-inline-end: ${({ theme }) => theme.space.lg};
  border: 0;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  appearance: none;
  cursor: pointer;

  option {
    background: var(--color-surface);
    color: var(--color-text);
  }
`;
