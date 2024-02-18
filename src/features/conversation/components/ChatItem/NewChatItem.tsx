import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { ChatItemWrapper, Content } from './styles';
import { type ChatItemProps } from './types';

const NewChatItem = ({ size }: { size?: ChatItemProps['size'] }) => {
  const { t } = useTranslation();
  return (
    <ChatItemWrapper active size={size}>
      <Icon
        data-testid="chat_new_icon-testid"
        name="chat_new"
        size={24}
        color="--icon-tablecell-neutral-highlighted"
      />
      <Content>
        <TSpan
          font={size === 'L' ? 'body-l-bold' : 'body-m-bold'}
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {t('noumena.chatItem.title')}
        </TSpan>
      </Content>
    </ChatItemWrapper>
  );
};

export default NewChatItem;
