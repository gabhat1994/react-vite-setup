import styled from 'styled-components';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { sizes } from '@/constants/devices';

const Content = styled(Stack).attrs({
  vertical: true,
  align: 'center',
  padding: '40px',
})`
  background-color: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  max-width: 668px;

  @media (max-width: ${sizes.TABLET_L}) {
    max-width: 100%;
  }
`;

const ContentWrapper = styled(Stack).attrs({
  fullWidth: true,
  justify: 'center',
})`
  @media (max-width: ${sizes.TABLET_L}) {
    padding: 0 36px;
  }
`;

const MessageTitle = styled(TSpan).attrs({
  font: 'heading-xs-bold',
  colorToken: '--text-card-neutral-highlighted',
})``;

const MessageDescription = styled(TSpan).attrs({
  font: 'body-l',
  colorToken: '--text-card-neutral-default',
})``;

const ResubscribeText = styled(TSpan).attrs({
  font: 'body-l',
  colorToken: '--text-card-neutral-default',
})``;

const Layout = styled(Stack).attrs({
  fullWidth: true,
  justify: 'center',
  padding: '24px 0 24px',
})``;

const Image = styled.img`
  max-width: 104px;
`;

const ManageButton = styled(Button).attrs({
  size: 'small',
})`
  span {
    color: var(--text-button-brand-primary-default) !important;
  }
`;

const SpinnerContainer = styled.div`
  position: relative;
`;

export default {
  Image,
  Content,
  Layout,
  MessageTitle,
  ContentWrapper,
  MessageDescription,
  ManageButton,
  ResubscribeText,
  SpinnerContainer,
};
