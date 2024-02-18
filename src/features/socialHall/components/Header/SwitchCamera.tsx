import { useEffect, useRef } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';
import { useSocialHallCallContext, useSocialHallContext } from '@/providers';
import { type MediaDeviceLabel } from '@/screens/SocialHall/types';

export const SwitchCamera = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;
  const isTablet = width < breakpoints.TABLET_L;

  const { deviceId } = useSocialHallContext();
  const { onChangeDevice, isCameraEnable } = useSocialHallCallContext();
  const inputDevices = useRef<MediaDeviceLabel[]>([]);

  const onSwitchCamera = () => {
    const unusedCamera = inputDevices.current?.find(
      (camera) => camera.deviceId !== deviceId?.camera,
    );
    onChangeDevice({
      ...deviceId!,
      camera: unusedCamera?.deviceId ?? '',
    });
  };

  useEffect(() => {
    const updateInputDevices = async () => {
      const cameras = (await SocialHallMediaUtils.getAllConnectedMedia())
        .cameraDevices;
      if (cameras) {
        inputDevices.current = cameras;
      }
    };
    updateInputDevices();
  }, []);

  return isMobile || isTablet ? (
    <Button
      size="small"
      onClick={() => onSwitchCamera()}
      disabled={!isCameraEnable}
      icon={<Icon name="flip_camera_m" size={18} />}
    />
  ) : null;
};
