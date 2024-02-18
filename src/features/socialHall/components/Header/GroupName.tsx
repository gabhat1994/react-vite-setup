import { t } from 'i18next';
import { useMemo } from 'react';
import { Icon } from '@/components/Icon';
import { useSocialHallContext, useSocialHallEventContext } from '@/providers';
import { TitleSpan, TitleWrapper, TagTitleContainer } from './styles';
import { EventTag } from './EventTag';

type GroupNameProps = {
  showMobileView: boolean;
  onChangeGroupName?: () => void;
};

export const GroupName = ({
  onChangeGroupName,
  showMobileView,
}: GroupNameProps) => {
  const { showBuzzRoom } = useSocialHallContext();
  const { groupName, isMainEvent, eventDetails, isEventHost } =
    useSocialHallEventContext();

  const canEdit = useMemo((): boolean => {
    if (
      (!showBuzzRoom || isMainEvent || eventDetails?.isInstantEvent) &&
      isEventHost
    ) {
      return false;
    }
    return true;
  }, [eventDetails?.isInstantEvent, isMainEvent, showBuzzRoom, isEventHost]);

  return showMobileView ? (
    <TagTitleContainer>
      <EventTag />
      <TitleWrapper>
        <TitleSpan font="body-xl-bold" isGray={showBuzzRoom && !groupName}>
          {groupName || t('noumena.social_hall.add_group_name')}
        </TitleSpan>
      </TitleWrapper>
    </TagTitleContainer>
  ) : (
    <TagTitleContainer>
      <EventTag />
      <TitleWrapper>
        <TitleSpan
          font="body-xl-bold"
          isGray={showBuzzRoom && !groupName && !isMainEvent}
        >
          {groupName || t('noumena.social_hall.add_group_name')}
        </TitleSpan>
        {!canEdit && (
          <Icon
            onClick={onChangeGroupName}
            color="--icon-card-neutral-default"
            name="edit_m"
            size={24}
          />
        )}
      </TitleWrapper>
    </TagTitleContainer>
  );
};
