import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useWindowDimensions } from '@/hooks';
import { capitalizeAllWord } from '@/utils/strings';
import { notEmpty } from '@/utils/notEmpty';
import { Stack } from '@/layout/Stack';
import { SocialHallViz } from './SocialHallViz';
import { socialHallAttendee, socialHallGroup } from './mock';
import * as S from './styles';
import { type SocialHallData } from './types';
import { circleRadius, gutterSpace } from './const';

export default {
  title: 'UI/SocialHall/Visualization',
  component: SocialHallViz,
};

const Wrapper = styled.div`
  width: 1024px;
  height: 745px;
  overflow: hidden;
  padding: 16px;
`;

export const Primary = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const dimens = useWindowDimensions();
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (refContainer.current) {
      setSize({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight,
      });
    }
  }, [dimens]);

  // Remove users who have not selected social hall terms and condition
  // Id's are modified when user accepts SocialTC so that SCNavigation can ignore cache data and redraw.
  const users: SocialHallData[] =
    socialHallAttendee
      .filter((attendee) => !!attendee?.attendeeId?.SocialHallTCAccepted)
      .map((attendee) => ({
        id: `user-${attendee?.attendeeId?._id || `${Date.now()}`}`, // user?.SocialHallTCAccepted should be used instead for actual usage
        radius: circleRadius,
        title: capitalizeAllWord(attendee?.attendeeId?.firstName ?? ' '),
        subTitle: capitalizeAllWord(attendee?.attendeeId?.title ?? ' '),
        children: [
          {
            id: attendee?.attendeeId?._id || '',
            radius: circleRadius,
            gutterSpace,
            title: capitalizeAllWord(attendee?.attendeeId?.firstName ?? ' '),
            subTitle: capitalizeAllWord(attendee?.attendeeId?.title ?? ' '),
            background: attendee?.attendeeId?.profile?.profilePicture,
          },
        ],
      })) ?? [];

  const groups: SocialHallData[] =
    socialHallGroup.filter(notEmpty)?.map((group) => {
      const children =
        group?.users?.filter(notEmpty)?.map((groupUser) => ({
          id: `group-${groupUser?._id || ''}`,
          radius: circleRadius,
          gutterSpace,
          title: capitalizeAllWord(groupUser?.firstName ?? ''),
          subTitle: capitalizeAllWord(groupUser?.title ?? ''),
          background: groupUser?.profile?.profilePicture,
        })) ?? [];
      return {
        id: group?._id ?? '',
        radius: circleRadius,
        title: capitalizeAllWord(group.channelName ?? ''),
        subTitle: capitalizeAllWord(group.name ?? ''),
        children,
      };
    }) ?? [];

  return (
    <Stack>
      <Wrapper>
        <S.Container ref={refContainer}>
          {refContainer.current && (
            <SocialHallViz
              data={[...users, ...groups]}
              minHeight={size.height}
              minWidth={size.width}
              topPadding={50}
              bottomPadding={50}
            />
          )}
        </S.Container>
      </Wrapper>
    </Stack>
  );
};
