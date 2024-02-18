import { useEffect, useState } from 'react';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';

type CustomPermissionDescriptor = PermissionDescriptor & {
  name: (PermissionName & 'camera') | 'microphone';
};

export const useCameraPermissionListener = (): [
  boolean,
  PermissionState | null,
] => {
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [hasVideoPermission, setVideoPermission] = useState(true);

  useEffect(() => {
    const checkVideoPermission = async () => {
      try {
        const videoPermissionStatus = await navigator.permissions.query({
          name: 'camera',
        } as CustomPermissionDescriptor);
        videoPermissionStatus.addEventListener('change', () => {
          setPermission(videoPermissionStatus.state);
          if (videoPermissionStatus.state === 'granted') {
            setVideoPermission(true);
          }
          if (videoPermissionStatus.state === 'denied') {
            setVideoPermission(false);
          }
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
      }
    };
    checkVideoPermission();
  }, []);

  useEffect(() => {
    const checkMediaPermissions = async () => {
      const permissions =
        await SocialHallMediaUtils.hasRequiredMediaPermissions();
      setVideoPermission(permissions.video);
      setPermission(permissions.video ? 'granted' : 'denied');
    };
    checkMediaPermissions();
  }, []);

  return [hasVideoPermission, permission];
};
