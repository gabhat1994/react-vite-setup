import generate from 'uniqid';
import { t } from 'i18next';
import { ProjectChamberType } from '@/apollo/generated/types';
import { type InviteStatusProps, type VisibilityProps } from './types';

export const visibilityOptions: VisibilityProps[] = [
  {
    key: generate(),
    label: 'Public',
    type: 'value',
    value: ProjectChamberType.Public,
    description: t('noumena.chamber_edit.visibility.public_description'),
    labelColor: '--text-tablecell-header-neutral-highlighted',
  },
  {
    key: generate(),
    label: 'Private',
    type: 'value',
    value: ProjectChamberType.Private,
    description: t('noumena.chamber_edit.visibility.private_description'),
    labelColor: '--text-tablecell-header-neutral-highlighted',
  },
  {
    key: generate(),
    label: 'Secret',
    type: 'value',
    value: ProjectChamberType.Secret,
    description: t('noumena.chamber_edit.visibility.secret_description'),
    labelColor: '--text-tablecell-header-neutral-highlighted',
  },
];

export const inviteOptions: InviteStatusProps[] = [
  {
    key: 'invite-cancel',
    label: 'Cancel Invite',
    type: 'value',
    value: 'Cancel',
    description: '',
  },
  {
    key: 'invite-resend',
    label: 'Resend the Invite',
    type: 'value',
    value: 'Resend',
    description: '',
  },
];
