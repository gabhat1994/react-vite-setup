import { type MessageAttributes } from '@/features/conversation/types';
import { type Media } from '@twilio/conversations';

export type MessageBubbleType = 'sent' | 'received' | 'timestamp';

export type MessageBubbleStatus =
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed'
  | 'success';

export interface MessageProps {
  sid?: string;

  /** on resend. required for sent message. Default: `undefined` */
  onResend?: (id: string) => void;

  /** name of users who read the mssage. Default: `undefined` */
  readers?: string[];

  /** name of sender. required for received message. Default: `undefined` */
  sender?: string;

  /** avatar url of user(sender | receiver). Default: `undefined` */
  userAvatar?: string;

  /** flag to show avatar. Default: `undefined` */
  showAvatar?: boolean;

  /** message status. Default: `undefined` */
  status?: MessageBubbleStatus;

  /** whether the message is sent or received. Default: `sent` */
  type?: MessageBubbleType;

  /** send date of a message */
  sendDate?: Date | null;

  /** whether the send date should be displayed by default */
  showSendDate?: boolean;

  /** whether message sender should be displayed */
  showSender?: boolean;

  /** whether message status should be displayed */
  showStatus?: boolean;

  /** message custom attributes */
  attributes?: MessageAttributes;

  children?: React.ReactNode;
}

export interface TextMessageProps extends MessageProps {
  /** message text */
  message: string;

  /** Previous(top) message when continuous messaging. Default: `undefined` */
  justSentPrev?: boolean;

  /** Next(bottom) message when continuous messaging. Default: `undefined` */
  justSentNext?: boolean;

  maxWidth?: string;

  /** whether message type is pending */
  isPending?: boolean;
}

export interface MediaMessageProps extends MessageProps {
  /** percentage uploaded: 0 - 100 */
  uploadPercentage?: number;

  /** file of pending message */
  pendingFile?: File;

  /** attached media */
  media?: Media;
}
