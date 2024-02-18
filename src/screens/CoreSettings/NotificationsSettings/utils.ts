import { type EmailSubscriptionType } from './types';

export const subscriptionsOptionsList: {
  id: EmailSubscriptionType;
  label: string;
  disabled?: boolean;
}[] = [
  {
    id: 'messagesAndConnections',
    label: 'Messages & Connections',
  },
  {
    id: 'postAndCommentMentions',
    label: 'Post / Comment mentions',
  },
  // {
  //   id: 'marketing',
  //   label: 'Marketing communication',
  // },
  {
    id: 'paymentsAndOTPs',
    label: 'Payments & OTP',
    disabled: true,
  },
  {
    id: 'events',
    label: 'Events',
    disabled: true,
  },
];
