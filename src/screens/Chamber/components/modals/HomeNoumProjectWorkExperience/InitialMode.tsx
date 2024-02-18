import { memo } from 'react';
import { useWindowDimensions } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';
import { StyledHeaderWrapper, StyledTitle } from './styles';
import { type InitilaModeProps } from './types';

const tabletMinWidth = parseInt(sizes.TABLET, 10) || 768;

export const InitialMode = memo((props: InitilaModeProps) => {
  const windowSize = useWindowDimensions();
  const { width } = windowSize;
  const { title } = props;

  return (
    <StyledHeaderWrapper>
      {width >= tabletMinWidth && (
        <TSpan
          data-testid="testTitleHomeNoumProjectWorkExperience"
          font="heading-xs-bold"
          colorToken="--text-modal-header-neutral-default"
        >
          {title}
        </TSpan>
      )}

      {width < tabletMinWidth && (
        <>
          <StyledTitle
            data-testid="testTitleHomeNoumProjectWorkExperience"
            font="heading-xs-bold"
            colorToken="--text-modal-header-neutral-default"
          >
            {title}
          </StyledTitle>
        </>
      )}
    </StyledHeaderWrapper>
  );
});
