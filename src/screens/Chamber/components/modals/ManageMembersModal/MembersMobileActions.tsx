import { type FC } from 'react';
import { Spacer, Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { useAuth } from '@/features/auth/contexts';
import { Button } from '@/components/Button';
import { useBreakpoints } from '@/hooks';
import { useDataGrid } from '@/components/DataGrid';
import { type NoumMemberBasicFragment } from '@/apollo/graphql/fragments';
import { ButtonUtils } from '@/components/Button/utils';
import { t } from 'i18next';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { type ChamberMobileActionsProps } from './types';
import { MobileBottomActionsContainer } from './styles';

const MembersMobileActions: FC<ChamberMobileActionsProps> = ({
  onToggleFilter,
  inviteMembers,
}) => {
  const { isActive: access } = useAuth();
  const { isMobile } = useBreakpoints();
  const { isOwner } = useNoumContext();
  const { rowSelection } = useDataGrid<NoumMemberBasicFragment>();
  const { hasNoumPermission } = useNoumAuthorization();
  const hasInviteMembersPermission = hasNoumPermission('invite-users', isOwner);
  return (
    <MobileBottomActionsContainer
      isSelectedRow={rowSelection.selectedItems.length !== 0 && isMobile}
    >
      <Stack>
        {isMobile && (
          <Button
            size="large"
            neutral
            onClick={onToggleFilter}
            data-testid="chamber-filtering"
            rightIcon={
              <Icon
                name="align_center_m"
                size={24}
                color="--icon-button-neutral-default"
              />
            }
          />
        )}
        <Spacer width={12} />
        <Button
          onClick={inviteMembers}
          softDisabled={!access}
          size="large"
          primary
          data-testid="create-chamber"
          leftIcon={
            <Icon
              name="plus_m"
              size={24}
              color={!access ? '--icon-button-neutral-alt-default' : ''}
            />
          }
          disabled={!hasInviteMembersPermission}
          {...ButtonUtils.getTooltipProps({
            message: t(
              'noumena.chamber.member_management.no_permission.invite_users',
            ),
            position: 'bottom-center',
            visible: !hasInviteMembersPermission,
          })}
        />
      </Stack>
    </MobileBottomActionsContainer>
  );
};

export default MembersMobileActions;
