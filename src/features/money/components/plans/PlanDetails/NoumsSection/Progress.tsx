import { TSpan } from '@/components';
import { CircleProgressBar } from '@/components/ProgressBar';
import { Stack } from '@/layout';
import { type TProgress } from './types';

export const Progress = ({ totalSlots, usedSlots }: TProgress) => {
  const completedPercentage = ((usedSlots || 0) / (totalSlots || 0)) * 100;
  const slots = `${usedSlots || 0} / ${totalSlots || 0}`;

  return (
    <Stack fullWidth gap={8} align="center">
      <CircleProgressBar
        percentage={completedPercentage}
        color={
          completedPercentage
            ? 'var(--bg-progressbar-brand-primary-default)'
            : 'var(--bg-progressbar-neutral-default)'
        }
        barSize={2}
        circleSize={24}
      />
      <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
        {`${slots} used`}
      </TSpan>
    </Stack>
  );
};
