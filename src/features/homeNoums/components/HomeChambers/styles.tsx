import { Stack } from '@/layout';
import styled from 'styled-components';

export const HomeChambersWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  margin: 0 auto;
  margin-top: 24px;
`;
export const StyledText = styled.div`
  text-align: center;
  color: var(--text-placeholder-neutral-default);
  font-size: var(--font-body-xlarge-regular-size);
  font-family: var(--font-body-xlarge-regular-font);
  margin-top: 12px;
`;
export const ButtonWrapper = styled.div`
  margin: 16px auto;
  font-weight: 500;
`;

export const StoriesCnt = styled.div`
  display: flex;
`;

export const IconWrapper = styled.div`
  display: none;
`;

export const StackWrapper = styled(Stack)`
  cursor: pointer;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 8px;
  &:hover ${IconWrapper} {
    display: flex;
  }
`;

export const HomeNoumAddContianer = styled.div`
  padding: 0 16px 16px 16px;
`;
