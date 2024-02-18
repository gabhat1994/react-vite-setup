import { useMemo } from 'react';
import { type QueryResult } from '@apollo/client';
import {
  type UserActiveSocialHallGroupQuery,
  type SocialHallAttendeesAndGroupsQuery,
  type SocialHallAttendeesAndGroupsQueryVariables,
} from '@/apollo/graphql';

export const useCheckIfEventHasSocialHallAttendees = (
  socialHallAttendeesAndGroups?: QueryResult<
    SocialHallAttendeesAndGroupsQuery,
    SocialHallAttendeesAndGroupsQueryVariables
  >,
  activeSocialHallGroup?:
    | UserActiveSocialHallGroupQuery['userActiveSocialHallGroup']
    | null,
) =>
  useMemo(() => {
    const socialHallGroups =
      socialHallAttendeesAndGroups?.data?.socialHallGroups?.data;
    let socialHallMember;
    if (socialHallGroups && activeSocialHallGroup?.hosts) {
      const socialHallUsersData = socialHallGroups[0]?.users;
      if (socialHallUsersData?.length === 1 && socialHallUsersData[0]?._id) {
        socialHallMember = activeSocialHallGroup?.hosts.includes(
          socialHallUsersData[0]?._id,
        );
      }
    }
    return socialHallMember;
  }, [
    socialHallAttendeesAndGroups?.data?.socialHallGroups?.data,
    activeSocialHallGroup?.hosts,
  ]);

export default useCheckIfEventHasSocialHallAttendees;
