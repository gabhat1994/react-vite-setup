import styled, { css } from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

interface ToolDisabledProps {
  isDisabled: boolean;
}

export const ToolboxWrapper = styled.div``;
export const ToolboxLoader = styled(Stack)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ToolboxTabs = styled.div``;
export const ToolboxTabContentWrapper = styled.div`
  height: 277px;
  overflow: auto;
`;

export const ToolboxItemsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ToolboxItemWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  padding: 12px 6px;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 109px;
  height: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--bg-separator-neutral-default);
  gap: 4px;
  box-sizing: border-box;
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
        `
      : css`
          &:hover {
            border: 1px solid var(--bg-tool-toolbox-brand-primary-default);
            background: var(--bg-button-brand-secondary-default);
            path {
              fill: var(--bg-tool-toolbox-brand-primary-default) !important;
            }
            & > div > span {
              opacity: 0.95;
              color: var(--color-base-primary-50);
              transition: opacity 1s;
            }
          }
        `}
  &:hover span.toolbox-tooltip {
    opacity: 0.95;
    transition: opacity 1s;
  }
`;

export const ToolboxItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const ToolboxItemText = styled(TSpan)<ToolDisabledProps>`
  color: ${({ isDisabled = false }) =>
    isDisabled
      ? 'var(--text-card-neutral-disabled)'
      : 'var(--text-card-neutral-highlighted)'};

  justify-content: start;
  align-items: center;
  .disabled {
    color: var(--text-card-neutral-disabled);
  }
  width: 100%;
  ${({ overflow }) => overflow && `text-overflow: ${overflow}`};
`;

export const ToolboxItemComingSoonText = styled(ToolboxItemText)`
  font-weight: var(--font-body-small-bold-weight);
  font-size: var(--font-link-small-size);
  color: var(--text-card-brand-primary-default);
`;

export const ToolTip = styled(TSpan)<{ top?: string; childIndex: number }>`
  width: max-content;
  max-width: 270px;
  padding: 6px 8px;
  z-index: 100;
  background: var(--bg-tooltip-neutral-default);
  opacity: 0;
  border-radius: 4px;
  text-align: center;
  position: absolute;
  color: var(--text-tooltip-neutral-alt-default);

  transition: opacity 0.5s;
  top: ${({ top }) => top || '-30px'};
  ${({ childIndex }) =>
    childIndex % 4 === 0
      ? `left:0 !important;`
      : childIndex % 4 === 3
      ? `right : 0px !important;`
      : `left: 50%; transform: translate(-50%);`}
`;

export const SubWalletDisabledToolTip = styled.div`
  text-align: justify;
  margin: 0px;
`;
