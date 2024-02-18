import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type CqScoreUpdateProps } from './types';

const CqScoreUpdate = ({ ...basicProps }: CqScoreUpdateProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="CqScoreUpdate"
    body={
      <TranslatedBody i18nKey="noumena.notification_type.cq_score_update.body" />
    }
  />
);

export default CqScoreUpdate;
