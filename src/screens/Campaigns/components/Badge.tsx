import styled, { css } from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Utils } from '../utils';

export type Props = {
  status: 'Live' | 'Pending' | 'In review' | 'Completed' | 'Rejected';
};

const BaseBadge = styled.span<{ status: Props['status'] }>`
  padding: 1px 6px 2px 6px;
  box-sizing: border-box;
  height: 22px;
  border-radius: 8px;
  background-color: var(--bg-tag-neutral-default);

  ${({ status }) =>
    status === 'Live' &&
    css`
      background-color: var(--bg-tag-success-secondary-default);
    `};
  ${({ status }) =>
    status === 'Pending' &&
    css`
      background-color: var(--bg-tag-warning-secondary-default);
    `};
  ${({ status }) =>
    status === 'In review' &&
    css`
      background-color: var(--bg-tag-brand-secondary-default);
    `};
  ${({ status }) =>
    status === 'Completed' &&
    css`
      background-color: var(--bg-tag-neutral-default);
    `};
  ${({ status }) =>
    status === 'Rejected' &&
    css`
      background-color: var(--bg-button-danger-secondary-default);
    `};
`;

export const Badge = ({ status }: Props) => {
  const $status = Utils.capitalizeFirstLetter(status) as Props['status'];

  const tokens = (_status: Props['status']) => {
    switch (_status) {
      // TODO: Use Enum from BE
      case 'Live':
        return '--text-tag-success-primary-default';
      case 'In review':
        return '--text-tag-brand-primary-default';
      case 'Completed':
        return '--text-tag-neutral-default';
      case 'Pending':
        return '--text-tag-warning-secondary-default';
      case 'Rejected':
        return '--text-button-danger-secondary-default';
      default:
        return '--text-tag-neutral-default';
    }
  };

  return (
    <BaseBadge status={$status}>
      <TSpan font="footnote-bold" colorToken={tokens($status)}>
        {$status}
      </TSpan>
    </BaseBadge>
  );
};
