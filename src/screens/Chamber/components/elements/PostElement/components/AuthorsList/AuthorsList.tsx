import { Avatar } from '@/components/Avatar/Avatar';
import { DiagonalAvatar3 } from '@/components/Avatar/Diagonal3/Diagonal3';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { getFullName } from '@/utils/fullName';
import { UserUtil } from '@/utils/user';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import { usePostElement } from '../../PostElementProvider';
import { AllTab, Container, MoreText, UserFrame } from './styles';

const TO_SHOW = 6;

const AuthorsList = () => {
  const { authors, filter, setFilter } = usePostElement();
  const { t } = useTranslation();

  const selectedUid = useMemo(
    () => filter.filter?.uid || 'all',
    [filter.filter],
  );
  const all = useMemo(() => [...authors], [authors]);
  const remainCount = useMemo(() => all.length - TO_SHOW, [all]);

  const lastUrls = useMemo(() => {
    if (remainCount > 0) {
      const tmp = all.slice(TO_SHOW, TO_SHOW + 3);
      const urls: string[] = [];
      tmp.map((item) => {
        urls.push(UserUtil.getProfilePicture(item));
        return undefined;
      });
      return urls;
    }
    return [];
  }, [all, remainCount]);

  const handleSelect = useCallback(
    (uid) => {
      if (uid === 'all') {
        setFilter({
          ...filter,
          filter: {
            ...filter.filter,
            uid: undefined,
          },
        });
      } else {
        setFilter({
          ...filter,
          filter: {
            ...filter.filter,
            uid,
          },
        });
      }
    },
    [filter, setFilter],
  );

  if (all.length < 2) {
    return null;
  }

  return (
    <ElementWrapperV2.Body>
      <Container>
        <AllTab
          onClick={() => {
            handleSelect('all');
          }}
          size="medium"
          borderRadius="8px"
          secondary={selectedUid !== 'all'}
          isDisabled={selectedUid !== 'all'}
        >
          <TSpan
            font="body-m-bold"
            colorToken={
              selectedUid === 'all'
                ? '--text-tab-basic-brand-primary-selected'
                : '--text-tab-basic-neutral-default'
            }
          >
            {t('noumena.post_all_authors')}
          </TSpan>
        </AllTab>
        <UserFrame>
          {all.slice(0, TO_SHOW).map((author) => (
            <AllTab
              key={author._id}
              borderRadius="8px"
              isDisabled={selectedUid !== author._id}
              onClick={() => {
                handleSelect(author._id);
              }}
              secondary={selectedUid === author._id}
            >
              <Stack align="center" gap={8}>
                <Avatar
                  size="M"
                  url={UserUtil.getProfilePicture(author) ?? ''}
                />
                {selectedUid === author._id && (
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-tab-basic-brand-primary-selected"
                  >
                    {getFullName(
                      author.firstName,
                      author.middleName,
                      author.lastName,
                    )}
                  </TSpan>
                )}
              </Stack>
            </AllTab>
          ))}
          {remainCount > 0 && (
            <Stack>
              <DiagonalAvatar3 size="M" urls={lastUrls} />
              <MoreText colorToken="--text-tab-chips-neutral-default">
                +{remainCount}
              </MoreText>
            </Stack>
          )}
        </UserFrame>
      </Container>
    </ElementWrapperV2.Body>
  );
};

export default AuthorsList;
