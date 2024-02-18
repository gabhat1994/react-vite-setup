import { ElementTypeEnum } from '@/apollo/generated/types';
import { ElementContainer } from '../ElementContainer';
import SkillsEditElement from './SkillsEditElement';
import SkillsViewElement from './SkillsViewElement';
import { type SkillElementProps } from './types';

const SkillElement = (props: SkillElementProps) => (
  <ElementContainer
    isBorderContent={props.isEditing}
    elementType={ElementTypeEnum.Skills}
  >
    {props.isEditing ? (
      <SkillsEditElement {...props} />
    ) : (
      <SkillsViewElement {...props} />
    )}
  </ElementContainer>
);

export default SkillElement;
