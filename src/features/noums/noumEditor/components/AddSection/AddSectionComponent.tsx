import { t } from 'i18next';
import { type FC } from 'react';
import { Icon } from '@/components/Icon';
import { CenterIcon, AddSectionComponentWrapper } from './styles';
import { type AddSectionComponentProps } from './types';

export const AddSectionComponent: FC<AddSectionComponentProps> = ({
  onClick,
  iconSize = 16,
}) => (
  <AddSectionComponentWrapper
    aria-label="add_content"
    data-title={t('noumena.noum_editor.add_section')}
    onClick={(e) => (onClick ? onClick() : e.stopPropagation())}
  >
    <CenterIcon>
      <Icon name="plus_icon" size={iconSize} />
    </CenterIcon>
  </AddSectionComponentWrapper>
);
