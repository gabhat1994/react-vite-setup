import { Stack } from '@/layout';
import styled from 'styled-components';
import { TSpan } from '../Typography';

const Layout = styled(Stack)<{ bottomGap?: boolean }>`
  background: var(--bg-card-neutral-alt-default);
  width: 313px;
  padding: 16px;
  border-radius: 8px;
  gap: 8px;
  box-shadow: 0px 4px 32px rgba(32, 17, 62, 0.08);
  position: relative;
  margin-bottom: ${({ bottomGap }) => (bottomGap ? '16px' : '0')};
`;

const ContentRight = styled(Stack).attrs({
  vertical: true,
})``;

const Header = styled(Stack).attrs({
  align: 'baseline',
})``;

const ButtonsContainer = styled(Stack)`
  margin-top: 16px;
`;

const IconContainer = styled.div`
  background-color: var(--bg-card-neutral-hover);
  padding: 6px;
  border-radius: 4px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 16px;
  cursor: pointer;
`;

const TitleText = styled(TSpan).attrs({
  font: 'body-m-bold',
  colorToken: '--text-card-neutral-highlighted',
})`
  padding-right: 16px;
  word-break: break-word;
`;

export default {
  Layout,
  ContentRight,
  Header,
  ButtonsContainer,
  IconContainer,
  CloseButton,
  TitleText,
};
