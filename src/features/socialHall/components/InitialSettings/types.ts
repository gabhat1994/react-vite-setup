import { type Dispatch, type SetStateAction } from 'react';
import type React from 'react';
import { type DropdownValueType } from '@/components/Dropdown';
import { type Icons } from '@/components/Icon/Icon';
import { type ConnectedDevices } from '@/screens/SocialHall/types';
import {
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
} from '@/facade/agora';

type InitialSettingsProps = {
  onCompleted: () => void;
};

export type MediaContentProps = InitialSettingsProps & {
  onLeave: () => void;
  showLoader: boolean;
};

export type MediaAllConnectedDevices = {
  [k in keyof ConnectedDevices]: DropdownValueType<string>[];
};

export type Track =
  | MediaStreamTrack
  | ICameraVideoTrack
  | IMicrophoneAudioTrack;

export type EqualizerProps = {
  deviceId: string;
  setTracks: Dispatch<SetStateAction<Track[]>>;
};

export type AvailableMediaSelectionProps = {
  isMuteAudio?: boolean;
  isMuteVideo?: boolean;
  setTracks: Dispatch<SetStateAction<Track[]>>;
  onVideoDeviceChange: (deviceId: string) => void;
  allConnectedDevices: MediaAllConnectedDevices | undefined;
};

export type MediaDropdownProps = {
  disabled?: boolean;
  emptyText: string;
  selectedId: string;
  children?: React.ReactNode;
  prefixIcon: keyof typeof Icons;
  options: DropdownValueType<string>[];
  onSelect: (item: string) => void;
};

export type MediaControlButtonProps = {
  muteAudio: boolean;
  muteVideo: boolean;
  isLoading: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  hasAudioPermission: boolean;
  hasVideoPermission: boolean;
};
