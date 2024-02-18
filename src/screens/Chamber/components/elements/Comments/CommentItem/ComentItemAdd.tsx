import { PermissibleElementType } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { PostMention } from '@/features/posts/components';
import { SendButton } from '@/screens/Chamber/components/elements/Comments/styles';
import { ICON_SIZE } from '@/screens/Chamber/components/elements/PostElement/components/PostItem/constants';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SpaceUtils } from '@/utils/space';
import { COMMENT_MAX_LEN } from '../constants';
import { CommentItemAddContainer } from './styles';
import { usePostElement } from '../../PostElement/PostElementProvider';

type CommentItemAddProps = {
  onSubmit: (content: string) => void;
  createComment: () => void;
  isReply: boolean;
  value: string;
  isSubmitting: boolean;
  addTag: (id: string | number) => void;
};

const CommentItemAdd = ({
  onSubmit,
  createComment,
  value = '',
  isSubmitting = false,
  addTag,
  isReply,
}: CommentItemAddProps) => {
  const { t } = useTranslation();
  const isError = useMemo(
    () => value.length > COMMENT_MAX_LEN || !value.trim(),
    [value],
  );
  const { space } = usePostElement();

  const { hasElementPermission } = useNoumAuthorization();

  const hasCommentPostsPermission = SpaceUtils.isProjectNoum(space)
    ? hasElementPermission(
        PermissibleElementType.Posts,
        'comment-posts',
        true,
      ) ||
      // TODO: Remove after we migrate followers to be regular member roles.
      !!space?.isFollowing
    : true;

  return (
    <CommentItemAddContainer>
      <div style={{ width: 0, flex: 1 }}>
        <PostMention
          val={value}
          setVal={onSubmit}
          addTag={addTag}
          error={false}
          isTextArea
          textAreaHeight={58}
          maxHeight={176}
          disabled={!hasCommentPostsPermission}
          maxLength={COMMENT_MAX_LEN}
          placeholder={isReply ? t('noumena.reply.placeholder') : undefined}
        />
      </div>
      <SendButton
        data-testid="comment-item-add-send"
        neutral
        disabled={isError}
        tooltipPosition="top-left"
        tooltipText={
          !hasCommentPostsPermission
            ? t('noumena.post.no_permission.add_comment')
            : undefined
        }
        loading={isSubmitting}
        icon={
          <Icon
            color={
              isError
                ? '--icon-button-neutral-disabled'
                : '--icon-button-neutral-pressed'
            }
            name="send_m"
            size={ICON_SIZE}
          />
        }
        onClick={createComment}
      />
    </CommentItemAddContainer>
  );
};

export default CommentItemAdd;
