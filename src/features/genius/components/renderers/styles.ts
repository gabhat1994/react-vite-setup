import { Stack, StackItem } from '@/layout';
import styled from 'styled-components';

const StyledImage = styled.img`
  max-width: 100%;
  vertical-align: middle;
`;

const ImageContainer = styled(StackItem)<{ selected?: boolean }>`
  position: relative;
  border: ${({ selected }) =>
    selected
      ? 'solid 2px var(--border-avatar-brand-primary-default)'
      : 'solid 2px transparent'};
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  min-height: 150px;
  background-color: var(--bg-card-neutral-default);
`;

const CheckIconContainer = styled(Stack)`
  top: 0;
  left: 0;
  background: var(--bg-card-brand-primary-default);
  position: absolute;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-bottom-right-radius: 12px;
`;

export default {
  StyledImage,
  ImageContainer,
  CheckIconContainer,
};
