import styled from 'styled-components';
import { Stack } from '@/layout';

export const Wrapper = styled(Stack)`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  background-color: var(--bg-card-neutral-alt-default);
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  font-family: var(--font-family);
`;

export const ProfileWarpper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: center;
`;

export const TransactionDetails = styled.div<{ isMobile: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  // width: ${(props) => (props.isMobile ? '50%' : '90%')};
  overflow: hidden;
`;
export const AccountName = styled.div`
  width: 80%;
  color: var(--text-tablecell-header-neutral-highlighted);
  font-size: var(--font-body-medium-size);
  font-weight: var(--font-link-large-weight);
  line-height: var(--font-link-xlarge-lineheight);
  font-family: var(--font-family);
  text-align: left;
`;

export const AccountNameTo = styled.div`
  width: 80%;
  color: var(--text-tablecell-header-neutral-highlighted);
  font-size: 12px;
  font-weight: var(--font-link-large-weight);
  line-height: var(--font-link-xlarge-lineheight);
  font-family: var(--font-family);
  text-align: left;
`;

export const DateWrapper = styled.div`
  width: 100%;
  color: var(--text-tablecell-header-neutral-highlighted);
  font-size: var(--font-body-medium-size);
  font-weight: var(--font-link-large-weight);
  line-height: var(--font-link-xlarge-lineheight);
  font-family: var(--font-family);
  text-align: left;
`;

export const Account = styled.div`
  width: 80%;
  color: var(--text-tablecell-body-neutral-default);
  font-size: var(--font-footnote-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-link-xlarge-lineheight);
  font-family: var(--font-family);
`;
export const TransactionAmout = styled.div<{
  isTransactionWithOwnAccounts: boolean;
}>`
  height: 100%;
  align-self: flex-end;
  color: ${(props) =>
    props.isTransactionWithOwnAccounts
      ? 'var(--text-tablecell-header-neutral-default)'
      : `var(--text-tablecell-header-neutral-highlighted)`};
  font-size: var(--font-link-medium-size);
  font-weight: var(--font-link-xlarge-weight);
  line-height: var(--font-link-xlarge-lineheight);
`;

export const FeesWrapper = styled.div`
  height: 100%;
  display: flex;
  color: var(--text-tablecell-header-neutral-default);
  font-size: var(--font-footnote-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-link-xlarge-lineheight);
  font-family: var(--font-family);
`;

export const AmountWrapper = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-start;
  color: var(--text-tablecell-header-neutral-highlighted);
  font-size: var(--font-link-medium-size);
  font-weight: var(--font-link-xlarge-weight);
  line-height: var(--font-link-xlarge-lineheight);
  font-family: var(--font-family);
`;
