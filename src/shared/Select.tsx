'use client';

import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import { ChevronDownIcon } from '@/assets/Icons';

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  id: string;
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.sm};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.button};
  background: var(--color-surface);
`;

const Label = styled.label`
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
  white-space: nowrap;
`;

const Field = styled.div`
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

const NativeSelect = styled.select`
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

export default function Select<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  disabled,
}: SelectProps<T>) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const selected = options.find((option) => option.value === event.target.value);
    if (selected) onChange(selected.value);
  }

  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Field>
        <NativeSelect id={id} value={value} onChange={handleChange} disabled={disabled}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
        <ChevronDownIcon />
      </Field>
    </Wrapper>
  );
}
