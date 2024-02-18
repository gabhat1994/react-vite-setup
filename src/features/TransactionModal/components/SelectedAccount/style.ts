import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { AccountDescription, AccountName, AccountWrapper } from '../styles';

export const SelectedAccountWrapper = styled(AccountWrapper)`
  background-color: var(--bg-tablecell-neutral-pressed);
  cursor: pointer;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;
export const Name = styled(AccountName)`
  font-weight: var(--font-link-xlarge-weight);
  font-size: var(--font-body-large-size);
  display: flex;
  align-items: center;
`;
export const Description = styled(AccountDescription)`
  font-weight: var(--font-input-small-weight);
  font-size: var(--font-link-medium-size);
`;
