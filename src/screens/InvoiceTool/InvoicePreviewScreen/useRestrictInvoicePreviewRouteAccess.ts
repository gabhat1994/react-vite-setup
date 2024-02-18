import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import { useEffect } from 'react';
import { InvoiceStatusEnum } from '@/apollo/generated/types';
import routes from '@/constants/routes';
import { type InvoicePreviewScreenParams } from './types';

export const useRestrictInvoicePreviewRouteAccess = ({
  status,
}: {
  status?: InvoiceStatusEnum | null;
}) => {
  const navigate = useNavigate();
  const { id } = useParams<InvoicePreviewScreenParams>();
  const location = useLocation();

  useEffect(() => {
    if (
      id &&
      status &&
      status !== InvoiceStatusEnum.Draft &&
      generatePath(routes.INVOICE_PREVIEW, { id }) === location.pathname
    ) {
      navigate(generatePath(routes.INVOICE_DETAILS, { id }), { replace: true });
    }
  }, [id, location.pathname, navigate, status]);
};
