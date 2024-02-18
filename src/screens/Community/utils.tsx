import {
  type Tag,
  type TagsOutput,
  type ThreadOutput,
  type UserOutput,
} from '@/apollo/generated/types';
import {
  type CommentOutputFragment,
  type PostCommentFragment,
  type PostItemFragment,
  type ThreadOutputFragment,
} from '@/apollo/graphql';
import { UserUtil } from '@/utils/user';
import { decode, encode } from 'html-entities';
import { type EditorDataProps } from '../Chamber/components/elements/PostElement/components/PostRichTextEditor/type';
import { StyledLink } from './AllPosts/styles';
import {
  MOBILE_POST_TAG_0,
  MOBILE_POST_TAG_PREFIX,
} from './consts';

const urlify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) =>
      `<p style="word-break:break-all;"><a target="_blank" href="${url}">${url}</a></p>`,
  );
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
};

export const returnParsedTagsArray = (
  val: PostItemFragment | ThreadOutputFragment | PostCommentFragment,
  isPost = false,
  isUnregistered = false,
) => {
  const matchTag = /\$\{\{@(?<inside>[^}]+)\}\}/g;
  const extractUserName = /@\[([^\]]+)\]\([^)]+\)/;
  let content = isPost
    ? (val as PostItemFragment)?.text
    : (val as ThreadOutput)?.content;
  if (content && !content.includes(MOBILE_POST_TAG_0))
    content = encode(content);
  const contentArr = content
    ?.split(matchTag)
    .filter((part) => part !== '')
    .map((part) => {
      if (!matchTag.test(part)) {
        return part;
      }

      return part.replace(
        extractUserName,
        '<span style={{ color: "#444" }}>$1</span>',
      );
    });
  const parsedContentArr = contentArr?.map((el: string) => {
    if (el.includes(MOBILE_POST_TAG_PREFIX)) {
      const nr = Number(el[el.length - 1]);
      const choosedTag = val?.tags?.[nr]?.uid;
      const disabled = Boolean(
        isUnregistered || UserUtil.isUnregistered(choosedTag as UserOutput),
      );
      return (
        <StyledLink
          $disableLink={disabled}
          to={disabled ? '' : `/noum/${choosedTag?.chamber?._id}`}
        >{`${choosedTag?.firstName} ${choosedTag?.lastName}`}</StyledLink>
      );
    }
    return urlify(el);
  });

  return parsedContentArr;
};

export const returnParsedTagsArrayWeb = (
  val: PostItemFragment | ThreadOutputFragment | PostCommentFragment,
  isPost = false,
  isUnregistered = false,
) => {
  const matchTag = /@\[(?<inside>[^\]]+)\]/g;
  const extractUserName = /@\[([^\]]+)\]\([^)]+\)/;
  const content = isPost
    ? encode((val as PostItemFragment)?.text)
    : (val as ThreadOutputFragment | CommentOutputFragment)?.content;
  const contentArr = content
    ?.split(matchTag)
    .filter((part) => part !== '')
    .map((part) => {
      if (!matchTag.test(part)) {
        return part;
      }

      return part.replace(
        extractUserName,
        '<span style={{ color: "#444" }}>$1</span>',
      );
    });

  return contentArr?.map((el: string) => {
    const tags = val?.tags || undefined;
    const tag = tags?.find(
      (t) =>
        el.includes(t?.uid?.firstName || '') &&
        el.includes(t?.uid?.lastName || ''),
    );

    if (tag && tag.uid) {
      const disabled =
        isUnregistered || UserUtil.isUnregistered(tag.uid as UserOutput);

      return (
        <StyledLink
          $disableLink={disabled}
          to={disabled ? '' : `/noum/${tag.uid?.chamber?._id}`}
        >{`${tag.uid.firstName} ${tag.uid?.lastName}`}</StyledLink>
      );
    }

    return urlify(el);
  });
};

export const returnParsedTagsText = (data: EditorDataProps) => {
  const textContent = isPostOutput(data) ? data.text : data.content;
  if (!textContent) return '';
  const tags = (data?.tags || []) as TagsOutput[];

  let rawText = textContent.replace(/\n/g, '<br/>');

  if (rawText === '' || tags.length < 1) {
    return rawText;
  }

  let matchTag = /@\[(?<inside>[^\]]+)\]/g;
  const extractUserName = /@\[([^\]]+)\]\([^)]+\)/;

  if (rawText.includes(MOBILE_POST_TAG_0)) {
    matchTag = /\$\{\{@(?<inside>[^}]+)\}\}/g;
  } else if (isPostOutput(data)) {
    rawText = encode(rawText);
  } else if (isHTMLString(rawText)) {
    return rawText;
  }

  const contentArr = rawText
    ?.split(matchTag)
    .filter((part) => part !== '')
    .map((part) => {
      if (!matchTag.test(part)) {
        return part;
      }

      return part.replace(
        extractUserName,
        '<span style={{ color: "#444" }}>$1</span>',
      );
    });

  const encodedText = contentArr
    ?.map((el: string) => {
      let tag;

      if (el.includes(MOBILE_POST_TAG_PREFIX)) {
        const nr = Number(el[el.length - 1]);
        tag = tags?.[nr];
      } else {
        tag = tags?.find(
          (t: Tag | TagsOutput) =>
            el.includes(t?.uid?.firstName || '') &&
            el.includes(t?.uid?.lastName || ''),
        );
      }

      if (tag) {
        const userName = `${tag?.uid?.firstName || ''} ${
          tag?.uid?.lastName || ''
        }`;
        return `<a class="draft-mention" data-mention-id="${userName}" href="/noum/${tag?.uid?.chamber?._id}">${userName}</a>`;
      }

      return el;
    })
    .join('');
  return decode(encodedText);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPostOutput = (x: any): x is PostItemFragment =>
  x.__typename === 'PostOutput';

export const isHTMLString = (str: string) => {
  const regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
  return regexForHTML.test(str);
};
