import SecretNoumAlertModal from '@/components/SecretNoumAlertModal/SecretNoumAlertModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import S from './styles';

type ContractSecretNoumAlertModalProps = {
  isOpenModal: boolean;
  isUnauthenticated?: boolean;
  onClose: () => void;
};

export const ContractSecretNoumAlertModal: React.FC<
  ContractSecretNoumAlertModalProps
> = ({ isUnauthenticated, ...props }) => {
  const { t } = useTranslation();

  const descriptionElement = isUnauthenticated ? (
    <S.DescriptionText font="body-l" colorToken="--text-modal-neutral-default">
      {t('noumena.contracts.secret_noum_modal.unauthenticated.description_1')}
      <ul>
        <li>
          {t(
            'noumena.contracts.secret_noum_modal.unauthenticated.description_2',
          )}
        </li>
        <li>
          {t(
            'noumena.contracts.secret_noum_modal.unauthenticated.description_3',
          )}
        </li>
      </ul>
    </S.DescriptionText>
  ) : (
    <S.DescriptionText font="body-l" colorToken="--text-modal-neutral-default">
      {t('noumena.contracts.secret_noum_modal.member.description')}
    </S.DescriptionText>
  );

  return (
    <SecretNoumAlertModal
      warningText={
        isUnauthenticated
          ? t(
              'noumena.contracts.secret_noum_modal.unauthenticated.warning_text',
            )
          : t('noumena.contracts.secret_noum_modal.member.warning_text')
      }
      description={descriptionElement}
      title={t('noumena.contracts.secret_noum_modal.title')}
      {...props}
    />
  );
};
