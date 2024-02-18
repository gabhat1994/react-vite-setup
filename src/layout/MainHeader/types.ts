import { type ResultType } from '@/screens/Search/types';
import { type Dispatch, type HTMLAttributes, type SetStateAction } from 'react';

interface IMainHeader {
  /* number of new coins */
  coins?: number;
  /* number of new calendars */
  calendars?: number;
  /* number of new notifications */
  notifications?: number;
  /* number of new messages */
  messages?: number;
  /* link of avatar image */
  avatar?: string;
  /* user name */
  userName?: string;
  /* set search result for search page */
  setSearchResult?: Dispatch<SetStateAction<ResultType | undefined>>;
  /* value for search filter */
  searchFilter?: string;
  /* Displays a menu button (hamburger) and calls the provided callback on click. */
  onMenuButtonClick?(): void;
}

export type MainHeaderProps = HTMLAttributes<HTMLDivElement> & IMainHeader;

export type MainHeaderContainerProps = Omit<
  MainHeaderProps,
  'coins' | 'calendars' | 'notifications' | 'messages'
>;
export type MainHeaderSideModalOpenStatus = 'calendar' | 'notification';
export type MainHeaderEventModalOpenStatus = 'detail' | 'edit';
