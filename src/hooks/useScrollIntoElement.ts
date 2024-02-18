import { useCallback } from 'react';

function useScrollIntoElement() {
  const scrollIntoElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  }, []);

  return { scrollIntoElement };
}

export default useScrollIntoElement;
