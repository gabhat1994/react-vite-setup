import { Stack } from '@/layout';
import styled from 'styled-components';

const Container = styled(Stack).attrs({
  fullWidth: true,
})`
  background: var(--bg-card-neutral-default);
  border-radius: 8px;
  margin-top: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`;

export default {
  Container,
};
