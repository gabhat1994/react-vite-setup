import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { type NoumThemeItemWrapperProps } from './types';

export const ThemePanelContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  padding: 12px 16px 0px;
  gap: 12px;
`;

export const ThemePickerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PickerBody = styled.div`
  padding: 16px 16px 16px 16px;
  display: flex;
  flex-grow: 1;
  height: 0;
  border-bottom: 1px solid var(--border-card-neutral-default);
  align-items: flex-start;
  overflow-y: auto;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ThemeItemWrapper = styled.div<NoumThemeItemWrapperProps>`
  position: relative;
  border: 2px solid
    ${({ isSelected }) =>
      isSelected
        ? 'var(--border-card-brand-primary-default)'
        : 'var(--border-card-neutral-default)'};
  border-radius: 8px;
  height: 168px;
  margin-bottom: 16px;
  min-width: 40%;
  flex: 1;
  cursor: pointer;
`;

export const StyledImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

export const StyledCheckWrapper = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
`;

export const StyledCheck = styled.img`
  width: 40px;
  height: 40px;
`;

export const StyledTitle = styled.div<NoumThemeItemWrapperProps>`
  color: ${({ isSelected }) =>
    isSelected
      ? 'var(--text-card-brand-primary-default)'
      : 'var(--text-card-neutral-highlighted)'};

  font-size: var(--font-body-medium-bold-size);
  font-family: var(--font-body-medium-bold-font);
  padding: 12px 16px;
  font-weight: var(--font-body-medium-bold-weight);
`;

export const FontPickersBodyWrapper = styled.div`
  overflow-y: auto;
`;

export const FontPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`;

export const FontTitle = styled(TSpan)`
  padding: 16px;
`;

export const SeparateLine = styled.div<{
  width?: string;
}>`
  width: 100%;
  height: ${({ width }) => width || '1px'};
  background-color: var(--bg-separator-neutral-default);
`;

export const FontPickerWrap = styled.div`
  padding: 16px;
`;

export const DropdownContainer = styled.div`
  padding-top: 8px;
`;

export const FontItemOptionButton = styled(Button)`
  border-radius: 0;
  min-height: unset;
  min-width: unset;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  height: max-content;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent !important;
`;

export const OptionIcon = styled.div<{ selected?: boolean }>`
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid var(--border-radiobutton-neutral-default);
  border-radius: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: ' ';
    border-radius: 100%;
    transition: all 0.1s ease-in;
    background-color: var(--icon-radiobutton-brand-primary-default);
    ${({ selected }) =>
      selected
        ? `
          width: 12px;
          height: 12px;
        `
        : `
          width: 0;
          height: 0;
        `}
  }
`;

export const FontDropdownRightIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;
