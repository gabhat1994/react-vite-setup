import {
  InvitationStatus,
  type UserOutput,
  UserRole,
} from '@/apollo/generated/types';
import { AllUsersDocument } from '@/apollo/graphql';

export const users: UserOutput[] = [
  {
    _id: '627a8ec281116f5c88787bf9',
    firstName: 'Yunlai',
    lastName: 'Che',
    middleName: null,
    title: 'Senior dev',
    email: null,
    chamber: {
      _id: '6288938897ffc4addf44c384',
      userId: '627a8ec281116f5c88787bf9',
    },
    profile: {
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/me.rGlqtAOC.png',
    },
    getEventUserRole: {
      eventId: '62c7ec6aa2a7f5000c6e5252',
      userId: '627a8ec281116f5c88787bf9',
      invitation: {
        _id: '62c7ecf5a2a7f5000c6e529b',
        status: InvitationStatus.Pending,
        invitedBy: {
          _id: '627e10857c90d0603c1c2a3c',
        },
      },
      userRole: UserRole.Cohost,
    },
  },
  {
    _id: '62972a1827f712000db4ef5c',
    firstName: 'Kay',
    lastName: 'Abad',
    middleName: null,
    title: 'Test',
    email: null,
    chamber: {
      _id: '62972a49c35418000ea0bd88',
      userId: '62972a1827f712000db4ef5c',
    },
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/62972a1827f712000db4ef5c/profile/tIR-SXAepHE1msMRTzKOU',
    },
    getEventUserRole: {
      eventId: '62c7ec6aa2a7f5000c6e5252',
      userId: '62972a1827f712000db4ef5c',
      invitation: null,
      userRole: null,
    },
  },
  {
    _id: '626b7af6307b439e68c1333e',
    firstName: 'Kaley',
    lastName: 'Bett',
    middleName: null,
    title: 'Mj',
    email: null,
    chamber: {
      _id: '626b7afbe64eed0f3aa5310f',
      userId: '626b7af6307b439e68c1333e',
    },
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/626b7af6307b439e68c1333e/profile/-yPboT_Ena9RzYyhv7Ieb',
    },
    getEventUserRole: {
      eventId: '62c7ec6aa2a7f5000c6e5252',
      userId: '626b7af6307b439e68c1333e',
      invitation: null,
      userRole: null,
    },
  },
  {
    _id: '6297429ac64671000e00b99f',
    firstName: 'larry',
    lastName: 'bird',
    middleName: null,
    title: null,
    email: null,
    chamber: {
      _id: '6297429eea587e000e80d37e',
      userId: '6297429ac64671000e00b99f',
    },
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/6297429ac64671000e00b99f/profile/ErAfXZZOFcnrt0-x3xYbU',
    },
    getEventUserRole: {
      eventId: '62c7ec6aa2a7f5000c6e5252',
      userId: '6297429ac64671000e00b99f',
      invitation: null,
      userRole: null,
    },
  },
];

export const usersMock = {
  request: {
    query: AllUsersDocument,
    variables: {
      eventId: '62c7ec6aa2a7f5000c6e5252',
      search: '',
      limit: 20,
      offset: 0,
    },
  },
  result: {
    data: {
      allUsers: {
        count: 20,
        data: users,
      },
    },
  },
};
