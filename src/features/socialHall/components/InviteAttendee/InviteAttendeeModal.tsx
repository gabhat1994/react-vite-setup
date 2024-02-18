import { useMemo, useState, useCallback, useRef, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { uniqBy } from 'lodash';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { useError, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import {
  useAllUsersForInviteLazyQuery,
  useSendEmailMutation,
} from '@/apollo/graphql';
import { getBottomStatusFromQuery } from '@/components/Infinite';
import { Spinner } from '@/components/Spinner';
import { type BottomStatus } from '@/components/Infinite/types';
import { cleanList } from '@/utils/list';
import { useSocialHallContext, useSocialHallEventContext } from '@/providers';
import { useMultipleInvitation } from '@/features/socialHall/hooks';
import { Template } from '@/apollo/generated/types';
import { generatePersonalInviteLink } from '@/features/coreSettings';
import { useAuth } from '@/features/auth/contexts';
import { UserUtil } from '@/utils/user';
import { SelectedAvatar } from './SelectedAvatar';
import { PAGE_SIZE } from './const';
import { InviteAttendeeItem } from './InviteAttendeeItem';
import * as S from './styles';
import { type InviteAttendeeModalProps, type TInvitee } from './types';

export const InviteAttendeeModal = memo(
  ({ isOpen, handleClose, refetchAudience }: InviteAttendeeModalProps) => {
    const { user } = useAuth();
    const { isPersonalSocialHall } = useSocialHallContext();
    const { logError } = useError();
    const { eventDetails } = useSocialHallEventContext();
    const observerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { width } = useWindowDimensions();
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [searchStr, setSearchStr] = useState<string>('');
    const [selectedUsers, setSelectedUsers] = useState<TInvitee[]>([]);
    const [users, setUsers] = useState<TInvitee[]>([]);

    const personalLink = generatePersonalInviteLink(user ?? null);

    const [searchUsers, { data, networkStatus, loading: isFetching }] =
      useAllUsersForInviteLazyQuery({
        fetchPolicy: 'cache-and-network',
      });
    const { createMultipleInvitation, loading } = useMultipleInvitation();
    const [sendEmailMutation, { loading: isSendingEmail }] =
      useSendEmailMutation();

    const isDesktop = useMemo(() => width >= breakpoints.LAPTOP, [width]);
    const isTablet = useMemo(
      () => width < breakpoints.LAPTOP && width >= breakpoints.TABLET,
      [width],
    );
    const hasMore = useMemo(
      () => (data?.allUsers.count ?? 0) > users.length,
      [data?.allUsers.count, users.length],
    );

    const fetchMoreStatus: BottomStatus = useMemo(() => {
      if (hasMore) {
        return getBottomStatusFromQuery({
          networkStatus,
          totalCount: data?.allUsers.count ?? 0,
          currentCount: data?.allUsers.data?.length ?? 0,
          withForce: true,
        });
      }
      return 'end';
    }, [
      data?.allUsers.count,
      data?.allUsers.data?.length,
      hasMore,
      networkStatus,
    ]);

    const onSearchChange = useCallback(
      (v: string) => {
        setUsers([]);
        setSearchStr(v);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          searchUsers({
            variables: {
              search: v,
              limit: PAGE_SIZE,
              offset: users.length,
              eventId: eventDetails?._id,
              skipEventRole: isPersonalSocialHall,
            },
            onCompleted(res) {
              setUsers((prev) =>
                uniqBy(
                  [...prev, ...cleanList<TInvitee>(res.allUsers.data)],
                  '_id',
                ),
              );
            },
          });
        }, 500);
      },
      [eventDetails?._id, isPersonalSocialHall, searchUsers, users.length],
    );

    const handleCheck = (userOutput: TInvitee) => {
      const index = selectedUsers.findIndex(
        (selectedUser) => selectedUser._id === userOutput._id,
      );
      if (index > -1) {
        setSelectedUsers((prev) =>
          prev.filter((u) => u._id !== userOutput._id),
        );
      } else {
        setSelectedUsers((prev) => [...prev, userOutput]);
      }
    };

    const onClose = useCallback(() => {
      if (loading) return;
      setSearchStr('');
      setSelectedUsers([]);
      setUsers([]);
      handleClose();
    }, [handleClose, loading]);

    const onHandleInvite = async () => {
      if (!isPersonalSocialHall) {
        const userIds = selectedUsers.map((selectedUser) => selectedUser._id!);
        try {
          await createMultipleInvitation(
            eventDetails?._id!,
            userIds,
            searchStr,
          );
          onClose();
          refetchAudience?.();
        } catch (err) {
          logError(err, '');
        }
      } else {
        await sendEmailMutation({
          variables: {
            input: {
              to: selectedUsers.map((selectedUser) => selectedUser._id ?? ''),
              template: Template.PersonalEventInvite,
              emailParams: {
                url: personalLink,
              },
            },
          },
        });
      }
      onClose();
    };

    const onFetchMore = useCallback(() => {
      if (isFetching) return;
      searchUsers({
        variables: {
          search: searchStr,
          limit: PAGE_SIZE,
          offset: users.length,
          eventId: eventDetails?._id,
          skipEventRole: isPersonalSocialHall,
        },
        onCompleted(res) {
          setUsers((prev) =>
            uniqBy([...prev, ...cleanList<TInvitee>(res.allUsers.data)], '_id'),
          );
        },
      });
    }, [
      isFetching,
      searchUsers,
      searchStr,
      users.length,
      eventDetails?._id,
      isPersonalSocialHall,
    ]);

    useEffect(() => {
      if (!observerRef.current || !isOpen) return undefined;

      const observer = new IntersectionObserver((entities) => {
        if (entities.some((entity) => entity.isIntersecting)) {
          onFetchMore();
        }
      });

      observer.observe(observerRef.current);

      return () => observer.disconnect();
    }, [onFetchMore, isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      onFetchMore();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      [],
    );

    return (
      <Modal
        testId="invite-attendees-modal"
        open={isOpen}
        onClose={onClose}
        enableCloseButton
        closeButtonStyles={{ tertiary: true, enforceRight: false }}
        isFullScreen={!isDesktop}
        style={{
          width: isDesktop ? 752 : isTablet ? 736 : '100vw',
        }}
        disableBackdropClick
      >
        {isFetching && <Spinner />}
        <ModalHeader isFullScreen={!isDesktop}>
          {t(`noumena.social_hall.invite_users`)}
        </ModalHeader>
        <ModalBody isFullScreen={!isDesktop}>
          <S.SearchWrapper>
            <S.SearchField
              inputSize="small"
              placeholder={t(
                'noumena.social_hall.search_user_placeholder.text',
              )}
              leftIcon={
                <Icon
                  name="search_m"
                  size={24}
                  color="--icon-input-neutral-default"
                />
              }
              rightIcon={
                searchStr ? (
                  <Icon
                    name="clear_m"
                    size={24}
                    color="--icon-input-brand-primary-default"
                    onClick={() => onSearchChange('')}
                  />
                ) : null
              }
              value={searchStr || ''}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                onSearchChange(e.currentTarget.value)
              }
              data-testid="search-attendees"
            />
          </S.SearchWrapper>
          {!!selectedUsers.length && (
            <S.SelectedUserWrapper>
              <S.SelectedSpan
                colorToken="--text-tablecell-body-neutral-default"
                font="body-l"
              >
                {t(`noumena.social_hall.invite.selected_people`)}
              </S.SelectedSpan>
              <S.AvatarWrapper>
                {selectedUsers.map((selectedUser) => (
                  <SelectedAvatar
                    key={`selected-avatar-${selectedUser._id}`}
                    onClickCancel={() => handleCheck(selectedUser ?? '')}
                    profilePicture={UserUtil.getProfilePicture(selectedUser)}
                  />
                ))}
              </S.AvatarWrapper>
            </S.SelectedUserWrapper>
          )}
          <S.ListWrapper data-testid="invite-attendees-list-wrapper">
            {!users.length && !isFetching && (
              <S.NothingFound>
                <TSpan
                  font="body-m"
                  colorToken="--text-tablecell-header-neutral-default"
                >
                  {t('noumena.social_hall.invite_users.nothing_found')}
                </TSpan>
              </S.NothingFound>
            )}
            {!!users.length &&
              users.map((invitedUser: TInvitee) => (
                <InviteAttendeeItem
                  key={invitedUser?._id}
                  user={invitedUser}
                  isChecked={
                    selectedUsers.findIndex((u) => u._id === invitedUser!._id) >
                    -1
                  }
                  onCheck={() => handleCheck(invitedUser)}
                />
              ))}
            {fetchMoreStatus === 'hasNextPage' && (
              <S.InfiniteObserver ref={observerRef} />
            )}
          </S.ListWrapper>
        </ModalBody>
        <ModalFooter isFullScreen={!isDesktop} gap={16}>
          <S.ModalButton tertiary onClick={onClose} disabled={loading}>
            {t(`noumena.social_hall.button.cancel`)}
          </S.ModalButton>
          <S.ModalButton
            primary
            softDisabled={!(selectedUsers.length > 0)}
            loading={loading || isSendingEmail}
            onClick={onHandleInvite}
          >
            {t(`noumena.social_hall.invite_users`)}
          </S.ModalButton>
        </ModalFooter>
      </Modal>
    );
  },
);
