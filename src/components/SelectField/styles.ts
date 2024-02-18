import styled from 'styled-components';
import { Stack } from '@/layout';
import { Icon } from '../Icon';
import { TextField as OriginalTextField } from '../TextField';

const Container = styled.div`
  width: 100%;
`;

const RightIcon = styled(Icon).attrs(() => ({
  size: 16,
  color: '--icon-button-neutral-default',
}))<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;

const InputRightElements = styled(Stack).attrs(() => ({
  gap: 16,
  align: 'center',
}))`
  span {
    visibility: visible;
  }
`;

const TextField = styled(OriginalTextField)<{ $searchable?: boolean }>`
  cursor: ${(props) => (props.$searchable ? 'text' : 'pointer')};
`;

export default {
  RightIcon,
  Container,
  InputRightElements,
  TextField,
};
