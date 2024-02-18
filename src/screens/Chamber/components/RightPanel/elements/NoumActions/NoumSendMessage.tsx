import React from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router';
import { useGetOrCreateConversationMutation } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import routes from '@/constants/routes';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { ColumnContainer, NoumActionButton } from './styles';

type NoumSendMessageProps = {
  ownerId: string;
  isNoumEditor?: boolean;
};

export const NoumSendMessage: React.FC<NoumSendMessageProps> = ({
  ownerId,
  isNoumEditor,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [getOrCreateConversation] = useGetOrCreateConversationMutation();
  const { user } = useAuth();

  const handleClickOpenConversation = async () => {
    if (user?._id && ownerId) {
      const { data } = await getOrCreateConversation({
        variables: {
          userIds: [ownerId, user._id],
        },
      });
      const cid = data?.getOrCreateConversation?.cid;
      if (cid) {
        navigate(`${routes.MESSAGES}/${cid}`);
      }
    }
  };

  return (
    <>
      {isNoumEditor ? (
        <Button
          onClick={handleClickOpenConversation}
          tertiary
          icon={<Icon name="message_outline_m" size={24} />}
        />
      ) : (
        <ColumnContainer data-testid="noum-invited-connections">
          <NoumActionButton
            onClick={handleClickOpenConversation}
            size="full"
            secondary
          >
            {t('noumena.chamber.message_button')}
          </NoumActionButton>
        </ColumnContainer>
      )}
    </>
  );
};
