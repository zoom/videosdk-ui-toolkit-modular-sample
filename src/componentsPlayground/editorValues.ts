import type { CSSProperties } from 'react';
import type { ToolkitTheme } from '@zoom/videosdk-ui-toolkit';
import type { SessionComponentDefinition } from '@/playgroundDefinitions';
import type {
  ComponentEditorKey,
  ComponentEditorProp,
  ComponentEditorValue,
  ComponentEditorValues,
  ComponentOverrides,
  ComponentStyleValues,
} from '@/componentsPlayground/types';

export function getResolvedEditorValues(
  definition: SessionComponentDefinition,
  styleValues: ComponentStyleValues,
  overrides: ComponentOverrides | undefined,
): ComponentEditorValues {
  return { ...styleValues, ...definition.editorDefaults, ...overrides };
}

export function isEditorFieldDefault(
  definition: SessionComponentDefinition,
  key: ComponentEditorKey,
  value: ComponentEditorValue,
) {
  return value === definition.editorDefaults?.[key];
}

export function readEditorStyleDefaults(definition: SessionComponentDefinition, theme: ToolkitTheme) {
  const defaults: ComponentOverrides = {};
  if (!definition.editorGroups.some((group) => group.styleTarget)) return defaults;

  // Read portaled components' theme without inheriting the playground shell's colors.
  const probe = document.createElement('span');
  probe.hidden = true;
  probe.dataset.theme = theme;
  document.body.append(probe);

  for (const group of definition.editorGroups) {
    if (!group.styleTarget) continue;
    probe.className = group.styleTarget.defaultClassName;
    const computed = window.getComputedStyle(probe);
    for (const field of group.fields) {
      if (!field.styleProperty) continue;
      const cssProperty = field.styleProperty.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      const value = computed.getPropertyValue(cssProperty);
      if (field.control === 'number') {
        const number = Number.parseFloat(value);
        if (Number.isFinite(number)) defaults[field.key] = number;
      } else {
        defaults[field.key] = value;
      }
    }
  }

  probe.remove();
  return defaults;
}

export function getComponentEditorProps(
  definition: SessionComponentDefinition,
  overrides: ComponentOverrides | undefined,
  includeDefaults = false,
): Record<string, ComponentEditorProp> {
  const values = includeDefaults ? { ...definition.editorDefaults, ...overrides } : overrides;
  const props: Record<string, ComponentEditorProp> = {};

  for (const group of definition.editorGroups) {
    const styles: Record<string, string | number> = {};
    for (const field of group.fields) {
      const value = values?.[field.key];
      if (value === undefined || (!includeDefaults && isEditorFieldDefault(definition, field.key, value))) continue;
      if (field.control === 'number' && (typeof value !== 'number' || !Number.isFinite(value) || value < field.min))
        continue;
      if (field.control === 'color' && (typeof value !== 'string' || !value.trim())) continue;

      if (group.styleTarget && field.styleProperty && typeof value !== 'boolean') {
        styles[field.styleProperty] = typeof value === 'string' ? value.trim() : value;
      } else if (field.prop) {
        const option = field.control === 'toggle' ? field.options.find((option) => option.value === value) : undefined;
        props[field.prop] = { value: option?.propValue ?? value, codeValue: option?.codeValue };
      }
    }

    const target = group.styleTarget;
    if (target && Object.keys(styles).length > 0) {
      if (target.path) {
        const existing = props[target.prop]?.value as Record<string, CSSProperties> | undefined;
        props[target.prop] = {
          value: { ...existing, [target.path]: { ...existing?.[target.path], ...styles } },
          typeName: target.typeName,
        };
      } else {
        const existing = props[target.prop]?.value as CSSProperties | undefined;
        props[target.prop] = { value: { ...existing, ...styles }, typeName: target.typeName };
      }
    }
  }

  return props;
}
