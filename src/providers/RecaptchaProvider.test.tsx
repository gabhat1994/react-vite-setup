import { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';
import { RecaptchaContext, RecaptchaProvider } from '@/providers';
import { render, cleanup, waitFor, fireEvent } from '@/test-utils';
import { Button } from '@/components/Button';

describe('RecaptchaProvider', () => {
  afterEach(() => {
    cleanup();
  });
  it('should refresh the token', async () => {
    window.grecaptcha = {
      execute: () => Promise.resolve('1234Token'),
    };
    vi.spyOn(window.grecaptcha, 'execute').mockImplementationOnce(() =>
      Promise.reject(new Error('Something went wrong')),
    );
    const { getByTestId, getByText } = render(
      <RecaptchaProvider siteKey="asdfasfsasfasf">
        <RecaptchaContext.Consumer>
          {(value) => (
            <>
              <span data-testid="token">{value.token}</span>
              <Button data-testid="refresh" onClick={value.refresh} />
            </>
          )}
        </RecaptchaContext.Consumer>
      </RecaptchaProvider>,
    );
    const {
      result: {
        current: { refresh },
      },
    } = renderHook(() => useContext(RecaptchaContext));
    act(() => {
      refresh();
      fireEvent.click(getByTestId('refresh'));
    });

    await waitFor(() => {
      expect(getByText('1234Token')).toBeTruthy();
      expect(getByTestId('token')).toBeTruthy();
    });
  });

  it('should do returnNewReCaptcha', async () => {
    window.grecaptcha = {
      execute: () => Promise.resolve('newToken1234'),
    };
    const { getByTestId, getByText } = render(
      <RecaptchaProvider>
        <RecaptchaContext.Consumer>
          {(value) => (
            <>
              <span data-testid="newtoken">{value.token}</span>
              <Button
                data-testid="returnNewReCaptcha"
                onClick={value.returnNewReCaptcha}
              />
            </>
          )}
        </RecaptchaContext.Consumer>
      </RecaptchaProvider>,
    );
    const {
      result: {
        current: { returnNewReCaptcha },
      },
    } = renderHook(() => useContext(RecaptchaContext));

    act(() => {
      returnNewReCaptcha();
      fireEvent.click(getByTestId('returnNewReCaptcha'));
    });

    await waitFor(() => {
      expect(getByText('newToken1234')).toBeTruthy();
      expect(getByTestId('newtoken')).toBeTruthy();
    });
  });
});
