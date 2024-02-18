import { type NoumMemberBasicFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { Button, Icon, TSpan } from '@/components';
import { Avatar } from '@/components/Avatar/Avatar';
import { useAuth } from '@/features/auth/contexts';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { UserUtil } from '@/utils/user';
import React from 'react';
import { MemberRoleTag } from '../MemberRoleTag';

type ManagerDetailsHeaderProps = {
  rightContent?: React.ReactNode;
  member: Maybe<NoumMemberBasicFragment>;
  onGoBack?: () => void;
};

export const ManagerDetailsBaseHeader: React.FC<ManagerDetailsHeaderProps> = ({
  rightContent,
  member,
  onGoBack,
}) => {
  const { user: currentUser } = useAuth();
  const { isMobile } = useBreakpoints();

  if (!member) {
    return null;
  }

  return (
    <Stack align="center" justify="space-between">
      <Stack align="center" gap={8}>
        <Stack align="center">
          <Button
            neutral
            textOnly
            icon={
              <Icon
                color="--icon-button-neutral-default"
                name="arrow_left_m"
                size={24}
              />
            }
            onClick={onGoBack}
          />
          {!isMobile && (
            <Avatar size="M" url={UserUtil.getProfilePicture(member.user)} />
          )}
        </Stack>

        <Stack
          vertical={isMobile}
          align={isMobile ? 'start' : 'center'}
          gap={isMobile ? 4 : 8}
        >
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-card-neutral-highlighted"
          >
            {UserUtil.renderFullName(member.user)}

            {currentUser?._id === member.user?._id ? (
              <TSpan colorToken="--text-card-neutral-default"> (You)</TSpan>
            ) : null}
          </TSpan>

          <MemberRoleTag member={member} />
        </Stack>
      </Stack>

      <Stack align="center" gap={16}>
        {rightContent}
      </Stack>
    </Stack>
  );
};
