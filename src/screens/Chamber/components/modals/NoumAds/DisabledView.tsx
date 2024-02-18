import { TSpan } from '@/components/Typography';
import { t } from 'i18next';

import { Spacer } from '@/layout';
import { NoumSeoToggleWrapper } from './styles';
import { Toggle } from './Toggle';

export const DisabledView = ({
  isMobile,
  toggleValue,
  handleToggle,
}: {
  isMobile: boolean;
  toggleValue: boolean;
  handleToggle: (toggle: boolean) => void;
}) => (
  <>
    <div style={{ padding: isMobile ? '0 16px' : undefined }}>
      <TSpan colorToken="--text-modal-neutral-default" font="body-m">
        {t(`noumena.chamber_edit.noum_ads.description`)}{' '}
      </TSpan>
      <TSpan colorToken="--text-modal-neutral-default" font="body-m">
        {t(`noumena.chamber_edit.noum_ads.second_description`)}{' '}
      </TSpan>
    </div>
    <Spacer height={16} />

    <NoumSeoToggleWrapper>
      <Toggle value={toggleValue} onToggle={handleToggle} center />
    </NoumSeoToggleWrapper>

    <Spacer height={24} />
  </>
);
