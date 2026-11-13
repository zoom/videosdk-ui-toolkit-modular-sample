import { ColorSchemeControl } from '@/ColorSchemeControl';
import { header, stage, title, toolbar } from '@/ComponentsPlayground.css';
import { ViewportPresetControl } from '@/ViewportPresetControl';
import { ComponentsWorkspace } from '@/componentsPlayground/ComponentsWorkspace';
import type { ComponentsPlaygroundProps } from '@/componentsPlayground/types';

export function ComponentsPlayground({
  colorScheme,
  viewportPreset,
  selectedComponentIds,
  onColorSchemeChange,
  onViewportPresetChange,
}: ComponentsPlaygroundProps) {
  return (
    <main className={stage}>
      <header className={header}>
        <h1 className={title}>Video SDK UI Toolkit Official Sample</h1>

        <div className={toolbar}>
          <ColorSchemeControl colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange} />
          <ViewportPresetControl viewportPreset={viewportPreset} onViewportPresetChange={onViewportPresetChange} />
        </div>
      </header>
      <ComponentsWorkspace
        colorScheme={colorScheme}
        viewportPreset={viewportPreset}
        componentIds={selectedComponentIds}
      />
    </main>
  );
}
