import { style } from '@vanilla-extract/css';
import { uiVars } from '@/styles/theme.css';

export const segmentedControl = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '4px',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 8,
  background: uiVars.color.panelStrong,
  boxShadow: `0 1px 3px ${uiVars.color.shadow}`,
});

export const segmentedButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  minHeight: '30px',
  padding: '0 12px',
  border: 'none',
  borderRadius: 6,
  background: 'transparent',
  color: uiVars.color.mutedText,
  cursor: 'pointer',
  fontSize: '0.8rem',
  fontWeight: 800,
  selectors: {
    '&:hover': {
      color: uiVars.color.text,
      background: uiVars.color.panelMuted,
    },
    '&:focus-visible': {
      outline: `2px solid ${uiVars.color.accent}`,
      outlineOffset: '2px',
    },
    '&[aria-pressed="true"], &[data-state="on"]': {
      background: uiVars.color.accent,
      color: uiVars.color.accentText,
    },
  },
});
