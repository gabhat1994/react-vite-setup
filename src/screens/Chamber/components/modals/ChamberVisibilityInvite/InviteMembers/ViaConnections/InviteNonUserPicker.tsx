import {
  ActionType,
  ConnectionRequestTypeEnum,
  EntityType,
  GlobalSearchUserEntityStatus,
  UserStatus,
} from '@/apollo/generated/types';
import {
  useGlobalSearchLazyQuery,
  useSendMultipleConnectionInviteMutation,
} from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { TextArea } from '@/components/TextArea';
import { TextField } from '@/components/TextField';
import { breakpoints } from '@/constants/devices';
import { useToast } from '@/hooks';
import { useWindowDimensions } from '@/hooks/dimensions';
import { useConnections, useNoumDetails } from '@/features/noums/hooks/noums';
import { useSendNonMemberConnectionInviteHelper } from '@/features/noums/hooks/spaceQuery';
import { Spacer } from '@/layout';
import { UserUtil } from '@/utils/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { BlockedCountriesListModal } from '../BlockedCountriesList';
import { ViewCountryButton } from './InviteUserPicker/styles';
import * as S from '../../styles';
import {
  type CheckNewInviteResult,
  type InvitedUser,
  type InviteNonUserPickerProps,
} from '../../types';

/** @deprecated This component was used in the legacy connection flow, and will be removed soon. */
const InviteNonUserPicker = ({
  connectedUsers,
  spaceId: id,
}: InviteNonUserPickerProps) => {
  const [searchUsers, { loading: searchingUsers }] = useGlobalSearchLazyQuery();
  const [inviteNoumUser, { loading: sendingInvite }] =
    useSendMultipleConnectionInviteMutation({
      onCompleted: (response) => {
        if (response.sendMultipleConnectionInvite?.length) {
          addToast(
            'success',
            'icon',
            `${t(
              'noumena.chamber_edit.visibility.invite_non_member.invited_noum_user',
            )}`,
          );
          reset();
          setConnectionMsg('');
        } else if (
          response.sendMultipleConnectionInvite &&
          response.sendMultipleConnectionInvite.length === 0
        ) {
          addToast(
            'primary',
            'icon',
            `${t(
              'noumena.chamber_edit.visibility.invite_non_member.already_invited',
            )}`,
          );
          reset();
        }
      },
    });
  const [isOpenCountryModal, setIsOpenCountryModal] = useState(false);
  const [connectionMsg, setConnectionMsg] = useState('');
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { width } = useWindowDimensions();
  const { sendNonMemberInvite, loading } =
    useSendNonMemberConnectionInviteHelper();

  const { connections } = useConnections(id);
  const { space: noumInfo } = useNoumDetails(id);

  const noumUsers = useMemo(() => {
    const result: InvitedUser[] = [];
    connections?.map((connection) => {
      if (
        ((connection.requestFrom?._id === id &&
          !UserUtil.isInactive(connection.requestTo?.uid)) ||
          (connection.requestTo?._id === id &&
            !UserUtil.isInactive(connection.requestFrom?.uid))) &&
        connection.status !== ConnectionRequestTypeEnum.Cancelled &&
        connection.status !== ConnectionRequestTypeEnum.Removed &&
        connection.requestTo?.uid?.userStatus !== ActionType.Unregistered &&
        !UserUtil.isInactive(connection.requestTo?.uid)
      ) {
        const requestedUser =
          connection.requestFrom?._id === id
            ? connection?.requestTo?.uid
            : connection?.requestFrom?.uid;
        result.push({
          isMember: true,
          connectionStatus: connection.status!,
          connectionId: connection._id!,
          ...requestedUser!,
        } as InvitedUser);
      }
      return undefined;
    });
    return result;
  }, [connections, id]);

  const isMobile = width < breakpoints.TABLET;
  const isLaptop = width > breakpoints.TABLET_L;
  const validationSchema = yup
    .object()
    .shape({
      email: yup
        .string()
        .email(
          t(
            'noumena.chamber_edit.visibility.invite_non_member_email.invalid_error',
          ),
        )
        .required(t('noumena.signup.error.field_cannot_be_empty')),
      firstName: yup
        .string()
        .max(20, t(`noumena.signup.first_name.too_long`))
        .required(t('noumena.signup.error.field_cannot_be_empty')),
      lastName: yup
        .string()
        .max(20, t(`noumena.signup.last_name.too_long`))
        .required(t('noumena.signup.error.field_cannot_be_empty')),
    })
    .required();

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const checkNewInvite = useCallback(
    async (email: string): Promise<CheckNewInviteResult> => {
      const result: CheckNewInviteResult = {
        isNew: true,
        isUnregistered: true,
      };

      const invitedUsers = connectedUsers?.filter(
        (user) =>
          user.email === email &&
          user.isVerified &&
          user.userStatus === UserStatus.Unregistered,
      );

      if (invitedUsers.length) {
        result.isNew = false;
        return result;
      }
      const searchResult = await searchUsers({
        variables: {
          query: email,
          limit: 1,
          entityType: EntityType.HomeNoum,
        },
      });

      const user = searchResult?.data?.globalSearch?.data[0];

      if (
        !user ||
        user.entityType !== EntityType.HomeNoum ||
        user.user.status !== GlobalSearchUserEntityStatus.NoumenaMember
      ) {
        return result;
      }

      if (
        user &&
        user.entityType === EntityType.HomeNoum &&
        user.user.status === GlobalSearchUserEntityStatus.NoumenaMember
      ) {
        const invitedNMUser = noumUsers.find(
          (noumUser) => noumUser._id === user.user.id,
        );
        if (invitedNMUser) {
          result.isNew = false;
          result.isUnregistered = false;
          return result;
        }
      }

      if (!connections.length) {
        result.isUnregistered = false;
        result.user = user;
        return result;
      }

      const existingConnections = connections?.filter(
        (connection) =>
          connection.requestFrom?._id === id &&
          connection.status !== ConnectionRequestTypeEnum.Cancelled &&
          connection.status !== ConnectionRequestTypeEnum.Removed &&
          connection.requestTo?.uid?._id === user.id,
      );

      if (existingConnections.length) {
        result.isNew = false;
      } else {
        result.isUnregistered = false;
        result.user = user;
      }

      return result;
    },
    [id, connectedUsers, noumUsers, connections, searchUsers],
  );

  const onHandleInvite = useCallback(async () => {
    try {
      const email = getValues('email');
      const isNewInvite = await checkNewInvite(email);
      if (!isNewInvite.isNew) {
        addToast(
          'primary',
          'icon',
          `${t(
            'noumena.chamber_edit.visibility.invite_non_member.already_invited',
          )}`,
        );
        return;
      }

      if (isNewInvite.isUnregistered && noumInfo) {
        await sendNonMemberInvite(
          id,
          getValues('email'),
          getValues('firstName'),
          getValues('lastName'),
          noumInfo,
          connectionMsg.trim(),
        );
        reset();
        setConnectionMsg('');
        addToast(
          'success',
          'icon',
          `${t('noumena.chamber_invite_sent.success_messages')}`,
        );
      } else if (id && isNewInvite.user?.id) {
        await inviteNoumUser({
          variables: {
            ownSpaceId: id,
            invitedSpaceIds: [isNewInvite.user.id],
            message: connectionMsg,
          },
        });
      }
      return;
    } catch (e) {
      let message = 'Unknown';
      if (e instanceof Error) {
        message = e.message;
      }
      addToast('error', 'none', message);
    }
  }, [
    addToast,
    getValues,
    id,
    noumInfo,
    reset,
    sendNonMemberInvite,
    t,
    checkNewInvite,
    inviteNoumUser,
    connectionMsg,
  ]);

  const onSubmit = useCallback(async () => {
    onHandleInvite();
  }, [onHandleInvite]);

  const handleChange = useCallback(() => {
    trigger();
  }, [trigger]);

  const handleChangeMessage = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setConnectionMsg(event.target.value.trimStart().slice(0, 200));
    },
    [setConnectionMsg],
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <S.UserFormHeader>
          <S.FieldContent width={isLaptop ? '293px' : '40%'}>
            <TextField
              label={t(`noumena.email`)}
              {...register('email', {
                onChange: handleChange,
              })}
              value={getValues('email')}
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </S.FieldContent>
          <S.FieldContent width={isLaptop ? '150px' : '20%'}>
            <TextField
              label={t(`noumena.first_name`)}
              {...register('firstName', {
                onChange: handleChange,
              })}
              value={getValues('firstName')}
              fullWidth
            />
          </S.FieldContent>
          <S.FieldContent width={isLaptop ? '150px' : '20%'}>
            <TextField
              label={t(`noumena.last_name`)}
              {...register('lastName', {
                onChange: handleChange,
              })}
              value={getValues('lastName')}
              fullWidth
            />
          </S.FieldContent>
          <S.FieldContent width={isLaptop ? 'auto' : '12%'}>
            <Button
              primary
              size="full"
              disabled={!isValid}
              loading={loading || searchingUsers || sendingInvite}
              type="submit"
            >
              {t(`noumena.chamber_edit.visibility.invite`)}
            </Button>
          </S.FieldContent>
        </S.UserFormHeader>
        <S.NonMemberDescriptionWrapper isMobile={isMobile}>
          <S.Description
            colorToken="--text-input-neutral-default"
            font="body-s"
          >
            {t(`noumena.chamber_edit.visibility.invite_non_member_description`)}
          </S.Description>
          <ViewCountryButton
            textOnly
            onClick={() => setIsOpenCountryModal(true)}
          >
            <S.TextUnderLine
              colorToken="--text-input-neutral-default"
              font="body-s"
            >
              {t(`noumena.chamber_edit.visibility.invite_non_member_button`)}
            </S.TextUnderLine>
          </ViewCountryButton>
        </S.NonMemberDescriptionWrapper>
        {isValid && (
          <>
            <Spacer height={16} />
            <TextArea
              label={t(
                'noumena.chamber_edit.visibility.invite_message.input_placeholder',
              )}
              maxLength={200}
              value={connectionMsg}
              onChange={handleChangeMessage}
              autoResize
            />
          </>
        )}
      </form>
      <BlockedCountriesListModal
        isOpen={isOpenCountryModal}
        onClose={() => setIsOpenCountryModal(false)}
      />
    </>
  );
};

export default InviteNonUserPicker;
