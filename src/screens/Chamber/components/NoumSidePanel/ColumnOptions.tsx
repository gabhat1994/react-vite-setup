import { Radiobox } from '@/components/Radiobox';
import { Icon } from '@/components/Icon';
import { NoumLayoutSectionType } from '@/apollo/generated/types';
import { ColumnContainer, OptionContainer } from './styles';
import { type IColumnOptions } from './types';

const Columns: React.FC<IColumnOptions> = ({ option }) => {
  switch (option) {
    case NoumLayoutSectionType.SingleColumn_700Px:
      return (
        <ColumnContainer type={option}>
          <div className="disabled"> </div>
          <div> </div>
          <div className="disabled"> </div>
        </ColumnContainer>
      );
    case NoumLayoutSectionType.TwoColumnsLeftWider:
      return (
        <ColumnContainer type={option}>
          <div> </div>
          <div> </div>
        </ColumnContainer>
      );
    case NoumLayoutSectionType.TwoEqualColumns:
      return (
        <ColumnContainer type={option}>
          <div> </div>
          <div> </div>
        </ColumnContainer>
      );
    case NoumLayoutSectionType.TwoColumnsRightWider:
      return (
        <ColumnContainer type={option}>
          <div> </div>
          <div> </div>
        </ColumnContainer>
      );
    case NoumLayoutSectionType.ThreeEqualColumns:
      return (
        <ColumnContainer type={option}>
          <div> </div>
          <div> </div>
          <div> </div>
        </ColumnContainer>
      );
    case NoumLayoutSectionType.SingleColumn:
    default:
      return (
        <ColumnContainer type={option}>
          <div> </div>
        </ColumnContainer>
      );
  }
};

const ColumnOptions: React.FC<IColumnOptions> = ({
  onChange,
  option,
  isSelected,
}) => (
  <OptionContainer
    onClick={() => (onChange ? onChange(option) : {})}
    isFullWidth={!onChange}
  >
    <Columns option={option} />
    {onChange && (
      <Radiobox
        isChecked={!!isSelected}
        icon={
          isSelected ? (
            <Icon
              name="radio_btn_m"
              size={12}
              color="--icon-radiobutton-brand-primary-default"
            />
          ) : undefined
        }
      />
    )}
  </OptionContainer>
);

export default ColumnOptions;
