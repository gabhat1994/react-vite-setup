import { type FC, useMemo } from 'react';
import { getPBFontSize } from '@/utils/dimens';
import { cleanPercentage } from '@/utils/percentage';

import { type CircleProgressBarProps } from './types';

export const Circle: FC<{
  color: string;
  r: number;
  bs: number;
  pct?: number;
  time?: number;
}> = ({ color, r, bs, pct, time }) => {
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - (pct || 100)) * circ) / 100;

  return (
    <circle
      data-testid="svg-circle"
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? color : ''}
      strokeWidth={`${bs}px`}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
      style={{ transition: `all ${time}ms ease-in-out` }}
    />
  );
};

export const Text: FC<{ percentage: number; fontsize: number }> = ({
  percentage,
  fontsize,
}) => (
  <text
    data-testid="svg-text"
    x="50%"
    y="50%"
    dominantBaseline="central"
    textAnchor="middle"
    fontFamily="var(--font-family)"
    fontWeight="bold"
    fontSize={`${fontsize}px`}
  >
    {percentage.toFixed(0)}%
  </text>
);

export const CircleProgressBar: FC<CircleProgressBarProps> = ({
  percentage,
  isLabel,
  color,
  backgroudColor,
  barSize,
  transTime,
  circleSize,
}) => {
  const pct = useMemo(() => cleanPercentage(percentage), [percentage]);
  const r = useMemo(() => circleSize / 2, [circleSize]);
  const fontsize = useMemo(() => getPBFontSize(circleSize / 2), [circleSize]);
  const bs = barSize || 8;
  const svgSize = useMemo(() => circleSize + bs, [circleSize, bs]);
  const mv = useMemo(() => (circleSize + bs) / 2, [circleSize, bs]);

  return (
    <svg data-testid="cpb-svg" width={svgSize} height={svgSize}>
      <g transform={`rotate(-90 ${mv} 100)`}>
        <Circle
          color={backgroudColor || '--bg-progressbar-neutral-default'}
          r={r}
          bs={bs}
        />
        <Circle
          color={color || '--bg-progressbar-brand-primary-default'}
          r={r}
          bs={bs}
          pct={pct}
          time={transTime}
        />
      </g>
      {isLabel ? <Text percentage={pct} fontsize={fontsize} /> : undefined}
    </svg>
  );
};
