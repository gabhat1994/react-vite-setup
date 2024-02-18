import React from 'react';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { EmptyContainer } from './styles';

const GuestHomeEmpty: React.FC = () => (
  <EmptyContainer data-testid="guest-home-empty">
    <TSpan
      font="heading-xs-bold"
      colorToken="--text-card-neutral-highlighted"
      data-testid="empty-home-title"
    >
      {t(`noumena.guest.empty.home.page.title.text`)}
    </TSpan>
    <TSpan
      font="body-m"
      colorToken="--text-card-neutral-default"
      data-testid="empty-home-description"
    >
      <Trans
        i18nKey="noumena.guest.empty.home.page.description.text"
        components={{
          br: <br />,
        }}
      />
    </TSpan>
  </EmptyContainer>
);

export default GuestHomeEmpty;
