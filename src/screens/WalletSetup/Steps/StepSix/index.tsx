import { type FC, useState, useCallback, useContext } from 'react';
import * as Sentry from '@sentry/react';
import { useTranslation } from 'react-i18next';
import {
  useCheckPassCodeExistsQuery,
  useCreateWalletMutation,
} from '@/apollo/graphql';
import { DeviceTypeEnum, useDeviceType, useToast } from '@/hooks';
import { Spinner } from '@/components/Spinner';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import { Modal } from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { LINKS } from '@/constants/links';
import EVENTS from '@/constants/trackingEvents';
import { trackEvent } from '@/utils/tracking';
import {
  FormText,
  FormWrapper,
  FormTerms,
  FormLink,
  FormLinkText,
  FormHelperText,
} from '../styles';
import { ModalContent, ModalSpinner } from './styles';
import { SetupWalletContext } from '../../context';

const FormTermsAndAgreement: FC = () => {
  const { data: passCodeData, loading: passCodeCheckLoading } =
    useCheckPassCodeExistsQuery({
      fetchPolicy: 'cache-and-network',
    });
  const { handleNextStep, handlePreviousStep, setState, payLoad } =
    useContext(SetupWalletContext);

  const isPassCodeExist = !!passCodeData?.checkPassCodeExists;

  const { t } = useTranslation();
  const { addToast } = useToast();

  const [checkedOne, setCheckedOne] = useState<boolean>(false);
  const [checkedTwo, setCheckedTwo] = useState<boolean>(false);
  const [createWalletMutation, { loading }] = useCreateWalletMutation({
    onCompleted: () => {
      trackEvent(EVENTS.SETUP_WALLET.MASTER_WALLET_CREATE_REQUESTED);
    },
  });
  const deviceType = useDeviceType();
  const getFirstTerm = useCallback(
    () => (
      <FormTerms font="body-m">
        {`${t('noumena.money.setupWallet.terms.i_agree_to_the_text')} `}
        <FormLink href={LINKS.PRIVACY} target="_blank">
          <FormLinkText
            font="body-m-bold"
            colorToken="--text-skillbadge-brand-primary-selected"
          >
            {t('noumena.money.setupWallet.terms.privacy_policy')}
          </FormLinkText>
        </FormLink>
        {` ${t('noumena.and')} `}
        <FormLink href={LINKS.TERMS} target="_blank">
          <FormLinkText
            font="body-m-bold"
            colorToken="--text-skillbadge-brand-primary-selected"
          >
            {t('noumena.money.setupWallet.terms.terms_services')}
          </FormLinkText>
        </FormLink>
        {` ${t('noumena.asWellAsOurPartner')} `}
        <FormLink href={LINKS.DWOLLA_TERMS} target="_blank">
          <FormLinkText
            font="body-m-bold"
            colorToken="--text-skillbadge-brand-primary-selected"
          >
            {t('noumena.money.setupWallet.terms.dwolla.terms_services')}
          </FormLinkText>
        </FormLink>
        {` ${t('noumena.and')} `}
        <FormLink href={LINKS.DWOLLA_PRIVACY} target="_blank">
          <FormLinkText
            font="body-m-bold"
            colorToken="--text-skillbadge-brand-primary-selected"
          >
            {t('noumena.money.setupWallet.terms.dwolla.privacy')}
          </FormLinkText>
        </FormLink>
      </FormTerms>
    ),
    [t],
  );
  const getSecondTerm = useCallback(
    () => (
      <FormTerms font="body-m" colorToken="--text-body-header-neutral-default">
        {`${t('noumena.money.setupWallet.terms.i_agree_to_the_text')} `}
        <FormLink href={LINKS.CONSENT_ELECTRONIC_DISCLOSURE} target="_blank">
          <FormLinkText
            font="body-m-bold"
            colorToken="--text-skillbadge-brand-primary-selected"
          >
            {t('noumena.money.setupWallet.terms.electronic.consent')}
          </FormLinkText>
        </FormLink>
      </FormTerms>
    ),
    [t],
  );

  const handleCreateAccount = useCallback(async () => {
    const payloadCopy = {
      ...payLoad,
      dateOfBirth:
        typeof payLoad.dateOfBirth === 'number'
          ? String(payLoad.dateOfBirth)
          : payLoad.dateOfBirth,
    };
    delete payloadCopy.citizenship;
    delete payloadCopy.street;
    delete payloadCopy.apartment;
    try {
      await createWalletMutation({
        variables: {
          input: payloadCopy,
        },
      });
      handleNextStep();
    } catch (error: unknown) {
      Sentry.captureException(error, {
        tags: {
          section: 'createWalletSetupWallet',
        },
      });
      if (error instanceof Error) {
        if (error.message.includes('Address1')) {
          const updatedError = error.message.replaceAll(
            'Address1',
            'Street or apartment',
          );
          addToast('error', 'none', updatedError);
        }
        addToast('error', 'none', `${error.message}`);
      } else {
        addToast('error', 'none', ` Unable to create wallet try again`);
      }
    }
  }, [createWalletMutation, handleNextStep, payLoad, addToast]);

  return (
    <FormWrapper
      style={
        deviceType === DeviceTypeEnum.MOBILE
          ? { paddingBottom: '16px' }
          : undefined
      }
    >
      <FormText
        font="heading-s-bold"
        colorToken="--text-body-header-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.setupWallet.terms.text')}
      </FormText>
      <Spacer height={16} />
      <FormTerms font="body-m" colorToken="--text-body-header-neutral-default">
        {t('noumena.money.setupWallet.terms.paragraph_one')}
      </FormTerms>
      <Spacer height={16} />
      <FormTerms font="body-m" colorToken="--text-body-header-neutral-default">
        {t('noumena.money.setupWallet.terms.paragraph_two')}
      </FormTerms>
      <Spacer height={16} />
      <FormTerms font="body-m" colorToken="--text-body-header-neutral-default">
        {t('noumena.money.setupWallet.terms.paragraph_three')}
      </FormTerms>
      <Spacer height={16} />
      <Stack gap={10} justify="flex-start">
        <Checkbox
          data-testid="check-box-one"
          isChecked={checkedOne}
          onChange={(val) => setCheckedOne(val)}
          icon={
            <Icon
              name="tick_m"
              size={23.5}
              color="--icon-checkbox-neutral-alt-default"
            />
          }
        />
        {getFirstTerm()}
      </Stack>
      <Spacer height={16} />
      <Stack gap={10} justify="flex-start" fullWidth>
        <Checkbox
          data-testid="check-box-two"
          isChecked={checkedTwo}
          onChange={(val) => setCheckedTwo(val)}
          icon={
            <Icon
              name="tick_m"
              size={23.5}
              color="--icon-checkbox-neutral-alt-default"
            />
          }
        />
        {getSecondTerm()}
      </Stack>
      <Spacer height={32} />
      <Stack
        fullWidth
        style={{
          justifyContent: 'space-between',
          gap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Button
          data-testid="step-six-back-button"
          type="button"
          loading={passCodeCheckLoading}
          disabled={passCodeCheckLoading}
          style={
            deviceType === DeviceTypeEnum.MOBILE
              ? { width: '102px' }
              : undefined
          }
          size={deviceType !== DeviceTypeEnum.MOBILE ? 'large' : undefined}
          onClick={() => {
            if (isPassCodeExist) {
              setState(3);
            } else {
              handlePreviousStep();
            }
          }}
          leftIcon={
            <Icon
              name="arrow_left_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
        >
          {t('noumena.back.text')}
        </Button>
        <Button
          data-testid="step-six-submit-button"
          primary
          size={deviceType !== DeviceTypeEnum.MOBILE ? 'full' : undefined}
          style={
            deviceType === DeviceTypeEnum.MOBILE
              ? { width: '226px' }
              : undefined
          }
          onClick={handleCreateAccount}
          disabled={!checkedOne || !checkedTwo}
        >
          {t('noumena.agree_apply.text')}
        </Button>
      </Stack>
      <Modal
        isFullScreen={false}
        disableBackdropClick
        disableEscapeKeyDown
        open={loading}
      >
        <ModalContent vertical align="center" justify="flex-start">
          <ModalSpinner>
            <Spinner />
          </ModalSpinner>
          <FormHelperText
            font="body-l"
            colorToken="--text-body-neutral-default"
            textAlign="center"
          >
            {t('noumena.money.setupWallet.terms.creating.account')}
          </FormHelperText>
        </ModalContent>
      </Modal>
    </FormWrapper>
  );
};
export default FormTermsAndAgreement;
