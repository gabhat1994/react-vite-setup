import { typeOfChamberBox } from '@/components/ChamberBox/consts';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { TagLabel } from './styles';

const NoumOptionTag: React.FC<{ type: string }> = ({
  type,
}: {
  type: string;
}) => (
  <TagLabel
    data-testid="chamberbox-tag-label"
    bgColor={
      typeOfChamberBox[type.toLowerCase() as ChamberBoxNameEnum]?.bgColor
    }
    color={typeOfChamberBox[type.toLowerCase() as ChamberBoxNameEnum]?.color}
  >
    {type}
  </TagLabel>
);

export default NoumOptionTag;
