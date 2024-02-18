import { createContext, useState, type FC, useMemo } from 'react';
import { type SelectedContact } from '@/features/noumContacts/types';

type InvoiceContextType = {
  shouldShowInvoicePreview: boolean;
  setShowInvoicePreview: (value: boolean) => void;
  selectedBuyer?: SelectedContact | null;
  setSelectedBuyer: (value?: SelectedContact | null) => void;
  selectedServiceProvider?: SelectedContact | null;
  setSelectedServiceProvider: (value?: SelectedContact | null) => void;
};

export const InvoiceContext = createContext<InvoiceContextType>({
  shouldShowInvoicePreview: false,
  setShowInvoicePreview: () => {},
  selectedBuyer: null,
  selectedServiceProvider: null,
  setSelectedBuyer: () => {},
  setSelectedServiceProvider: () => {},
});

export const InvoiceProvider: FC = ({ children }) => {
  const [shouldShowInvoicePreview, setShowInvoicePreview] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<SelectedContact | null>();
  const [selectedServiceProvider, setSelectedServiceProvider] =
    useState<SelectedContact | null>();

  const value = useMemo(
    () => ({
      shouldShowInvoicePreview,
      selectedBuyer,
      selectedServiceProvider,
      setShowInvoicePreview,
      setSelectedBuyer,
      setSelectedServiceProvider,
    }),
    [shouldShowInvoicePreview, selectedBuyer, selectedServiceProvider],
  );

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};
