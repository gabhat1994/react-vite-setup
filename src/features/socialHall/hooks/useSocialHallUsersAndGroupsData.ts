import { useEffect, useState } from 'react';
import { type UserOutput } from '@/apollo/generated/types';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { notEmpty } from '@/utils/notEmpty';
import { capitalizeAllWord } from '@/utils/strings';
import { circleRadius, gutterSpace } from '../components/Visualization/const';
import { type SocialHallData } from '../components/Visualization/types';

export const useSocialHallUsersAndGroupsData = () => {
  const [users, setUsers] = useState<SocialHallData[]>([]);
  const [groups, setGroups] = useState<SocialHallData[]>([]);
  const { socialHallAttendeesAndGroups } = useSocialHallContext();

  const getChildData = (user: UserOutput) => ({
    radius: circleRadius,
    gutterSpace,
    title: capitalizeAllWord(user?.firstName ?? ' '),
    subTitle: capitalizeAllWord(user?.title ?? ' '),
    background: user?.profile?.profilePicture,
    chamberId: user?.chamber?._id,
  });

  useEffect(() => {
    const shUsers =
      (socialHallAttendeesAndGroups?.data?.socialHallAttendee?.data || [])
        // .filter((attendee) => !!attendee?.attendeeId?.SocialHallTCAccepted)
        .map((attendee) => ({
          id: `user-${attendee?.attendeeId?._id || `${Date.now()}`}`, // user?.SocialHallTCAccepted should be used instead for actual usage
          radius: circleRadius,
          title: attendee?.attendeeId?.firstName || ' ',
          subTitle: attendee?.attendeeId?.title || ' ',
          children: [
            {
              id: attendee?.attendeeId?._id || '',
              ...getChildData(attendee?.attendeeId!),
            },
          ],
        })) ?? [];

    const shGroups =
      (socialHallAttendeesAndGroups?.data?.socialHallGroups?.data || [])
        .filter(notEmpty)
        ?.map((group) => {
          const children =
            group?.users?.filter(notEmpty)?.map((groupUser) => ({
              id: `group-${groupUser?._id || ''}`,
              ...getChildData(groupUser),
            })) ?? [];
          return {
            id: group?._id ?? '',
            radius: circleRadius,
            title: group.name || group.channelName || '',
            children,
          };
        }) ?? [];
    setUsers(shUsers);
    setGroups(shGroups);
  }, [
    socialHallAttendeesAndGroups?.data?.socialHallAttendee?.data,
    socialHallAttendeesAndGroups?.data?.socialHallGroups?.data,
  ]);

  return {
    users,
    groups,
  };
};

export default useSocialHallUsersAndGroupsData;
