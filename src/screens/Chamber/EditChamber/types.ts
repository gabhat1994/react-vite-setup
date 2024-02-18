import {
  type NoumLayoutSectionType,
  type NoumLayoutSectionVerticalAlignType,
} from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type HTMLAttributes, type SetStateAction } from 'react';
import { type SectionToolProps } from '../components/SectionElementRearrange/types';

export type EditNoumBodyProps = {
  setNoumSidePanelId: (value: SetStateAction<string | undefined>) => void;
  noumSidePanelId: string | undefined;
  setNoumSidePanelType: (value: SectionToolProps) => void;
};

export type SectionSideBarProps = {
  selectedAlignItem?: {
    id: string;
    alignItem: NoumLayoutSectionVerticalAlignType;
  };
  selectedLayout?: {
    id: string;
    layoutType: NoumLayoutSectionType;
  };
  sectionBackgroud?: {
    id: string;
    background: boolean;
  };
  columnBackground?: {
    id: string;
    background: boolean;
  };
};

export type EditHeaderProps = HTMLAttributes<HTMLDivElement> & {
  /* published date of the chamber */
  publishedDate?: string;
  /* last changed date of the chamber */
  lastChangedDate?: string;
  /* flag if chamber has any unsaved element */
  hasUnsaved?: boolean;
  /* flag if chamber has any unsaved connection permission */
  hasUnsavedPermissions?: boolean;
  /* flag if chamber has any draft element */
  hasDraft?: boolean;
  /* flag if chamber has been published */
  hasPublished?: boolean;
  /* Id of the chamber */
  spaceId: string;
  /* chamber */
  space?: SpaceOutputFragment;
  emptyElementErrorMessage?: string | undefined | null;
  /* callback to parent on chamber restore */
  onChamberRestore?: () => void;
  /* flag if chamber has been restored */
  isRestored?: boolean;
};
