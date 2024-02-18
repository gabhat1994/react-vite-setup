import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { DataGrid } from '@/components/DataGrid';
import routes from '@/constants/routes';
import { Stack } from '@/layout';
import ListLayout from '@/layout/ListLayout';
import {
  type InvoiceOutputFragment,
  useGetInvoiceListCountQuery,
} from '@/apollo/graphql';
import { Spinner } from '@/components/Spinner';
import { InvoiceSortColumn } from '@/apollo/generated/types';
import { type Filters } from './types';
import { ListHeader } from './ListHeader';
import S from './styles';
import { InvoicesList } from './InvoicesList';
import { EmptyList } from './EmptyList';

function InvoiceManager() {
  const navigate = useNavigate();

  const { data, loading } = useGetInvoiceListCountQuery({
    variables: {
      filter: {
        search: '',
      },
    },
  });

  const totalCount = data?.getInvoiceList?.count;

  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: [],
    dateRange: {
      from: undefined,
      to: undefined,
    },
    amountRange: {
      from: undefined,
      to: undefined,
    },
    customers: [],
    noums: [],
    invoiceType: [],
    limit: 10,
  });
  const [offset, setOffset] = useState(0);

  const submitFilters = useMemo(
    () =>
      debounce((newFilters: Filters) => {
        setOffset(0);
        setFilters(newFilters);
      }, 1000),
    [],
  );

  const navigateToCreateInvoice = () => {
    navigate(routes.INVOICE_CREATE);
  };

  return (
    <ListLayout type="Invoices">
      <S.InvoiceManagerContainer>
        <S.PageCard>
          <DataGrid.Provider<InvoiceOutputFragment, InvoiceSortColumn>
            data={[]}
            defaultSorting={{
              column: InvoiceSortColumn.IssueDate,
              direction: 'desc',
            }}
          >
            <Stack gap={24} vertical align="stretch">
              {loading ? (
                <Spinner />
              ) : totalCount === 0 ? (
                <EmptyList onCreateInvoice={navigateToCreateInvoice} />
              ) : (
                <>
                  <ListHeader
                    onCreateInvoice={navigateToCreateInvoice}
                    onFiltersChange={submitFilters}
                  />

                  <InvoicesList
                    offset={offset}
                    filters={filters}
                    onPaginationChange={(state) => setOffset(state.offset)}
                  />
                </>
              )}
            </Stack>
          </DataGrid.Provider>
        </S.PageCard>
      </S.InvoiceManagerContainer>
    </ListLayout>
  );
}

export default InvoiceManager;
