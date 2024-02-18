import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks';
import { NoumMembersInformation } from './NoumMembersInformation';
import { NoumEditorViewModeActions } from '../RightPanel/elements/NoumActions';

interface NoumDescriptionProps {
  summaryDescription: string | undefined;
  isUpdateMode: boolean | undefined;
}

const NoumDescription = ({
  summaryDescription,
  isUpdateMode,
}: NoumDescriptionProps) => {
  const { isTablet, isMobile } = useBreakpoints();
  return (
    <>
      <Stack
        justify="space-between"
        vertical={isTablet || isMobile}
        padding={isMobile || isTablet ? '0 16px' : undefined}
        fullWidth
        align={isTablet || isMobile ? 'start' : 'center'}
        gap={16}
        reverse={!summaryDescription && isMobile}
      >
        {summaryDescription && (
          <TSpan
            data-testid="tprofileSummaryDescription"
            font="body-m"
            style={{ wordBreak: 'break-word' }}
          >
            {summaryDescription}
          </TSpan>
        )}
        {!isUpdateMode && !summaryDescription && <NoumMembersInformation />}
        {isMobile && <NoumEditorViewModeActions />}
      </Stack>
      {!isUpdateMode && summaryDescription && <NoumMembersInformation />}
    </>
  );
};

export default NoumDescription;
