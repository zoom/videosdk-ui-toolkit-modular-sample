import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { AppWindow, Component } from 'lucide-react';
import { segmentedButton, segmentedControl } from '@/SegmentedControl.css';
import type { PlaygroundMode } from '@/playgroundDefinitions';

interface PlaygroundModeControlProps {
  playgroundMode: PlaygroundMode;
  onPlaygroundModeChange: (playgroundMode: PlaygroundMode) => void;
}

export function PlaygroundModeControl({ playgroundMode, onPlaygroundModeChange }: PlaygroundModeControlProps) {
  return (
    <ToggleGroup.Root
      className={segmentedControl}
      type='single'
      value={playgroundMode}
      onValueChange={(value) => {
        if (value === 'components' || value === 'app') {
          onPlaygroundModeChange(value);
        }
      }}
      aria-label='Playground mode'
    >
      <ToggleGroup.Item className={segmentedButton} value='components' aria-label='Use components mode'>
        <Component size={14} />
        Components
      </ToggleGroup.Item>
      <ToggleGroup.Item className={segmentedButton} value='app' aria-label='Use app mode'>
        <AppWindow size={14} />
        App
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
