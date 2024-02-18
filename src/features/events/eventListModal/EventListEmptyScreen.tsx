import { Trans, useTranslation } from 'react-i18next';

import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { EventsFilter } from '@/apollo/generated/types';
import { type IActiveFilter } from '@/features/events/hooks';

import {
  EventListEmptyScreenArrowIcon,
  EventListEmptyScreenArrowsWrapper,
  EventListEmptyScreenSubHint,
  EventListEmptyScreenWrapper,
} from './styles';

export const EventListEmptyScreen = ({
  activeFilter,
}: {
  activeFilter: IActiveFilter;
}) => {
  const { t } = useTranslation();
  let EmptyScreenHint: JSX.Element | null = null;
  switch (activeFilter) {
    case 'all':
      EmptyScreenHint = (
        <TSpan
          font="body-xl-bold"
          colorToken="text-placeholder-header-neutral-highlighted"
        >
          {t('noumena.events.empty.note_no_events')}
        </TSpan>
      );
      break;
    case EventsFilter.Attending:
      EmptyScreenHint = (
        <>
          <TSpan
            font="body-xl-bold"
            colorToken="text-placeholder-header-neutral-highlighted"
          >
            {t('noumena.events.empty.note_no_attending_events')}
          </TSpan>
          <EventListEmptyScreenSubHint>
            <TSpan
              font="body-m"
              colorToken="--text-placeholder-neutral-default"
            >
              {t('noumena.events.empty.subnote_no_attending_events')}
            </TSpan>
          </EventListEmptyScreenSubHint>
        </>
      );
      break;
    case EventsFilter.Hosting:
      EmptyScreenHint = (
        <>
          <TSpan
            font="body-xl-bold"
            colorToken="text-placeholder-header-neutral-highlighted"
          >
            {t('noumena.events.empty.note_no_hosting_events')}
          </TSpan>
          <EventListEmptyScreenSubHint>
            <TSpan
              font="body-m"
              colorToken="--text-placeholder-neutral-default"
            >
              {t('noumena.events.empty.subnote_no_hosting_events1')}
            </TSpan>
            <EventListEmptyScreenArrowsWrapper>
              <Trans
                i18nKey="noumena.events.empty.subnote_no_hosting_events2"
                components={{
                  tspan: (
                    <TSpan
                      font="body-m"
                      colorToken="--text-placeholder-neutral-default"
                    />
                  ),
                  arrowIcon: (
                    <EventListEmptyScreenArrowIcon
                      name="arrow_right_m"
                      size={14}
                      color="--icon-input-neutral-default"
                    />
                  ),
                }}
              />
            </EventListEmptyScreenArrowsWrapper>
          </EventListEmptyScreenSubHint>
        </>
      );
      break;
    case EventsFilter.Invitation:
      EmptyScreenHint = (
        <TSpan
          font="body-xl-bold"
          colorToken="text-placeholder-header-neutral-highlighted"
        >
          {t('noumena.events.empty.note_no_invited_events')}
        </TSpan>
      );
      break;
    case EventsFilter.Expired:
      EmptyScreenHint = (
        <TSpan
          font="body-xl-bold"
          colorToken="text-placeholder-header-neutral-highlighted"
        >
          {t('noumena.events.empty.note_no_expired_events')}
        </TSpan>
      );
      break;
    default:
  }
  return (
    <EventListEmptyScreenWrapper>
      <Icon
        name="calendar_xxxl"
        color="--icon-placeholder-neutral-default"
        size={120}
      />
      {EmptyScreenHint}
    </EventListEmptyScreenWrapper>
  );
};
