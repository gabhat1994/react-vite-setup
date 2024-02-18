import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout';
import { useTranslation } from 'react-i18next';
import { ButtonUtils } from '@/components/Button/utils';
import { useFileManagerElementContext } from '../../providers/FileManagerElementProvider';
import S from './styles';

type EmptyStateProps = {
  isSeachResult?: boolean;
};

const EmptyState: React.FC<EmptyStateProps> = ({ isSeachResult }) => {
  const { t } = useTranslation();
  const { setShowAddFileModal, isEditing, hasUploadFilePermission } =
    useFileManagerElementContext();

  return (
    <S.EmptyStateContainer>
      {isEditing ? (
        <S.EmptyState>
          <Icon
            name="file_m"
            size={64}
            color="--icon-card-placeholder-neutral-default"
          />
          <S.EmptyStateText>
            {t('noumena.file_manager.edit_mode.empty_state_message')}
          </S.EmptyStateText>
        </S.EmptyState>
      ) : (
        <>
          <S.EmptyState>
            <Icon
              name="file_m"
              size={64}
              color="--icon-card-placeholder-neutral-default"
            />
            <S.EmptyStateText>
              {t('noumena.file_manager.empty_state_message')}
            </S.EmptyStateText>
          </S.EmptyState>
          {!isSeachResult && (
            <Stack fullWidth justify="center">
              <Button
                data-testid="add-button"
                onClick={() => setShowAddFileModal(true)}
                size="small"
                secondary
                disabled={!hasUploadFilePermission}
                {...ButtonUtils.getTooltipProps({
                  message: t('noumena.file_manager.no_permission.upload_file'),
                  visible: !hasUploadFilePermission,
                })}
              >
                {t('noumena.file_manager.button.add_a_file')}
              </Button>
            </Stack>
          )}
        </>
      )}
    </S.EmptyStateContainer>
  );
};

export default EmptyState;
