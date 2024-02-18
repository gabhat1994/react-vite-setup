import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Icon } from '@/components/Icon';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import * as S from './styles';
import { type SliderHeaderControlsProps } from './types';

const SliderHeaderControls = ({
  showControls = false,
  disablePrev,
  goPrevious,
  disableNext,
  goNext,
  hideShowAllButton,
  handleShowAllClick,
}: SliderHeaderControlsProps) => {
  const { isLoading } = useSkeletonIsLoadingContext();
  const { t } = useTranslation();

  if (!showControls) return null;

  if (isLoading)
    return (
      <S.SliderControls data-testid="slidercontrols">
        <Skeleton width={96} height={24} />
      </S.SliderControls>
    );

  return (
    <S.SliderControls data-testid="slidercontrols">
      <S.Steps
        marginRight={8}
        disabled={disablePrev}
        onClick={goPrevious}
        data-testid="previous"
      >
        <Icon
          name="chevron_small_left_m"
          size={24}
          color={
            disablePrev
              ? '--icon-button-neutral-disabled'
              : '--icon-button-neutral-default'
          }
        />
      </S.Steps>
      <S.Steps
        marginRight={24}
        disabled={disableNext}
        onClick={goNext}
        data-testid="next"
      >
        <Icon
          name="chevron_small_right_m"
          size={24}
          color={
            disableNext
              ? '--icon-button-neutral-disabled'
              : '--icon-button-neutral-default'
          }
        />
      </S.Steps>
      {!hideShowAllButton && (
        <S.ShowAllButton
          textOnly
          intent="negative"
          size="small"
          onClick={handleShowAllClick}
          rightIcon={
            <Icon
              name="chevron_small_right_m"
              size={24}
              data-testid="showallbtn"
              color="--icon-button-brand-primary-default"
            />
          }
        >
          {t('noumena.slider.show_all')}
        </S.ShowAllButton>
      )}
    </S.SliderControls>
  );
};
export default SliderHeaderControls;
