import styled from 'styled-components';
import { noScrollBar } from '@/common/globalStyles';

export const Wrapper = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '100%' : '668px')};
  background-color: var(--bg-card-neutral-alt-default);
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export const HeaderWrapper = styled.div`
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CarosoulWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding: 8px 0px;
  overflow-x: auto;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0px 8px;
`;

export const MonthListWrapper = styled.div`
  overflow-x: scroll;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 12px;
  gap: 20px;
  ${noScrollBar}
`;

export const MonthButton = styled.div<{ isSelected: boolean }>`
  background: ${(props) =>
    props.isSelected
      ? 'var(--bg-tab-chips-brand-secondary-selected)'
      : 'var(--bg-tab-chips-neutral-default)'};
  border-radius: 8px;
  height: 40px;
  white-space: nowrap;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 2.5rem;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  color: ${(props) =>
    props.isSelected
      ? 'var(--text-tab-chips-brand-primary-selected)'
      : 'var(--text-tab-chips-neutral-default)'};
  &:hover {
    cursor: pointer;
  }
`;
