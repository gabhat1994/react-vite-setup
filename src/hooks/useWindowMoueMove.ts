import { useEffect, useState } from 'react';

export const useWindowMouseMove = (customMouseUp?: () => void) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMousedown = (event: MouseEvent) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    const handleMouseUp = () => {
      customMouseUp?.();
    };
    window.addEventListener('mousedown', handleWindowMousedown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleWindowMousedown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { coords };
};
