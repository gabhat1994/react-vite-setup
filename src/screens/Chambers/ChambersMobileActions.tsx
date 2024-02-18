import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Spacer, Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { Button } from '@/components/Button';
import {
  MobileBottomActionsContainer,
  FilterSelected,
  AlertIconStyled,
  IconButtonStyled,
  MobileButtons,
} from './styles';
import { type ChamberMobileActionsProps } from './types';

const ChambersMobileActions: FC<ChamberMobileActionsProps> = ({
  onToggleFilter,
  onToggleCreate,
  openBottomSheet,
  isFiltered = false,
}) => {
  const { t } = useTranslation();
  const { isActive: access } = useAuth();
  const {
    flags: { newAppNavigation },
  } = useLaunchDarkly();

  return (
    <MobileBottomActionsContainer isAppUiV2={newAppNavigation}>
      <IconButtonStyled>
        <Button
          size="large"
          neutral
          onClick={onToggleFilter}
          data-testid="chamber-filtering"
          rightIcon={
            <Icon
              name="align_center_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
        />
        <AlertIconStyled>
          {isFiltered && (
            <Icon
              name="flag_pl_m"
              size={12}
              color="--bg-badge-danger-primary-default"
            />
          )}
        </AlertIconStyled>
      </IconButtonStyled>
      <Stack>
        <MobileButtons
          onClick={openBottomSheet}
          softDisabled={!access}
          size="large"
          neutral
          data-testid="create-chamber-bottom-sheet"
          style={{
            marginRight: 12,
          }}
          rightIcon={
            <Icon
              name="more_m"
              size={24}
              color={!access ? '--icon-button-neutral-default' : ''}
            />
          }
        />
        <Spacer width={12} />
        <FilterSelected show={false} />
        <Button
          onClick={onToggleCreate}
          softDisabled={!access}
          size="large"
          primary
          data-testid="create-chamber"
          leftIcon={
            <Icon
              name="plus_m"
              size={24}
              color={!access ? '--icon-button-neutral-alt-default' : ''}
            />
          }
        >
          {t('noumena.chambers.new_noum')}
        </Button>
      </Stack>
    </MobileBottomActionsContainer>
  );
};

export default ChambersMobileActions;
