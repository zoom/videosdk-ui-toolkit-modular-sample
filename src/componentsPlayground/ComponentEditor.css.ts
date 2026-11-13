import { style } from '@vanilla-extract/css';
import { touchInputTypography } from '@/styles/shared.css';
import { uiVars } from '@/styles/theme.css';

export const editor = style({
  display: 'grid',
  gap: '18px',
  padding: '18px',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
});

export const headerActions = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
});

export const title = style({
  margin: 0,
  minWidth: 0,
  fontSize: '0.96rem',
  lineHeight: 1.2,
});

export const actionButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '28px',
  height: '28px',
  padding: 0,
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 8,
  background: uiVars.color.panelMuted,
  color: uiVars.color.mutedText,
  cursor: 'pointer',
  transition: 'border-color 140ms ease, background 140ms ease, color 140ms ease',
  selectors: {
    '&:hover': {
      borderColor: uiVars.color.accent,
      background: uiVars.color.panel,
      color: uiVars.color.accent,
    },
    '&:focus-visible': {
      outline: `3px solid ${uiVars.color.accent}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    '(pointer: coarse)': {
      width: '48px',
      height: '48px',
    },
  },
});

export const fieldGroup = style({
  display: 'grid',
  gap: '10px',
});

export const fieldLabel = style({
  display: 'grid',
  gap: '7px',
  color: uiVars.color.mutedText,
  fontSize: '0.76rem',
  fontWeight: 800,
});

export const textInput = style([
  touchInputTypography,
  {
    minHeight: '38px',
    width: '100%',
    padding: '0 10px',
    border: `1px solid ${uiVars.color.border}`,
    borderRadius: 8,
    background: uiVars.color.panelMuted,
    color: uiVars.color.text,
    selectors: {
      '&:focus-visible': {
        borderColor: uiVars.color.accent,
        outline: `2px solid ${uiVars.color.accent}`,
        outlineOffset: '1px',
      },
    },
  },
]);

export const segmentedControl = style({
  width: '100%',
  display: 'grid',
});

export const checkboxLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  minHeight: '38px',
  color: uiVars.color.text,
  fontSize: '0.8rem',
  fontWeight: 800,
});

export const checkbox = style({
  width: '18px',
  height: '18px',
  margin: 0,
  accentColor: uiVars.color.accent,
});

export const colorInputGroup = style({
  display: 'grid',
  gridTemplateColumns: '1fr 54px',
  gap: '8px',
});

export const colorSwatch = style({
  width: '54px',
  height: '38px',
  padding: '3px',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 8,
  background: uiVars.color.panelMuted,
  selectors: {
    '&:focus-visible': {
      borderColor: uiVars.color.accent,
      outline: `2px solid ${uiVars.color.accent}`,
      outlineOffset: '1px',
    },
  },
});
