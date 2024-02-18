import { format } from 'date-fns';
import { t } from 'i18next';
import { EntityType, PostType } from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';
import MemberDefaultImage from '@/assets/images/profile_default.png';
import EventDefaultImage from '@/assets/images/public-xl.svg';
import EventDropdownImage from '@/assets/icons/calendar-m.svg';
import { TimeRelative } from '@/components/TimeRelative';
import { TSpan } from '@/components/Typography';
import { TagLabel } from '@/features/conversation/components/MessageUserPicker/styles';
import { isHTMLString, returnParsedTagsText } from '@/screens/Community/utils';
import { eventStatus, noumStatus } from './constants';
import {
  AvatarChild,
  AvatarHead,
  ContentTSpan,
  StackHead,
  StyledTSpan,
} from './styles';
import { type ISearchContent } from './types';

const SearchContent = ({ data, query, isDropdown }: ISearchContent) => {
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;

  const { entityType, noum, event, post: searchedPost, user } = data;

  const post = searchedPost
    ? {
        ...searchedPost,
        content: returnParsedTagsText(searchedPost),
      }
    : null;

  const searchValue = (value: string) => {
    let res = value;
    const req = query;
    if (req) {
      const normReq = req
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^0-9a-zA-Z]+/g, '')
        .trim()
        .split(' ')
        .sort((a, b) => b.length - a.length);
      res = res.replace(
        new RegExp(`(${normReq.join('|')})`, 'gi'),
        (match) => `<mark>${match}</mark>`,
      );
    }
    return res;
  };

  const avatarURL = (type: EntityType) => {
    const isMember = type === EntityType.HomeNoum;
    const isEvent = type === EntityType.Event;
    const isPost = type === EntityType.Post;
    const profileImage =
      isMember || (isPost && post?.type !== PostType.ProjectPost)
        ? user?.thumbnailUrl
        : isPost && post?.type === PostType.ProjectPost
        ? post.noumThumbnailUrl
        : noum?.thumbnailUrl;
    let avatar;
    if (!profileImage) {
      avatar = isMember
        ? MemberDefaultImage
        : isEvent
        ? isDropdown
          ? EventDropdownImage
          : EventDefaultImage
        : ChamberDefaultImage;
    } else {
      avatar = profileImage;
    }
    return avatar;
  };

  const getName = (type: EntityType) => {
    let name = '';
    switch (type) {
      case EntityType.HomeNoum:
      case EntityType.Post:
        name = user?.name ?? '';
        break;
      case EntityType.ProjectNoum:
        name = noum?.name ?? '';
        break;
      case EntityType.Event:
        name = event?.name ?? '';
        break;
      default:
        break;
    }
    return name;
  };

  return (
    <Stack
      data-testid="search-item"
      gap={16}
      padding={isMobile ? '20px 6px' : '20px 16px'}
      vertical
      borderBottom
      maxWidth="100%"
      overflow="hidden"
    >
      <Stack gap={16}>
        {/* TODO: Possibly could use NestedAvatar component. */}
        <AvatarHead>
          <Avatar url={avatarURL(entityType)} />
          {(post?.type === PostType.ProjectPost ||
            entityType === EntityType.ProjectNoum) &&
            !isDropdown && (
              <AvatarChild>
                <Avatar url={avatarURL(EntityType.HomeNoum)} width={20} />
              </AvatarChild>
            )}{' '}
        </AvatarHead>
        <div>
          <StackHead gap={6.5}>
            <StyledTSpan
              font="body-l-bold"
              colorToken="--text-card-header-neutral-highlighted"
              dangerouslySetInnerHTML={{
                __html: searchValue(getName(entityType)),
              }}
            />{' '}
            {post?.type === PostType.ProjectPost && (
              <>
                <Icon
                  name="arrow_right_m"
                  size={20}
                  color="--icon-button-neutral-default"
                />{' '}
                <StyledTSpan
                  font="body-l-bold"
                  colorToken="--text-card-header-neutral-highlighted"
                  dangerouslySetInnerHTML={{
                    __html: searchValue(post?.noumName ?? ''),
                  }}
                />
              </>
            )}
          </StackHead>
          <Stack>
            {entityType === EntityType.Post ? (
              post?.createdAt &&
              !isDropdown && (
                <Stack gap={4} align="center">
                  {post?.status && (
                    <TSpan
                      font="body-m"
                      colorToken="--text-timestamp-neutral-default"
                    >
                      {noumStatus[post.status]} ·
                    </TSpan>
                  )}
                  <TimeRelative
                    font="body-m"
                    colorToken="--text-timestamp-neutral-default"
                    date={new Date(post.createdAt)}
                  />
                </Stack>
              )
            ) : (
              <Stack gap={3} align="center">
                <StyledTSpan
                  font="body-m"
                  colorToken="--text-tablecell-body-neutral-default"
                  dangerouslySetInnerHTML={{
                    __html: searchValue(
                      entityType === EntityType.Event
                        ? format(new Date(event?.createdAt), 'MM/dd/yyyy') ?? ''
                        : entityType === EntityType.HomeNoum
                        ? (noum?.status &&
                            `${noumStatus[noum?.status]} · ${user.title}`) ??
                          user?.title ??
                          ''
                        : noum?.status
                        ? noumStatus[noum?.status]
                        : `${t('noumena.search.ownedby')} ${user?.name}`,
                    ),
                  }}
                />
                {entityType === EntityType.HomeNoum &&
                  user.isNoumenaEmployee && (
                    <TagLabel>
                      {t('noumena.message.noumena.employees')}
                    </TagLabel>
                  )}
              </Stack>
            )}

            {(noum?.isConnected || noum?.isFollowing) && (
              <ContentTSpan
                font="body-m"
                colorToken="--text-card-header-neutral-default"
              >
                ·{' '}
                {noum?.isConnected && noum?.isFollowing
                  ? t('noumena.connected')
                  : noum?.isFollowing
                  ? t('noumena.following')
                  : t('noumena.connected')}
              </ContentTSpan>
            )}
            {event?.status && (
              <ContentTSpan
                font="body-m"
                colorToken="--text-card-header-neutral-default"
              >
                · {eventStatus[event?.status as keyof typeof eventStatus]}
              </ContentTSpan>
            )}
          </Stack>
        </div>
      </Stack>
      {post?.content && (
        <StyledTSpan
          font="body-m"
          colorToken="--text-card-neutral-highlighted"
          dangerouslySetInnerHTML={{
            __html: searchValue(
              !isHTMLString(post.content) && post.content.length > 100
                ? `${post.content.substring(0, isDropdown ? 100 : 200)} ...`
                : post.content,
            ),
          }}
        />
      )}
    </Stack>
  );
};

export default SearchContent;
