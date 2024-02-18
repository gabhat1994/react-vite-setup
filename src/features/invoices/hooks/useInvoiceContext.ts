import { useContext } from 'react';
import { InvoiceContext } from '../providers/InvoiceProvider';

export function useInvoiceContext() {
  const context = useContext(InvoiceContext);

  return context;
}
