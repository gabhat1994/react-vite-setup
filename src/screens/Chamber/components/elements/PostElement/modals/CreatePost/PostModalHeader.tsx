import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { ModalHeader } from '@/components/ExtendedModal';
import { PostButton } from './styles';
import { type CreatePostHeaderProps } from './types';

const PostModalHeader = (props: CreatePostHeaderProps) => {
  const { loading, isValid, imageUploading, handlePosting, isEdit } = props;

  return (
    <ModalHeader
      rightMobileContainer={
        <PostButton
          testId="post_create_btn"
          loading={loading}
          secondary={!isEdit}
          primary={isEdit}
          disabled={!isValid || loading || imageUploading}
          leftIcon={
            loading || isEdit ? undefined : (
              <Icon
                name="send_m"
                size={19}
                color={!isValid ? '--icon-button-neutral-disabled' : undefined}
              />
            )
          }
          onClick={handlePosting}
        >
          {isEdit
            ? t('noumena.button.save')
            : t('noumena.chambers.element.posts.post')}
        </PostButton>
      }
    >
      {isEdit
        ? t('noumena.chambers.element.posts.edit_post')
        : t('noumena.chambers.element.posts.create_post')}
    </ModalHeader>
  );
};

export default PostModalHeader;
