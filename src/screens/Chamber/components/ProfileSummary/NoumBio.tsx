import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { Trans, useTranslation } from 'react-i18next';
import {
  NoumHeaderAdditionalDetails,
  OwnedWrapper,
  ProfileSummaryLocation,
} from './styles';

interface NoumBioProps {
  isMasterNoum: boolean | undefined;
  disabled: boolean | undefined;
  lastUpdated: string | undefined;
  location: string | undefined;
  ownedBy: string | undefined;
  chamberTitle: string | undefined;
}

const NoumBio = ({
  chamberTitle,
  isMasterNoum,
  disabled,
  lastUpdated,
  location,
  ownedBy,
}: NoumBioProps) => {
  const { t } = useTranslation();

  return isMasterNoum ? (
    <Stack gap={8}>
      <TSpan font="body-m" $fill colorToken="--text-card-neutral-default">
        {chamberTitle}
      </TSpan>
      <TSpan>&#xb7;</TSpan>
      <ProfileSummaryLocation data-testid="tprofileSummaryLocation">
        {location}
      </ProfileSummaryLocation>
    </Stack>
  ) : (
    <NoumHeaderAdditionalDetails>
      <OwnedWrapper>
        <Trans
          i18nKey="noumena.profile_summary.owned_by"
          values={{
            name: ownedBy,
          }}
          components={{
            strong: <TSpan font="body-m">{ownedBy}</TSpan>,
          }}
        />
      </OwnedWrapper>
      <TSpan>&#xb7;</TSpan>
      <TSpan font="body-m" $fill colorToken="--text-card-neutral-default">
        {disabled
          ? t(`noumena.profile_summary.archived`, {
              lastUpdated,
            })
          : lastUpdated
          ? t(`noumena.profile_summary.last_update`, {
              lastUpdated,
            })
          : null}
      </TSpan>
    </NoumHeaderAdditionalDetails>
  );
};

export default NoumBio;
