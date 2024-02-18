import styled from 'styled-components';
import { TSpan } from '../Typography';
import { type OptionSelectorSize } from './types';

const Container = styled.button<{
  size: OptionSelectorSize;
  isSelected: boolean;
}>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  gap: 12px;
  padding: ${(props) => (props.size === 'small' ? '8px 12px' : '12px 12px')};
  background-color: transparent;
  border: 1px solid
    ${(props) =>
      props.isSelected
        ? 'var(--border-option-selector-neutral-pressed)'
        : 'var(--border-option-selector-neutral-default)'};
  border-radius: 4px;
  cursor: pointer;
  max-height: 56px;
  height: 56px;
`;

interface LabelProps {
  isSelected: boolean;
}

const Label = styled(TSpan).attrs<LabelProps>((props) => ({
  font: props.isSelected ? 'body-m-bold' : 'body-m',
}))<LabelProps>`
  white-space: nowrap;
  flex-grow: 1;
`;

const SideElement = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`;

export default {
  Container,
  Label,
  SideElement,
};
