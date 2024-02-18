import { forwardRef, type Ref } from 'react';
import { format } from 'date-fns';
import { Avatar } from '@/components/Avatar/Avatar';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { UserUtil } from '@/utils/user';
import { Icon } from '@/components';
import MemberBadge from '@/screens/Chambers/RequestsAndInvitesV2/components/MemberBadge';
import { SpaceTypeEnum } from '@/apollo/generated/types';
import { t } from 'i18next';
import { type MemberRequest } from './types';

export const MemberRequestInformation = forwardRef(
  (
    {
      user,
      gap,
      date,
      dateText,
      projectName,
      type,
      isCurrentUser,
    }: MemberRequest,
    ref: Ref<HTMLDivElement>,
  ) => {
    const handleClick = () => {
      UserUtil.goToUserProfile(user, '_self');
    };

    const showMemberBadge = type === SpaceTypeEnum.Home;
    return (
      <Stack
        data-testid="MemberRequest_container"
        ref={ref}
        onClick={handleClick}
        padding={12}
      >
        <Stack gap={gap} align="center">
          <Avatar url={user?.profile?.profilePicture || ''} />
          <Stack vertical>
            <Stack align="center" gap={8}>
              <TSpan
                font="body-m-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {isCurrentUser
                  ? t('noumena.search.noum.you')
                  : UserUtil.renderFullName(user)}
              </TSpan>
              {projectName && !showMemberBadge && (
                <>
                  <Icon
                    name="arrow_right_m"
                    size={16}
                    color="--icon-tablecell-neutral-default"
                  />
                  <TSpan
                    font="body-m-bold"
                    color="--text-tablecell-header-neutral-highlighted"
                  >
                    {projectName}
                  </TSpan>
                </>
              )}
              {showMemberBadge && <MemberBadge />}
            </Stack>
            <TSpan
              font="footnote"
              colorToken="--text-tablecell-header-neutral-default"
            >
              {user?.title || ''}
            </TSpan>
            <TSpan
              font="footnote"
              colorToken="--text-timestamp-neutral-default"
            >
              {dateText}
              {date ? format(new Date(date), 'MMM dd, yyyy hh:mm a') : ''}
            </TSpan>
          </Stack>
        </Stack>
      </Stack>
    );
  },
);
