import {
  type PostItemFragment,
  type ThreadOutputFragment,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import parse from 'html-react-parser';
import { Fragment, useMemo } from 'react';
import generate from 'uniqid';
import { StyledText } from './AllPosts/styles';
import { MOBILE_POST_TAG_0 } from './consts';
import { returnParsedTagsArray, returnParsedTagsArrayWeb } from './utils';

const ParsedContent = ({
  item,
  isPost = false,
}: {
  item: ThreadOutputFragment | PostItemFragment;
  isPost?: boolean;
}) => {
  const content = isPost
    ? (item as PostItemFragment)?.text
    : (item as ThreadOutputFragment)?.content;
  const { isUnregistered } = useAuth();
  const isFromMobile = useMemo(
    () => content?.includes(MOBILE_POST_TAG_0),
    [content],
  );
  const parsedContentArr = useMemo(
    () => returnParsedTagsArray(item, isPost, isUnregistered),
    [item, isPost, isUnregistered],
  );
  const parsedContentArrWeb = useMemo(
    () => returnParsedTagsArrayWeb(item, isPost, isUnregistered),
    [item, isPost, isUnregistered],
  );
  return (
    <StyledText>
      {isFromMobile ? (
        <StyledText>
          {parsedContentArr?.map((el: string | object) => (
            <Fragment key={generate()}>
              {typeof el === 'string' ? parse(el) : el}
            </Fragment>
          ))}
        </StyledText>
      ) : (
        <StyledText>
          {parsedContentArrWeb?.map((el: string | object) => (
            <Fragment key={generate()}>
              {typeof el === 'string' ? parse(el) : el}
            </Fragment>
          ))}
        </StyledText>
      )}
    </StyledText>
  );
};

export default ParsedContent;
