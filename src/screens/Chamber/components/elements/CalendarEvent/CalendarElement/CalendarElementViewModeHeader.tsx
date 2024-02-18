import { TSpan } from '@/components/Typography';
import { CreateNewEventTypeSelection } from '@/features/events/components';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';

import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { PermissibleElementType } from '@/apollo/generated/types';
import { t } from 'i18next';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { ViewModeHeaderTitleWrapper, ViewModeHeaderWrapper } from './styles';
import { type ViewModeHeaderProps } from './types';

export const CalendarElementViewModeHeader = ({
  currentTitle,
  hasEvents,
  handleDropdownClick,
  selectedCustomPreviewTab,
  showAddEventBtn,
  chamberId,
}: ViewModeHeaderProps) => {
  const { isOwner } = useNoumContext();
  const { hasElementPermission } = useNoumAuthorization();
  const hasCreateEventPermission = hasElementPermission(
    PermissibleElementType.Calendar,
    'create-event',
    isOwner,
  );

  const isCustomPreviewSelected =
    selectedCustomPreviewTab !== CustomPreviewTabEnum.Preview;

  const shouldRenderAddEventBtn =
    showAddEventBtn && hasCreateEventPermission && isCustomPreviewSelected;

  return (
    <ViewModeHeaderWrapper data-testid="calendar-element-header">
      <ViewModeHeaderTitleWrapper>
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-body-header-neutral-default"
        >
          {currentTitle}
        </TSpan>
      </ViewModeHeaderTitleWrapper>
      {showAddEventBtn && (
        <CreateNewEventTypeSelection
          hasEvents={hasEvents}
          handleDropdownClick={handleDropdownClick}
          chamberId={chamberId}
          isPrimaryBtn={false}
          tooltipMessage={t('noumena.event.no_permission.create_event')}
          tooltipVisibility={!shouldRenderAddEventBtn}
          tooltipPosition="bottom-left"
        />
      )}
    </ViewModeHeaderWrapper>
  );
};
