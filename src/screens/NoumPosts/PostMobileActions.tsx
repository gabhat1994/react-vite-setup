import { type FC } from 'react';
import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { MobileBottomActionsContainer } from './styles';
import { usePostElement } from '../Chamber/components/elements/PostElement/PostElementProvider';
import { type PostMobileActionProps } from './types';

const PostMobileActions: FC<PostMobileActionProps> = ({ setIsOpenFilter }) => {
  const { setShowCreate, isMasterNoum } = usePostElement();
  return (
    <MobileBottomActionsContainer>
      <Stack justify="end" fullWidth gap={12}>
        {!isMasterNoum && (
          <Button
            size="large"
            neutral
            onClick={() => setIsOpenFilter(true)}
            data-testid="chamber-filtering"
            rightIcon={
              <Icon
                name="align_center_m"
                size={24}
                color="--icon-button-neutral-default"
              />
            }
          />
        )}
        <Button
          onClick={() => setShowCreate(true)}
          size="large"
          primary
          data-testid="create-chamber"
          leftIcon={<Icon name="plus_m" size={24} />}
        />
      </Stack>
    </MobileBottomActionsContainer>
  );
};

export default PostMobileActions;
