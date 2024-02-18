import { type ElementOutput } from '@/apollo/generated/types';

export type CustomPreviewElementV2Props = {
  tool: ElementOutput;
  spaceId: string;
  index: number;
  totalIndex: number;
  isEditing?: boolean;
  onUpClick: () => Promise<void>;
  onDownClick: () => Promise<void>;
  includeCPAdditionalInfo?: boolean;
};

export type VisiblityChangeButtonDataProps = {
  isEnabled?: boolean;
  tooltipMessage?: string;
};
