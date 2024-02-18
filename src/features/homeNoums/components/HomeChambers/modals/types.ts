import {
  type AskForReferencePayload,
  type ElementTypeEnum,
  type ManualNoumReferencePayload,
  type NoumReference,
  type NoumReferenceCapacity,
  type UpdateNoumReferencePayload,
} from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { type BottomStatus as InfiniteStatus } from '@/components/Infinite/types';
import { type SingleArrayOptionProps } from '../../HomeChamberOptions';

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
};

export type AddExperienceProps = {
  elementType: ElementTypeEnum;
  title: string;
  isEditing: boolean;
  handleOpenAddReferenceModal: (arg: 'manually' | 'ask') => void;
  handleAddOption: (
    val: string,
    value: string,
    _id: string,
    position?: number,
  ) => Promise<void>;
  handleDeleteOption: (_id: string) => void;
  defaultData: Omit<SingleArrayOptionProps, 'position'> & { position?: number };
  arrayOfOption?: SingleArrayOptionProps[];
  approveReference: (referenceId: string) => Promise<void>;
  rejectReference: (referenceId: string) => Promise<void>;
  discardReference: (referenceId: string) => Promise<void>;
  updateReference: (
    referenceId: string,
    payload: UpdateNoumReferencePayload,
  ) => Promise<void>;
  capacityOptions: DropdownValueType<string>[];
  loading: boolean;
  referenceFetching: boolean;
  referenceData: NoumReference[];
  fetchMoreReferences: () => Promise<void>;
  infiniteState: InfiniteStatus;
  setShowDiscardExperienceModal: () => void;
} & ModalType;

export type AddReferenceNonModalProps = {
  title: string;
  isEmpty?: boolean;
  onClose: () => void;
  handleAddOption: (data: Partial<SingleArrayOptionProps>) => void;
  defaultData: SingleArrayOptionProps;
  arrayOfOption?: SingleArrayOptionProps[];
  basicToolbar?: boolean;
  loading?: boolean;
};
export type EditReferenceProps = {
  onClose: () => void;
  isEdit?: boolean;
};

export type EditElementSchema = {
  title: string;
  content: string;
};

export type EditElementProps = {
  title: string;
  content: string;
  basicToolbar?: boolean;
  handleChangeTitle: (title: string) => void;
  handleChangeContent: (content: string) => void;
};

export type ReferenceDetailsInput = {
  providerName: string;
  capacity?: NoumReferenceCapacity;
  providerEmail: string;
  referenceText: string;
  isManual?: boolean;
  file: string | undefined;
};

export type ViewReferenceProps = Omit<
  SingleArrayOptionProps,
  'position' | 'status'
> &
  ModalType;

export type DeleteReferenceModalProps = ModalType & {
  handleDiscardReference?: () => void;
};

export type DiscardExperienceModalProps = ModalType & {
  handleCloseExperienceModal: () => void;
  handleDeleteOption: (expId: string) => void;
  experienceId: string;
};

export type AddManualReferenceProps = {
  capacityOptions: DropdownValueType<string>[];
  referenceLoading: boolean;
  onSubmitManualReference: (arg: ManualNoumReferencePayload) => Promise<void>;
} & ModalType;

export type AskForReferenceProps = {
  capacityOptions: DropdownValueType<string>[];
  referenceLoading: boolean;
  onSubmitAskForReference: (arg: AskForReferencePayload) => Promise<void>;
} & ModalType;

export type UpdateReferenceProps = {
  reference: NoumReference;
  capacityOptions: DropdownValueType<string>[];
  referenceLoading: boolean;
  onSubmitReference: (arg: UpdateNoumReferencePayload) => Promise<void>;
} & ModalType;

export type ReferecneViewItemProps = {
  reference: NoumReference;
  isEditing: boolean;
  loading?: boolean;
  capacityOptions?: DropdownValueType<string>[];
  approveReference?: (referenceId: string) => Promise<void>;
  rejectReference?: (referenceId: string) => Promise<void>;
  discardReference?: (referenceId: string) => Promise<void>;
  updateReference?: (
    referenceId: string,
    payload: UpdateNoumReferencePayload,
  ) => Promise<void>;
};
