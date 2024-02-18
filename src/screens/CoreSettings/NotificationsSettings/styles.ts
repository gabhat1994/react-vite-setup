import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';

const Layout = styled(Stack).attrs({
  vertical: true,
  gap: 32,
  padding: '40px 0 0',
  fullWidth: true,
})`
  @media (max-width: ${sizes.TABLET_L}) {
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled(Stack).attrs({
  vertical: true,
  gap: 32,
})``;

const HeaderText = styled(TSpan).attrs({
  font: 'heading-m-bold',
  colorToken: '--text-card-header-neutral-highlighted',
})``;

const NoteText = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-header-neutral-default',
})``;

const SubTitle = styled(TSpan).attrs({
  font: 'heading-xs-bold',
  colorToken: '--text-card-header-neutral-highlighted',
})``;

const Header = styled(Stack).attrs({
  gap: 32,
  vertical: true,
})``;

const OptionsContainer = styled(Stack).attrs({
  vertical: true,
  gap: 16,
})``;

const Option = styled(Stack).attrs({
  gap: 12,
  align: 'center',
})``;

const CheckboxLabel = styled(TSpan)``;

export default {
  Container,
  HeaderText,
  SubTitle,
  OptionsContainer,
  Option,
  CheckboxLabel,
  Header,
  Layout,
  NoteText,
};
