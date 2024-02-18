import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { NewConversationContext } from '@/features/conversation/contexts/NewConversationContext';
import { NoumLayoutViewMode } from '@/features/conversation/types';
import { t } from 'i18next';
import {
  forwardRef,
  useContext,
  useRef,
  type ReactNode,
  type Ref,
} from 'react';
import { useNoumElement } from '@/features/noums/contexts/NoumElementContext';
import ConversationModal from './ConversationModal';
import { MessageElementContext } from './contexts/MessageElementProvider';
import {
  BodyWrapper,
  ConversationLoadingWrapper,
  ConversationWrapper,
  HeaderWrapper,
  InfoWrapper,
  MainWrapper,
  Wrapper,
} from './styles';

type ViewModeProps = {
  id?: string;
  ElementHeader: ReactNode;
  ChatList: ReactNode;
  ConversationHeader: ReactNode;
  ConversationBody: ReactNode;
  ChatFooter: ReactNode;
};

export const ViewModeLayout = forwardRef(
  (props: ViewModeProps, ref: Ref<HTMLDivElement>) => {
    const headRef1 = useRef<HTMLDivElement>(null);
    const headRef2 = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const headHeights = [
      headRef1.current?.scrollHeight ?? 0,
      headRef2.current?.scrollHeight ?? 0,
    ];
    const { isEditing } = useNoumElement();
    const footerHeight = footerRef?.current?.scrollHeight ?? 0;

    const {
      viewMode,
      isOthersConversations,
      noumLayoutViewMode,
      isNoumLayoutSmallViewMode,
      isNoumLayoutCompactViewMode,
    } = useContext(MessageElementContext);
    const { loading: isCreatingNewConversation } = useContext(
      NewConversationContext,
    );

    return (
      <Wrapper ref={ref} data-testid="mew-wrapper" id={props.id}>
        {isCreatingNewConversation && (
          <ConversationLoadingWrapper data-testid="mew-spinner">
            <Spinner />
          </ConversationLoadingWrapper>
        )}

        <MainWrapper
          viewMode={viewMode}
          noumLayoutViewMode={noumLayoutViewMode}
          data-testid="mew-main-wrapper"
        >
          <HeaderWrapper
            data-testid="msg-header-wrapper"
            isElement
            ref={headRef1}
            noumLayoutViewMode={noumLayoutViewMode}
          >
            {props.ElementHeader}
          </HeaderWrapper>
          <BodyWrapper
            headerHeight={headHeights[0]}
            noumLayoutViewMode={noumLayoutViewMode}
            footerHeight={0}
          >
            {isOthersConversations && !isNoumLayoutCompactViewMode && (
              <InfoWrapper>
                <TSpan font="body-s" colorToken="--text-body-neutral-default">
                  {t(`noumena.message.other_users_conversation_notice`)}
                </TSpan>
              </InfoWrapper>
            )}
            {props.ChatList}
            {props.ChatFooter}
          </BodyWrapper>
        </MainWrapper>
        {noumLayoutViewMode !== NoumLayoutViewMode.NOUMLAYOUTSMALL && (
          <ConversationWrapper
            viewMode={viewMode}
            data-testid="mew-conversation-wrapper"
          >
            <HeaderWrapper ref={headRef2}>
              {props.ConversationHeader}
            </HeaderWrapper>
            <BodyWrapper
              headerHeight={headHeights[1]}
              noumLayoutViewMode={NoumLayoutViewMode.NOUMLAYOUTCOMPACT}
              footerHeight={footerHeight}
            >
              {props.ConversationBody}
            </BodyWrapper>
          </ConversationWrapper>
        )}
        {isNoumLayoutSmallViewMode && !isEditing && (
          <ConversationModal
            ConversationBody={props.ConversationBody}
            ConversationHeader={props.ConversationHeader}
          />
        )}
      </Wrapper>
    );
  },
);
