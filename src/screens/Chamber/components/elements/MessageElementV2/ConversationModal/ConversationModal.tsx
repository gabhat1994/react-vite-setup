import { Modal, ModalSize } from '@/components/ExtendedModal';
import { breakpoints } from '@/constants/devices';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { useWindowDimensions } from '@/hooks';
import { MessageElementContext } from '@/screens/Chamber/components/elements/MessageElementV2/contexts/MessageElementProvider';
import { useContext, type FC, type ReactNode } from 'react';
import S from './styles';

type ConversationModalProps = {
  ConversationHeader: ReactNode;
  ConversationBody: ReactNode;
};

export const ConversationModal: FC<ConversationModalProps> = (props) => {
  const windowDimensions = useWindowDimensions();
  const isMobile = windowDimensions.width < breakpoints.TABLET;
  const { isNewConversation, isNoumLayoutSmallViewMode, setIsNewConversation } =
    useContext(MessageElementContext);
  const { activeConversationSid, setActiveConversationSid } = useContext(
    ActiveConversationContext,
  );

  const handleClose = () => {
    setActiveConversationSid('');
    setIsNewConversation(false);
  };

  const showModal =
    !!activeConversationSid ||
    (!!isNewConversation && !!isNoumLayoutSmallViewMode);

  return (
    <Modal
      open={showModal}
      size={ModalSize.L}
      onClose={handleClose}
      testId="noum-conversation-modal"
      disableBackdropClick
      isScrollableContent={false}
      spacingMode="gap-content"
      style={{ padding: 16, minHeight: 300 }}
      enableCloseButton={!isNewConversation}
      isFullScreen={isMobile}
    >
      <S.ModalHeaderStyled>{props.ConversationHeader}</S.ModalHeaderStyled>
      <S.ModalBodyStyled noFooter>{props.ConversationBody}</S.ModalBodyStyled>
    </Modal>
  );
};
