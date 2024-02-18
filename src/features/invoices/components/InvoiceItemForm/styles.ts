import styled from 'styled-components';
import { Stack } from '@/layout';

const Container = styled(Stack)<{ hasError?: boolean }>`
  border-radius: 8px;
  padding: 16px;
  border: solid 1px
    ${(props) =>
      props.hasError
        ? 'var(--border-input-danger-primary-default)'
        : 'var(--border-input-neutral-default)'};
`;

export default {
  Container,
};
