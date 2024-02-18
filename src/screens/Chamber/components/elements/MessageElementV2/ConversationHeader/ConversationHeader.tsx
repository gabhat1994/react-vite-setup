import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { CREAT_CONVERSATION_WITH_HOME_OWNER } from '@/constants/conversation';
import ConversationProfile from '@/features/conversation/components/ConversationProfile';
import { ConversationProfileView } from '@/features/conversation/components/ConversationProfile/ConversationProfileView';
import { NewConversationUserSelector } from '@/features/conversation/components/NewConversationUserSelector/NewConversationUserSelector';
import { NewHomeConversationUserSelector } from '@/features/conversation/components/NewConversationUserSelector/NewHomeConversationUserSelector';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { useExampleConversation } from '@/features/conversation/hooks/noumMessages/useExampleConversation';
import { ViewMode } from '@/features/conversation/types';
import { useNoumElement } from '@/features/noums/contexts/NoumElementContext';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useCallback, useContext, useRef, type FC } from 'react';
import { t } from 'i18next';
import { SpaceUtils } from '@/utils/space';
import { MessageElementContext } from '../contexts/MessageElementProvider';
import { useConversationType } from '../hooks/useConversationType';
import { HomeOwnerConversationProfile } from './HomeOwnerConversationProfile';
import { ButtonView, Wrapper } from './styles';

export const ConversationHeader: FC = () => {
  const addNewConversationRef =
    useRef<React.ElementRef<typeof NewConversationUserSelector>>(null);
  const { isMobile } = useBreakpoints();

  const { space, isOwner } = useNoumContext();
  const { activeConversationSid, setActiveConversationSid } = useContext(
    ActiveConversationContext,
  );
  const {
    isNewConversation,
    viewMode,
    setViewMode,
    isNoumLayoutCompactViewMode,
  } = useContext(MessageElementContext);
  const conversationType = useConversationType();
  const { totalCount } =
    ConversationHooks.useConversationsList(conversationType);

  const { exampleUser } = useExampleConversation();
  const { isEditing } = useNoumElement();

  const showExampleConversation = isEditing && totalCount === 0;
  const isMasterNoum = SpaceUtils.isMasterNoum(space);

  const backHandler = useCallback(() => {
    setViewMode(ViewMode.FULLCHAT);
    addNewConversationRef?.current?.cancel?.();
    setActiveConversationSid('');
  }, [setActiveConversationSid, setViewMode]);

  return (
    <Stack vertical fullWidth gap={16} data-testid="conversationheader-wrapper">
      {isNewConversation && (
        <Stack fullWidth justify={isMobile ? 'flex-start' : 'center'}>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-modal-header-neutral-default"
          >
            Start a New Conversation
          </TSpan>
        </Stack>
      )}

      <Wrapper>
        {isNoumLayoutCompactViewMode &&
          !isEditing &&
          totalCount === 0 &&
          !isNewConversation && (
            <Stack vertical grow justify="stretch" fullWidth align="stretch">
              <TSpan
                font="heading-xs-bold"
                colorToken="--text-modal-header-neutral-default"
              >
                {t(`noumena.chambers.toolbox.element.messages`)}
              </TSpan>
            </Stack>
          )}
        {viewMode === ViewMode.FULLCONVERSATION && (
          <ButtonView data-testid="back-button" onClick={backHandler}>
            <Icon
              name="arrow_left_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          </ButtonView>
        )}

        {isNewConversation ? (
          isMasterNoum ? (
            <NewHomeConversationUserSelector ref={addNewConversationRef} />
          ) : (
            <Stack fullWidth vertical>
              <NewConversationUserSelector ref={addNewConversationRef} />
            </Stack>
          )
        ) : isMasterNoum &&
          !isOwner &&
          activeConversationSid === CREAT_CONVERSATION_WITH_HOME_OWNER ? (
          <HomeOwnerConversationProfile />
        ) : showExampleConversation ? (
          <ConversationProfileView
            title="General"
            users={[exampleUser]}
            isConversationBlocked={false}
          />
        ) : (
          <ConversationProfile />
        )}
      </Wrapper>
    </Stack>
  );
};
