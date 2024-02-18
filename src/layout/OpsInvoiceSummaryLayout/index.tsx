import React from 'react';
import S from './styles';
import { type OpsInvoiceSummaryLayoutProps } from './types';

const OpsInvoiceSummaryLayout: React.FC<OpsInvoiceSummaryLayoutProps> = ({
  children,
}) => (
  <S.Container data-testid="ops-invoice--summary-layout-container">
    {children}
  </S.Container>
);

export default OpsInvoiceSummaryLayout;
