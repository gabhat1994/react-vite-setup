import {
  forwardRef,
  type Ref,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Stack } from '@/layout';
import {
  useSubWalletAccounts,
  useTransactionHistory,
} from '@/features/money/hooks';
import { TransactionCardUtil, TransactionUtil } from '@/features/money/utils';
import { TSpan } from '@/components/Typography/Typography';
import {
  ElementStatusEnum,
  PaymentAccountTypeEnum,
  PermissibleElementType,
  type PaymentFilter,
} from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import {
  useGetConnectedChamberPaymentsQuery,
  useGetSubWalletBalanceQuery,
} from '@/apollo/graphql';
import SkeletonLoaderWalletElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderWalletElement';
import { format } from 'date-fns';
import { useAuth } from '@/features/auth/contexts';
import { cleanList } from '@/utils/list';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import TransactionWindow from './TransactionWindow';
import WalletHeader from './WalletHeader';
import {
  BodyWrapper,
  WrapperChildContainer,
  LinkButton,
  WrapperRecentTransactions,
  TransactionHeading,
  SeeAllButton,
  ViewModeWrapper,
  HeaderWrapper,
  MainWrapper,
  Wrapper,
  TransactionListsContainer,
} from './styles';
import { type WalletElementProps } from './types';

export const WalletElementViewMode = forwardRef(
  (props: WalletElementProps, ref: Ref<HTMLDivElement>) => {
    const { spaceId, currentTitle, element, isOwner, isEditing } = props;
    const { isUnregistered, user } = useAuth();
    const { space } = useNoumContext();
    const { connectionRole } = useNoumUserConnectionContext();
    const { id = '' } = useParams();
    const [filter, setFilter] = useState<PaymentFilter>({});
    const date = useRef<string>(format(new Date(), 'yyyy-MM-dd'));

    const [showConnectedNoumtransactions, setShowConnectedNoumtransactions] =
      useState<boolean>(false);

    const { t } = useTranslation();
    const { subWalletData, refetch: refreshBalance } = useSubWalletAccounts(
      spaceId,
      element?.status!,
    );
    const { hasElementPermission } = useNoumAuthorization();
    const favouriteConnected = connectionRole === 'FAVORITE';

    const canManageWallet = hasElementPermission(
      PermissibleElementType.Payment,
      'manage-wallet',
      isOwner,
    );

    const { data } = useGetSubWalletBalanceQuery({
      variables: {
        chamberId: space?._id || '',
      },
      skip: canManageWallet || !favouriteConnected,
    });
    const connectedNoumSubWallet = data?.getSubWalletBalance?.id ?? undefined;
    const favouriteConnectedBalance = data?.getSubWalletBalance?.amount;

    const {
      data: connectedChamberPaymentsData,
      refetch: refreshConnectedUserTransactionList,
    } = useGetConnectedChamberPaymentsQuery({
      variables: {
        filter: {
          chamberId: id || '',
          userId: space?.uid?._id || '',
          endDate: date.current,
          startDate: '',
          accountId: connectedNoumSubWallet,
          accountType: [PaymentAccountTypeEnum.SubWallet],
        },
        limit: 2,
        page: 1,
      },
      skip: canManageWallet || isUnregistered,
    });

    const transactionsData = useMemo(
      () =>
        cleanList(
          connectedChamberPaymentsData?.getConnectedChamberPayments?.data,
        ),
      [connectedChamberPaymentsData?.getConnectedChamberPayments?.data],
    );

    const connectedNoumTransactions = useMemo(
      () =>
        TransactionUtil.getAllTransactions({
          transactionsData,
          loggedInUserId: user?._id || '',
        }),
      [transactionsData, user?._id],
    );

    useEffect(() => {
      if (subWalletData?.id) {
        setFilter({
          endDate: date.current,
          startDate: '',
          accountId: `${subWalletData.id}`,
          accountType: [PaymentAccountTypeEnum.SubWallet],
        });
      }
    }, [subWalletData.id]);

    const {
      data: { transactions },
      handlers: { refetch },
    } = useTransactionHistory({
      filter,
      limit: 2,
      page: 1,
      skipQuery:
        !canManageWallet ||
        (isEditing && element.status !== ElementStatusEnum.Published),
    });

    const navigate = useNavigate();

    const handleNavigation = useCallback(async () => {
      if (isEditing) return;
      if (canManageWallet) {
        navigate(
          `/view-transactions/${PaymentAccountTypeEnum.SubWallet}/${subWalletData.id}`,
        );
      } else {
        setShowConnectedNoumtransactions(true);
      }
    }, [isEditing, canManageWallet, navigate, subWalletData.id]);

    const closeTransactionWindowForConnectedNoum = useCallback(() => {
      setShowConnectedNoumtransactions(false);
    }, []);

    if (subWalletData?.loading) {
      return <SkeletonLoaderWalletElement />;
    }

    return (
      <Wrapper data-testid="mew-wrapper" ref={ref} id={element._id || ''}>
        <MainWrapper data-testid="mew-main-wrapper">
          <HeaderWrapper isElement>
            <WalletHeader
              {...props}
              subWalletId={subWalletData.id || ''}
              spaceId={spaceId}
              currentTitle={currentTitle}
              refresh={() => {
                refreshBalance();
                if (canManageWallet) {
                  refetch();
                } else {
                  refreshConnectedUserTransactionList();
                }
              }}
              canManageWallet={canManageWallet}
            />
          </HeaderWrapper>
          {!subWalletData.loading && (
            <BodyWrapper>
              <WrapperChildContainer isRegistered={!isUnregistered}>
                {(canManageWallet || favouriteConnected) && (
                  <ViewModeWrapper>
                    <TSpan
                      font="footnote"
                      colorToken="--text-card-neutral-default"
                    >
                      {t(
                        'noumena.container.close_subwallet.view_availablebanlance',
                      )}
                    </TSpan>
                    <TSpan
                      font="heading-s"
                      colorToken="--text-card-neutral-highlighted"
                    >
                      {canManageWallet
                        ? convertToCurrency(
                            Number(subWalletData.subWalletBalance?.value),
                            subWalletData?.subWalletBalance?.currency!,
                            2,
                          )
                        : favouriteConnected
                        ? convertToCurrency(
                            Number(favouriteConnectedBalance?.value),
                            favouriteConnectedBalance?.currency!,
                            2,
                          )
                        : null}
                    </TSpan>
                    {props.isEditing &&
                      element.status !== ElementStatusEnum.Published && (
                        <TSpan
                          font="footnote"
                          colorToken="--text-card-neutral-default"
                        >
                          {t('noumena.editor.wallet.publish_description')}
                        </TSpan>
                      )}
                  </ViewModeWrapper>
                )}
              </WrapperChildContainer>
              {!isUnregistered && (
                <WrapperRecentTransactions>
                  <Stack fullWidth padding="0 16px">
                    <TransactionHeading
                      font="body-m-bold"
                      colorToken="--text-card-neutral-default"
                    >
                      {t(
                        'noumena.container.close_subwallet.view_recentTransactions',
                      )}
                    </TransactionHeading>
                  </Stack>
                  <TransactionListsContainer vertical>
                    {canManageWallet
                      ? transactions?.map((transaction) =>
                          TransactionCardUtil.getTransactionCardComponent(
                            transaction.context,
                            transaction,
                          ),
                        )
                      : !!connectedNoumTransactions.length &&
                        connectedNoumTransactions.map((transaction) =>
                          TransactionCardUtil.getTransactionCardComponent(
                            transaction.context,
                            transaction,
                          ),
                        )}
                  </TransactionListsContainer>
                  {transactions.length === 0 && canManageWallet && (
                    <SeeAllButton
                      textAlign="center"
                      style={{ padding: '0 16px' }}
                    >
                      <TSpan
                        font="footnote"
                        colorToken="--text-placeholder-neutral-default"
                      >
                        {t('noumena.editor.wallet.no_transactions')}
                      </TSpan>
                    </SeeAllButton>
                  )}
                  {connectedNoumTransactions.length === 0 && !canManageWallet && (
                    <SeeAllButton
                      textAlign="center"
                      style={{ padding: '0 16px' }}
                    >
                      <TSpan
                        font="footnote"
                        colorToken="--text-placeholder-neutral-default"
                      >
                        {t('noumena.editor.wallet.no_transactions')}
                      </TSpan>
                    </SeeAllButton>
                  )}
                  {(!!transactions.length ||
                    !!connectedNoumTransactions.length) && (
                    <Stack
                      fullWidth
                      justify="center"
                      padding="16px 0px 0px 0px"
                    >
                      <LinkButton
                        onClick={() => handleNavigation()}
                        disabled={isEditing}
                      >
                        {t('noumena.container.subwallet.seeAllTransactions')}
                      </LinkButton>
                    </Stack>
                  )}
                </WrapperRecentTransactions>
              )}
              {showConnectedNoumtransactions && (
                <TransactionWindow
                  open={showConnectedNoumtransactions}
                  onClose={closeTransactionWindowForConnectedNoum}
                  userId={space?.uid?._id || ''}
                  connectedNoumWalletId={connectedNoumSubWallet}
                  chamberId={id}
                />
              )}
            </BodyWrapper>
          )}
        </MainWrapper>
      </Wrapper>
    );
  },
);
