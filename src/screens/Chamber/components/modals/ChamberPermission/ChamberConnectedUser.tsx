import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConnectionPermissionTypeEnum } from '@/apollo/generated/types';
import { TSpan } from '@/components/Typography';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { useWindowDimensions } from '@/hooks';
import { getFullName } from '@/utils/fullName';
import { UserUtil } from '@/utils/user';
import { options } from './data';
import {
  type PermissionDropdownProps,
  type ChamberConnectedUserProps,
} from './types';
import {
  DropdownPicker,
  UserBody,
  UserTitle,
  UserName,
  UserWrapper,
  PickedPermission,
} from './styles';

export const ChamberConnectedUser: React.FC<ChamberConnectedUserProps> = ({
  user,
  currentPermission,
  onChangePermission,
  isNonMember = false,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const window = useWindowDimensions();

  const selected = useMemo(
    () =>
      currentPermission
        ? (currentPermission as ConnectionPermissionTypeEnum)
        : ConnectionPermissionTypeEnum.Guest,
    [currentPermission],
  );
  const isMobile = useMemo(() => window.width < 768, [window]);
  const selectableOptions: PermissionDropdownProps[] = useMemo(() => {
    const opts: PermissionDropdownProps[] = [];
    options.forEach((o) => {
      if (!(isNonMember && o.value === ConnectionPermissionTypeEnum.Favorite))
        opts.push({
          ...o,
          selected: selected === o.value,
        });
    });
    return opts;
  }, [isNonMember, selected]);
  const onSelect = useCallback(
    (option: PermissionDropdownProps) => {
      onChangePermission(option.value);
    },
    [onChangePermission],
  );
  return (
    <UserWrapper>
      <Avatar url={UserUtil.getProfilePicture(user) ?? ''} />
      <UserBody>
        <UserName>
          <TSpan
            font="body-l-bold"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {getFullName(user.firstName, user.middleName, user.lastName)}
          </TSpan>
          {isNonMember ? (
            <UserTitle
              font="body-m"
              colorToken="--text-tablecell-body-neutral-default"
            >
              {t('noumena.chamber_edit.permission.non_member')}
            </UserTitle>
          ) : (
            <>
              {!!user.title && (
                <UserTitle
                  font="body-m"
                  colorToken="--text-tablecell-body-neutral-default"
                >
                  {user.title}
                </UserTitle>
              )}
            </>
          )}
        </UserName>
        <Dropdown
          hideIcons
          closeOnSelect
          placement="bottom-end"
          options={selectableOptions}
          leftIcon={
            <Icon
              name="tick_m"
              size={24}
              color="--icon-tablecell-neutral-highlighted"
            />
          }
          containerWidth={isMobile ? '100%' : '440px'}
          onSelectOption={onSelect}
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
            <DropdownPicker ref={targetRef} {...targetProps} onClick={toggle}>
              <PickedPermission
                font="body-m-bold"
                colorToken="--text-tablecell-body-neutral-default"
              >
                {t(`noumena.chamber_edit.permission.${selected.toLowerCase()}`)}
              </PickedPermission>
              <Icon
                name={`chevron_small_${isOpen ? 'up' : 'down'}_m`}
                size={16}
                color="--icon-tablecell-neutral-highlighted"
              />
            </DropdownPicker>
          )}
        </Dropdown>
      </UserBody>
    </UserWrapper>
  );
};
