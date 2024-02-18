import {
  ElementWrapper,
  type ElementWrapperProps,
} from '@/screens/Chamber/components/ElementWrapper';
import { type ElementOutput } from '@/apollo/generated/types';
import { NetworkElementProvider } from './NetworkElementProvider';
import NetworkViewMode from './NetworkViewMode';
import NetworkEditMode from './NetworkEditMode';

interface NetworkElementProps extends ElementWrapperProps {
  onContentChange: (networkDetails: object) => void;
  body: string | undefined;
  element: ElementOutput;
}

export const NetworkElement = (props: NetworkElementProps) => {
  const { onContentChange, element } = props;
  return (
    <NetworkElementProvider>
      {props.isEditing ? (
        <ElementWrapper {...props}>
          <NetworkEditMode
            body={props.body}
            handleChange={onContentChange}
            element={element}
          />
        </ElementWrapper>
      ) : (
        <NetworkViewMode {...props} body={props.body} />
      )}
    </NetworkElementProvider>
  );
};
