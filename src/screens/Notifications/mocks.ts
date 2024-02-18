import { faker } from '@faker-js/faker';
import { type Duration, sub } from 'date-fns';
import {
  ActionType,
  type ChamberByIdRef,
  type ConnectionByIdRef,
  ConnectionRequestTypeEnum,
  ContractStatus,
  type EventNotificationDetails,
  EventsStatus,
  type GroupRef,
  InvitationStatus,
  SowStatus,
  type UserOutput,
  UserRole,
} from '@/apollo/generated/types';
import {
  type ContractBasic,
  type StatementOfWorkBasic,
} from '@/features/contracts/types';
import { type NotificationFragment } from '@/apollo/graphql';
import { type UserFragment } from '@/apollo/graphql/fragments';

export function createUser(overrides: Partial<UserOutput> = {}): UserOutput {
  const userId = faker.datatype.uuid();

  return {
    __typename: 'UserOutput',
    _id: userId,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    profile: {
      __typename: 'ProfileOutput',
      _id: faker.datatype.uuid(),
      profilePicture: faker.image.avatar(),
      profilePictureThumbnail: faker.image.avatar(),
    },
    chamber: {
      __typename: 'ChamberByUserIdRef',
      _id: faker.datatype.uuid(),
      userId,
    },
    ...overrides,
    userStatus: ActionType.Active,
  };
}

export function createUsers(count: number): UserOutput[] {
  return Array.from({ length: count }).map(() => createUser());
}

export function createTimeAgo(duration: Duration): Date {
  return sub(new Date(), duration);
}

export function createGroup(overrides: Partial<GroupRef> = {}): GroupRef {
  return {
    _id: faker.datatype.uuid(),
    name: faker.company.name(),
    ...overrides,
  };
}

export function createChamber(
  overrides: Partial<ChamberByIdRef> = {},
): ChamberByIdRef {
  return {
    _id: faker.datatype.uuid(),
    name: faker.company.name(),
    profileImage: faker.image.animals(),
    uid: createUser(),
    ...overrides,
  };
}

export function createConnection(
  overrides: Partial<ConnectionByIdRef> = {},
): ConnectionByIdRef {
  return {
    _id: faker.datatype.uuid(),
    requestTo: {
      _id: faker.datatype.uuid(),
      uid: createUser(),
    },
    requestFrom: {
      _id: faker.datatype.uuid(),
      uid: createUser(),
    },
    status: ConnectionRequestTypeEnum.Requested,
    ...overrides,
  };
}

export function createNotification(
  overrides: Partial<NotificationFragment> = {},
): NotificationFragment {
  return {
    __typename: 'Notification',
    _id: faker.datatype.uuid(),
    createdAt: '2022-05-03T00:00:00Z',
    updatedAt: '2022-07-11T00:00:00Z',
    inviteId: null,
    adminUserId: null,
    event: null,
    data: null,
    group: null,
    inviteStatus: null,
    unread: false,
    userId: null,
    postId: null,
    commentId: null,
    ...overrides,
  };
}

export function createEvent(
  invitationStatus: InvitationStatus = InvitationStatus.Pending,
  userRole: UserRole = UserRole.None,
  overrides: Partial<EventNotificationDetails> = {},
  recurring: boolean = false,
): EventNotificationDetails {
  const eventId = faker.datatype.uuid();
  return {
    id: {
      _id: eventId,
      recurring,
      title: faker.company.catchPhrase(),
      cohosts: [
        {
          _id: faker.datatype.uuid(),
          chamberId: createChamber(),
          status: InvitationStatus.Accepted,
          userId: createUser(),
        },
      ],
      invitations: [
        {
          _id: faker.datatype.uuid(),
          chamberId: createChamber(),
          status: InvitationStatus.Accepted,
          userId: createUser(),
        },
      ],
      status: EventsStatus.Upcoming,
      chamberId: createChamber(),
      socialHall: {
        _id: faker.datatype.uuid(),
        isActive: true,
      },
      currentUser: {
        eventId,
        userId: faker.datatype.uuid(),
        userRole,
        invitation: {
          _id: faker.datatype.uuid(),
          status: invitationStatus,
        },
      },
      ...overrides.id,
    },
    invitedBy: createUser() as UserFragment,
    ...overrides,
  };
}

export function createContract(
  overrides: Partial<ContractBasic> = {},
): ContractBasic {
  return {
    _id: faker.datatype.uuid(),
    status: ContractStatus.Draft,
    title: faker.company.catchPhrase(),
    contractNumber: faker.datatype.number({ min: 1, max: 1000, precision: 1 }),
    isCompleted: true,
    ...overrides,
  };
}
export function createStatementOfWork(
  overrides: Partial<StatementOfWorkBasic> = {},
): StatementOfWorkBasic {
  return {
    _id: faker.datatype.uuid(),
    status: SowStatus.Draft,
    title: faker.company.catchPhrase(),
    SOWNumber: faker.datatype.number({ min: 1, max: 1000, precision: 1 }),
    linkedNoum: { ...createChamber(), __typename: 'SpaceOutput' },
    isCompleted: true,
    ...overrides,
  };
}
