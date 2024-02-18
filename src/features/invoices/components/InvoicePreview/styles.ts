import styled from 'styled-components';
import { PdfPreviewThumbnail } from '@/components/PdfPreviewThumbnail';

const InvoicePdfPreview = styled(PdfPreviewThumbnail)<{ $isEmpty?: boolean }>`
  width: 100%;
  height: 100%;
  min-width: ${({ $isEmpty }) => ($isEmpty ? '540px' : 'auto')};
`;

export default {
  InvoicePdfPreview,
};
