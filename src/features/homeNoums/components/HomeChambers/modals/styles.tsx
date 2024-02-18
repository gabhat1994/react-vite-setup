import styled from 'styled-components';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { ModalHeader as ExtendedModalHeader } from '@/components/ExtendedModal';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';

export const HeaderContainerNonModal = styled.div<{
  isEditReference?: boolean;
  gridTemplateColumns?: string;
  basicToolbar?: boolean;
}>`
  display: ${({ isEditReference }) =>
    isEditReference ? 'inline-block' : 'grid'};
  grid-template-columns: ${({ gridTemplateColumns, basicToolbar }) =>
    gridTemplateColumns ||
    (basicToolbar === false ? '68px 1fr' : '68px 1fr 68px')};
  align-items: center;
  width: 100%;
  min-height: 40px;

  @media (min-width: ${sizes.TABLET}) {
    grid-template-columns: ${({ gridTemplateColumns, basicToolbar }) =>
      gridTemplateColumns ||
      (basicToolbar === false ? '50px 1fr 150px' : '50px 1fr 150px 65px')};
  }

  @media (min-width: ${sizes.LAPTOP}) {
    grid-template-columns: ${({ gridTemplateColumns }) =>
      gridTemplateColumns || '150px 1fr 150px'};
    min-width: 70px;
    justify-content: center;
    margin: 0;
  }
`;

export const ModalHeader = styled(ExtendedModalHeader)<{ isEdit?: boolean }>`
  justify-content: flex-end;
  @media (min-width: ${sizes.TABLET_L}) {
    flex-direction: row-reverse;
    justify-content: space-between;
    width: ${({ isEdit }) => (isEdit ? '75%' : '100%')};
  }
`;

export const StyledAddReferenceButton = styled(Button)`
  font-size: var(--font-body-large-size);
  &:hover,
  :active {
    background-color: transparent;
  }
`;

export const StyledSaveButton = styled(Button)`
  margin-left: auto;
  padding: 16px 32px;
  font-size: var(--font-input-medium-size);
  font-family: var(--font-button-medium-font);
`;

export const StyledSaveButtonTableMobile = styled(Button)`
  font-size: var(--font-input-medium-size);
  font-family: var(--font-button-medium-font);
  margin-left: 12px;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  flex: 2;
`;

export const StyledTabWrapper = styled.div<{
  fullWidth?: boolean;
}>`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'};

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding-top: 0;
  }

  @media (max-width: ${sizes.TABLET_L}) {
    flex: 2;
  }
`;

export const EditReferenceDescription = styled.div`
  margin: 8px 0px;
`;

export const EditReferenceForm = styled.form`
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 56px;
  display: grid;
`;

export const FieldWrapper = styled.div`
  width: 100%;
`;

export const ButtonWrapper = styled.div<{ flexDirection?: 'column' | 'row' }>`
  display: flex;
  margin-top: 16px;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
`;

export const ReferenceInnerContainer = styled(Stack)`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 24px;
`;

export const TabContainer = styled.div`
  width: fit-content;
`;

export const ReferenceImageContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid var(--border-card-neutral-highlighted);
  background: var(--bg-card-neutral-alt-default);
`;

export const RefereneceImageHeader = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RefereneceImageDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReferenceImageCloseButton = styled(Button)`
  padding: 0;
  width: auto;
`;

export const ReferenceImage = styled.img`
  background-size: contain;
  background-position: center;
  width: 100%;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    max-height: 222px;
  }
`;

export const StyledRichEditor = styled.div`
  width: 100%;
  gap: 16px;
  box-sizing: border-box;
  margin-top: 16px;
  flex: 1;
  display: flex;
`;

export const ModalDescription = styled(TSpan)`
  white-space: pre-line;
`;

export const ReferenceDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ReferenceContainer = styled(ReferenceDetailContainer)`
  margin-bottom: 16px;
  width: 100%;
`;

export const ReferenceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ReferenceClient = styled(TSpan)``;

export const ReferenceDescription = styled(TSpan)`
  margin: 16px 0;
`;

export const IconMainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
