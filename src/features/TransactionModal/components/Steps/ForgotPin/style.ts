import styled from 'styled-components';
import { OtpInput } from '@/components/Otp/OtpInput';
import { SingleOtpInputBaseCss } from '@/components/Otp/SingleOtpInput/styles';
import { TSpan } from '@/components/Typography';

export const FormHelperText = styled(TSpan)`
  width: 100%;
`;

export const PinCode = styled(OtpInput)<{ color?: string }>`
  ${SingleOtpInputBaseCss};
  color: ${(props) =>
    props.color ? props.color : 'var(--text-code-form-neutral-default)'};
`;
