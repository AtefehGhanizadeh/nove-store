'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Button } from '@/shared/Button';
import Modal from '@/shared/Modal';

interface ConfirmClearCartModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Message = styled.p`
  color: var(--color-text-muted);
`;

export default function ConfirmClearCartModal({
  open,
  onClose,
  onConfirm,
}: ConfirmClearCartModalProps) {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('confirmTitle')}
      closeLabel={tCommon('close')}
      footer={
        <>
          <Button $variant="secondary" onClick={onClose}>
            {tCommon('cancel')}
          </Button>
          <Button $variant="danger" onClick={onConfirm}>
            {t('confirmAction')}
          </Button>
        </>
      }
    >
      <Message>{t('confirmMessage')}</Message>
    </Modal>
  );
}
