import { usePlaidLink } from 'react-plaid-link';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import * as Sentry from '@sentry/react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import { useCreateAccountDwollaMutation } from '@/apollo/graphql/mutations/paymentAccounts.generated';
import { useBreakpoints, useToast } from '@/hooks';
import { LINKS } from '@/constants/links';
import * as Styles from './styles';

const Plaid = (props: {
  open: boolean;
  onClose: () => void;
  plaidToken: string;
  refresh: () => void;
  accountNotFound: () => void;
}) => {
  const { addToast } = useToast();
  const { isMobile } = useBreakpoints();
  const [gqlCreateAccountDwolla] = useCreateAccountDwollaMutation();
  const { t } = useTranslation();

  const onExit = useCallback(async () => {
    props.onClose();
    props.accountNotFound();
  }, [props]);

  const onSubmit = useCallback(
    async (token: string) => {
      if (token) {
        props.onClose();
        try {
          const res = await gqlCreateAccountDwolla({
            variables: {
              plaidToken: token as string,
            },
          });
          if (res.errors)
            addToast(
              'error',
              'none',
              t('noumena.money.money-detail.accountLinkError'),
            );
          else
            addToast(
              'success',
              'none',
              t('noumena.money.money-detail.accountLinkSuccess'),
            );
          props.refresh();
        } catch (error: unknown) {
          Sentry.captureException(error, {
            tags: {
              section: 'linkPlaidAccount',
            },
          });
          if (error instanceof Error) {
            addToast('error', 'none', `${error.message}`);
          } else {
            addToast(
              'error',
              'none',
              t('noumena.money.money-detail.accountLinkError'),
            );
          }
        }
      }
    },
    [gqlCreateAccountDwolla, props, addToast, t],
  );
  const plaidOption = useMemo(
    () => ({ token: props.plaidToken, onSuccess: onSubmit, onExit }),
    [props.plaidToken, onSubmit, onExit],
  );

  const { open, ready } = usePlaidLink(plaidOption);

  const handleLinkNavigation = () => {
    window.open(LINKS.HOW_PLAID_WORKS, '_blank');
  };

  return (
    <Modal
      isFullScreen={false}
      enableCloseButton
      style={{ width: isMobile ? 327 : 654 }}
      disableBackdropClick
      disableEscapeKeyDown
      closeButtonStyles={{ tertiary: true, enforceRight: true }}
      onClose={() => props.onClose()}
      open={props.open}
    >
      <ModalHeader isFullScreen={false}>
        {t(`noumena.money.money-detail.addAccount`)}
      </ModalHeader>
      <ModalBody isFullScreen={false} align="center">
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-modal-header-neutral-default"
          textAlign="center"
        >
          {t(`noumena.money.money-detail.Great`)}
        </TSpan>
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-modal-header-neutral-default"
          textAlign="center"
        >
          {t(`noumena.money.money-detail.connectAccountsAndWallet`)}
        </TSpan>
        <Spacer height={20} />
        <Styles.HelperText
          font="body-m"
          colorToken="--text-modal-neutral-default"
        >
          {t(`noumena.money.money-detail.helperText1`)}
        </Styles.HelperText>
        <Spacer height={20} />
        <Styles.HelperText
          font="body-m"
          colorToken="--text-modal-neutral-default"
        >
          {t(`noumena.money.money-detail.helperText2`)}
        </Styles.HelperText>
        <Spacer height={20} />
        <TSpan
          font="link-m"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
          cursor="pointer"
          onClick={handleLinkNavigation}
        >
          {t(`noumena.money.money-detail.howPalidWorkd`)}
        </TSpan>
      </ModalBody>
      <ModalFooter isFullScreen={false}>
        <Button
          disabled={!ready}
          size="full"
          primary
          onClick={() => {
            if (ready && open) {
              open();
            }
          }}
        >
          {t(`noumena.money.money-detail.Continue`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Plaid;
