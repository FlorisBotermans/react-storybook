globalThis.locale = document.querySelector('html')?.getAttribute('lang') || 'nl';

export function getLocale(): string {
  return globalThis.locale;
}

export function setLocale(locale: string): void {
  globalThis.locale = locale;
}