import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { customScrollBar, defaultScrollBar } from '@/common/globalStyles';

export const MainContainer = styled(Stack)`
  background: var(--bg-body-neutral-alt-default);
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: -webkit-fill-available;
`;

export const Container = styled(Stack)<{ type?: string }>`
  width: 100%;
  max-height: calc(100vh - 72px);
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 0px 16px;
  flex: 1 1 auto;
  @media (min-width: ${sizes.TABLET_L}) {
    padding: 40px;
  }
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export const LinkNoumDescription = styled(TSpan)`
  margin-bottom: 24px;
  font-size: var(--font-header-xsmall-size);
  font-weight: var(--font-body-large-bold-weight);
  line-height: 30px;
  @media (min-width: ${sizes.TABLET}) {
    font-size: var(--font-header-medium-size);
    line-height: 39.2px;
  }
`;

export const NoumMainContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
  justify-content: center;
  margin-bottom: 16px;
  z-index: 0;
  flex: 1 1 auto;
  overflow: scroll;
  height: 100vh;
`;

export const SearchContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  z-index: 1;
  top: 0px;
  padding-top: 10px;
  background-color: var(--bg-body-neutral-alt-default);
`;

export const SelectNoumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  ${customScrollBar}
  @media (min-width: ${sizes.LAPTOP}) {
    width: 668px;
    max-height: 532px;
    border-radius: 8px;
    padding: 0 8px;
    border: 1px solid var(--border-card-neutral-highlighted);
  }
`;

export const NoumContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const NoumPreview = styled.div`
  width: 399px;
  max-width: 485px;
  display: flex;
  flex-direction: column;
  @media (min-width: ${sizes.LAPTOP}) {
    max-height: 532px;
  }
  @media (min-width: ${sizes.TABLET}) and (max-width: ${sizes.TABLET_L}) {
    width: 485px;
  }
`;
export const PreviewContainer = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: auto;
  @media (min-width: ${sizes.LAPTOP}) {
    overflow-y: auto;
    ${customScrollBar}
  }
  ${defaultScrollBar}
`;
export const PreviewItem = styled.div<{ border: 'solid' | 'dashed' }>`
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 95%;
  }
  border: ${({ border }) =>
    `1px ${border} var(--border-card-neutral-highlighted)`};
  border-radius: 16px;
  padding: 15px 16px;
  box-sizing: border-box;
  ${({ border }) => border === 'dashed' && `justify-content:center;`};
`;

export const IconMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;
`;

export const IconContainer = styled.div`
  border: 1px solid var(--border-card-neutral-default);
  position: absolute;
  z-index: 2;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 50%;
  padding: 6.32px;
`;

export const IconDivider = styled.div`
  height: 40px;
  width: 1px;
  background-color: var(--border-card-neutral-default);
`;

export const ResultContainer = styled.div`
  background-color: var(--bg-card-neutral-alt-highlighted);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  margin-top: 16px;
  @media (max-width: ${sizes.TABLET_L}) {
    margin-bottom: 16px;
  }
`;

export const ActionWrapper = styled.div`
  margin-top: auto;
  width: 100%;
  @media (max-width: ${sizes.TABLET_L}) {
    position: sticky;
    bottom: 0px;
    background: var(--bg-card-neutral-alt-default);
    padding: 16px;
    border-top: 1px solid var(--border-card-neutral-default);
    z-index: 1;
  }
`;

export const OptionContainer = styled.div`
  width: 100%;
  @media (min-width: ${sizes.TABLET_L}) {
    ${defaultScrollBar};
  }
`;

export const SelectOption = styled.div<{
  showBorder?: boolean;
  shouldHover: boolean;
  showPadding: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 12px 0;
  background: var(--bg-tablecell-neutral-alt-default);
  width: ${({ shouldHover }) => !shouldHover && 'auto'};
  padding-left: ${({ showPadding }) => showPadding && '12px'};
  padding-right: ${({ showPadding }) => showPadding && '20px'};
  border-bottom: ${({ showBorder }) =>
    showBorder && '1px solid var(--bg-separator-neutral-default)'};
  &:hover {
    background-color: ${({ shouldHover }) =>
      shouldHover && 'var(--bg-tablecell-neutral-hover)'};
  }
`;
export const OptionDetail = styled.div`
  margin-left: 16px;
  margin-right: auto;
  width: 90%;
`;

export const ExistingLinkContainer = styled.div`
  max-height: 152px;
  width: 100%;
  overflow-y: auto;
  margin-top: 17px;
  ${defaultScrollBar};
`;
