import { useCallback, useRef } from 'react';
import html2PDF from 'jspdf-html2canvas';
import { useBreakpoints, useToast } from '@/hooks';

export const useDownloads = () => {
  const Ref = useRef<HTMLDivElement>(null);
  const devices = useBreakpoints();
  const { addErrorToast } = useToast();

  const handleDownloadPdf = useCallback(
    async ({
      document,
      documentId,
    }: {
      document: string;
      documentId: string | number;
    }) => {
      if (devices.isMobile || devices.isTablet) {
        addErrorToast('Downloading is available only in Desktop View');
        return;
      }

      const element = Ref.current;
      if (!element) return;
      if (element) {
        html2PDF(element.children[0], {
          jsPDF: {
            format: [600, 900],
            putOnlyUsedFonts: true,
          },

          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          imageType: 'image/jpeg',
          output: `${document}-${documentId}.pdf`,
        });
      }
    },
    [addErrorToast, devices.isMobile, devices.isTablet],
  );

  return { Ref, handleDownloadPdf };
};
