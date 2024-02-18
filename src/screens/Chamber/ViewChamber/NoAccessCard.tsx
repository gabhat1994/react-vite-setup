import React from 'react';
import styled from 'styled-components';
import { t } from 'i18next';
import { Spacer } from '@/layout';
import { Root } from '@/layout/NoumLayout/styles';
import { StyledCard } from '@/screens/Chamber/components/ProfileSummary/styles';
import { TSpan } from '@/components/Typography';
import { devices } from '@/constants/devices';

const ErrorCardTextWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media ${devices.TABLET_L} {
    padding: 72px 189.5px;
  }
`;

const NoAccessCard: React.FC = () => (
  <>
    <Spacer height={24} />
    <Root>
      <StyledCard>
        <ErrorCardTextWrapper>
          <TSpan
            textAlign="center"
            font="heading-xs-bold"
            colorToken="--text-card-neutral-highlighted"
          >
            {t('noumena.no_access_card_error')}
          </TSpan>
          <Spacer height={8} />
          <TSpan
            textAlign="center"
            font="body-m"
            colorToken="--text-card-neutral-default"
          >
            {t('noumena.no_access_card_message')}
          </TSpan>
        </ErrorCardTextWrapper>
      </StyledCard>
    </Root>
  </>
);

export default NoAccessCard;
