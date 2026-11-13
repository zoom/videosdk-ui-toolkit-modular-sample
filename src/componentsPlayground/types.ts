import type { CSSProperties } from 'react';
import type { ColorScheme, SessionComponentId, ViewportPreset } from '@/playgroundDefinitions';

export interface ComponentStyleValues {
  width: number;
  height: number;
  backgroundColor: string;
  color: string;
}

export type ComponentEditorKey = string;
export type ComponentEditorValue = string | number | boolean;
export type ComponentStyleOverrides = Partial<ComponentStyleValues>;
export type ComponentOverrides = ComponentStyleOverrides & Record<string, ComponentEditorValue | undefined>;
export type ComponentEditorValues = ComponentStyleValues & ComponentOverrides;
export type ComponentStyleDefaultMap = Partial<Record<SessionComponentId, ComponentStyleValues>>;
export type ComponentOverrideMap = Partial<Record<SessionComponentId, ComponentOverrides>>;
export type CopyableSessionComponentId = Exclude<SessionComponentId, 'session-info' | 'settings'>;

interface ComponentEditorFieldBase {
  key: string;
  label: string;
  prop?: string;
  styleProperty?: keyof CSSProperties;
}

export type ComponentEditorField = ComponentEditorFieldBase &
  (
    | { control: 'number'; min: number; step?: number | 'any' }
    | { control: 'color' }
    | {
        control: 'toggle';
        options: readonly {
          value: string;
          label: string;
          ariaLabel: string;
          propValue?: ComponentEditorValue;
          codeValue?: string;
        }[];
      }
    | { control: 'checkbox' }
  );

export interface ComponentEditorGroup {
  title?: string;
  fields: readonly ComponentEditorField[];
  styleTarget?: {
    prop: string;
    path?: string;
    typeName: string;
    defaultClassName: string;
  };
}

export interface ComponentEditorProp {
  value: ComponentEditorValue | CSSProperties | Record<string, CSSProperties>;
  codeValue?: string;
  typeName?: string;
}

export interface ComponentsPlaygroundProps {
  colorScheme: ColorScheme;
  viewportPreset: ViewportPreset;
  selectedComponentIds: SessionComponentId[];
  onColorSchemeChange: (colorScheme: ColorScheme) => void;
  onViewportPresetChange: (viewportPreset: ViewportPreset) => void;
}

export type CssVarStyles = CSSProperties & Record<string, string>;
export type ComponentOverrideChangeHandler = (key: ComponentEditorKey, value: ComponentEditorValue) => void;
