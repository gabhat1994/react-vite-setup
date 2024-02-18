import { useGetNoumRolesInfoQuery } from '@/apollo/graphql';
import { TSpan } from '@/components';
import { Accordion } from '@/components/Accordion';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Stack } from '@/layout';
import { useTranslation } from 'react-i18next';
import SkeletonLoaderProvider from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { SizedSkeleton } from '@/components/SkeletonLoader';
import { RoleInfoTag } from './RoleInfoTag';

interface RolesInfoModalProps {
  isOpen: boolean;
  onClose(): void;
}

export function RolesInfoModal({ isOpen, onClose }: RolesInfoModalProps) {
  const { t } = useTranslation();

  const { data, loading } = useGetNoumRolesInfoQuery({
    variables: {
      limit: 50,
      offset: 0,
    },
    skip: !isOpen,
  });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      enableCloseButton
      size={ModalSize.L}
      spacingMode="gap-content"
    >
      <ModalHeader>{t('noumena.noums.roles_info.modal.title')}</ModalHeader>
      <ModalBody>
        <Stack vertical align="stretch" gap={16} fullWidth>
          <TSpan font="body-l" colorToken="--text-modal-neutral-default">
            {t('noumena.noums.roles_info.modal.description')}
          </TSpan>
          {loading ? (
            <SkeletonLoaderProvider isLoading={loading}>
              {Array.from({ length: 5 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <SizedSkeleton key={index} w="100%" h={64} />
              ))}
            </SkeletonLoaderProvider>
          ) : (
            <div>
              {data?.noumRoles.data.map((role) => (
                <Accordion
                  key={role._id}
                  title={role.name}
                  titleFont="body-m-bold"
                  subtitle={role.description}
                  headerPadding="16px 0"
                >
                  <Stack gap={8} wrap="wrap" fullWidth>
                    {role.groupedPermissions.map((permissionGroup) => (
                      <RoleInfoTag
                        key={permissionGroup.elementType}
                        permissionGroup={permissionGroup}
                      />
                    ))}
                  </Stack>
                </Accordion>
              ))}
            </div>
          )}
        </Stack>
      </ModalBody>
    </Modal>
  );
}
