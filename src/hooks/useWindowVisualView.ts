import { useCallback, useState } from 'react';

export const useWindowVisualView = () => {
  const [visualViewport, setVisualViewport] = useState<VisualViewport | null>();
  const [isVirtualKeyboardOpen, setIsVirtualKeyboardOpen] = useState(false);

  const virtualkeyboardHandler = useCallback(() => {
    const viewPort = window.visualViewport;
    if (!viewPort) return;
    setIsVirtualKeyboardOpen(viewPort.offsetTop !== 0);
    setVisualViewport(viewPort);
  }, []);

  window.visualViewport?.addEventListener('resize', virtualkeyboardHandler);
  return { visualViewport, isVirtualKeyboardOpen };
};
