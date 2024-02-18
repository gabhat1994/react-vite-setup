import { type ElementTypeEnum } from '@/apollo/generated/types';
import { Container } from './styles';

type Props = {
  children: JSX.Element;
  isBorderContent?: boolean;
  elementType: ElementTypeEnum;
};

export const ElementContainer = ({
  children,
  isBorderContent,
  elementType,
}: Props) => (
  <Container
    className="element-visibility"
    isBorderContent={isBorderContent}
    aria-label={`ELEMENT_${elementType}`}
  >
    {children}
  </Container>
);
export default ElementContainer;
