import { useCallback, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import Layout from '@/layout/MoneyLayout';
import { type DropdownValueType } from '@/components/Dropdown';
import { useGetAccountListQuery } from '@/apollo/graphql';
import {
  type PaymentFilter,
  type PaymentAccountTypeEnum,
} from '@/apollo/generated/types';
import { Spacer } from '@/layout';
import { Pagination } from '@/components/Pagination';
import { Spinner } from '@/components';
import { useTransactionHistory } from '@/features/money/hooks';
import { TransactionCardUtil } from '@/features/money/utils';

import {
  MonthList,
  findCurrentMonth,
  convert,
  DateFormaterStringInput,
} from './helper';
import { TransactionHeader } from './TransactionHeader';
import {
  Container,
  DateWrapper,
  GroupWrapper,
  CardWrapper,
  PaginationWrapper,
  NoRecord,
} from './styles';
import { Utils } from './utils';

const ViewTransactions = () => {
  const [accounts, setAccounts] = useState<DropdownValueType<string>[]>([]);
  const limit = 10;
  const { t } = useTranslation();
  const { id, accountType } = useParams();
  const [page, setPage] = useState<number>(1);
  const [selectedMonth, setSelctedMonth] = useState<string>(findCurrentMonth());

  const [filter, setFilters] = useState<PaymentFilter>({
    accountType: accountType
      ? ([accountType] as [PaymentAccountTypeEnum])
      : undefined,
    endDate: convert(
      new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0),
    ),
    accountId: id,
    startDate: convert(
      new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1),
    ),
  });

  const [selectedDropdownValue, setSelectedDropdownValue] = useState<
    DropdownValueType<string>
  >({
    label: '',
    key: '',
    type: 'value',
    value: '',
  });

  const { loading: accountListLoading } = useGetAccountListQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ getAccountList }) => {
      const options: DropdownValueType<string, string>[] =
        getAccountList?.map((account) => ({
          label: Utils.getDropdownOptionLabel(account),
          key: Utils.getDropdownOptionKey(account),
          type: 'value',
          value: account.id || '',
        })) || [];

      const sortedDropdownOptions = Utils.sortDropdownByLabelAndKey(options);

      sortedDropdownOptions.unshift({
        label: 'All Wallets and Accounts',
        key: '',
        type: 'value',
        value: '',
      });

      const defaultSelectedValue = id
        ? sortedDropdownOptions.filter((account) => id === account.value)[0]
        : sortedDropdownOptions[0];

      setSelectedDropdownValue(defaultSelectedValue);
      setAccounts(sortedDropdownOptions);
    },
  });

  const {
    states: { loading: transactionsLoading },
    data: { transactions, totalCount },
  } = useTransactionHistory({ filter, limit, page });

  const handleDropdownUpdate = useCallback(
    (selectedValue: DropdownValueType<string>) => {
      setSelectedDropdownValue(selectedValue);
      setPage(1);
      setFilters({
        ...filter,
        accountId: selectedValue.value ? selectedValue.value : undefined,
        accountType: selectedValue?.key
          ? ([selectedValue.key] as [PaymentAccountTypeEnum])
          : undefined,
      });
    },

    [filter],
  );

  const handleMonthUpdate = useCallback(
    (selectedValue) => {
      setSelctedMonth(selectedValue);
      setPage(1);
      const index = MonthList.indexOf(selectedValue.split(' ')[0]);
      const firstDay = convert(new Date(selectedValue.split(' ')[1], index, 1));
      const lastDay = convert(
        new Date(selectedValue.split(' ')[1], index + 1, 0),
      );
      setFilters({ ...filter, startDate: firstDay, endDate: lastDay });
    },
    [filter],
  );

  const onPageChange = (val: number) => {
    setPage(val);
  };

  const groupedByDay = groupBy(transactions, (item) =>
    DateFormaterStringInput(item?.createdAt!),
  );

  const subHeader = useMemo(
    () => (
      <TransactionHeader
        accounts={accounts}
        selctedDropdownValue={selectedDropdownValue}
        selectedMonth={selectedMonth}
        handleDropdoenUpdate={handleDropdownUpdate}
        handleMonthUpdate={handleMonthUpdate}
      />
    ),
    [
      accounts,
      selectedDropdownValue,
      selectedMonth,
      handleDropdownUpdate,
      handleMonthUpdate,
    ],
  );

  const loading = transactionsLoading || accountListLoading;

  return (
    <Layout
      type="Chambers"
      data-testid="money-layout"
      hideLeftMenu={true}
      subHeader={subHeader}
      fullWidthContainer
    >
      {loading && <Spinner />}

      <Container>
        {!loading &&
          Object.keys(groupedByDay).map((key: string) => (
            <GroupWrapper>
              <DateWrapper>{key}</DateWrapper>
              <CardWrapper>
                {!!groupedByDay[key].length &&
                  groupedByDay[key].map((transaction) =>
                    TransactionCardUtil.getTransactionCardComponent(
                      transaction.context,
                      transaction,
                    ),
                  )}
              </CardWrapper>
            </GroupWrapper>
          ))}
        {!Object.keys(groupedByDay).length && !loading && (
          <NoRecord>
            {t('noumena.container.close_subwallet.noTransactionsFound')}
          </NoRecord>
        )}
        {!loading && totalCount > limit && (
          <PaginationWrapper>
            <Spacer height={16} />
            <Pagination
              currentPage={page}
              pageSize={limit}
              totalCount={totalCount}
              onPageChange={onPageChange}
            />
          </PaginationWrapper>
        )}
      </Container>
    </Layout>
  );
};
export default ViewTransactions;
