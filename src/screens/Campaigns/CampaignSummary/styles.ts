import styled, { css } from 'styled-components';
import { Stack } from '@/layout';
import { Card } from '@/components/Card';
import { TSpan } from '@/components/Typography';
import { mediaSizes } from '@/constants/devices';

const Right = styled(Stack).attrs({
  fullWidth: false,
  align: 'center',
  gap: '16px',
})`
  width: auto;
`;

const Main = styled(Stack).attrs({
  vertical: true,
  align: 'center',
  justify: 'center',
  gap: '16px',
})`
  width: 1130px;
  align-self: center;
  padding: 24px;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 100%;
    padding: 0px;
  }
`;

const Container = styled(Card)`
  width: 100%;
  padding: 24px;
`;

const ContainerTitle = styled(TSpan).attrs({
  font: 'heading-xs-bold',
  colorToken: '--text-card-neutral-highlighted',
})``;

const InfoContainer = styled(Stack).attrs({
  gap: '32px',
  align: 'center',
})<{ applyTouchStyles?: boolean }>`
  ${({ applyTouchStyles }) =>
    applyTouchStyles &&
    css`
      align-items: start;
    `}
`;

const Info = styled(Stack).attrs({
  vertical: true,
  gap: '8px',
})``;

const Label = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-neutral-default',
})``;

const Ul = styled.ul`
  margin: 0;
  min-width: 252px;
  padding-inline-start: 25px;
`;

const Value = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-input-neutral-filled',
})``;

const Count = styled(Stack).attrs({
  align: 'center',
  justify: 'center',
})`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--bg-badge-brand-secondary-default);
`;

const FileContainer = styled(Stack).attrs({
  align: 'center',
  justify: 'space-between',
  fullWidth: true,
})`
  padding: 0;
`;
const FileSide = styled(Stack).attrs({
  align: 'center',
  gap: 16,
})``;
const FileIcon = styled(Stack).attrs({
  align: 'center',
  justify: 'center',
})`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
`;

const StackForCampaignHeading = styled(Stack).attrs({
  vertical: true,
})`
  width: 190px;
`;

export default {
  Right,
  Container,
  Main,
  ContainerTitle,
  InfoContainer,
  Info,
  Label,
  Ul,
  Value,
  Count,
  FileContainer,
  FileSide,
  FileIcon,
  StackForCampaignHeading,
};
