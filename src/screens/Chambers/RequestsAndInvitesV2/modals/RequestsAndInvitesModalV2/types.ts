import { type InputListTypes } from '@/components/Tabs/types';
import { t } from 'i18next';
import { ReceivedAndSent, RequestsAndInvites } from './constants';

export const RequestsAndInvitesTypeTabs: InputListTypes<RequestsAndInvites>[] =
  [
    {
      id: RequestsAndInvites.Request,
      name: RequestsAndInvites.Request,
      text: t('noumena.requests'),
      labelSize: 'auto',
    },
    {
      id: RequestsAndInvites.Invites,
      name: RequestsAndInvites.Invites,
      text: t('noumena.invites'),
      labelSize: 'auto',
    },
  ];

type RequestsAndInvitesStatusRadioType = {
  id: ReceivedAndSent;
  label: string;
};

export const RequestsAndInvitesStatusRadioButtons: RequestsAndInvitesStatusRadioType[] =
  [
    {
      id: ReceivedAndSent.Received,
      label: t('noumena.received'),
    },
    {
      id: ReceivedAndSent.Sent,
      label: t('noumena.sent'),
    },
  ];
