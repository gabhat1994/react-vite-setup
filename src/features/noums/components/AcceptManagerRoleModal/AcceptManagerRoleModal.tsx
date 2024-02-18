import {
  type SpaceOutputFragment,
  type UserBasicOutputFragment,
} from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import ROUTES from '@/constants/routes';
import { Stack } from '@/layout';
import { UserUtil } from '@/utils/user';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { ManagerTermsAndConditionsModal } from '../ManagerTermsAndConditionsModal';
import S from './styles';

interface AcceptManagerRoleModalProps {
  isOpen: boolean;
  noum: Maybe<Pick<SpaceOutputFragment, '_id' | 'name'>>;
  invitationSentFrom: Maybe<UserBasicOutputFragment>;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

type ModalType = 'terms-and-conditions';

export function AcceptManagerRoleModal({
  isOpen,
  invitationSentFrom,
  noum,
  loading,
  onClose,
  onConfirm,
}: AcceptManagerRoleModalProps) {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);

  const { closeModal, openModal, modalType } = useModalManager<ModalType>();

  if (!noum?._id) {
    return null;
  }

  return (
    <>
      <Modal open={isOpen} onClose={onClose} size={ModalSize.L}>
        <ModalHeader topPadding={0}>
          {t('noumena.accept_manager_modal.title')}
        </ModalHeader>
        <ModalBody gap={32}>
          <TSpan font="body-l" colorToken="--text-modal-neutral-default">
            <Trans
              i18nKey="noumena.accept_manager_modal.description"
              values={{
                user: UserUtil.renderFullName(invitationSentFrom),
                noumName: noum?.name,
              }}
              components={{
                b: (
                  <S.StyledRouteLink
                    to={generatePath(ROUTES.NOUM, { id: noum?._id })}
                    target="_blank"
                    underline
                  />
                ),
              }}
            />
          </TSpan>

          <Stack
            align="center"
            gap={8}
            onClick={() => setIsChecked((prev) => !prev)}
          >
            <Checkbox isChecked={isChecked} onChange={setIsChecked} />

            <TSpan
              font="body-l"
              colorToken="--text-body-header-neutral-default"
            >
              {t('noumena.accept_manager_modal.accept_consent_text_1')}
              <S.StyledButtonLink
                onClick={() => openModal('terms-and-conditions')}
              >
                <TSpan
                  font="link-l"
                  colorToken="--text-tablecell-header-neutral-highlighted"
                >
                  {t('noumena.accept_manager_modal.accept_consent_text_2')}
                </TSpan>
              </S.StyledButtonLink>
            </TSpan>
          </Stack>
        </ModalBody>

        <ModalFooter flexDirection="row" gap={16}>
          <Button size="full" onClick={onClose}>
            {t('noumena.accept_manager_modal.cancel_button')}
          </Button>
          <Button
            primary
            size="full"
            onClick={onConfirm}
            disabled={!isChecked}
            loading={loading}
          >
            {t('noumena.accept_manager_modal.accept_button')}
          </Button>
        </ModalFooter>
      </Modal>

      <ManagerTermsAndConditionsModal
        isOpen={modalType === 'terms-and-conditions'}
        onClose={closeModal}
      />
    </>
  );
}
