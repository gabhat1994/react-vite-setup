import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { useToast } from '@/hooks';
import { Spacer } from '@/layout';
import { isValidFileSize } from '@/utils/file';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AvatarEditButton } from './AvatarEditButton';
import {
  AVATAR_RADIUS,
  AVATAR_SIZE,
  OVERRIDED_ICON_RADIUS,
  OVERRIDED_ICON_SIZE,
} from './constants';
import { StyledAvatarContainer, StyledIcon, StyledOverlay } from './styles';
import { AvatarSize, type AvatarProps } from './types';
import {
  getAvatarDropdownOptions,
  type AvatarDropdownValueType,
} from './utils';

export const Avatar = ({
  disabled,
  url,
  size,
  fileSize,
  maximumFileSize,
  editable,
  isUploadComplete,
  isUploadStarted,
  onHandleUpload,
  onGenerateImage,
  onClear,
  onClose,
  width: customWidth,
  height: customHeight,
  borderRadius: customBorderRadius,
  opacity,
  onlyEditable,
  overridedIcon,
  spinnerColor,
  overlayColor,
}: AvatarProps) => {
  const height = customWidth || AVATAR_SIZE[size || AvatarSize.L];
  const width = customHeight || AVATAR_SIZE[size || AvatarSize.L];
  const borderRadius =
    customBorderRadius ?? AVATAR_RADIUS[size || AvatarSize.L];
  const overridedIconSize = OVERRIDED_ICON_SIZE[size || AvatarSize.L];
  const overridedIconBorderRadius = OVERRIDED_ICON_RADIUS[size || AvatarSize.L];

  const { t } = useTranslation();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isUploading = useMemo(
    () => (isUploadStarted && !isUploadComplete) || false,
    [isUploadComplete, isUploadStarted],
  );

  const options = getAvatarDropdownOptions({
    isGenerateImageEnabled: !!onGenerateImage,
  });

  const handleAddNewImage = () => {
    if (!isEditing && editable) onHandleUpload?.();
    else if (isEditing && editable) {
      onClear?.();
      setIsEditing(false);
    }
  };

  const handleSelectOption = (
    item: DropdownValueType<AvatarDropdownValueType>,
  ) => {
    switch (item.value) {
      case 'add-new-image':
        handleAddNewImage();
        break;
      case 'generate-new-image':
        onGenerateImage?.();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (onlyEditable) {
      setIsEditing(false);
    } else {
      setIsEditing(!!isUploadComplete);
    }
  }, [isUploadComplete, onlyEditable]);

  useEffect(() => {
    if (editable && !isValidFileSize(fileSize || 0, maximumFileSize)) {
      addToast(
        'error',
        'icon',
        `${t('noumena.avatar.editable_file_size_error')}`,
      );
      onClose?.();
    }
  }, [editable, fileSize, maximumFileSize, addToast, t, onClose]);

  return (
    <>
      <Dropdown
        onSelectOption={handleSelectOption}
        closeOnSelect
        placement="bottom-start"
        observerMinHeight="0"
        usePortal={false}
        options={options}
      >
        {({
          targetProps,
          targetRef,
          toggle,
        }: DropdownTargetProps<HTMLDivElement>) => (
          <StyledAvatarContainer
            data-testid="avatarContainer"
            size={height}
            radius={borderRadius}
            disabled={disabled}
            opacity={opacity}
          >
            <>
              {url ? (
                <img
                  src={url}
                  height={customWidth || height}
                  width={customWidth || width}
                  alt="avatar"
                  data-testid="avatarImage"
                />
              ) : (
                <Icon
                  imageIconName="avatar_m"
                  size={height}
                  data-testid="avatarIcon"
                />
              )}
              {!!overridedIcon && (
                <StyledIcon
                  color={
                    overridedIcon === 'arrow_down_m'
                      ? '--icon-button-success-secondary-default'
                      : '--icon-button-neutral-default'
                  }
                  name={overridedIcon}
                  size={overridedIconSize}
                  data-testid="overridedIcon"
                  overridedIcon={overridedIcon}
                  borderRadius={overridedIconBorderRadius}
                />
              )}
              {isUploading && overlayColor && (
                <StyledOverlay overlayColor={overlayColor} />
              )}
              {isUploading && <Spinner color={spinnerColor} />}

              {!isUploading && editable && (
                <AvatarEditButton
                  {...targetProps}
                  size={size}
                  ref={targetRef}
                  name={isEditing ? 'delete_m' : 'edit_m'}
                  edit={isEditing}
                  color={
                    isEditing
                      ? '--icon-button-danger-secondary-default'
                      : '--icon-button-neutral-default'
                  }
                  onClick={toggle}
                />
              )}

              {editable && (
                <>
                  <Spacer height={4} />
                  <TSpan
                    font="footnote"
                    colorToken="--text-placeholder-neutral-default"
                  >
                    {t(`noumena.avatar.editable_helper_text`)}
                  </TSpan>
                </>
              )}
            </>
          </StyledAvatarContainer>
        )}
      </Dropdown>
    </>
  );
};
