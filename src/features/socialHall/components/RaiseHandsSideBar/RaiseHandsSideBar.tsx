import { useEffect, useMemo } from 'react';
import { first } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/Icon';
import { useSocialHallCallContext, useSocialHallContext } from '@/providers';
import { SideBarUserItem } from './SideBarUserItem/SideBarUserListItem';
import {
  ListWrapper,
  SideBarWrapper,
  EmptyMessageSpan,
  EmptyScreenWrapper,
  SideBarHeader,
  SideBarHeaderWrapper,
  CloseButton,
} from './styles';

type RaiseHandsSideBarProps = {
  onClose: () => void;
};

export const RaiseHandsSideBar = ({ onClose }: RaiseHandsSideBarProps) => {
  const { t } = useTranslation();

  const { socialHallAttendeesAndGroups } = useSocialHallContext();

  const { raisedHandUsers, setRaisedHandUsers } = useSocialHallCallContext();

  useEffect(() => {
    setRaisedHandUsers([]);
  }, [setRaisedHandUsers]);

  const groupAttendees = useMemo(
    () =>
      first(
        socialHallAttendeesAndGroups?.data?.socialHallGroups?.data,
      )?.users?.filter((attendee) => raisedHandUsers?.includes(attendee?._id!)),
    [raisedHandUsers, socialHallAttendeesAndGroups],
  );

  return (
    <SideBarWrapper data-testid="side_bar_wrapper">
      <SideBarHeaderWrapper>
        <SideBarHeader
          colorToken="--text-appbar-neutral-default"
          font="body-l-bold"
        >
          {t('noumena.social_hall.raised_hands')}
        </SideBarHeader>
        <CloseButton onClick={onClose}>
          <Icon
            color="--icon-card-neutral-highlighted"
            name="close_m"
            size={24}
          />
        </CloseButton>
      </SideBarHeaderWrapper>
      {groupAttendees?.length ? (
        <ListWrapper data-testid="list_wrapper">
          {groupAttendees.map((attendee) => (
            <SideBarUserItem key={attendee?._id} userInfo={attendee!} />
          ))}
        </ListWrapper>
      ) : (
        <EmptyScreenWrapper>
          <Icon
            name="raise_hand_2_outline_m"
            size={144}
            color="--icon-card-placeholder-neutral-default"
          />
          <EmptyMessageSpan
            colorToken="--text-placeholder-neutral-default"
            font="body-xl"
          >
            {t('noumena.social_hall.no_raise_hand')}
          </EmptyMessageSpan>
        </EmptyScreenWrapper>
      )}
    </SideBarWrapper>
  );
};
