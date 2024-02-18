import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { clone } from 'lodash';
import { useMemo } from 'react';
import SingleOption from './SingleOption';
import { HomeChamberOptionsWrapper } from './styles';
import { type HomeChamberOptionsProps } from './types';

const HomeChamberOptions = ({
  arrayOfOptions,
  isEditMode,
  isOpen,
  handleOpenAddExperienceModal,
  handleDeleteOption,
  handleSelectOption,
  setDefaultData,
  columnWidth,
}: HomeChamberOptionsProps) => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const sortedOptions = clone(arrayOfOptions).sort((a, b) =>
    a.position > b.position ? 1 : -1,
  );
  const isContianerWidth = useMemo(
    () => (columnWidth ? columnWidth < 475 : false || isMobile),
    [columnWidth, isMobile],
  );
  return (
    <HomeChamberOptionsWrapper
      data-testid="homeChamberOptionsWrapper"
      isContianerWidth={isContianerWidth}
    >
      {sortedOptions.map((el) => (
        <SingleOption
          key={el.id}
          {...el}
          isEditMode={isEditMode}
          isOpen={isOpen}
          handleOpenAddExperienceModal={handleOpenAddExperienceModal}
          handleDeleteOption={handleDeleteOption}
          handleSelectOption={handleSelectOption}
          setDefaultData={setDefaultData}
          isContianerWidth={isContianerWidth}
        />
      ))}
    </HomeChamberOptionsWrapper>
  );
};

export default HomeChamberOptions;
