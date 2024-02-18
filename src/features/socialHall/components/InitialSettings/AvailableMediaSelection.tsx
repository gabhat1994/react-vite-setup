import { t } from 'i18next';
import { useCallback } from 'react';

import { useWindowDimensions } from '@/hooks';
import { useSocialHallContext } from '@/providers';
import { breakpoints } from '@/constants/devices';
import { type MediaDeviceId } from '@/screens/SocialHall/types';

import { Equalizer } from './Equalizer';
import { MediaDropdown } from './MediaDropdown';
import { type AvailableMediaSelectionProps } from './types';
import { HardwareControlItem, MediaOptionsWrapper } from './styles';

export const AvailableMediaSelection = ({
  setTracks,
  isMuteAudio,
  allConnectedDevices,
  onVideoDeviceChange,
}: AvailableMediaSelectionProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;

  const { setDeviceId, deviceId } = useSocialHallContext();

  const onSelectMedia = useCallback(
    (device: Partial<MediaDeviceId>) => {
      setDeviceId({ ...deviceId, ...device } as MediaDeviceId);
    },
    [setDeviceId, deviceId],
  );

  const onVideoDeviceChangeHandler = (camera: string) => {
    onVideoDeviceChange(camera);
    onSelectMedia({ camera });
  };

  return (
    <MediaOptionsWrapper>
      <HardwareControlItem>
        <MediaDropdown
          emptyText={t('noumena.social_hall.hardware_testing_mic_not_found')}
          prefixIcon="mic_on_m"
          options={allConnectedDevices?.audioDevices ?? []}
          onSelect={(microphone) => onSelectMedia({ microphone })}
          selectedId={deviceId?.microphone ?? ''}
        >
          {!isMuteAudio && !isMobile && (
            <Equalizer
              setTracks={setTracks}
              deviceId={deviceId?.microphone ?? ''}
            />
          )}
        </MediaDropdown>
      </HardwareControlItem>

      <HardwareControlItem>
        <MediaDropdown
          emptyText={t(
            'noumena.social_hall.hardware_testing_speaker_not_found',
          )}
          prefixIcon="volume_on_m"
          options={allConnectedDevices?.speakerDevices ?? []}
          onSelect={(speaker) => onSelectMedia({ speaker })}
          selectedId={deviceId?.speaker ?? ''}
        />
      </HardwareControlItem>

      <HardwareControlItem>
        <MediaDropdown
          emptyText={t('noumena.social_hall.hardware_testing_camera_not_found')}
          prefixIcon="webcam_on_m"
          options={allConnectedDevices?.cameraDevices ?? []}
          onSelect={onVideoDeviceChangeHandler}
          selectedId={deviceId?.camera ?? ''}
        />
      </HardwareControlItem>
    </MediaOptionsWrapper>
  );
};
