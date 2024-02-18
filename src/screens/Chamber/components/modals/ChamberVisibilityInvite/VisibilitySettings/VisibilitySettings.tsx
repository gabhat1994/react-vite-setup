import { type LinkedNoumOptionType } from '@/screens/LinkNoum/components/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks';
import * as S from '../styles';
import { ChamberVisibilityPicker } from './ChamberVisibilityPicker';
import { useVisibilitySettings } from './useVisibilitySettings';

interface VisibilitySettingsProps {
  noumId: string;
  defaultVisibility: string | undefined;
  linkedNoums: LinkedNoumOptionType[];
  isSEOEnabled: boolean;
  onClose: () => void;
}

/** @deprecated This component was used in Noums 1.0, to be removed. */
export function VisibilitySettings({
  noumId,
  defaultVisibility,
  linkedNoums,
  isSEOEnabled,
  onClose,
}: VisibilitySettingsProps) {
  const { addSuccessIconToast } = useToast();
  const { t } = useTranslation();

  const { control, isDirty, loading, onSubmit, modalsElement } =
    useVisibilitySettings({
      noumId,
      defaultVisibility,
      linkedNoums,
      isSEOEnabled,
      onSubmit: () => {
        onClose();
        addSuccessIconToast(
          t('noumena.chamber_edit.visibility.success_message'),
        );
      },
    });

  return (
    <>
      <S.SettingWrapper>
        <Controller
          control={control}
          name="visibility"
          render={({ field: { value, onChange } }) => (
            <ChamberVisibilityPicker
              value={value}
              onChange={(option) => onChange(option.value)}
            />
          )}
        />
        <S.SaveButton
          primary
          size="large"
          disabled={!isDirty}
          loading={loading}
          onClick={onSubmit}
        >
          {t(`noumena.chamber_edit.visibility.save`)}
        </S.SaveButton>
      </S.SettingWrapper>
      {modalsElement}
    </>
  );
}
