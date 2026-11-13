export function getColorInputValue(value: string): string {
  const formattedColor = formatCssColor(value);

  if (!formattedColor) {
    return '#000000';
  }

  if (formattedColor.startsWith('#')) {
    return formattedColor;
  }

  const match = formattedColor.match(/^rgba?\(([^)]+)\)$/i);
  if (!match) {
    return '#000000';
  }

  const [red, green, blue] = match[1]
    .split(',')
    .map((channel) => channel.trim())
    .map(Number);

  if (![red, green, blue].every(Number.isFinite)) {
    return '#000000';
  }

  return `#${[red, green, blue]
    .map((channel) =>
      Math.max(0, Math.min(255, Math.round(channel)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

function formatCssColor(value: string): string | null {
  const trimmedValue = value.trim();
  const match = trimmedValue.match(/^rgba?\(([^)]+)\)$/i);

  if (!match) {
    return /^#[0-9a-f]{6}$/i.test(trimmedValue) ? trimmedValue : null;
  }

  const channels = match[1]
    .split(',')
    .map((channel) => channel.trim())
    .map(Number);
  const [red, green, blue, alpha = 1] = channels;

  if (![red, green, blue, alpha].every(Number.isFinite) || alpha === 0) {
    return null;
  }

  if (alpha < 1) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  return `#${[red, green, blue]
    .map((channel) =>
      Math.max(0, Math.min(255, Math.round(channel)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

export function getMeasuredColor(
  element: Element | null,
  property: 'backgroundColor' | 'color',
  fallback: string,
): string {
  if (!element || typeof window === 'undefined') {
    return fallback;
  }

  const formattedColor = formatCssColor(window.getComputedStyle(element)[property]);

  return formattedColor ?? fallback;
}
