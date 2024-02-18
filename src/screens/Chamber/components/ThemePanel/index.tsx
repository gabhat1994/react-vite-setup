import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import { SideModal } from '@/components/SideModal';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { useThemeContext } from '@/providers';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type TFonts } from '@/common/types';
import { ThemePicker } from './ThemePicker';
import { CustomizeOptions, type ThemePanelProps } from './types';
import * as S from './styles';
import { FontPicker } from './FontPicker';
import { fontLabels, customizeOptions, DefaultFont } from './constants';
import { RevertModal } from './RevertModal';
import { ThemePanelUtils } from './utils';

export const ThemePanel = ({
  open,
  onClose,
  noumId,
  ...sideModalProps
}: ThemePanelProps) => {
  const [customizeOption, setCustomizeOption] = useState(
    CustomizeOptions.THEME,
  );
  const [isApply, setIsApply] = useState(true);
  const [isOpenRevert, setIsOpenRevert] = useState(false);

  const { width } = useWindowDimensions();
  const { themes, selectedFonts, onChangeFonts, onReset, selectedThemeId } =
    useThemeContext();

  const isDesktop = useMemo(() => width >= breakpoints.TABLET_L, [width]);

  const handleCloseRevertModal = useCallback(() => setIsOpenRevert(false), []);
  const handleConfirmRevert = useCallback(() => {
    onReset(noumId);
    setIsOpenRevert(false);
  }, [noumId, onReset]);

  const setFonts = useCallback(
    (name: string, value: string) => {
      let font = { [name]: value };
      if (name === 'body') {
        font = {
          ...font,
          footnote: value,
          input: value,
          link: value,
          systeminfo: value,
        };
      }
      onChangeFonts(noumId, { ...selectedFonts, ...font });
    },
    [noumId, onChangeFonts, selectedFonts],
  );

  const isDefaultTheme = ThemePanelUtils.isDefaultTheme(
    themes,
    selectedThemeId,
  );
  const isDefaultFontSet = ThemePanelUtils.isDefaultFontSet(selectedFonts);

  return (
    <>
      <SideModal
        className="theme_container"
        placement="right"
        showCloseButton
        enableAnimation
        nonBlockingModal={isDesktop}
        disableEscapeKeyDown
        isBackgroundOpacity={!isDesktop}
        height="100%"
        padding={0}
        title={t('noumena.customize.header')}
        open={open}
        onClose={onClose}
        actionButton={
          <Button
            textOnly
            size="small"
            onClick={() => setIsOpenRevert(true)}
            disabled={isDefaultFontSet && isDefaultTheme}
          >
            {t('noumena.customize.reset_changes')}
          </Button>
        }
        {...sideModalProps}
      >
        <S.ThemePanelContainer>
          <S.Header>
            <BasicChipsTabsForm
              onChange={(v) => setCustomizeOption(v as CustomizeOptions)}
              inputList={customizeOptions}
              selectedId={customizeOption}
              mode="isBackground"
              isWithoutImage
              textFont="--font-body-medium-regular-font"
              fontSize="--font-body-medium-regular-size"
              fullWidth
            />
          </S.Header>
          {customizeOption === CustomizeOptions.THEME && (
            <ThemePicker
              isApply={isApply}
              setIsApply={setIsApply}
              themes={themes}
              noumId={noumId}
            />
          )}
          {customizeOption === CustomizeOptions.FONTS && (
            <S.FontPickersBodyWrapper>
              {fontLabels.map((item, index) => (
                <FontPicker
                  key={`font-picker-${item.label}`}
                  title={item.label}
                  isLastItem={index === fontLabels.length - 1}
                  name={item.name}
                  selected={
                    selectedFonts[item.name as keyof TFonts] ?? DefaultFont
                  }
                  setFonts={setFonts}
                />
              ))}
            </S.FontPickersBodyWrapper>
          )}
        </S.ThemePanelContainer>
      </SideModal>
      <RevertModal
        isOpen={isOpenRevert}
        onClose={handleCloseRevertModal}
        onCloseModal={handleCloseRevertModal}
        onConfirm={handleConfirmRevert}
      />
    </>
  );
};
