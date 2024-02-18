import { type ChangeEvent } from 'react';
import { type ReportType } from '@/apollo/generated/types';

export type ReportReasonItemProps = {
  label: string;
  value?: ReportType;
  description: string;
  reportText: string;
  isChecked: boolean;
  isOtherChecked?: boolean;
  error?: boolean;
  borderBottom?: boolean;
  onSelect: (type: ReportType) => void;
  onChangeText: (event: ChangeEvent<HTMLInputElement>) => void;
};
