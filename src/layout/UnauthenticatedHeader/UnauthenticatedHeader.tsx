import { forwardRef, type Ref } from 'react';
import { useNavigate } from 'react-router';
import { Stack } from '@/layout';
import Logo from '@/components/Logo';
import routes from '@/constants/routes';
import { MainHeaderWrapper } from '@/components/Header/styles';
import { TSpan } from '@/components/Typography';

type UnauthenticatedHeaderProps = {
  title: string;
  rightElement?: React.ReactElement;
};

export const UnauthenticatedHeader = forwardRef(
  (
    { title, rightElement }: UnauthenticatedHeaderProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const navigate = useNavigate();

    return (
      <MainHeaderWrapper id="main-header" ref={ref}>
        <Stack justify="space-between" fullWidth align="center">
          <Stack gap={32}>
            <Logo handleLogoClick={() => navigate(routes.HOME)} />
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {title}
            </TSpan>
          </Stack>
          <Stack>{rightElement}</Stack>
        </Stack>
      </MainHeaderWrapper>
    );
  },
);
