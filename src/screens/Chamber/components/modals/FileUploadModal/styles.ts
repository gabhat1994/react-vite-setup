import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

const ModalBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const FooterButtons = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
`;

const CheckBoxLabel = styled.label`
  padding-left: 16px;
`;

const VisibleForLabel = styled(TSpan)`
  color: var(--text-modal-header-neutral-default);
`;

const UploadedItem = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  border-radius: 0;
  flex: 0 0 1;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 8px;
  padding: 12px;
`;

const UploadedItemLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UploadedItemIconContainer = styled.div`
  border: 1px solid var(--border-file-unknown-default);
  border-radius: 8px;
  padding: 12px;
`;

const UploadedItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;
`;

const UploadedItemFileName = styled(TSpan)`
  color: var(--text-card-header-neutral-highlighted);
`;

const UploadedItemSizeText = styled(TSpan)`
  color: var(--text-card-neutral-default);
`;

const SpinnerContainer = styled.div`
  position: relative;
  padding: 16px;
`;

const UploadingText = styled(TSpan)`
  color: var(--text-card-brand-primary-default);
`;

export default {
  ModalBody,
  FooterButtons,
  FormContainer,
  CheckBoxLabel,
  CheckBoxWrapper,
  VisibleForLabel,
  UploadedItem,
  UploadedItemLeftWrapper,
  UploadedItemIconContainer,
  UploadedItemTextContainer,
  UploadedItemFileName,
  UploadedItemSizeText,
  SpinnerContainer,
  UploadingText,
};
