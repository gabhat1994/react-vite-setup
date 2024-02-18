import { type FC, type ReactElement } from 'react';
import { render, type RenderOptions, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

const AllTheProviders: FC = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render, act, renderHook };

// mock file
export const MockFile = (name?: string, size?: number, mimeType?: string) => {
  const mName = name || 'mock.txt';
  const mSize = size || 1024;
  const mMimeType = mimeType || 'plain/txt';

  function range(count: number) {
    let output = '';
    for (let i = 0; i < count; i += 1) {
      output += 'a';
    }
    return output;
  }

  const file = new File([range(mSize)], mName, {
    type: mMimeType,
    lastModified: new Date().getTime(),
  });

  return file;
};

export const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};
