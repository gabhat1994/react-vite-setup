import { type FC, useContext } from 'react';
import { Spacer, Stack } from '@/layout';
import SecurityQuestions from '@/features/TransactionModal/components/Steps/PlaidFlow/SecurityQuestions/SecurityQuestions';
import { FormWrapper } from '../styles';
import { SetupWalletContext } from '../../context';

const FormSecurityQuestion: FC = () => {
  const { handleNextStep, handlePreviousStep, passCode } =
    useContext(SetupWalletContext);

  return (
    <FormWrapper>
      <SecurityQuestions
        handlePreviousStep={handlePreviousStep}
        passCode={passCode}
        handleNextStep={handleNextStep}
      >
        <SecurityQuestions.Header
          font="heading-s-bold"
          colorToken="--text-body-header-neutral-default"
        />
        <Spacer height={16} />
        <SecurityQuestions.HelperText />
        <Spacer height={64} />
        <SecurityQuestions.Questions />
        <Spacer height={32} />
        <Stack
          fullWidth
          style={{
            justifyContent: 'space-between',
            gap: '16px',
            paddingBottom: '38px',
          }}
        >
          <SecurityQuestions.BackButton />
          <SecurityQuestions.ContinueButton />
        </Stack>
      </SecurityQuestions>
    </FormWrapper>
  );
};

export default FormSecurityQuestion;
