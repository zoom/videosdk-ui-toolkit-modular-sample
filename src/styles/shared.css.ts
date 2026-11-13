import { style, type StyleRule } from '@vanilla-extract/css';
import { uiVars } from '@/styles/theme.css';

// iOS focus zoom uses a 16px threshold, even when the host page reduces the root font size.
export const touchInputTypography = {
  '@media': {
    '(any-pointer: coarse)': {
      fontSize: `max(16px, ${uiVars.controlSize.lg.fontSize})`,
    },
  },
} satisfies StyleRule;

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});
