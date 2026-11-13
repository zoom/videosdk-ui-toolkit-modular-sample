import { style } from '@vanilla-extract/css';

export const stage = style({
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

export const header = style({
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

export const toolbar = style({
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

export const title = style({
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
