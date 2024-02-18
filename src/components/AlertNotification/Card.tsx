import { TSpan } from '@/components/Typography';
import { Stack, StackItem } from '@/layout';
import { Icon } from '../Icon';
import { type Icons } from '../Icon/Icon';
import S from './styles';

type AlertNotificationProps = {
  title: string | undefined;
  icon: keyof typeof Icons;
  body: string;
  confirmButton?: React.ReactNode;
  dismissButton?: React.ReactNode;
  onDismiss?: () => void;
  bottomGap?: boolean;
};

export const Card = ({
  onDismiss,
  title,
  body,
  icon,
  confirmButton,
  dismissButton,
  bottomGap,
}: AlertNotificationProps) => (
  <S.Layout bottomGap={bottomGap}>
    <Stack>
      <S.IconContainer>
        <Icon name={icon} size={16} color="--icon-card-brand-primary-default" />
      </S.IconContainer>
    </Stack>

    <S.ContentRight fullWidth>
      <S.Header>
        <S.TitleText>{title}</S.TitleText>

        <S.CloseButton onClick={onDismiss}>
          <Icon name="close_m" size={16} color="--icon-card-neutral-default" />
        </S.CloseButton>
      </S.Header>
      <TSpan font="body-m" colorToken="--text-card-neutral-default">
        {body}
      </TSpan>

      <S.ButtonsContainer fullWidth gap={8}>
        <StackItem grow>{confirmButton}</StackItem>
        <StackItem grow>{dismissButton}</StackItem>
      </S.ButtonsContainer>
    </S.ContentRight>
  </S.Layout>
);
