import {
  type ContractFragment,
  type NoumContactBasicFragment,
} from '@/apollo/graphql';
import useContactNoumConnection from '@/features/noumContacts/hooks/contactNoumConnection';
import { useContractPermissions } from './contractPermissions';

export function useContractPreviewValidation() {
  const ContractPermissions = useContractPermissions();
  const [checkConnectionWithSecretNoum] = useContactNoumConnection();

  function isOwnerAParty(contract: ContractFragment) {
    return (
      ContractPermissions.isOwner(contract, contract.buyer?.userId._id) ||
      ContractPermissions.isOwner(contract, contract.seller?.userId._id)
    );
  }

  async function canReceiveDocument(
    contract: ContractFragment,
    party: NoumContactBasicFragment,
  ) {
    if (!contract.linkedNoum._id) {
      return false;
    }

    // Owners can always receive and send documents
    if (ContractPermissions.isOwner(contract, party.userId._id)) {
      return true;
    }

    const { isSecretNoum, isConnected } = await checkConnectionWithSecretNoum(
      contract.linkedNoum._id,
      party._id,
    );
    if (isSecretNoum) {
      return isConnected;
    }

    // The Noum is not secret, so anybody can receive the document.
    return true;
  }

  return { canReceiveDocument, isOwnerAParty };
}
