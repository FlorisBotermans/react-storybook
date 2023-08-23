// Fake Window object for server-side rendering in ReactJS.NET

export {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let globalThis: {
  window: unknown;
};

if (typeof globalThis.window === 'undefined') {
  globalThis.window = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    requestAnimationFrame: () => 0, // Fake requestAnimationFrame for useSprint
    location: {
      search: ''
    }
  };
}