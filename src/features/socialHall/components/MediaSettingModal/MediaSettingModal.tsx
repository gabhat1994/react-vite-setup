import { useCallback, useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';
import { type MediaDeviceLabel } from '@/screens/SocialHall/types';
import { useMediaDeviceUpdated } from '@/features/socialHall/hooks';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';
import { MediaVirtualBackgroundOption } from './MediaVirtualBackgroundOption';
import { MediaSettingOption } from './MediaSettingOption';
import { type MediaSettingProps, type MediaVirtualBackground } from './types';
import { MiniContainer, ModalSubHeading } from './styles';

export const MediaSettingModal: React.FC<MediaSettingProps> = ({
  isOpen,
  handleClose,
}) => {
  const { t } = useTranslation();
  const {
    deviceId,
    setVirtualBackground,
    virtualBackground,
    videoPermissionState,
    audioPermissionState,
  } = useSocialHallContext();
  const { onChangeDevice } = useSocialHallCallContext();
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedVirtualBackground, setSelectVirtualBackground] =
    useState<MediaVirtualBackground | null>(virtualBackground);
  const [selectedMicrophone, setSelectedMicrophone] = useState('');
  const [audioMediaDevices, setAudioMediaDevices] = useState<
    MediaDeviceLabel[]
  >([]);
  const [videoMediaDevices, setVideoMediaDevices] = useState<
    MediaDeviceLabel[]
  >([]);

  const handleAccept = useCallback(() => {
    setVirtualBackground(selectedVirtualBackground);
    onChangeDevice({
      camera: selectedCamera ?? '',
      microphone: selectedMicrophone ?? '',
      speaker: deviceId?.speaker ?? '',
    });
    handleClose();
  }, [
    handleClose,
    selectedCamera,
    onChangeDevice,
    deviceId?.speaker,
    selectedMicrophone,
    setVirtualBackground,
    selectedVirtualBackground,
  ]);

  const handleSetMediaDevices = useCallback(async () => {
    const inputDevices = await SocialHallMediaUtils.getAllConnectedMedia();

    if (inputDevices?.audioDevices) {
      setAudioMediaDevices(inputDevices.audioDevices);
    }
    if (inputDevices?.cameraDevices) {
      setVideoMediaDevices(inputDevices.cameraDevices);
    }
  }, []);

  const virtualBackgrounds = useMemo(
    () => SocialHallMediaUtils.getAllVirtualBackground(),
    [],
  );

  useEffect(() => {
    if (isOpen && (videoPermissionState || audioPermissionState)) {
      handleSetMediaDevices();
    }
  }, [
    isOpen,
    handleSetMediaDevices,
    videoPermissionState,
    audioPermissionState,
  ]);

  useEffect(() => {
    if (deviceId?.camera !== selectedCamera) {
      setSelectedCamera(deviceId?.camera ?? '');
    }
    if (deviceId?.microphone !== selectedMicrophone) {
      setSelectedMicrophone(deviceId?.microphone ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  useMediaDeviceUpdated(handleSetMediaDevices);

  return (
    <Modal
      testId="media-setting-modal"
      open={isOpen}
      onClose={handleClose}
      enableCloseButton
      size={ModalSize.M}
      disableBackdropClick
    >
      <ModalHeader>{t('noumena.settings')}</ModalHeader>
      <ModalBody>
        <MiniContainer>
          <ModalSubHeading>
            <TSpan font="body-m-bold">
              {t('noumena.social_hall.media_settings.select(microphone)')}
            </TSpan>
          </ModalSubHeading>
          {audioMediaDevices.map((device) => (
            <MediaSettingOption
              device={device}
              onCheck={setSelectedMicrophone}
              key={device.deviceId}
              selected={device.deviceId === selectedMicrophone}
            />
          ))}
        </MiniContainer>
        <Spacer height={18} />
        <MiniContainer>
          <ModalSubHeading>
            <TSpan font="body-m-bold">
              {t('noumena.social_hall.media_settings.select(camera)')}
            </TSpan>
          </ModalSubHeading>
          {videoMediaDevices.map((device) => (
            <MediaSettingOption
              device={device}
              onCheck={setSelectedCamera}
              key={device.deviceId}
              selected={device.deviceId === selectedCamera}
            />
          ))}
        </MiniContainer>
        <Spacer height={18} />
        <MiniContainer>
          <ModalSubHeading>
            <TSpan font="body-m-bold">
              {t(
                'noumena.social_hall.media_settings.select(camera_background)',
              )}
            </TSpan>
          </ModalSubHeading>
          {virtualBackgrounds.map((background) => (
            <MediaVirtualBackgroundOption
              key={background.id}
              onCheck={(bg) => setSelectVirtualBackground(bg)}
              selected={selectedVirtualBackground?.id === background.id}
              {...background}
            />
          ))}
        </MiniContainer>
      </ModalBody>
      <ModalFooter>
        <Button
          data-testid="cancel_button"
          tertiary
          size="full"
          onClick={handleAccept}
        >
          {t('noumena.socialhall.media_control_btn_ok')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
