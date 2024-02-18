import { type TProps } from '../Typography/Typography';

type TimeFormat = 'short' | 'normal';
export interface TimeRelativeProps {
  format?: TimeFormat;
  date: Date;
  fromDate?: Date;
  font?: TProps['font'];
  colorToken?: string;
}
