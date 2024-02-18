import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { InlineAvatar } from '@/components/Avatar/Inline/Inline';
import * as S from './styles';
import { type BottomBarProp } from './types';

export const BottomBar = (props: BottomBarProp): JSX.Element => {
  const { urls, onClickShowAll } = props;
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.AvatarWrapper>
        <InlineAvatar urls={urls.length ? urls.slice(0, 3) : []} size="XL" />
        {!!urls && (
          <S.TotalUsers colorToken="--text-card-neutral-default">
            {t('noumena.social_hall.total_users', {
              userCount: urls.length,
            })}
          </S.TotalUsers>
        )}
      </S.AvatarWrapper>
      <Button secondary size="small" onClick={onClickShowAll}>
        {t('noumena.social_hall.show_all')}
      </Button>
    </S.Container>
  );
};
