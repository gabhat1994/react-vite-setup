import { t } from 'i18next';
import { type InputListTypes } from '@/components/Tabs/types';
import { EntityType } from '@/apollo/generated/types';

export const searchHeadList = () => {
  const searchTabs: InputListTypes[] = [
    {
      id: 'All',
      name: 'All',
      image: 'terms_m',
      text: t('noumena.search.filter_all'),
      labelSize: 'medium',
    },
    {
      id: EntityType.ProjectNoum,
      name: EntityType.ProjectNoum,
      image: 'terms_m',
      text: t('noumena.search.filter_noums'),
      labelSize: 'medium',
    },
    {
      id: EntityType.HomeNoum,
      name: EntityType.HomeNoum,
      image: 'terms_m',
      text: t('noumena.search.filter_members'),
      labelSize: 'medium',
    },
    {
      id: EntityType.Event,
      name: EntityType.Event,
      image: 'terms_m',
      text: t('noumena.search.filter_events'),
      labelSize: 'medium',
    },
    {
      id: EntityType.Post,
      name: EntityType.Post,
      image: 'terms_m',
      text: t('noumena.search.filter_posts'),
      labelSize: 'medium',
    },
  ];

  return searchTabs;
};

export const eventStatus = {
  Attending: t('noumena.search.event.attending'),
  Finished: t('noumena.search.event.finished'),
  Hosting: t('noumena.search.event.hosting'),
  Invited: t('noumena.search.event.invited'),
  NotAttending: t('noumena.search.event.notattending'),
};

export const noumStatus = {
  You: t('noumena.search.noum.you'),
  OwnedByYou: t('noumena.search.noum.ownedbyyou'),
};
