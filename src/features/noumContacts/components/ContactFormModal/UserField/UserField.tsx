import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { type Maybe, type UserOutput } from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import {
  SelectedUserType,
  useNoumContactFormContext,
} from '@/features/noumContacts/hooks/contactForm';
import { getErrorProps } from '@/utils/forms';
import { UserUtil } from '@/utils/user';
import { type UserSearchData } from './types';
import { UserSearch } from './UserSearch';

interface UserFieldProps {
  canChangeUser: boolean;
  selectedUserData: Maybe<UserOutput> | undefined;
  userType: SelectedUserType;
  onSelectUser(option: DropdownValueType<UserSearchData, string>): void;
  onResetUser(): void;
}

export function UserField({
  canChangeUser,
  selectedUserData,
  userType,
  onSelectUser,
  onResetUser,
}: UserFieldProps) {
  const { t } = useTranslation();
  const { control } = useNoumContactFormContext();

  if (!userType) {
    return (
      <Controller
        key="userId"
        control={control}
        name="userId"
        render={({ field: { onChange, ref, ...field }, fieldState }) => (
          <UserSearch
            {...field}
            label={t('noumena.noum_contacts.contact_form.fields.full_name')}
            leftIcon={
              <Icon
                name="search_m"
                size={24}
                color="--icon-input-neutral-default"
              />
            }
            disabled={!canChangeUser}
            noChevron
            onChange={(option) => {
              onChange(option.key);
              onSelectUser(option);
            }}
            {...getErrorProps(fieldState)}
          />
        )}
      />
    );
  }

  const isExistingUser = userType === SelectedUserType.Existing;

  return (
    <Controller
      key="fullName"
      control={control}
      name="fullName"
      render={({ field: { value } }) => (
        <TextField
          readOnly={isExistingUser}
          disabled={isExistingUser}
          label={t('noumena.noum_contacts.contact_form.fields.full_name')}
          inputSize="normal"
          value={value}
          leftIcon={
            isExistingUser && (
              <Avatar
                url={UserUtil.getProfilePicture(selectedUserData)}
                size="M"
              />
            )
          }
          rightIconColor="--icon-input-neutral-default"
          rightIcon={
            canChangeUser ? (
              <Icon name="close_m" size={16} onClick={onResetUser} />
            ) : undefined
          }
        />
      )}
    />
  );
}
