import React, { useMemo } from 'react';

import { t } from 'i18next';
import { Avatar } from '@/components/Avatar/Avatar';
import { Infinite } from '@/components/Infinite';
import { Checkbox } from '@/components/Checkbox';
import { Icon } from '@/components/Icon';
import { useWindowDimensions } from '@/hooks/dimensions';
import {
  DropdownItemLayout,
  CheckboxWrapper,
  DropDownLabel,
  DropdownValueWrapper,
  DropdownValueLabel,
  DropdownValueDescription,
} from '@/components/Dropdown/styles';
import { UserUtil } from '@/utils/user';
import { Stack } from '@/layout';
import { NoumenaUserType } from '@/apollo/generated/types';
import { OptionRendererWrapper, AvatarWrapper, TagLabel } from './styles';
import { type UserOptionItemProps } from './types';

export const MessageUserOptionRenderer: React.FC<UserOptionItemProps> = ({
  options,
  multiselect,
  activeItem,
  loading,
  hasMore,
  onSelect,
  onFetchMore,
}) => {
  const { width } = useWindowDimensions();

  const infiniteStatus = loading ? 'loading' : hasMore ? 'hasNextPage' : 'end';

  const showCheck = useMemo(() => {
    if (width < 768) return multiselect;

    return false;
  }, [multiselect, width]);

  return (
    <OptionRendererWrapper>
      <Infinite
        data-testid="users-list"
        status={infiniteStatus}
        paddingBottom={infiniteStatus !== 'end' ? '30px' : '0px'}
        onFetchMore={onFetchMore}
      >
        {options.map((option) =>
          option.type === 'value' ? (
            <DropdownItemLayout
              key={option.key}
              active={activeItem?.key === option.key}
              tabIndex={0}
              onClick={() => onSelect(option)}
            >
              <DropDownLabel selected={activeItem?.key === option.key}>
                <AvatarWrapper>
                  <Avatar
                    url={UserUtil.getProfilePicture(option.value) || undefined}
                    size="M"
                  />
                </AvatarWrapper>
                <DropdownValueWrapper>
                  <DropdownValueLabel>{option.label}</DropdownValueLabel>
                  <Stack gap={3}>
                    {option.description && (
                      <DropdownValueDescription>
                        {option.description}
                      </DropdownValueDescription>
                    )}
                    {option.value.userType === NoumenaUserType.Noumena && (
                      <TagLabel>
                        {t('noumena.message.noumena.employees')}
                      </TagLabel>
                    )}
                  </Stack>
                </DropdownValueWrapper>
              </DropDownLabel>
              {showCheck && (
                <CheckboxWrapper data-testid="user-checkbox">
                  <Checkbox
                    isChecked={option.selected ?? false}
                    icon={
                      <Icon
                        name="tick_m"
                        size={option.selected ? 24 : 0}
                        color="--icon-checkbox-neutral-alt-default"
                      />
                    }
                  />
                </CheckboxWrapper>
              )}
            </DropdownItemLayout>
          ) : null,
        )}
      </Infinite>
    </OptionRendererWrapper>
  );
};
