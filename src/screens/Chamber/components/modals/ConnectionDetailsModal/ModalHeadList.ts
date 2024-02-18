import { t } from 'i18next';
import { type InputListTypes } from '@/components/Tabs/types';
import { ConnectionDetailModalTabEnum } from './types';

interface ModalHeadListProps {
  isHomeNoumConnectionDetail: boolean;
  connectedMembersCount?: number;
  linkedNoumsCount?: number;
  isConnected?: boolean;
  isOwner?: boolean;
  isMasterNoum?: boolean;
  followersCount?: number;
  isSecretNoum?: boolean;
  connectedProjectsCount?: number;
  defaultTab?: string;
  userNoumsCount?: number;
  canSeeFollowers: boolean;
}

export const getModalHeadList = ({
  isHomeNoumConnectionDetail,
  connectedMembersCount,
  linkedNoumsCount,
  isConnected,
  isOwner,
  isMasterNoum,
  isSecretNoum,
  followersCount,
  connectedProjectsCount,
  defaultTab,
  userNoumsCount,
  canSeeFollowers,
}: ModalHeadListProps) => {
  const list = [];
  if (isHomeNoumConnectionDetail) {
    list.push(
      {
        id: ConnectionDetailModalTabEnum.Connections,
        name: ConnectionDetailModalTabEnum.Connections,
        text: t('noumena.noum.home.connection.members', {
          membersCount: connectedMembersCount,
        }),
        labelSize: 'small',
      } as InputListTypes,
      {
        id: ConnectionDetailModalTabEnum.ProjectSpaces,
        name: ConnectionDetailModalTabEnum.ProjectSpaces,
        text: t('noumena.noum.home.connection.project_spaces', {
          projectsCount: connectedProjectsCount,
        }),
        labelSize: 'small',
      } as InputListTypes,
    );
    return list;
  }
  if (linkedNoumsCount) {
    list.push({
      id: ConnectionDetailModalTabEnum.Noums,
      name: ConnectionDetailModalTabEnum.Noums,
      text: t('noumena.chamber.link.modal.Noums', {
        noumsCount: linkedNoumsCount - 1,
      }),
      labelSize: 'medium',
    } as InputListTypes);
  }

  if (defaultTab === ConnectionDetailModalTabEnum.OwnedNoums && isMasterNoum) {
    return [
      {
        id: ConnectionDetailModalTabEnum.OwnedNoums,
        name: ConnectionDetailModalTabEnum.OwnedNoums,
        text: t('noumena.home_noum.owned_noums.modal.title', {
          count: userNoumsCount,
        }),
        labelSize: 'medium',
      } as InputListTypes,
    ];
  }

  if (isConnected || isOwner) {
    list.push({
      id: ConnectionDetailModalTabEnum.Connections,
      name: ConnectionDetailModalTabEnum.Connections,
      text: t('noumena.chamber.link.modal.Connections', {
        connectionsCount: connectedMembersCount,
      }),
      labelSize: 'medium',
    } as InputListTypes);
  }

  if (!isMasterNoum && canSeeFollowers && !isSecretNoum) {
    list.push({
      id: ConnectionDetailModalTabEnum.Followers,
      name: ConnectionDetailModalTabEnum.Followers,
      text: t('noumena.chamber.link.modal.Followers', {
        followersCount,
      }),
      labelSize: 'medium',
    } as InputListTypes);
  }
  return list;
};
