import { useCallback, useContext } from 'react';
import { t } from 'i18next';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { sideBarTabs } from '@/layout/GlobalMessageLayout/data';
import { Spacer } from '@/layout';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { ViewMode } from '@/features/conversation/types';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { GlobalChatList } from './GlobalChatList';
import { GlobalMessageContext } from '../contexts/GlobalMessageProvider';
import { ListWrapper, SideBarWrapper, TabsWrapper, Options } from './styles';

const SideBar = () => {
  const { notExistsConversation, selectedTabId, setSelectedTabId } =
    useContext(GlobalMessageContext);
  const { setViewMode, setIsNewConversation } = useContext(
    ConversationViewContext,
  );
  const { setActiveConversationSid } = useContext(ActiveConversationContext);

  const handleTab = useCallback(
    (val: string) => {
      if (!val) return;
      setSelectedTabId(Number(val));
    },
    [setSelectedTabId],
  );

  const handleCreateNewConv = useCallback(() => {
    setIsNewConversation(true);
    setViewMode(ViewMode.FULLCONVERSATION);
    setActiveConversationSid('');
    if (selectedTabId === 2) {
      setSelectedTabId(1);
    }
  }, [
    selectedTabId,
    setActiveConversationSid,
    setIsNewConversation,
    setSelectedTabId,
    setViewMode,
  ]);

  return (
    <SideBarWrapper data-testid="side_bar_wrapper">
      <ListWrapper padding={16} justifyContent="space-between">
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-body-header-neutral-default"
        >
          {t('noumena.chambers.toolbox.element.messages')}
        </TSpan>
        <Options>
          {/* // TODO Not implemented yet */}
          {false && (
            <Button
              size="small"
              secondary
              icon={
                <Icon
                  name="search_m"
                  size={24}
                  color="--icon-button-brand-secondary-default"
                />
              }
            />
          )}
          <Button
            size="small"
            primary
            icon={
              <Icon
                name="plus_m"
                size={24}
                color="--icon-button-neutral-alt-default"
              />
            }
            onClick={handleCreateNewConv}
          />
        </Options>
      </ListWrapper>
      {!notExistsConversation && (
        <TabsWrapper data-testid="tabs_wrapper">
          <BasicChipsTabsForm
            onChange={handleTab}
            inputList={sideBarTabs}
            selectedId={selectedTabId.toString()}
            mode="isBackground"
            isWithoutImage
            fontSize="--font-input-small-size"
          />
        </TabsWrapper>
      )}
      <Spacer height={16} />
      <GlobalChatList
        selectedTabId={selectedTabId}
        handleCreateNewConv={handleCreateNewConv}
      />
    </SideBarWrapper>
  );
};

export default SideBar;
