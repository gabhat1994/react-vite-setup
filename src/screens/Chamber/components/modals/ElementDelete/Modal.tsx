import { memo, useCallback, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';
import { Button } from '@/components/Button';
import {
  WrapperLoading,
  WrapperSpinner,
} from '@/screens/Chamber/components/ElementWrapper/styles';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { useRemoveSubWalletMutation } from '@/apollo/graphql';
import { useRemoveElementHelper } from '@/features/noums/hooks/spaceQuery';

interface ElementDeleteProps {
  spaceId: string;
  elementId: string;
  elementTitle: string;
  isOpen: boolean;
  elementType?: ElementTypeEnum;
  handleClose: (isSuccess?: boolean) => void;
  handleDeleteProps?: () => void;
}

export const ElementDelete = memo((props: ElementDeleteProps) => {
  const { t } = useTranslation();
  const { removeElementHelper, loading } = useRemoveElementHelper();
  const { elementType } = props;

  const modalTitle = useMemo(() => {
    switch (elementType) {
      case ElementTypeEnum.Calendar:
        return t('noumena.container.tool_delete.title');
      default:
        return t(`noumena.container.element_delete.title`);
    }
  }, [elementType, t]);

  const bodyMessage = useMemo(() => {
    switch (elementType) {
      case ElementTypeEnum.Calendar:
        return (
          <Trans
            i18nKey="noumena.container.calendar_delete.body"
            components={{
              b: (
                <TSpan
                  font="body-l"
                  colorToken="--text-modal-neutral-highlighted"
                  textAlign="center"
                />
              ),
            }}
          />
        );
      case ElementTypeEnum.FilesManager:
        return (
          <Trans
            i18nKey="noumena.file_manager.element_delete"
            components={{
              b: (
                <TSpan
                  font="body-l"
                  colorToken="--text-modal-neutral-highlighted"
                />
              ),
            }}
          />
        );
      default:
        return t('noumena.container.element_delete.body', {
          elementTitle: props.elementTitle,
        });
    }
  }, [elementType, props.elementTitle, t]);

  const extraBodyMessage = useMemo(() => {
    switch (elementType) {
      case ElementTypeEnum.Message:
        return t('noumena.chat.edit_mode.delete_confirmation_message');
      case ElementTypeEnum.Calendar:
        return t('noumena.calendar.edit_mode.delete_confirmation_message');
      default:
        return null;
    }
  }, [elementType, t]);

  const [removeSubWalletMutation] = useRemoveSubWalletMutation();

  const handleDelete = useCallback(async () => {
    if (
      Object.prototype.hasOwnProperty.call(props, 'elementType') &&
      elementType === ElementTypeEnum.Wallet
    ) {
      await removeSubWalletMutation({
        variables: {
          chamberId: props.spaceId,
        },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'deleteQuestionMutation',
            },
          });
        },
      });
    }
    const isSuccess = await removeElementHelper(props.spaceId, props.elementId);
    props.handleClose(isSuccess);
  }, [elementType, props, removeElementHelper, removeSubWalletMutation]);

  return (
    <Modal
      isFullScreen={false}
      testId="testElementDelete"
      open={props.isOpen || loading}
      onClose={props.handleClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      {loading ? (
        <WrapperLoading>
          <WrapperSpinner>
            <Spinner />
            <Spacer height="20px" />
          </WrapperSpinner>
          <Spacer height="16px" />
          <TSpan
            data-testid="bodyElementDeleteSaving"
            font="body-l"
            colorToken="--text-modal-neutral-default"
          >
            {t(`noumena.container.element_delete.body.loading`)}
          </TSpan>
        </WrapperLoading>
      ) : (
        <>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalBody align="center">
            <TSpan
              data-testid="bodyElementDelete"
              font="body-l"
              colorToken="--text-modal-neutral-default"
              textAlign="center"
            >
              {bodyMessage}
            </TSpan>
            <Spacer height={12} />
            {extraBodyMessage && (
              <TSpan
                data-testid="extraBodyElementDelete"
                font="body-l"
                colorToken="--text-modal-neutral-default"
                textAlign="center"
              >
                {extraBodyMessage}
              </TSpan>
            )}
          </ModalBody>
          <ModalFooter flexDirection="column" marginTop={12} gap={16}>
            <Button
              data-testid="confirmElementDelete"
              primary
              intent="negative"
              size="full"
              onClick={
                props.handleDeleteProps ? props.handleDeleteProps : handleDelete
              }
            >
              {t(`noumena.container.element_delete`)}
            </Button>
            <Button
              data-testid="cancelElementDelete"
              tertiary
              size="full"
              onClick={() => props.handleClose()}
            >
              {t(`noumena.container.element_delete.cancel`)}
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
});

export default ElementDelete;
