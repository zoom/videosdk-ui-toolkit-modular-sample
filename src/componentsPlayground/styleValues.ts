import type { CSSProperties } from 'react';
import { getSessionComponentDefinition, type ColorScheme, type SessionComponentId } from '@/playgroundDefinitions';
import type { ComponentStyleOverrides, ComponentStyleValues, CssVarStyles } from '@/componentsPlayground/types';

const stylePropertyOrder: (keyof ComponentStyleValues)[] = ['width', 'height', 'backgroundColor', 'color'];

export function getDefaultStyleValues(id: SessionComponentId, colorScheme: ColorScheme): ComponentStyleValues {
  const definition = getSessionComponentDefinition(id);

  return definition.defaultStyles[colorScheme];
}

export function getResolvedStyleValues(
  id: SessionComponentId,
  overrides: ComponentStyleOverrides | undefined,
  colorScheme: ColorScheme,
  defaults: ComponentStyleValues | undefined,
): ComponentStyleValues {
  const defaultValues = defaults ?? getDefaultStyleValues(id, colorScheme);

  return {
    width: overrides?.width ?? defaultValues.width,
    height: overrides?.height ?? defaultValues.height,
    backgroundColor: overrides?.backgroundColor ?? defaultValues.backgroundColor,
    color: overrides?.color ?? defaultValues.color,
  };
}

export function getCssVars(values: ComponentStyleValues): CssVarStyles {
  return {
    '--dev-width': `${values.width}px`,
    '--dev-height': `${values.height}px`,
  };
}

export function getPreviewStyles(values: ComponentStyleOverrides | undefined): CSSProperties | undefined {
  if (!values) {
    return undefined;
  }

  const styles: CSSProperties = {};

  if (values.width !== undefined) styles.width = values.width;
  if (values.height !== undefined) styles.height = values.height;
  if (values.backgroundColor !== undefined) styles.backgroundColor = values.backgroundColor;
  if (values.color !== undefined) styles.color = values.color;

  return Object.keys(styles).length > 0 ? styles : undefined;
}

export function hasStyleOverrides(overrides: ComponentStyleOverrides | undefined) {
  return stylePropertyOrder.some((property) => overrides?.[property] !== undefined);
}

export function formatStyleValue(value: ComponentStyleValues[keyof ComponentStyleValues]): string {
  if (typeof value === 'number') {
    return String(value);
  }

  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

export function areStyleValuesEqual(a: ComponentStyleValues | undefined, b: ComponentStyleValues): boolean {
  return (
    a?.width === b.width && a?.height === b.height && a?.backgroundColor === b.backgroundColor && a?.color === b.color
  );
}
