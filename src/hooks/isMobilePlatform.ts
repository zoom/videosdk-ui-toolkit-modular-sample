export function isMobilePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return true;
  // iPadOS 13+ sends a desktop UA but has touch points
  if (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1) return true;
  return false;
}
