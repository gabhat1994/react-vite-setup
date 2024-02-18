import { Flag } from '@/components/Flag';
import { type FlagProps } from '@/components/Flag/Flag';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { LegalRegionService } from '../../services/LegalRegionService';

interface LegalRegionDisplayProps {
  country: string | null | undefined;
  region: string | null | undefined;
}
export function LegalRegionDisplay({
  country,
  region,
}: LegalRegionDisplayProps) {
  if (!country || !LegalRegionService.isValidCountryCode(country)) {
    return <>--</>;
  }

  const formattedLegalRegion = LegalRegionService.formatLegalRegion(country, region ?? null);

  return (
    <Stack gap={8} align="center">
      <Flag flag={`flag_${country}` as FlagProps['flag']} size={24} />
      <TSpan font="body-m">{formattedLegalRegion}</TSpan>
    </Stack>
  );
}
