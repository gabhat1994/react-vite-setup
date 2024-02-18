import { TSpan } from '@/components';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { ListItem, ListItemStyles } from '@/components/ListItem';
import { useBreakpoints, useToast } from '@/hooks';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Radiobox } from '@/components/Radiobox';
import { Fragment, useMemo } from 'react';
import { ProjectChamberType } from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { useVisibilitySettings } from '../ChamberVisibilityInvite/VisibilitySettings/useVisibilitySettings';
import { visibilityOptions } from './config';
import * as S from './styles';

interface VisibilitySettingsModalProps {
  isOpen: boolean;
  handleClose: () => void;
  noumId: string;
  space: Maybe<SpaceOutputFragment>;
}

export function VisibilitySettingsModal({
  isOpen,
  handleClose,
  noumId,
  space,
}: VisibilitySettingsModalProps) {
  const { t } = useTranslation();
  const { isMobile, isDesktop } = useBreakpoints();
  const { addSuccessIconToast } = useToast();

  const linkedNoums = useMemo(
    () => cleanList(space?.link?.linkedNoums),
    [space?.link?.linkedNoums],
  );
  const visibility = space?.projectType ?? ProjectChamberType.Public;
  const isSEOEnabled = !!space?.enableAds;

  const { control, isDirty, loading, onSubmit, modalsElement } =
    useVisibilitySettings({
      noumId,
      defaultVisibility: visibility,
      linkedNoums,
      isSEOEnabled,
      onSubmit: () => {
        handleClose();
        addSuccessIconToast('Noum Visibility Settings have been updated.');
      },
    });

  return (
    <>
      <Modal
        testId="chamber-visibility-invite-modal"
        open={isOpen}
        onClose={handleClose}
        enableCloseButton
        size={ModalSize.L}
        isFullScreen={!isDesktop}
        disableBackdropClick
        spacingMode="gap-content"
      >
        <ModalHeader
          justifyContent={isMobile ? 'flex-start' : 'center'}
          isFullScreen={!isDesktop}
        >
          {t('noumena.chamber.visibility_settings.title')}
        </ModalHeader>

        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          {t('noumena.chamber.visibility_settings.description')}
        </TSpan>

        <ModalBody isFullScreen={!isDesktop}>
          <Controller
            name="visibility"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                {visibilityOptions.map((option) => (
                  <Fragment key={option.value}>
                    <ListItem
                      onClick={() => onChange(option.value)}
                      icon={
                        <ListItemStyles.Icon
                          iconName={option.iconName}
                          backgroundColor="neutral"
                        />
                      }
                      title={t(option.labelKey)}
                      subtitle={t(option.descriptionKey)}
                      action={<Radiobox isChecked={value === option.value} />}
                    />
                    <S.Separator noMargin fullWidth />
                  </Fragment>
                ))}
              </>
            )}
          />
        </ModalBody>
        <ModalFooter gap={16} justifyContent="stretch">
          <Button tertiary onClick={handleClose} grow>
            {t('noumena.cancel')}
          </Button>
          <Button
            primary
            onClick={onSubmit}
            grow
            disabled={!isDirty}
            loading={loading}
          >
            {t('noumena.chamber.visibility_settings.submit')}
          </Button>
        </ModalFooter>
      </Modal>
      {modalsElement}
    </>
  );
}
