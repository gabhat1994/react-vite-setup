import styled, { css } from 'styled-components';
import { AccountDescription, AccountName, AccountWrapper } from '../styles';

export const UnselectedAccountWrapper = styled(AccountWrapper)<{
  applyVerificationStyles?: boolean;
}>`
  background-color: var(--bg-tablecell-neutral-alt-default);
  ${({ applyVerificationStyles }) =>
    applyVerificationStyles &&
    css`
      height: auto;
    `}
`;

export const AccountInformation = styled(AccountWrapper)<{
  applyVerificationStyles?: boolean;
}>`
  background-color: var(--bg-tablecell-neutral-alt-default);
  ${({ applyVerificationStyles }) =>
    applyVerificationStyles &&
    css`
      height: auto;
      padding: 0;
    `}
`;
export const Name = styled(AccountName)`
  color: var(--text-tablecell-header-neutral-highlighted);
  font-weight: var(--font-link-xlarge-weight);
  font-size: var(--font-body-medium-size);
`;
export const Description = styled(AccountDescription)`
  color: var(--text-tablecell-body-neutral-default);
  font-weight: var(--font-input-small-weight);
  font-size: var(--font-footnote-size);
`;
