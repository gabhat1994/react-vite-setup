import { t } from 'i18next';
import { TranslatedBody, NotificationButton } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type WalletUploadDocumentProps } from './types';

const WalletUploadDocuments = ({
  message,
  onUploadDocuments,
  ...basicProps
}: WalletUploadDocumentProps) => (
  <AdminMessage
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.wallet.upload.documents.body"
        values={{
          message,
        }}
      />
    }
    buttons={
      <NotificationButton variant="primary" onClick={onUploadDocuments}>
        {t('noumena.notifications.upload_documents')}
      </NotificationButton>
    }
  />
);

export default WalletUploadDocuments;
