import { useMemo, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';
import {
  type Maybe,
  type SpaceConnection,
  type ConnectionPermissionTypeEnum,
  type PermissionInput,
  ConnectionRequestTypeEnum,
} from '@/apollo/generated/types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { useWindowDimensions } from '@/hooks';

import { Button } from '@/components/Button';
import { ChangePermissionsConfirmationModal } from '@/screens/Chamber/components/modals/ChamberPermission/ChangePermissionsConfirmationModal';
import { Infinite } from '@/components/Infinite';
import {
  useConnections,
  useUpdateConnectionPermissionHelper,
} from '@/features/noums/hooks/noums';
import { type ChamberPermissionModalProps } from './types';
import { ChamberConnectedUsers } from './ChamberConnectedUsers';

export const ChamberPermissionModal = ({
  spaceId,
  isOpen,
  onClose,
  onInvite,
  linkedCount,
}: ChamberPermissionModalProps) => {
  const [isConfirmationOpen, toggle] = useState(false);
  const { t } = useTranslation();
  const windowSize = useWindowDimensions();
  const [connections, setConnections] = useState<
    Maybe<SpaceConnection>[] | undefined
  >([]);
  const [permissionData, setPermissionData] = useState<
    Record<string, ConnectionPermissionTypeEnum>
  >({});

  const {
    appConnectionsData: spaceConnections,
    approvedConnectionsLoading: loadingConnections,
    approvedInfiniteState: infiniteState,
    fetchMoreApprovedConnections: fetchMoreConnections,
  } = useConnections(spaceId, true, 10);

  const { updateConnectionPermissionHelper, loading: updating } =
    useUpdateConnectionPermissionHelper();

  const originalData: SpaceConnection[] = useMemo(
    () =>
      spaceConnections?.filter(
        (connection) =>
          connection.status === ConnectionRequestTypeEnum.Approved,
      ) || [],
    [spaceConnections],
  );

  /**
   * Set initial data
   */
  useEffect(() => {
    if (loadingConnections) return;
    setConnections((con) =>
      originalData.map((obj) => con?.find((o) => o?._id === obj?._id) || obj),
    );
  }, [originalData, loadingConnections]);

  /**
   * Set original(unchanged) data when close
   */
  useEffect(() => {
    if (!isOpen) {
      setConnections(originalData);
    }
  }, [isOpen, originalData]);

  const isMobile = useMemo(() => windowSize.width < 768, [windowSize]);

  const hasConnections = useMemo(() => connections?.length, [connections]);

  const softDisabled = useMemo(
    () => isEqual(originalData, connections),
    [connections, originalData],
  );

  const onChangePermission = useCallback(
    (
      connectionId: Maybe<string> | undefined,
      permission: ConnectionPermissionTypeEnum,
    ) => {
      if (!connections || !connectionId) return;

      const index = connections.findIndex(
        (c: Maybe<SpaceConnection>) => connectionId === c?._id,
      );

      setConnections((prev) => {
        const tempUsers = [...(prev || [])];
        tempUsers[index] = {
          ...tempUsers[index],
          draft: {
            permission,
          },
        };
        return tempUsers;
      });
      setPermissionData((p) => ({ ...p, [connectionId]: permission }));
    },
    [connections],
  );

  const onSavePermissions = useCallback(async () => {
    const input: PermissionInput[] = Object.entries(permissionData).map(
      ([connectionId, permission]) => ({ connectionId, permission }),
    );
    await updateConnectionPermissionHelper({
      connectionsPermissions: input,
    });
    setPermissionData({});
    onClose();
    toggle(false);
  }, [onClose, permissionData, updateConnectionPermissionHelper]);

  if (isConfirmationOpen && linkedCount) {
    return (
      <ChangePermissionsConfirmationModal
        isOpen={isConfirmationOpen}
        handleConfirm={onSavePermissions}
        handleClose={() => {
          toggle(false);
        }}
        count={linkedCount}
      />
    );
  }

  return (
    <Modal
      testId="chamber-permission-modal"
      open={isOpen}
      onClose={onClose}
      enableAnimation
      enableCloseButton
      size={ModalSize.L}
      disableBackdropClick
    >
      <ModalHeader justifyContent={isMobile ? 'flex-start' : 'center'}>
        {t(`noumena.chamber_edit.permission.title`)}
      </ModalHeader>
      <ModalBody mobileFlex maxHeight="540px">
        <TSpan colorToken="--text-modal-neutral-default" font="body-m">
          {t(`noumena.chamber_edit.permission.description`)}
        </TSpan>
        <Spacer height="16px" />
        <Infinite
          onFetchMore={fetchMoreConnections}
          status={infiniteState}
          scrollbarWidth={0}
          isSpinnerRelative
          width="100%"
        >
          <ChamberConnectedUsers
            spaceId={spaceId}
            connections={connections || []}
            loading={loadingConnections}
            onChangePermission={onChangePermission}
            onClose={onClose}
            onInvite={onInvite}
          />
        </Infinite>
      </ModalBody>
      <ModalFooter
        justifyContent={!hasConnections ? 'center' : 'space-between'}
        gap={16}
      >
        {(hasConnections || loadingConnections) && (
          <>
            <Button tertiary size="full" onClick={onClose}>
              {t(`noumena.chamber_edit.permission.cancel`)}
            </Button>
            <Button
              primary
              softDisabled={softDisabled}
              loading={updating}
              size="full"
              onClick={() => {
                if (linkedCount) {
                  toggle(true);
                } else {
                  onSavePermissions();
                }
              }}
            >
              {t(`noumena.chamber_edit.permission.save_changes`)}
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ChamberPermissionModal;
