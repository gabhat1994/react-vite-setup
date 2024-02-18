import { NetworkStatus } from '@apollo/client';
import { useCallback } from 'react';
import {
  useGetStatementOfWorkPdfLazyQuery,
  useGetStatementOfWorkPdfQuery,
  useGetStatementOfWorkPdfWithSignatureQuery,
} from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { base64ToDataString } from '@/utils/base64ToBlob';
import { downloadFileFromUrl } from '@/utils/file';
import { type StatementOfWork } from '../types';
import { useContractSigningParty } from './contractSigningParty';

interface UseStatementOfWorkPdfOptions {
  id?: string;
}

export function useStatementOfWorkPdf({ id }: UseStatementOfWorkPdfOptions) {
  const { data, networkStatus, refetch } = useGetStatementOfWorkPdfQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id!,
    },
    skip: !id,
  });

  const base64 = data?.getSingleSOW?.sowPDF?.base64;
  const pdfData = base64 ? base64ToDataString(base64, 'application/pdf') : null;

  return {
    pdfData,
    loading: [NetworkStatus.loading, NetworkStatus.refetch].includes(
      networkStatus,
    ),
    refetch,
  };
}

export function useDownloadStatementOfWorkPdfLazy() {
  const { addPrimaryIconToast } = useToast();

  const [getStatementOfWorkPdf] = useGetStatementOfWorkPdfLazyQuery({
    fetchPolicy: 'network-only',
  });

  const downloadContractPdf = useCallback(
    async (statementOfWorkId: string, fileName: string) => {
      addPrimaryIconToast('PDF download will begin shortly.');

      const { data } = await getStatementOfWorkPdf({
        variables: { id: statementOfWorkId },
      });
      const base64 = data?.getSingleSOW?.sowPDF?.base64;

      if (!base64) {
        return;
      }

      await downloadFileFromUrl(
        base64ToDataString(base64, 'application/pdf'),
        'application/pdf',
        fileName,
      );
    },
    [addPrimaryIconToast, getStatementOfWorkPdf],
  );

  return downloadContractPdf;
}

interface UseContractPdfWithSignatureOptions {
  id?: string;
  statementOfWork?: StatementOfWork | null;
}

export function useStatementOfWorkPdfWithSignature({
  id,
  statementOfWork,
}: UseContractPdfWithSignatureOptions) {
  const { signee } = useContractSigningParty(
    statementOfWork?.linkedContract ?? null,
  );

  const { data, networkStatus } = useGetStatementOfWorkPdfWithSignatureQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id!,
      contactId: signee?._id ?? '',
    },
    skip: !id || !signee,
  });

  const base64 = data?.previewWithSign?.base64;
  const pdfData = base64 ? base64ToDataString(base64, 'application/pdf') : null;

  return {
    pdfData,
    loading: [NetworkStatus.loading, NetworkStatus.refetch].includes(
      networkStatus,
    ),
  };
}
