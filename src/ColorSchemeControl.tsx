import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Moon, Sun } from 'lucide-react';
import { segmentedButton, segmentedControl } from '@/SegmentedControl.css';
import type { ColorScheme } from '@/playgroundDefinitions';

interface ColorSchemeControlProps {
  colorScheme: ColorScheme;
  onColorSchemeChange: (colorScheme: ColorScheme) => void;
}

export function ColorSchemeControl({ colorScheme, onColorSchemeChange }: ColorSchemeControlProps) {
  return (
    <ToggleGroup.Root
      className={segmentedControl}
      type='single'
      value={colorScheme}
      onValueChange={(value) => {
        if (value === 'light' || value === 'dark') {
          onColorSchemeChange(value);
        }
      }}
      aria-label='Color scheme'
    >
      <ToggleGroup.Item className={segmentedButton} value='light' aria-label='Use light color scheme'>
        <Sun size={14} />
        Light
      </ToggleGroup.Item>
      <ToggleGroup.Item className={segmentedButton} value='dark' aria-label='Use dark color scheme'>
        <Moon size={14} />
        Dark
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
