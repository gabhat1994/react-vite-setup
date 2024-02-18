import { type NetworkStatus } from '@apollo/client';
import { type Event, type Maybe } from '@/apollo/generated/types';
import { type SideModalProps } from '@/components/SideModal/types';
import { type NotificationFragment } from '@/apollo/graphql';

export enum NotificationFilterCategory {
  All = 'All',
  Noums = 'Noums',
  Money = 'Money',
  Community = 'Community',
  Other = 'Other',
}

export interface NotificationsSidebarProps extends SideModalProps {
  onClickEvent: (event?: Maybe<Event>) => void;
  handleTokenNotification?: (notification: NotificationFragment) => void;
}

export interface CategoriesFilterProps {
  items: FilterItem[];
  value: NotificationFilterCategory;
  onChange: (newValue: NotificationFilterCategory) => void;
}

export interface NotificationsListProps {
  notifications: NotificationFragment[];
  totalCount: number;
  networkStatus: NetworkStatus;
  fetchNextPage: () => Promise<void>;
}

export interface NotificationGatewayProps {
  notification: NotificationFragment;
}

export interface SectionTitleProps {
  date: Date;
}

export interface FilterItem {
  label: string;
  value: NotificationFilterCategory;
  unread: boolean;
}

export enum NotificationConnectionStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  INVITED = 'INVITED',
  REMOVED = 'REMOVED',
  ARCHIVED = 'ARCHIVED',
}
