import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { getSessionComponentDefinition, type SessionComponentId } from '@/playgroundDefinitions';
import { copyTextToClipboard } from '@/componentsPlayground/clipboard';
import { getComponentCode, isCopyableSessionComponentId } from '@/componentsPlayground/componentCode';
import type { ComponentOverrideMap } from '@/componentsPlayground/types';
import type { ViewportPreset } from '@/playgroundDefinitions';

interface UseComponentCodeCopyOptions {
  overrides: ComponentOverrideMap;
  viewportPreset: ViewportPreset;
}

export function useComponentCodeCopy({ overrides, viewportPreset }: UseComponentCodeCopyOptions) {
  const [copiedComponentId, setCopiedComponentId] = useState<SessionComponentId | null>(null);
  const copiedStateTimeoutRef = useRef<number | null>(null);
  const copyOptionsRef = useRef({ overrides, viewportPreset });

  useEffect(() => {
    copyOptionsRef.current = { overrides, viewportPreset };
  }, [overrides, viewportPreset]);

  useEffect(() => {
    return () => {
      if (copiedStateTimeoutRef.current !== null) {
        window.clearTimeout(copiedStateTimeoutRef.current);
      }
    };
  }, []);

  const copyComponentCode = useCallback(async (id: SessionComponentId) => {
    if (!isCopyableSessionComponentId(id)) {
      return;
    }

    const { overrides, viewportPreset } = copyOptionsRef.current;
    const definition = getSessionComponentDefinition(id);

    try {
      await copyTextToClipboard(getComponentCode(id, overrides[id], viewportPreset));
      setCopiedComponentId(id);
      toast.success('Code copied', {
        description: `${definition.name} TSX is ready to paste.`,
        duration: 2200,
        position: 'bottom-right',
      });

      if (copiedStateTimeoutRef.current !== null) {
        window.clearTimeout(copiedStateTimeoutRef.current);
      }

      copiedStateTimeoutRef.current = window.setTimeout(() => {
        setCopiedComponentId((currentId) => (currentId === id ? null : currentId));
      }, 1800);
    } catch {
      toast.error('Copy failed', {
        description: `Could not copy ${definition.name} code.`,
        duration: 2200,
        position: 'bottom-right',
      });
    }
  }, []);

  return {
    copiedComponentId,
    copyComponentCode,
  };
}
