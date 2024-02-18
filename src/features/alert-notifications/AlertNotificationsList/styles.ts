import { Stack } from '@/layout';
import styled from 'styled-components';

const Container = styled(Stack).attrs({
  vertical: true,
})`
  position: absolute;
  overflow: hidden;
  right: 0px;
  top: 70px;
  padding: 16px;
  box-sizing: border-box;
  z-index: 100;
`;

export default {
  Container,
};
