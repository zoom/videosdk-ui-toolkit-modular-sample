import { style } from '@vanilla-extract/css';
import { touchInputTypography } from '@/styles/shared.css';
import { uiVars } from '@/styles/theme.css';

export const label = style({
  display: 'grid',
  gap: '7px',
  color: uiVars.color.mutedText,
  fontSize: '0.76rem',
  fontWeight: 800,
});

export const input = style([
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
