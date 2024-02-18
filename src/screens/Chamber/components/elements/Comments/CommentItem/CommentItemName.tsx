import { useMemo } from 'react';
import { TSpan } from '@/components/Typography';
import { CommentNameContainer } from '@/screens/Chamber/components/elements/Comments/styles';
import { getFullName } from '@/utils/fullName';
import { type Maybe } from '@/common/types';
import { type UserOutputFragment } from '@/apollo/graphql';

type CommentItemNameProps = {
  uid: Maybe<UserOutputFragment>;
};

const CommentItemName = ({ uid }: CommentItemNameProps) => {
  const fullName = useMemo(
    () => getFullName(uid?.firstName, uid?.middleName, uid?.lastName),
    [uid?.firstName, uid?.middleName, uid?.lastName],
  );

  return (
    <CommentNameContainer data-testid="commentNameContainer">
      <TSpan
        font="body-m-bold"
        colorToken="--text-comment-header-neutral-highlighted"
        data-testid="name"
      >
        {fullName}
      </TSpan>
    </CommentNameContainer>
  );
};
export default CommentItemName;
