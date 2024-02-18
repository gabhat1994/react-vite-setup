import { ModalBody, ModalFooter } from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import styled from 'styled-components';

export const ModalContent = styled(ModalBody)<{ hasSingleButton?: boolean }>`
  width: 100%;
`;
export const Footer = styled(ModalFooter)``;

export const AccountWrapper = styled.div`
  width: 400px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  gap: 16px;
`;
export const AccountName = styled.div`
  width: 100%;
  font-family: var(--font-header-xsmall-bold-font);
  color: var(--text-tablecell-header-neutral-highlighted);
  height: 100%;
  display: flex;
  align-items: center;
`;
export const AccountDescription = styled.div`
  width: 100%;
  font-family: var(--font-header-xsmall-bold-font);
  color: var(--text-tablecell-body-neutral-default);
  height: 100%;
`;
export const Account = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

export const Image = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 6px;
`;

export const Label = styled(TSpan)`
  width: 100%;
`;

export const PaymentReviewDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const ReviewCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const ReviewLabel = styled(TSpan)``;
export const ReviewInformation = styled(TSpan)`
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
