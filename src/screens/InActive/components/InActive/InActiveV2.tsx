import NewAuthLayout from '@/layout/NewAuthLayout';
import { Main, Body } from '@/layout/NewAuthLayout/childrenStyles';
import { t } from 'i18next';
import { useBreakpoints, useError, useDomEvents } from '@/hooks';
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/contexts';
import { getFullName } from '@/utils/fullName';
import { UserStatus } from '@/apollo/generated/types';
import { Content, Heading, OutlineBox, Paragraph } from './styleV2';

const events = [
  'click',
  'mousemove',
  'load',
  'scroll',
  'keydown',
  'wheel',
  'beforeunload',
];

export const InActiveV2 = () => {
  const { isMobile } = useBreakpoints();
  const { user, signOut } = useAuth();
  const { logError } = useError();
  useDomEvents(events, signOut);

  useEffect(() => {
    if (user?.userStatus === UserStatus.Rejected) {
      logError(
        new Error(
          `user: ${getFullName(
            user?.firstName,
            user?.middleName,
            user?.lastName,
          )}, file: "InActive.tsx"`,
        ),
        'Tracking Logout',
        false,
      );
    }
  }, [logError, user]);

  return (
    <NewAuthLayout overflow="auto" dynamicHeight={isMobile}>
      <Main justify="center">
        <OutlineBox>
          <Body>
            <Heading>
              {t('noumena.signup.rejected_title', {
                name: user?.firstName || '',
              })}
            </Heading>
            <Content>
              <Paragraph>{t('noumena.signup.rejected.body.one')}</Paragraph>
              <Paragraph>{t('noumena.signup.rejected.body.two')}</Paragraph>
              <Paragraph>{t('noumena.thanks')},</Paragraph>
              <Paragraph>{t('noumena.team')}</Paragraph>
            </Content>
          </Body>
        </OutlineBox>
      </Main>
    </NewAuthLayout>
  );
};
