import {
  PostCategory,
  PostVisibility,
  type PostInput,
  type TagsInput,
} from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { Modal, ModalSize } from '@/components/ExtendedModal';
import VisibilityOptions from '@/constants/visibilityOptions';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { tagsOutput2Input } from '@/utils/tags';
import { type RawDraftContentState } from 'draft-js';
import { t } from 'i18next';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useMentionClipboard } from '@/providers/MentionClipboardProvider';
import { type ChangeMeta } from '@/screens/Chamber/components/Element/types';
import { htmlToPlainText } from '@/screens/Chamber/components/elements/PostElement/helpers';
import { getFullName } from '@/utils/fullName';
import { trackEvent } from '@/utils/tracking';
import PostModalBody from './PostModalBody';
import PostModalFooter from './PostModalFooter';
import PostModalHeader from './PostModalHeader';
import { type CreatePostProps } from './types';
import { useCreatePostHelper } from './useCreatePostHelper';

const VisibilityChambersOptions: DropdownValueType<PostVisibility>[] =
  Object.values(VisibilityOptions).slice(0, 2) ?? [];

const multiFilesAllowed = false;

export const CreatePostModal: React.FC<CreatePostProps> = ({
  post,
  spaceId,
  onClose,
  onEdit,
  onSuccess,
  isChamber = true,
  isMasterNoum = false,
  isCommunity = false,
}) => {
  const { isUnregistered: isUnregisteredUser, isActive, user } = useAuth();
  const { addToast } = useToast();
  const isOpen = useMemo(() => !!spaceId || !!post, [spaceId, post]);
  const isEdit = useMemo(() => !!post, [post]);
  const [text, setText] = useState<string>('');
  const [rawJson, setRawJson] = useState<RawDraftContentState | undefined>();
  const [postVisibility, setPostVisibility] = useState<
    DropdownValueType<PostVisibility>
  >(VisibilityOptions[PostVisibility.Connection]);
  const [images, setImages] = useState<string[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagsInput[]>(tagsOutput2Input(post?.tags));

  const clipboard = useRef<HTMLDivElement>(null);
  const { setMentionIds, mentionIds } = useMentionClipboard();

  const reset = useCallback(() => {
    setImages([]);
    setThumbnails([]);
    setText('');
    setRawJson(undefined);
    onSuccess();
  }, [onSuccess]);

  const {
    createChamberPost,
    loadingChamberPost,
    createNoumPost,
    loadingPost,
    updateNoumPost,
    updatingPost,
  } = useCreatePostHelper({ reset });

  const loading =
    (isChamber && !isMasterNoum ? loadingChamberPost : loadingPost) ||
    updatingPost;

  const options = useMemo(() => {
    if (!isUnregisteredUser) return VisibilityChambersOptions;
    return VisibilityChambersOptions.filter(
      (option) => option.value === PostVisibility.Connection,
    );
  }, [isUnregisteredUser]);

  const showVisibility = useMemo(() => {
    if (isMasterNoum || isCommunity) return false;
    return isChamber;
  }, [isChamber, isCommunity, isMasterNoum]);

  const isValid = useMemo(() => {
    if (images.length > 0) {
      return true;
    }
    const plainText = htmlToPlainText(text);
    if (plainText.trim() === '') {
      return false;
    }
    return (
      !!text &&
      !!((spaceId || isEdit) && postVisibility.value && text.length > 1)
    );
  }, [isEdit, spaceId, postVisibility, text, images]);

  const handleClose = useCallback(() => {
    setText('');
    setRawJson(undefined);
    onClose();
  }, [onClose]);

  const handleSelectedImage = useCallback(
    (imageURL: string, meta?: ChangeMeta) => {
      if (meta && meta?.type === 'video') {
        setThumbnails([
          ...(multiFilesAllowed ? thumbnails : []),
          meta?.thumbnail,
        ]);
      } else {
        setThumbnails([...(multiFilesAllowed ? thumbnails : []), '']);
      }
      setImages([...(multiFilesAllowed ? images : []), imageURL]);
    },
    [images, thumbnails],
  );

  const handleDeleteAssetItem = useCallback(
    (index: number) => {
      setImages(images.filter((image, idx) => idx !== index));
      setThumbnails(thumbnails.filter((thumbImage, idx) => idx !== index));
      setCategories(categories.filter((category, idx) => idx !== index));
    },
    [images, categories, thumbnails],
  );

  const addTag = (id: string | number) => {
    const newTagsArray = [...tags, { uid: id }] as TagsInput[];
    setTags(newTagsArray);
  };
  const handlePosting = useCallback(() => {
    if (!isActive && !isUnregisteredUser) {
      addToast('primary', 'icon', t(`noumena.community.userIsNotActive.posts`));
      return;
    }
    if (!isValid) return;
    const tagIds: string[] = [];
    if (rawJson?.entityMap) {
      Object.values(rawJson.entityMap).forEach((entityValue) => {
        if (entityValue.type === 'mention') {
          if (
            entityValue.data.mention?.uid &&
            tagIds.indexOf(entityValue.data.mention.uid) === -1
          ) {
            tagIds.push(entityValue.data.mention.uid);
          }
        }
      });
    }

    const postDetails: PostInput = {
      rawJSON: rawJson,
      text: text.trim(),
      tags:
        tagIds.length > 0
          ? tagIds.map((tagId: string) => ({ uid: tagId }))
          : tags,
      chamberId: isChamber && !isMasterNoum ? spaceId : undefined,
      visibility:
        !isEdit && !showVisibility ? PostVisibility.All : postVisibility.value,
      post:
        images?.length > 0
          ? {
              category: categories[0],
              content: images[0],
              thumbnail: !thumbnails[0] ? null : thumbnails[0],
            }
          : isEdit
          ? {
              category: null,
              content: null,
            }
          : undefined,
    };

    if (isEdit && post) {
      updateNoumPost({
        variables: { _id: post._id, input: postDetails },
      }).then(() => {
        onClose?.();
        onEdit?.();
      });
    } else if (isChamber && !isMasterNoum) {
      createChamberPost(postDetails);
    } else {
      createNoumPost(postDetails, (res) => {
        if (isChamber && isMasterNoum) {
          trackEvent('submit_post', {
            DeviceType: navigator.userAgent,
            UUID: user?._id,
            PostId: res._id,
          });
        }
      });
    }
  }, [
    isActive,
    isUnregisteredUser,
    isValid,
    rawJson,
    text,
    tags,
    isChamber,
    isMasterNoum,
    spaceId,
    isEdit,
    showVisibility,
    postVisibility.value,
    images,
    categories,
    thumbnails,
    post,
    addToast,
    updateNoumPost,
    onClose,
    onEdit,
    createChamberPost,
    createNoumPost,
    user?._id,
  ]);

  const onUploadFile = useCallback(
    (file: File) => {
      if (!multiFilesAllowed) {
        setImages([]);
        setThumbnails([]);
        setCategories([]);
      }
      let fileType: PostCategory = PostCategory.Invite;
      if (file.type.startsWith('image')) fileType = PostCategory.Image;
      else if (file.type.startsWith('video')) fileType = PostCategory.Video;
      setCategories([...(multiFilesAllowed ? categories : []), fileType]);
    },
    [categories],
  );

  const onClipboard = useCallback(
    (type: string, content: string) => {
      if (type === 'copy') {
        const result: string[] = [];
        post?.tags?.map((tag) => {
          const name = getFullName(
            tag?.uid?.firstName,
            tag?.uid?.middleName,
            tag?.uid?.lastName,
            '',
          );
          if (content.includes(`@${name}`)) {
            result.push(tag?.uid?._id!);
            content.replace(name, ' ');
          }
          return undefined;
        });
        setMentionIds(result);
      }
      if (type === 'paste') {
        const tmpArr: TagsInput[] = [];
        mentionIds.map((id) => {
          tmpArr.push({ uid: id });
          return undefined;
        });
        setTags((tg) => [...tg, ...tmpArr]);
        setMentionIds([]);
      }
    },
    [setMentionIds, mentionIds, setTags, post],
  );
  useEffect(() => {
    if (post?.post?.content) setImages([post.post?.content]);

    if (post?.post?.thumbnail) setThumbnails([post.post?.thumbnail]);

    if (post?.post?.category) setCategories([post.post?.category]);

    if (post?.text) setText(post.text);

    if (post?.rawJSON) setRawJson(post.rawJSON);

    setPostVisibility(
      VisibilityOptions[post?.visibility ?? PostVisibility.Connection],
    );
  }, [post]);

  return (
    <Modal
      ref={clipboard}
      open={isOpen}
      testId="create_post"
      onClose={handleClose}
      enableCloseButton
      disableBackdropClick
      spacingMode="gap-content"
      disableEscapeKeyDown={imageUploading || loading}
      size={ModalSize.XL}
    >
      <PostModalHeader
        loading={loading}
        isValid={isValid}
        imageUploading={imageUploading}
        isEdit={isEdit}
        handleClose={handleClose}
        handlePosting={handlePosting}
      />

      <PostModalBody
        images={images}
        showVisibility={showVisibility}
        options={options}
        postVisibility={postVisibility}
        setPostVisibility={setPostVisibility}
        text={text}
        setText={setText}
        setRawJson={setRawJson}
        addTag={addTag}
        categories={categories}
        handleDeleteAssetItem={handleDeleteAssetItem}
        post={post}
        onClipboard={onClipboard}
      />

      <PostModalFooter
        handleSelectedImage={handleSelectedImage}
        setImageUploading={setImageUploading}
        onUploadFile={onUploadFile}
        images={images}
        showVisibility={showVisibility}
        options={options}
        postVisibility={postVisibility}
        setPostVisibility={setPostVisibility}
        loading={loading}
        isValid={isValid}
        multiFilesAllowed={multiFilesAllowed}
        imageUploading={imageUploading}
        isEdit={isEdit}
        handlePosting={handlePosting}
        clipboard={clipboard}
      />
    </Modal>
  );
};
