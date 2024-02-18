import { useMemo } from 'react';
import { t } from 'i18next';

import { StyledSeeMoreButton, StyledEventDescription } from './styles';
import { type EventDescriptionProps } from './types';

const EVENT_DESCRIPTION_LENGTH = 250;
export const EventDescription = ({
  description,
  onClickSeeMore,
  isClipped = true,
}: EventDescriptionProps) => {
  const { shouldClip, displayedDescription } = useMemo(() => {
    if (isClipped && (description?.length || 0) > EVENT_DESCRIPTION_LENGTH)
      return {
        shouldClip: true,
        displayedDescription: description?.substring(
          0,
          EVENT_DESCRIPTION_LENGTH,
        ),
      };
    return { shouldClip: false, displayedDescription: description };
  }, [description, isClipped]);
  return (
    <StyledEventDescription
      colorToken="--text-modal-neutral-default"
      onClick={onClickSeeMore}
      font="body-m"
      data-testid="event-description-testid"
    >
      {displayedDescription}
      {shouldClip && '...'}
      {onClickSeeMore && shouldClip && (
        <StyledSeeMoreButton
          colorToken="--link-card-brand-primary-default"
          onClick={onClickSeeMore}
          font="link-m"
        >
          {t('noumena.homeChambers.event.see_more')}
        </StyledSeeMoreButton>
      )}
    </StyledEventDescription>
  );
};

export default EventDescription;
