import { t } from 'i18next';
import { MultiMediaPicker } from '@/features/upload/components';
import { Stack } from '@/layout';
import { Dropdown } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { mediaTypes } from '@/constants/fileTypes';
import { ModalFooter } from '@/components/ExtendedModal';
import { type CreatePostFooterProps } from './types';
import { PostButton, VisibilitySelect } from './styles';

const PostModalFooter = (props: CreatePostFooterProps) => {
  const {
    handleSelectedImage,
    setImageUploading,
    onUploadFile,
    images,
    showVisibility,
    options,
    postVisibility,
    setPostVisibility,
    loading,
    isEdit,
    isValid,
    multiFilesAllowed,
    imageUploading,
    handlePosting,
    clipboard,
  } = props;
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;
  return (
    <ModalFooter>
      <Stack
        data-testid="create_post_action_buttons"
        justify="space-between"
        fullWidth
      >
        <MultiMediaPicker
          clipboard={clipboard}
          acceptedFileTypes={mediaTypes}
          onContentChange={handleSelectedImage}
          onUploading={setImageUploading}
          onUploadFile={onUploadFile}
          maxSize={500}
          type="post"
          disabled={multiFilesAllowed ? false : Boolean(images?.length)}
        />
        {isMobile && showVisibility && (
          <VisibilitySelect data-testid="post_visibility_selector">
            <TSpan font="footnote" colorToken="--text-input-neutral-default">
              {t('noumena.chambers.element.posts.visible_for')}
            </TSpan>
            <Dropdown
              hideIcons
              usePopStyle
              options={options}
              inputValue={postVisibility?.value || undefined}
              onSelectOption={(option) => setPostVisibility(option)}
              containerWidth="211px"
              containerHeight="100px"
              minHeight="100px"
              calRefTop={false}
            >
              {({ inputProps, inputRef, toggle }) => (
                <TextField
                  readOnly
                  {...inputProps}
                  ref={inputRef}
                  value={String(postVisibility.label)}
                  spellCheck="false"
                  rightIcon={
                    <Icon
                      name="chevron_down_m"
                      color="--icon-input-neutral-default"
                      size={16}
                      onClick={toggle}
                    />
                  }
                />
              )}
            </Dropdown>
          </VisibilitySelect>
        )}
        {!isMobile && (
          <PostButton
            testId="post_create_btn"
            loading={loading}
            primary
            leftIcon={
              loading || isEdit ? undefined : (
                <Icon
                  name="send_m"
                  size={19}
                  color={
                    !isValid ? '--icon-button-neutral-disabled' : undefined
                  }
                />
              )
            }
            disabled={!isValid || loading || imageUploading}
            onClick={handlePosting}
          >
            {isEdit
              ? t('noumena.button.save')
              : t('noumena.chambers.element.posts.post')}
          </PostButton>
        )}
      </Stack>
    </ModalFooter>
  );
};

export default PostModalFooter;
