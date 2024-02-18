import {
  Alert,
  type AlertButtonType,
  type AlertProps,
  type AlertType,
} from '@/components/Toast';
import { pTopCenter } from '@/components/Toast/styles';
import { useCallback, useMemo, useState, type FC, type ReactNode } from 'react';
import styled from 'styled-components';
import generate from 'uniqid';
import { ToastContext } from './context';

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  z-index: 2147483647;
  ${pTopCenter}
`;

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [list, setList] = useState<Omit<AlertProps, 'onDismiss'>[]>([]);

  const add = useCallback(
    (
      type: AlertType,
      buttonType: AlertButtonType,
      message: string,
      autoHideDisable?: boolean,
      width?: number,
    ) => {
      const id = generate();
      setList((oldList) => [
        ...oldList,
        {
          id,
          type,
          buttonType,
          message,
          autoHideTime: 3600,
          autoHideDisable,
          width,
        },
      ]);
      return id;
    },
    [],
  );

  const remove = useCallback((id: string) => {
    if (id) {
      setList((prevState) => prevState.filter((e) => e.id !== id));
    } else {
      setList([]);
    }
  }, []);

  const value = useMemo(() => ({ add, remove }), [add, remove]);

  return (
    <ToastContext.Provider value={value}>
      <>
        {children}
        <Container>
          {list.map((item) => (
            <Alert {...item} key={item.id} />
          ))}
        </Container>
      </>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
