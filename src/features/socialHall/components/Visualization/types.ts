import { type Maybe } from '@/apollo/generated/types';

type SocialHallChildrenData = {
  id: string;
  radius: number;
  gutterSpace: number;
  title?: string;
  subTitle?: string;
  background?: string | null;
  chamberId?: Maybe<string>;
};

export type SocialHallData = {
  id: string;
  radius: number;
  children: Array<SocialHallChildrenData>;
  title?: string;
  subTitle?: string;
  xCoords?: number;
  yCoords?: number;
};

export type SocialHallOutput = {
  width: number;
  height: number;
  particles: Array<SocialHallParticle>;
};

export type ScreenDimensions = {
  width: number;
  height: number;
};

export type IncreaseByPercentage = number | ScreenDimensions;

export type SocialHallVizProps = {
  data: SocialHallData[];
  minWidth: number;
  minHeight: number;
  showLabel?: boolean;
  topPadding?: number;
  bottomPadding?: number;
  cache?: SocialHallOutput;
  maxCollisionCheckCount?: number;
  increaseByPercentage?: IncreaseByPercentage;
  onMemberPressed?: (
    selectedChild: ICirclePacking,
    parent: SocialHallParticle,
  ) => void;
};

type LabelCoords = {
  titleYCoords?: number;
  titleXCoords?: number;
  headingXCoords?: number;
  headingYCoords?: number;
  titleWidth?: number;
  headingWidth?: number;
};

export type ICirclePacking = SocialHallChildrenData & Coords & LabelCoords;

export type Coords = {
  xCoords: number;
  yCoords: number;
};

export type SocialHallParticle = Coords & {
  id: string;
  children: Array<ICirclePacking>;
  radius: number;
  title?: string;
  subTitle?: string;
  groupCoords?: Array<{ x: number; y: number }>;
  arcCoords?: Array<{ x: number; y: number }>;
  moreChildren: number;
};
