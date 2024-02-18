import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

const Title = styled(TSpan).attrs(() => ({
  font: 'body-l',
  colorToken: '--text-modal-neutral-highlighted',
}))`
  word-break: break-word;
`;

export default {
  Title,
};
