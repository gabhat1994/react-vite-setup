import SecretNoumAlertModal from '@/components/SecretNoumAlertModal/SecretNoumAlertModal';
import React from 'react';

type InvoiceSecretNoumAlertModalProps = {
  isOpenModal: boolean;
  isUnauthenticated?: boolean;
  onClose: () => void;
};

const InvoiceSecretNoumAlertModal: React.FC<
  InvoiceSecretNoumAlertModalProps
> = ({ isUnauthenticated, ...props }) => {
  const warningText = isUnauthenticated
    ? `Your client is not a member or an authenticated non-member of Noumena. Our team can help you to share this invoice with your client, get in touch with us on our support page.`
    : `Your client is not connected to this Noum. Head to your Noum to connect them first and then share your invoice.`;

  const description = isUnauthenticated
    ? `You created this invoice from a secret Noum. To share it with your client (guest user) they need to be both a member or an authenticated non-member of Noumena and also connected to the Noum. You can find your draft invoice in the Invoice Manager.`
    : `You created this invoice from a secret Noum. To share it with your client they need to be both connected to the Noum and also a member or an authenticated non-member of Noumena. You can find your draft invoice in the Invoice Manager.`;

  return (
    <SecretNoumAlertModal
      warningText={warningText}
      description={description}
      title="Your Invoice cannot be issued"
      {...props}
    />
  );
};

export default InvoiceSecretNoumAlertModal;
