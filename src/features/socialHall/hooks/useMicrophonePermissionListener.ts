import { useEffect, useState } from 'react';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';

type CustomPermissionDescriptor = PermissionDescriptor & {
  name: (PermissionName & 'camera') | 'microphone';
};

export const useMicrophonePermissionListener = (): [
  boolean,
  PermissionState | null,
] => {
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [hasAudioPermission, setAudioPermission] = useState(true);

  useEffect(() => {
    const checkAudioPermission = async () => {
      try {
        const audioPermissionStatus = await navigator.permissions.query({
          name: 'microphone',
        } as CustomPermissionDescriptor);
        audioPermissionStatus.addEventListener('change', () => {
          if (audioPermissionStatus.state === 'granted') {
            setAudioPermission(true);
          }
          if (audioPermissionStatus.state === 'denied') {
            setAudioPermission(false);
          }
          setPermission(audioPermissionStatus.state);
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
      }
    };

    checkAudioPermission();
  }, []);

  useEffect(() => {
    const checkMediaPermissions = async () => {
      const permissions =
        await SocialHallMediaUtils.hasRequiredMediaPermissions();
      setAudioPermission(permissions.audio);
      setPermission(permissions.audio ? 'granted' : 'denied');
    };
    checkMediaPermissions();
  }, []);

  return [hasAudioPermission, permission];
};
