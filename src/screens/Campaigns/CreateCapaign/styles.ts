import styled from 'styled-components';
import { Stack } from '@/layout';
import { mediaSizes } from '@/constants/devices';
import { Card } from '@/components/Card';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';

const FormContainer = styled(Stack).attrs({
  justify: 'center',
  align: 'center',
})`
  width: 100%;
  padding: 24px;
`;

const Forms = styled(Stack).attrs({
  vertical: true,
  justify: 'center',
  gap: '16px',
})`
  width: 900px;
  max-width: 900px;
`;

const Container = styled(Card)`
  width: 100%;
  overflow: visible;
`;

const InputLabel = styled(TSpan).attrs({
  font: 'body-m-bold',
  colorToken: '--text-card-neutral-highlighted',
})``;

const NoumAssignmentContainer = styled.div`
  width: 100%;
`;

const DatePickerContainer = styled.div`
  width: 160px;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    width: 350px;
  }
`;

const FormTitle = styled(TSpan).attrs({
  font: 'heading-xs-bold',
  colorToken: '--text-card-neutral-highlighted',
})``;

const GoalOption = styled(Stack).attrs({
  gap: '12px',
  align: 'center',
})`
  width: 415px;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid var(--border-option-selector-neutral-default);
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 350px;
  }
`;

const GoalOptionContainer = styled(Stack).attrs({
  fullWidth: true,
  gap: '16px',
  align: 'start',
  wrap: 'wrap',
})``;

const Option = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-option-selector-neutral-default',
})``;

const FullWidthDiv = styled.div`
  width: 100%;
`;

const CurrencyContainer = styled(Stack).attrs({
  gap: '8px',
  align: 'center',
})`
  width: 122px;
`;

const CurrencyInput = styled.input`
  width: 84px;
  height: 38px;
  background-color: var(--bg-input-neutral-default);
  border: none;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 12px;
  ::placeholder {
    color: var(--text-input-neutral-default);
    -webkit-text-fill-color: var(--text-input-neutral-default);
    opacity: 1; /* Firefox */
  }
`;

const RequestSubmitted = styled(Card)`
  width: 900px;
  height: 406px;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 0 auto;
  margin-top: 5%;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 100%;
    height: calc(100vh - 165px);
    border-radius: 0px;
    margin-top: 0%;
  }
`;

const NOUMContainer = styled(Stack)`
  width: 100%;
  height: 40px;
  background-color: var(--bg-input-neutral-default);
  border-radius: 8px;
  padding: 0px 12px;
`;

const PreviewContainer = styled.span`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 16px;
  background-color: var(--bg-button-floating-neutral-alt-default);
  float: right;
  cursor: pointer;
`;

const PreviewHeader = styled.div`
  background-color: var(--bg-card-neutral-alt-default);
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  position: sticky;
  top: 0px;
  margin-top: 2px;
  padding: 16px 40px 16px 40px;
`;

const PreviewBackButton = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  box-sizing: border-box;
`;

const CampaignTitle = styled(TSpan).attrs({
  font: 'body-xl-bold',
  colorToken: '--text-body-header-neutral-default',
})`
  margin-top: 8px;
`;

export default {
  FormContainer,
  Forms,
  Container,
  InputLabel,
  DatePickerContainer,
  NoumAssignmentContainer,
  FormTitle,
  GoalOptionContainer,
  GoalOption,
  Option,
  FullWidthDiv,
  CurrencyContainer,
  CurrencyInput,
  RequestSubmitted,
  NOUMContainer,
  PreviewContainer,
  PreviewHeader,
  PreviewBackButton,
  CampaignTitle,
};
