import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Monitor, Smartphone } from 'lucide-react';
import { segmentedButton, segmentedControl } from '@/SegmentedControl.css';
import type { ViewportPreset } from '@/playgroundDefinitions';

interface ViewportPresetControlProps {
  viewportPreset: ViewportPreset;
  onViewportPresetChange: (viewportPreset: ViewportPreset) => void;
}

export function ViewportPresetControl({ viewportPreset, onViewportPresetChange }: ViewportPresetControlProps) {
  return (
    <ToggleGroup.Root
      className={segmentedControl}
      type='single'
      value={viewportPreset}
      onValueChange={(value) => {
        if (value === 'desktop' || value === 'mobile') {
          onViewportPresetChange(value);
        }
      }}
      aria-label='Viewport preset'
    >
      <ToggleGroup.Item className={segmentedButton} value='desktop' aria-label='Use desktop viewport preset'>
        <Monitor size={14} />
        Desktop
      </ToggleGroup.Item>
      <ToggleGroup.Item className={segmentedButton} value='mobile' aria-label='Use mobile viewport preset'>
        <Smartphone size={14} />
        Mobile
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
