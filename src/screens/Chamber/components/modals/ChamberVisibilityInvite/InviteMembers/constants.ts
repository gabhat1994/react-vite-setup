import { t } from 'i18next';

import { type InputListTypes } from '@/components/Tabs/types';
import { InviteMemberTabId } from '../types';

export const inviteMembersTabInputList: InputListTypes<InviteMemberTabId>[] = [
  {
    id: InviteMemberTabId.NoumenaMembers,
    name: 'Noumena Members',
    image: 'terms_m',
    text: t('noumena.chamber_edit.modal.members'),
    labelSize: 'auto',
  },
  {
    id: InviteMemberTabId.NonNoumenaMembers,
    name: 'Non-Noumena Members',
    image: 'terms_m',
    text: t('noumena.chamber_edit.modal.non_members'),
    labelSize: 'auto',
  },
];
