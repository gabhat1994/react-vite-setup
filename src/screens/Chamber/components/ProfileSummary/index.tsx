import { useLaunchDarkly } from '@/hooks';
import { RiseApplicationProvider } from './RiseApplicationV2/RiseApplicationProvider';
import { NoumByLinkProvider } from '../RightPanel/NoumByLinkProvider';
import ProfileSummaryNew from './ProfileSummaryNew';
import { type IProfileSummary } from './types';

const ProfileSummary = ({ isCustomPreview, ...props }: IProfileSummary) => {
  const {
    flags: { noumCustomPreivewV2 },
  } = useLaunchDarkly();

  return !isCustomPreview || noumCustomPreivewV2 ? (
    <NoumByLinkProvider spaceId={props.spaceId}>
      <RiseApplicationProvider>
        <ProfileSummaryNew isCustomPreview={isCustomPreview} {...props} />
      </RiseApplicationProvider>
    </NoumByLinkProvider>
  ) : null;
};

export { ProfileSummary };
