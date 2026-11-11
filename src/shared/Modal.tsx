'use client';

import { useEffect, useId, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { CloseIcon } from '@/assets/Icons';
import IconButton from '@/shared/IconButton';

type ModalVariant = 'dialog' | 'drawer';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  children: ReactNode;
  footer?: ReactNode;
  variant?: ModalVariant;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Backdrop = styled.div<{ $variant: ModalVariant }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  background: var(--color-overlay);

  ${({ $variant }) =>
    $variant === 'dialog'
      ? css`
          align-items: center;
          justify-content: center;
          padding: ${({ theme }) => theme.space.md};
        `
      : css`
          justify-content: flex-start;
        `}
`;

const Panel = styled.div<{ $variant: ModalVariant }>`
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: ${({ theme }) => theme.shadow.raised};

  &:focus {
    outline: none;
  }

  ${({ $variant, theme }) =>
    $variant === 'dialog'
      ? css`
          width: 100%;
          max-width: 440px;
          border-radius: ${theme.radius.lg};
        `
      : css`
          width: min(320px, 85vw);
          height: 100%;
          overflow-y: auto;
        `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-block-end: 1px solid var(--color-border);
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: var(--color-primary);
`;

const Body = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.space.md};
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => `0 ${theme.space.md} ${theme.space.md}`};
`;

function trapFocus(event: KeyboardEvent, container: HTMLElement) {
  const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export default function Modal({
  open,
  onClose,
  title,
  closeLabel,
  children,
  footer,
  variant = 'dialog',
}: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (firstFocusable ?? panel)?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseRef.current();
      } else if (event.key === 'Tab' && panel) {
        trapFocus(event, panel);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  if (!open) return null;

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return createPortal(
    <Backdrop $variant={variant} onClick={handleBackdropClick}>
      <Panel
        ref={panelRef}
        $variant={variant}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <Header>
          <Title id={titleId}>{title}</Title>
          <IconButton onClick={onClose} aria-label={closeLabel}>
            <CloseIcon />
          </IconButton>
        </Header>
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Panel>
    </Backdrop>,
    document.body,
  );
}
