import { type MouseEventHandler } from 'react';
import { type Maybe, type Scalars } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import {
  type ChamberBoxNameEnum,
  type DiscoveryCategoryEnum,
} from '@/components/ChamberBox/types';

export type CardProps = {
  url: string;
  name: ChamberBoxNameEnum;
  title: string;
  ownedby: string;
  followers: number;
  _id?: Maybe<Scalars['ID']>;
};

export type SliderProps = {
  category: DiscoveryCategoryEnum;
  title: string;
  description?: string;
  route: string;
  loading: boolean;
  cardItems: Maybe<SpaceOutputFragment>[];
  hideShowAllButton?: boolean;
};

export type SliderHeaderProps = {
  /** slider title */
  title: string;
  /** slider description */
  description?: string;
  /** show controls */
  showControls: boolean;
  /** Show All */
  hideShowAllButton?: boolean;
  /** to disable next arrow */
  disableNext: boolean;
  /** to disable previous arrow */
  disablePrev: boolean;
  /** to show tabs of New Noums section */
  showTabs?: boolean;
  /** callback for previous button click */
  goPrevious: () => void;
  /** callback for next button click */
  goNext: () => void;
  /** callback for show all button */
  handleShowAllClick: () => void;
};

export type CarouselSlideProps = {
  /** Card items for Carousel Slide */
  items: Maybe<SpaceOutputFragment>[];
  countPerPage?: number;
  category: DiscoveryCategoryEnum;
};

export type PageInfo = {
  totalPages: number;
  items: Maybe<SpaceOutputFragment>[];
};

export type LabelType = {
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  deviceWidth?: boolean;
  floatLeft?: boolean;
  countPerPage?: number;
  isNotFilledItems?: boolean;
};

export type StepsType = {
  marginRight?: number;
  disabled?: boolean;
};

export type SliderBodyType = {
  flexStart?: boolean;
};

export type MobileSliderProps = {
  items: Maybe<SpaceOutputFragment>[];
  category: DiscoveryCategoryEnum;
};

export interface SliderHeaderControlsProps {
  showControls?: boolean;
  disablePrev: boolean;
  goPrevious: MouseEventHandler;
  disableNext: boolean;
  goNext: MouseEventHandler;
  hideShowAllButton?: boolean;
  handleShowAllClick: MouseEventHandler<HTMLButtonElement>;
}

export interface SliderBodyProps {
  tabLoading?: boolean;
  isMobile: boolean;
  carouselItems?: Maybe<SpaceOutputFragment>[];
  countPerPage: number;
  category: DiscoveryCategoryEnum;
  updateCurrentSlide: (slide: number) => void;
  page: number;
  pageArray?: number[];
  pageItems?: Maybe<SpaceOutputFragment>[][];
}
