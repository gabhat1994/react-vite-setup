import { type FC, useCallback, useMemo } from 'react';
import generate from 'uniqid';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { useLaunchDarkly } from '@/hooks/launchDarkly';

import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { useWindowDimensions } from '@/hooks';
import { Stack } from '@/layout';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { getTimeStampForDisplaying } from '@/utils/getTimeStampForDisplaying';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { SpaceUtils } from '@/utils/space';
import {
  EditOptions,
  EditOptionsContainer,
  ThreeDotsIconWrapper,
} from './styles';
import { NavigationItems } from './constants';
import { type NoumEditOptionsProps, type TNoumEditModal } from './types';

export const NoumEditOptionsNew: FC<NoumEditOptionsProps> = ({
  onSelect,
  isNoumPublishedAtAll,
  isShowRestore,
}) => {
  const { space, isOwner } = useEditChamberState();
  const { hasNoumPermission } = useNoumAuthorization();
  const publishedDate = useMemo(
    () =>
      space?.publishedAt
        ? getTimeStampForDisplaying(space.publishedAt, true)
        : undefined,
    [space?.publishedAt],
  );
  const { flags } = useLaunchDarkly();
  const { width } = useWindowDimensions();
  const navItemCount = useMemo(
    () => (width < 1280 ? 3 : width < 1440 ? 5 : 6),
    [width],
  );

  const onItemClick = useCallback(
    (v: TNoumEditModal | DropdownValueType<string>) => {
      if (typeof v === 'object') {
        onSelect?.(v.value as TNoumEditModal);
      }
      onSelect?.(v);
    },

    [onSelect],
  );

  const showNavigationItems = useMemo(
    () =>
      NavigationItems.map((item) => ({
        ...item,
        show: ['manage_members', 'visibility_settings'].includes(item.value)
          ? flags.elementPermission
          : ['invites', 'permission'].includes(item.value)
          ? !flags.elementPermission
          : item.value === 'broadcasting'
          ? flags.broadcast
          : item.value === 'customize'
          ? hasNoumPermission('set-noum-theme', true)
          : item.value === 'custom_preview'
          ? flags.customNoums
          : item.value === 'noum_ads'
          ? flags.noumAds && SpaceUtils.isPublicNoum(space)
          : item.value === 'noumena_copilot'
          ? flags.noumAds
          : item.value === 'archive'
          ? isOwner
          : true,
      })).slice(0, navItemCount),
    [
      navItemCount,
      flags.elementPermission,
      flags.broadcast,
      flags.customNoums,
      flags.noumAds,
      hasNoumPermission,
      space,
      isOwner,
    ],
  );

  const moreItems: DropdownValueType<string>[] = useMemo(
    () =>
      NavigationItems.filter(
        (item) =>
          item.value !== 'restore_last_published_version' || isShowRestore,
      )
        .filter(
          (item) =>
            showNavigationItems.findIndex(
              (sItem) => sItem.value === item.value,
            ) < 0 &&
            item.value !== 'save_as_a_template' &&
            // item.value !== 'noum_ads' &&
            item.value !== 'noumena_copilot',
        )
        .map((item) => ({
          ...item,
          type: 'value',
          key: item.label,
          label:
            item.value === 'restore_last_published_version' ? (
              <Stack vertical aria-label="noum-edit-mode-header-options">
                <TSpan>{item.label}</TSpan>
                {publishedDate && (
                  <TSpan
                    font="footnote"
                    colorToken="--text-tablecell-body-neutral-default"
                  >
                    {t(`noumena.noum_editor.published_on`, { publishedDate })}
                  </TSpan>
                )}
              </Stack>
            ) : item.value === 'archive' ? (
              <TSpan colorToken="--text-tablecell-danger-primary-default">
                {item.label}
              </TSpan>
            ) : (
              item.label
            ),
        })),
    [isShowRestore, publishedDate, showNavigationItems],
  );

  const filteredMoreItems: DropdownValueType<string>[] = useMemo(
    () =>
      moreItems.filter((item) => {
        switch (item.value) {
          case 'broadcasting':
            return flags.broadcast && hasNoumPermission('broadcast-noum', true);
          case 'custom_preview':
            return (
              flags.customNoums &&
              hasNoumPermission('custom-noum-preview', true)
            );
          case 'noum_ads':
            return flags.noumAds && SpaceUtils.isPublicNoum(space);
          case 'archive':
            return isOwner;
          default:
            return true;
        }
      }),
    [
      flags.broadcast,
      flags.customNoums,
      flags.noumAds,
      hasNoumPermission,
      isOwner,
      moreItems,
      space,
    ],
  );

  return (
    <>
      <EditOptionsContainer
        data-testid="sideBar"
        aria-label="noum-edit-mode-options-container"
      >
        {showNavigationItems.map(
          ({ label, type, value, show, disableBeforeFirstPublish }) =>
            show ? (
              <EditOptions
                key={generate()}
                onClick={() => {
                  if (!(disableBeforeFirstPublish && isNoumPublishedAtAll)) {
                    onItemClick(value);
                  }
                }}
                data-testid="navItem"
                disabled={disableBeforeFirstPublish && isNoumPublishedAtAll}
              >
                <TSpan
                  data-testid={`noum-edit-option-${label}`}
                  font="body-m-bold"
                  colorToken={
                    disableBeforeFirstPublish && isNoumPublishedAtAll
                      ? '--text-button-neutral-disabled'
                      : type === 'error'
                      ? '--text-tablecell-header-danger-primary-highlighted'
                      : '--text-button-brand-primary-default'
                  }
                >
                  {label}
                </TSpan>
              </EditOptions>
            ) : undefined,
        )}
        <Dropdown
          containerWidth="max-content"
          hideIcons
          closeOnSelect
          onSelectOption={(value) => onItemClick(value)}
          options={filteredMoreItems}
          usePortal={false}
          isAnimation={false}
          observerMinHeight="0"
          placement="auto"
        >
          {({
            targetRef,
            targetProps,
            toggle,
          }: DropdownTargetProps<HTMLDivElement>) => (
            <ThreeDotsIconWrapper
              ref={targetRef}
              onClick={toggle}
              {...targetProps}
            >
              <Icon
                name="more_m"
                size={24}
                color="--icon-button-brand-primary-default"
              />
            </ThreeDotsIconWrapper>
          )}
        </Dropdown>
      </EditOptionsContainer>
    </>
  );
};
