import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useBreakpoints, useToast } from '@/hooks';
import { TSpan } from '@/components/Typography';
import ChamberProfile from '@/assets/images/chamber_default.png';
import { useRemoveAccountMutation } from '@/apollo/graphql/mutations/paymentAccounts.generated';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import convertToCurrency from '@/utils/currencyToCurrency';
import { CurrencyEnum } from '@/apollo/generated/types';
import { Stack } from '@/layout';
import { Button } from '@/components';
import { BankUtil } from '@/features/money/utils/bank';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useRemoveInitiateMicroDepositDwollaMutation } from '@/apollo/graphql';
import { type BankType } from '../types';
import { Container, LeftItem, RightItem, DropdownPicker } from '../styles';
import {
  BankContainer,
  ProfileWarpper,
  Profile,
  BankDetails,
  MenuItem,
  StatusWraper,
  DropDowItemWraper,
} from './styles';
import { VerifyFundingSource } from './VerifyFundingSource';

type ModalType = 'verify_funding_source';

const Bank = (props: BankType) => {
  const { addSuccessIconToast, addErrorToast } = useToast();
  const { isMobile } = useBreakpoints();
  const [gqlRemoveAccountMutation] = useRemoveAccountMutation();
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();
  const { t } = useTranslation();

  const [removeInitiateMicroDepositDwolla] =
    useRemoveInitiateMicroDepositDwollaMutation({
      onCompleted: (res) => {
        if (res.removeInitiateMicroDepositDwolla?.id) {
          addSuccessIconToast(t('noumena.money_details.bank.account_verified'));
          props.refresh();
        }
      },
      onError: (err) => {
        if (err instanceof Error) {
          addErrorToast(err.message);
        }
      },
    });

  const removeAccount = useCallback(
    async (id: string) => {
      await gqlRemoveAccountMutation({
        variables: {
          id,
        },
        onError: (err) => {
          if (err instanceof Error) {
            addErrorToast(t('noumena.money.money-detail.accountUnLinkError'));
          }
        },
        onCompleted: (data) => {
          if (data.removeAccount?.message) {
            addSuccessIconToast(
              t('noumena.money.money-detail.accountUnLinkSuccess'),
            );
            props.refresh();
          }
        },
      });
    },
    [gqlRemoveAccountMutation, addErrorToast, t, addSuccessIconToast, props],
  );

  const verifyBankAccount = () => {
    openModal('verify_funding_source');
  };

  const canUserAddAgain = BankUtil.canUserAddAgain(props?.createdAt);

  const verficationFailedOptions: DropdownValueType<string>[] = [
    {
      key: 'addAgain',
      label: (
        <DropDowItemWraper>
          <TSpan
            font="body-m-bold"
            colorToken={
              canUserAddAgain
                ? '--text-tablecell-header-neutral-highlighted'
                : '--text-tablecell-header-neutral-disabled'
            }
          >
            {t('noumena.money_details.bank.add_account_again')}
          </TSpan>
          {!canUserAddAgain && (
            <TSpan
              font="footnote"
              colorToken="--text-tablecell-body-neutral-default"
            >
              {t('noumena.money_details.bank.add_account_after_48_hours')}
            </TSpan>
          )}
        </DropDowItemWraper>
      ),
      type: 'value',
      value: 'addAgain',
      disabled: !canUserAddAgain,
    },
    {
      key: 'unlink',
      label: (
        <MenuItem
          font="body-m-bold"
          colorToken="--text-tablecell-header-danger-primary-highlighted"
        >
          {t(`noumena.money.money-detail.unlinkAccount`)}
        </MenuItem>
      ),
      type: 'value',
      value: 'unlink',
      disabled: false,
    },
  ];

  const options: DropdownValueType<string>[] = [
    {
      key: 'unlink',
      label: (
        <MenuItem
          font="body-m-bold"
          colorToken="--text-tablecell-header-danger-primary-highlighted"
        >
          {t(`noumena.money.money-detail.unlinkAccount`)}
        </MenuItem>
      ),
      type: 'value',
      value: 'unlink',
    },
  ];

  const hideBalance = BankUtil.shouldHideBalance(
    props?.createdAt,
    props.balance,
  );

  const isPendingVerification = BankUtil.isPendingVerification(props?.status);

  const isVerificationFailed = BankUtil.isVerificationFailed(props?.status);

  const canUserVerify = BankUtil.canUserVerify(props?.status);

  const showDropdown = isVerificationFailed || props.status === 'ACTIVE';

  const isActive =  BankUtil.isActive(props?.status);

  const handleSelction = useCallback(
    (e: DropdownValueType<string>) => {
      if (e.key === 'unlink') {
        removeAccount(props.id);
      } else {
        removeInitiateMicroDepositDwolla({
          variables: {
            id: props.id,
          },
        });
      }
    },
    [props.id, removeAccount, removeInitiateMicroDepositDwolla],
  );

  return (
    <>
      <BankContainer
        isMobile={isMobile}
        hasDottedBorder={!isActive}
      >
        <Container isMobile={false}>
          <LeftItem isMobile={false}>
            <ProfileWarpper>
              <Profile src={ChamberProfile} alt="profile" />
              <BankDetails>
                <TSpan font="footnote" colorToken="--text-card-neutral-default">
                  {t(`noumena.money.money-detail.cardDetail`, {
                    details: `${props.name} ******${props.lastFour}`,
                  })}
                </TSpan>
                {!hideBalance && (
                  <TSpan
                    font="footnote"
                    colorToken="--text-tablecell-body-neutral-default"
                  >
                    {t(`noumena.money.money-detail.availableBalance`, {
                      amount: convertToCurrency(
                        props.balance || 0,
                        CurrencyEnum.Usd,
                        2,
                      ),
                    })}
                  </TSpan>
                )}
              </BankDetails>
            </ProfileWarpper>
          </LeftItem>
          <RightItem isMobile={false}>
            <Stack gap={16} align="center">
              {isVerificationFailed && (
                <StatusWraper isFailed={true}>
                  <TSpan
                    font="footnote-bold"
                    colorToken="--text-badge-danger-secondary-default"
                  >
                    {isMobile
                      ? t(
                          'noumena.money_details.bank.verification_failed_mobile',
                        )
                      : t('noumena.money_details.bank.verification_failed')}
                  </TSpan>
                </StatusWraper>
              )}
              {isPendingVerification && (
                <StatusWraper>
                  <TSpan
                    font="footnote-bold"
                    colorToken="--text-badge-danger-warning-primary"
                  >
                    {isMobile
                      ? t(
                          'noumena.money_details.bank.pending_verifcation_mobile',
                        )
                      : t('noumena.money_details.bank.pending_verifcation')}
                  </TSpan>
                </StatusWraper>
              )}
              {isPendingVerification && !isMobile && (
                <Button
                  size="small"
                  primary
                  disabled={!canUserVerify}
                  onClick={verifyBankAccount}
                >
                  {t('noumena.verify_account')}
                </Button>
              )}
              {showDropdown && (
                <Dropdown
                  hideIcons
                  options={
                    isVerificationFailed ? verficationFailedOptions : options
                  }
                  usePortal={true}
                  containerWidth="200px"
                  onSelectOption={handleSelction}
                  placement="auto-start"
                  calRefTop={false}
                  usePopStyle={true}
                >
                  {({
                    targetProps,
                    targetRef,
                    toggle,
                  }: DropdownTargetProps<HTMLDivElement>) => (
                    <>
                      <DropdownPicker
                        ref={targetRef}
                        {...targetProps}
                        onClick={toggle}
                      >
                        <Icon
                          name="more_m"
                          color="--icon-button-neutral-default"
                          size={24}
                        />
                      </DropdownPicker>
                    </>
                  )}
                </Dropdown>
              )}
            </Stack>
          </RightItem>
        </Container>
        {isPendingVerification && !isMobile && (
          <TSpan font="footnote" colorToken="--text-card-neutral-default">
            {!canUserVerify
              ? t('noumena.money_details.bank.pending_verfication_status1')
              : t('noumena.money_details.bank.pending_verfication_status2')}
          </TSpan>
        )}
        {isPendingVerification && isMobile && (
          <Stack gap={8} vertical>
            <TSpan font="footnote" colorToken="--text-card-neutral-default">
              {!canUserVerify
                ? t('noumena.money_details.bank.pending_verfication_status1')
                : t('noumena.money_details.bank.pending_verfication_status2')}
            </TSpan>
            <Button
              size="full_small"
              primary
              disabled={!canUserVerify}
              onClick={verifyBankAccount}
            >
              {t('noumena.verify_account')}
            </Button>
          </Stack>
        )}
      </BankContainer>
      {modalType === 'verify_funding_source' && (
        <VerifyFundingSource
          open={modalType === 'verify_funding_source'}
          onClose={closeModal}
          bankAccountId={props.id}
          refresh={props.refresh}
        />
      )}
    </>
  );
};

export default Bank;
