import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Header } from '@/components/Header';
import { Container, NewReleaseContainer, RefreshButton } from './styles';
import Logo from '../Logo';

const NewRelease = () => (
  <Container>
    <Header isBorderRadius={false}>
      <Logo />
    </Header>

    <NewReleaseContainer data-testid="new_release_container">
      <TSpan
        font="heading-xs-bold"
        colorToken="--text-card-neutral-highlighted"
      >
        {t(`noumena.route_went_wrong`)}
      </TSpan>
      <TSpan font="body-m" colorToken="--text-card-neutral-default">
        {t(`noumena.route_try_refresh`)}
      </TSpan>
      <RefreshButton
        onClick={() => {
          window.location.reload();
        }}
        secondary
        size="small"
      >
        {t(`noumena.route_refresh`)}
      </RefreshButton>
    </NewReleaseContainer>
  </Container>
);

export default NewRelease;
