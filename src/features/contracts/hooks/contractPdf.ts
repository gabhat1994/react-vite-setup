import { NetworkStatus } from '@apollo/client';
import { useCallback } from 'react';
import {
  type ContractFragment,
  ContractFragmentDoc,
  useGetContractPdfLazyQuery,
  useGetContractPdfQuery,
  useGetContractPdfWithSignatureQuery,
  useSendContractForSigningMutation,
} from '@/apollo/graphql';
import { base64ToDataString } from '@/utils/base64ToBlob';
import { downloadFileFromUrl } from '@/utils/file';
import { useToast } from '@/hooks';
import { ContractStatus } from '../types';
import { useContractSigningParty } from './contractSigningParty';

interface UseContractPdfOptions {
  id?: string;
}

export function useContractPdf({ id }: UseContractPdfOptions) {
  const { data, networkStatus, refetch } = useGetContractPdfQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      id: id!,
    },
    skip: !id,
  });

  const base64 = data?.getSingleContract?.contractPDF?.base64;
  const pdfData = base64 ? base64ToDataString(base64, 'application/pdf') : null;

  return {
    pdfData,
    loading: [NetworkStatus.loading, NetworkStatus.refetch].includes(
      networkStatus,
    ),
    refetch,
  };
}

export function useDownloadContractPdfLazy() {
  const { addPrimaryIconToast } = useToast();

  const [getContractPdf] = useGetContractPdfLazyQuery({
    fetchPolicy: 'network-only',
  });

  const downloadContractPdf = useCallback(
    async (contractId: string, fileName: string) => {
      addPrimaryIconToast('PDF download will begin shortly.');

      const { data } = await getContractPdf({ variables: { id: contractId } });
      const base64 = data?.getSingleContract?.contractPDF?.base64;

      if (!base64) {
        return;
      }

      await downloadFileFromUrl(
        base64ToDataString(base64, 'application/pdf'),
        'application/pdf',
        fileName,
      );
    },
    [addPrimaryIconToast, getContractPdf],
  );

  return downloadContractPdf;
}

interface UseContractPdfWithSignatureOptions {
  id?: string;
  contract?: ContractFragment | null;
}

export function useContractPdfWithSignature({
  id,
  contract,
}: UseContractPdfWithSignatureOptions) {
  const { signee } = useContractSigningParty(contract ?? null);

  const { data, networkStatus } = useGetContractPdfWithSignatureQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id!,
      contactId: signee?._id ?? '',
    },
    skip: !id || !contract || !signee,
  });

  const [sendForSigningMutation] = useSendContractForSigningMutation({
    update(cache, result) {
      if (!result.data?.sendDocumentForSigning || !id) {
        return;
      }

      cache.updateFragment<ContractFragment>(
        {
          fragment: ContractFragmentDoc,
          fragmentName: 'Contract',
          id: cache.identify({
            __typename: 'Contract',
            _id: id,
          }),
        },
        (prevData) => {
          if (!prevData) {
            return null;
          }

          return {
            ...prevData,
            status: ContractStatus.Issued,
          };
        },
      );
    },
  });

  const sendForSigning = useCallback(async () => {
    if (!id) {
      return false;
    }

    const result = await sendForSigningMutation({ variables: { id } });
    return result.data?.sendDocumentForSigning ?? false;
  }, [id, sendForSigningMutation]);

  const base64 = data?.previewWithSign?.base64;
  const pdfData = base64 ? base64ToDataString(base64, 'application/pdf') : null;

  return {
    pdfData,
    loading: [NetworkStatus.loading, NetworkStatus.refetch].includes(
      networkStatus,
    ),
    sendForSigning,
  };
}
