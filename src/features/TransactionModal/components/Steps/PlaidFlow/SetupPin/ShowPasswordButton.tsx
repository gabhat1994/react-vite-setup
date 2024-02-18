import { useContext } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { SetupPinContext } from './types';

const ShowPasswordButton = () => {
  const { showPassword, setShowPassword } = useContext(SetupPinContext);
  const toggleVisibility = () => {
    if (setShowPassword) {
      setShowPassword(!showPassword);
    }
  };
  return (
    <Button
      textOnly
      onClick={toggleVisibility}
      leftIcon={
        <Icon
          name={showPassword ? 'money_eye_off' : 'money_eye_up'}
          size={24}
          color="--icon-button-brand-primary-default"
        />
      }
    >
      <TSpan font="button-m" colorToken="--text-button-brand-primary-default">
        {showPassword ? 'Hide' : 'Show'} PIN Code
      </TSpan>
    </Button>
  );
};

export default ShowPasswordButton;
