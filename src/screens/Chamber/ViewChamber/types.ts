import {
  type ElementOutput,
  type SpaceProfileValue,
} from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';

export interface IChamberContext {
  loading: boolean;
  loadingSpace: boolean;
  space: SpaceOutputFragment | undefined;
  isOwner: boolean;
  editDisabled?: boolean;
  spaceConfig?: (SpaceProfileValue | null)[] | undefined;
  refetchSpaceById: () => void;
  refetchSpaceByConfig: () => void;
}

export interface NoumViewProps {
  id: string;
  children: JSX.Element;
  isCustomPreview?: boolean;
}

export type NoumViewElementProps = {
  tools: ElementOutput[];
  isCompleteLoading: boolean;
  elementId: string | null;
};

export interface IChamberHead {
  isCustomPreview?: boolean;
}
