import { DocumentStatusV2, WalletStatus } from '../types';

const canUploadDocument = (status: string) =>
  !Object.values(DocumentStatusV2).includes(status as DocumentStatusV2);

const canCreateWallet = (status: string) =>
  status === WalletStatus.CUSTOMER_NOT_CREATED;

export const WalletUtils = {
  canUploadDocument,
  canCreateWallet,
};
