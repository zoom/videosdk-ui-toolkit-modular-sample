import { useState } from 'react';
import { ConnectionState } from '@zoom/videosdk-ui-toolkit';
import { useZoomUIToolkit } from '@zoom/videosdk-ui-toolkit';
import { page } from '@/Viewport.css';
import { AppPlayground } from '@/AppPlayground';
import { PreJoinScreen } from '@/PreJoinScreen';
import { ComponentsPlayground } from '@/ComponentsPlayground';
import {
  defaultSelectedComponentIds,
  type ColorScheme,
  type PlaygroundMode,
  type ViewportPreset,
  type SessionComponentId,
} from '@/playgroundDefinitions';

interface ViewportProps {
  colorScheme: ColorScheme;
  onColorSchemeChange: (colorScheme: ColorScheme) => void;
}

export function Viewport({ colorScheme, onColorSchemeChange }: ViewportProps) {
  const { sessionState } = useZoomUIToolkit();
  const [playgroundMode, setPlaygroundMode] = useState<PlaygroundMode>('components');
  const [viewportPreset, setViewportPreset] = useState<ViewportPreset>('desktop');
  const [selectedComponentIds, setSelectedComponentIds] = useState<SessionComponentId[]>(defaultSelectedComponentIds);
  const [isJoining, setIsJoining] = useState(false);
  // The SDK can emit Connected before join() resolves and media controls are ready.
  const isConnected = sessionState.connectionState === ConnectionState.Connected && !isJoining;

  function toggleComponent(id: SessionComponentId) {
    setSelectedComponentIds((currentIds) =>
      currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [...currentIds, id],
    );
  }

  return (
    <div className={page} data-theme={colorScheme}>
      {isConnected ? (
        playgroundMode === 'components' ? (
          <ComponentsPlayground
            colorScheme={colorScheme}
            viewportPreset={viewportPreset}
            selectedComponentIds={selectedComponentIds}
            onColorSchemeChange={onColorSchemeChange}
            onViewportPresetChange={setViewportPreset}
          />
        ) : (
          <AppPlayground colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange} />
        )
      ) : (
        <PreJoinScreen
          isJoining={isJoining}
          onJoiningChange={setIsJoining}
          colorScheme={colorScheme}
          playgroundMode={playgroundMode}
          selectedComponentIds={selectedComponentIds}
          onColorSchemeChange={onColorSchemeChange}
          onPlaygroundModeChange={setPlaygroundMode}
          onToggleComponent={toggleComponent}
        />
      )}
    </div>
  );
}
