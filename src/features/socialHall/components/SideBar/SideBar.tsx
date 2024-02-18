import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from '@/hooks/dimensions';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { breakpoints } from '@/constants/devices';
import { useSocialHallContext } from '@/providers';
import { type SocialHallAttendee } from '@/apollo/generated/types';
import { sideBarTabs } from './data';
import { SideBarUserListItem } from './UserListItem/SideBarUserListItem';
import { SideBarGroupListItem } from './GroupListItem/SideBarGroupListItem';
import {
  ListWrapper,
  SideBarWrapper,
  TabsWrapper,
  EmptyMessageSpan,
  EmptyWrapper,
} from './styles';

export const SideBar = () => {
  const { t } = useTranslation();
  const {
    socialHallAttendee,
    socialHallAttendeesAndGroups,
    userActiveGroupData,
  } = useSocialHallContext();
  const { width } = useWindowDimensions();
  const isMobile = width <= breakpoints.MOBILE_L;
  const [selectedId, setSelectedId] = useState<string>('0');
  const handleChangeTab = useCallback((value) => {
    setSelectedId(value);
  }, []);

  const { attendees, groups } = useMemo(
    () => ({
      attendees: socialHallAttendeesAndGroups?.data?.socialHallAttendee?.data,
      groups: socialHallAttendeesAndGroups?.data?.socialHallGroups?.data,
    }),
    [socialHallAttendeesAndGroups],
  );

  const isUserOnCall = useMemo(
    () => !!userActiveGroupData?.data?.userActiveSocialHallGroup?._id,
    [userActiveGroupData?.data?.userActiveSocialHallGroup?._id],
  );

  return (
    <SideBarWrapper data-testid="side_bar_wrapper">
      <TabsWrapper data-testid="tabs_wrapper">
        <BasicChipsTabsForm
          inputList={sideBarTabs}
          onChange={(value) => handleChangeTab(value)}
          selectedId={selectedId}
          isWithoutImage
          mode="isUnderline"
          tabWidth={isMobile ? '' : '148px'}
          fullWidth={isMobile}
        />
      </TabsWrapper>
      <ListWrapper data-testid="list_wrapper">
        {selectedId === '0' ? (
          attendees && attendees.length > 0 ? (
            attendees.map((attendee) => (
              <SideBarUserListItem
                key={attendee?._id}
                userInfo={attendee as SocialHallAttendee}
                showKnockBtn={attendee?._id !== socialHallAttendee?._id}
                isUserOnCall={isUserOnCall}
              />
            ))
          ) : (
            <EmptyWrapper>
              <EmptyMessageSpan colorToken="--text-placeholder-neutral-default">
                {t('noumena.social_hall.empty_user')}
              </EmptyMessageSpan>
            </EmptyWrapper>
          )
        ) : groups && groups.length > 0 ? (
          groups.map((group) => (
            <SideBarGroupListItem key={group?._id} groupInfo={group!} />
          ))
        ) : (
          <EmptyWrapper>
            <EmptyMessageSpan colorToken="--text-placeholder-neutral-default">
              {t('noumena.social_hall.empty_group')}
            </EmptyMessageSpan>
          </EmptyWrapper>
        )}
      </ListWrapper>
    </SideBarWrapper>
  );
};
