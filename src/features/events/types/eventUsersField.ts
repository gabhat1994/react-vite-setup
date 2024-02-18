import { type Maybe } from '@/common/types';
import { type Placement } from '@popperjs/core';
import { type EventFragment } from '@/apollo/graphql';
import { type Attendees, type Privacy } from '@/apollo/generated/types';

import type { TUncontrolledFields } from './context';

interface BaseEventUserFieldProps {
  event: Maybe<EventFragment>;
  chamberId: Maybe<string>;
  connectedAttendees: Partial<Attendees>[];
  otherAttendees: Partial<Attendees>[];
  isProjectNoum?: boolean;
  loading: boolean;
  cancellingInvitation: boolean;
  privacy?: Privacy;
  onCancelInvitation: (userId: string, callback: () => void) => void;
  onFormChanged: (f: TUncontrolledFields, isChanged: boolean) => void;
}

export interface EventUsersFieldProps
  extends Partial<Pick<BaseEventUserFieldProps, 'onCancelInvitation'>> {
  showHelperText?: boolean;
  dropdownProps?: {
    placement: Placement;
    usePortal: boolean;
  };
}
