import { useCallback, useState } from 'react';
import { getSessionComponentDefinition, type SessionComponentId } from '@/playgroundDefinitions';
import { isEditorFieldDefault } from '@/componentsPlayground/editorValues';
import type { ComponentEditorKey, ComponentEditorValue, ComponentOverrideMap } from '@/componentsPlayground/types';

export function usePlaygroundEdits() {
  const [editingComponentId, setEditingComponentId] = useState<SessionComponentId | null>(null);
  const [overrides, setOverrides] = useState<ComponentOverrideMap>({});

  const updateEditingOverride = useCallback(
    (key: ComponentEditorKey, value: ComponentEditorValue) => {
      if (!editingComponentId) {
        return;
      }

      const definition = getSessionComponentDefinition(editingComponentId);

      setOverrides((current) => {
        const nextComponentOverrides = { ...current[editingComponentId] };

        if (isEditorFieldDefault(definition, key, value)) {
          delete nextComponentOverrides[key];
        } else {
          nextComponentOverrides[key] = value;
        }

        if (Object.keys(nextComponentOverrides).length === 0) {
          const remaining = { ...current };
          delete remaining[editingComponentId];
          return remaining;
        }

        return {
          ...current,
          [editingComponentId]: nextComponentOverrides,
        };
      });
    },
    [editingComponentId],
  );

  const resetEditingOverrides = useCallback(() => {
    if (!editingComponentId) {
      return;
    }

    setOverrides((current) => {
      const remaining = { ...current };
      delete remaining[editingComponentId];
      return remaining;
    });
  }, [editingComponentId]);

  const toggleEditor = useCallback((id: SessionComponentId) => {
    setEditingComponentId((currentId) => (currentId === id ? null : id));
  }, []);

  return {
    editingComponentId,
    overrides,
    updateEditingOverride,
    resetEditingOverrides,
    toggleEditor,
  };
}
