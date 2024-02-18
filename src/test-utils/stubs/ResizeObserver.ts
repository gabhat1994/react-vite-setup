/* eslint-disable class-methods-use-this */
export class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

let originalResizeObserver: typeof window.ResizeObserver | null = null;

export const ResizeObserverMock = {
  ResizeObserver,
  mock() {
    originalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = ResizeObserver;
  },
  restore() {
    if (originalResizeObserver) {
      window.ResizeObserver = originalResizeObserver;
    }
  },
};
