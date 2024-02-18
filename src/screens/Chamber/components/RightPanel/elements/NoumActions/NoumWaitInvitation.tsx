import React from 'react';
import { useTranslation } from 'react-i18next';

import { TSpan } from '@/components/Typography';
import { RowContainer, NoumActionButton } from './styles';

export const NoumWaitInvitation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <NoumActionButton testId="user-connection-button" disabled size="full">
        {t('noumena.chamber.connect_button')}
      </NoumActionButton>
      <RowContainer>
        <TSpan
          data-testid="bodyChamberWaitingText"
          font="body-m"
          colorToken="--text-card-neutral-default"
          textAlign="center"
        >
          {t('noumena.noum.text.need_invited_to_noum.text')}
        </TSpan>
      </RowContainer>
    </>
  );
};
