import { useEffect, useState } from 'react';
import { useWindowDimensions } from './dimensions';

export function useWindowFocus() {
  const [focused, setFocus] = useState(true);

  useEffect(() => {
    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return focused;
}

export default useWindowDimensions;
