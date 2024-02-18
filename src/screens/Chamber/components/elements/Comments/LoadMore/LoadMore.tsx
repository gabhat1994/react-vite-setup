import {
  type PostCommentFragment,
  type ThreadOutputFragment,
} from '@/apollo/graphql';
import { Button, Spinner } from '@/components';
import {
  ButtonWrap,
  LoadMoreContainer,
  LoadMoreText,
} from '@/screens/Chamber/components/elements/Comments/styles';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cleanList } from '@/utils/list';
import S from './styles';
import LoadMoreAvatar from './LoadMoreAvatar';

type LoadMoreProps = {
  count: number;
  isReplies?: boolean;
  replies?: ThreadOutputFragment[] | PostCommentFragment[];
  loading?: boolean;
  handleLoadMore?: () => void;
};

const LoadMore = ({
  handleLoadMore,
  isReplies,
  count,
  replies,
  loading,
}: LoadMoreProps) => {
  const { t } = useTranslation();

  const userList = useMemo(
    () => cleanList(replies?.map((c) => ({ _id: c?.uid }))),
    [replies],
  );

  const pictures = useMemo(
    () =>
      cleanList(
        userList.map((u) => u?._id?.profile?.profilePicture).slice(0, 3),
      ),
    [userList],
  );

  return (
    <LoadMoreContainer isReply={isReplies}>
      <LoadMoreAvatar pictures={pictures} />
      <ButtonWrap>
        <Button onClick={handleLoadMore} size="small" textOnly>
          <LoadMoreText
            font="button-s"
            colorToken="--text-button-brand-primary-default"
          >
            {isReplies
              ? t('noumena.load.more.show_more_comments', { count })
              : t('noumena.load.more.show_more_replies', { count })}
          </LoadMoreText>
        </Button>

        {loading && (
          <S.SpinnerContainer>
            <Spinner />
          </S.SpinnerContainer>
        )}
      </ButtonWrap>
    </LoadMoreContainer>
  );
};
export default LoadMore;
