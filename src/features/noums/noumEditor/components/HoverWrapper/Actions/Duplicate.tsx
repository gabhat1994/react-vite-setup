import { useCallback } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { type ControlPanelProps } from '../types';
import { ControlPanelIcon, WrapperIcon } from '../Styles';

const Duplicate = ({
  isTool,
  id,
  isDisabled,
  isSectionBackground,
}: ControlPanelProps) => {
  const { duplicateHandler, isDuplicating } = useEditChamberState();

  const onClickduplicate = useCallback(
    async (e) => {
      e.stopPropagation();
      if (isDisabled || isDuplicating || !id) return;
      await duplicateHandler?.(id, isTool);
    },
    [duplicateHandler, id, isDisabled, isDuplicating, isTool],
  );

  return (
    <ControlPanelIcon
      isSectionBackground={isSectionBackground}
      cursorAllowed={!isDisabled}
      onClick={(e) => onClickduplicate(e)}
      data-title={
        isDisabled
          ? t('noumena.noum_editor.hover_controls_not_duplicate')
          : t('noumena.noum_editor.hover_controls_duplicate')
      }
      bgColor={
        isTool
          ? 'var(--bg-tool-toolbox-brand-primary-default)'
          : 'var(--bg-section-toolbox-default)'
      }
      hoverColor={
        isTool
          ? 'var( --bg-tool-toolbox-brand-primary-hover)'
          : 'var(--bg-section-toolbox-hover)'
      }
    >
      <WrapperIcon aria-label="duplicate_button" disabled={isDuplicating}>
        <Icon
          size={16}
          name="copy_m"
          color="--icon-button-neutral-alt-default"
        />
      </WrapperIcon>
    </ControlPanelIcon>
  );
};

export default Duplicate;
