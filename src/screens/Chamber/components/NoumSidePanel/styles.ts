import styled, { css } from 'styled-components';
import { NoumLayoutSectionType } from '@/apollo/generated/types';
import { Stack } from '@/layout';

export const NoumSidePanelWrapper = styled.div``;

export const AlignPicker = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 4px;
  height: 30px;

  div {
    margin: 0px;
    gap: 4px;
  }

  label {
    height: 32px;
    width: 32px;
    padding: 0px;
    border-radius: 4px;
  }

  input {
    display: none;
  }
`;

const columnHoverEffect = css`
  :hover section {
    border: 1px solid var(--border-section-picker-brand-primary-default);
    div:not(.disabled) {
      border: 1px solid var(--border-section-picker-brand-primary-default);
      background: var(--bg-section-picker-brand-primary-default);
    }
    div.disabled {
      border: 1px solid var(--bg-section-picker-brand-secondary-disabled);
      background: var(--bg-section-picker-brand-secondary-disabled);
    }
  }
`;

export const DropdownPicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  height: 40px;
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 8px;
  padding: 4px;
  padding-right: 13px;
  :hover {
    border: 1px solid var(--border-section-picker-brand-primary-default);
  }
  ${columnHoverEffect}
`;

// ColumnOptions CSS
export const OptionContainer = styled.div<{ isFullWidth: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  box-sizing: border-box;
  padding: ${({ isFullWidth }) => (isFullWidth ? '7px' : '12px')};
  ${({ isFullWidth }) => isFullWidth && 'width: 100%; section {border:none}'};
  ${columnHoverEffect}
`;

export const ColumnContainer = styled.section<{ type: NoumLayoutSectionType }>`
  display: grid;
  grid-template-columns: ${({ type }) =>
    type === NoumLayoutSectionType.SingleColumn
      ? '1fr'
      : type === NoumLayoutSectionType.SingleColumn_700Px
      ? '1fr 60% 1fr'
      : type === NoumLayoutSectionType.TwoEqualColumns
      ? '1fr 1fr'
      : type === NoumLayoutSectionType.ThreeEqualColumns
      ? '1fr 1fr 1fr'
      : type === NoumLayoutSectionType.TwoColumnsLeftWider
      ? '30% 1fr'
      : type === NoumLayoutSectionType.TwoColumnsRightWider && '1fr 30%'};
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 4px;
  padding: 3px;
  gap: 6px;
  width: calc(100% - 8px);
  box-sizing: border-box;

  div {
    border: 1px solid var(--border-section-picker-brand-secondary-default);
    background: var(--bg-section-picker-brand-secondary-default);
    border-radius: 4px;
    box-sizing: border-box;
    height: 24px;
  }

  .disabled {
    background: var(--bg-section-picker-neutral-disabled);
    border: 1px solid var(--bg-section-picker-neutral-disabled);
  }
`;

export const ColumnChipsContainer = styled.div`
  margin: -6px;
  margin-top: 0px;
  form {
    div {
      gap: 4px;
    }
  }
`;

export const ToolPermissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0px 7px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;

export const ColumnPickerContainer = styled.div`
  width: 100%;
  padding: 16px 0;
  border-top: 4px solid var(--bg-separator-neutral-default);
  border-bottom: 4px solid var(--bg-separator-neutral-default);
`;

export const AppearanceSection = styled(Stack)`
  border-top: 1px solid var(--bg-separator-neutral-default);
`;
