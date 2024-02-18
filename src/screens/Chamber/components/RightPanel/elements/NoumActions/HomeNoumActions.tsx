import React from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';

import { Icon } from '@/components/Icon';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import ROUTES from '@/constants/routes';
import { RowContainer, NoumActionButton } from './styles';

export const HomeNoumActions: React.FC = () => {
  const navigate = useNavigate();
  const { editDisabled } = useNoumContext();

  return (
    <>
      <RowContainer data-testid="home-noum-actions">
        <NoumActionButton
          disabled={editDisabled}
          size="full"
          primary
          leftIcon={
            <Icon
              name="edit_m"
              size={24}
              color="--icon-button-neutral-alt-default"
            />
          }
          onClick={() => navigate(ROUTES.EDIT_HOME_NOUM)}
        >
          {t('noumena.chamber.edit_button')}
        </NoumActionButton>
      </RowContainer>
    </>
  );
};
