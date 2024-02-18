import { Button } from '@/components/Button';
import styled from 'styled-components';

export const ButtonLink = styled(Button).attrs(() => ({
  textOnly: true,
}))`
  display: inline;
  padding: 0;
  margin: 0;
`;
