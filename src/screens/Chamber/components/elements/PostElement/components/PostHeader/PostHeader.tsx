import { PermissibleElementType } from '@/apollo/generated/types';
import { Button } from '@/components';
import { Icon } from '@/components/Icon';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { type WrapperViewProp } from '@/screens/Chamber/components/ElementWrapper';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import { SpaceUtils } from '@/utils/space';
import { useTranslation } from 'react-i18next';
import { ButtonUtils } from '@/components/Button/utils';
import { usePostElement } from '../../PostElementProvider';

const PostHeader = (props: WrapperViewProp) => {
  const { t } = useTranslation();

  const { currentTitle } = props;
  const { isCreatable, space, setShowCreate } = usePostElement();

  const { hasElementPermission } = useNoumAuthorization();

  const hasCreatePostsPermission = SpaceUtils.isProjectNoum(space)
    ? hasElementPermission(PermissibleElementType.Posts, 'create-posts', true)
    : true;

  return (
    <ElementWrapperV2.Header title={currentTitle}>
      {isCreatable && (
        <Button
          data-testid="create-post-button"
          size="small"
          icon={
            <Icon
              name="add_s"
              size={16}
              color="--icon-button-brand-secondary-default"
            />
          }
          secondary
          disabled={!hasCreatePostsPermission}
          {...ButtonUtils.getTooltipProps({
            message: t('noumena.post.no_permission.create_post'),
            position: 'top-left',
            visible: !hasCreatePostsPermission,
          })}
          onClick={() => setShowCreate(true)}
        />
      )}
    </ElementWrapperV2.Header>
  );
};

export default PostHeader;
