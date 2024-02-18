import { forwardRef, type Ref } from 'react';

import { PermissibleElementType } from '@/apollo/generated/types';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { type CalendarElementProps } from './types';
import { CalendarElementViewMode } from './CalendarElementViewMode';

export const CalendarElement = forwardRef(
  (props: CalendarElementProps, ref: Ref<HTMLDivElement>) => {
    const { hasElementPermission } = useNoumAuthorization();
    const { space } = useNoumContext();
    const { isConnected } = useNoumUserConnectionContext();

    const hasViewCalendarElementPermission = hasElementPermission(
      PermissibleElementType.Calendar,
      'view-event-element',
      true,
    );

    if (
      isConnected &&
      !SpaceUtils.isMasterNoum(space) &&
      !hasViewCalendarElementPermission
    ) {
      return null;
    }

    return <CalendarElementViewMode {...props} ref={ref} />;
  },
);
