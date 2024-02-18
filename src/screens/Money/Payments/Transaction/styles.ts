import styled from 'styled-components';
import { Stack } from '@/layout';

export const Wrapper = styled(Stack)`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--shadow-neutral-light);
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
`;
export const Profile = styled.img`
  height: 24px;
  width: 24px;
`;
export const ProfileWarpper = styled.div`
  width: 24px;
  height: 100%;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding-right: 16px;
`;

export const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  overflow: hidden;
`;
export const AccountName = styled.div`
  width: 80%;
  color: var(--link-card-neutral-highlighted);
  font-size: var(--font-body-medium-size);
  font-weight: var(--font-link-large-weight);
  line-height: var(--font-link-xlarge-lineheight);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // &:hover {
  //   overflow: visible;
  //   white-space: normal;
  // }
`;
export const Account = styled.div`
  width: 80%;
  color: var(--text-card-neutral-default);
  font-size: var(--font-footnote-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-link-xlarge-lineheight);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // &:hover {
  //   overflow: visible;
  //   white-space: normal;
  // }
`;
export const TransactionAmout = styled.div`
  color: var(--link-card-neutral-highlighted);
  font-size: var(--font-link-medium-size);
  font-weight: var(--font-link-xlarge-weight);
  line-height: var(--font-link-xlarge-lineheight);
`;

export const Charges = styled.div`
  color: var(--text-card-neutral-default);
  font-size: var(--font-link-small-size);
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AmountWarpper = styled(Stack)`
  height: 100%;
  width: 30%;
`;
