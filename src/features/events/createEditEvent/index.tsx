import { memo } from 'react';
import { CreateEditEventProvider } from '../contexts';
import type { ICreateEditEventProvider } from '../types/context';
import { CreateEditEvent as CreateEditEventComponent } from './CreateEditEvent';

export const CreateEditEvent = memo((props: ICreateEditEventProvider) => (
  <CreateEditEventProvider {...props}>
    <CreateEditEventComponent />
  </CreateEditEventProvider>
));
