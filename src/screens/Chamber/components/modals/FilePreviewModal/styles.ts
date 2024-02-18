import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { mediaSizes } from '@/constants/devices';

const FileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  width: 100%;
  justify-content: space-between;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    flex-basis: 100%;
  }
`;

const ModalBody = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  height: 100%;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    flex-direction: column;
  }
`;

const LabelText = styled(TSpan)`
  color: var(--text-card-neutral-default);
`;

const ValueText = styled(TSpan)`
  color: var(--text-modal-neutral-highlighted);
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  row-gap: 4px;
  margin-top: 16px;
`;

const TableRowItem = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    display: grid;
    grid-template-columns: 0.3fr 0.7fr;
  }
`;

const FooterButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ButtonsWrapper = styled.div`
  gap: 16px;
  display: flex;
`;

const ModalBodyInnerWrapper = styled.div`
  max-height: 100%;
  width: 100%;
  flex-grow: 1;
`;

export default {
  FileInfoWrapper,
  ModalBody,
  LabelText,
  ValueText,
  DescriptionWrapper,
  TableRowItem,
  FooterButtons,
  ButtonsWrapper,
  ModalBodyInnerWrapper,
};
