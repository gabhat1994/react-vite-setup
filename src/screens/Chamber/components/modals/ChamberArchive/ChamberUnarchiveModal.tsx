import { memo } from 'react';
import { useLaunchDarkly } from '@/hooks';
import { type ChamberUnarchiveModalProps } from './types';
import { ChamberUnarchive } from './ChamberUnarchive';
import { ChamberUnarchiveV2 } from './ChamberUnarchiveV2';

export const ChamberUnarchiveModal = memo(
  (props: ChamberUnarchiveModalProps) => {
    const { flags } = useLaunchDarkly();
    if (flags.paymentSubscriptions) {
      return <ChamberUnarchiveV2 {...props} />;
    }
    return <ChamberUnarchive {...props} />;
  },
);
