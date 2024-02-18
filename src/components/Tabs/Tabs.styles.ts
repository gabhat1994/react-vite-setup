import styled from 'styled-components';
import { motion } from 'framer-motion';
import { type Property } from 'csstype';
import { noScrollBar } from '@/common/globalStyles';

const widthSize = {
  small: '98px',
  medium: '106px',
  large: '168px',
  auto: 'auto',
};

const paddingSize = {
  small: '0px',
  medium: '9px',
  large: '9px',
  auto: '9px',
};

interface TabsContainerProps {
  size: 'small' | 'medium' | 'large' | 'auto';
  isActive: boolean;
  isBackground: boolean;
  isUnderline?: boolean;
  isActiveBackgroundOnly?: boolean;
  maxHeight?: Property.MaxHeight;
}

interface StyledTextProps {
  isActive: boolean;
  isWithoutImage: boolean;
  fontSize: string;
  isChips: boolean;
  font?: string;
}

interface InputRadioProps {
  isActive: boolean;
  isOutline?: boolean;
}

interface WrapperProps {
  isActive: boolean;
  fullWidth?: boolean;
  tabWidth?: string;
  justifyContent?: Property.JustifyContent;
}

interface UnderlineProps {
  width: number;
  left: number;
  animate?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  margin: 0 6px;
  position: relative;
  cursor: pointer;
  width: ${({ tabWidth, fullWidth }) =>
    tabWidth || (fullWidth ? '100%' : 'auto')};
  border-bottom: ${({ isActive, justifyContent }) =>
    isActive && justifyContent === 'center'
      ? '3px solid var(--bg-tab-basic-brand-primary-selected)'
      : 'none'};
`;
export const TabsContainer = styled.label<TabsContainerProps>`
  position: relative;
  box-sizing: border-box;
  width: ${({ size }) => widthSize[size]};
  max-height: ${({ maxHeight }) => maxHeight || '40px'};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ size, isUnderline }) =>
    isUnderline ? `${paddingSize[size]} 0px` : `${paddingSize[size]} 12px`};
  background: ${({ isActive }) =>
    isActive
      ? 'var(--bg-tab-chips-brand-secondary-selected)'
      : 'var(--bg-tab-chips-neutral-default)'};
  background: ${({ isUnderline, isActiveBackgroundOnly, isActive }) =>
    (isUnderline || (isActiveBackgroundOnly && !isActive)) && 'transparent'};
  border-radius: 8px;
  cursor: pointer;
`;

export const Dot = styled.div<{ dotColor?: string }>`
  box-sizing: border-box;
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: ${({ dotColor }) =>
    `var(${dotColor || '--bg-badge-danger-primary-default'})`};
  border: 2px solid var(--border-badge-neutral-alt-default);
  border-radius: 100%;
  top: -6px;
  right: -6px;
`;

export const InputRadio = styled.input<InputRadioProps>`
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border: ${({ isActive }) =>
    isActive
      ? '2px solid var(--text-tab-basic-brand-primary-selected)'
      : '2px solid var(--text-tab-basic-neutral-default)'};
  border: none;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  margin-right: -16px;
  ${({ isOutline }) =>
    isOutline && 'outline: 1px solid var(--border-badge-neutral-alt-default);'}
`;

export const StyledFormContainer = styled.div<{ manualScroll: boolean }>`
  position: relative;
  padding: ${({ manualScroll }) => (manualScroll ? '0 24px' : '0')};
  overflow: hidden;
  width: 100%;
`;

export const StyledForm = styled.form<{ fullWidth: boolean | undefined }>`
  display: flex;
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  overflow-x: scroll;
  padding-top: 6px;
  padding-bottom: 6px;
  ${noScrollBar}
`;

export const StyledText = styled.div<StyledTextProps>`
  font-size: var(${({ fontSize }) => fontSize});
  font-family: ${({ font }) => `var(${font || '--font-family'})`};
  font-weight: var(--font-body-medium-regular-weight);
  color: ${({ isActive }) =>
    isActive
      ? 'var(--text-tab-basic-brand-primary-selected)'
      : 'var(--text-tab-basic-neutral-default)'};
  color: ${({ isChips, isActive }) =>
    isChips && isActive
      ? 'var(--text-tab-chips-brand-primary-selected)'
      : isChips && !isActive && 'var(--text-tab-chips-neutral-default)'};

  margin-left: ${({ isWithoutImage }) => (isWithoutImage ? '-8px' : 'none')};
  white-space: nowrap;
`;

export const StoriesWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
`;

export const Underline = styled.div<UnderlineProps>`
  display: block;
  width: ${({ width }) => width}px;
  height: 2px;
  border-radius: 4px;
  background: var(--bg-tab-basic-brand-primary-selected);
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left}px;
  ${({ animate }) => animate && 'transition: left 0.5s;'}
`;

export const LeftButton = styled.div<{ position: string; visible?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ visible }) => (visible ? 'display: block;' : 'display: none;')}
  ${({ position }) => (position === 'left' ? 'left: 6px;' : 'right: 6px;')}
  cursor: pointer;
  transform: translateY(-50%);
`;

export const StyledMotion = styled(motion.div)<{
  manualScroll: boolean;
  justifyContent?: Property.JustifyContent;
  gap?: number;
}>`
  display: flex;
  flex-direction: row;
  width: ${({ manualScroll }) => (manualScroll ? 'unset' : '100%')};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  ${({ gap }) => gap && `gap: ${gap}px;`}
`;
