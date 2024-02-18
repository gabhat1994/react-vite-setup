import { type ReactNode } from 'react';
import { type Maybe } from 'yup/lib/types';

export type NoumAdsModalProps = {
  isOpen: boolean;
  campaignId?: string;
  onClose: () => void;
  refetchSpaceById?: () => void;
};

export type NoumAdsConfigType = {
  enableNoumAds: boolean;
  slug: Maybe<string>;
  keyWords: string[];
};

export type URLSettingsProps = {
  url: string;
  isSlugAvailable: boolean;
  isSlugChecked: boolean;
  loading: boolean;
  showInfoBox: boolean;
  showInfoState: boolean;
  updateUrl: (val: string) => void;
  updateInfoBoxState: (val: boolean) => void;
};
export type KeywordSettingsProps = {
  suggestions: string[];
  selectedKeywords: string[];
  onAdd: (keyword: string) => void;
  onRemove: (keyword: string) => void;
};

export type SettingsCardProps = {
  title: string;
  content: ReactNode;
};

export type EnabledViewProps = KeywordSettingsProps &
  URLSettingsProps & {
    isMobile: boolean;
    toggleValue: boolean;
    handleToggle: (toggle: boolean) => void;
  };

export type DisableConfirmationProps = {
  isMobile: boolean;
  url: string;
};

export type EnableDisableActionProps = {
  hideCancelButton: boolean;
  disableActionButton: boolean;
  loading: boolean;
  onSave: () => void;
  onClose: () => void;
};
export type DisableActionProps = {
  onDisable: () => void;
  onClose: () => void;
};
