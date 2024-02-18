import styled from 'styled-components';
import { Stack } from '@/layout';

export const ROW_HEIGHT = 56;

const ListRow = styled(Stack).attrs({
  fullWidth: true,
  vertial: true,
  gap: 16,
})``;

const ListItem = styled(Stack).attrs({
  fullWidth: true,
})``;

export default {
  ListRow,
  ListItem,
};
