import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface UseModalManagerOptions {
  resetModalKey?: boolean;
}

export function useModalManager<T extends string, C = unknown>({
  resetModalKey = false,
}: UseModalManagerOptions = {}) {
  const [modalType, setModalType] = useState<T | null>(null);
  const [contextData, setContextData] = useState<C | null>(null);
  const [modalKeySuffix, setModalKeySuffix] = useState<string | null>(null);

  const openModal = useCallback(
    (type: T, data?: C) => {
      setModalType(type);
      setContextData(data ?? null);
      setModalKeySuffix(resetModalKey ? `-${uuid()}` : null);
    },
    [resetModalKey],
  );

  const closeModal = useCallback(() => {
    setModalType(null);
    setContextData(null);
  }, []);

  const toggleModal = useCallback(
    (type: T, data?: C) => {
      if (modalType === type) {
        closeModal();
      } else {
        openModal(type, data);
      }
    },
    [closeModal, modalType, openModal],
  );

  const getModalKey = useCallback(
    (type: T) => `${type}${modalKeySuffix}`,
    [modalKeySuffix],
  );

  return {
    modalType,
    contextData,
    openModal,
    closeModal,
    toggleModal,
    getModalKey,
  };
}

export type ModalManagerResult<T extends string, C = unknown> = ReturnType<
  typeof useModalManager<T, C>
>;
