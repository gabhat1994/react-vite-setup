import { type VirtualBackgroundEffectOptions } from '@/facade/agoraVirtualBackground';

export interface MediaSettingProps {
  isOpen: boolean;
  onAccept: (arg: string[]) => void;
  handleClose: () => void;
}

export type MediaVirtualBackground = VirtualBackgroundEffectOptions & {
  label: string;
  id: string;
};
