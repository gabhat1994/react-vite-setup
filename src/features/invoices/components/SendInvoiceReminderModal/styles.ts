import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

type TextProps = {
  bold?: boolean;
};

const Text = styled(TSpan).attrs<TextProps>(({ bold }) => ({
  colorToken: '--text-modal-neutral-default',
  font: bold ? 'body-l-bold' : 'body-l',
}))<TextProps>``;

export default {
  Text,
};
