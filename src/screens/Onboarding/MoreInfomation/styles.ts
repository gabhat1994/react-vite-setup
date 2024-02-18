import styled from 'styled-components';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';

export const HeadTag = styled(TSpan)`
  background: var(--bg-tag-brand-secondary-default);
  width: 204px;
  height: 22px;
  padding: 4px 8px 4px 8px;
  border-radius: 8px;
  @media (max-width: ${sizes.MOBILE_L}) {
    margin-top: 16px;
  }
  margin-top: 68px;
`;

export const FieldDescription = styled(TSpan)`
  margin-top: 16px;
`;

export const Title = styled(TSpan)`
  width: 100%;
`;

export const Description = styled(TSpan)`
  width: 100%;
  margin-top: 8px;
`;

export const ContinueButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  margin-bottom: 20px;
`;
