import { useCallback, useState } from 'react';

export const useToggle = (initialState: boolean = false) => {
  const [value, setState] = useState(initialState);

  const toggle = useCallback(() => setState((state) => !state), []);

  return [value, toggle, setState] as const;
};

export default useToggle;
