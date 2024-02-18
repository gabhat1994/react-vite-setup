import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useAuth } from '@/features/auth/contexts';
import { useToggle } from '@/hooks';
import { Button } from '@/components/Button';
import ProjectCreate from '@/screens/Chamber/components/modals/ProjectCreate';

const AppStyled = styled.div`
  font-family: var(--font-family);
`;

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isActive: access } = useAuth();
  const [isOpen, toggle] = useToggle(false);

  const handleSuccess = (id: string) => {
    navigate(`/noum/${id}/edit`);
  };

  return (
    <AppStyled data-testid="DASHBOARD" className="App">
      <div>{t('noumena.dashboard.title')}</div>
      <div>
        <Button
          onClick={toggle}
          softDisabled={!access}
          primary
          data-testid="create-chamber"
        >
          {t('noumena.chamber_create_new.text')}
        </Button>
      </div>
      {access && isOpen && (
        <ProjectCreate
          isOpen={isOpen}
          handleClose={toggle}
          handleSuccess={handleSuccess}
        />
      )}
    </AppStyled>
  );
};

export default Dashboard;
