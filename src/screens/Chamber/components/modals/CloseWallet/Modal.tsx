import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import {
  WrapperLoading,
  CloseWalletWrapperModalChildren,
  WrapperSpinner,
} from '@/screens/Chamber/components/ElementWrapper/styles';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import { useGetSubWalletBalanceLazyQuery } from '@/apollo/graphql';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalSize,
} from '@/components/ExtendedModal';
import { useRemoveElementHelper } from '@/features/noums/hooks/spaceQuery';

interface CloseWalletProps {
  spaceId: string;
  elementId: string;
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  setShowNonZeroWalletModal: Function;
}

export const CloseWallet = memo((props: CloseWalletProps) => {
  const { t } = useTranslation();
  const [subwalletClosed, setSubWalletClosed] = useState<boolean>(false);
  const [gqlGetSubWalletBalance] = useGetSubWalletBalanceLazyQuery();
  const { removeElementHelper, loading } = useRemoveElementHelper();
  const handleDelete = useCallback(async () => {
    const isSuccess = await removeElementHelper(props.spaceId, props.elementId);
    props.handleClose(isSuccess);
    setSubWalletClosed(false);
  }, [props, removeElementHelper]);

  const handleCloseWallet = useCallback(async () => {
    const res = await gqlGetSubWalletBalance({
      fetchPolicy: 'network-only',
      variables: {
        chamberId: props.spaceId,
      },
    });
    const value = res.data?.getSubWalletBalance?.amount?.value;
    if (value === 0.0 || 0.0 || 0) {
      setSubWalletClosed(true);
    } else {
      props.handleClose();
      props.setShowNonZeroWalletModal(true);
    }
  }, [gqlGetSubWalletBalance, props]);

  return (
    <Modal
      testId="testCloseWallet"
      open={props.isOpen || loading}
      onClose={props.handleClose}
      disableBackdropClick={true}
      size={ModalSize.S}
    >
      {loading ? (
        <WrapperLoading>
          <WrapperSpinner>
            <Spinner />
            <Spacer height="20px" />
          </WrapperSpinner>
          <Spacer height="16px" />
          <TSpan
            colorToken="--text-modal-neutral-default"
            data-testid="bodyElementDeleteSaving"
            font="body-l"
          >
            {t(`noumena.container.element_delete.body.loading`)}
          </TSpan>
        </WrapperLoading>
      ) : (
        <CloseWalletWrapperModalChildren>
          {subwalletClosed ? (
            <>
              <ModalHeader>
                {t(`noumena.container.close_subWallet.noumwalletclosed`)}
              </ModalHeader>

              <ModalBody align="center">
                <Icon name="success_cq_xxxl" size={96} />
              </ModalBody>

              <ModalFooter flexDirection="column" gap={16}>
                <Button
                  data-testid="cancel1CloseWallet"
                  primary
                  size="full"
                  onClick={() => handleDelete()}
                >
                  {t(`noumena.container.close_subwallet.close`)}
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader>
                {t(`noumena.container.close_subWallet.title`)}
              </ModalHeader>
              <ModalBody>
                <TSpan font="body-l" colorToken="--text-modal-neutral-default">
                  {t(`noumena.container.close_subwallet.walletDeleteText`)}
                </TSpan>
              </ModalBody>
              <ModalFooter flexDirection="column" gap={16}>
                <Button
                  data-testid="confirmCloseWallet"
                  primary
                  size="full"
                  onClick={() => handleCloseWallet()}
                >
                  {t(`noumena.container.close_subwallet.Continue`)}
                </Button>
                <Button
                  data-testid="cancelCloseWallet"
                  tertiary
                  size="full"
                  onClick={() => props.handleClose()}
                >
                  {t(`noumena.container.close_subwallet.Cancel`)}
                </Button>
              </ModalFooter>
            </>
          )}
        </CloseWalletWrapperModalChildren>
      )}
    </Modal>
  );
});

export default CloseWallet;
