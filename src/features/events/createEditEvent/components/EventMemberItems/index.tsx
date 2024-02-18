import { useLaunchDarkly } from '@/hooks';

import type { EventHostsViewProps } from './types';
import { EventMemberItems as ComponentV1 } from './EventMemberItems';
import { EventMemberItemsV2 as ComponentV2 } from './EventMemberItemsV2';

export * from './EventMemberItem';

export const EventMemberItems = (props: EventHostsViewProps) => {
  const {
    flags: { createNewEventV2 },
  } = useLaunchDarkly();

  return createNewEventV2 ? (
    <ComponentV2 {...props} />
  ) : (
    <ComponentV1 {...props} />
  );
};
