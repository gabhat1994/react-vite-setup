import { Button, TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { Wrapper, ChildWrapper } from './styles';

interface IBanner {
  label : string;
  description : string;
  buttonName : string;
  onClickHandler : () => void;
}

export const Banner = ({label, description, buttonName, onClickHandler} : IBanner) => {
  const { isSmallerThanLaptop } = useBreakpoints();

  return (
    <Wrapper
      padding={isSmallerThanLaptop ? 16 : 24}
      gap={isSmallerThanLaptop ? 16 : 24}
    >
      <ChildWrapper align="start" padding={32}>
        <Stack align="start" gap={24} vertical fullWidth>
          <Stack align="start" gap={8} vertical>
            <TSpan font="heading-xs-bold" colorToken="--color-base-primary-50">
              {label}
            </TSpan>
            <TSpan
              font="body-m"
              colorToken="--text-card-neutral-highlighted"
              textAlign="justify"
            >
             {description}
            </TSpan>
          </Stack>
          <Button onClick={onClickHandler} primary size="small">
           {buttonName}
          </Button>
        </Stack>
      </ChildWrapper>
    </Wrapper>
  );
};
