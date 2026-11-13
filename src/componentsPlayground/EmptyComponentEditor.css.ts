import { style } from '@vanilla-extract/css';
import { uiVars } from '@/styles/theme.css';

export const emptyEditor = style({
  minHeight: '238px',
  display: 'grid',
  placeItems: 'center',
  padding: '24px',
  textAlign: 'center',
  color: uiVars.color.mutedText,
});

export const content = style({
  display: 'grid',
  justifyItems: 'center',
  gap: '12px',
  maxWidth: '190px',
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  border: `1px solid ${uiVars.color.border}`,
  borderRadius: 8,
  background: uiVars.color.panelMuted,
  color: uiVars.color.mutedText,
});

export const description = style({
  margin: 0,
  fontSize: '0.8rem',
  lineHeight: 1.45,
});
