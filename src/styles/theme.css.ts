import { createVar, globalStyle } from '@vanilla-extract/css';

export const uiVars = {
  color: {
    background: createVar(),
    backgroundAccent: createVar(),
    tileBackground: createVar(),
    panel: createVar(),
    panelStrong: createVar(),
    panelMuted: createVar(),
    panelHover: createVar(),
    border: createVar(),
    text: createVar(),
    mutedText: createVar(),
    accent: createVar(),
    accentMuted: createVar(),
    accentText: createVar(),
    success: createVar(),
    successMuted: createVar(),
    warning: createVar(),
    warningMuted: createVar(),
    danger: createVar(),
    dangerMuted: createVar(),
    dangerBorder: createVar(),
    shadow: createVar(),
    scrollbarThumb: createVar(),
    scrollbarThumbHover: createVar(),
  },
  controlSize: {
    sm: {
      minHeight: createVar(),
      padding: createVar(),
      fontSize: createVar(),
    },
    md: {
      minHeight: createVar(),
      padding: createVar(),
      fontSize: createVar(),
    },
    lg: {
      minHeight: createVar(),
      padding: createVar(),
      fontSize: createVar(),
    },
  },
};

export const fonts = {
  body: '"Space Grotesk", "Avenir Next", "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", "SFMono-Regular", monospace',
};

export const radii = {
  sm: '14px',
  md: '22px',
  lg: '30px',
  pill: '999px',
};

export const buttonTokens = {
  overlayBackground: 'rgba(0, 0, 0, 0.5)',
  overlayHover: 'rgba(0, 0, 0, 0.75)',
  overlayText: '#fff',
  iconSize: 18,
  splitWidth: '4.5rem',
  caretWidth: '1.45rem',
  paddingInline: '0.85rem',
  countWidth: '3ch',
  gap: '0.5rem',
  menuGap: '0.375rem',
  menuPadding: '0.75rem',
  disabledOpacity: 0.55,
};

const darkThemeVars = {
  [uiVars.color.background]: '#000000',
  [uiVars.color.backgroundAccent]: '#000000',
  [uiVars.color.tileBackground]: '#25262e',
  [uiVars.color.panel]: 'rgba(16, 16, 18, 0.72)',
  [uiVars.color.panelStrong]: 'rgba(24, 24, 28, 0.88)',
  [uiVars.color.panelMuted]: 'rgba(255, 255, 255, 0.08)',
  [uiVars.color.panelHover]: 'rgba(255, 255, 255, 0.15)',
  [uiVars.color.border]: 'rgba(255, 255, 255, 0.14)',
  [uiVars.color.text]: '#ffffff',
  [uiVars.color.mutedText]: 'rgba(255, 255, 255, 0.72)',
  [uiVars.color.accent]: '#0b5cff',
  [uiVars.color.accentMuted]: 'rgba(11, 92, 255, 0.18)',
  [uiVars.color.accentText]: '#ffffff',
  [uiVars.color.success]: '#00f0a5',
  [uiVars.color.successMuted]: 'rgba(32, 197, 143, 0.15)',
  [uiVars.color.warning]: '#ffcb63',
  [uiVars.color.warningMuted]: 'rgba(255, 196, 79, 0.15)',
  [uiVars.color.danger]: '#ff5d78',
  [uiVars.color.dangerMuted]: 'rgba(255, 107, 107, 0.14)',
  [uiVars.color.dangerBorder]: 'rgba(255, 107, 107, 0.38)',
  [uiVars.color.shadow]: 'rgba(0, 0, 0, 0.42)',
  [uiVars.color.scrollbarThumb]: 'rgba(255, 255, 255, 0.24)',
  [uiVars.color.scrollbarThumbHover]: 'rgba(255, 255, 255, 0.42)',
};

const lightThemeVars = {
  [uiVars.color.background]: '#f4f6fb',
  [uiVars.color.backgroundAccent]: '#eef2f9',
  [uiVars.color.tileBackground]: '#4b4d55',
  [uiVars.color.panel]: 'rgba(255, 255, 255, 0.84)',
  [uiVars.color.panelStrong]: 'rgba(255, 255, 255, 0.96)',
  [uiVars.color.panelMuted]: 'rgba(12, 18, 28, 0.06)',
  [uiVars.color.panelHover]: 'rgba(12, 18, 28, 0.12)',
  [uiVars.color.border]: 'rgba(16, 22, 33, 0.08)',
  [uiVars.color.text]: '#111827',
  [uiVars.color.mutedText]: '#475569',
  [uiVars.color.accent]: '#0b5cff',
  [uiVars.color.accentMuted]: 'rgba(11, 92, 255, 0.12)',
  [uiVars.color.accentText]: '#ffffff',
  [uiVars.color.success]: '#0f9f74',
  [uiVars.color.successMuted]: 'rgba(15, 159, 116, 0.12)',
  [uiVars.color.warning]: '#b7791f',
  [uiVars.color.warningMuted]: 'rgba(183, 121, 31, 0.12)',
  [uiVars.color.danger]: '#db3558',
  [uiVars.color.dangerMuted]: 'rgba(219, 53, 88, 0.10)',
  [uiVars.color.dangerBorder]: 'rgba(219, 53, 88, 0.34)',
  [uiVars.color.shadow]: 'rgba(15, 23, 42, 0.14)',
  [uiVars.color.scrollbarThumb]: 'rgba(15, 23, 42, 0.22)',
  [uiVars.color.scrollbarThumbHover]: 'rgba(15, 23, 42, 0.38)',
};

const controlSizeVars = {
  [uiVars.controlSize.sm.minHeight]: '2.45rem',
  [uiVars.controlSize.sm.padding]: `0 ${buttonTokens.paddingInline}`,
  [uiVars.controlSize.sm.fontSize]: '0.88rem',
  [uiVars.controlSize.md.minHeight]: '3.2rem',
  [uiVars.controlSize.md.padding]: '0 1.15rem',
  [uiVars.controlSize.md.fontSize]: '0.95rem',
  [uiVars.controlSize.lg.minHeight]: '3.6rem',
  [uiVars.controlSize.lg.padding]: '0 1.35rem',
  [uiVars.controlSize.lg.fontSize]: '1rem',
};

// Dark-theme defaults so portal content (Radix Popover/Dialog) outside any
// themed surface still resolves CSS variables correctly.
globalStyle(':root', { vars: { ...darkThemeVars, ...controlSizeVars } });

// Theme rules are global so any element with data-theme (the shell, portaled
// popovers/dialogs, etc.) picks up the cascade without re-declaring vars.
globalStyle('[data-theme="dark"]', { vars: darkThemeVars });
globalStyle('[data-theme="light"]', { vars: lightThemeVars });

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('button, input, textarea, select', {
  font: 'inherit',
});
