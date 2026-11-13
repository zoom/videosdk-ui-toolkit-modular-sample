import { useMemo } from 'react';
import {
  componentList,
  editorPanel,
  emptyList,
  previewPanel,
  workspace,
} from '@/componentsPlayground/ComponentsWorkspace.css';
import { ComponentEditor } from '@/componentsPlayground/ComponentEditor';
import { ComponentRow } from '@/componentsPlayground/ComponentRow';
import { isCopyableSessionComponentId } from '@/componentsPlayground/componentCode';
import { EmptyComponentEditor } from '@/componentsPlayground/EmptyComponentEditor';
import { getResolvedEditorValues } from '@/componentsPlayground/editorValues';
import { getResolvedStyleValues } from '@/componentsPlayground/styleValues';
import { useComponentCodeCopy } from '@/componentsPlayground/useComponentCodeCopy';
import { useMeasuredStyleDefaults } from '@/componentsPlayground/useMeasuredStyleDefaults';
import { usePlaygroundEdits } from '@/componentsPlayground/usePlaygroundEdits';
import {
  sessionComponentDefinitions,
  type ColorScheme,
  type SessionComponentId,
  type ViewportPreset,
} from '@/playgroundDefinitions';

interface ComponentsWorkspaceProps {
  colorScheme: ColorScheme;
  viewportPreset: ViewportPreset;
  componentIds: SessionComponentId[];
}

export function ComponentsWorkspace({ colorScheme, viewportPreset, componentIds }: ComponentsWorkspaceProps) {
  const components = useMemo(
    () => sessionComponentDefinitions.filter((definition) => componentIds.includes(definition.id)),
    [componentIds],
  );
  const { editingComponentId, overrides, updateEditingOverride, resetEditingOverrides, toggleEditor } =
    usePlaygroundEdits();
  const { componentStyleDefaults, setComponentSlotRef } = useMeasuredStyleDefaults({
    colorScheme,
    viewportPreset,
    components,
    overrides,
  });
  const { copiedComponentId, copyComponentCode } = useComponentCodeCopy({
    overrides,
    viewportPreset,
  });
  const editingDefinition = editingComponentId
    ? (components.find((definition) => definition.id === editingComponentId) ?? null)
    : null;
  const resolvedValues = editingDefinition
    ? getResolvedEditorValues(
        editingDefinition,
        getResolvedStyleValues(
          editingDefinition.id,
          overrides[editingDefinition.id],
          colorScheme,
          componentStyleDefaults[editingDefinition.id],
        ),
        overrides[editingDefinition.id],
      )
    : null;
  return (
    <div className={workspace}>
      <section className={previewPanel}>
        <div className={componentList}>
          {components.length === 0 ? (
            <div className={emptyList}>No components selected</div>
          ) : (
            components.map((definition) => (
              <ComponentRow
                key={definition.id}
                definition={definition}
                colorScheme={colorScheme}
                defaultValues={componentStyleDefaults[definition.id]}
                overrides={overrides[definition.id]}
                isMobile={viewportPreset === 'mobile'}
                isEditorSelected={editingComponentId === definition.id}
                onToggleEditor={toggleEditor}
                onSlotRef={setComponentSlotRef}
              />
            ))
          )}
        </div>
      </section>

      <aside className={editorPanel} aria-label='Component editor'>
        {editingDefinition && resolvedValues ? (
          <ComponentEditor
            definition={editingDefinition}
            values={resolvedValues}
            onChange={updateEditingOverride}
            onReset={resetEditingOverrides}
            onCopy={
              isCopyableSessionComponentId(editingDefinition.id)
                ? () => copyComponentCode(editingDefinition.id)
                : undefined
            }
            isCopied={copiedComponentId === editingDefinition.id}
          />
        ) : (
          <EmptyComponentEditor />
        )}
      </aside>
    </div>
  );
}
