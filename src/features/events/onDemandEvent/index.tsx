import { useLaunchDarkly } from '@/hooks';

import { CreateEditEventProvider } from '../contexts';
import type { ICreateEditEventProvider } from '../types/context';
import { OnDemandEventModal as ComponentV1 } from './OnDemandEventModal';
import { OnDemandEventModalV2 as ComponentV2 } from './OnDemandEventModalV2';

export const OnDemandEventModal = (props: ICreateEditEventProvider) => {
  const {
    flags: { createNewEventV2 },
  } = useLaunchDarkly();

  return (
    <CreateEditEventProvider {...props}>
      {createNewEventV2 ? <ComponentV2 /> : <ComponentV1 />}
    </CreateEditEventProvider>
  );
};
