import { noop } from 'lodash';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Buttons } from './styles';
import { type NotificationButtonVariant } from './types';

type LoadingVariant = NotificationButtonVariant | null;
type Callback = () => Promise<void> | void;

interface NotificationButtonsContextValue {
  loadingVariant: LoadingVariant;
  onButtonClick: (
    variant: NotificationButtonVariant,
    callback: Callback | undefined,
  ) => void;
}

export const NotificationButtonsContext =
  React.createContext<NotificationButtonsContextValue>({
    loadingVariant: null,
    onButtonClick: noop,
  });

interface NotificationButtonsProps {
  children: React.ReactNode;
  hideButtonsAfterAction?: boolean;
}

export function NotificationButtons({
  children,
  hideButtonsAfterAction,
}: NotificationButtonsProps) {
  const [loadingVariant, setLoadingVariant] = useState<LoadingVariant>(null);
  const [showButtons, setShowButtons] = useState(true);

  const onButtonClick = useCallback(
    async (
      variant: NotificationButtonVariant,
      callback: Callback | undefined,
    ) => {
      if (!callback) return;

      try {
        setLoadingVariant(variant);
        await callback();
        if (hideButtonsAfterAction) {
          setShowButtons(false);
        }
      } finally {
        setLoadingVariant(null);
      }
    },
    [hideButtonsAfterAction],
  );

  const value = useMemo(
    () => ({
      loadingVariant,
      onButtonClick,
    }),
    [loadingVariant, onButtonClick],
  );

  return (
    <Buttons>
      <NotificationButtonsContext.Provider value={value}>
        {showButtons ? children : null}
      </NotificationButtonsContext.Provider>
    </Buttons>
  );
}

export const useNotificationButton = () =>
  useContext(NotificationButtonsContext);
