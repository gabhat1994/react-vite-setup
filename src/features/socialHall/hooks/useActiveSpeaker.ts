import { useEffect, useRef, useState, useCallback } from 'react';
import { type UID } from '@/facade/agora';
import { AGORA_EVENT } from '@/constants/socialHall';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';

export const useActiveSpeaker = () => {
  const { rtcEngine } = useSocialHallCallContext();
  const [activeSpeaker, setActiveSpeaker] = useState<string | UID>('');
  const lastTimeStamp = useRef(0);

  const timeout = useRef<NodeJS.Timer>();

  const checkActiveSpeaker = () => {
    timeout.current = setInterval(() => {
      // We are taking additional 500ms to check if the state was not updated means there is no active user
      if (Date.now() - lastTimeStamp.current > 2000) {
        setActiveSpeaker('');
        clearInterval(timeout.current);
      }
    }, 2000); // Every 2sec the VOLUME_INDICATOR event will be fired
  };

  const onVolumeIndicator = useCallback(
    (volumes: Array<{ level: number; uid: UID }>) => {
      volumes.forEach((volume) => {
        if (volume.level > 5) {
          clearInterval(timeout.current);
          checkActiveSpeaker();
          lastTimeStamp.current = Date.now();
          setActiveSpeaker(volume.uid);
        }
      });
    },
    [],
  );

  useEffect(() => {
    rtcEngine?.on(AGORA_EVENT.VOLUME_INDICATOR, onVolumeIndicator);

    return () => {
      clearInterval(timeout.current);
      rtcEngine?.off(AGORA_EVENT.VOLUME_INDICATOR, onVolumeIndicator);
    };
  }, [rtcEngine, timeout, onVolumeIndicator]);

  return { activeSpeaker };
};

export default useActiveSpeaker;
