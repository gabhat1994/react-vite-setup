import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { useToast } from '@/hooks';
import { isValidFileSize } from '@/utils/file';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PROFILE_RADIUS, PROFLE_SIZE, getBannerEditOptions } from './constants';
import {
  BannerDescription,
  DropDownBannerbutton,
  ProfileBannerImage,
  StyledAvatarContainer,
} from './styles';
import {
  ProfileSize,
  type AvatarProps,
  type ProfileImageActionType,
} from './types';

export const ProfileBanner = ({
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
  onClose,
  width: customWidth,
  height: customHeight,
  borderRadius: customBorderRadius,
  opacity,
  isBanner = false,
  onClear,
  loading,
}: AvatarProps) => {
  const height = customWidth || PROFLE_SIZE[size || ProfileSize.L];

  const borderRadius =
    customBorderRadius ?? PROFILE_RADIUS[size || ProfileSize.L];

  const { t } = useTranslation();
  const { addToast } = useToast();
  const isUploading = useMemo(
    () => (isUploadStarted && !isUploadComplete) || false,
    [isUploadComplete, isUploadStarted],
  );

  const isCoverUrl = useMemo(
    () => (isBanner && editable && !url) || false,
    [editable, isBanner, url],
  );

  const handleAddNewPhoto = () => {
    if (editable) onHandleUpload?.();
  };

  useEffect(() => {
    if (editable && !isValidFileSize(fileSize || 0, maximumFileSize)) {
      onClose?.();
    }
  }, [editable, fileSize, maximumFileSize, addToast, t, onClose]);

  const handleSelectDropdown = (
    selectedDropdown?: DropdownValueType<ProfileImageActionType>,
  ) => {
    switch (selectedDropdown?.value) {
      case 'add-new-image':
        handleAddNewPhoto();
        break;
      case 'generate-image-with-genius':
        onGenerateImage?.();
        break;
      case 'remove-image':
        onClear?.();
        break;
    }
  };

  const options = getBannerEditOptions({
    isGenerateImageEnabled: !!onGenerateImage,
    isRemovePhotoEnabled: !!isBanner && !!url,
    isCoverPhoto: isBanner,
  });

  return (
    <>
      <Dropdown
        containerWidth="max-content"
        options={options}
        usePortal={false}
        isAnimation={false}
        onSelectOption={handleSelectDropdown}
        placement="bottom-start"
        observerMinHeight="0"
        renderContainerFromBottom
      >
        {({
          targetRef,
          targetProps,
          toggle,
        }: DropdownTargetProps<HTMLButtonElement>) => (
          <StyledAvatarContainer
            aria-label="profile-banner"
            data-testid="avatarContainer"
            size={isBanner ? customHeight! : height}
            radius={borderRadius}
            disabled={disabled}
            opacity={opacity}
            isBanner={isBanner}
            isCoverUrl={isCoverUrl}
          >
            {url ? (
              <ProfileBannerImage
                src={url}
                size={isBanner ? customHeight : customWidth || height}
                isBanner={isBanner}
              />
            ) : !isBanner ? (
              <Icon
                imageIconName="avatar_m"
                size={height}
                data-testid="avatarIcon"
              />
            ) : (
              editable && (
                <Icon
                  name="picture_m"
                  size={150}
                  data-testid="avatarIcon"
                  color="--color-base-gray-90"
                />
              )
            )}
            {(isUploading || loading) && <Spinner />}
            {!isUploading && editable && (
              <div>
                {isBanner && url ? (
                  <DropDownBannerbutton
                    ref={targetRef}
                    {...targetProps}
                    size="small"
                    leftIcon={
                      <Icon
                        size={24}
                        name="picture_m"
                        color="--icon-tag-neutral-alt-default"
                      />
                    }
                    color="--icon-tag-neutral-alt-default"
                    onClick={toggle}
                  >
                    <TSpan
                      font="button-s"
                      colorToken="--bg-card-neutral-alt-default"
                    >
                      {t(`noumena.avatar.editable_button_text`)}
                    </TSpan>
                  </DropDownBannerbutton>
                ) : (
                  <DropDownBannerbutton
                    ref={targetRef}
                    {...targetProps}
                    size="small"
                    color="--icon-tag-neutral-alt-default"
                    onClick={toggle}
                  >
                    <Icon
                      name="picture_m"
                      color="--bg-body-neutral-alt-default"
                      size={24}
                    />
                  </DropDownBannerbutton>
                )}
              </div>
            )}
            {isBanner && editable && !url && (
              <BannerDescription>
                <TSpan
                  font="button-s"
                  colorToken="--text-button-neutral-disabled"
                >
                  {t(`noumena.editor.Cover_photo_description`)}
                </TSpan>
              </BannerDescription>
            )}
          </StyledAvatarContainer>
        )}
      </Dropdown>
    </>
  );
};
