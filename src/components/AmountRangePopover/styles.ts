import styled from 'styled-components';
import { Stack } from '@/layout';
import { BasicPopoverContent } from '../Popover/Popover';

const Container = styled(Stack)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PopoverContainer = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

const PopoverContent = styled(BasicPopoverContent)``;

export default {
  Container,
  PopoverContainer,
  PopoverContent,
};
