import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type Maybe,
  type SpaceConnection,
  type ConnectionPermissionTypeEnum,
  ConnectionTypeEnum,
} from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { UserUtil } from '@/utils/user';
import { ChamberConnectedUser } from './ChamberConnectedUser';
import { type ChamberConnectedUsersProps } from './types';
import { NoUser, NoUserDescription, NoUserWrapper } from './styles';

export const ChamberConnectedUsers = memo(
  ({
    spaceId,
    connections,
    onChangePermission,
    onClose,
    onInvite,
  }: ChamberConnectedUsersProps) => {
    const { t } = useTranslation();

    if (connections?.length) {
      return (
        <>
          {connections.map((c: Maybe<SpaceConnection>) => {
            const user =
              c?.type === ConnectionTypeEnum.Connection
                ? c?.requestFrom?._id === spaceId
                  ? c?.requestTo?.uid
                  : c?.requestFrom?.uid
                : c?.requestTo?.uid;
            return (
              c &&
              user &&
              !UserUtil.isInactive(user) && (
                <ChamberConnectedUser
                  key={`${user._id}-${c?.requestTo?.uid?._id}`}
                  user={user}
                  currentPermission={c?.draft?.permission || c?.permission}
                  onChangePermission={(v: ConnectionPermissionTypeEnum) =>
                    onChangePermission(c._id, v)
                  }
                  isNonMember={
                    c?.requestTo?.uid?.userStatus === 'UNREGISTERED' ||
                    c?.requestTo?.uid?.userStatus === 'REGISTERED'
                  }
                />
              )
            );
          })}
        </>
      );
    }

    return (
      <NoUser data-testid="chamber-permission-no-user-wrap">
        <NoUserWrapper>
          <Icon
            color="--icon-placeholder-neutral-default"
            name="groups_xxxxl"
            size={96}
          />
          <NoUserDescription
            font="body-l"
            colorToken="--text-placeholder-neutral-default"
          >
            {t(`noumena.chamber_edit.permission.no_user`)}
          </NoUserDescription>
          <Spacer height={16} />
          <Button
            secondary
            size="small"
            onClick={() => {
              onClose();
              onInvite();
            }}
          >
            {t(`noumena.chamber_edit.permission.invite_users`)}
          </Button>
        </NoUserWrapper>
      </NoUser>
    );
  },
);
