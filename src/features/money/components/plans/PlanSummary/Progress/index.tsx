import { memo } from 'react';
import { CircleProgressBar } from '@/components/ProgressBar';
import { TSpan } from '@/components/Typography';
import { ProgressCircleContainer, ProgressContainer } from './styles';

interface TProgress {
  name: string;
  totalSlots: number;
  usedSlots: number;
}

export const Progress = memo(({ name, totalSlots, usedSlots }: TProgress) => {
  const completedPercentage = (usedSlots / (totalSlots || 0)) * 100;

  return (
    <ProgressCircleContainer>
      <CircleProgressBar
        percentage={completedPercentage}
        color={
          completedPercentage
            ? 'var(--bg-progressbar-brand-primary-default)'
            : 'var(--bg-progressbar-neutral-default)'
        }
        barSize={4}
        circleSize={24}
      />
      <ProgressContainer>
        <TSpan font="footnote" colorToken="--text-card-neutral-default">
          {name}
        </TSpan>
        <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
          {`${usedSlots} / ${totalSlots}`}
        </TSpan>
      </ProgressContainer>
    </ProgressCircleContainer>
  );
});

export default Progress;
