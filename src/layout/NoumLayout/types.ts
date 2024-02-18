import { type Dispatch, type SetStateAction } from 'react';
import { type CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';

export type LayoutProps = {
  header?: JSX.Element;
  isEditing?: boolean;
  hasSideBar?: boolean;
  leftSidebar?: JSX.Element;
  children: JSX.Element | JSX.Element[];
  isCustomPreview?: boolean;
  hasThemePanel?: boolean;
  selectedCustomPreviewTab?: CustomPreviewTabEnum;
  setSelectedCPreviewTab?: Dispatch<SetStateAction<CustomPreviewTabEnum>>;
  isStickyContainer?: boolean;
};
