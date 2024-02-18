import { t } from 'i18next';
import { type ListOfOptionsTypes } from '@/features/noums/components/Toolbox/types';
import { ElementTypeEnum } from '@/apollo/generated/types';

const getTooltipText = (
  tool: ListOfOptionsTypes,
  conditions: {
    hasPermission: boolean;
    disabled: boolean;
    walletStatus?: boolean;
  },
) => {
  if (!conditions.hasPermission) {
    return t('noumena.element.add.no_permission');
  }
  if (isWalletType(tool.type) && !conditions.walletStatus) {
    return t('noumena.noumEditorv2.subwallet.cannot_be_created_text');
  }
  if (conditions.disabled) {
    return t('noumena.element.add.limit_only_one', {
      tool: tool.text,
    });
  }
  return tool.toolTipText;
};

const isWalletType = (toolType: ElementTypeEnum) =>
  toolType === ElementTypeEnum.Wallet;

export const ToolboxUtils = {
  getTooltipText,
  isWalletType,
};
