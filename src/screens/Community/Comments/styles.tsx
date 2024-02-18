import { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';
import styled from 'styled-components';

export const Content = styled.div`
  margin-left: 8px;
  justify-content: space-between;
  padding: 12px;
  background-color: var(--bg-comment-neutral-default);
  border-radius: 12px;
  font-family: var(--font-family);
  flex: 1;
`;

export const NameWrapper = styled.div<{ rightSpace?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-right: ${({ rightSpace }) => (rightSpace ? '16px;' : 'o')};
  @media (max-width: ${sizes.MOBILE_XL}) {
    flex-direction: column;
  }
`;

export const StyledText = styled(TSpan)`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  .mentions {
    color: var(--text-search-highlight-brand-primary-default);
    background-color: var(--bg-search-highlight-brand-secondary-default);
  }
`;

export const StyledName = styled(TSpan)<{ disabled?: boolean }>`
  flex: 1;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;
