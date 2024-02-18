import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type TokenRewardedProps } from './types';

const TokenRewarded = ({ message, ...basicProps }: TokenRewardedProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="TokenRewarded"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.token_rewarded.body"
        values={{ message }}
      />
    }
  />
);

export default TokenRewarded;
