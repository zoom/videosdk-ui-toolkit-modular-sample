import { memo, useCallback } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import type { ColorScheme, SessionComponentDefinition, SessionComponentId } from '@/playgroundDefinitions';
import {
  customizeButton,
  customizeIcon,
  header,
  previewViewport,
  previewSlot,
  row,
  title,
} from '@/componentsPlayground/ComponentRow.css';
import { ComponentPreview } from '@/componentsPlayground/ComponentPreview';
import { getCssVars, getResolvedStyleValues } from '@/componentsPlayground/styleValues';
import type { ComponentOverrides, ComponentStyleValues } from '@/componentsPlayground/types';

interface ComponentRowProps {
  definition: SessionComponentDefinition;
  colorScheme: ColorScheme;
  defaultValues: ComponentStyleValues | undefined;
  overrides: ComponentOverrides | undefined;
  isMobile: boolean;
  isEditorSelected: boolean;
  onToggleEditor: (id: SessionComponentId) => void;
  onSlotRef: (id: SessionComponentId, element: HTMLElement | null) => void;
}

export const ComponentRow = memo(function ComponentRow({
  definition,
  colorScheme,
  defaultValues,
  overrides,
  isMobile,
  isEditorSelected,
  onToggleEditor,
  onSlotRef,
}: ComponentRowProps) {
  const styleValues = getResolvedStyleValues(definition.id, overrides, colorScheme, defaultValues);
  const setSlotRef = useCallback(
    (element: HTMLElement | null) => onSlotRef(definition.id, element),
    [definition.id, onSlotRef],
  );
  const preview = (
    <ComponentPreview definition={definition} styleValues={styleValues} overrides={overrides} isMobile={isMobile} />
  );

  return (
    <section
      className={row}
      data-component-id={definition.id}
      data-grid-span={definition.gridSpan}
      data-selected={isEditorSelected ? 'true' : 'false'}
    >
      <div className={header}>
        <button
          className={customizeButton}
          type='button'
          aria-label={isEditorSelected ? `Close ${definition.name} style controls` : `Edit ${definition.name} styles`}
          aria-pressed={isEditorSelected}
          aria-expanded={isEditorSelected}
          title={isEditorSelected ? `Close ${definition.name} style controls` : `Edit ${definition.name} styles`}
          onClick={() => onToggleEditor(definition.id)}
        >
          <span className={title}>{definition.name}</span>
          <span className={customizeIcon} aria-hidden='true'>
            <SlidersHorizontal size={14} />
          </span>
        </button>
      </div>

      <div className={previewViewport}>
        <section
          className={previewSlot}
          ref={setSlotRef}
          style={getCssVars(styleValues)}
          aria-label={`${definition.name} editor target`}
        >
          {preview}
        </section>
      </div>
    </section>
  );
});
