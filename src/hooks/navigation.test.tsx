import { act, renderHook } from '@testing-library/react-hooks';
import { type InitialEntry } from 'history';
import { MemoryRouter, useLocation } from 'react-router';
import { useNavigateBack, useNavigateWithOrigin } from './navigation';

describe('useNavigateWithOrigin', () => {
  function useHookWithLocation() {
    const location = useLocation();
    const navigateWithOrigin = useNavigateWithOrigin();

    return { location, ...navigateWithOrigin };
  }

  function setupHook({ initialEntries }: { initialEntries: InitialEntry[] }) {
    return renderHook(useHookWithLocation, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      ),
    });
  }

  test('Persists the origin URL through multiple screen transitions', () => {
    const { result } = setupHook({
      initialEntries: [
        { pathname: '/list', search: '?search1=one&search2=two' },
      ],
    });

    act(() => {
      result.current.navigateAndSetOrigin('/details/123');
    });
    expect(result.current.location).toMatchObject({
      pathname: '/details/123',
      search: '',
      state: {
        origin: '/list?search1=one&search2=two',
      },
    });

    act(() => {
      result.current.navigateAndPassOrigin('/edit/123');
    });
    expect(result.current.location).toMatchObject({
      pathname: '/edit/123',
      search: '',
      state: {
        origin: '/list?search1=one&search2=two',
      },
    });

    act(() => {
      result.current.goBackToOrigin();
    });
    expect(result.current.location).toMatchObject({
      pathname: '/list',
      search: '?search1=one&search2=two',
      state: null,
    });
  });

  test('Goes back to whatever URL is set in state.origin', () => {
    const { result } = setupHook({
      initialEntries: [
        { pathname: '/whatever', state: { origin: '/hello-world?name=John' } },
      ],
    });

    act(() => {
      result.current.goBackToOrigin();
    });
    expect(result.current.location).toMatchObject({
      pathname: '/hello-world',
      search: '?name=John',
      state: null,
    });
  });

  test('If there is no state.origin, goes back by one item in history', () => {
    const { result } = setupHook({
      initialEntries: [
        { pathname: '/initial', state: null },
        { pathname: '/whatever', state: null },
      ],
    });

    act(() => {
      result.current.goBackToOrigin();
    });
    expect(result.current.location).toMatchObject({
      pathname: '/initial',
      search: '',
      state: null,
    });
  });

  test('If there is no state.origin but fallbackUrl is provided, goes to fallbackUrl', () => {
    const { result } = setupHook({
      initialEntries: [
        { pathname: '/initial', state: null },
        { pathname: '/whatever', state: null },
      ],
    });

    act(() => {
      result.current.goBackToOrigin({ fallbackUrl: '/fallback-url' });
    });
    expect(result.current.location).toMatchObject({
      pathname: '/fallback-url',
      search: '',
      state: null,
    });
  });
});

describe('useNavigateBack', () => {
  function useHookWithLocation() {
    const location = useLocation();
    const navigateBack = useNavigateBack();

    return { location, navigateBack };
  }

  function setupHook({
    initialEntries,
  }: {
    initialEntries: InitialEntry[] | undefined;
  }) {
    return renderHook(useHookWithLocation, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      ),
    });
  }

  test('If the current page is the first in the history which is owned by our app, then go to the fallback URL', () => {
    const fallbackUrl = '/fallback-url';

    const { result } = setupHook({
      initialEntries: undefined,
    });

    act(() => {
      result.current.navigateBack(-1, { fallback: fallbackUrl });
    });

    expect(result.current.location.pathname).toEqual(fallbackUrl);
  });
  test('If there are any previous pages in the history which are owned by our app, then go back', () => {
    const fallbackUrl = '/fallback-url';

    const { result } = setupHook({
      initialEntries: [{ pathname: '/initial' }, { pathname: '/whatever' }],
    });

    act(() => {
      result.current.navigateBack(-1, { fallback: fallbackUrl });
    });

    expect(result.current.location.pathname).toEqual('/initial');
  });
});
