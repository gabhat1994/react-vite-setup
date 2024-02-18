import { useCallback, useState } from 'react';

export const useMediaPermissionPopup = () => {
  const [showPermissionPopup, setShowPermissionPopup] = useState<{
    audio: boolean | null;
    video: boolean | null;
  }>({
    audio: null,
    video: null,
  });

  const onTogglePopup = useCallback(
    (type: 'audio' | 'video') => {
      setShowPermissionPopup((permission) => ({
        ...permission,
        [type]: !showPermissionPopup[type],
      }));
    },
    [showPermissionPopup],
  );

  const onBothMediaBlocked = useCallback(() => {
    setShowPermissionPopup({
      audio: true,
      video: true,
    });
  }, []);

  return {
    onTogglePopup,
    onBothMediaBlocked,
    showPermissionPopup,
  };
};
