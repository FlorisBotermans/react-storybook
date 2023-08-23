export function supportScrollBehavior(): boolean {
  return 'scrollBehavior' in document.documentElement.style;
}
