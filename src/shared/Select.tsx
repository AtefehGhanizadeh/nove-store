'use client';

import type { ChangeEvent } from 'react';

import { ChevronDownIcon } from '@/assets/Icons';
import { Wrapper, Label, Field, NativeSelect } from './Select.styles';
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
