import { Avatar } from '@/components/Avatar/Avatar';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { UserUtil } from '@/utils/user';
import { useTranslation } from 'react-i18next';
import { Container, TextSection } from './styles';

type CreateSectionProps = {
  onClick: () => void;
};
export const CreateSection = ({ onClick }: CreateSectionProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <Container>
      <Avatar url={UserUtil.getProfilePicture(user) ?? ''} size="L" />
      <TextSection onClick={onClick}>
        <TSpan font="body-l" colorToken="--text-input-neutral-default">
          {t('noumena.create_post_placeholder')}
        </TSpan>
      </TextSection>
    </Container>
  );
};
