import { PermissibleElementType } from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { ButtonUtils } from '@/components/Button/utils';
import { Icon } from '@/components/Icon';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { type QuickQuestionsElementHeaderProps } from './types';

export const QuickQuestionsElementHeader = forwardRef(
  ({
    currentTitle = '',
    openAddQuestionModal,
    selectedCustomPreviewTab,
    openQuestionCount,
  }: QuickQuestionsElementHeaderProps) => {
    const { isOwner } = useNoumContext();
    const { isConnected } = useNoumUserConnectionContext();
    const { t } = useTranslation();
    const { hasElementPermission } = useNoumAuthorization();
    const hasAddQuestionPermission = hasElementPermission(
      PermissibleElementType.QuickQuestions,
      'add-quick-question',
      isConnected || isOwner,
    );

    return (
      <ElementWrapperV2.Header title={currentTitle}>
        {openQuestionCount > 0 &&
          selectedCustomPreviewTab !== CustomPreviewTabEnum.Preview && (
            <Button
              size="small"
              type="button"
              disabled={!hasAddQuestionPermission}
              onClick={openAddQuestionModal}
              icon={
                <Icon
                  name="add_s"
                  size={16}
                  color="--icon-button-brand-secondary-default"
                />
              }
              secondary
              {...ButtonUtils.getTooltipProps({
                message: t(
                  'noumena.quick_questions.no_permission.add_question',
                ),
                visible: !hasAddQuestionPermission,
                position: 'bottom-left',
              })}
            />
          )}
      </ElementWrapperV2.Header>
    );
  },
);
