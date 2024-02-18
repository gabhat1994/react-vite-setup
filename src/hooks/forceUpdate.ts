import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
  const [, updateState] = useState(new Date().getTime());
  const forceUpdate = useCallback(() => updateState(new Date().getTime()), []);

  return forceUpdate;
};
