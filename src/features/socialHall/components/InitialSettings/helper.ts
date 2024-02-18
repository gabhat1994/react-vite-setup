import { t } from 'i18next';

import {
  type MediaDeviceId,
  type ConnectedDevices,
  type MediaDeviceLabel,
} from '@/screens/SocialHall/types';
import { isFireFox } from '@/utils/browserDetect';
import { type DropdownValueType } from '@/components/Dropdown';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';

import { type MediaAllConnectedDevices } from './types';

const defaultAsSystemOption = (
  deviceId: string = 'default',
): DropdownValueType<string>[] => [
  {
    type: 'value',
    value: deviceId,
    key: deviceId,
    label: t('noumena.social_hall.default_hardware'),
  },
];

const formatDeviceForDropdown = (
  devices: MediaDeviceLabel[],
): DropdownValueType<string>[] =>
  devices.map((device) => ({
    type: 'value',
    value: device.deviceId,
    key: device.deviceId,
    label: SocialHallMediaUtils.formatDeviceLabel(device.label),
  }));

export const formatAllConnectedDeviceForDropdown = (
  devices: ConnectedDevices,
  deviceId: MediaDeviceId,
): MediaAllConnectedDevices => ({
  audioDevices: formatDeviceForDropdown(devices.audioDevices),
  cameraDevices: formatDeviceForDropdown(devices.cameraDevices),
  speakerDevices: isFireFox()
    ? defaultAsSystemOption(deviceId.speaker)
    : formatDeviceForDropdown(devices.speakerDevices),
});
