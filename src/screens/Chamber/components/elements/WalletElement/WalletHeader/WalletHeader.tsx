import {
  forwardRef,
  type Ref,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useParams } from 'react-router';
import * as Sentry from '@sentry/react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType, useToast } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import {
  useCreateCustomerPayeeMutation,
  useGetAccountsLazyQuery,
  useGetCustomerPayeeListLazyQuery,
  useGetSubWalletBalanceLazyQuery,
  useCreateCustomerUnverifiedMutation,
  useGetWalletLazyQuery,
  useCheckWalletExistDetailLazyQuery,
  useCheckWalletExistsLazyQuery,
} from '@/apollo/graphql';
import { TransactionModal } from '@/features/TransactionModal';
import {
  TransactionModalType,
  type TPayee,
} from '@/features/TransactionModal/types';
import { Stack } from '@/layout';
import { breakpointsForNoumLayoutColumn } from '@/constants/devices';
import { NoumenaStatus } from '@/screens/Money/Payments/Wallets/types';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import CloseWallet from '@/screens/Chamber/components/modals/CloseWallet/Modal';
import NonZeroWalletModal from '@/screens/Chamber/components/modals/NonZeroWalletModal/Modal';
import { WalletStatus } from '@/features/money/types';
import { type WalletheaderProps } from './types';
import { Wrapper, ParentWrapper, HeaderButtonsWrapper } from './styles';

export const WalletHeader = forwardRef(
  (
    {
      currentTitle = '',
      refresh,
      canManageWallet,
      subWalletId,
      columnWidth,
      element,
      isEditing,
      spaceId,
    }: WalletheaderProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { space } = useNoumContext();
    const [payeeGneration, setPayeeGeneration] = useState<boolean>(false);
    const [
      createCustomerUnverifiedMutation,
      { loading: createCustomerLoading, error: unverifedCustomerError },
    ] = useCreateCustomerUnverifiedMutation();

    const [createCustomerPayeeMutation] = useCreateCustomerPayeeMutation();
    const [gqlPayee] = useGetCustomerPayeeListLazyQuery({
      fetchPolicy: 'cache-and-network',
    });
    const [gqlAccList] = useGetAccountsLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

    const [checkUserStatus, { loading: checkingStatus }] =
      useGetWalletLazyQuery({
        fetchPolicy: 'cache-and-network',
      });

    const [
      checkSourceDestinationWalletIsValid,
      { loading: walletExistsLoading },
    ] = useCheckWalletExistDetailLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

    const [
      checkNonNoumenaDestinationWallet,
      { loading: nonNoumenaDestinationWalletLoading },
    ] = useCheckWalletExistsLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

    const [checkSourceWallet] = useGetWalletLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

    const device = useDeviceType();
    const isMobile = device === DeviceTypeEnum.MOBILE;
    const { addToast } = useToast();
    const { isUnregistered } = useAuth();

    const isFullHeader = useMemo(
      () => (isMobile || columnWidth! < 475) && !isEditing,
      [columnWidth, isEditing, isMobile],
    );

    useEffect(() => {
      async function createCustomer() {
        try {
          const { data } = await checkUserStatus();
          const status = data?.getWalletBalance?.status;
          if (status === WalletStatus.CUSTOMER_NOT_CREATED) {
            await createCustomerUnverifiedMutation();
          }
        } catch (error) {
          Sentry.captureException(error, {
            tags: {
              section: 'createCustomerPayeeMutationPayeeInNoumena',
            },
          });
          if (error instanceof Error) {
            addToast('error', 'none', `${error.message}`);
          } else {
            addToast('error', 'none', `Unexpected error occured`);
          }
        }
      }
      if (isUnregistered) {
        createCustomer();
      }
    }, [
      addToast,
      checkUserStatus,
      createCustomerUnverifiedMutation,
      isUnregistered,
    ]);

    const [state, setState] = useState<{
      open: boolean;
      modalType: TransactionModalType.TRANSFER | TransactionModalType.PAY;
      defaultFrom: string | undefined;
      defaultTo: string | undefined;
      walletPayee?: TPayee;
    }>({
      open: false,
      modalType: TransactionModalType.PAY,
      defaultFrom: undefined,
      defaultTo: undefined,
    });
    const { id = '' } = useParams();
    const [gqlGetSubWalletBalance] = useGetSubWalletBalanceLazyQuery();

    const canPaymentBeMadeToConnectedNoums = useCallback(async () => {
      let result: boolean = true;
      if (isUnregistered) {
        await checkNonNoumenaDestinationWallet({
          variables: {
            targetUserId: space?.uid?._id || '',
          },
          onError: (err) => {
            if (err instanceof Error) {
              result = false;
              addToast(
                'error',
                'none',
                t('noumena.container.close_subwallet.error_checkwalletquery'),
              );
            }
          },
          onCompleted: (res) => {
            if (!res?.checkWalletExists?.target) {
              addToast(
                'error',
                'none',
                t(`noumena.container.close_subwallet.error_receiver`),
              );
              result = false;
            }
          },
        });
      } else {
        await checkSourceDestinationWalletIsValid({
          variables: {
            sourceUserId: user?._id || '',
            targetUserId: space?.uid?._id || '',
            noumId: id,
          },
          onError: (err) => {
            if (err instanceof Error) {
              result = false;
              addToast(
                'error',
                'none',
                t('noumena.container.close_subwallet.error_checkwalletquery'),
              );
            }
          },
          onCompleted: (res) => {
            if (!res?.checkWalletExistDetail?.sourceWallet) {
              addToast(
                'error',
                'none',
                t(`noumena.container.close_subwallet.error_owner`),
              );
              result = false;
            }
            if (!res?.checkWalletExistDetail?.targetWallet) {
              addToast(
                'error',
                'none',
                t(`noumena.container.close_subwallet.error_receiver`),
              );
              result = false;
            }
          },
        });
      }

      return result;
    }, [
      addToast,
      checkSourceDestinationWalletIsValid,
      checkNonNoumenaDestinationWallet,
      id,
      isUnregistered,
      space?.uid?._id,
      user?._id,
      t,
    ]);

    const handlePaymentForOwner = useCallback(
      async (
        transactionType:
          | TransactionModalType.TRANSFER
          | TransactionModalType.PAY,
      ) => {
        await checkSourceWallet({
          onError: (err) => {
            if (err instanceof Error) {
              addToast(
                'error',
                'none',
                t('noumena.container.close_subwallet.error_checkwalletquery'),
              );
            }
          },
          onCompleted: (res) => {
            if (
              res?.getWalletBalance?.noumenaStatus === NoumenaStatus.APPROVED
            ) {
              setState({
                open: true,
                modalType: transactionType,
                defaultFrom: undefined,
                defaultTo: undefined,
              });
            } else {
              addToast(
                'error',
                'none',
                t(`noumena.container.close_subwallet.error_owner`),
              );
            }
          },
        });
      },
      [addToast, checkSourceWallet, t],
    );

    const handlePayeeGeneration = useCallback(async () => {
      if (isUnregistered && unverifedCustomerError) {
        addToast('error', 'none', 'Failed to create customer');
        return;
      }
      /* if either source or destination wallet is not active
    no need to tgrigger payee generation */
      if (!(await canPaymentBeMadeToConnectedNoums())) {
        return;
      }

      setPayeeGeneration(true);
      const res = await Promise.all([
        gqlGetSubWalletBalance({
          fetchPolicy: 'cache-first',
          variables: {
            chamberId: id,
          },
        }),
        gqlPayee(),
        gqlAccList({
          variables: {
            input: {
              self: true,
              limit: 100,
              page: 1,
            },
          },
        }),
      ]);
      // Wallet is created for the user
      const connectedUserSubwalletData = res[0].data?.getSubWalletBalance;
      const payeeList = res[1].data?.getCustomerPayeeList || [];
      const index = payeeList.findIndex(
        (payee) => payee?.accountId === connectedUserSubwalletData?.id,
      );
      try {
        let response;
        if (index === -1) {
          response = await createCustomerPayeeMutation({
            variables: {
              input: {
                masterWalletId:
                  connectedUserSubwalletData?.masterWalletId || '',
                accountId: connectedUserSubwalletData?.id || '',
              },
            },
          });
        }
        if (!response || response?.data?.createCustomerPayee?.message) {
          setState({
            open: true,
            modalType: TransactionModalType.PAY,
            defaultFrom: isUnregistered ? 'PAY_BY_CARD' : undefined,
            defaultTo: connectedUserSubwalletData?.id || '',
          });
        } else {
          addToast('error', 'none', 'Failed to add payee');
        }
      } catch (error) {
        Sentry.captureException(error, {
          tags: {
            section: 'createCustomerPayeeMutationPayeeInNoumena',
          },
        });
        if (error instanceof Error) {
          addToast('error', 'none', `${error.message}`);
        } else {
          addToast('error', 'none', `Unexpected error occured`);
        }
      }

      setPayeeGeneration(false);
    }, [
      isUnregistered,
      unverifedCustomerError,
      gqlGetSubWalletBalance,
      id,
      gqlPayee,
      gqlAccList,
      addToast,
      createCustomerPayeeMutation,
      canPaymentBeMadeToConnectedNoums,
    ]);

    const defaultPayeeID = canManageWallet ? undefined : state?.defaultTo;

    const [isSubWalletDeleteModal, setIsSubWalletDeleteModal] =
      useState<boolean>(false);
    const [showNonZeroWalletModal, setShowNonZeroWalletModal] =
      useState<boolean>(false);

    const handleCloseSubWalletModal = () => {
      setIsSubWalletDeleteModal(false);
    };

    const handleCloseNonZeroWalletModal = () => {
      setShowNonZeroWalletModal(false);
    };

    const walletTitleMaxWidth = useMemo(
      () =>
        !!columnWidth && columnWidth <= breakpointsForNoumLayoutColumn.BIG_700PX
          ? '70%'
          : 'fit-content',
      [columnWidth],
    );

    return (
      <ParentWrapper>
        <Wrapper ref={ref} flexDirection={isFullHeader ? 'column' : 'row'}>
          <Stack
            fullWidth={!walletTitleMaxWidth}
            maxWidth={walletTitleMaxWidth}
            align="center"
          >
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-body-header-neutral-default"
              overflow="ellipsis"
            >
              {currentTitle}
            </TSpan>
          </Stack>

          {isEditing ? null : (
            <HeaderButtonsWrapper
              gap={8}
              fullWidth={isFullHeader}
              isOwner={canManageWallet}
              isFullHeader={canManageWallet}
            >
              {canManageWallet && (
                <Button
                  secondary
                  size="full_small"
                  primary
                  onClick={() => {
                    handlePaymentForOwner(TransactionModalType.TRANSFER);
                  }}
                >
                  {t(`noumena.subWalletHeader.Transfer`)}
                </Button>
              )}
              <Button
                secondary
                loading={
                  payeeGneration ||
                  createCustomerLoading ||
                  checkingStatus ||
                  walletExistsLoading ||
                  nonNoumenaDestinationWalletLoading
                }
                size="full_small"
                primary
                onClick={() => {
                  if (canManageWallet) {
                    handlePaymentForOwner(TransactionModalType.PAY);
                  } else {
                    handlePayeeGeneration();
                  }
                }}
              >
                {t(`noumena.subWalletHeader.Pay`)}
              </Button>
            </HeaderButtonsWrapper>
          )}
        </Wrapper>
        {state.open && (
          <TransactionModal
            open={state.open}
            handleClose={() => {
              setState({ ...state, open: false });
              refresh?.();
            }}
            type={state.modalType}
            defaultAccountID={canManageWallet ? subWalletId : state.defaultFrom}
            defaultPayeeID={defaultPayeeID}
            defaultWalletPayee={state.walletPayee}
            isDestinationDropdownDisabled={
              !!state.walletPayee || !!defaultPayeeID
            }
            hideToDropdownIcon={isUnregistered}
          />
        )}
        <CloseWallet
          spaceId={spaceId}
          elementId={element._id || ''}
          isOpen={isSubWalletDeleteModal}
          handleClose={handleCloseSubWalletModal}
          setShowNonZeroWalletModal={setShowNonZeroWalletModal}
        />
        <NonZeroWalletModal
          isOpen={showNonZeroWalletModal}
          handleClose={handleCloseNonZeroWalletModal}
        />
      </ParentWrapper>
    );
  },
);
