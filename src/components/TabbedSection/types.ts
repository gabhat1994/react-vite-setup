import { type ReactNode, type CSSProperties as ReactCSSProperties } from 'react';
import { type CSSProperties } from 'styled-components';
import { type TProps } from '../Typography/Typography';

export interface TabbedSectionTabType<TabId = string> {
  id: TabId;
  title: string;
  disabled?: boolean;
}

export type TabbedSectionFont = Extract<
  TProps['font'],
  'body-xl' | 'heading-m'
>;

export type TabbedSectionProps<TabId> = {
  children?: ReactNode;
  tabs: TabbedSectionTabType<TabId>[];
  activeTab?: TabId;
  onTabChange: (value: TabbedSectionTabType<TabId>) => void;
  tabsWrapperStyles?: ReactCSSProperties;
  rightElement?: ReactNode;
  isTicketHistory?: boolean;
  tabType?: 'button' | 'tab';
  className?: string;
  tabCSS?: CSSProperties;
  font?: TabbedSectionFont;
};
