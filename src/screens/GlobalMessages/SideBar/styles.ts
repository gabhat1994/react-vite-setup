import styled from 'styled-components';
import { noScrollBar, SpinnerContainer } from '@/common/globalStyles';
import { sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';

export const ListWrapper = styled.div<{
  justifyContent?: 'left' | 'normal' | 'right' | 'center' | 'space-between';
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  flex?: boolean;
  padding?: number;
}>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  ${({ padding }) => padding && `padding: ${padding}px;`}
  box-sizing: border-box;
  overflow-y: scroll;
  ${({ flex }) => flex && `flex: 1;`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
    ${({ flexDirection }) =>
    flexDirection && `flex-direction: ${flexDirection};`}
    ${noScrollBar}
`;

export const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 404px;

  @media (max-width: ${sizes.LAPTOP}) {
    width: 383px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 16px;
  box-sizing: border-box;
`;

export const Options = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledNoNoumConvoNote = styled(TSpan)`
  width: 231px;
  margin: 32px auto;
  text-align: center;
`;

export const StyledSubtitle = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-tablecell-body-neutral-default',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: break-spaces;
`;

export const UnreadMessageSign = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--bg-badge-danger-primary-default);
  border-radius: 1000px;
  margin-right: 8px;
`;

export const StyledLoadMore = styled(TSpan)`
  margin: 16px auto;
  cursor: pointer;
`;

export const NoumGroupLoading = styled(SpinnerContainer)`
  margin: 16px auto;
`;

export const Divider = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;
