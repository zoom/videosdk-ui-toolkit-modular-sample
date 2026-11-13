import { style } from '@vanilla-extract/css';
import { playgroundVars } from '@/playgroundTheme.css';
import { uiVars } from '@/styles/theme.css';

export const workspace = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 300px',
  alignItems: 'start',
  gap: '16px',
  minHeight: 'calc(100vh - 96px)',
  '@media': {
    'screen and (max-width: 820px)': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'minmax(0, 1fr) auto',
      minHeight: 0,
    },
  },
});

export const previewPanel = style({
  minHeight: 'calc(100vh - 96px)',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 16,
  background: playgroundVars.color.surfaceContainer,
  boxShadow: `0 4px 16px ${uiVars.color.shadow}`,
  overflow: 'auto',
  '@media': {
    'screen and (max-width: 820px)': {
      minHeight: 'min(320px, 58dvh)',
      maxHeight: 'min(58dvh, 560px)',
    },
  },
});

export const componentList = style({
  width: '100%',
  padding: '14px',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'start',
  gap: '12px',
  '@media': {
    'screen and (max-width: 720px)': {
      padding: '10px',
      gap: '8px',
    },
  },
});

export const emptyList = style({
  width: 'min(100%, 460px)',
  minHeight: '132px',
  display: 'grid',
  placeItems: 'center',
  padding: '20px',
  border: `1px dashed ${uiVars.color.border}`,
  borderRadius: 8,
  background: uiVars.color.panel,
  color: uiVars.color.mutedText,
  fontSize: '0.9rem',
  fontWeight: 800,
});

export const editorPanel = style({
  position: 'sticky',
  top: '18px',
  minHeight: '240px',
  maxHeight: 'calc(100vh - 36px)',
  scrollMarginTop: '14px',
  overflowY: 'auto',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 16,
  background: uiVars.color.panel,
  '@media': {
    'screen and (max-width: 820px)': {
      position: 'static',
      minHeight: '260px',
      maxHeight: 'none',
      overflowY: 'visible',
    },
  },
});
