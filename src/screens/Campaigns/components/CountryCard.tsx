import { Flag } from '@/components/Flag';
import { type FlagProps } from '@/components/Flag/Flag';
import { Stack } from '@/layout';

type CountryCardProps = {
  flag?: string;
  country: string;
};
export const CountryCard = ({ flag, country }: CountryCardProps) => (
  <Stack gap={10} align="center">
    {flag && flag.length === 2 && (
      <div style={{ marginTop: '-2px' }}>
        <Flag size={25} flag={`flag_${flag}` as FlagProps['flag']} />
      </div>
    )}
    {country}
  </Stack>
);
