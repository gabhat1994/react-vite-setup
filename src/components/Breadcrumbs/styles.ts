import styled from 'styled-components';
import { type CommonBreadcrumbsProps } from './types';
import { TSpan } from '../Typography';

type TitleProps = Pick<CommonBreadcrumbsProps, 'titleAlign'>;

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const Title = styled(TSpan)<TitleProps>`
  text-align: ${(props) => props.titleAlign};
`;

export const IconWrapper = styled.div`
  padding-left: 12px;
  padding-right: 12px;
`;

// @TODO: temporary patch, that hides the SecondaryIconWrapper without any condition
// on browser srink SecondaryIconWrapper shows up.
export const SecondaryIconWrapper = styled(IconWrapper)`
  margin-right: 24px;
`;
