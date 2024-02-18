import { forwardRef, type Ref } from 'react';
import { type WrapperViewProp } from './types';
import { WrapperHead, WrapperTitleView, WrapperTitleLabel } from './styles';

export const ViewMode = forwardRef(
  (
    {
      currentTitle = '',
      rightPadding,
      children,
      showFullTitle = false,
      fullWidth,
      ...rest
    }: WrapperViewProp,
    ref: Ref<HTMLDivElement>,
  ) => (
    <WrapperHead
      ref={ref}
      data-testid="WrapperView"
      isEditing={false}
      fullWidth={fullWidth}
      {...rest}
    >
      <WrapperTitleView
        showFullTitle={showFullTitle}
        rightPadding={`${rightPadding && rightPadding * 0.18}px`}
      >
        <WrapperTitleLabel
          font="heading-xs-bold"
          colorToken="--text-body-header-neutral-default"
        >
          {currentTitle}
        </WrapperTitleLabel>
      </WrapperTitleView>
    </WrapperHead>
  ),
);
