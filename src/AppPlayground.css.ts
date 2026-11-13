import { style } from '@vanilla-extract/css';
import { uiVars } from '@/styles/theme.css';

export const appStage = style({
  minHeight: '100vh',
  padding: '18px 30px',
  display: 'grid',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  alignItems: 'stretch',
  width: 'min(100% - 60px, 1440px)',
  margin: '0 auto',
  gap: '12px',
  '@media': {
    'screen and (max-width: 920px)': {
      width: '100%',
      padding: '14px',
    },
  },
});

export const appChrome = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  minHeight: '44px',
  gap: '12px',
  '@media': {
    'screen and (max-width: 720px)': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto auto',
      justifyItems: 'center',
      gap: '8px',
    },
  },
});

export const appToolbar = style({
  justifySelf: 'end',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  gap: '10px',
  '@media': {
    'screen and (max-width: 720px)': {
      width: '100%',
      justifySelf: 'center',
      justifyContent: 'center',
    },
  },
});

export const appTitle = style({
  margin: 0,
  minWidth: 0,
  textAlign: 'left',
  fontSize: '1.1rem',
  lineHeight: 1.2,
  '@media': {
    'screen and (max-width: 720px)': {
      textAlign: 'center',
    },
  },
});

export const appPreview = style({
  height: 'clamp(520px, calc(100dvh - 96px), 900px)',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 16,
  overflow: 'auto',
  background: uiVars.color.background,
  boxShadow: `0 4px 16px ${uiVars.color.shadow}`,
  '@media': {
    'screen and (max-width: 720px)': {
      height: 'clamp(520px, calc(100dvh - 132px), 720px)',
    },
  },
});

export const appPreviewMobile = style({
  width: '100%',
  height: '100svh',
  overflow: 'hidden',
  background: uiVars.color.background,
});

export const appSurface = style({
  borderRadius: 0,
});

export const meetingToolbar = style({
  '@media': {
    'screen and (max-width: 720px)': {
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
      maskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
    },
  },
});
