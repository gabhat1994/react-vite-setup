import React, { useCallback } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { ToastProvider } from '@/providers';
import { render, cleanup, waitFor, fireEvent } from '@/test-utils';
import { Alert } from '@/components/Toast';
import { Button } from '@/components/Button';
import { useToast } from '@/hooks';
import { useToastContext } from './context';

const Toast = () => {
  const { addToast } = useToast();

  const handleClick = useCallback(() => {
    addToast('error', 'icon', 'Error');
  }, [addToast]);

  return <Button onClick={handleClick} data-testid="fireToast" />;
};

const RToast = () => {
  const { removeToast } = useToast();

  const handleClick = useCallback(() => {
    removeToast('alertID');
  }, [removeToast]);

  return (
    <React.Fragment>
      <Alert
        id="alertID"
        type="error"
        message="error message"
        autoHideTime={5000}
      />
      <Button onClick={handleClick} data-testid="removeToast" />
    </React.Fragment>
  );
};

describe('Toast', () => {
  describe('Toast', () => {
    afterEach(() => {
      cleanup();
    });
    const {
      result: {
        current: { add, remove },
      },
    } = renderHook(() => useToastContext());

    it('add Toast', async () => {
      const { container, queryByTestId, getByTestId } = render(
        <ToastProvider>
          <Toast />
        </ToastProvider>,
      );

      add('error', 'icon', 'some');
      fireEvent.click(getByTestId('fireToast'));

      await waitFor(() => {
        expect(container).toBeTruthy();
        expect(queryByTestId('alert-container')).toBeInTheDocument();
      });
    });
    it('remove Toast', async () => {
      const { container, queryByTestId, getByTestId } = render(
        <ToastProvider>
          <Toast />
          <RToast />
        </ToastProvider>,
      );
      expect(container).toBeTruthy();
      act(() => {
        remove('alertId');
        fireEvent.click(getByTestId('fireToast'));
        fireEvent.click(getByTestId('removeToast'));
      });
      setTimeout(() => {
        expect(queryByTestId('alert-container')).not.toBeInTheDocument();
      }, 5000);
    });
  });
});
