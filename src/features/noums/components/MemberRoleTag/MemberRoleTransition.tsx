import { type NoumMemberBasicFragment } from '@/apollo/graphql/fragments';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout';
import { ManagerTag, StyledTag } from './styles';

interface MemberRoleTransitionProps {
  member: NoumMemberBasicFragment;
}

export function MemberRoleTransition({ member }: MemberRoleTransitionProps) {
  const currentRole = member.role;
  const nextRole = member.rolePromotionToApprove;

  return currentRole?._id ? (
    <Stack gap={8} align="center">
      <StyledTag tertiary>{currentRole.name}</StyledTag>
      <Icon
        color="--icon-tablecell-neutral-default"
        name="arrow_right_m"
        size={16}
      />

      {nextRole?.isManager ? (
        <ManagerTag
          icon={
            <Icon
              name="star_filled_m"
              size={16}
              color="--color-base-solid-orange"
            />
          }
        >
          Manager
        </ManagerTag>
      ) : (
        <StyledTag tertiary>{nextRole?.name}</StyledTag>
      )}
    </Stack>
  ) : null;
}
