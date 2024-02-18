import {
  useGetProfileWidgetDataQuery,
  type UserOutputFragment,
} from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { Spinner } from '@/components/Spinner';
import { UserUtil } from '@/utils/user';

type ReplyAvatarProps = {
  uid: Maybe<UserOutputFragment> | undefined;
};

const ReplyAvatar = ({ uid }: ReplyAvatarProps) => {
  const { data, loading } = useGetProfileWidgetDataQuery({
    variables: { id: uid?._id || '' },
  });
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Avatar url={UserUtil.getProfilePicture(data?.user) ?? ''} size="L" />
      )}
    </>
  );
};

export default ReplyAvatar;
