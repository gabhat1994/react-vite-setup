import { t } from 'i18next';

import { useBreakpoints } from '@/hooks';
import { Privacy } from '@/apollo/generated/types';
import { UsersSearchSelector } from '@/features/events/components';
import { useCreateEditEventContext } from '@/features/events/contexts';

import type { MemberPickerProps } from './types';
import { ButtonContainer, Button } from './styles';
import { EventMemberInput } from '../EventMemberInput';

export const MemberPicker = ({
  type = 'member',
  btnLabel,
  onBtnClick,
  chamberId,
  initialData,
  onChange,
  dropdownProps = {
    placement: 'bottom',
    usePortal: false,
  },
  ...props
}: MemberPickerProps) => {
  const { privacy } = useCreateEditEventContext();
  const { isMobile } = useBreakpoints();
  return (
    <UsersSearchSelector
      multiselect
      type={type}
      chamberId={chamberId}
      initialData={initialData}
      searchPlaceholder={t('noumena.event.modal.add_members_placeholder')}
      dropdownProps={dropdownProps}
      onChangeSelectedUsers={onChange}
      onlyConnected={privacy === Privacy.Connected}
      renderSearch={({ inputRef, ...renderProps }) => (
        <EventMemberInput
          multiselect
          ref={inputRef}
          isEditing={true}
          hideSaveButton={true}
          hideCancelButton={true}
          label={t('noumena.event.modal.add_host')}
          {...renderProps}
        />
      )}
      {...props}
    >
      {({ selectedOptions, onClose }) =>
        btnLabel ? (
          <ButtonContainer isMobile={isMobile} justify="end">
            <Button
              size="large"
              primary
              disabled={!selectedOptions.length}
              testId="add-new-member"
              onClick={() => {
                onClose(true);
                onBtnClick?.();
              }}
            >
              {btnLabel}
            </Button>
          </ButtonContainer>
        ) : null
      }
    </UsersSearchSelector>
  );
};
