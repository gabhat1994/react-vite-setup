import { EventsStatus, Privacy, UserRole } from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';

export const placeHolderdata = [
  {
    _id: '647f3395b19878000da40bfe',
    status: EventsStatus.GoLive,
    privacy: Privacy.Public,
    title: 'Test Event #01',
    description:
      'This is an example event just to show you what calendar will look like in your Noum. Don’t worry, it will not be visible when you publish your Noum 🙂',
    eventDate: '2023-06-06T14:00:00.000Z',
    duration: 3600,
    eventStatusUpdatedAt: '2023-06-06T13:30:00.227Z',
    socialHall: {
      _id: '647f33957c40e809b22407a1',
      isActive: true,
    },
    chamberId: {
      _id: '62bd985ea7564f000e31c472',
    },
    userId: {
      _id: '6295ce0b1792ec247e8eb225',
      firstName: 'Swarup',
      middleName: null,
      lastName: 'Ghosh Dev',
    },
    isInstantEvent: true,
    currentUser: {
      eventId: '647f3395b19878000da40bfe',
      userId: '62fcdb69c2b876000fb22f71',
      userRole: UserRole.Participant,
      invitation: {
        _id: '647f36c2b19878000da40dd3',
      },
    },
  },
] as EventFragment[];
