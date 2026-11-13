import type { ColorScheme, SessionComponentId } from '@/playgroundDefinitions';
import { getMeasuredColor } from '@/componentsPlayground/colorUtils';
import { getDefaultStyleValues } from '@/componentsPlayground/styleValues';
import type { ComponentStyleValues } from '@/componentsPlayground/types';

export function getMeasurementTargets(id: SessionComponentId, slotElement: HTMLElement) {
  const firstElement = slotElement.firstElementChild;
  const queryTarget = (selector: string) => slotElement.querySelector(selector);

  if (id === 'participant-view' || id === 'share-viewer-view' || id === 'share-presenter-view') {
    const videoContainer = queryTarget('video-player-container')?.parentElement ?? firstElement;
    return {
      sizeElement: firstElement,
      backgroundElement: videoContainer,
      colorElement: slotElement.querySelector('span') ?? videoContainer,
    };
  }

  if (id === 'audio') {
    const button = queryTarget('[data-testid="toolbar-audio"]');
    return {
      sizeElement: firstElement,
      backgroundElement: button?.parentElement ?? firstElement,
      colorElement: button ?? firstElement,
    };
  }

  if (id === 'share') {
    return {
      sizeElement: firstElement,
      backgroundElement: firstElement,
      colorElement: firstElement,
    };
  }

  const targetSelectorById: Partial<Record<SessionComponentId, string>> = {
    video: '[data-testid="video-button"]',
    participants: '[data-testid="participant-button"]',
    recording: '[data-testid="recording-button"]',
    'end-session': '[data-testid="leave-button"]',
  };
  const target = targetSelectorById[id] ? queryTarget(targetSelectorById[id]) : firstElement;

  return {
    sizeElement: target,
    backgroundElement: target,
    colorElement: target,
  };
}

export function getMeasuredDefaultValues(
  id: SessionComponentId,
  slotElement: HTMLElement,
  colorScheme: ColorScheme,
): ComponentStyleValues {
  const fallbackValues = getDefaultStyleValues(id, colorScheme);
  const { sizeElement, backgroundElement, colorElement } = getMeasurementTargets(id, slotElement);
  const rect = sizeElement?.getBoundingClientRect();
  const layoutWidth = sizeElement instanceof HTMLElement ? sizeElement.offsetWidth : 0;
  const layoutHeight = sizeElement instanceof HTMLElement ? sizeElement.offsetHeight : 0;
  const measuredWidth = layoutWidth || (rect?.width ? Math.round(rect.width) : fallbackValues.width);
  const measuredHeight = layoutHeight || (rect?.height ? Math.round(rect.height) : fallbackValues.height);

  return {
    width: measuredWidth,
    height: measuredHeight,
    backgroundColor: getMeasuredColor(backgroundElement, 'backgroundColor', fallbackValues.backgroundColor),
    color: getMeasuredColor(colorElement, 'color', fallbackValues.color),
  };
}
