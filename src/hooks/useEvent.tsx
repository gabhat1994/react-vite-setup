import { useCallback, useLayoutEffect, useRef } from 'react';

const useEvent = <T extends (...args: never[]) => unknown>(handler: T) => {
  const handlerRef = useRef<T>();

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback(
    (...args) => handlerRef?.current?.(...(args as unknown as never[])),
    [],
  );
};

export default useEvent;
