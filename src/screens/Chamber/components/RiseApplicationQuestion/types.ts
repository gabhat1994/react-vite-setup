import { type Maybe } from '@/apollo/generated/types';
import { type ElementWrapperProps } from '../ElementWrapper/types';

export type EditRiseQuestionModalProps = {
  onClose: () => void;
  isOpen: boolean;
  currentTitle?: string;
  initialValue?: string;
  applicationId?: string;
  questionId?: string;
  refetch: () => void;
};

export interface RiseEssayQuestionType extends ElementWrapperProps {
  initialValue?: string;
  isEditing: boolean;
  currentTitle?: string;
  spaceId: string;
  isOwner: boolean;
  applicationId?: string;
  questionId?: string;
  refetch: () => void;
  resultJson?: Maybe<JSON>;
  status?: string | null;
  parentNoumId?: string | null;
  question?: string;
}
