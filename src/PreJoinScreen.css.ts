import { keyframes, style } from '@vanilla-extract/css';
import { touchInputTypography } from '@/styles/shared.css';
import { playgroundVars } from '@/playgroundTheme.css';
import { buttonTokens, uiVars } from '@/styles/theme.css';

export const prejoinStage = style({
  minHeight: '100vh',
  padding: '18px 30px',
  display: 'grid',
  alignItems: 'start',
  '@media': {
    'screen and (max-width: 920px)': {
      padding: '14px',
    },
  },
});

export const prejoinPanel = style({
  width: '100%',
  minWidth: 0,
  maxWidth: '1440px',
  minHeight: 0,
  margin: '0 auto',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: '12px',
});

export const prejoinChrome = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  minHeight: '44px',
  gap: '12px',
  minWidth: 0,
  padding: '0 4px',
  '@media': {
    'screen and (max-width: 720px)': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto auto',
      justifyItems: 'center',
      gap: '8px',
    },
  },
});

export const prejoinToolbar = style({
  justifySelf: 'end',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '10px',
  minWidth: 0,
  '@media': {
    'screen and (max-width: 720px)': {
      width: '100%',
      justifySelf: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },
});

export const prejoinTitle = style({
  margin: 0,
  minWidth: 0,
  textAlign: 'left',
  fontSize: '1.1rem',
  lineHeight: 1.2,
  letterSpacing: 0,
  '@media': {
    'screen and (max-width: 720px)': {
      textAlign: 'center',
    },
  },
});

export const prejoinContent = style({
  width: 'min(100%, 440px)',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  justifyContent: 'center',
  alignContent: 'start',
  alignItems: 'stretch',
  overflow: 'hidden',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 16,
  background: playgroundVars.color.surfaceRaised,
  boxShadow: `0 4px 16px ${uiVars.color.shadow}`,
  selectors: {
    '&[data-mode="components"]': {
      width: '100%',
      gridTemplateColumns: 'minmax(280px, 1fr) minmax(0, 2fr)',
      justifyContent: 'stretch',
    },
  },
  '@media': {
    'screen and (max-width: 920px)': {
      selectors: {
        '&[data-mode="components"]': {
          gridTemplateColumns: 'minmax(250px, 0.85fr) minmax(0, 1.4fr)',
        },
      },
    },
    'screen and (max-width: 720px)': {
      width: '100%',
      selectors: {
        '&[data-mode="components"]': {
          gridTemplateColumns: 'minmax(0, 1fr)',
        },
      },
    },
  },
});

export const prejoinCard = style({
  width: '100%',
  padding: '24px',
  selectors: {
    '& + &': {
      borderLeft: `1px solid ${uiVars.color.border}`,
    },
  },
  '@media': {
    'screen and (max-width: 720px)': {
      padding: '18px',
      selectors: {
        '& + &': {
          borderTop: `1px solid ${uiVars.color.border}`,
          borderLeft: 0,
        },
      },
    },
  },
});

export const formBody = style({
  display: 'grid',
  gap: '18px',
  marginTop: '16px',
});

export const fieldGrid = style({
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
  display: 'grid',
  gap: '12px',
});

export const fieldLabel = style({
  display: 'grid',
  gap: '7px',
  color: uiVars.color.mutedText,
  fontSize: '0.78rem',
  fontWeight: 800,
});

const fieldBorderRadius = 8;
const fieldHeight = 44;

const inputBase = style([
  touchInputTypography,
  {
    width: '100%',
    minHeight: fieldHeight,
    padding: '0 12px',
    border: `1px solid ${uiVars.color.border}`,
    borderRadius: fieldBorderRadius,
    background: uiVars.color.panelMuted,
    color: uiVars.color.text,
    outline: 'none',
    transition: 'border-color 120ms ease, box-shadow 120ms ease, background 120ms ease',
    selectors: {
      '&:focus': {
        borderColor: uiVars.color.accent,
        boxShadow: `0 0 0 3px ${uiVars.color.accentMuted}`,
        background: uiVars.color.panel,
      },
      '&::placeholder': {
        color: uiVars.color.mutedText,
        opacity: 0.7,
      },
    },
  },
]);

export const textInput = inputBase;

export const selectTrigger = style({
  height: fieldHeight,
  borderRadius: fieldBorderRadius,
});

export const componentPicker = style({
  display: 'grid',
  gap: '14px',
});

export const pickerTitle = style({
  margin: 0,
  fontSize: '0.94rem',
  lineHeight: 1.2,
});

export const pickerDescription = style({
  margin: '6px 0 0',
  color: uiVars.color.mutedText,
  fontSize: '0.78rem',
  lineHeight: 1.45,
});

export const componentOptions = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '10px',
  '@media': {
    'screen and (max-width: 720px)': {
      gap: '8px',
    },
  },
});

export const componentOption = style({
  display: 'grid',
  gridTemplateColumns: '44px minmax(0, 1fr) 28px',
  alignItems: 'center',
  gap: '8px',
  minWidth: 0,
  minHeight: '58px',
  padding: '6px',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 10,
  background: uiVars.color.panelMuted,
  color: uiVars.color.text,
  cursor: 'pointer',
  transition: 'border-color 140ms ease, background 140ms ease, box-shadow 140ms ease',
  selectors: {
    '&:hover': {
      borderColor: uiVars.color.accent,
    },
    '&:has(input:focus-visible)': {
      borderColor: uiVars.color.accent,
      boxShadow: `0 0 0 3px ${uiVars.color.accentMuted}`,
    },
  },
  '@media': {
    'screen and (max-width: 720px)': {
      gridTemplateColumns: '32px minmax(0, 1fr) 22px',
      gap: '5px',
      padding: '4px',
    },
  },
});

export const optionIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  justifySelf: 'center',
  width: '32px',
  height: '32px',
  borderRadius: 8,
  background: uiVars.color.accent,
  color: uiVars.color.accentText,
  '@media': {
    'screen and (max-width: 720px)': {
      width: '28px',
      height: '28px',
    },
  },
});

export const optionText = style({
  display: 'grid',
  alignItems: 'center',
  gap: '2px',
  minWidth: 0,
});

export const optionName = style({
  fontSize: '0.88rem',
  fontWeight: 800,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 720px)': {
      fontSize: '0.72rem',
      lineHeight: 1.15,
      overflow: 'visible',
      textOverflow: 'clip',
      whiteSpace: 'normal',
    },
  },
});

export const optionCheckIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  justifySelf: 'center',
  width: '24px',
  height: '24px',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 8,
  background: uiVars.color.panel,
  color: 'transparent',
  transition: 'border-color 140ms ease, background 140ms ease, color 140ms ease',
  selectors: {
    '[data-selected="true"] &': {
      borderColor: uiVars.color.accent,
      background: uiVars.color.accent,
      color: uiVars.color.accentText,
    },
  },
  '@media': {
    'screen and (max-width: 720px)': {
      width: '20px',
      height: '20px',
    },
  },
});

// Mirrors the toolkit's JoinButton (accent, full-width control button); the sample joins with its own button
// because the JWT is requested from the auth endpoint on click.
export const joinButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: buttonTokens.gap,
  width: '100%',
  minHeight: '48px',
  padding: '0 1.15rem',
  border: `1px solid ${uiVars.color.accent}`,
  borderRadius: 8,
  background: uiVars.color.accent,
  color: uiVars.color.accentText,
  boxShadow: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 700,
  transition: 'background 180ms ease, border-color 180ms ease, opacity 180ms ease',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${uiVars.color.accent}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: 0.55,
      cursor: 'not-allowed',
      filter: 'saturate(0.72)',
    },
    '&:not(:disabled):hover': {
      background: uiVars.color.accent,
      filter: 'brightness(1.04)',
    },
    '&:not(:disabled):active': {
      background: uiVars.color.accent,
      filter: 'brightness(0.94)',
    },
  },
});

export const joinButtonIcon = style({
  flexShrink: 0,
});

const spin = keyframes({ from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } });

export const joinButtonSpinner = style([joinButtonIcon, { animation: `${spin} 1s linear infinite` }]);

export const joinError = style({
  padding: '10px 14px',
  border: `1px solid ${uiVars.color.dangerBorder}`,
  borderRadius: 8,
  background: '#f8d7df',
  color: '#861b36',
  fontSize: 13,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  selectors: {
    '[data-theme="dark"] &': {
      background: '#4b1726',
      color: '#ffd9df',
    },
  },
});
