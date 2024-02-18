import {
  PostStatus,
  type Mutation,
  type PostInput,
} from '@/apollo/generated/types';
import {
  useCreatePostForChamberMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  type PostItemFragment,
} from '@/apollo/graphql';
import { useToast } from '@/hooks';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useCallback } from 'react';
import { type HelperProps } from './types';

type CreatePostResponse = Pick<PostItemFragment, '_id' | 'postStatus'>;

export function useCreatePostHelper({ reset }: HelperProps) {
  const { addToast } = useToast();

  const [createPostForChamber, { loading: loadingChamberPost }] =
    useCreatePostForChamberMutation();

  const handleError = useCallback(
    (error: String | Error | null) => {
      addToast('error', 'icon', `${error}`);
    },
    [addToast],
  );

  const handleSuccess = useCallback(
    (msg: string) => {
      addToast('success', 'icon', msg);
    },
    [addToast],
  );

  const handlePrimary = useCallback(
    (msg: string) => {
      addToast('primary', 'icon', msg);
    },
    [addToast],
  );

  const onCompleted = useCallback(
    (callback?: (a: CreatePostResponse) => void, isEdit?: boolean) =>
      (response: Mutation) => {
        const status =
          response?.createPost ||
          response?.createPostForChamber ||
          response?.updatePost;

        if (status) {
          switch (status.postStatus) {
            case PostStatus.Accepted:
              handleSuccess(
                isEdit
                  ? t('noumena.chambers.element.posts.success.update')
                  : t('noumena.chambers.element.posts.success.create'),
              );
              break;
            case PostStatus.Rejected:
              handleError(
                t('noumena.chambers.element.posts.error.creation_rejected'),
              );
              break;
            case PostStatus.BeingReviewed:
              handlePrimary(
                t('noumena.chambers.element.posts.status.BeingReviewed'),
              );
              break;
          }
          callback?.(status);
          reset();
        }
      },
    [handleError, handlePrimary, handleSuccess, reset],
  );

  const createChamberPost = useCallback(
    async (input: PostInput, callback?: (res: CreatePostResponse) => void) => {
      await createPostForChamber({
        variables: { input },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          const error = t(
            'noumena.chambers.element.posts.error.creation_failed',
          );
          handleError(`${error}`);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'useCreatePostForChamberMutation',
            },
          });
        },
        // @ts-ignore
        onCompleted: onCompleted(callback),
      });
    },
    [createPostForChamber, handleError, onCompleted],
  );

  const [createPost, { loading: loadingPost }] = useCreatePostMutation();
  const createNoumPost = useCallback(
    async (input: PostInput, callback?: (res: PostItemFragment) => void) => {
      await createPost({
        variables: { input },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          const error = t(
            'noumena.chambers.element.posts.error.creation_failed',
          );
          handleError(`${error}`);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'useCreatePostMutation',
            },
          });
        },
        // @ts-ignore
        onCompleted: onCompleted(callback),
      });
    },
    [createPost, handleError, onCompleted],
  );

  const [updatePost, { loading: updatingPost }] = useUpdatePostMutation();
  const updateNoumPost = useCallback(
    async (variables) => {
      await updatePost({
        variables: variables.variables,
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          const error = t('noumena.chambers.element.posts.error.update_failed');
          handleError(`${error}`);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'useUpdatePostMutation',
            },
          });
        },
        // @ts-ignore
        onCompleted: onCompleted((data) => data, true),
      });
    },
    [updatePost, onCompleted, handleError],
  );

  return {
    createChamberPost,
    loadingChamberPost,
    createNoumPost,
    loadingPost,
    updateNoumPost,
    updatingPost,
  };
}
