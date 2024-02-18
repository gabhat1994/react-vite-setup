import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const SubTitle = styled(TSpan)`
  padding: 16px;
`;

export const RadioBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

export const RadioBoxItem = styled.div<{ variant: 'filter' | 'sort' }>`
  padding: ${({ variant }) => (variant === 'filter' ? 16 : 12)}px;
  display: flex;
  margin-right: auto;
  label {
    padding-right: 16px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  border-top: 1px solid var(--bg-separator-neutral-default);
`;

export const TagLabel = styled.div<{
  bgColor: string;
  color: string;
}>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  font-weight: var(--font-body-small-bold-weight);
  font-size: var(--font-body-medium-size);
  text-align: center;
`;
