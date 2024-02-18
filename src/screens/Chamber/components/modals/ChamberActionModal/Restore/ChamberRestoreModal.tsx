import { type FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography/Typography';
import {
  useCancelNoumLayoutChangesHelper,
  useRestoreSpaceHelper,
} from '@/features/noums/hooks/spaceQuery';
import { ChamberActionModal } from '../ActionModal/ChamberActionModal';
import {
  type ChamberRestoreModalBodyProps,
  type ChamberRestoreModalProps,
} from './types';

const ChamberRestoreModalBody: FC<ChamberRestoreModalBodyProps> = ({
  version,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <TSpan
        font="body-l"
        colorToken="--text-modal-neutral-default"
        data-testid="description1"
        style={{ paddingBottom: 12 }}
      >
        {t(`noumena.container.chamber.restore.modal.body.p1`)}{' '}
        <TSpan
          colorToken="--text-modal-neutral-highlighted"
          data-testid="description-restore-version"
          font="body-l-bold"
        >
          {version}?
        </TSpan>
      </TSpan>
      <TSpan
        font="body-l"
        colorToken="--text-modal-neutral-default"
        data-testid="description2"
        style={{ paddingBottom: 12 }}
      >
        {t(`noumena.container.chamber.restore.modal.body.p2`)}
      </TSpan>
    </>
  );
};

export const ChamberRestoreModal = memo((props: ChamberRestoreModalProps) => {
  const { t } = useTranslation();
  const { restoreSpaceHelper, loading: restoreLoading } =
    useRestoreSpaceHelper();
  const { cancelNoumLayoutChangesHelper, loading: cancelLoading } =
    useCancelNoumLayoutChangesHelper();

  const handleConfirm = async () => {
    await restoreSpaceHelper(props.spaceId);
    await cancelNoumLayoutChangesHelper(props.spaceId);
    props.sucessCallback();
  };

  const loading = restoreLoading || cancelLoading;

  return (
    <ChamberActionModal
      {...props}
      isOpen={props.isOpen || loading}
      title={t(`noumena.container.chamber.restore.modal.title`)}
      isWaiting={loading}
      textForWaiting={t(
        `noumena.container.chamber.restore.modal.restoring_previous_version`,
      )}
      positiveBtnLabel={t(
        `noumena.container.chamber.restore.modal.button.restore`,
      )}
      negativeBtnLabel={t(`noumena.cancel`)}
      positiveBtnType="primary"
      body={<ChamberRestoreModalBody version={props.version} />}
      confirmCallback={handleConfirm}
    />
  );
});
