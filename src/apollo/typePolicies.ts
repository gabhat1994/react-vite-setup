import { isEqual, uniqWith } from 'lodash';

import { type TypedTypePolicies } from '@/apollo/generated/apollo-helpers';
import { offsetLimitPaginationData } from '@/utils/apollo';

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      getNoumReferences: offsetLimitPaginationData([
        '_id',
        '$experienceId',
        '$status',
      ]),
      getConversations: offsetLimitPaginationData(['$type']),
      getEvents: offsetLimitPaginationData([
        '$type',
        '$chamberId',
        '$filter',
        '$sortOrder',
        '$limit',
      ]),
      getSpaceConversations: offsetLimitPaginationData(['_id', '$spaceId']),
      getSpaceConversationsAsAdminQuery: offsetLimitPaginationData([
        '_id',
        '$spaceId',
        '$filter',
      ]),
      getHomeSpaceConversations: offsetLimitPaginationData(
        ['_id', '$uid'],
        ['userConversations', 'groupConversations'],
      ),
      getAllUidForChamberPosts: offsetLimitPaginationData(['_id']),
      getPostsByChamberId: offsetLimitPaginationData([
        '_id',
        '$filter',
        '$sort',
        '$chamberId',
      ]),
      getSpaceConnectedMembers: offsetLimitPaginationData(['_id', '$spaceId']),
      getSpaceFollowers: offsetLimitPaginationData(['_id', '$spaceId']),
      getOwnProjectChambers: offsetLimitPaginationData([
        '_id',
        '$filter',
        '$sort',
        '$limit',
      ]),
      getConnectedSpaces: offsetLimitPaginationData([
        '_id',
        '$filter',
        '$sort',
      ]),
      connectedNoums: offsetLimitPaginationData([
        '$input.filter',
        '$input.sort',
      ]),
      getFollowingSpaces: offsetLimitPaginationData([
        '_id',
        '$filter',
        '$sort',
      ]),
      myFeed: offsetLimitPaginationData(false),
      dailyRecommendations: offsetLimitPaginationData(false, ['matches']),
      userPosts: offsetLimitPaginationData(['uid']),
      groupPosts: offsetLimitPaginationData(['_id']),
      allNoumsContacts: {
        keyArgs: ['$query', '$status'],
      },
      allUsers: offsetLimitPaginationData([
        '$search',
        '$activeUserOnly',
        '$chamberId',
        '$type',
        '$filter',
        '$ownerID',
        '$limit',
      ]),
      groups: offsetLimitPaginationData(['groupId', 'search']),
      usersGroups: offsetLimitPaginationData(['groupId', 'search']),
      searchGroups: offsetLimitPaginationData(['search']),
      notifications: offsetLimitPaginationData(['$filter'], ['data'], true),
      socialHallAttendee: offsetLimitPaginationData(['socialHallId']),
      socialHallGroups: offsetLimitPaginationData(['socialHallId']),
      userConnections: offsetLimitPaginationData(['uid', 'search']),
      groupConnections: offsetLimitPaginationData(['_id', 'search']),
      getRepliesByCommentId: offsetLimitPaginationData([
        'commentId',
        'sortOrder',
      ]),
      postComments: offsetLimitPaginationData(['$postId', '$limit']),
      getRecommendedNoums: offsetLimitPaginationData(['_id', '$filter']),
      userActiveKnocks: {
        merge(_existing, incoming) {
          return incoming;
        },
      },
      userActiveSocialHallGroup: {
        merge(_existing, incoming) {
          return incoming;
        },
      },
      userOwnKnocks: {
        merge(_existing, incoming) {
          return incoming;
        },
      },
      globalSearch: offsetLimitPaginationData(['$query', '$entityType']),
      receivedConnectionRequest: offsetLimitPaginationData([
        '$status',
        '$spaceId',
      ]),
      requestedConnection: offsetLimitPaginationData([
        '$status',
        '$requestFrom',
      ]),
      userMembers: offsetLimitPaginationData(['$status', '$limit']),
      receivedNoumConnectionInvites: offsetLimitPaginationData(['$limit']),
      sentNoumConnectionInvites: offsetLimitPaginationData(['$limit']),
      sentNoumConnectionRequests: offsetLimitPaginationData(['$limit']),
      listBlockedCountries: offsetLimitPaginationData(['$limit']),
    },
  },
  SocialGroup: {
    fields: {
      users: {
        merge(_existing, incoming) {
          return incoming;
        },
      },
    },
  },
  Discovery: {
    merge: true,
  },
  GroupInvitation: {
    merge: true,
  },
  ProfileOutput: {
    merge: true,
  },
  SpaceOutput: {
    fields: {
      elements: {
        // eslint-disable-next-line @typescript-eslint/default-param-last
        merge(_existing = [], incoming, fieldOptions) {
          if (fieldOptions.variables?.state === 'UNSAVED') {
            return [...incoming];
          }
          if (fieldOptions.variables?.currentState === 'PUBLISHED') {
            return [...incoming];
          }
          return uniqWith([..._existing, ...incoming], isEqual);
        },
      },
      unSaved: { merge: true },
      draft: { merge: true },
      members: offsetLimitPaginationData(['$noumId', '$limit', '$input']),
    },
  },
  ChamberPostOutput: {
    merge: true,
  },
  EventNotificationDetails: {
    // Don't cache this because it's always a nested entity within Notification and each has unique content, per notification.
    keyFields: false,
  },
  NotificationAdditionalData: {
    // Don't cache this because it's always a nested entity within Notification and each has unique content, per notification.
    keyFields: false,
  },
  NoumRole: {
    fields: {
      groupedPermissions: {
        // This is always contextual and we don't know where it ends up. So we don't denormalize it to a ref, instead we inline it.
        keyArgs: false,
      },
    },
  },
  NoumMemberRole: {
    keyFields: false,
  },
  NoumRolePermissionGroup: {
    fields: {
      permissions: {
        // This is always contextual and we don't know where it ends up. So we don't denormalize it to a ref, instead we inline it.
        keyArgs: false,
      },
    },
  },
  NoumRolePermissionItem: {
    // This is always contextual and we don't know where it ends up. So we don't denormalize it to a ref, instead we inline it.
    keyFields: false,
  },

  PlanSettingItemOutput: {
    // This is always contextual and we don't know where it ends up. So we don't denormalize it to a ref, instead we inline it.
    keyFields: false,
  },

  PlanSettingNoumOptionsOutput: {
    // This is always contextual and we don't know where it ends up. So we don't denormalize it to a ref, instead we inline it.
    keyFields: false,
  },
};

export default typePolicies;
