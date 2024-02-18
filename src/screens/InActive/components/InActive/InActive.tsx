import { type FC, useEffect, useMemo } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import AuthScreenLayout from '@/layout/AuthScreenLayout';
import { Spacer } from '@/layout';
import { useAuth } from '@/features/auth/contexts';
import { useWindowDimensions } from '@/hooks';
import { sizes } from '@/constants/devices';
import { UserStatus } from '@/apollo/generated/types';
import { TSpan } from '@/components/Typography';
import { type InActiveProps } from './types';
import {
  Wrapper,
  RejectedWrapper,
  StyledSubTitle,
  StyledTitle,
} from './styles';

const tableWidth = parseInt(sizes.TABLET, 10) || 768;
const events = [
  'click',
  'mousemove',
  'load',
  'scroll',
  'keydown',
  'wheel',
  'beforeunload',
];

export const InActive: FC<InActiveProps> = (props: InActiveProps) => {
  const windowSize = useWindowDimensions();
  const { userStatus, handleLogout } = props;
  const { user } = useAuth();
  const isMobile = useMemo(
    () => windowSize.width < tableWidth,
    [windowSize.width],
  );

  useEffect(() => {
    if (user?.userStatus === UserStatus.Rejected) {
      Sentry.captureException(
        new Error(`user: ${user}, file: "InActive.tsx"`),
        {
          tags: { section: 'Tracking Logout' },
        },
      );
      events.forEach((event) => {
        window.addEventListener(event, handleLogout, false);
      });
    }

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleLogout, false);
      });
    };
  }, [user, user?.userStatus, handleLogout]);

  if (userStatus !== UserStatus.Rejected) return null;

  return (
    <AuthScreenLayout type="onboarding">
      <Wrapper>
        <RejectedWrapper vertical data-testid="rejectedContainer">
          <StyledTitle
            data-testid="inActiveTitle"
            colorToken="--text-body-header-neutral-default"
            font={isMobile ? 'heading-s-bold' : 'heading-m-bold'}
          >
            {t('noumena.signup.rejected_title', {
              name: user?.firstName || '',
            })}
          </StyledTitle>
          <Spacer height={16} />
          <StyledSubTitle
            data-testid="inActiveSubTitle"
            colorToken="--text-body-neutral-default"
          >
            {t('noumena.signup.rejected_subTitle')}
          </StyledSubTitle>
          <Spacer height={32} />
          <TSpan colorToken="--text-body-neutral-default" font="body-m">
            {t('noumena.signup.rejected_description')}
          </TSpan>
          <Spacer height={32} />
          <TSpan colorToken="--text-body-neutral-default" font="body-m">
            {t('noumena.thanks')},
          </TSpan>
          <Spacer height={32} />
          <TSpan colorToken="--text-body-neutral-default" font="body-m">
            {t('noumena.team')}
          </TSpan>
        </RejectedWrapper>
      </Wrapper>
    </AuthScreenLayout>
  );
};

export default InActive;
