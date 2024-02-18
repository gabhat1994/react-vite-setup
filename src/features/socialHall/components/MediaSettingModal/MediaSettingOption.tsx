import { Icon } from '@/components/Icon';
import { Radiobox } from '@/components/Radiobox';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';
import { type MediaDeviceLabel } from '@/screens/SocialHall/types';
import { SelectBoxContainer, SelectBoxText } from './styles';

export const MediaSettingOption: React.FC<{
  selected: boolean;
  device: MediaDeviceLabel;
  onCheck: (id: string) => void;
}> = ({ device: { deviceId, label }, onCheck, selected }) => (
  <SelectBoxContainer>
    <Radiobox
      isChecked={selected}
      icon={
        selected ? (
          <Icon
            name="radio_btn_m"
            size={12}
            color="--icon-radiobutton-brand-primary-default"
          />
        ) : undefined
      }
      onChange={() => onCheck(deviceId)}
    />
    <SelectBoxText font="body-l">
      {SocialHallMediaUtils.formatDeviceLabel(label)}
    </SelectBoxText>
  </SelectBoxContainer>
);
