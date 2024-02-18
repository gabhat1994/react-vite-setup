interface CommonProgressBarProps {
  /** The number of completed percentage */
  percentage: number;
  /** The flag for displaying label of percentage */
  isLabel?: boolean;
  /** The type of bar color */
  color?: string;
  /** The color of background */
  backgroudColor?: string;
  /** The number of bar height */
  barSize?: number;
  /** The number of transaction time (ms) */
  transTime?: number;
}

export type ProgressBarProps = CommonProgressBarProps;

export type CircleProgressBarProps = CommonProgressBarProps & {
  circleSize: number;
};
