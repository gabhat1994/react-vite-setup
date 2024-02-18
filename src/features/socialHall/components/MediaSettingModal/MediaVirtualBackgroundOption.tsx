import { Icon } from '@/components/Icon';
import { Checkbox } from '@/components/Checkbox';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';
import { SelectBoxContainer, SelectBoxText } from './styles';
import { type MediaVirtualBackground } from './types';

export const MediaVirtualBackgroundOption: React.FC<
  {
    selected: boolean;
    onCheck: (options: MediaVirtualBackground | null) => void;
  } & MediaVirtualBackground
> = ({ label, onCheck, selected, ...props }) => {
  const handleCheck = () => {
    const value = !selected ? (props as MediaVirtualBackground) : null;
    onCheck(value);
  };

  return (
    <SelectBoxContainer>
      <Checkbox
        isChecked={selected}
        icon={
          selected ? (
            <Icon
              name="tick_m"
              size={24}
              color="--icon-checkbox-neutral-alt-default"
            />
          ) : undefined
        }
        onChange={() => handleCheck()}
      />
      <SelectBoxText font="body-l">
        {SocialHallMediaUtils.formatDeviceLabel(label)}
      </SelectBoxText>
    </SelectBoxContainer>
  );
};
