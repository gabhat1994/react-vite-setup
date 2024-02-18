import { TSpan } from '@/components/Typography';
import { t } from 'i18next';

import { Spacer } from '@/layout';
import { type EnabledViewProps } from './types';
import { NoumSeoToggleWrapper } from './styles';
import { Toggle } from './Toggle';
import { URLSettings } from './URLSettings';
import { SettingsCard } from './SettingsCard';
import { KeywordSettings } from './KeywordSettings';

export const EnabledView = ({
  isMobile,
  isSlugAvailable,
  isSlugChecked,
  loading,
  showInfoBox,
  showInfoState,
  toggleValue,
  url,
  suggestions,
  selectedKeywords,
  updateInfoBoxState,
  updateUrl,
  handleToggle,
  onAdd,
  onRemove,
}: EnabledViewProps) => (
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

    <SettingsCard
      title="URL Settings"
      content={
        <URLSettings
          url={url}
          updateUrl={updateUrl}
          isSlugAvailable={isSlugAvailable}
          isSlugChecked={isSlugChecked}
          loading={loading}
          showInfoBox={showInfoBox}
          showInfoState={showInfoState}
          updateInfoBoxState={updateInfoBoxState}
        />
      }
    />

    <Spacer height={24} />

    <SettingsCard
      title="Keywords"
      content={
        <KeywordSettings
          suggestions={suggestions}
          selectedKeywords={selectedKeywords}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      }
    />
  </>
);
