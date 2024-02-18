import { t } from 'i18next';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type NoumAboutToExpireProps } from './types';

const NoumAboutToExpire = ({
  noumName,
  noumExpiryDays,
  message,
  ...basicProps
}: NoumAboutToExpireProps) => {
  const endText =
    Number(noumExpiryDays) > 1
      ? `${noumExpiryDays} days`
      : `${noumExpiryDays} day`;
  return (
    <NotificationItem
      title={t('noumena.notification_type.noumAboutToExpire.title', {
        noumName,
        endText,
      })}
      data-testid="noumAboutToExpire"
      {...basicProps}
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.noumAboutToExpire.body"
          values={{ message }}
        />
      }
    />
  );
};

export default NoumAboutToExpire;
