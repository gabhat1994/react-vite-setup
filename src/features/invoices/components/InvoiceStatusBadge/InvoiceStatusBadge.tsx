import React, { useMemo } from 'react';
import { InvoiceStatusEnum } from '@/apollo/generated/types';
import { Tag } from '@/components/Tag';

type InvoiceStatusBadgeProps = {
  status?: InvoiceStatusEnum | null;
};

const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status }) => {
  const tagProps = useMemo(() => {
    switch (status) {
      case InvoiceStatusEnum.Draft:
        return {
          label: 'Draft',
          tertiary: true,
        };
      case InvoiceStatusEnum.Cancelled:
        return {
          label: 'Cancelled',
          tertiary: true,
        };
      case InvoiceStatusEnum.Issued:
        return {
          label: 'Open',
          secondary: true,
        };
      case InvoiceStatusEnum.Paid:
        return {
          label: 'Paid',
          success: true,
        };
      case InvoiceStatusEnum.Overdue:
        return {
          label: 'Overdue',
          danger: true,
        };
      case InvoiceStatusEnum.PartiallyPaid:
        return {
          label: 'Partially Paid',
          warning: true,
        };
      case InvoiceStatusEnum.WriteOff:
        return {
          label: 'Write Off',
          tertiary: true,
        };
      default:
        return {};
    }
  }, [status]);

  const { label, ...rest } = tagProps;

  return label ? <Tag {...rest}>{label}</Tag> : null;
};

export default InvoiceStatusBadge;
