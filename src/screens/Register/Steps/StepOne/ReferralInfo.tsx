import { Trans } from 'react-i18next';
import { TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { ReferralStack } from './stylesV2';
import { eclipseName } from './helper';

type ReferralInfoProps = {
  name: string;
};

export const ReferralInfo = ({ name }: ReferralInfoProps) => {
  const { isMobile } = useBreakpoints();

  const length = isMobile ? 18 : 27;
  return (
    <ReferralStack>
      <TSpan font="body-m" colorToken="--text-infobox-neutral-default">
        <Trans
          i18nKey="noumena.referral.notification.text"
          values={{
            name: eclipseName(name, length),
          }}
          components={{
            b: <TSpan font="body-m-bold" />,
          }}
        />
      </TSpan>
    </ReferralStack>
  );
};
