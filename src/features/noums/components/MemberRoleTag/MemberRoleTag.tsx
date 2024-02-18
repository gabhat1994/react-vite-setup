import { type NoumMemberBasicFragment } from '@/apollo/graphql/fragments';
import { Icon } from '@/components/Icon';
import { NoumMemberStatus } from '@/apollo/generated/types';
import { MemberRoleTransition } from './MemberRoleTransition';
import { ManagerTag, StyledTag } from './styles';

interface MemberRoleTagProps {
  member: NoumMemberBasicFragment;
}

export function MemberRoleTag({ member }: MemberRoleTagProps) {
  const currentRole = member.role;
  const nextRole = member.rolePromotionToApprove;

  if (
    nextRole?._id &&
    currentRole._id !== nextRole?._id &&
    member.status === NoumMemberStatus.Connected
  ) {
    return <MemberRoleTransition member={member} />;
  }

  if (member.role.isManager) {
    return (
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
    );
  }

  return <StyledTag tertiary>{member.role.name}</StyledTag>;
}
