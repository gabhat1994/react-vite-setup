import routes from '@/constants/routes';
import { UserUtil } from '@/utils/user';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type WalletSetupRequestProps } from './types';

const WalletSetupRequest = ({
  users,
  onClick,
  ...basicProps
}: WalletSetupRequestProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();
    navigate(routes.WALLET_SETUP);
  };

  return (
    <AdminMessage
      {...basicProps}
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.wallet_setup_request.body"
          values={{
            clientName: UserUtil.renderFirstName(users[0]),
          }}
        />
      }
      buttons={
        <>
          <NotificationButton variant="primary" onClick={handleClick}>
            {t('noumena.notification_type.wallet_setup_request.button')}
          </NotificationButton>
        </>
      }
    />
  );
};

export default WalletSetupRequest;
