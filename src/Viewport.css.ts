import { style } from '@vanilla-extract/css';
import { playgroundVars } from '@/playgroundTheme.css';
import { uiVars } from '@/styles/theme.css';

const lightThemeVars = {
  [uiVars.color.background]: '#eef0f4',
  [playgroundVars.color.surfaceContainer]: '#f7f8fb',
  [playgroundVars.color.surfaceRaised]: '#ffffff',
  [uiVars.color.panel]: '#ffffff',
  [uiVars.color.panelStrong]: '#f7f8fb',
  [uiVars.color.panelMuted]: '#edf0f5',
  [uiVars.color.border]: 'rgba(25, 31, 42, 0.22)',
  [uiVars.color.text]: '#151922',
  [uiVars.color.mutedText]: '#626c7c',
  [uiVars.color.accent]: '#2563eb',
  [uiVars.color.accentMuted]: 'rgba(37, 99, 235, 0.14)',
  [uiVars.color.accentText]: '#ffffff',
  [uiVars.color.success]: '#0f9f74',
  [uiVars.color.warning]: '#a16207',
  [uiVars.color.danger]: '#dc315a',
  [uiVars.color.shadow]: 'rgba(25, 31, 42, 0.14)',
};

const darkThemeVars = {
  [uiVars.color.background]: '#101217',
  [playgroundVars.color.surfaceContainer]: '#1f232c',
  [playgroundVars.color.surfaceRaised]: '#2a2f3a',
  [uiVars.color.panel]: '#1f232c',
  [uiVars.color.panelStrong]: '#2a2f3a',
  [uiVars.color.panelMuted]: 'rgba(255, 255, 255, 0.08)',
  [uiVars.color.border]: 'rgba(255, 255, 255, 0.18)',
  [uiVars.color.text]: '#f8fafc',
  [uiVars.color.mutedText]: 'rgba(248, 250, 252, 0.68)',
  [uiVars.color.accent]: '#38bdf8',
  [uiVars.color.accentMuted]: 'rgba(56, 189, 248, 0.16)',
  [uiVars.color.accentText]: '#07111f',
  [uiVars.color.success]: '#34d399',
  [uiVars.color.warning]: '#fbbf24',
  [uiVars.color.danger]: '#fb7185',
  [uiVars.color.shadow]: 'rgba(0, 0, 0, 0.38)',
};

export const page = style({
  minHeight: '100vh',
  color: uiVars.color.text,
  backgroundColor: uiVars.color.background,
  backgroundImage: `radial-gradient(circle at 1px 1px, ${uiVars.color.border} 1px, transparent 0)`,
  backgroundSize: '20px 20px',
  vars: lightThemeVars,
  selectors: {
    '&[data-theme="dark"]': {
      vars: darkThemeVars,
    },
  },
});
