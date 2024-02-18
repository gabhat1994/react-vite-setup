import { forwardRef } from 'react';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import QuickQuestionsElementViewMode from './QuickQuestionsElementViewMode';
import { type QuickQuestionsElementProps } from './types';
import { ElementContainer } from '../ElementContainer';
import { ElementWrapperV2 } from '../../ElementWrapperV2';
import { QuickQuestionsWrapperTestId } from './testIds';

const QuickQuestionsElement = forwardRef(
  (props: QuickQuestionsElementProps) => {
    const { isConnected } = useNoumUserConnectionContext();
    const { hasElementPermission } = useNoumAuthorization();

    const hasViewQuickQuestionsPermission = hasElementPermission(
      PermissibleElementType.QuickQuestions,
      'view-quick-question-element',
      true,
    );

    if (isConnected && !hasViewQuickQuestionsPermission) return null;

    return (
      <ElementContainer
        isBorderContent={props.isEditing}
        elementType={ElementTypeEnum.QuickQuestions}
      >
        <ElementWrapperV2.Container>
          <QuickQuestionsElementViewMode
            {...props}
            data-testid={QuickQuestionsWrapperTestId}
          />
        </ElementWrapperV2.Container>
      </ElementContainer>
    );
  },
);

export default QuickQuestionsElement;
