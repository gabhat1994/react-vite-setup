import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/Spinner';
import InvoiceDetailsSection from '@/features/invoices/components/InvoiceSummary/InvoiceDetailsSection';
import InvoiceSummary from '@/features/invoices/components/InvoiceSummary/InvoiceSummary';
import PlanDetails from '@/features/invoices/components/InvoiceSummary/PlanDetails';
import { Stack } from '@/layout';
import OpsInvoiceSummaryLayout from '@/layout/OpsInvoiceSummaryLayout';
import { ResponsiveMain } from '@/layout/SinglePageLayout';
import S from '@/screens/InvoiceTool/styles';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { useGetInvoiceByIdQuery } from '@/apollo/graphql';
import useInvoicePdfDownload from '@/features/invoices/hooks/useInvoicePdfDownload';
import { InvoiceTimeline } from '@/features/invoices/components/InvoiceTimeline/InvoiceTimeline';

export const InvoicePreviewForOps = () => {
  const location = useLocation();
  const [id, setId] = useState<string>('');
  const { download, loading: downlaoding } = useInvoicePdfDownload();

  useEffect(() => {
    const splitedString = location.search.split('&');
    const finalString = splitedString[splitedString.length - 1].split('=');
    setId(finalString[finalString.length - 1]);
  }, [location]);

  const { data, loading } = useGetInvoiceByIdQuery({
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  const Buttons = (
    <>
      <Button
        size="small"
        leftIcon={<Icon name="download_m" size={16} />}
        tertiary
        type="submit"
        loading={downlaoding}
        disabled={!id}
        onClick={() => download(id, data?.getInvoiceById?.invoiceNumber ?? '')}
      >
        Download PDF
      </Button>
    </>
  );

  return (
    <OpsInvoiceSummaryLayout>
      {!data?.getInvoiceById && loading ? (
        <Spinner />
      ) : data?.getInvoiceById ? (
        <>
          <S.FormHeaderContainer>
            <StickyFormHeader
              title="Invoice Summary"
              buttons={Buttons}
              showBackButton={false}
            />
          </S.FormHeaderContainer>
          <ResponsiveMain>
            <S.Content gap={16} padding="16px 0" oneColumn>
              {data?.getInvoiceById ? (
                <Stack vertical gap={16}>
                  <PlanDetails invoice={data?.getInvoiceById} />
                  <InvoiceSummary invoice={data?.getInvoiceById} />
                  <InvoiceDetailsSection invoice={data?.getInvoiceById} />
                  <InvoiceTimeline invoice={data?.getInvoiceById} />
                </Stack>
              ) : null}
            </S.Content>
          </ResponsiveMain>
        </>
      ) : null}
    </OpsInvoiceSummaryLayout>
  );
};
