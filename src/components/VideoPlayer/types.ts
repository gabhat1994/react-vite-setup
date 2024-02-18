import { type Maybe } from '@/common/types';

export interface VideoPlayerProps {
  url: Maybe<string>;
  fileType: Maybe<string>;
  onLoadedData?: () => void;
  onGotDuration?: (length: number) => void;
  isCollapse?: boolean;
  bigPlayButton?: boolean;
  controls?: boolean;
  responsive?: boolean;
  fluid?: boolean;
  width?: number;
  height?: number;
  isSquare?: boolean;
}

export interface VideoPlayerViewProps {
  url?: string;
  isCollapse?: boolean;
  viewOnly?: boolean;
  fullHeight?: boolean;
  fileType?: string;
  width?: number;
  height?: number;
  bigPlayButton?: boolean;
  controls?: boolean;
  isLoading?: boolean;
  onLoadedData?: () => void;
  isSquare?: boolean;
  isCustomPreview?: boolean;
  elementId?: string | null;
}
