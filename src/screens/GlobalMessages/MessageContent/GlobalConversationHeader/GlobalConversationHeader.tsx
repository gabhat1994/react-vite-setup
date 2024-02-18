import { useCallback, useContext, useRef } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { NewHomeConversationUserSelector } from '@/features/conversation/components/NewConversationUserSelector/NewHomeConversationUserSelector';
import ConversationProfile from '@/features/conversation/components/ConversationProfile';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { ViewMode } from '@/features/conversation/types';
import { GlobalConversationHeaderWrapper } from './styles';

const GlobalConversationHeader = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= breakpoints.MOBILE_MAX;
  const { setViewMode, isNewConversation, setIsNewConversation } = useContext(
    ConversationViewContext,
  );
  const newConversationRef =
    useRef<React.ElementRef<typeof NewHomeConversationUserSelector>>(null);

  const handleBack = useCallback(() => {
    setIsNewConversation(false);
    setViewMode(ViewMode.FULLCHAT);
    newConversationRef?.current?.cancel?.();
  }, [setIsNewConversation, setViewMode]);

  return (
    <GlobalConversationHeaderWrapper data-testid="conversionheader-wrapper">
      {isMobile && (
        <Button
          data-testid="back-button"
          neutral
          size="small"
          icon={
            <Icon
              name="arrow_left_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
          onClick={handleBack}
        />
      )}
      {isNewConversation ? (
        <NewHomeConversationUserSelector ref={newConversationRef} />
      ) : (
        <ConversationProfile />
      )}
    </GlobalConversationHeaderWrapper>
  );
};
export default GlobalConversationHeader;
