import styled from 'styled-components';
import { Stack } from '@/layout';

export const FormStyled = styled.div`
  width: 100%;
  min-height: 80vh;
`;

export const Form = styled.form`
  width: 100%;
`;

export const FullWidthStack = styled(Stack)`
  width: 100%;
`;

export const AddButtonStyle = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  height: 24px;
`;

export const IconWrapper = styled.div`
  display: flex;
  padding: 4px;
  gap: 12px;
  width: 85%;
`;

export const Point = styled.div`
  border-radius: 100%;
  background-color: var('--text-body-neutral-default');
  width: 8px;
  height: 8px;
  z-index: 1000;
  margin-top: 7px;
`;
