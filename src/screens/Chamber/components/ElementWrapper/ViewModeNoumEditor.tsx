import { forwardRef } from 'react';
import { TSpan } from '@/components/Typography';
import { type NoumEditorViewProp } from './types';
import { TitleContainer } from './styles';

export const ViewModeNoumEditor = forwardRef(
  ({ currentTitle = '' }: NoumEditorViewProp) => (
    <TitleContainer>
      <TSpan
        font="heading-xs-bold"
        colorToken="--text-body-header-neutral-default"
      >
        {currentTitle}
      </TSpan>
    </TitleContainer>
  ),
);
