import { useId, useLayoutEffect, useState } from 'react';
import { useTheme } from '@zoom/videosdk-ui-toolkit';
import { readEditorStyleDefaults } from '@/componentsPlayground/editorValues';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, Copy, RotateCcw } from 'lucide-react';
import type { SessionComponentDefinition } from '@/playgroundDefinitions';
import { segmentedButton, segmentedControl } from '@/SegmentedControl.css';
import { getColorInputValue } from '@/componentsPlayground/colorUtils';
import { NumericStyleInput } from '@/componentsPlayground/NumericStyleInput';
import {
  actionButton,
  checkbox,
  checkboxLabel,
  colorInputGroup,
  colorSwatch,
  editor,
  fieldGroup,
  fieldLabel,
  header,
  headerActions,
  segmentedControl as editorSegmentedControl,
  textInput,
  title,
} from '@/componentsPlayground/ComponentEditor.css';
import type {
  ComponentEditorField,
  ComponentEditorValues,
  ComponentOverrideChangeHandler,
  ComponentOverrides,
} from '@/componentsPlayground/types';

interface ComponentEditorProps {
  definition: SessionComponentDefinition;
  values: ComponentEditorValues;
  onChange: ComponentOverrideChangeHandler;
  onReset: () => void;
  onCopy?: () => void;
  isCopied: boolean;
}

function EditorField({
  field,
  values,
  defaults,
  onChange,
}: {
  field: ComponentEditorField;
  values: ComponentEditorValues;
  defaults: ComponentOverrides;
  onChange: ComponentOverrideChangeHandler;
}) {
  const inputId = useId();
  const label = field.label;

  if (field.control === 'number') {
    return (
      <NumericStyleInput
        label={label}
        min={field.min}
        step={field.step}
        value={(values[field.key] ?? defaults[field.key] ?? field.min) as number}
        onChange={(value) => onChange(field.key, value)}
      />
    );
  }

  if (field.control === 'color') {
    const value = (values[field.key] ?? defaults[field.key] ?? '') as string;

    return (
      <div className={fieldLabel}>
        <label htmlFor={inputId}>{label}</label>
        <span className={colorInputGroup}>
          <input
            id={inputId}
            className={textInput}
            value={value}
            onChange={(event) => onChange(field.key, event.target.value)}
            onBlur={() => {
              if (!value.trim()) onChange(field.key, defaults[field.key] ?? '');
            }}
          />
          <input
            className={colorSwatch}
            type='color'
            value={getColorInputValue(value)}
            onChange={(event) => onChange(field.key, event.target.value)}
            aria-label={`${label} picker`}
          />
        </span>
      </div>
    );
  }

  if (field.control === 'toggle') {
    return (
      <label className={fieldLabel}>
        {label}
        <ToggleGroup.Root
          className={`${segmentedControl} ${editorSegmentedControl}`}
          style={{ gridTemplateColumns: `repeat(${field.options.length}, minmax(0, 1fr))` }}
          type='single'
          value={values[field.key] as string}
          onValueChange={(value) => {
            const option = field.options.find((candidate) => candidate.value === value);
            if (option) {
              onChange(field.key, option.value);
            }
          }}
          aria-label={label}
        >
          {field.options.map((option) => (
            <ToggleGroup.Item
              key={option.value}
              className={segmentedButton}
              value={option.value}
              aria-label={option.ariaLabel}
            >
              {option.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </label>
    );
  }

  return (
    <label className={checkboxLabel}>
      <input
        className={checkbox}
        type='checkbox'
        checked={values[field.key] as boolean}
        onChange={(event) => onChange(field.key, event.target.checked)}
      />
      {label}
    </label>
  );
}

export function ComponentEditor({ definition, values, onChange, onReset, onCopy, isCopied }: ComponentEditorProps) {
  const editorId = useId();
  const theme = useTheme();
  const [defaults, setDefaults] = useState<ComponentOverrides>({});

  useLayoutEffect(() => {
    setDefaults(readEditorStyleDefaults(definition, theme));
  }, [definition, theme]);

  return (
    <div className={editor}>
      <div className={header}>
        <h2 className={title}>{definition.name}</h2>
        <div className={headerActions}>
          <button
            className={actionButton}
            type='button'
            title='Reset styles'
            aria-label={`Reset ${definition.name} styles`}
            onClick={onReset}
          >
            <RotateCcw size={14} />
          </button>
          {onCopy ? (
            <button
              className={actionButton}
              type='button'
              title='Copy component code'
              aria-label={`Copy ${definition.name} component code`}
              onClick={onCopy}
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          ) : null}
        </div>
      </div>

      {definition.editorGroups.map((group, groupIndex) => (
        <section
          key={`${definition.id}-${groupIndex}`}
          className={fieldGroup}
          aria-labelledby={group.title ? `${editorId}-${groupIndex}` : undefined}
        >
          {group.title ? (
            <h3 id={`${editorId}-${groupIndex}`} className={title}>
              {group.title}
            </h3>
          ) : null}
          {group.fields.map((field) => (
            <EditorField key={field.key} field={field} values={values} defaults={defaults} onChange={onChange} />
          ))}
        </section>
      ))}
    </div>
  );
}
