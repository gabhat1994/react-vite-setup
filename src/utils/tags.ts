import { type TagsOutput } from '@/apollo/generated/types';
import { type Maybe } from '@/common/types';

export const tagsOutput2Input = (
  tags?: Maybe<Maybe<TagsOutput>[]> | undefined,
) =>
  tags
    ?.map((tag) => ({
      uid: tag?.uid?._id || '',
    }))
    .filter((uid) => uid) || [];
