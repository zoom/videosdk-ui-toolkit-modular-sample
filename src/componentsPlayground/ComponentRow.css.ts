import { style } from '@vanilla-extract/css';
import { playgroundVars } from '@/playgroundTheme.css';
import { uiVars } from '@/styles/theme.css';

export const row = style({
  display: 'grid',
  alignItems: 'start',
  gap: '10px',
  width: 'max-content',
  minWidth: 'min(100%, 220px)',
  maxWidth: '100%',
  flexGrow: 1,
  flexShrink: 0,
  overflow: 'hidden',
  padding: '10px',
  border: '1px solid transparent',
  borderRadius: 12,
  background: playgroundVars.color.surfaceRaised,
  transition: 'border-color 140ms ease, background 140ms ease',
  selectors: {
    '&[data-grid-span="4"]': {
      width: '100%',
    },
    '&[data-selected="true"]': {
      borderColor: uiVars.color.accent,
      boxShadow: `0 0 0 2px ${uiVars.color.accentMuted}`,
    },
  },
  '@media': {
    'screen and (max-width: 1400px)': {
      minWidth: 'min(100%, max(220px, calc(50% - 6px)))',
    },
    'screen and (max-width: 720px)': {
      minWidth: 'min(100%, 160px)',
      selectors: {
        '&[data-component-id="session-info"]': {
          width: '100%',
        },
      },
    },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  width: '100%',
  minWidth: 0,
});

export const title = style({
  minWidth: 0,
  overflow: 'hidden',
  color: 'inherit',
  fontSize: '0.9rem',
  fontWeight: 900,
  lineHeight: 1.2,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const customizeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  width: '100%',
  minWidth: 0,
  minHeight: '32px',
  padding: 0,
  border: 0,
  background: 'transparent',
  color: uiVars.color.text,
  cursor: 'pointer',
  textAlign: 'left',
  selectors: {
    '&:hover': {
      color: uiVars.color.accent,
    },
    '&[aria-pressed="true"]': {
      color: uiVars.color.accent,
    },
    '&:focus-visible': {
      outline: `3px solid ${uiVars.color.accent}`,
      outlineOffset: '2px',
      borderRadius: 8,
    },
  },
});

export const customizeIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '18px',
  height: '18px',
  color: 'currentColor',
});

export const previewViewport = style({
  position: 'relative',
  isolation: 'isolate',
  contain: 'paint',
  width: '100%',
  minWidth: 0,
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'thin',
  '@media': {
    'screen and (max-width: 820px)': {
      selectors: {
        [`${row}[data-grid-span="2"] &, ${row}[data-grid-span="4"] &`]: {
          height: '175px',
        },
      },
    },
    'screen and (max-width: 350px)': {
      selectors: {
        [`${row}[data-grid-span="2"] &, ${row}[data-grid-span="4"] &`]: {
          height: '140px',
        },
      },
    },
  },
});

export const previewSlot = style({
  position: 'relative',
  display: 'grid',
  justifyItems: 'start',
  alignItems: 'start',
  width: 'var(--dev-width)',
  minWidth: 'var(--dev-width)',
  transformOrigin: 'top left',
  '@media': {
    'screen and (max-width: 820px)': {
      selectors: {
        [`${row}[data-grid-span="2"] &, ${row}[data-grid-span="4"] &`]: {
          transform: 'scale(0.7)',
        },
        [`${row}[data-component-id="session-info"] &`]: {
          transform: 'scale(0.88)',
        },
      },
    },
    'screen and (max-width: 350px)': {
      selectors: {
        [`${row}[data-grid-span="2"] &, ${row}[data-grid-span="4"] &`]: {
          transform: 'scale(0.56)',
        },
        [`${row}[data-component-id="session-info"] &`]: {
          transform: 'scale(0.75)',
        },
      },
    },
  },
});
