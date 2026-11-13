import { style } from '@vanilla-extract/css';
import { uiVars } from '@/styles/theme.css';

export const messageBubble = style({
  borderRadius: 10,
  background: uiVars.color.panelMuted,
  color: uiVars.color.text,
});

export const selfBubble = style({
  background: uiVars.color.accentMuted,
});
