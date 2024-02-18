import {
  type FC,
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { t } from 'i18next';
import generate from 'uniqid';
import {
  Dropdown,
  type DropdownHeaderType,
  type DropdownValueType,
} from '@/components/Dropdown';
import { AccountType } from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { ModalFooter, ModalSize } from '@/components/ExtendedModal';
import { UserUtil } from '@/utils/user';
import { isCustomerPayeeItem } from '@/features/TransactionModal/helpers';
import { cleanList } from '@/utils/list';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import SelectedAccount from '../../SelectedAccount/SelectedAccount';
import { Payee, TipPayee } from '../../Payee';
import Input from '../../Input/Input';
import { Label, ModalContent } from '../../styles';
import PayByCard from '../../PayByCard';
import {
  ComponentStates,
  type TAccount,
  type TPayByCard,
  type TPayee,
  TransactionModalType,
} from '../../../types';
import AddPayeeCard from '../../DropdownHeaders/AddPayeeCard';
import AddAccountCard from '../../DropdownHeaders/AddAccountCard';

const PaymentSelect: FC = () => {
  const [isFromDropDowmOpen, setIsFromDropDownOpen] = useState<boolean>(false);
  const [isToDropDownOpen, setIsToDropDownOpen] = useState<boolean>(false);
  const {
    source,
    destination,
    setSource,
    setDestination,
    fromList,
    toList,
    defaultPayeeID,
    isDestinationDropdownDisabled,
    predefinedPayeeList,
  } = useContext(PaymentDataContext);

  const {
    type,
    setPaymentState,
    handleForwardStateChange,
    isMobile,
    disableFromDropDown,
    hideToDropdownIcon,
    hideFromDropdownIcon,
    setModalSize,
  } = useContext(PaymentStateContext);

  const isSourceCard = source === 'PAY_BY_CARD';
  const isSourceWallet =
    !isSourceCard && source?.accountType === AccountType.Wallet;

  const payByCardFooter: DropdownValueType<TPayByCard>[] = [
    {
      key: generate(),
      label: (
        <Stack>
          <PayByCard />
        </Stack>
      ),
      type: 'value',
      value: 'PAY_BY_CARD',
    },
  ];

  const addPayeeHeader: DropdownHeaderType[] = cleanList([
    !predefinedPayeeList?.length
      ? {
          label: (
            <Stack fullWidth>
              <AddPayeeCard
                handleAddPayee={() => {
                  setPaymentState(ComponentStates.PAYMENT_ADD_PAYEE);
                }}
              />
            </Stack>
          ),
          type: 'header',
        }
      : undefined,
  ]);

  const addAccountHeader: DropdownHeaderType[] = [
    {
      label: (
        <Stack fullWidth>
          <AddAccountCard
            handleAddAccount={() => {
              setModalSize(ModalSize.L);
              setPaymentState(ComponentStates.PAYMENT_SET_UP_PIN);
            }}
          />
        </Stack>
      ),
      type: 'header',
    },
  ];

  const getWallets = useCallback(
    (list: DropdownValueType<TAccount | TPayee>[]) =>
      list?.filter(
        (_acc) =>
          _acc.value.accountType === AccountType.Wallet ||
          _acc.value.accountType === AccountType.SubWallet,
      ),
    [],
  );

  const getWalletFromId = useCallback(
    (list: DropdownValueType<TPayee>[] | null) => {
      const filteredList = list?.filter((_acc) => {
        if (isCustomerPayeeItem(destination)) {
          return (
            isCustomerPayeeItem(_acc?.value) &&
            _acc?.value?.accountId === destination?.accountId
          );
        }
        return true;
      });
      return filteredList || [];
    },
    [destination],
  );

  const getWalletAndBanks = useCallback(
    (list: DropdownValueType<TAccount>[] | null) =>
      list?.filter((_acc) => {
        if (!isSourceCard) {
          return (
            (_acc.value.accountType === AccountType.Wallet &&
              _acc.value.id !== source.id) ||
            _acc.value.accountType === AccountType.Bank
          );
        }
        return true;
      }) || [],
    [isSourceCard, source],
  );

  const transferDropDownList = useMemo(() => {
    if (type !== TransactionModalType.TRANSFER) return null;
    let list = getWallets(fromList as DropdownValueType<TAccount>[]);
    if (isSourceWallet) {
      list = getWalletAndBanks(fromList as DropdownValueType<TAccount>[]);
    }
    return list;
  }, [fromList, getWalletAndBanks, getWallets, isSourceWallet, type]);

  const payementDropDownList = useMemo(() => {
    if (type !== TransactionModalType.PAY) return null;
    let list = getWallets(toList as DropdownValueType<TPayee>[]);
    if (isSourceWallet) {
      list = getWalletAndBanks(toList as DropdownValueType<TAccount>[]);
    }
    if (defaultPayeeID) {
      list = getWalletFromId(toList as DropdownValueType<TPayee>[]);
    }
    return list;
  }, [
    type,
    getWallets,
    toList,
    isSourceWallet,
    defaultPayeeID,
    getWalletAndBanks,
    getWalletFromId,
  ]);

  return (
    <Fragment>
      <ModalContent hasSingleButton>
        {type !== TransactionModalType.TIP && (
          <Stack fullWidth vertical align="center" justify="center">
            <TSpan
              colorToken="--text-modal-neutral-default"
              font="footnote-bold"
              textAlign="center"
            >
              {type === TransactionModalType.TRANSFER
                ? t('noumena.money.transer.subheading')
                : t('noumena.money.pay.subheading')}
            </TSpan>
          </Stack>
        )}
        <Spacer height={24} />
        <Label font="body-l" colorToken="--text-input-neutral-default">
          {t('noumena.money.money.select.from')}
        </Label>
        <Spacer height={8} />
        <Stack fullWidth>
          <Dropdown
            expandingDrillDown
            containerWidth={isMobile ? '100%' : '400px'}
            options={fromList}
            placement="bottom-start"
            stickyHeaderOptions={addAccountHeader}
            showHeaderDivider={false}
            stickyFooterOptions={payByCardFooter}
            showFooterDivider={false}
            onSelectOption={(option) => {
              const typedOption = option as DropdownValueType<TAccount>;
              setSource(typedOption.value);
              if (
                type !== TransactionModalType.TIP &&
                !isDestinationDropdownDisabled
              ) {
                setDestination(null);
              }
            }}
            onClose={() => {
              setIsFromDropDownOpen(false);
            }}
            onOpen={() => setIsFromDropDownOpen(true)}
            hideIcons
            dropdownItemStyle={{ padding: '1px 0px', opacity :1 }}
            disabled={disableFromDropDown}
          >
            {({ inputRef, toggle }) => (
              <Input
                hideDropDwonIcon={hideFromDropdownIcon}
                open={isFromDropDowmOpen}
                content={
                  isSourceCard ? (
                    <PayByCard selected />
                  ) : source ? (
                    <SelectedAccount account={source} />
                  ) : undefined
                }
                inpRef={inputRef}
                toggle={toggle}
              />
            )}
          </Dropdown>
        </Stack>
        <Spacer height={24} />
        <Label font="body-l" colorToken="--text-input-neutral-default">
          {t('noumena.money.money.select.to')}
        </Label>
        <Spacer height={8} />
        <Stack fullWidth>
          {type !== TransactionModalType.TIP ? (
            <Dropdown
              expandingDrillDown
              containerWidth={isMobile ? '100%' : '400px'}
              options={
                transferDropDownList || payementDropDownList || toList || []
              }
              placement="bottom-start"
              stickyHeaderOptions={addPayeeHeader}
              showHeaderDivider={false}
              onSelectOption={(option) => {
                const typedOption = option as DropdownValueType<
                  TPayee | TAccount
                >;
                setDestination(typedOption.value);
              }}
              onClose={() => {
                setIsToDropDownOpen(false);
              }}
              onOpen={() => setIsToDropDownOpen(true)}
              hideIcons
              dropdownItemStyle={{ padding: '1px 0px',  opacity :1 }}
              disabled={!!isDestinationDropdownDisabled}
            >
              {({ inputRef, toggle }) => (
                <Input
                  hideDropDwonIcon={
                    !!isDestinationDropdownDisabled || hideToDropdownIcon
                  }
                  open={isToDropDownOpen}
                  placeHolder={
                    type === TransactionModalType.TRANSFER
                      ? t('noumena.money.payment.transfer.placeholder')
                      : t('noumena.money.payment.payee.placeholder')
                  }
                  content={
                    destination ? (
                      <Payee payee={destination} selected />
                    ) : undefined
                  }
                  inpRef={inputRef}
                  toggle={toggle}
                />
              )}
            </Dropdown>
          ) : (
            destination?.__typename === 'AnswerOutput' && (
              <TipPayee
                selected
                customerName={UserUtil.renderFullName(destination.user)}
                customerAvatar={destination.user?.profile?.profilePicture}
              />
            )
          )}
        </Stack>
      </ModalContent>
      <ModalFooter>
        <Button
          primary
          size="full"
          disabled={!(Boolean(source) && Boolean(destination))}
          onClick={handleForwardStateChange}
        >
          {t('noumena.continue')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};
export default PaymentSelect;
