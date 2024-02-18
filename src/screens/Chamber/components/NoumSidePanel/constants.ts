import { type InputListTypes } from '@/components/Tabs/types';
import { TextAlignType, VerticalAlignType } from '../NoumSections/constants';

export const alignItems: InputListTypes[] = [
  {
    id: VerticalAlignType.TOP,
    name: VerticalAlignType.TOP,
    image: 'align_top_m',
    text: '',
    labelSize: 'medium',
  },
  {
    id: VerticalAlignType.CENTER,
    name: VerticalAlignType.CENTER,
    image: 'align_center_m_2',
    text: '',
    labelSize: 'auto',
  },
  {
    id: VerticalAlignType.BOTTOM,
    name: VerticalAlignType.BOTTOM,
    image: 'align_bottom_m',
    text: '',
    labelSize: 'auto',
  },
];

export const textAlignItems: InputListTypes[] = [
  {
    id: TextAlignType.LEFT,
    name: TextAlignType.LEFT,
    image: 'left_align_m',
    text: '',
    labelSize: 'medium',
  },
  {
    id: TextAlignType.CENTER,
    name: TextAlignType.CENTER,
    image: 'center_align_m',
    text: '',
    labelSize: 'auto',
  },
  {
    id: TextAlignType.RIGHT,
    name: TextAlignType.RIGHT,
    image: 'right_align_m',
    text: '',
    labelSize: 'auto',
  },
];
