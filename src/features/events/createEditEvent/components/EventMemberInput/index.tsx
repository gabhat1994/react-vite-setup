import { forwardRef } from 'react';
import { useLaunchDarkly } from '@/hooks';
import { EventMemberInput as ComponentV1 } from './EventMemberInput';
import { EventMemberInputV2 as ComponentV2 } from './EventMemberInputV2';
import type { SearchUsersProps } from './types';

export const EventMemberInput = forwardRef<HTMLInputElement, SearchUsersProps>(
  (props, ref) => {
    const {
      flags: { createNewEventV2 },
    } = useLaunchDarkly();

    return createNewEventV2 ? (
      <ComponentV2 ref={ref} {...props} />
    ) : (
      <ComponentV1 ref={ref} {...props} />
    );
  },
);
