import { useCallback, useEffect, useEffectEvent, useRef, useState } from 'react';
import type {
  ColorScheme,
  SessionComponentDefinition,
  SessionComponentId,
  ViewportPreset,
} from '@/playgroundDefinitions';
import { getMeasuredDefaultValues, getMeasurementTargets } from '@/componentsPlayground/measurement';
import { areStyleValuesEqual, hasStyleOverrides } from '@/componentsPlayground/styleValues';
import type {
  ComponentOverrideMap,
  ComponentStyleDefaultMap,
  ComponentStyleValues,
} from '@/componentsPlayground/types';

interface UseMeasuredStyleDefaultsOptions {
  colorScheme: ColorScheme;
  viewportPreset: ViewportPreset;
  components: SessionComponentDefinition[];
  overrides: ComponentOverrideMap;
}

export function useMeasuredStyleDefaults({
  colorScheme,
  viewportPreset,
  components,
  overrides,
}: UseMeasuredStyleDefaultsOptions) {
  const [componentStyleDefaults, setComponentStyleDefaults] = useState<ComponentStyleDefaultMap>({});
  const componentSlotRefs = useRef(new Map<SessionComponentId, HTMLElement>());
  const hasCurrentStyleOverrides = useEffectEvent((id: SessionComponentId) => hasStyleOverrides(overrides[id]));

  useEffect(() => {
    let isActive = true;

    function updateMeasuredDefaults() {
      const nextDefaults: ComponentStyleDefaultMap = {};

      for (const definition of components) {
        if (hasCurrentStyleOverrides(definition.id)) continue;

        const slotElement = componentSlotRefs.current.get(definition.id);
        if (!slotElement) continue;

        nextDefaults[definition.id] = getMeasuredDefaultValues(definition.id, slotElement, colorScheme);
      }

      if (Object.keys(nextDefaults).length === 0 || !isActive) {
        return;
      }

      setComponentStyleDefaults((currentDefaults) => {
        let hasChanges = false;
        const mergedDefaults = { ...currentDefaults };

        for (const [id, values] of Object.entries(nextDefaults) as [SessionComponentId, ComponentStyleValues][]) {
          if (!areStyleValuesEqual(currentDefaults[id], values)) {
            mergedDefaults[id] = values;
            hasChanges = true;
          }
        }

        return hasChanges ? mergedDefaults : currentDefaults;
      });
    }

    const updateHandle = window.setTimeout(updateMeasuredDefaults);

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        isActive = false;
        window.clearTimeout(updateHandle);
      };
    }

    const resizeObserver = new ResizeObserver(updateMeasuredDefaults);
    const observedElements = new Set<Element>();
    const transitionElements = new Set<Element>();

    for (const definition of components) {
      const slotElement = componentSlotRefs.current.get(definition.id);
      if (!slotElement) continue;

      const { sizeElement, backgroundElement, colorElement } = getMeasurementTargets(definition.id, slotElement);

      if (sizeElement && !observedElements.has(sizeElement)) {
        resizeObserver.observe(sizeElement);
        observedElements.add(sizeElement);
      }

      for (const element of [backgroundElement, colorElement]) {
        if (element && !transitionElements.has(element)) {
          element.addEventListener('transitionend', updateMeasuredDefaults);
          transitionElements.add(element);
        }
      }
    }

    return () => {
      isActive = false;
      window.clearTimeout(updateHandle);
      resizeObserver.disconnect();
      transitionElements.forEach((element) => element.removeEventListener('transitionend', updateMeasuredDefaults));
    };
  }, [colorScheme, components, viewportPreset]);

  const setComponentSlotRef = useCallback((id: SessionComponentId, element: HTMLElement | null) => {
    if (element) {
      componentSlotRefs.current.set(id, element);
    } else {
      componentSlotRefs.current.delete(id);
    }
  }, []);

  return {
    componentStyleDefaults,
    setComponentSlotRef,
  };
}
