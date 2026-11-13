import { useState, type ChangeEvent } from 'react';
import { input, label as labelClass } from '@/componentsPlayground/NumericStyleInput.css';

interface NumericStyleInputProps {
  label: string;
  min: number;
  step?: number | 'any';
  value: number;
  onChange: (value: number) => void;
}

export function NumericStyleInput({ label, min, step = 1, value, onChange }: NumericStyleInputProps) {
  const [draft, setDraft] = useState({ value, text: String(value) });

  // Keep partially typed numbers, but discard the draft when Reset changes the value.
  if (draft.value !== value) {
    setDraft({ value, text: String(value) });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    const parsed = Number(text);
    const valid =
      text.trim() !== '' &&
      Number.isFinite(parsed) &&
      parsed >= min &&
      (step === 'any' || Number.isInteger(parsed / step));
    setDraft({ value: valid ? parsed : value, text });
    if (valid) onChange(parsed);
  }

  function handleBlur() {
    setDraft({ value, text: String(value) });
  }

  return (
    <label className={labelClass}>
      {label}
      <input
        className={input}
        min={min}
        step={step}
        type='number'
        value={draft.text}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </label>
  );
}
