import { t } from 'i18next';
import { type UserOutput } from '@/apollo/generated/types';
import { type UserBasicOutputFragment } from '@/apollo/graphql';
import { SideBarType, type SideBarSection } from './types';

const createSection = ({ header, type, data }: SideBarSection) => ({
  header: t(header),
  type,
  data,
});

export const createAudienceSection = (
  attendees: UserBasicOutputFragment[],
): SideBarSection =>
  createSection({
    header: 'noumena.social_hall.audience',
    type: SideBarType.AUDIENCE,
    data: attendees,
  });

export const createStageSection = (
  attendees: UserBasicOutputFragment[],
): SideBarSection =>
  createSection({
    header: 'noumena.social_hall.stage',
    type: SideBarType.ON_STAGE,
    data: attendees,
  });

export const createRaisedHandSection = (
  attendees: UserOutput[],
): SideBarSection =>
  createSection({
    header: 'noumena.social_hall.raised_hands',
    type: SideBarType.RAISED_HAND,
    data: attendees,
  });
