import { memo } from 'react';
import { TSpan } from '@/components';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/hooks';
import { RiseApplicationInformation } from './styles';

const RiseApplicationInfoText = memo(() => {
  const { t } = useTranslation();
  const { isTablet } = useBreakpoints();
  return (
    <RiseApplicationInformation isTablet={isTablet}>
      <div>
        <TSpan font="footnote" colorToken="--text-infobox-neutral-default">
          {t('noumena.chamber.riseV2.submit_my_application_info')}
        </TSpan>
      </div>
    </RiseApplicationInformation>
  );
});

export default RiseApplicationInfoText;
