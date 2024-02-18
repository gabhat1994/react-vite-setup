import { type Dispatch, type SetStateAction, type RefObject } from 'react';
import { type CSSProperties } from 'styled-components';
import { type RawDraftContentState } from 'draft-js';
import {
  type PostCategory,
  type PostVisibility,
} from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { type ChangeMeta } from '@/screens/Chamber/components/Element/types';
import { type PostItemFragment } from '@/apollo/graphql';

export type CreatePostProps = {
  post?: PostItemFragment;
  spaceId?: string;
  onClose: () => void;
  onSuccess: () => void;
  onEdit?: () => void;
  isChamber?: boolean;
  isMasterNoum?: boolean;
  isCommunity?: boolean;
};

export type CreatePostHeaderProps = {
  loading: boolean;
  isValid: string | boolean;
  imageUploading: boolean;
  isEdit: boolean;
  handleClose: () => void;
  handlePosting: () => void;
};

export type CreatePostFooterProps = {
  handleSelectedImage: (imageURL: string, meta?: ChangeMeta) => void;
  setImageUploading: Dispatch<SetStateAction<boolean>>;
  onUploadFile: (file: File) => void;
  images: string[];
  showVisibility: boolean;
  options: DropdownValueType<PostVisibility>[];
  postVisibility: DropdownValueType<PostVisibility>;
  setPostVisibility: Dispatch<
    SetStateAction<DropdownValueType<PostVisibility>>
  >;
  loading: boolean;
  isEdit: boolean;
  isValid: string | boolean;
  imageUploading: boolean;
  multiFilesAllowed?: boolean;
  handlePosting: () => void;
  clipboard?: RefObject<HTMLElement>;
};

export type CreatePostBodyProps = {
  images: string[];
  showVisibility: boolean;
  options: DropdownValueType<PostVisibility>[];
  postVisibility: DropdownValueType<PostVisibility>;
  setPostVisibility: Dispatch<
    SetStateAction<DropdownValueType<PostVisibility>>
  >;
  text: string;
  setText: (value: string) => void;
  setRawJson: (value: RawDraftContentState | undefined) => void;
  addTag: (id: string | number) => void;
  categories: PostCategory[];
  handleDeleteAssetItem: (index: number) => void;
  overflow?: CSSProperties['overflow'];
  onClipboard?: (type: string, content: string) => void;
  post?: PostItemFragment;
};

export type HelperProps = {
  reset: () => void;
};
