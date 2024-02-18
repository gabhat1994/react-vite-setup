import { type Message } from '@twilio/conversations';
import { t } from 'i18next';
import { isPendingMessage } from '@/features/conversation/helpers';
import {
  type MessageAttributes,
  type PendingMessage,
} from '@/features/conversation/types';
import { type MessageProps } from '../types';

export const getStatusText = ({
  status,
  readers,
  type,
}: Pick<MessageProps, 'type' | 'status' | 'readers'>) => {
  let text = '';
  if (status !== 'failed' && status !== 'sending' && readers?.length)
    text = t('noumena.message.read_by', { value: readers.join(', ') });
  else if (type === 'received') text = '';
  else if (['sending', 'success', 'failed', undefined].includes(status))
    text = '';
  else if (status === 'sent') text = t('noumena.message.sent');
  else if (status === 'delivered') text = t('noumena.message.delivered');
  else if (status === 'read') text = t('noumena.message.read');

  return text;
};

export const getMessageCreateDate = (message?: PendingMessage | Message) => {
  if (!message) {
    return undefined;
  }
  if (isPendingMessage(message)) {
    return new Date(message.attributes.dateCreatedTimestamp);
  }

  const attributesTimestamp = (message.attributes as MessageAttributes)
    .dateCreatedTimestamp;
  const dateCreated = attributesTimestamp
    ? new Date(attributesTimestamp)
    : undefined;

  // fallback for backward compatibility
  return (
    dateCreated ||
    (message.dateCreated ? new Date(message.dateCreated) : undefined)
  );
};
