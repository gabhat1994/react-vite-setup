import { useCallback, useMemo, useState } from 'react';
import { capitalize } from 'lodash';
import { TSpan } from '@/components/Typography';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { getFullName } from '@/utils/fullName';
import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { UserUtil } from '@/utils/user';
import { inviteOptions } from '../../data';
import {
  type InviteStatusDropdownProps,
  type ChamberInvitedUserProps,
} from '../../types';
import {
  DropdownPicker,
  DropdownWrapper,
  UserBody,
  UserName,
  UserWrapper,
  PickedInviteStatus,
} from '../../styles';

export const ChamberInvitedUser: React.FC<ChamberInvitedUserProps> = ({
  user,
  onSelect,
  isNonNoumTab = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const invitedStatus = useMemo(() => user.connectionStatus, [user]);
  const invitedStatusText = useMemo(() => {
    if (isNonNoumTab && !user.isVerified) return 'Pending';
    if (isNonNoumTab && user.isVerified) return 'Accepted';
    switch (user.connectionStatus) {
      case ConnectionRequestTypeEnum.Invited:
        return 'Pending';
      default:
        return capitalize(user.connectionStatus);
    }
  }, [user, isNonNoumTab]);
  const selectableOptions = useMemo(() => {
    if (isNonNoumTab && user.isVerified) {
      return inviteOptions.filter((o) => o.value !== 'Resend');
    }
    switch (user.connectionStatus) {
      case ConnectionRequestTypeEnum.Invited:
        return inviteOptions.filter((o) => o.value !== 'Resend');
      case ConnectionRequestTypeEnum.Declined:
      case ConnectionRequestTypeEnum.Cancelled:
      case ConnectionRequestTypeEnum.Removed:
        return inviteOptions.filter((o) => o.value !== 'Cancel');
    }
    return inviteOptions;
  }, [isNonNoumTab, user.connectionStatus, user.isVerified]);
  const onHandleSelect = useCallback(
    (option: InviteStatusDropdownProps) => {
      onSelect(user, option.value);
    },
    [user, onSelect],
  );
  return (
    <UserWrapper>
      {user.isMember && <Avatar url={UserUtil.getProfilePicture(user)} />}
      <UserBody isPadding={user.isMember}>
        <UserName>
          <TSpan
            colorToken="--text-tablecell-header-neutral-highlighted"
            font={user.isMember ? 'body-l-bold' : 'body-l'}
          >
            {getFullName(user.firstName, '', user.lastName)}
          </TSpan>
          <TSpan
            colorToken="--text-tablecell-body-neutral-default"
            font="body-m"
            title={user?.title ?? ''}
          >
            {user.isMember ? user.title : user.email}
          </TSpan>
        </UserName>
        <DropdownWrapper>
          <Dropdown
            hideIcons
            closeOnSelect
            placement="bottom-end"
            options={selectableOptions}
            containerWidth="238px"
            onSelectOption={onHandleSelect}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            usePortal
            calRefTop={true}
            isAnimation={false}
            usePopStyle
            minHeight="fit-content"
            observerMinHeight="0px"
          >
            {({
              targetProps,
              targetRef,
              toggle,
            }: DropdownTargetProps<HTMLDivElement>) => (
              <DropdownPicker
                ref={targetRef}
                {...targetProps}
                onClick={
                  invitedStatus === ConnectionRequestTypeEnum.Approved ||
                  (isNonNoumTab && user.isVerified)
                    ? () => {}
                    : toggle
                }
              >
                <PickedInviteStatus
                  colorToken="--text-tablecell-body-neutral-default"
                  font="body-m"
                >
                  {invitedStatusText}
                </PickedInviteStatus>
                {!(
                  invitedStatus === ConnectionRequestTypeEnum.Approved ||
                  (isNonNoumTab && user.isVerified)
                ) && (
                  <Icon
                    name={`chevron_small_${isOpen ? 'up' : 'down'}_m`}
                    size={24}
                    color="--icon-tablecell-neutral-highlighted"
                  />
                )}
              </DropdownPicker>
            )}
          </Dropdown>
        </DropdownWrapper>
      </UserBody>
    </UserWrapper>
  );
};
