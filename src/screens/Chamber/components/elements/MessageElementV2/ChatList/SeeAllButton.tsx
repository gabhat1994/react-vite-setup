import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SeeAllMessages } from './styles';

type SeeAllButtonProps = {
  onClick: () => void;
};

export const SeeAllButton: FC<SeeAllButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <SeeAllMessages onClick={onClick}>
      <TSpan font="button-m" colorToken="--text-button-brand-primary-default">
        {t('noumena.chat.see_all_messages')}
      </TSpan>
      <Icon
        name="chevron_small_right_m"
        size={24}
        color="--icon-button-brand-secondary-default"
      />
    </SeeAllMessages>
  );
};
