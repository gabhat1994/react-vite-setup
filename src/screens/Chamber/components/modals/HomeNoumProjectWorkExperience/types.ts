import { type Maybe } from '@/apollo/generated/types';
import { type SingleArrayOptionProps } from '@/features/homeNoums/components/HomeChamberOptions';
import { type HomeChambersEnum } from '../../Element/types';

export interface HomeNoumProjectWorkExperienceProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  handleSuccess: () => void;
  elementType: HomeChambersEnum;
  position: Maybe<number>;
}

export interface InitilaModeProps {
  title: string;
  loading: boolean;
  arrayOfOption?: SingleArrayOptionProps[];
  handleOpenExperienceModal: () => void;
  onSubmit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  buttonText: string;
}
