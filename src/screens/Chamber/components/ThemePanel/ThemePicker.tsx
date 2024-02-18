import { useThemeContext } from '@/providers';
import * as S from './styles';
import { ThemeItem } from './ThemeItem';
import { type ThemePickerProps } from './types';

export const ThemePicker = ({ themes, noumId }: ThemePickerProps) => {
  const { selectedThemeId, onChangeTheme } = useThemeContext();
  return (
    <S.ThemePickerContainer>
      <S.PickerBody>
        {themes &&
          themes.length &&
          themes.map((theme) => (
            <ThemeItem
              key={`${theme?._id}`}
              id={theme?._id}
              title={theme?.name || ''}
              isSelected={theme?._id === selectedThemeId}
              onChangeTheme={() => onChangeTheme(noumId, theme?._id)}
            />
          ))}
      </S.PickerBody>

      {/* TODO for future */}
      {/* <S.PickerFooter>
        <Checkbox
          isChecked={isApply}
          icon={
            <Icon
              name="tick_m"
              size={isApply ? 24 : 0}
              color="--icon-checkbox-neutral-alt-default"
            />
          }
          onChange={(val) => setIsApply(val)}
        />
        <S.CheckLabelWrapper>
          <TSpan
            colorToken="--text-tablecell-header-neutral-highlighted"
            font="body-m"
          >
            {t('noumena.customize.theme_apply_label_1')}
          </TSpan>
          <br />
          <TSpan
            colorToken="--text-tablecell-header-neutral-default"
            font="footnote"
          >
            {t('noumena.customize.theme_apply_label_2')}
          </TSpan>
        </S.CheckLabelWrapper>
      </S.PickerFooter> */}
    </S.ThemePickerContainer>
  );
};
