import { Button } from '@/components';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { useAuth } from '@/features/auth/contexts';
import { usePermissions, type UserType } from '@/features/posts/hooks';
import { usePostElement } from '@/screens/Chamber/components/elements/PostElement/PostElementProvider';
import { useMemo } from 'react';
import { MoreIcon } from './styles';

type PinDotsItemProps = {
  isInactive?: boolean;
  onHandleSelect: (val: DropdownValueType<string>) => void;
  userType: UserType;
  options: DropdownValueType<string>[];
  isPostAuthor?: boolean;
};

export default function PinDotsItem({
  options,
  userType,
  isInactive,
  onHandleSelect,
  isPostAuthor,
}: PinDotsItemProps) {
  const getUserPermission = usePermissions();
  const { isSpaceOwner: isOwner, isConnectedSpace, spaceId } = usePostElement();
  const { isUnregistered } = useAuth();
  const type = useMemo(() => {
    if (!isUnregistered) return userType;
    return userType === 'OWNER' ? 'UNREGISTEREDOWNER' : 'UNREGISTERED';
  }, [isUnregistered, userType]);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) => {
        if (!type) return false;
        switch (option.key) {
          case 'delete-post':
            return getUserPermission(
              'POST',
              'DELETE',
              isOwner ? 'OWNER' : type,
            );
          case 'report-post':
            return (
              !isInactive &&
              !isPostAuthor &&
              !['UNREGISTERED', 'UNREGISTEREDOWNER'].includes(type)
            );
          case 'pin-post':
            return getUserPermission('POST', 'PIN', type);
          case 'unpin-post':
            return getUserPermission('POST', 'UNPIN', type);
          case 'edit-post':
            return (
              isPostAuthor ||
              (type === 'ADMIN' &&
                (!spaceId || (spaceId && isConnectedSpace)) &&
                getUserPermission('POST', 'ADMIN_EDIT', type))
            );
          default:
            break;
        }
        return false;
      }),
    [
      getUserPermission,
      isConnectedSpace,
      isInactive,
      isOwner,
      isPostAuthor,
      options,
      spaceId,
      type,
    ],
  );

  if (filteredOptions.length < 1) {
    return null;
  }

  return (
    <Dropdown
      closeOnSelect
      placement="bottom-end"
      options={filteredOptions}
      containerWidth="121px"
      minHeight={`${filteredOptions.length * 50}px`}
      onSelectOption={onHandleSelect}
      usePortal={false}
      calRefTop={false}
      isAnimation={false}
      usePopStyle={true}
      observerMinHeight="0"
      padding="0px"
      unsetOverflow
    >
      {({
        targetProps,
        targetRef,
        toggle,
      }: DropdownTargetProps<HTMLButtonElement>) => (
        <Button
          size="small"
          neutral
          onClick={toggle}
          ref={targetRef}
          {...targetProps}
        >
          <MoreIcon
            name="more_m"
            size={24}
            color="--icon-card-neutral-default"
          />
        </Button>
      )}
    </Dropdown>
  );
}
