import { Spinner } from '@/components/Spinner';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { Stack } from '@/layout';
import { AppLayout } from '@/layout/AppLayout';
import { NoumViewLayout } from '@/layout/NoumLayout';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { CustomPreviewHeader } from '@/screens/Chamber/CustomPreview/CustomPreviewHeader';
import routes from '@/constants/routes';
import { SpaceUtils } from '@/utils/space';
import { getTimeStampForDisplaying } from '@/utils/getTimeStampForDisplaying';
import { EditChamberProvider } from '../EditChamber/provider';
import NoumView from '../ViewChamber/NoumView';
import { CustomPreviewTabEnum } from './constants';
import { CustomPreviewTopNavbar } from './styles';
import { EditChamberHeader } from '../EditChamber/EditChamberHeader';
import CustomPreviewBodyV2 from './CustomPreviewBodyV2';
import { CustomPreviewPanel } from './CustomPreviewPanel';
import { useNoumContext } from '../ViewChamber/ChamberProvider';

function EditCustomPreviewV2() {
  const { space, loading } = useNoumContext();
  const isArchived = SpaceUtils.isArchived(space);
  const lastCustomPreviewSavedTime = getTimeStampForDisplaying(
    space?.lastCustomPreviewSavedTime,
    true,
  );
  const { flags } = useLaunchDarkly();
  const navigate = useNavigate();
  const [selectedCustomPreviewTab, setSelectedCPreviewTab] =
    useState<CustomPreviewTabEnum>(CustomPreviewTabEnum.Edit);

  useEffect(() => {
    if (!flags.customNoums && space?._id) {
      navigate(generatePath(routes.EDIT_NOUM, { id: space._id }));
    }
  }, [flags.customNoums, navigate, space?._id]);

  if (loading || !space?._id) {
    return <Spinner />;
  }
  return (
    <EditChamberProvider>
      {!isArchived && (
        <AppLayout.Layout
          topNavbar={
            <CustomPreviewTopNavbar>
              <CustomPreviewHeader
                spaceId={space?._id}
                selectedCustomPreviewTab={selectedCustomPreviewTab}
                lastCustomPreviewSavedTime={lastCustomPreviewSavedTime}
              />
            </CustomPreviewTopNavbar>
          }
        >
          <NoumView id={space?._id} isCustomPreview>
            <NoumViewLayout
              header={<EditChamberHeader isCustomPreview />}
              hasSideBar={false}
              selectedCustomPreviewTab={selectedCustomPreviewTab}
              setSelectedCPreviewTab={setSelectedCPreviewTab}
            >
              {loading ? (
                <Stack>
                  <Spinner />
                </Stack>
              ) : (
                <>
                  <CustomPreviewBodyV2 />
                  <CustomPreviewPanel open={true} />
                </>
              )}
            </NoumViewLayout>
          </NoumView>
        </AppLayout.Layout>
      )}
    </EditChamberProvider>
  );
}

export default EditCustomPreviewV2;
