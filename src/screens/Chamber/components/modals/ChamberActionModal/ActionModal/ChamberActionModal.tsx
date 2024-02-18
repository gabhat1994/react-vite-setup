import {
  Modal,
  ModalSize,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Spinner } from '@/components/Spinner';

import {
  WrapperLoading,
  WrapperSpinner,
} from '@/screens/Chamber/components/ElementWrapper/styles';
import { type ChamberActionModalProps } from './types';
import { BodyContent } from './styles';

export const ChamberActionModal = ({
  isOpen = true,
  isWaiting = false,
  textForWaiting = undefined,
  isLoading = false,
  title,
  description,
  body,
  positiveBtnLabel,
  positiveBtnType = 'primary',
  negativeBtnLabel = 'Close',
  positiveBtnIntent = undefined,
  extraBtnLabel,
  extraBtnCallback,
  cancelCallback,
  confirmCallback,
}: ChamberActionModalProps) => {
  const btnType: { [key: string]: boolean } = {};
  if (positiveBtnType) btnType[positiveBtnType] = true;

  return (
    <Modal
      testId="chamberActionModal"
      open={isOpen}
      onClose={cancelCallback}
      size={ModalSize.S}
      disableBackdropClick
    >
      {isWaiting || isLoading ? (
        <WrapperLoading data-testid="loadingSpinnerModal">
          <WrapperSpinner>
            <Spinner />
            <Spacer height="20px" />
          </WrapperSpinner>
          <Spacer height="16px" />
          {textForWaiting && (
            <>
              <TSpan
                colorToken="--text-modal-neutral-default"
                data-testid="bodyChamberWaitingText"
                font="body-l"
              >
                {textForWaiting}
              </TSpan>
            </>
          )}
        </WrapperLoading>
      ) : (
        <>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody align="center">
            <BodyContent>
              {description ? (
                <TSpan
                  colorToken="--text-modal-neutral-default"
                  font="body-l"
                  textAlign="center"
                  data-testid="description"
                >
                  {description}
                </TSpan>
              ) : (
                body && <>{body}</>
              )}
            </BodyContent>
          </ModalBody>
          <ModalFooter flexDirection="column" gap={16}>
            <Button
              size="full"
              testId="primaryBtn"
              textTestId="primaryBtnLabel"
              onClick={confirmCallback}
              {...btnType}
              {...(positiveBtnIntent ? { intent: positiveBtnIntent } : {})}
            >
              {positiveBtnLabel}
            </Button>
            {extraBtnLabel && extraBtnCallback && (
              <>
                <Button
                  size="full"
                  testId="extraBtn"
                  textTestId="extraBtnLabel"
                  tertiary
                  onClick={extraBtnCallback}
                >
                  {extraBtnLabel}
                </Button>
                <Spacer height="16px" />
              </>
            )}
            <Button
              tertiary
              size="full"
              onClick={cancelCallback}
              testId="secondaryBtn"
              textTestId="secondaryBtnLabel"
            >
              {negativeBtnLabel}
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default ChamberActionModal;
