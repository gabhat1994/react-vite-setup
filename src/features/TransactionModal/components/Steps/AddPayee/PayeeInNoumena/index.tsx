import {
  useContext,
  useEffect,
  useState,
  Fragment,
  type ChangeEvent,
} from 'react';
import { t } from 'i18next';
import { captureException } from '@sentry/react';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { Button } from '@/components/Button';

import {
  useCreateCustomerPayeeMutation,
  useGetAccountsLazyQuery,
} from '@/apollo/graphql';
import { Spinner } from '@/components/Spinner';
import { useToast } from '@/hooks';
import { ModalFooter } from '@/components/ExtendedModal';
import { AccountType } from '@/apollo/generated/types';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { ComponentStates } from '@/features/TransactionModal/types';
import { type TSearchedPayee } from './types';
import { ModalContent } from '../../../styles';
import { List, Close } from './styles';
import NoumenaPayee from './NoumenaPayee';

const PayeeInNoumena = () => {
  const { setPaymentState, isMobile } = useContext(PaymentStateContext);
  const { refetchPaymentData } = useContext(PaymentDataContext);
  const [selectedPayee, setSelectedPayee] = useState<TSearchedPayee | null>(
    null,
  );
  const [serachQuery, setSearchQuery] = useState<string>('');

  const { addToast } = useToast();

  const [createCustomerPayeeMutation, { loading: addLoading }] =
    useCreateCustomerPayeeMutation({
      variables: {
        input: {
          masterWalletId: selectedPayee?.masterWalletId || '',
          accountId: selectedPayee?.id || '',
        },
      },
      onCompleted: ({ createCustomerPayee }) => {
        refetchPaymentData();
        addToast('success', 'none', `${createCustomerPayee?.message}`);
        setPaymentState(ComponentStates.PAYMENT_SELECT);
      },
      onError: (error) => {
        addToast('error', 'none', `${error.message}`);
        captureException(error, {
          tags: {
            section: 'createCustomerPayeeMutationPayeeInNoumena',
          },
        });
      },
    });

  const [gqlGetAccountList, { loading, data }] = useGetAccountsLazyQuery({
    onError(error) {
      captureException(error, {
        tags: {
          section: 'getAccountListPayeeInNoumena',
        },
      });
      addToast('error', 'none', `${error.message}`);
    },
  });
  const searchedPayee = data?.getAccountList || [];

  const handleSelect = (checkedPayee: TSearchedPayee | null) => {
    setSelectedPayee(checkedPayee);
  };

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const showNoFoundText =
    searchedPayee.length === 0 && serachQuery.length > 0 && !loading;

  useEffect(() => {
    if (serachQuery) {
      const timer = setTimeout(() => {
        gqlGetAccountList({
          variables: {
            input: {
              self: false,
              limit: 100,
              page: 1,
              customerName: serachQuery,
              accountType: AccountType.Wallet,
            },
          },
        });
      }, 600);
      return () => clearTimeout(timer);
    }
    return () => null;
  }, [gqlGetAccountList, serachQuery]);

  return (
    <Fragment>
      <ModalContent hasSingleButton>
        <Stack
          style={{ overflow: 'hidden' }}
          vertical
          align="center"
          justify="center"
          fullWidth
        >
          <TSpan
            font="body-l"
            colorToken="--text-body-neutral-default"
            textAlign="center"
          >
            {t('noumena.money.payment.add.payee.header')}
          </TSpan>
          <Spacer height={12} />
          <Stack fullWidth style={{ position: 'relative' }}>
            {!serachQuery.length && (
              <Icon
                data-testid="event-search-members-icon"
                name="search_m"
                size={24}
                color="--icon-input-neutral-default"
                style={{
                  position: 'absolute',
                  left: '4%',
                  top: '31%',
                  zIndex: 1,
                }}
              />
            )}
            <TextField
              value={serachQuery}
              onChange={handleSearchQuery}
              placeholder="       Payee Name"
              rightIcon={
                !!serachQuery.length && (
                  <Close
                    name="clear_m"
                    size={24}
                    color="--icon-input-brand-primary-default"
                    onClick={() => setSearchQuery('')}
                  />
                )
              }
            />
          </Stack>
          <Spacer height={16} />
          <List>
            {!!serachQuery.length &&
              searchedPayee?.map((payee) => (
                <NoumenaPayee
                  isSelected={Boolean(payee.id === selectedPayee?.id)}
                  key={payee.id}
                  payee={payee}
                  handleSelect={handleSelect}
                />
              ))}
            {loading ||
              (showNoFoundText && (
                <Stack fullWidth justify="center">
                  <TSpan
                    font="body-l"
                    colorToken="--text-tablecell-header-neutral-highlighted"
                    textAlign="center"
                  >
                    {t('noumena.dropdown.nothing_found.text')}
                  </TSpan>
                </Stack>
              ))}
            {loading && <Spinner />}
          </List>
        </Stack>
      </ModalContent>
      <ModalFooter flexDirection={isMobile ? 'column' : 'row'}>
        <Button
          onClick={() => createCustomerPayeeMutation()}
          data-testid="add-payee-in-noumena"
          primary
          size="full"
          type="submit"
          disabled={!selectedPayee}
          loading={addLoading}
        >
          {t('noumena.money.payment.add.payee')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

export default PayeeInNoumena;
