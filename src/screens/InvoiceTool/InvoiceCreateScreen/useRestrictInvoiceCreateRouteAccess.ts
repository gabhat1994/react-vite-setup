import { generatePath, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { InvoiceStatusEnum } from '@/apollo/generated/types';
import routes from '@/constants/routes';
import { type InvoiceCreateScreenParams } from './types';

export const useRestrictInvoiceCreateRouteAccess = ({
  status,
}: {
  status?: InvoiceStatusEnum | null;
}) => {
  const navigate = useNavigate();
  const { id } = useParams<InvoiceCreateScreenParams>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (
      id &&
      status &&
      status !== InvoiceStatusEnum.Draft &&
      searchParams.get('draft')
    ) {
      navigate(generatePath(routes.INVOICE_EDIT, { id }), { replace: true });
    }
  }, [id, navigate, searchParams, status]);
};
