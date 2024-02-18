import { PermissibleElementType } from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { ViewMode } from '@/features/conversation/types';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useBreakpoints } from '@/hooks';
import { Spacer } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { UserUtil } from '@/utils/user';
import React, { forwardRef, useCallback, useContext, type Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { SpaceUtils } from '@/utils/space';
import { MessageElementContext } from '../contexts/MessageElementProvider';
import FilterDropDown from './FilterDropDown';
import { Wrapper } from './styles';
import { type ChatheaderProps } from './types';

export const ChatHeader = forwardRef(
  ({ currentTitle = '' }: ChatheaderProps, ref: Ref<HTMLDivElement>) => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { space, isOwner } = useNoumContext();
    const { isMobile } = useBreakpoints();
    const { hasElementPermission } = useNoumAuthorization();

    const {
      setIsNewConversation,
      viewMode,
      setViewMode,
      noumLayoutViewMode,
      isNoumLayoutCompactViewMode,
    } = useContext(MessageElementContext);
    const { setActiveConversationSid } = useContext(ActiveConversationContext);

    const hasCreateConversationPermission = hasElementPermission(
      PermissibleElementType.Messages,
      'create-new-message-conversation',
      true,
    );

    const isMasterNoum = SpaceUtils.isMasterNoum(space);

    const isShowFilter =
      !isMasterNoum && isOwner && !isNoumLayoutCompactViewMode;

    const isShowAddButton =
      !UserUtil.isInactive(user) && (!isMasterNoum || isOwner);

    const backHandler = useCallback(() => {
      setViewMode(ViewMode.DEFAULT);
    }, [setViewMode]);

    const onAddNewConversationHandle = useCallback(
      (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();

        setIsNewConversation(true);
        setActiveConversationSid('');
      },
      [setActiveConversationSid, setIsNewConversation],
    );

    return (
      <Wrapper ref={ref} noumLayoutViewMode={noumLayoutViewMode}>
        {viewMode === ViewMode.FULLCHAT ? (
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
            onClick={backHandler}
          />
        ) : null}
        {!isNoumLayoutCompactViewMode && (
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-body-header-neutral-default"
          >
            {currentTitle}
          </TSpan>
        )}
        {!isNoumLayoutCompactViewMode && <Spacer isFlex />}
        {isShowFilter && <FilterDropDown />}
        {isShowAddButton && (
          <Button
            data-testid="new-conversation-button"
            size="small"
            disabled={!hasCreateConversationPermission}
            tooltipText={
              hasCreateConversationPermission
                ? ''
                : t('noumena.chat.no_permission.create_conversation_text')
            }
            tooltipPosition={
              isMobile
                ? 'top-left'
                : isNoumLayoutCompactViewMode
                ? 'top-right'
                : 'top-center'
            }
            icon={
              <Icon
                name="add_s"
                size={16}
                color="--icon-button-brand-secondary-default"
              />
            }
            secondary
            onClick={onAddNewConversationHandle}
          />
        )}
      </Wrapper>
    );
  },
);
