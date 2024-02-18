import { intervalToDuration } from 'date-fns';

const INVITATION_EXPIRY_DAYS = 14;

const getInvitationExpiryDays = (invitedAt: Date) => {
  const duration = intervalToDuration({
    start: invitedAt,
    end: new Date(),
  });
  return INVITATION_EXPIRY_DAYS - (duration.days ?? 0);
};

export const NoumManagerInvitationUtils = {
  getInvitationExpiryDays,
};
