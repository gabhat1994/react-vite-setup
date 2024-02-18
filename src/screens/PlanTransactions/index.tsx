import Layout from '@/layout/MoneyLayout';
import { useCallback, useMemo, useState } from 'react';
import { groupBy } from 'lodash';
import { Button, Icon, Spinner, TSpan } from '@/components';
import { t } from 'i18next';
import {
  type TInvoiceFilters,
  usePlanTransactions,
} from '@/features/money/components/plans/PlanSummary/hooks/usePlanTransactions';
import { Pagination } from '@/components/Pagination';
import { Spacer } from '@/layout';
import { BillingUtil } from '@/features/money/components/plans/PlanDetails/BillingSection/utils';
import useInvoiceDownlaod from '@/features/money/components/plans/PlanDetails/hooks/useInvoiceDownlaod';
import { type DropdownValueType } from '@/components/Dropdown';
import { useGetAvailableSubscriptionsQuery } from '@/apollo/graphql';
import { Header } from './Header';
import {
  DateFormaterStringInput,
  findCurrentMonth,
  formattedDate,
  MonthList,
} from './helper';
import {
  Container,
  DateWrapper,
  GroupWrapper,
  HistoryCardStack,
  Information,
  InformationStack,
  NoRecord,
  PaginationWrapper,
} from './styles';

export const PlanTransactions = () => {
  const [selectedMonth, setSelctedMonth] = useState<string>(findCurrentMonth());
  const [drodDownData, setDropdownData] = useState<DropdownValueType<string>[]>(
    [],
  );
  const [filter, setFilters] = useState<TInvoiceFilters>({
    date_to: formattedDate(
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ),
    date_from: formattedDate(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    ),
    subscriptionId: null,
  });
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<
    DropdownValueType<string>
  >({
    label: '',
    key: '',
    type: 'value',
    value: '',
  });

  const {
    planTransactions,
    planTransactionsCount,
    handlePageChange,
    loading,
    pageNumber,
  } = usePlanTransactions(filter);

  const { loading: subsLoading } = useGetAvailableSubscriptionsQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ getAvailableSubscriptions }) => {
      const options: DropdownValueType<string, string>[] =
        getAvailableSubscriptions?.map((plan) => ({
          label: BillingUtil.generatePlanName(plan.plan_name),
          key: String(plan.subscription_id),
          type: 'value',
          value: String(plan.subscription_id) || '',
        })) || [];

      options.unshift({
        label: 'All Plans',
        key: '',
        type: 'value',
        value: '',
      });

      setSelectedDropdownValue(options[0]);
      setDropdownData(options);
    },
  });

  const { downlaodInvoice } = useInvoiceDownlaod();

  const handleMonthUpdate = useCallback(
    (selectedValue) => {
      setSelctedMonth(selectedValue);
      handlePageChange(1);
      const index = MonthList.indexOf(selectedValue.split(' ')[0]);
      const firstDay = formattedDate(
        new Date(selectedValue.split(' ')[1], index, 1),
      );
      const lastDay = formattedDate(
        new Date(selectedValue.split(' ')[1], index + 1, 0),
      );
      setFilters({ ...filter, date_from: firstDay, date_to: lastDay });
    },
    [filter, handlePageChange],
  );

  const handleDropdownUpdate = useCallback(
    (selectedValue: DropdownValueType<string>) => {
      setSelectedDropdownValue(selectedValue);
      handlePageChange(1);
      setFilters({
        ...filter,
        subscriptionId: selectedValue.value || null,
      });
    },
    [filter, handlePageChange],
  );

  const subHeader = useMemo(
    () => (
      <Header
        selectedMonth={selectedMonth}
        handleMonthUpdate={handleMonthUpdate}
        drodDownData={drodDownData}
        handleDropdoenUpdate={handleDropdownUpdate}
        selctedDropdownValue={selectedDropdownValue}
      />
    ),
    [
      selectedMonth,
      handleMonthUpdate,
      drodDownData,
      handleDropdownUpdate,
      selectedDropdownValue,
    ],
  );

  const groupedByDay = groupBy(
    planTransactions,
    (item) =>
      // Extract the "yyyy-mm-dd" part of the ISO date string
      !!item?.issue_date && item.issue_date.slice(0, 10),
  );

  const isLoading = loading || subsLoading;

  return (
    <Layout
      type="Chambers"
      data-testid="money-layout"
      hideLeftMenu={true}
      subHeader={subHeader}
      fullWidthContainer
    >
      {isLoading && <Spinner />}

      <Container>
        {!isLoading &&
          Object.keys(groupedByDay).map((key: string) => (
            <GroupWrapper key={key}>
              <DateWrapper>
                <TSpan
                  font="body-m-bold"
                  colorToken="--text-card-neutral-default"
                >
                  {DateFormaterStringInput(key)}
                </TSpan>
              </DateWrapper>
              {!!groupedByDay[key].length &&
                groupedByDay[key].map((invoice) => (
                  <HistoryCardStack key={invoice?.invoice_id}>
                    <InformationStack>
                      <TSpan font="body-m-bold">
                        {BillingUtil.generatePlanName(invoice.plan_name)}
                      </TSpan>
                      <Information>
                        <TSpan
                          font="footnote"
                          colorToken="--text-tablecell-body-neutral-default"
                        >
                          {`Paid ${BillingUtil.formatMoney(
                            invoice.amount_paid,
                          )}`}
                        </TSpan>
                      </Information>
                    </InformationStack>
                    <Button
                      primary
                      textOnly
                      leftIcon={<Icon name="download_m" size={24} />}
                      onClick={() =>
                        downlaodInvoice(invoice?.external_invoice_id)
                      }
                    >
                      {t('noumena.subscription.invoice.text')}
                    </Button>
                  </HistoryCardStack>
                ))}
            </GroupWrapper>
          ))}
        {!Object.keys(groupedByDay).length && !isLoading && (
          <NoRecord>
            {t('noumena.subscription.billing.history.no_data')}
          </NoRecord>
        )}
        {!isLoading && planTransactionsCount > 10 && (
          <PaginationWrapper>
            <Spacer height={16} />
            <Pagination
              currentPage={pageNumber}
              pageSize={10}
              totalCount={planTransactionsCount}
              onPageChange={handlePageChange}
            />
          </PaginationWrapper>
        )}
      </Container>
    </Layout>
  );
};

export default PlanTransactions;
